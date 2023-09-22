import { useCallback, useEffect, useState } from 'react';
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

const NavbarUser = () => {
  const isTab = useIsTab();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);
  const isNotificationCount = useSelector((state) => state.notifications.notificationCount);

  const [userUnreadMsgCount, setUserUnreadMsgCount] = useState(0);

  const userData = useSelector(selectUserData);
  const userId = userData?._id;
  const handleNotificaionClick = () => {
    isNotificationCount && dispatch(notificationCount(false));
  };

<<<<<<< HEAD
  const handleChatNavigate = () => {
    navigate(`/chat`, {
      state: { targetId: undefined },
    });
  };

  CometChat.getUnreadMessageCountForAllUsers().then((unreadMsgs) => {
    setUserUnreadMsgCount(Object.values(unreadMsgs).reduce((acc, count) => acc + count, 0));
  });

=======
>>>>>>> feature/milestone-6
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
              {userUnreadMsgCount !== 0 && <span className="msg-notification-dot">{userUnreadMsgCount}</span>}
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
