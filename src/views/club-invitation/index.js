/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { capitalize } from 'lodash';
import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../lib/date-time';
import { GrayBorderContainer, GrayCardWrapper } from '../styled';
import InfoIcon from '../../assets/images/timeline-info-icon.png';
import { getProfilePercentage, updateInvitation, getMyTeam } from '../../redux/actions/dashboardActions';
import { getTeams, getWhoInvited } from '../../redux/actions/teamsActions';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import theme from '../../configs/themeVariables';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import { profilePercentage } from '../../redux/selectors/dashboardSelectors';
import AcceptRequestModal from '../modals/AcceptRequestModal';
import RejectRequestModal from '../modals/RejectRequestModal';

import { selectFlexternBoolean } from '../../redux/selectors/authSelectors';
import { getProfileCompletionFlextern } from '../../redux/actions/talentOnboardingActions';

const ClubInvitation = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [invitedByData, setInvitedByData] = useState('');
  const [accpetModal, setAccpetModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [status, setStatus] = useState(invitedByData?.request_status);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const profilePercentageData = useSelector(profilePercentage);

  const [isGetWhoInvitedLoading, setGetWhoInvitedLoading] = useState(false);
  const breadCrumb = [{ title: 'Dashboard' }, { title: 'Club invitation request' }];

  const onSuccess = (res) => {
    setInvitedByData(res);
    setGetWhoInvitedLoading(false);
    setStatus(res?.request_status);
  };

  const onError = () => {
    setGetWhoInvitedLoading(false);
  };
  useEffect(() => {
    setGetWhoInvitedLoading(true);
    dispatch(getWhoInvited({ id: params.inviteId, onSuccess, onError }));
  }, []);

  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const handleCancel = () => {
    setCompleteProfileModal(false);
    setAccpetModal(false);
    setRejectModal(false);
  };
  const isFlextern = useSelector(selectFlexternBoolean);
  useEffect(() => {
    if (!profilePercentageData) {
      if (isFlextern) {
        dispatch(getProfileCompletionFlextern());
      } else {
        dispatch(getProfilePercentage());
      }
    }
  }, []);

  const onAccept = () => {
    const data = {
      action: 'ACCEPT',
      request_id: params.inviteId,
    };
    setIsStatusUpdating(true);
    dispatch(
      updateInvitation({
        data,
        onSuccess: () => {
          setStatus('ACCEPTED');
          setIsStatusUpdating(false);
          setAccpetModal(false);
          dispatch(getTeams({ onSuccess: () => {} }));
          dispatch(getMyTeam());
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };

  const handleAccept = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModal(true);
    } else {
      setAccpetModal(true);
    }
  };

  const onReject = () => {
    const data = {
      action: 'REJECT',
      request_id: params.inviteId,
    };
    setIsStatusUpdating(true);
    dispatch(
      updateInvitation({
        data,
        onSuccess: () => {
          setStatus('REJECTED');
          setIsStatusUpdating(false);
          setRejectModal(false);
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };
  const handleDecline = () => {
    setRejectModal(true);
  };
  if (isGetWhoInvitedLoading) {
    return <ComponentSpinner />;
  }

  return (
    <div className="trumio">
      <BreadCrumbs data={breadCrumb} />
      {completeProfileModal && (
        <CompleteProfileModal modal={completeProfileModal} toggleModal={toggleCompleteProfileModal} />
      )}
      {accpetModal && (
        <AcceptRequestModal
          title={invitedByData?.request_type}
          isLoading={isStatusUpdating}
          data={invitedByData}
          onAccept={onAccept}
          modal={accpetModal}
          toggleModal={handleCancel}
          isClubInvitation
        />
      )}
      {rejectModal && (
        <RejectRequestModal
          title={invitedByData?.request_type}
          isLoading={isStatusUpdating}
          data={invitedByData}
          onReject={onReject}
          modal={rejectModal}
          toggleModal={handleCancel}
          isClubInvitation
        />
      )}

      <Row>
        <Col sm="12" md="12" lg="10">
          <GrayCardWrapper>
            <Card>
              <CardHeader className="p-0">
                <GrayBorderContainer className="w-100 px-2 pt-2 pb-1">
                  <h4 className="m-0">Club invitation request</h4>
                </GrayBorderContainer>
              </CardHeader>
              <CardBody>
                <div className="d-flex mt-2 align-items-start">
                  <img src={InfoIcon} alt="info" className="mt-2 me-1" />
                  <Card className="white-card-bg w-100" style={{ minHeight: '18rem' }}>
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center">
                        {/* <h4 className="m-0">{invitedByData?.request_type}</h4> */}
                        <h4 className="m-0">Club invitation request</h4>

                        {isStatusUpdating ? (
                          'Loading..'
                        ) : status === 'PENDING' ? (
                          <div className="d-flex text-blue text-decoration-underline">
                            <p className="me-2 cursor-pointer mb-0" onClick={handleDecline}>
                              Decline
                            </p>
                            <p className="cursor-pointer mb-0" onClick={handleAccept}>
                              Accept
                            </p>
                          </div>
                        ) : (
                          status && capitalize(status)
                        )}
                      </div>
                      <h5 className="mt-2 pt-50 font-small-4 mb-0">Invite Sent</h5>
                      <p className="font-small-4">
                        {invitedByData?.created_at
                          ? DateTime.fromMillis(invitedByData?.created_at).toFormat('MMM dd, yy')
                          : '-'}
                      </p>
                      <div className="d-flex gap-4">
                        <div className="d-flex align-items-center">
                          <Avatar
                            img={invitedByData?.request_from?.image_uri || defaultAvatar}
                            imgHeight="38"
                            imgWidth="38"
                            className="me-50 user-pic"
                          />
                          <div>
                            <Link to={`/profile/talent/${invitedByData?.request_from?.user_id}`}>
                              <p className="fw-bold m-0" style={{ color: theme.activeNavPillText }}>
                                {invitedByData?.request_from?.first_name} {invitedByData?.request_from?.last_name}
                              </p>
                            </Link>
                            <p className="m-0">{invitedByData?.request_from?.role || 'Role'} </p>
                          </div>
                        </div>
                        {invitedByData?.request_type === 'Team Join Request' && <p className="mt-auto">to join</p>}
                        <div>
                          <Link
                            to={`/profile/team/${
                              invitedByData?.request_type === 'Team Join Request'
                                ? invitedByData?.request_for?.team_id
                                : invitedByData?.request_from?.team_id
                            }`}
                          >
                            <p className="fw-bold m-0" style={{ color: theme.activeNavPillText }}>
                              {invitedByData?.request_for?.team_name || invitedByData?.request_from?.team_name}
                            </p>
                          </Link>
                          <p className="m-0">
                            {invitedByData?.request_for?.team_name || invitedByData?.request_from?.team_name
                              ? 'Club Name'
                              : ''}
                          </p>
                        </div>
                      </div>
                      {invitedByData?.message && (
                        <>
                          <p className="fw-bolder mt-2 mb-0">Message</p>
                          <div className="w-75">
                            <p className="font-small-3 w-50">{invitedByData?.message}</p>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </GrayCardWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ClubInvitation;
