import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderContainer } from './style';
import Logo from '../../assets/images/ic_trumio_logo.png';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onLogoClick = () => {
    if (location?.state?.isEditing || location.pathname === '/create-team/profile-details') {
      navigate('/dashboard');
    }
  };

  return (
    <HeaderContainer>
      <div
        className={`${location?.state?.isEditing || location.pathname ? `logo-wrap cursor-pointer` : `logo-wrap`}`}
        onClick={onLogoClick}
      >
        <img alt="logo" src={Logo} className="card-logo onboarding-header-logo" />
        <span className="ms-25 version">v0.0.15</span>
      </div>
    </HeaderContainer>
  );
};

export default Header;
