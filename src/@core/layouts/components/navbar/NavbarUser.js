// ** Dropdowns Imports
import { Bell } from 'react-feather';
import { Link } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import UserDropdown from './UserDropdown';
import theme from '../../../../configs/themeVariables';
import { NotificationIconContainer } from './style';

const NavbarUser = () => (
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
export default NavbarUser;
