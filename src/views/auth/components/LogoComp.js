import React from 'react';
import Logo from '@src/assets/images/ic_trumio_logo.png';

const LogoComp = () => {
  return (
    <div className="logo-wrap">
      <img alt="logo" src={Logo} className="card-logo" />
    </div>
  );
};

export default LogoComp;
