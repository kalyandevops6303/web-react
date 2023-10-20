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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CometChat } from '@cometchat-pro/chat';
import { getItem, setItem } from '../../../../utility/localStorageControl';
import { getUserData } from '../../../../redux/actions/authActions';
import { selectUserData } from '../../../../redux/selectors/authSelectors';
import { userTypes } from '../../../../utility/constants/Constant';
import { CometChat } from '@cometchat-pro/chat';
import { setUnreadMsgCount } from '../../../../redux/reducers/chat';

const ThemeNavbar = (props) => {
  const userData = useSelector(selectUserData);
  const location = useLocation();
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);
  const isCometChatLoggedIn = useSelector((state) => state.auth.isCometChatLoggedIn);

  // ** Props
  const { skin, setSkin, setMenuVisibility, className } = props;
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
      border-bottom: 2px solid ${theme.activeColor};
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

  const [activeTab, setActiveTab] = useState(false);

  const dispatch = useDispatch();

  const token = getItem('access_token');

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, []);

  if (isCometChatLoggedIn) {
    CometChat.getUnreadMessageCountForAllUsers().then((unreadMsgs) => {
      const totalCount = Object.values(unreadMsgs).reduce((acc, count) => acc + count, 0);
      console.log('UNREAD COUNT INDEX NAV', totalCount);
      dispatch(setUnreadMsgCount(totalCount));
    });
  }

  return (
    <HeadWrapper className={className}>
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
          <span className="ms-25 mt-25">v0.0.6</span>
        </span>
      </Link>

      {!isNavbarSearchBarOpen && (
        <>
          <NavLink
            className={({ isActive }) =>
              (isActive || activeTab === 'dashboard' ? 'is-active' : '') +
              ' menu-item nav-menu-main menu-toggle hidden-xs'
            }
            to="/dashboard"
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </NavLink>
          <NavLink
            onClick={() => {
              setActiveTab('marketplace');
              setItem(
                'selectedMarketplaceTab',
                userData?.user_type === userTypes.client ? 'my_listings' : 'all_listings',
              );
            }}
            className={
              (location?.pathname?.split('/')?.[1] === 'marketplace' ||
              location?.state?.from?.primary === 'Marketplace' ||
              activeTab === 'marketplace'
                ? 'is-active'
                : '') + ' menu-item nav-menu-main menu-toggle hidden-xs'
            }
            to={`/marketplace/${userData?.user_type === userTypes.client ? 'my_listings' : 'all_listings'}`}
          >
            Marketplace
          </NavLink>
          <NavLink
            className={
              (location?.pathname?.split('/')?.[1] === 'projects' ||
              location?.state?.from?.primary === 'projects' ||
              activeTab === 'projects'
                ? 'is-active'
                : '') + ' menu-item nav-menu-main menu-toggle hidden-xs'
            }
            to="/projects/ongoing"
            onClick={() => {
              localStorage.removeItem('selectedProjectTab');
              setActiveTab('projects');
            }}
          >
            Project
          </NavLink>
          <NavLink
            onClick={() => setActiveTab('my-teams')}
            className={
              (location?.pathname?.split('/')?.[1] === 'my-teams' ||
              location?.state?.from?.primary === 'my-teams' ||
              activeTab === 'my-teams'
                ? 'is-active'
                : '') + ' menu-item nav-menu-main menu-toggle hidden-xs'
            }
            to={`/my-teams/${userData?.user_type === userTypes.talent ? 'teams' : 'talents'}`}
          >
            My Team
          </NavLink>
        </>
      )}

      <NavbarUser skin={skin} setSkin={setSkin} />
    </HeadWrapper>
  );
};

export default ThemeNavbar;
