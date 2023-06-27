// ** Dropdowns Imports
import NavbarSearch from './NavbarSearch';
import UserDropdown from './UserDropdown';
import { Bell } from 'react-feather';
import theme from '../../../../configs/themeVariables';
import { Link } from 'react-router-dom';
import { NotificationIconContainer } from './style';

const NavbarUser = () => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <NavbarSearch />
      <NotificationIconContainer>
        <Link to="/notifications">
          <Bell size={20} color={theme.bodyColor} />
        </Link>
      </NotificationIconContainer>
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
