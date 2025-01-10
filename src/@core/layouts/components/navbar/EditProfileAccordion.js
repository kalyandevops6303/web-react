import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  UncontrolledTooltip,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import ShowToastMessage from '../../../components/toast';
import { ERROR } from '../../../../utility/constants/ToastTypes';
import { clubStatus, userProfileEdit, userTypes } from '../../../../utility/constants/Constant';
import {
  selectFlexternBoolean,
  selectTrumioTalent,
  selectUserData,
  selectTrumioIsFlextern,
  appPermissionsSelector,
} from '../../../../redux/selectors/authSelectors';
import { setItemFromSession } from '../../../../utility/sessesionStorageControl';
import { getItem } from '../../../../utility/localStorageControl';
import PermissionWrapper from '@/PermissionWrapper';
import { TextWrapper } from './style';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';

const EditProfileAccordion = () => {
  const userDetailsData = useSelector(selectUserData);
  const flexternBoolean = useSelector(selectFlexternBoolean);
  const trumioTalentBoolean = useSelector(selectTrumioTalent);
  const isFlexternInvited = useSelector(selectTrumioIsFlextern);
  const appPermissions = useSelector(appPermissionsSelector);
  const isClubAdmin = useSelector((state) => state.inviteTalent.isClubAdmin);
  const isDelegate = getItem('isDelegate');

  // ** Flexternships Stores
  const isWorkInProgress = useAppStore((state) => state.isWip);
  const openModal = useAppStore((state) => state.openModal);

  const [open, setOpen] = useState('');
  const toggle = useCallback((id) => (open === id ? setOpen('') : setOpen(id)), [open]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = (id) => {
    if (isWorkInProgress) {
      handleWorkInProgress();
    } else {
      toggle(id);
    }
  };

  const handleWorkInProgress = (nextPath) => {
    if (isWorkInProgress) {
      openModal(GlobalModalType.UNSAVED_WORK, undefined, undefined, { nextPath });
    }
  };

  const handleEditProfileForTeam = () => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    navigate(`/${userProfileEdit.team}/profile-details`);
  };

  const handleEditProfileForTalent = (tab) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    if (isFlexternInvited) {
      if (tab === 'account') {
        navigate(`/${userProfileEdit.talent}/account-details`);
      } else if (tab === 'personal') {
        navigate(`/${userProfileEdit.talent}/personal-details`);
      } else if (tab === 'education') {
        navigate(`/${userProfileEdit.talent}/educational-details`);
      } else if (tab === 'availability') {
        navigate(`/${userProfileEdit.talent}/availability-details`);
      } else if (tab === 'social') {
        navigate(`/${userProfileEdit.talent}/social-details`);
      } else if (tab === 'additional') {
        navigate(`/${userProfileEdit.talent}/additional-details`);
      } else {
        navigate(`/${userProfileEdit.talent}/payment-details`);
      }
    } else {
      if (tab === 'account') {
        navigate(`/${userProfileEdit.talent}/account-details`);
      } else if (tab === 'personal') {
        navigate(`/${userProfileEdit.talent}/personal-details`);
      } else if (tab === 'education') {
        navigate(`/${userProfileEdit.talent}/educational-details`);
      } else if (tab === 'availability') {
        navigate(`/${userProfileEdit.talent}/availability-details`);
      } else if (tab === 'social') {
        navigate(`/${userProfileEdit.talent}/social-details`);
      } else {
        navigate(`/${userProfileEdit.talent}/payment-details`);
      }
    }
  };
  const handleEditProfileForClient = (tab) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);

    if (tab === 'account') {
      navigate(`/${userProfileEdit.client}/account-details`);
    } else if (tab === 'personal') {
      navigate(`/${userProfileEdit.client}/personal-details`);
    } else if (tab === 'education') {
      navigate(`/${userProfileEdit.client}/educational-details`);
    } else if (tab === 'availability') {
      navigate(`/${userProfileEdit.client}/availability-details`);
    } else {
      navigate(`/${userProfileEdit.client}/social-details`);
    }
  };

  const handleEditProfileForClub = (tab) => {
    if (userDetailsData.club_status === clubStatus.ACCEPTED) {
      setItemFromSession('backRouteForProfileEdit', location.pathname);

      if (tab === 'account') {
        navigate(`/${userProfileEdit.club}/account-details`);
      } else {
        navigate(`/${userProfileEdit.club}/profile-details`);
      }
    } else {
      ShowToastMessage(ERROR, 'Club is not verified yet');
    }
  };
  const handleEditTabsForTalent = () => {
    if (userDetailsData?.user_type === userTypes.talent) {
      if (isFlexternInvited) {
        return (
          <>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ACCOUNT']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('account')} className="w-100 edit-link ">
                <span className="align-middle p-1">Account</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PERSONAL']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('personal')} className="w-100 edit-link ">
                <span className="align-middle p-1">Personal</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.EDUCATION']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('education')} className="w-100 edit-link ">
                <span className="align-middle p-1">Education</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.SOCIAL']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('social')} className="w-100 edit-link ">
                <span className="align-middle p-1">Social</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ADDITIONAL']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('additional')} className="w-100 edit-link ">
                <span className="align-middle p-1">Additional Information</span>
              </DropdownItem>
            </PermissionWrapper>
          </>
        );
      } else {
        return (
          <>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ACCOUNT']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('account')} className="w-100 edit-link ">
                <span className="align-middle p-1">Account</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PERSONAL']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('personal')} className="w-100 edit-link ">
                <span className="align-middle p-1">Personal</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.EDUCATION']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('education')} className="w-100 edit-link ">
                <span className="align-middle p-1">Education</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.AVAILABILITY']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('availability')} className="w-100 edit-link ">
                <span className="align-middle p-1">Availability</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.SOCIAL']}>
              <DropdownItem onClick={() => handleEditProfileForTalent('social')} className="w-100 edit-link ">
                <span className="align-middle p-1">Social</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PAYMENT']}>
              <DropdownItem
                onClick={() => handleEditProfileForTalent('payment')}
                disabled={!trumioTalentBoolean}
                className="w-100 edit-link "
              >
                <span className="align-middle p-1">Payment</span>
              </DropdownItem>
            </PermissionWrapper>
          </>
        );
      }
    }
  };

  const renderClientEditProfileTabs = () => {
    if (userDetailsData?.user_type === userTypes.client) {
      if (isDelegate || userDetailsData?.app_roles[0] === userTypes.flexternClient) {
        return (
          <>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ACCOUNT']}>
              <DropdownItem onClick={() => handleEditProfileForClient('account')} className="w-100 edit-link ">
                <span className="align-middle p-1">Account</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PERSONAL']}>
              <DropdownItem onClick={() => handleEditProfileForClient('personal')} className="w-100 edit-link ">
                <span className="align-middle p-1">Company</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.SOCIAL']}>
              <DropdownItem onClick={() => handleEditProfileForClient('social')} className="w-100 edit-link ">
                <span className="align-middle p-1">Social</span>
              </DropdownItem>
            </PermissionWrapper>
          </>
        );
      } else {
        return (
          <>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ACCOUNT']}>
              <DropdownItem onClick={() => handleEditProfileForClient('account')} className="w-100 edit-link ">
                <span className="align-middle p-1">Account</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PERSONAL']}>
              <DropdownItem onClick={() => handleEditProfileForClient('personal')} className="w-100 edit-link ">
                <span className="align-middle p-1">Personal</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.EDUCATION']}>
              <DropdownItem onClick={() => handleEditProfileForClient('education')} className="w-100 edit-link ">
                <span className="align-middle p-1">Education</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.AVAILABILITY']}>
              <DropdownItem onClick={() => handleEditProfileForClient('availability')} className="w-100 edit-link ">
                <span className="align-middle p-1">Availability</span>
              </DropdownItem>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.SOCIAL']}>
              <DropdownItem onClick={() => handleEditProfileForClient('social')} className="w-100 edit-link ">
                <span className="align-middle p-1">Social</span>
              </DropdownItem>
            </PermissionWrapper>
          </>
        );
      }
    }
  };

  return (
    <div className="edit-accordion">
      <Accordion open={open} toggle={handleToggle}>
        <AccordionItem>
          <AccordionHeader className={open === '1' ? 'isActive' : ''} targetId="1">
            <TextWrapper>Edit Profile</TextWrapper>
          </AccordionHeader>

          <div style={{ maxHeight: '9rem', overflowY: 'auto' }}>
            <AccordionBody accordionId="1">
              {/* {userDetailsData?.user_type === userTypes.talent && (
                <>
                  <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ACCOUNT']}>
                    <DropdownItem onClick={() => handleEditProfileForTalent('account')} className="w-100 edit-link ">
                      <span className="align-middle p-1">Account</span>
                    </DropdownItem>
                  </PermissionWrapper>
                  <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PERSONAL']}>
                    <DropdownItem onClick={() => handleEditProfileForTalent('personal')} className="w-100 edit-link ">
                      <span className="align-middle p-1">Personal</span>
                    </DropdownItem>
                  </PermissionWrapper>
                  <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.EDUCATION']}>
                    <DropdownItem onClick={() => handleEditProfileForTalent('education')} className="w-100 edit-link ">
                      <span className="align-middle p-1">Education</span>
                    </DropdownItem>
                  </PermissionWrapper>
                  <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.SOCIAL']}>
                    <DropdownItem onClick={() => handleEditProfileForTalent('social')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Social</span>
                  </DropdownItem>
                  </PermissionWrapper>
                  <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.ADDITIONAL']}>
                    <DropdownItem onClick={() => handleEditProfileForTalent('additional') } disabled={!flexternBoolean} className="w-100 edit-link ">
                      <span className="align-middle p-1">Additional Information</span>
                    </DropdownItem>
                  </PermissionWrapper>
                  <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.AVAILABILITY']}>
                    <DropdownItem onClick={() => handleEditProfileForTalent('availability')} disabled={!trumioTalentBoolean}className="w-100 edit-link ">
                      <span className="align-middle p-1">Availability</span>
                    </DropdownItem>
                  </PermissionWrapper>
                  <PermissionWrapper permissions={appPermissions} permissionName={['ONBOARDING.PAYMENT']}>
                    <DropdownItem onClick={() => handleEditProfileForTalent('payment')} disabled={!trumioTalentBoolean} className="w-100 edit-link ">
                      <span className="align-middle p-1">Payment</span>
                    </DropdownItem>
                  </PermissionWrapper>
                </>
              )} */}{' '}
              {handleEditTabsForTalent()}
              {renderClientEditProfileTabs()}
              {userDetailsData?.user_type === userTypes.team && userDetailsData?.team_type === 'CLUB' && (
                <>
                  <div id="account-edit">
                    <DropdownItem
                      onClick={() => handleEditProfileForClub('account')}
                      className="w-100 edit-link"
                      disabled={!isClubAdmin}
                    >
                      <span className="align-middle p-1">Account</span>
                    </DropdownItem>
                  </div>
                  {!isClubAdmin && (
                    <UncontrolledTooltip placement="left" target="account-edit" className="disabled-tooltip">
                      <p className="m-0 disabled-tooltip">Only an admin can edit the club profile</p>
                    </UncontrolledTooltip>
                  )}
                  <div id="profile-edit">
                    <DropdownItem
                      onClick={() => handleEditProfileForClub('profile')}
                      className="w-100 edit-link"
                      disabled={!isClubAdmin}
                    >
                      <span className="align-middle p-1">Profile</span>
                    </DropdownItem>
                    {!isClubAdmin && (
                      <UncontrolledTooltip placement="left" target="profile-edit" className="disabled-tooltip">
                        <p className="m-0 disabled-tooltip">Only an admin can edit the club profile</p>
                      </UncontrolledTooltip>
                    )}
                  </div>
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
  );
};

export default EditProfileAccordion;
