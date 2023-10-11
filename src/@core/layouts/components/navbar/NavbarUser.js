import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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

const NavbarUser = () => {
  const isTab = useIsTab();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);
  const isNotificationCount = useSelector((state) => state.notifications.notificationCount);
  const cometAuthToken = useSelector((state) => state.auth.cometChatToken);

  const unreadMsgCount = useSelector((state) => state.chat.unreadMsgCount);

  const userData = useSelector(selectUserData);
  const handleNotificaionClick = () => {
    isNotificationCount && dispatch(notificationCount(false));
  };

  const handleChatNavigate = () => {
    if (cometAuthToken) {
      dispatch(clearUnreadMsgCountData());
      navigate(`/chat`, {
        state: { targetId: undefined },
      });
    } else {
      ShowToastMessage(ERROR, 'Something went wrong.');
    }
  };

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <NavbarSearch />
      {isTab && isNavbarSearchBarOpen ? (
        ''
      ) : (
        <>
          <NotificationIconContainer onClick={handleNotificaionClick}>
            <Link to="/notifications">
              {isNotificationCount && <span className="notification-dot" />}
              <Bell size={20} color={theme.bodyColor} />
            </Link>
          </NotificationIconContainer>
          <MessageIconContainer>
            <div onClick={handleChatNavigate}>
              {unreadMsgCount !== 0 && <span className="msg-notification-dot">{unreadMsgCount}</span>}
              <MessageSquare size={20} color={theme.bodyColor} />
            </div>
          </MessageIconContainer>
          <UserDropdown />
        </>
      )}
    </ul>
  );
};
export default NavbarUser;
