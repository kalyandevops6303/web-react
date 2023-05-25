import React from 'react';
import { HeaderContainer } from './style';
import Logo from '../../assets/images/trumio-logo-onboarding-header.png';

const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} alt="logo" />
    </HeaderContainer>
  );
};

export default Header;
