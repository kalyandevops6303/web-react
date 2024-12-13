/* eslint-disable react/prop-types */
// ** React Imports

// ** Third Party Components
import { Menu } from 'react-feather';

// ** Reactstrap Imports
import { NavItem, NavLink as RsNavLink } from 'reactstrap';

import themeConfig from '@configs/themeConfig';

// ** Custom Components
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import NavbarUser from './NavbarUser';
import theme from '../../../../configs/themeVariables';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CometChat } from '@cometchat-pro/chat';
import { getItem, setItem } from '../../../../utility/localStorageControl';
import { getUserData } from '../../../../redux/actions/authActions';
import { appPermissionsSelector, selectUserData } from '../../../../redux/selectors/authSelectors';
import { clubStatus, userTypes } from '../../../../utility/constants/Constant';
import { setUnreadMsgCount } from '../../../../redux/reducers/chat';
import { setActiveNavTab } from '../../../../redux/reducers/activeNavTab';
import SwitchConfirmModal from '../../../../views/modals/SwitchConfirm';
import { setConfirmSaveForLater, setNavigatingRoute } from '../../../../redux/reducers/formData';
import { confirmSaveForLater } from '../../../../redux/selectors/formDataSelectors';
import PermissionWrapper from '@/PermissionWrapper';
import { useAppStore } from '@flexternships/stores/core-stores';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import { getCookiesItem } from '@/utility/cookiesControl';

const HeadWrapper = styled.div`
  display: flex;
  width: 100%;
  z-index: 0;
  justify-content: space-between;
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
  .d-contents {
    display: contents;
  }
  .main-search {
    margin-left: 2rem;
  }
`;

