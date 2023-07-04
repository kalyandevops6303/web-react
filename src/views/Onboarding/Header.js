import React from 'react';
import { HeaderContainer } from './style';
import Logo from '../../assets/images/trumio-logo-onboarding-header.png';

const Header = () => (
  <HeaderContainer>
    <div className="logo-wrap">
      <img alt="logo" src={Logo} className="card-logo" />
      <span className="ms-25 version">v0.0.2</span>
    </div>
  </HeaderContainer>
);

export default Header;
