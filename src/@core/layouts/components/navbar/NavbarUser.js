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

const NavbarUser = ({ setNavBarLoading }) => {
  const isTab = useIsTab();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);
  const isNotificationCount = useSelector((state) => state.notifications.notificationCount);
  const cometAuthToken = useSelector((state) => state.auth.cometChatToken);
  const userDetailsData = useSelector(selectUserData);
  const unreadMsgCount = useSelector((state) => state.chat.unreadMsgCount);
  const notificationsPollingData = useSelector(notificationsPolling);

  const isTabDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;

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
  }, [location]);

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <NavbarSearch />
      {isTab && isNavbarSearchBarOpen ? (
        ''
      ) : (
        <>
          {isTabDisabled ? (
            <div className="text-muted cursor-not-allowed">
              <NotificationIconContainer>
                <Bell size={20} color={theme.bodyColor} />
              </NotificationIconContainer>
            </div>
          ) : (
            <NotificationIconContainer onClick={handleNotificaionClick}>
              <Link to="/notifications">
                {(isNotificationCount || notificationsPollingData?.unread_notifications_count > 0) && (
                  <span className="notification-dot" />
                )}
                <Bell size={20} color={theme.bodyColor} />
              </Link>
            </NotificationIconContainer>
          )}

          {isTabDisabled ? (
            <MessageIconContainer>
              <div className="text-muted cursor-not-allowed">
                <MessageSquare size={20} color={theme.bodyColor} />
              </div>
            </MessageIconContainer>
          ) : (
            <MessageIconContainer>
              <div onClick={handleChatNavigate}>
                {unreadMsgCount !== 0 && <span className="msg-notification-dot">{unreadMsgCount}</span>}
                <MessageSquare size={20} color={theme.bodyColor} />
              </div>
            </MessageIconContainer>
          )}

          <UserDropdown />
        </>
      )}
    </ul>
  );
};
export default NavbarUser;
