import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, MessageSquare } from 'react-feather';
import { CometChat } from '@cometchat-pro/chat';
import NavbarSearch from './NavbarSearch';
import UserDropdown from './UserDropdown';
import theme from '../../../../configs/themeVariables';
import { MessageIconContainer, NotificationIconContainer } from './style';
import { useIsTab } from '../../../../utility/Utils';
import { notificationCount } from '../../../../redux/reducers/notifications';
import { selectUserData } from '../../../../redux/selectors/authSelectors';
import ShowToastMessage from '../../../components/toast';
import { ERROR } from '../../../../utility/constants/ToastTypes';
import { clearUnreadMsgCountData } from '../../../../redux/reducers/chat';
import { clubStatus } from '../../../../utility/constants/Constant';
import { getNotificationsPolling } from '../../../../redux/actions/notificationsActions';
import { notificationsPolling } from '../../../../redux/selectors/notificationsSelectors';
import styled from 'styled-components';
import { clearAllFormData } from '../../../../redux/reducers/formData';

const NavbarUser = ({ setNavBarLoading }) => {
  const isTab = useIsTab();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isUserDataLoading = useSelector((state) => state.auth.userDataLoading);
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);
  const isNotificationCount = useSelector((state) => state.notifications.notificationCount);
  const cometAuthToken = useSelector((state) => state.auth.cometChatToken);
  const userDetailsData = useSelector(selectUserData);
  const unreadMsgCount = useSelector((state) => state.chat.unreadMsgCount);
  const notificationsPollingData = useSelector(notificationsPolling);
  const isCometChatLoggedIn = useSelector((state) => state.auth.isCometChatLoggedIn);

  const isTabDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW || isUserDataLoading;
  const isChatView = location.pathname.includes('/chat');
  const isNotificationView = location.pathname.includes('/notifications');

  const handleNotificaionClick = () => {
    isNotificationCount && dispatch(notificationCount(false));
  };

  const handleChatNavigate = () => {
    if (cometAuthToken) {
      // dispatch(clearUnreadMsgCountData());
      navigate(`/chat`, {
        state: { targetId: undefined },
      });
    } else {
      ShowToastMessage(ERROR, 'Something went wrong.');
    }
  };

  useEffect(() => {
    if (userDetailsData) {
      dispatch(getNotificationsPolling());
    }
  }, [location, userDetailsData]);

  useEffect(() => {
    dispatch(clearAllFormData());
  }, [location.pathname]);

  const LineWrapper = styled.div`
    position: relative;
    .line {
      height: 3px;
      background: ${theme.activeColor};
      width: 90%;
      position: absolute;
      bottom: -21px;
      margin: auto;
      left: 0;
      right: 0;
    }
  `;
  return (
    <ul className="nav navbar-nav align-items-center ms-auto d-contents">
      <NavbarSearch />
      {isTab && isNavbarSearchBarOpen ? (
        ''
      ) : (
        <>
          {isTabDisabled || !isCometChatLoggedIn ? (
            <MessageIconContainer className="d-flex align-items-center">
              <div className="text-muted cursor-not-allowed">
                <MessageSquare size={20} color={theme.bodyColor} />
              </div>
            </MessageIconContainer>
          ) : (
            <MessageIconContainer className="d-flex align-items-center">
              <div onClick={handleChatNavigate}>
                {unreadMsgCount !== 0 && <span className="msg-notification-dot">{unreadMsgCount}</span>}
                <MessageSquare size={20} color={isChatView ? theme.activeColor : theme.bodyColor} />
              </div>
              {isChatView && (
                <LineWrapper>
                  <div className="line"></div>
                </LineWrapper>
              )}
            </MessageIconContainer>
          )}
          {isTabDisabled ? (
            <div className="text-muted cursor-not-allowed d-flex align-items-center">
              <NotificationIconContainer>
                <Bell size={20} color={theme.bodyColor} />
              </NotificationIconContainer>
            </div>
          ) : (
            <NotificationIconContainer onClick={handleNotificaionClick} className="d-flex align-items-center">
              <Link to="/notifications">
                {(isNotificationCount || notificationsPollingData?.unread_notifications_count > 0) && (
                  <span className="notification-dot" />
                )}
                <Bell size={20} color={isNotificationView ? theme.activeColor : theme.bodyColor} />
              </Link>
              {isNotificationView && (
                <LineWrapper>
                  <div className="line"></div>
                </LineWrapper>
              )}
            </NotificationIconContainer>
          )}

          <UserDropdown />
        </>
      )}
    </ul>
  );
};
export default NavbarUser;
