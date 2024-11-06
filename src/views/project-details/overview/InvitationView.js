/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { DateTime } from 'luxon';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import InfoIcon from '@src/assets/images/timeline-info-icon.png';

import { Link } from 'react-router-dom';

import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { GrayBorderContainer, GrayCardWrapper } from '../../styled';
import { getWhoInvited } from '../../../redux/actions/teamsActions';
import { getProfilePercentage } from '../../../redux/actions/dashboardActions';
import theme from '../../../configs/themeVariables';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import CreateBidModal from '../../modals/CreateBidModal';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import { getProfileCompletionFlextern } from '../../../redux/actions/talentOnboardingActions';
import { selectFlexternBoolean } from '../../../redux/selectors/authSelectors';

const InvitationView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [invitedByData, setInvitedByData] = useState('');
  const [createBidModal, setCreateBidModal] = useState(null);

  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const profilePercentageData = useSelector(profilePercentage);
  const projectDetailsData = useSelector(projectDetails);
  const [status, setStatus] = useState(invitedByData?.request_status);
  const [isGetWhoInvitedLoading, setGetWhoInvitedLoading] = useState(false);

  const onSuccess = (res) => {
    setInvitedByData(res);
    setGetWhoInvitedLoading(false);

    setStatus(res?.request_status);
  };
  const toggleCreateBidModal = () => {
    setCreateBidModal(!createBidModal);
  };

  const onError = () => {
    setGetWhoInvitedLoading(false);
  };
  useEffect(() => {
    setGetWhoInvitedLoading(true);
    dispatch(getWhoInvited({ id: params.inviteId, onSuccess, onError }));
  }, []);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
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

  if (isGetWhoInvitedLoading) {
    return <ComponentSpinner />;
  }
  return (
    <Row>
      {completeProfileModal && (
        <CompleteProfileModal modal={completeProfileModal} toggleModal={toggleCompleteProfileModal} />
      )}
      {createBidModal && (
        <CreateBidModal
          modal={createBidModal}
          toggleModal={toggleCreateBidModal}
          selectedProject={projectDetailsData}
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
                      {status === 'READ_ONLY' ? (
                        <div className="d-flex text-blue text-decoration-underline">
                          <p className="cursor-pointer mb-0" onClick={() => setCreateBidModal(true)}>
                            Create bid
                          </p>
                        </div>
                      ) : (
                        <div className="d-flex text-blue text-decoration-underline">
                          <p
                            className="cursor-pointer mb-0"
                            onClick={() => {
                              navigate(
                                `/project-details/${params?.projectId}/milestone/project-invitation/${params.inviteId}`,
                              );
                            }}
                          >
                            View milestone
                          </p>
                        </div>
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
                          <Link
                            to={`/profile/${
                              invitedByData?.request_from?.user_type === userTypes.client ? 'client' : 'talent'
                            }/${invitedByData?.request_from?.user_id}`}
                          >
                            <p className="fw-bold m-0" style={{ color: theme.activeNavPillText }}>
                              {invitedByData?.request_from?.first_name} {invitedByData?.request_from?.last_name}
                            </p>
                          </Link>
                          <p className="m-0">{invitedByData?.request_from?.role || 'Role'} </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div>
                          <Link to={`/profile/team/${invitedByData?.request_from?.team_id}`}>
                            <p className="fw-bold m-0" style={{ color: theme.activeNavPillText }}>
                              {invitedByData?.request_for?.team_name || invitedByData?.request_from?.team_name}
                            </p>
                          </Link>
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
