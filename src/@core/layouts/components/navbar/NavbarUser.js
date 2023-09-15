import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bell } from 'react-feather';
import NavbarSearch from './NavbarSearch';
import UserDropdown from './UserDropdown';
import theme from '../../../../configs/themeVariables';
import { NotificationIconContainer } from './style';
import { useIsTab } from '../../../../utility/Utils';
import { notificationCount } from '../../../../redux/reducers/notifications';

const NavbarUser = () => {
  const isTab = useIsTab();
  const dispatch = useDispatch();
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);
  const isNotificationCount = useSelector((state) => state.notifications.notificationCount);
  const handleNotificaionClick = () => {
    isNotificationCount && dispatch(notificationCount(false));
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
          <UserDropdown />
        </>
      )}
    </ul>
  );
};
export default NavbarUser;
