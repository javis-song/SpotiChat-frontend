import React from "react";
import PropTypes from "prop-types";
import "./UserDetails.css";

const UserDetails = (props) => (
  <div className="user-details-container">
    {props.image ? 
    <img alt="user" className="user-image" src={props.image} /> : null}
    <p className="user-name">{props.username}</p>
  </div>
);


UserDetails.propTypes = {
  userImage: PropTypes.string,
  displayName: PropTypes.string
};

export default UserDetails;
