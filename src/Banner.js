import React, { Component } from 'react';

import logo from './ether6.png';


class Banner extends React.Component {
  render() {
    return (
      <div style={{ justifyContent: 'center', height: '10%'}}>
        <img src={logo} alt="logo" style={{maxWidth: '100%'}} />
      </div>
    );
  }
}

export default Banner;
