// ** React Imports
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShowToastMessage from '../../../../@core/components/toast';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { User, Power, Check, CheckCircle } from 'react-feather';

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledTooltip } from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../../redux/selectors/dashboardSelectors';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

import { logoutAction, switchProfile } from '../../../../redux/actions/authActions';
import { capitalize } from 'lodash';
import styled from 'styled-components';
import theme from '../../../../configs/themeVariables';
import { userTypes } from '../../../../utility/constants/Constant';
import { getItem, setItem } from '../../../../utility/localStorageControl';
import { selectCurrentUserData, selectIsTeamLoggedIn, selectUserData } from '../../../../redux/selectors/authSelectors';
import ProfileSwitchModal from '../../../../views/modals/ProfileSwitchModal';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { selectTeamData } from '../../../../redux/selectors/teamSelectors';

const UserDropdown = () => {
  const userDetailsData = useSelector(selectUserData);
  const savedUserDetails = useSelector(selectCurrentUserData);
  const isTeamLoggedIn = useSelector(selectIsTeamLoggedIn);
  const teams = useSelector(selectTeamData);

  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isProfileSwitchLoading, setProfileSwitchLoading] = useState(false);

  const handleEdit = () => {
    navigate(`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`);
  };

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

  const UserDropDownWrapper = styled.div`
    a {
      text-decoration: none;
      color: inherit;
    }
    .isActive {
      background: ${theme.primary}1f;
      color: ${theme.primary};
    }
    .logout {
      color: ${theme.red};
      padding: 1rem 1.2rem;
      display: block;
    }
    .edit {
      color: ${theme.primary};
      padding: 1rem 1.2rem;
      display: block;
      border-top: 1px solid ${theme.cardHeaderBorderColor};
      margin-top: 1rem;
      &:active {
        color: white;
      }
    }
    .dropdown-item {
      width: 100%;
    }
  `;

  const handleShowModal = () => {
    ShowToastMessage('success', `Profile switched successfully`);
  };
  const handleSwitch = (data) => {
    dispatch(switchProfile({ data, onSuccess: handleShowModal }));
  };

  const userName = isTeamLoggedIn
    ? userDetailsData?.name
    : userDetailsData
    ? userDetailsData?.user_type === userTypes.talent
      ? userDetailsData?.talent_info?.first_name + ' ' + userDetailsData?.talent_info?.last_name || 'User'
      : userDetailsData?.client_info?.first_name + ' ' + userDetailsData?.client_info?.last_name || 'User'
    : 'User';

  const savedUserName = savedUserDetails
    ? savedUserDetails?.user_type === userTypes.talent
      ? savedUserDetails?.talent_info?.first_name + ' ' + savedUserDetails?.talent_info?.last_name || 'User'
      : savedUserDetails?.client_info?.first_name + ' ' + savedUserDetails?.client_info?.last_name || 'User'
    : 'User';
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name truncate-1 fw-bold" id="username">
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
        {userDetailsData?.user_type === userTypes.talent && (
          <Avatar
            img={
              userDetailsData?.talent_info?.image_uri.length > 0
                ? userDetailsData?.talent_info?.image_uri
                : defaultAvatar
            }
            imgHeight="40"
            imgWidth="40"
          />
        )}
        {userDetailsData?.user_type === userTypes.client && (
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
        {userDetailsData?.user_type === userTypes.team && (
          <Avatar img={userDetailsData?.team_logo || defaultAvatar} imgHeight="40" imgWidth="40" />
        )}
      </DropdownToggle>

      {location?.pathname?.split?.('/')?.[3] === userDetailsData?._id && (
        <LineWrapper>
          <div className="line"></div>
        </LineWrapper>
      )}

      <UserDropDownWrapper>
        <DropdownMenu end>
          <div style={{ maxHeight: '13rem', overflowY: 'auto' }}>
            <DropdownItem
              className={`d-flex justify-content-between ${
                savedUserDetails?._id === userDetailsData?._id ? 'isActive' : ''
              }`}
              // tag={Link}
              onClick={() => handleSwitch(savedUserDetails)}

              // to={`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`}
            >
              <section className="user-info-avatar d-flex align-items-center">
                <div className="user-info me-1 user-nav">
                  <span className="mb-50 user-name fw-bold text-start d-block" id="username">
                    {savedUserName}
                  </span>
                  {savedUserName?.length > 15 && (
                    <UncontrolledTooltip placement="right" target="username">
                      <div className="d-flex flex-column align-items-start">
                        <p className="text-start m-0">{savedUserName}</p>
                      </div>
                    </UncontrolledTooltip>
                  )}
                  <span className="w-100 font-small-3 d-block user-status text-start">
                    {capitalize(savedUserDetails?.user_type) || 'Role'}
                  </span>
                </div>
                {savedUserDetails?.user_type === userTypes.talent ? (
                  <Avatar
                    img={
                      savedUserDetails?.talent_info?.image_uri.length > 0
                        ? savedUserDetails?.talent_info?.image_uri
                        : defaultAvatar
                    }
                    imgHeight="40"
                    imgWidth="40"
                  />
                ) : (
                  <Avatar
                    img={
                      savedUserDetails?.client_info?.image_uri.length > 0
                        ? savedUserDetails?.client_info?.image_uri
                        : defaultAvatar
                    }
                    imgHeight="40"
                    imgWidth="40"
                  />
                )}
              </section>
              {savedUserDetails?._id === userDetailsData?._id && <Check className="m-auto ms-3 me-0" size={14} />}
            </DropdownItem>
            {teams?.map((team) => (
              <DropdownItem
                className={`d-flex justify-content-between ${userDetailsData?._id === team?._id ? 'isActive' : ''}`} // to={`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`}
                onClick={() => handleSwitch(team)}
              >
                <section className="user-info-avatar d-flex align-items-center">
                  <div className="user-info me-1 user-nav">
                    <span className="mb-50 user-name fw-bold text-start d-block" id="username">
                      {team?.name}
                    </span>
                    {team?.name?.length > 15 && (
                      <UncontrolledTooltip placement="right" target="username">
                        <div className="d-flex flex-column align-items-start">
                          <p className="text-start m-0">{team?.name}</p>
                        </div>
                      </UncontrolledTooltip>
                    )}
                    <span className="w-100 font-small-3 d-block user-status text-start">
                      {capitalize(team?.user_type) || 'Role'}
                    </span>
                  </div>
                  <Avatar img={team?.team_logo || avatar7} imgHeight="40" imgWidth="40" />
                </section>
                {userDetailsData?._id === team?._id && <Check className="m-auto ms-3 me-0" size={14} />}
              </DropdownItem>
            ))}
          </div>
          <DropdownItem onClick={handleEdit} className="w-100 edit">
            <span className="align-middle ">Profile</span>
          </DropdownItem>
          <DropdownItem onClick={handleLogout} className="w-100 logout">
            <span className="align-middle ">Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UserDropDownWrapper>
      {isProfileSwitchLoading && <ProfileSwitchModal modal={isProfileSwitchLoading} />}
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
