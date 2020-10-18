import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./components/Apicall/hash";
import './App.css';
import socketIOClient from "socket.io-client";
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Player from "./components/Player/Player"


const url = "http://127.0.0.1:8080";

class App extends React.Component {
  // state = {
  //   username: "song",
  // }

  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
      active_devices: [],
      top_artist:[],
      recommend_tracks:[],
      username:null
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {

    // const socket = socketIOClient(url);
    // socket.emit("username", this.state.username);
    // socket.on("chat message", data => {
    //   console.log(data);
    // });
    // socket.emit('chat message', "hello");
    // CLEAN UP THE EFFECT
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      
      this.getDevices(_token);
      this.getTopArtist(_token);
      // this.getRecommend(_token);
      this.getCurrentlyPlaying(_token);
      this.getUsername(_token);
    }
    
    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }
  
  getDevices(token){
    $.ajax({
          url: "https://api.spotify.com/v1/me/player/devices",
          type: "GET",
          beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success:data=>{
            console.log(data.devices);
            this.setState({
              active_devices: data.devices
            })
          }
      });
  }
  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          no_data: false/* We need to "reset" the boolean, in case the
                            user does not give F5 and has opened his Spotify. */
        
        });
      }
    });
  }

  getTopArtist(token){
    $.ajax({
          url: "https://api.spotify.com/v1/me/top/artists",
          type: "GET",
          beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success:data=>{
            console.log(data.items);
            var artists = data.items;

            this.getRecommend(token,artists);

            this.setState({
              top_artist : data.items
            })          }
        });
  }

  getRecommend(token,artists){
    //const artistsId = items.filter(i => i.user.type === 'user').map(i => i.track.id);
    var artistsId = [];
    artists.forEach(function (item, index) {
       console.log(item, index);
      artistsId.push(item.id);
   });
    console.log("artists id:", artistsId );
    console.log("token",token)
    $.ajax({
      url: "https://api.spotify.com/v1/recommendations",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      data:{
        // seed_artists: "06HL4z0CvFAxyc27GXpf02"
        seed_artists: artistsId[0]
      },
      success:data=>{
        console.log(data);
        this.addTrackstoQueue(token, data.tracks);
        this.setState({
          recommend_tracks : data.tracks
        })
      }
    });

  }

  getUsername(token){
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success:data=>{
        console.log(data.display_name);
        this.setState({
          username: data.display_name
        })
      }
  });

  }
  addTrackstoQueue(token, tracks){
  var tracksId = [];
  tracks.forEach(function(item, index){
    tracksId.push(item.uri);
  });
  console.log("trackId:",tracksId);
  $.ajax({
          url: "https://api.spotify.com/v1/me/player/play",
          type: "PUT",
          beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          data:JSON.stringify({
            uris: tracksId,
            offset: {
              position: 1
            }
          }),
        }).done(function () {
          console.log('SUCCESS');;})
  }

  
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Header />

          <div className="login">
            {!this.state.token && (
                <a
                    className="btn btn--login App-link"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                    )}&response_type=token&show_dialog=true`}
                >
                  Login to Spotify
                </a>
            )}
          </div>

          <div className="player">
            {this.state.token && !this.state.no_data && (
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.state.progress_ms}
              />
            )}
            {this.state.no_data && (
              <p>
                You need to be playing a song on Spotify, for something to appear here.
              </p>
            )}
          </div>
          {/*<Footer />*/}

          {this.state.token && !this.state.no_data && (
          <div className="chatbox">
            <ChatRoom username={this.state.username}/>
          </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
