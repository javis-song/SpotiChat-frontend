import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './SongControls.css';

class SongControls extends Component {
  state = {
    timeElapsed: 10,
  }

  render() {
    const showPlay = this.props.songPaused ? 'fa fa-play-circle-o play-btn' : 'fa fa-pause-circle-o pause-btn';

    return (
      <div className='song-player-container'>

        <div className='song-details'>
          <p className='song-name'>song name</p>
          <p className='artist-name'>artist name</p>
        </div>

        <div className='song-controls'>

          <div onClick={this.prevSong} className='reverse-song'>
            <i className="fa fa-step-backward reverse" aria-hidden="true" />
          </div>

          <div className='play-btn'>
            <i onClick={!this.props.songPaused ? this.props.pauseSong : this.props.resumeSong} className={"fa play-btn" + showPlay} aria-hidden="true" />
          </div>

          <div onClick={this.nextSong} className='next-song'>
            <i className="fa fa-step-forward forward" aria-hidden="true" />
          </div>

        </div>

        <div className='song-progress-container'>
          <p className='timer-start'>time start</p>
          <div className='song-progress'>
            <div style={{ width: this.state.timeElapsed * 16.5 }} className='song-expired' />
          </div>
          <p className='timer-end'>time end</p>
        </div>

      </div>
    );
  }
}

export default SongControls;
