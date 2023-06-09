/* eslint-disable react/prop-types */
// ** React Imports

// ** Third Party Components
import { Menu } from 'react-feather';

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap';

import themeConfig from '@configs/themeConfig';

// ** Custom Components
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavbarUser from './NavbarUser';
import theme from '../../../../configs/themeVariables';

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  // ** Function to toggle Theme (Light/Dark)

  const HeadWrapper = styled.div`
    display: flex;
    width: 100%;
    .navbar-brand {
      margin: auto 0;
      .brand-logo {
        img {
          max-height: 30px;
        }
      }
    }
    .menu-item {
      padding: 1rem 0;
      margin: 0 2rem;
      border-bottom: 3px solid ${theme.primary};
      margin-bottom: -11px;
      font-size: 16px;
      font-weight: 600;
      color: ${theme.primary};
    }
    @media (max-width: 1200px) {
      .menu-item {
        display: none;
      }
    }
  `;

  return (
    <HeadWrapper>
      <div className="bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu me-auto">
            <NavLink className="nav-menu-main menu-toggle hidden-xs is-active" onClick={() => setMenuVisibility(true)}>
              <Menu className="ficon" />
            </NavLink>
          </NavItem>
        </ul>
      </div>

      <Link to="/" className="navbar-brand">
        <span className="brand-logo">
          <img src={themeConfig.app.appLogoImage} alt="logo" />
        </span>
      </Link>

      <NavLink
        className="menu-item nav-menu-main menu-toggle hidden-xs is-active"
        onClick={() => setMenuVisibility(true)}
      >
        Dashboard
      </NavLink>

      <NavbarUser skin={skin} setSkin={setSkin} />
    </HeadWrapper>
  );
};

export default ThemeNavbar;
