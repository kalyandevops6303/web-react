/* eslint-disable react/prop-types */
// ** React Imports

// ** Third Party Components
import { Menu } from 'react-feather';

// ** Reactstrap Imports
import { NavItem, NavLink as RsNavLink } from 'reactstrap';

import themeConfig from '@configs/themeConfig';

// ** Custom Components
import { Link, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavbarUser from './NavbarUser';
import theme from '../../../../configs/themeVariables';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getItem } from '../../../../utility/localStorageControl';
import { getUserData } from '../../../../redux/actions/dashboardActions';

const ThemeNavbar = (props) => {
  const userData = getItem('userData');
  const location = useLocation();
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  // ** Function to toggle Theme (Light/Dark)

  const HeadWrapper = styled.div`
    display: flex;
    width: 100%;
    .navbar-brand {
      margin: auto 0;
      .brand-logo {
        font-size: 14px;
        display: flex;
        align-items: center;
        img {
          max-height: 30px;
        }
      }
    }
    .menu-item {
      padding: 1rem 0;
      margin: 0 1rem 0 2rem;
      margin-bottom: -11px;
      font-size: 16px;
      font-weight: 400;
      color: ${theme.textColor};
      &:hover {
        color: ${theme.textColor};
      }
    }
    .is-active {
      font-weight: 600;
      border-bottom: 3px solid ${theme.activeColor};
      color: ${theme.activeColor};
      &:hover {
        color: ${theme.activeColor};
      }
    }
    @media (max-width: 1200px) {
      .menu-item {
        display: none;
      }
    }
  `;

  const dispatch = useDispatch();

  const token = getItem('access_token');

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, []);

  return (
    <HeadWrapper>
      <div className="bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu me-auto">
            <RsNavLink className="nav-menu-main menu-toggle hidden-xs" onClick={() => setMenuVisibility(true)}>
              <Menu className="ficon" />
            </RsNavLink>
          </NavItem>
        </ul>
      </div>

      <Link to={userData ? '/dashboard' : '/auth'} className="navbar-brand">
        <span className="brand-logo">
          <img src={themeConfig.app.appLogoImage} alt="logo" />
          <span className="ms-25 mt-25">v0.0.1</span>
        </span>
      </Link>

      <NavLink
        className={({ isActive }) => (isActive ? 'is-active' : '') + ' menu-item nav-menu-main menu-toggle hidden-xs'}
        onClick={() => setMenuVisibility(true)}
        to="/dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        className={
          (location?.pathname?.split('/')?.[1] === 'marketplace' ? 'is-active' : '') +
          ' menu-item nav-menu-main menu-toggle hidden-xs'
        }
        onClick={() => setMenuVisibility(true)}
        to="/marketplace/all_listings"
      >
        Marketplace
      </NavLink>

      <NavbarUser skin={skin} setSkin={setSkin} />
    </HeadWrapper>
  );
};

export default ThemeNavbar;
