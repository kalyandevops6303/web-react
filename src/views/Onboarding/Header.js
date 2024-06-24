import React from 'react';
import { HeaderContainer } from './style';
import Logo from '../../assets/images/ic_trumio_logo.png';

const Header = () => (
  <HeaderContainer>
    <div className="logo-wrap">
      <img alt="logo" src={Logo} className="card-logo onboarding-header-logo" />
      <span className="ms-25 version">v1.1.3</span>
    </div>
  </HeaderContainer>
);

export default Header;
