import { useSelector } from 'react-redux';
// ** Dropdowns Imports
import NavbarSearch from './NavbarSearch';
import UserDropdown from './UserDropdown';
import { Bell } from 'react-feather';
import theme from '../../../../configs/themeVariables';
import { Link } from 'react-router-dom';
import { NotificationIconContainer } from './style';
import { useIsTab } from '../../../../utility/Utils';

const NavbarUser = () => {
  const isTab = useIsTab();
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <NavbarSearch />
      {isTab && isNavbarSearchBarOpen ? (
        ''
      ) : (
        <>
          {' '}
          <NotificationIconContainer>
            <Link to="/notifications">
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
