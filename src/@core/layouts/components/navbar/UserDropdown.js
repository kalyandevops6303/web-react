// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { User, Power } from 'react-feather';

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { getItem } from '../../../../utility/localStorageControl';

const UserDropdown = () => {
  const userData = getItem('userData');

  const handleLogout = () => {
    localStorage.clear();
  };
  console.log(userData?.talent_info?.first_name);
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {userData?.user_type === 'TALENT'
              ? userData?.talent_info?.first_name || 'User'
              : userData?.client_info?.first_name || 'User'}
          </span>
          <span className="user-status">{userData?.user_type || 'Role'}</span>
        </div>
        <Avatar img={defaultAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem
          tag={Link}
          to={`/profile/${userData?.user_type}/${userData?._id}`}
          // onClick={(e) => e.preventDefault()}
        >
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>

        <DropdownItem tag={Link} to="/auth/login" onClick={handleLogout}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
