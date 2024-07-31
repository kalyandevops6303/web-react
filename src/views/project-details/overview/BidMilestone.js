/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Avatar from '@components/avatar';
import { BidDetailsWrap } from '../style';
import theme from '../../../configs/themeVariables';
import { getBidMilestone } from '../../../redux/actions/projectDetailsAction';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { getWhoInvited, getTeams } from '../../../redux/actions/teamsActions';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
// import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import capitalize from '../../../lib/capitalize';

import { getProfilePercentage, updateInvitation } from '../../../redux/actions/dashboardActions';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import AcceptRequestModal from '../../modals/AcceptRequestModal';
import RejectRequestModal from '../../modals/RejectRequestModal';
// import CreateBidModal from '../../modals/CreateBidModal';
import { switchProfile } from '../../../redux/actions/authActions';
import ShowToastMessage from '../../../@core/components/toast';
import { SUCCESS } from '../../../utility/constants/ToastTypes';
import { clearInitedByData } from '../../../redux/reducers/projectDetails';
import { AccordionBodyContent } from '../../create-bid/style';
import ShowMoreLess from '../../../@core/components/show-more-less-comp';
import { convertUnixTimestampToDate, roundOfAmount } from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';
import { getMyTeam } from '../../../redux/actions/dashboardActions';

const BidMilestoneWrap = styled.div`
  .value {
    font-size: 1.125rem !important;
    font-style: normal !important;
    font-weight: 500 !important;
    margin-bottom: 0.2rem;
  }
  .key {
    font-size: 0.875rem !important;
    font-style: normal !important;
    font-weight: 400 !important;
  }
  .details {
    display: flex;
    gap: 8rem;
    padding-left: 1.5rem;
  }
  .milestone-content {
    .card-title {
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      color: ${theme.bodyColor};
      margin-bottom: 0.5rem;
    }
    .card-text {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      color: ${theme.bodyColor};
    }
  }
`;

const AccordionHeadStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .title-head {
    margin: auto 0;
  }
  .view-all-cta {
    font-size: 0.875rem;
    color: ${theme.activeColor};
    text-decoration: underline;
    margin: auto 1rem auto auto;
    font-weight: 400;
  }
  .key {
    color: ${theme.bodyColor};
    font-size: 0.75rem;
    font-weight: 400;
  }
