import React from 'react';
import Logo from '@src/assets/images/ic_trumio_logo.png';

const LogoComp = () => {
  return (
    <div className="logo-wrap">
      <img alt="logo" src={Logo} className="card-logo" />
      <span className="ms-25 mt-75">v0.0.4</span>
    </div>
  );
};

export default LogoComp;
