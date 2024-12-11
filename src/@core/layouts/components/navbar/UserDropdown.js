// ** React Imports
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowToastMessage from '../../../../@core/components/toast';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { Check } from 'react-feather';

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip,
  AccordionHeader,
} from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useDispatch, useSelector } from 'react-redux';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

import { getAppPermissions, logoutAction, switchProfile } from '../../../../redux/actions/authActions';
import { capitalize } from 'lodash';
import styled from 'styled-components';
import theme from '../../../../configs/themeVariables';
import { clubStatus, delegateTypes, userTypes } from '../../../../utility/constants/Constant';
import { getItem, setItem } from '../../../../utility/localStorageControl';
import {
  selectSavedUserData,
  selectIsTeamLoggedIn,
  selectUserData,
  appPermissionsSelector,
  selectIsLoggedIn,
} from '../../../../redux/selectors/authSelectors';
import ProfileSwitchModal from '../../../../views/modals/ProfileSwitchModal';
import { selectTeamData } from '../../../../redux/selectors/teamSelectors';
import { CometChat } from '@cometchat-pro/chat';
import { messaging } from '../../../../configs/api/firebase';
import EditProfileAccordion from './EditProfileAccordion';
import DelegateAccordion from './DelegateAccordion';
import { DeclinedButton, InreviewButton, TextWrapper, UserDropDownWrapper } from './style';
import CustomerSupportModal from '../../../../views/modals/CustomerSupportModal';
import FeedbackForCustomerSupportModal from '../../../../views/modals/CustomerSupportFeedbackModal';
import { clearAllFormData, setFormDocuments } from '../../../../redux/reducers/formData';
import DelegateNameCard from '../../../../views/cards/DelegateNameCard';
import {
  checkIsDelegateModeModalVisible,
  checkIsInviteDelegateModalVisible,
} from '../../../../redux/selectors/delegateSelectors';
import { toggleAddDelegateModal, toggleDelegateModeModal } from '../../../../redux/reducers/delegate';
import AddDelegateModal from '../../../../views/modals/AddDelegateModal';
import DelegateModeModal from '../../../../views/modals/DelegateModeModal';
import { truncateSentence } from '../../../../utility/Utils';
import PermissionWrapper from '@/PermissionWrapper';
import { FlexternUserAppRole } from '@/flexternships/constraints/enums/core-enums';
import { isFlexternshipApp } from '@/configs/api/env';
import { removeCookiesItem } from '@/utility/cookiesControl';
const UserDropdown = ({ setNavBarLoading }) => {
  const userDetailsData = useSelector(selectUserData);
  const isLoading = useSelector((state) => state.auth.userDataLoading);
  const savedUserDetails = useSelector(selectSavedUserData);
  const isTeamLoggedIn = useSelector(selectIsTeamLoggedIn);
  const teams = useSelector(selectTeamData);
  const isInviteDelegateModalVisible = useSelector(checkIsInviteDelegateModalVisible);
  const appPermissions = useSelector(appPermissionsSelector);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isDelegate = getItem('isDelegate');
  const delegateType = getItem('delegateType');

  const [isProfileSwitchLoading, setProfileSwitchLoading] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const [feedbackSupportModal, setFeedbackSupportModal] = useState(false);
  const isDelegateProfileCreated = getItem('isDelegateProfileCreated');

  const toggleAddDelegate = () => {
    setDelegateEmail('');
    dispatch(toggleAddDelegateModal(!isInviteDelegateModalVisible));
  };
  const [delegateEmail, setDelegateEmail] = useState('');
  const isDelegateModeModalVisible = useSelector(checkIsDelegateModeModalVisible);

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
    const onSuccess = async () => {
      window.history.pushState(null, '', '/auth/login');
      window.addEventListener('popstate', function (event) {
        history.pushState(null, '', '/auth/login');
      });

      navigate('/auth/login');

      // Fcm unsubscribe
      if (fcmToken) {
        try {
          await messaging?.deleteToken();
        } catch (error) {
          console.error(error);
        }
      }
      // CometChat logout
      const cometChatToken = getItem('cometChatToken');
      if (cometChatToken) {
        try {
          CometChat.disconnect();
          await CometChat.logout();
        } catch (error) {
          console.error(error);
        }
      }

      const keyToPreserve = 'isUserVisited';
      const preservedValue = getItem(keyToPreserve);
      // eslint-disable-next-line no-undef
      window.localStorage.clear();
      window.sessionStorage.clear();
      removeCookiesItem('access_token');
      if (preservedValue) {
        setItem(keyToPreserve, preservedValue);
      }
      dispatch(clearAllFormData());
      dispatch(setFormDocuments(null));
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

  const toggleDelegateMode = () => dispatch(toggleDelegateModeModal(!isDelegateModeModalVisible));
  const markDelegateModeModalAsSeen = getItem('markDelegateModeModalAsSeen');

  const handleShowModal = (selected) => {
    !selected && ShowToastMessage('success', `Profile switched successfully`);
    navigate('/dashboard');
  };
  const handleSwitch = (data, selected) => {
    dispatch(switchProfile({ data, onSuccess: handleShowModal, selected }));
  };

  const handleCustomerSupport = () => {
    setSupportModal(true);
  };

  const onCustomerSupportSuccess = () => {
    setSupportModal(false);
    setFeedbackSupportModal(true);
  };

  const toggleSupportModal = () => {
    setSupportModal(!supportModal);
  };

  const toggleFeedbackSupportModal = () => {
    setFeedbackSupportModal(!feedbackSupportModal);
  };

  // get app permissions
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAppPermissions());
    }
  }, []);

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

  const adminUsername =
    userDetailsData?.admin_client_info &&
    userDetailsData?.admin_client_info?.first_name + ' ' + userDetailsData?.admin_client_info?.last_name;

  return (
    <UncontrolledDropdown
      tag="li"
      style={!userName ? { minWidth: '10rem' } : {}}
      className={`dropdown-user nav-item ${!userName ? 'invisible' : ''}`}
    >
      {isDelegate && !markDelegateModeModalAsSeen && isDelegateModeModalVisible && (
        <DelegateModeModal modal={isDelegateModeModalVisible} toggleModal={toggleDelegateMode} />
      )}
      {isInviteDelegateModalVisible && (
        <AddDelegateModal
          modal={isInviteDelegateModalVisible}
          toggleModal={toggleAddDelegate}
          delegateEmail={delegateEmail}
          setDelegateEmail={setDelegateEmail}
        />
      )}
      <DropdownToggle href="/" tag="a" className={`nav-link dropdown-user-link `} onClick={(e) => e.preventDefault()}>
        <div
          className={`user-nav d-sm-flex d-none 
          ${isDelegate ? 'delegate-username' : ''}
          `}
        >
          <span className="user-name truncate-1 fw-bold" id="username">
            {isDelegate ? `${userDetailsData?.admin_client_info?.company_name}` : userName}
          </span>
          {userName?.length > 15 && (
            <UncontrolledTooltip placement="right" target="username">
              <div className="d-flex flex-column align-items-start">
                <p className="m-0">{isDelegate ? `${userDetailsData?.admin_client_info?.company_name}` : userName}</p>
              </div>
            </UncontrolledTooltip>
          )}
          {isDelegate ? (
            <span className="user-name truncate-1" id="delegateUsername">
              {truncateSentence({ sentence: `${userName} (${adminUsername})`, maxCharacters: 15 })}
            </span>
          ) : (
            <span className="user-status">
              {userDetailsData?.team_type
                ? capitalize(userDetailsData?.team_type)
                : capitalize(userDetailsData?.user_type) || 'Role'}
            </span>
          )}
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
        <DropdownMenu style={{ width: '24rem' }} end>
          {isDelegate && (
            <div className="mt-1">
              <span className="px-1">
                {delegateType === delegateTypes.payment_delegate ? 'Payment Delegate for' : 'Delegate for'}:
              </span>
              <div className="mt-50 border-bottom border-grey-light">
                {userDetailsData && (
                  <DelegateNameCard
                    img={
                      userDetailsData?.admin_client_info?.image_uri.length > 0
                        ? userDetailsData?.admin_client_info?.image_uri
                        : defaultAvatar
                    }
                    userType={userDetailsData?.user_type}
                    userName={adminUsername}
                  />
                )}
              </div>
            </div>
          )}
          {!isDelegate && (
            <TextWrapper onClick={handleEdit} className="w-100 edit-accordion p-4">
              Public Profile
            </TextWrapper>
          )}
          {!isDelegate || isDelegateProfileCreated ? (
            <EditProfileAccordion />
          ) : (
            <TextWrapper
              onClick={() => navigate('/client-onboarding/account-details')}
              className="w-100 edit-accordion"
            >
              <span className="align-middle">Create My Profile</span>
            </TextWrapper>
          )}
          {!isDelegate && (
            <div style={{ maxHeight: '13rem', overflowY: 'auto' }}>
              {userDetailsData && (
                <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.USERDROPDOWN.ACCOUNT']}>
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
                </PermissionWrapper>
              )}
              {teams?.map((team, index) => (
                <PermissionWrapper permissions={appPermissions} permissionName={['DASHBOARD.USERDROPDOWN.TEAMS']}>
                  <DropdownItem
                    className={`d-flex justify-content-between ${userDetailsData?._id === team?._id ? 'isActive' : ''}`} // to={`/profile/${userDetailsData?.user_type}/${userDetailsData?._id}`}
                    onClick={() => handleSwitch(team, userDetailsData?._id === team?._id)}
                    disabled={team?.club_status === clubStatus.DECLINED || team?.club_status === clubStatus.IN_REVIEW}
                    key={index}
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
                    {team.club_status === clubStatus.DECLINED && <DeclinedButton>Rejected</DeclinedButton>}
                    {team.club_status === clubStatus.IN_REVIEW && <InreviewButton>In Review</InreviewButton>}

                    {userDetailsData?._id === team?._id && <Check className="m-auto ms-3 me-0" size={14} />}
                  </DropdownItem>
                </PermissionWrapper>
              ))}
            </div>
          )}
          {savedUserDetails?.user_type === userTypes.client && !isDelegate && (
            <DelegateAccordion setDelegateEmail={setDelegateEmail} />
          )}
          {savedUserDetails?.user_type === userTypes.client && isFlexternshipApp ? null : (
            <TextWrapper onClick={handleCustomerSupport} className="mt-0 w-100 customer-support">
              <span className="align-middle ">Contact support</span>
            </TextWrapper>
          )}
          <TextWrapper onClick={handleLogout} className="w-100 logout">
            <span className="align-middle ">Logout</span>
          </TextWrapper>
        </DropdownMenu>
      </UserDropDownWrapper>
      {isProfileSwitchLoading && <ProfileSwitchModal modal={isProfileSwitchLoading} />}
      {supportModal && (
        <CustomerSupportModal
          onSuccess={onCustomerSupportSuccess}
          modal={supportModal}
          toggleModal={toggleSupportModal}
        />
      )}
      {feedbackSupportModal && (
        <FeedbackForCustomerSupportModal modal={feedbackSupportModal} toggleModal={toggleFeedbackSupportModal} />
      )}
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
