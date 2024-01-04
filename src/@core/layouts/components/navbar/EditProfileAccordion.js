import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { clubStatus, userTypes } from '../../../../utility/constants/Constant';
import { selectUserData, selectSavedUserData } from '../../../../redux/selectors/authSelectors';
const EditProfileAccordion = () => {
  const userDetailsData = useSelector(selectUserData);
  const selectSavedUserDetailsData = useSelector(selectSavedUserData);

  const [open, setOpen] = useState('');
  const toggle = useCallback((id) => (open === id ? setOpen() : setOpen(id)), [open]);
  const navigate = useNavigate();
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
    if (userDetailsData.club_status === clubStatus.ACCEPTED) {
      if (tab === 'account') {
        navigate('/create-club/account-details', { state: { isEditing: true } });
      } else {
        navigate('/create-club/profile-details', { state: { isEditing: true } });
      }
    } else {
      ShowToastMessage(ERROR, 'Club is not verified yet');
    }
  };

  const notAnAdmin =
    userDetailsData?.team_members?.map((member) => member?.user_id)?.includes(selectSavedUserDetailsData?._id) &&
    userDetailsData?.team_members?.find((member) => member?.user_id === selectSavedUserDetailsData?._id)
      ?.member_type !== 'ADMIN';

  return (
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
                  <DropdownItem onClick={() => handleEditProfileForTalent('account')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Account</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForTalent('personal')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Personal</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForTalent('education')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Education</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForTalent('availability')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Availability</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForTalent('social')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Social</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForTalent('payment')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Payment</span>
                  </DropdownItem>
                </>
              )}
              {userDetailsData?.user_type === userTypes.client && (
                <>
                  <DropdownItem onClick={() => handleEditProfileForClient('account')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Account</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForClient('personal')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Personal</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForClient('education')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Education</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForClient('availability')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Availability</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => handleEditProfileForClient('social')} className="w-100 edit-link ">
                    <span className="align-middle p-1">Social</span>
                  </DropdownItem>
                </>
              )}
              {userDetailsData?.user_type === userTypes.team && userDetailsData?.team_type === 'CLUB' && (
                <>
                  <div id="account-edit">
                    <DropdownItem
                      onClick={() => handleEditProfileForClub('account')}
                      className="w-100 edit-link"
                      disabled={notAnAdmin}
                    >
                      <span className="align-middle p-1">Account</span>
                    </DropdownItem>
                  </div>
                  {notAnAdmin && (
                    <UncontrolledTooltip placement="left" target="account-edit" className="disabled-tooltip">
                      <p className="m-0 disabled-tooltip">Only an admin can edit the club profile</p>
                    </UncontrolledTooltip>
                  )}
                  <div id="profile-edit">
                    <DropdownItem
                      onClick={() => handleEditProfileForClub('profile')}
                      className="w-100 edit-link"
                      disabled={notAnAdmin}
                    >
                      <span className="align-middle p-1">Profile</span>
                    </DropdownItem>
                    {notAnAdmin && (
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
