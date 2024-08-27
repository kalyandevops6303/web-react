import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  UncontrolledTooltip,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ShowToastMessage from '../../../components/toast';
import { ERROR } from '../../../../utility/constants/ToastTypes';
import { clubStatus, userProfileEdit, userTypes } from '../../../../utility/constants/Constant';
import { selectUserData, checkAdmin } from '../../../../redux/selectors/authSelectors';
import { getItemFromSession, setItemFromSession } from '../../../../utility/sessesionStorageControl';
import { checkIsAdmin } from '../../../../redux/actions/authActions';

const EditProfileAccordion = () => {
  const userDetailsData = useSelector(selectUserData);
  const isClubAdmin = useSelector((state) => state.inviteTalent.isClubAdmin);

  const [open, setOpen] = useState('');
  const toggle = useCallback((id) => (open === id ? setOpen() : setOpen(id)), [open]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleEditProfileForTeam = () => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    navigate(`/${userProfileEdit.team}/profile-details`);
  };

  const handleEditProfileForTalent = (tab) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);

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
    } else if (tab === 'internHiring') {
      navigate(`/${userProfileEdit.talent}/intern-hiring`);
    } else if (tab === 'internXobinHiring') {
      navigate(`/${userProfileEdit.talent}/intern-xobin-hiring`);
    } else {
      navigate(`/${userProfileEdit.talent}/payment-details`);
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
