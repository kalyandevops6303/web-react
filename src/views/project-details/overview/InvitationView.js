/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import { useParams } from 'react-router';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { DateTime } from 'luxon';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import InfoIcon from '@src/assets/images/timeline-info-icon.png';

import { setItem } from '../../../utility/localStorageControl';

import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { GrayBorderContainer, GrayCardWrapper } from '../../styled';
import { getWhoInvited } from '../../../redux/actions/teamsActions';
import { getProfilePercentage, updateInvitation } from '../../../redux/actions/dashboardActions';
import theme from '../../../configs/themeVariables';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import AcceptRequestModal from '../../modals/AcceptRequestModal';
import RejectRequestModal from '../../modals/RejectRequestModal';

const InvitationView = () => {
  const dispatch = useDispatch();
  // const userData = useSelector(selectUserData);
  // const inviteToken = getItem('inviteToken');
  const params = useParams();
  const [invitedByData, setInvitedByData] = useState('');
  const [accpetModal, setAccpetModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const profilePercentageData = useSelector(profilePercentage);

  const [status, setStatus] = useState(invitedByData?.request_status);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [isGetWhoInvitedLoading, setGetWhoInvitedLoading] = useState(false);
  useEffect(() => {
    setItem('isInviteRead', true);
  }, []);

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

  // const handleAccept = () => {
  //   const data = {
  //     action: 'ACCEPT',
  //     request_id: params.inviteId,
  //   };
  //   setIsStatusUpdating(true);
  //   dispatch(
  //     updateInvitation({
  //       data,
  //       onSuccess: () => {
  //         setStatus('ACCEPTED');
  //         setIsStatusUpdating(false);
  //       },
  //       onError: () => {
  //         setIsStatusUpdating(false);
  //       },
  //     }),
  //   );
  // };
  // const handleDecline = () => {
  //   const data = {
  //     action: 'REJECT',
  //     request_id: params.inviteId,
  //   };
  //   setIsStatusUpdating(true);
  //   dispatch(
  //     updateInvitation({
  //       data,
  //       onSuccess: () => {
  //         setStatus('DECLINED');
  //         setIsStatusUpdating(false);
  //       },
  //       onError: () => {
  //         setIsStatusUpdating(false);
  //       },
  //     }),
  //   );
  // };

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const handleCancel = () => {
    setCompleteProfileModal(false);
    setAccpetModal(false);
    setRejectModal(false);
  };

  useEffect(() => {
    if (!profilePercentageData) {
      dispatch(getProfilePercentage());
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
          setAccpetModal(false);
          setIsStatusUpdating(false);
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
          setStatus('DECLINED');
          setRejectModal(false);
          setIsStatusUpdating(false);
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
    <ComponentSpinner />;
  }
  return (
    <Row>
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
        />
      )}
      <Col sm="12" md="12" lg="10">
        <GrayCardWrapper>
          <Card>
            <CardHeader className="p-0">
              <GrayBorderContainer className="w-100 px-2 pt-2 pb-1">
                <h4 className="m-0">{invitedByData?.request_type}</h4>
              </GrayBorderContainer>
            </CardHeader>
            <CardBody>
              <div className="d-flex mt-2 align-items-start">
                <img src={InfoIcon} alt="info" className="mt-2 me-1" />
                <Card className="white-card-bg w-100" style={{ minHeight: '18rem' }}>
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mt-1">Request</h5>
                      {isStatusUpdating ? (
                        'Loading..'
                      ) : status === 'PENDING' ? (
                        <div className="d-flex text-blue text-decoration-underline">
                          <p className="me-2 cursor-pointer mb-0" onClick={handleDecline}>
                            Reject
                          </p>
                          <p className="cursor-pointer mb-0" onClick={handleAccept}>
                            Accept
                          </p>
                        </div>
                      ) : status === 'READ_ONLY' ? (
                        <div className="d-flex text-blue text-decoration-underline">
                          <p className="cursor-pointer mb-0" onClick={handleAccept}>
                            Create bid
                          </p>
                        </div>
                      ) : (
                        status && capitalize(status)
                      )}
                    </div>
                    <h5 className="mt-2 pt-50 font-small-4 mb-0">Sent by</h5>
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
                          <p className="fw-bold m-0" style={{ color: theme.activeNavPillText }}>
                            {invitedByData?.request_from?.first_name} {invitedByData?.request_from?.last_name}
                          </p>
                          <p className="m-0">{invitedByData?.request_from?.role || 'Role'} </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div>
                          <p className="fw-bold m-0" style={{ color: theme.activeNavPillText }}>
                            {invitedByData?.request_for?.team_name || invitedByData?.request_from?.team_name}
                          </p>
                          <p className="m-0">
                            {invitedByData?.request_for?.team_name || invitedByData?.request_from?.team_name
                              ? 'Team Name'
                              : ''}{' '}
                          </p>
                        </div>
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
  );
};

export default InvitationView;