const ThemeNavbar = (props) => {
  const [switchProfileModal, setSwitchProfileModal] = useState(false);
  const userData = useSelector(selectUserData);
  const location = useLocation();
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);
  const isCometChatLoggedIn = useSelector((state) => state.auth.isCometChatLoggedIn);
  const activeTab = useSelector((state) => state.activeNavTab?.activeTab);
  const appPermissions = useSelector(appPermissionsSelector);
  const saveArtifactDraftPath = /^\/project-details\/[a-zA-Z0-9_-]+\/milestone-details\/[a-zA-Z0-9_-]+$/;
  const draftTeamPath =
    location?.pathname.includes('/create-team/profile-details') ||
    location?.pathname.includes('/create-club/account-details') ||
    location?.pathname.includes('/create-club/profile-details');
  const isTabDisabled = userData?.club_status === clubStatus.IN_REVIEW;

  // ** Flexternships Stores
  const isWorkInProgress = useAppStore((state) => state.isWip);
  const openModal = useAppStore((state) => state.openModal);

  // ** Props
  const { skin, setSkin, setMenuVisibility, className } = props;
  // ** Function to toggle Theme (Light/Dark)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = getCookiesItem('access_token');

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, []);

  if (isCometChatLoggedIn) {
    CometChat.getUnreadMessageCountForAllUsers().then((unreadMsgs) => {
      const totalCount = Object.values(unreadMsgs).reduce((acc, count) => acc + count, 0);
      dispatch(setUnreadMsgCount(totalCount));
    });
  }

  useEffect(() => {
    if (location?.pathname?.split('/')?.[1] === 'dashboard') dispatch(setActiveNavTab('dashboard'));
  }, [userData]);

  useEffect(() => {
    const path = location?.pathname?.split?.('/')?.[1];
    switch (path) {
      case 'notifications':
      case 'search':
      case undefined:
        dispatch(setActiveNavTab(''));
        break;
      case 'marketplace':
        dispatch(setActiveNavTab('marketplace'));
        break;
      case 'projects':
        dispatch(setActiveNavTab('projects'));
        break;
      case 'dashboard':
        dispatch(setActiveNavTab('dashboard'));
        break;
      case 'my-teams':
        dispatch(setActiveNavTab('my-teams'));
        break;
      default:
        dispatch(setActiveNavTab(''));
        break;
    }
  }, [location, location?.pathname]);

  useEffect(() => {
    if (!location.pathname.includes('/create-club')) {
      localStorage.removeItem('clubCreateData');
    }
  }, [location.pathname]);

  const isOpenSaveForLater = useSelector(confirmSaveForLater);

  const handleWorkInProgress = (nextPath) => {
    if (isWorkInProgress) {
      openModal(GlobalModalType.UNSAVED_WORK, undefined, undefined, { nextPath });
    }
  };
  return (
    <HeadWrapper className={className}>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <ul className="navbar-nav d-xl-none">
            <NavItem className="mobile-menu me-auto">
              <RsNavLink
                className="nav-menu-main menu-toggle hidden-xs ssss"
                onClick={() => setMenuVisibility((prev) => !prev)}
              >
                <Menu className="ficon" />
              </RsNavLink>
            </NavItem>
          </ul>
        </div>

        <div
          className="navbar-brand cursor-pointer"
          onClick={() => {
            handleWorkInProgress('/dashboard');
            if (isWorkInProgress) return;
            if (draftTeamPath) {
              dispatch(setConfirmSaveForLater(true));
              dispatch(setNavigatingRoute('/dashboard'));
            } else {
              if (userData) {
                navigate('/dashboard');
                dispatch(setActiveNavTab('dashboard'));
              } else {
                navigate('/auth');
                dispatch(setActiveNavTab('dashboard'));
              }
            }
          }}
        >
          <span className="brand-logo">
            <img src={themeConfig.app.appLogoImage} alt="logo" />
            <span className="ms-25 mt-25">v1.2.0</span>
          </span>
        </div>

        {!isNavbarSearchBarOpen && (
          <>
            <div
              className={
                (location?.pathname?.split('/')?.[1] === 'dashboard' ? 'is-active' : '') +
                ' menu-item nav-menu-main menu-toggle hidden-xs cursor-pointer'
              }
              onClick={() => {
                handleWorkInProgress('/dashboard');
                if (isWorkInProgress) return;
                if (draftTeamPath) {
                  dispatch(setConfirmSaveForLater(true));
                  dispatch(setNavigatingRoute('/dashboard'));
                } else {
                  navigate('/dashboard');
                  dispatch(setActiveNavTab('dashboard'));
                }
              }}
            >
              Dashboard
            </div>
            {isTabDisabled ? (
              <span className={'text-muted menu-item nav-menu-main menu-toggle hidden-xs'}>Marketplace</span>
            ) : (
              <div
                onClick={() => {
                  handleWorkInProgress('/marketplace/all_listings');
                  if (isWorkInProgress) return;
                  if (draftTeamPath) {
                    dispatch(setConfirmSaveForLater(true));
                    dispatch(
                      setNavigatingRoute(
                        `/marketplace/${userData?.user_type === userTypes.client ? 'my_listings' : 'all_listings'}`,
                      ),
                    );
                  } else {
                    navigate(
                      `/marketplace/${userData?.user_type === userTypes.client ? 'my_listings' : 'all_listings'}`,
                    );
                    dispatch(setActiveNavTab('marketplace'));
                    setItem(
                      'selectedMarketplaceTab',
                      userData?.user_type === userTypes.client ? 'my_listings' : 'all_listings',
                    );
                  }
                }}
                className={
                  (location?.pathname?.split('/')?.[1] === 'marketplace' ||
                  location?.state?.from?.primary === 'Marketplace' ||
                  activeTab === 'marketplace'
                    ? 'is-active'
                    : '') + ' menu-item nav-menu-main menu-toggle hidden-xs cursor-pointer'
                }
              >
                Marketplace
              </div>
            )}

            {isTabDisabled ? (
              <span className={'text-muted menu-item nav-menu-main menu-toggle hidden-xs'}>Project</span>
            ) : (
              <div
                className={
                  (location?.pathname?.split('/')?.[1] === 'projects' ||
                  location?.state?.from?.primary === 'projects' ||
                  activeTab === 'projects'
                    ? 'is-active'
                    : '') + ' menu-item nav-menu-main menu-toggle hidden-xs cursor-pointer'
                }
                onClick={() => {
                  handleWorkInProgress('/projects/ongoing');
                  if (isWorkInProgress) return;
                  if (draftTeamPath) {
                    dispatch(setConfirmSaveForLater(true));
                    dispatch(setNavigatingRoute('/projects/ongoing'));
                  } else {
                    navigate('/projects/ongoing');
                    localStorage.removeItem('selectedProjectTab');
                    dispatch(setActiveNavTab('projects'));
                  }
                }}
              >
                Projects
              </div>
            )}

            <PermissionWrapper permissions={appPermissions} permissionName={['NAVIGATIONS.MY_TEAM']}>
              {isTabDisabled ? (
                <span className={'text-muted menu-item nav-menu-main menu-toggle hidden-xs'}>My Team</span>
              ) : (
                <div
                  onClick={() => {
                    if (draftTeamPath) {
                      dispatch(setConfirmSaveForLater(true));
                      dispatch(
                        setNavigatingRoute(`/my-teams/${userData?.user_type === userTypes.team ? 'talents' : 'teams'}`),
                      );
                    } else {
                      navigate(`/my-teams/${userData?.user_type === userTypes.team ? 'talents' : 'teams'}`);
                      dispatch(setActiveNavTab('my-teams'));
                    }
                  }}
                  className={
                    (location?.pathname?.split('/')?.[1] === 'my-teams' ||
                    location?.state?.from?.primary === 'my-teams' ||
                    activeTab === 'my-teams'
                      ? 'is-active text-nowrap'
                      : '') + ' menu-item nav-menu-main menu-toggle hidden-xs text-nowrap'
                  }
                >
                  My Team
                </div>
              )}
            </PermissionWrapper>

            <PermissionWrapper permissions={appPermissions} permissionName={['NAVIGATIONS.CLUBS']}>
              {userData?.user_type === userTypes.talent && (
                <div
                  onClick={() => {
                    if (draftTeamPath) {
                      dispatch(setConfirmSaveForLater(true));
                      dispatch(setNavigatingRoute('/clubs/my_clubs'));
                    } else {
                      navigate('/clubs/my_clubs');
                      dispatch(setActiveNavTab('clubs'));
                    }
                  }}
                  className={
                    (location?.pathname?.split('/')?.[1] === 'clubs' ||
                    location?.state?.from?.primary === 'clubs' ||
                    activeTab === 'clubs'
                      ? 'is-active'
                      : '') + ' menu-item nav-menu-main menu-toggle hidden-xs'
                  }
                >
                  Clubs
                </div>
              )}
            </PermissionWrapper>
          </>
        )}
      </div>
      <div className="w-100 d-flex">
        <NavbarUser skin={skin} setSkin={setSkin} />
      </div>
    </HeadWrapper>
  );
};

export default ThemeNavbar;
