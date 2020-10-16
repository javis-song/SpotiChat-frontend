import React from "react";
import "./Footer.css";
import SongControls from '../SongControls/component';
import VolumeControls from '../VolumeControls/component';

const Footer = ({ stopSong, pauseSong, resumeSong, audioControl }) => (
  <div className="footer">
    <SongControls
      stopSong={stopSong}
      pauseSong={pauseSong}
      resumeSong={resumeSong}
      audioControl={audioControl}
    />
    <VolumeControls />
  </div>
);


export default Footer;