`;

const BidMilestone = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [openedAccordion, setOpenedAccordion] = useState(null);

  const dispatch = useDispatch();
  const bidData = useSelector((state) => state.projectDetails.bidMilestone);
  const [isLoading, setLoading] = useState(false);

  const [invitedByData, setInvitedByData] = useState('');

  const [accpetModal, setAccpetModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const profilePercentageData = useSelector(profilePercentage);
  // const projectDetailsData = useSelector(projectDetails);
  const [status, setStatus] = useState(invitedByData?.request_status);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const savedUserData = useSelector(selectSavedUserData);
  const [isGetWhoInvitedLoading, setGetWhoInvitedLoading] = useState(false);
  const toggle = useCallback(
    (id) => (openedAccordion === id ? setOpenedAccordion() : setOpenedAccordion(id)),
    [openedAccordion],
  );

  const onGetMilestoneSuccess = (res) => {
    dispatch(
      getBidMilestone({
        project_id: params?.projectId,
        entity_id: res?.request_from?.team_id,
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      }),
    );
    setLoading(false);
  };
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
    dispatch(
      getWhoInvited({
        id: params.inviteId,
        onSuccess: (res) => {
          onSuccess(res);
          onGetMilestoneSuccess(res);
        },
        onError,
      }),
    );
  }, []);

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

  const onGetTeams = (res) => {
    const teamToSwitch = res.filter((item) => item._id === invitedByData?.request_from?.team_id)?.[0];
    if (teamToSwitch) {
      dispatch(
        switchProfile({
          data: teamToSwitch,
          onSuccess: () => {
            dispatch(clearInitedByData());
            navigate(`/project-details/${params?.projectId}/bid`);
          },
        }),
      );
    }
  };

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
          ShowToastMessage(SUCCESS, 'Request accepted');
          dispatch(getTeams({ onSuccess: onGetTeams }));
          dispatch(getMyTeam())
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

  if (isLoading || isGetWhoInvitedLoading) {
    return <ComponentSpinner />;
  }

  return (
    <BidDetailsWrap>
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
      <BidMilestoneWrap>
        <Card>
          <CardTitle className="main-card-title">Project Bid Estimation</CardTitle>
          <CardBody className="main-card-body details">
            <div>
              <CardText className="value">
                  {bidData?.project_start_date
                  ? convertUnixTimestampToDate(bidData?.project_start_date , savedUserData?.availability?.timezone?.name )
                  : '-'}
              </CardText>
              <div className="d-flex align-items-center m-0">
                <CardText className="key mb-0">Start Date</CardText>
              </div>
            </div>
            <div>
              <CardText className="value"> $ {bidData?.total_estimated_cost} </CardText>
              <div className="d-flex align-items-center m-0">
                <CardText className="key mb-0">Project Earnings</CardText>
              </div>
            </div>
            <div>
              <CardText className="value">
                {bidData?.total_estimated_duration?.duration}
                {bidData?.total_estimated_duration?.duration_type &&
                  bidData?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
              </CardText>
              <div className="d-flex align-items-center m-0">
                <CardText className="key mb-0">Estimated Duration</CardText>
              </div>
            </div>
          </CardBody>
        </Card>
        {bidData?.milestones?.map((milestone, index) => (
          <Accordion toggle={toggle} key={milestone?._id} className="accordion-timeline mb-2" open={openedAccordion}>
            <AccordionItem style={{ paddingLeft: '0.5rem' }}>
              <AccordionHeader targetId={index + 1}>
                <AccordionHeadStyle>
                  <span className="title-head">Milestone #{index + 1}</span>

                  <div className="d-flex gap-1 aling-items-center">
                    <div className="d-flex gap-3 aling-items-center">
                      <div>
                        <span className="key">Duration</span>
                        <CardText className="value text-end">
                          {milestone?.estimated_duration?.duration}
                          {milestone?.estimated_duration?.duration_type &&
                            milestone?.estimated_duration?.duration_type.charAt(0).toLowerCase()}
                        </CardText>
                      </div>
                      <div className="me-1">
                        <span className="key">Total Hours</span>
                        <CardText className="value text-end">{milestone?.numbers_of_hours}hr</CardText>
                      </div>
                      <div className="me-1">
                        <span className="key">Cost</span>
                        <CardText className="value text-end">$ {milestone?.estimated_cost}</CardText>
                      </div>
                    </div>
                  </div>
                </AccordionHeadStyle>
              </AccordionHeader>
              <AccordionBody accordionId={index + 1} className="accordion-status-body milestone-content">
                <AccordionBodyContent>
                  {milestone?.description?.length > 0 && (
                    <>
                      <p className="content-header mb-25">Description</p>
                      <p className="m-0 content-description">
                        <ShowMoreLess content={milestone?.description} maxLength={200} />
                      </p>
                    </>
                  )}
                  {milestone?.deliverables?.length > 0 && (
                    <>
                      <p className="content-header mb-25">Deliverables</p>
                      <p className="m-0 content-description">
                        {milestone?.deliverables?.map((deliverable, deliverableIndex) =>
                          (deliverableIndex + 1 === milestone?.deliverables?.length
                            ? `${deliverable}`
                            : `${deliverable}, `),
                        )}
                      </p>
                    </>
                  )}
                  <Row className="mt-2">
                    <Col sm="12" md="12" lg="4">
                      <p className="content-header mb-25">Team Member</p>
                    </Col>
                    <Col sm="12" md="12" lg="3">
                      <p className="content-header mb-25">Designation</p>
                    </Col>
                    <Col sm="12" md="12" lg="2">
                      <p className="content-header mb-25">Duration</p>
                    </Col>
                    <Col sm="12" md="12" lg="2" className="d-none">
                      <p className="content-header mb-25 text-end me-3">Amount</p>
                    </Col>
                  </Row>
                  {milestone?.workers?.length > 0 && (
                    <div>
                      {milestone?.workers?.map((worker) => (
                        <Row className="mt-1" key={worker?.role}>
                          <Col sm="12" md="12" lg="4">
                            <div className="d-flex align-items-center">
                              {worker?.user_id ? (
                                <Avatar
                                  img={worker?.image_uri?.length > 0 ? worker?.image_uri : defaultAvatar}
                                  imgHeight="32"
                                  imgWidth="32"
                                />
                              ) : (
                                <Avatar img={defaultAvatar} imgHeight="32" imgWidth="32" />
                              )}
                              {worker?.user_id ? (
                                <p className="fw-bolder content-description m-0 ms-50">
                                  {worker?.first_name} {worker?.last_name}
                                </p>
                              ) : (
                                <p className="fw-bolder to-be-assigned-text m-0 ms-50">To be assigned</p>
                              )}
                            </div>
                          </Col>
                          <Col sm="12" md="12" lg="3">
                            <p className="font-small-3 fw-bold content-description">{worker?.role}</p>
                          </Col>
                          <Col sm="12" md="12" lg="2">
                            <p className="font-small-3 fw-bold content-description">{worker?.number_of_weeks} week</p>
                          </Col>
                          <Col sm="12" md="12" lg="2" className="d-none">
                            <p className="content-description text-end me-3">${roundOfAmount(worker?.amount)}</p>{' '}
                          </Col>
                        </Row>
                      ))}
                    </div>
                  )}
                </AccordionBodyContent>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        ))}

        <div className="ms-auto">
          {isStatusUpdating ? (
            'Loading...'
          ) : status === 'PENDING' ? (
            <div className="d-flex justify-content-end">
              <Button onClick={handleDecline} color="flat-danger" className="me-1">
                Decline
              </Button>
              <Button onClick={handleAccept} color="primary">
                Accept Invite
              </Button>
            </div>
          ) : (
            <span style={{ textAlign: 'right' }} className="ms-auto text-right w-full d-block me-1">
              {status && `Invite ${capitalize(status === 'DECLINED' || status === 'REJECTED' ? 'DECLINED' : status)}`}
            </span>
          )}
        </div>
      </BidMilestoneWrap>
    </BidDetailsWrap>
  );
};

export default BidMilestone;