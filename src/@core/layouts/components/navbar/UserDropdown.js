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
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../../redux/selectors/dashboardSelectors';
import { clearData } from '../../../../redux/reducers/dashboard';
import { clearDataSuccess } from '../../../../redux/reducers/auth';

const UserDropdown = () => {
  const userDetailsData = useSelector(userData);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearData());
    dispatch(clearDataSuccess());
    localStorage.clear();
  };
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {userDetailsData?.user_type === 'TALENT'
              ? userDetailsData?.talent_info?.first_name || 'User'
              : userDetailsData?.client_info?.first_name || 'User'}
          </span>
          <span className="user-status">{userDetailsData?.user_type || 'Role'}</span>
        </div>
        <Avatar img={defaultAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem
          tag={Link}
          to={`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`}
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
