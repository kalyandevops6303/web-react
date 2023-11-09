// ** React Imports
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShowToastMessage from '../../../../@core/components/toast';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { User, Power, Check, CheckCircle } from 'react-feather';

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from 'reactstrap';

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
import {
  selectSavedUserData,
  selectIsTeamLoggedIn,
  selectUserData,
  selectAuthLoading,
} from '../../../../redux/selectors/authSelectors';
import ProfileSwitchModal from '../../../../views/modals/ProfileSwitchModal';
import { useState } from 'react';
import { selectTeamData } from '../../../../redux/selectors/teamSelectors';
import { CometChat } from '@cometchat-pro/chat';
import { messaging } from '../../../../configs/api/firebase';

const UserDropdown = () => {
  const userDetailsData = useSelector(selectUserData);
  const isLoading = useSelector((state) => state.auth.userDataLoading);
  const savedUserDetails = useSelector(selectSavedUserData);
  const isTeamLoggedIn = useSelector(selectIsTeamLoggedIn);
  const teams = useSelector(selectTeamData);

  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isProfileSwitchLoading, setProfileSwitchLoading] = useState(false);

  const handleEdit = () => {
    const talentOrClientProfile =
      userDetailsData?.user_type === userTypes.talent || userDetailsData?.user_type === userTypes.client;
    navigate(
      `/profile/${talentOrClientProfile ? userDetailsData?.user_type : userDetailsData?.team_type}/${
        userDetailsData?._id
      }`,
    );
  };

  const handleLogout = async () => {
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

    // CometChat logout
    await messaging.deleteToken();
    await CometChat.logout();
  };

  const [open, setOpen] = useState('');
  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

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
      border-top: 1px solid ${theme.cardHeaderBorderColor};
      margin-top: 1rem;
    }
    .edit {
      color: ${theme.primary};
      padding: 1rem 1.2rem;
      display: block;
      border-bottom: 1px solid ${theme.cardHeaderBorderColor};
      &:active {
        color: white;
      }
    }

    .dropdown-item {
      width: 100%;
    }
    .edit-accordion {
      border-bottom: 1px solid ${theme.cardHeaderBorderColor};
      margin-bottom: 1rem;
    }
    .accordion-button {
      font-size: 14px !important;
      font-weight: normal !important;
    }
    .accordion-body {
      padding: 0;
      margin-bottom: 1rem;
    }
    .edit-link {
      padding: 1rem 1.2rem;
    }
  `;

  const handleShowModal = (selected) => {
    !selected && ShowToastMessage('success', `Profile switched successfully`);
    navigate('/dashboard');
  };
  const handleSwitch = (data, selected) => {
    dispatch(switchProfile({ data, onSuccess: handleShowModal, selected }));
  };

  const userName = isTeamLoggedIn
    ? userDetailsData?.name
    : userDetailsData
    ? userDetailsData?.user_type === userTypes.talent
      ? userDetailsData?.talent_info?.first_name + ' ' + userDetailsData?.talent_info?.last_name
      : userDetailsData?.client_info?.first_name + ' ' + userDetailsData?.client_info?.last_name
    : '';

  const savedUserName = savedUserDetails
    ? savedUserDetails?.user_type === userTypes.talent
      ? savedUserDetails?.talent_info?.first_name + ' ' + savedUserDetails?.talent_info?.last_name
      : savedUserDetails?.client_info?.first_name + ' ' + savedUserDetails?.client_info?.last_name
    : '';

  const handleEditProfileForTeam = () => {
    navigate('/create-team/profile-details', {
      state: { isEditing: true },
    });
  };

  const handleEditProfileForTalent = (tab) => {
    if (tab === 'account') {
      navigate('/talent-onboarding/account-details', {
        state: { isEditing: true },
      });
    } else if (tab === 'personal') {
      navigate('/talent-onboarding/personal-details', {
        state: { isEditing: true },
      });
    } else if (tab === 'education') {
      navigate('/talent-onboarding/educational-details', {
        state: { isEditing: true },
      });
    } else if (tab === 'availability') {
      navigate('/talent-onboarding/availability-details', {
        state: { isEditing: true },
      });
    } else if (tab === 'social') {
      navigate('/talent-onboarding/social-details', {
        state: { isEditing: true },
      });
    } else {
      navigate('/talent-onboarding/payment-details', {
        state: { isEditing: true },
      });
    }
  };
  const handleEditProfileForClient = (tab) => {
    if (tab === 'account') {
      navigate('/client-onboarding/account-details', {
        state: { isEditing: true },
      });
    } else if (tab === 'personal') {
      navigate('/client-onboarding/personal-details', {
        state: { isEditing: true },
      });
    } else if (tab === 'education') {
      navigate('/client-onboarding/educational-details', {
        state: { isEditing: true },
      });
    } else if (tab === 'availability') {
      navigate('/client-onboarding/availability-details', {
        state: { isEditing: true },
      });
    } else {
      navigate('/client-onboarding/social-details', {
        state: { isEditing: true },
      });
    }
  };

  const handleEditProfileForClub = (tab) => {
    if (tab === 'account') {
      navigate('/create-club/account-details', { state: { isEditing: true } });
    } else {
      navigate('/create-club/profile-details', { state: { isEditing: true } });
    }
  };
  return (
    <UncontrolledDropdown
      tag="li"
      style={isLoading && !userName ? { minWidth: '10rem' } : {}}
      className={`dropdown-user nav-item ${isLoading && !userName ? 'invisible' : ''}`}
    >
      <DropdownToggle href="/" tag="a" className={`nav-link dropdown-user-link `} onClick={(e) => e.preventDefault()}>
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
          <span className="user-status">
            {userDetailsData?.team_type
              ? capitalize(userDetailsData?.team_type)
              : capitalize(userDetailsData?.user_type) || 'Role'}
          </span>
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
          <DropdownItem onClick={handleEdit} className="w-100 edit">
            <span className="align-middle ">Public Profile</span>
          </DropdownItem>
          <div className="edit-accordion">
            <Accordion open={open} toggle={toggle}>
              <AccordionItem>
                <AccordionHeader className={open === '1' ? 'isActive' : ''} targetId="1">
                  Edit Profile
                </AccordionHeader>

                <div style={{ maxHeight: '9rem', overflowY: 'auto' }}>
                  <AccordionBody accordionId="1">
                    {userDetailsData?.user_type === userTypes.talent && (
                      <>
                        <DropdownItem
                          onClick={() => handleEditProfileForTalent('account')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Account</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleEditProfileForTalent('personal')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Personal</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleEditProfileForTalent('education')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Education</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleEditProfileForTalent('availability')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Availability</span>
                        </DropdownItem>
                        <DropdownItem onClick={() => handleEditProfileForTalent('social')} className="w-100 edit-link ">
                          <span className="align-middle p-1">Social</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleEditProfileForTalent('payment')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Payment</span>
                        </DropdownItem>
                      </>
                    )}
                    {userDetailsData?.user_type === userTypes.client && (
                      <>
                        <DropdownItem
                          onClick={() => handleEditProfileForClient('account')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Account</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleEditProfileForClient('personal')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Personal</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleEditProfileForClient('education')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Education</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleEditProfileForClient('availability')}
                          className="w-100 edit-link "
                        >
                          <span className="align-middle p-1">Availability</span>
                        </DropdownItem>
                        <DropdownItem onClick={() => handleEditProfileForClient('social')} className="w-100 edit-link ">
                          <span className="align-middle p-1">Social</span>
                        </DropdownItem>
                      </>
                    )}
                    {userDetailsData?.user_type === userTypes.team && userDetailsData?.team_type === 'CLUB' && (
                      <>
                        <DropdownItem onClick={() => handleEditProfileForClub('account')} className="w-100 edit-link">
                          <span className="align-middle p-1">Account</span>
                        </DropdownItem>
                        <DropdownItem onClick={() => handleEditProfileForClub('profile')} className="w-100 edit-link">
                          <span className="align-middle p-1">Profile</span>
                        </DropdownItem>
                      </>
                    )}
                    {userDetailsData?.user_type === userTypes.team && userDetailsData?.team_type === 'TEAM' && (
                      <DropdownItem onClick={handleEditProfileForTeam} className="w-100 edit-link ">
                        <span className="align-middle p-1">Profile</span>
                      </DropdownItem>
                    )}
                  </AccordionBody>
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          <div style={{ maxHeight: '13rem', overflowY: 'auto' }}>
            {userDetailsData && (
              <DropdownItem
                className={`d-flex justify-content-between ${
                  savedUserDetails?._id === userDetailsData?._id && !isLoading ? 'isActive' : ''
                }`}
                onClick={() => handleSwitch(savedUserDetails, savedUserDetails?._id === userDetailsData?._id)}
              >
                <section className="user-info-avatar d-flex align-items-center">
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
                  <div className="user-info ms-1 ms user-nav">
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
                      {savedUserDetails?.user_type ? capitalize(savedUserDetails?.user_type) : ''}
                    </span>
                  </div>
                </section>
                {savedUserDetails?._id === userDetailsData?._id && <Check className="m-auto ms-3 me-0" size={14} />}
              </DropdownItem>
            )}
            {teams?.map((team) => (
              <DropdownItem
                className={`d-flex justify-content-between ${userDetailsData?._id === team?._id ? 'isActive' : ''}`} // to={`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`}
                onClick={() => handleSwitch(team, userDetailsData?._id === team?._id)}
              >
                <section className="user-info-avatar d-flex align-items-center">
                  <Avatar img={team?.team_logo || avatar7} imgHeight="40" imgWidth="40" />

                  <div className="user-info ms-1 user-nav">
                    <span className="mb-50 user-name fw-bold text-start d-block" id={`username-${team?._id}`}>
                      {team?.name}
                    </span>
                    {team?.name?.length > 15 && (
                      <UncontrolledTooltip placement="right" target={`username-${team?._id}`}>
                        <div className="d-flex flex-column align-items-start">
                          <p className="text-start m-0">{team?.name}</p>
                        </div>
                      </UncontrolledTooltip>
                    )}
                    <span className="w-100 font-small-3 d-block user-status text-start">
                      {capitalize(team?.team_type) || 'Role'}
                    </span>
                  </div>
                </section>
                {userDetailsData?._id === team?._id && <Check className="m-auto ms-3 me-0" size={14} />}
              </DropdownItem>
            ))}
          </div>

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
