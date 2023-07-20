// ** React Imports
import { Link, useLocation, useNavigate } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { User, Power } from 'react-feather';

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledTooltip } from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../../redux/selectors/dashboardSelectors';

import { logoutAction } from '../../../../redux/actions/authActions';
import { capitalize } from 'lodash';
import styled from 'styled-components';
import theme from '../../../../configs/themeVariables';
import { userTypes } from '../../../../utility/constants/Constant';
import { getItem, setItem } from '../../../../utility/localStorageControl';

const UserDropdown = () => {
  const userDetailsData = useSelector(userData);
  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    const onSuccess = () => {
      navigate('/auth/login');
      const keyToPreserve = 'isUserVisited';
      const preservedValue = getItem(keyToPreserve);
      // eslint-disable-next-line no-undef
      window.localStorage.clear();
      if (preservedValue) {
        setItem(keyToPreserve, preservedValue);
      }
    };

    dispatch(logoutAction({ fcmToken, onSuccess }));
  };
  const LineWrapper = styled.div`
    position: relative;
    .line {
      height: 2px;
      background: ${theme.activeColor};
      width: 90%;
      position: absolute;
      bottom: -12px;
      margin: auto;
      left: 0;
      right: 0;
    }
  `;

  const userName = userDetailsData
    ? userDetailsData?.user_type === 'TALENT'
      ? userDetailsData?.talent_info?.first_name + ' ' + userDetailsData?.talent_info?.last_name || 'User'
      : userDetailsData?.client_info?.first_name + ' ' + userDetailsData?.client_info?.last_name || 'User'
    : 'User';

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      {console.log('userDetailsData', userDetailsData)}
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold" id="username">
            {userName}
          </span>
          {userName?.length > 15 && (
            <UncontrolledTooltip placement="right" target="username">
              <div className="d-flex flex-column align-items-start">
                <p className="m-0">{userName}</p>
              </div>
            </UncontrolledTooltip>
          )}
          <span className="user-status">{capitalize(userDetailsData?.user_type) || 'Role'}</span>
        </div>
        {userDetailsData?.user_type === 'TALENT' ? (
          <Avatar
            img={
              userDetailsData?.talent_info?.image_uri.length > 0
                ? userDetailsData?.talent_info?.image_uri
                : defaultAvatar
            }
            imgHeight="40"
            imgWidth="40"
          />
        ) : (
          <Avatar
            img={
              userDetailsData?.client_info?.image_uri.length > 0
                ? userDetailsData?.client_info?.image_uri
                : defaultAvatar
            }
            imgHeight="40"
            imgWidth="40"
          />
        )}
      </DropdownToggle>

      {location?.pathname?.split?.('/')?.[3] === userDetailsData?._id && (
        <LineWrapper>
          <div className="line"></div>
        </LineWrapper>
      )}

      <DropdownMenu end>
        <DropdownItem tag={Link} to={`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>

        <DropdownItem onClick={handleLogout} className="w-100">
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
