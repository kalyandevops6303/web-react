/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, Info } from 'react-feather';
import {
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
  Spinner,
  UncontrolledAccordion,
  UncontrolledTooltip,
} from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import Avatar from '@components/avatar';
import classnames from 'classnames';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import theme from '../../configs/themeVariables';
import { BidDetailsWrap } from './style';
import { getBidDetails, updateBidStatus } from '../../redux/actions/projectDetailsAction';
import { userTypes } from '../../utility/constants/Constant';
import { downloadFile, formatFileSize, renderFilePreview, roundOfAmount, truncateSentence } from '../../utility/Utils';
import AcceptBidModal from '../modals/AcceptBidModal';
import RejectBidModal from '../modals/RejectBidModal';
import LeftSidebarProfile from './bidDetailsOverview/LeftSideBarProfile';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { getItem } from '../../utility/localStorageControl';
import { AccordionBodyContent, AccordionTableHeader } from '../create-bid/style';
import ShowMoreLess from '../../@core/components/show-more-less-comp';
import { getDownloadUrl } from '../../redux/actions/dashboardActions';
import { downloadUrlLoading } from '../../redux/selectors/dashboardSelectors';
import AssessedSkillsTeam from '../user-details/overview/AssessedSkillsTeam';
import AssessedSkills from '../user-details/overview/AssessedSkills';
import { getPublicTeamMembers } from '../../redux/actions/profileActions';
import { getProfile } from '../../redux/actions/profileActions';

const BidDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const [acceptBidModal, setAcceptBidModal] = useState(false);
  const [rejectBidModal, setRejectBidModal] = useState(false);
  const [selectedFileKey, setSelectedFileKey] = useState(null);

  const [bidStatus, setBidStatus] = useState('');
  const [isBidStatusUpating, setIsBidStatusUpating] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCancel = () => {
    setAcceptBidModal(false);
    setRejectBidModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);

  const isLoading = useSelector((state) => state.projectDetails.getBidInfoLoading);
  const entity = useSelector((state) => state.projectDetails.bidInfo?.bid_by?.entity);
  const entity_id = useSelector(
    (state) =>
      state.projectDetails.bidInfo?.user_details?.user_id || state.projectDetails.bidInfo?.user_details?.team_id,
  );
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
  const bidView = location?.pathname?.split('/')?.slice(0, -1)?.join('/');

  useEffect(() => {
    dispatch(getBidDetails({ bid_id: param?.bidId }));
  }, []);

  useEffect(() => {
    console.log(entity_id);

    if ((entity_id && entity === userTypes.team) || entity === userTypes.club)
      dispatch(getPublicTeamMembers({ teamId: entity_id, page: 1, pageSize: 10, oldData: [] }));
  }, [entity_id, entity]);

  useEffect(() => {
    if (entity && entity_id)
      dispatch(
        getProfile({
          id: entity_id,
          user_type: entity,
          isEditable: false,
          currentUserType: 'CLIENT',
        }),
      );
  }, [entity, entity_id]);

  const handleUpadteStatus = (status) => {
    setIsBidStatusUpating(true);
    dispatch(
      updateBidStatus({
        bid_id: param?.bidId,
        status,
        assign: status === 'ACCEPTED',
        onSuccess: () => {
          setIsBidStatusUpating(false);
          setBidStatus(status);
          handleCancel();
          navigate(bidView);
        },
        onError: () => setIsBidStatusUpating(false),
      }),
    );
  };

  const fromLocationPrimary = () => {
    if (getItem('baseRoute') === 'marketplace')
      return {
        title: 'Marketplace',
        link: `/marketplace/${getItem('selectedMarketplaceTab') ? getItem('selectedMarketplaceTab') : 'all_listings'}`,
      };
    if (getItem('baseRoute') === 'projects') return { title: 'Project', link: '/projects' };
    if (getItem('baseRoute') === 'notification') return { title: 'Notifications', link: '/notifications' };
    if (getItem('baseRoute') === 'dashboard') return { title: 'Dashboard', link: '/dashboard' };
    if (getItem('baseRoute') === 'my-teams') return { title: 'My teams', link: '/my-teams' };
    return '';
  };

  const filterUniqueWorkers = (arr) => {
    const uniqueUserIds = [];
    const filteredArray = [];

    arr.forEach((obj) => {
      if (!uniqueUserIds.includes(obj.user_id)) {
        uniqueUserIds.push(obj.user_id);
        filteredArray.push(obj);
      }
    });

    return filteredArray;
  };

  const onDownloadResumeUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
  };
  const BidDetailsHeaderSection = styled.div`
    .fixed-head {
      width: 100%;
      background: ${theme.bodyBgColor};
      // padding-bottom: 0.8rem;
      padding-left: 0;

      .inner-head {
        display: flex;
        justify-content: space-between;
        padding-right: 0.6rem;
        .back {
          padding-top: 0.5rem;
        }
      }
    }
    .details-card {
      margin-top: 1.6rem;
    }
  `;

  if (isLoading) return <ComponentSpinner />;
  return (
    <div className="trumio">
      <BidDetailsWrap>
        <div className="d-flex justify-content-between mb-2 pb-2 rounded top-head">
          <div className="d-flex justify-content-between fixed-header">
            <BreadCrumbs
              data={[
                fromLocationPrimary(),
                {
                  title: truncateSentence({ sentence: location?.state?.projectName, maxCharacters: 30 }),
                  link: location?.state?.link,
                },
                { title: 'Bid Details' },
              ]}
            />
          </div>
        </div>
        {acceptBidModal && (
          <AcceptBidModal
            modalData={{
              name:
                bidInfo?.user_details?.user_type === userTypes.team
                  ? bidInfo?.user_details?.name
                  : `${bidInfo?.user_details?.first_name} ${bidInfo?.user_details?.last_name}`,
              role:
                bidInfo?.user_details?.user_type === userTypes.team ? 'Team Name' : bidInfo?.user_details?.role?.name,
              value: bidInfo?.total_estimated_cost,
            }}
            modal={acceptBidModal}
            toggleModal={handleCancel}
            data={bidInfo}
            onAccept={() => handleUpadteStatus('ACCEPTED')}
            isLoading={isBidStatusUpating}
          />
        )}
        {rejectBidModal && (
          <RejectBidModal
            modalData={{
              name:
                bidInfo?.user_details?.user_type === userTypes.team
                  ? bidInfo?.user_details?.name
                  : `${bidInfo?.user_details?.first_name} ${bidInfo?.user_details?.last_name}`,
              role:
                bidInfo?.user_details?.user_type === userTypes.team ? 'Team Name' : bidInfo?.user_details?.role?.name,
              value: bidInfo?.total_estimated_cost,
            }}
            modal={rejectBidModal}
            toggleModal={handleCancel}
            data={bidInfo}
            onAccept={() => handleUpadteStatus('REJECTED')}
            isLoading={isBidStatusUpating}
          />
        )}

        <Row className="pt-1 wrapper">
          <Col lg="3">
            <LeftSidebarProfile
              isProjectDetailsView
              isTeamView={bidInfo?.user_details?.user_type === userTypes.team}
              isInvited={false}
              isTalentView={bidInfo?.user_details?.user_type === userTypes.talent}
              isClient={false}
              data={bidInfo?.user_details}
              isEditable={false}
            />
          </Col>
          <Col lg="9">
            <BidDetailsHeaderSection>
              <div className="fixed-head">
                <div className="inner-head">
                  <div className="back back-wrap" onClick={handleBack}>
                    <span className="chevron-left-bg">
                      <ChevronLeft size={22} color={theme.acceptColor} />
                    </span>
                    <CardText className="back-text">Back</CardText>
                  </div>
                  {(bidInfo?.is_acceptable || bidInfo?.status === 'ACCEPTED' || bidInfo?.status === 'REJECTED') && (
                    <div>
                      {isBidStatusUpating ? (
                        'Updating...'
                      ) : bidStatus || bidInfo?.status === 'ACCEPTED' || bidInfo?.status === 'REJECTED' ? (
                        <span className="d-flex align-items-center me-2">{`${bidStatus || bidInfo?.status}`}</span>
                      ) : (
                        <div style={{ marginTop: '-0.2rem' }} className="d-flex gap-2 align-items-center pe-1">
                          <CardText
                            onClick={() => setRejectBidModal(true)}
                            className="cursor-pointer report-text m-0 text-center fw-bold"
                          >
                            Reject
                          </CardText>
                          <span>
                            <Button onClick={() => setAcceptBidModal(true)} className="d-contents" color="primary">
                              Assign Project
                            </Button>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Card className="details-card">
                <CardTitle className="main-card-title">Bid Details</CardTitle>
                <CardBody className="main-card-body bid-eta d-flex align-items-center">
                  <div>
                    <CardText className="value">${roundOfAmount(bidInfo?.total_estimated_cost)}</CardText>
                    <div className="d-flex align-items-center m-0">
                      <CardText className="key mb-0">Total Bid Amount</CardText>
                      <Info size={14} color={theme.infoIcon} id="amount-info" className="ms-50" />
                      <UncontrolledTooltip placement="bottom" target="amount-info">
                        <p className="m-0">A total of talent cost + duration for all the milestone</p>
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <p className="m-0 symbol font-medium-4">+</p>
                  <div>
                    <CardText className="value">${roundOfAmount(bidInfo?.platform_fee)}</CardText>
                    <div className="d-flex align-items-center m-0">
                      <CardText className="key mb-0">Platform Fees</CardText>
                      <Info size={14} color={theme.infoIcon} id="bid-platform-fee-info" className="ms-50" />
                      <UncontrolledTooltip placement="bottom" target="bid-platform-fee-info">
                        <p className="m-0">This fee is calculated as 20% of the bid amount</p>
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <p className="m-0 symbol font-medium-4">=</p>
                  <div>
                    <CardText className="value">${roundOfAmount(bidInfo?.total_project_cost)}</CardText>
                    <div className="d-flex align-items-center m-0">
                      <CardText className="key mb-0">Total Project Cost</CardText>
                    </div>
                  </div>
                  <div>
                    <CardText className="value">
                      {bidInfo?.total_estimated_duration?.duration}
                      {bidInfo?.total_estimated_duration?.duration_type &&
                        bidInfo?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
                    </CardText>
                    <div className="d-flex align-items-center m-0">
                      <CardText className="key mb-0">Estimated Duration</CardText>
                      <Info size={14} color={theme.infoIcon} id="duration-info" className="ms-50" />
                      <UncontrolledTooltip placement="bottom" target="duration-info">
                        <p className="m-0">Sum total of all milestones duration hours/week</p>
                      </UncontrolledTooltip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </BidDetailsHeaderSection>

            {entity && entity_id && (
              <>
                {(entity === userTypes.team || entity === userTypes.club) && <AssessedSkillsTeam teamId={entity_id} />}
                {entity === userTypes.talent && <AssessedSkills userId={entity_id} />}
              </>
            )}

            <Card>
              <CardBody className="main-card-body">
                <CardText className="milestone-title d-block mb-1 fw-bold">Milestones</CardText>
                <Card className="white-card-bg m-0">
                  <CardBody className="p-0">
                    <AccordionTableHeader className="py-75 px-1">
                      <Row>
                        <Col sm="12" md="12" lg="2">
                          <p>Payment For</p>
                        </Col>
                        <Col sm="12" md="12" lg="4">
                          <p>Milestone Name</p>
                        </Col>
                        <Col sm="12" md="12" lg="2">
                          <p>Team Members</p>
                        </Col>
                        <Col sm="12" md="12" lg="2">
                          <p>Duration</p>
                        </Col>
                        <Col sm="12" md="12" lg="2">
                          <div className="d-flex align-items-center">
                            <p>Amount</p>
                            <Info size={14} color={theme.infoIcon} id="platform-fee-info" className="ms-50" />
                            <UncontrolledTooltip placement="right" target="platform-fee-info">
                              <p className="m-0">
                                The milestone amount is the sum total of the milestone talent cost and the platform fee
                                (20%).
                              </p>
                            </UncontrolledTooltip>
                          </div>
                        </Col>
                      </Row>
                    </AccordionTableHeader>
                    <div className="custom-milestone-accordion">
                      <UncontrolledAccordion>
                        {bidInfo?.milestones?.map((milestone, index) => (
                          <AccordionItem className="py-0" key={milestone._id}>
                            <AccordionHeader targetId={index + 1} className="p-0">
                              <Row className="p-0 w-100">
                                <Col sm="12" md="12" lg="2">
                                  <p className="fw-bolder m-0 font-small-4">Milestone # {index + 1}</p>
                                </Col>
                                <Col sm="12" md="12" lg="4" className="ps-1">
                                  <p className="fw-light m-0 font-small-4">{milestone.name}</p>
                                </Col>
                                <Col sm="12" md="12" lg="2" className="ps-1">
                                  <p className="fw-light m-0 font-small-4 ps-50">
                                    {filterUniqueWorkers(milestone?.workers?.filter((worker) => worker.user_id))
                                      ?.length > 3 ? (
                                      <AvatarGroup
                                        totalCount={
                                          filterUniqueWorkers(milestone?.workers?.filter((worker) => worker.user_id))
                                            ?.length || 0
                                        }
                                        size="sm"
                                        className="ms-25 mb-50"
                                        data={filterUniqueWorkers(
                                          milestone?.workers?.filter((worker) => worker.user_id),
                                        )
                                          ?.map((worker) => ({
                                            user_id: worker?.user_id,
                                            user_type: userTypes.talent,
                                            title: `${worker?.first_name} ${worker?.last_name}` || 'user',
                                            img: worker?.image_uri || defaultAvatar,
                                            placement: 'bottom',
                                            imgHeight: 21,
                                            imgWidth: 21,
                                            tooltipId: `${worker?.first_name?.replace(
                                              /\s+/g,
                                              '-',
                                            )}-${worker?.last_name?.replace(/\s+/g, '-')}-${Number(
                                              (Math.random() * 20).toFixed(0),
                                            )}`,
                                          }))
                                          ?.slice(0, 3)}
                                      />
                                    ) : (
                                      <AvatarGroup
                                        size="sm"
                                        className="ms-25 mb-50"
                                        data={filterUniqueWorkers(
                                          milestone?.workers?.filter((worker) => worker.user_id),
                                        )?.map((worker) => ({
                                          user_id: worker?.user_id,
                                          user_type: userTypes.talent,
                                          title: `${worker?.first_name} ${worker?.last_name}` || 'user',
                                          img: worker?.image_uri || defaultAvatar,
                                          placement: 'bottom',
                                          imgHeight: 21,
                                          imgWidth: 21,
                                          tooltipId: `${worker?.first_name?.replace(
                                            /\s+/g,
                                            '-',
                                          )}-${worker?.last_name?.replace(/\s+/g, '-')}-${Number(
                                            (Math.random() * 30).toFixed(0),
                                          )}`,
                                        }))}
                                      />
                                    )}
                                  </p>
                                </Col>
                                <Col sm="12" md="12" lg="2" className="ps-2">
                                  <p className="fw-light m-0 font-small-4 ms-50">
                                    {milestone?.estimated_duration?.duration} week
                                  </p>
                                </Col>
                                <Col sm="12" md="12" lg="2" className="ps-2">
                                  <p className="fw-light m-0 font-small-4 ps-50">
                                    ${roundOfAmount(milestone?.total_milestone_cost)}
                                  </p>
                                </Col>
                              </Row>
                            </AccordionHeader>
                            <AccordionBody accordionId={index + 1}>
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
                                        deliverableIndex + 1 === milestone?.deliverables?.length
                                          ? `${deliverable}`
                                          : `${deliverable}, `,
                                      )}
                                    </p>
                                  </>
                                )}
                                <Row className="mt-2">
                                  <Col sm="12" md="12" lg="4">
                                    <p className="content-header mb-25">Team Member</p>
                                  </Col>
                                  <Col sm="12" md="12" lg="4">
                                    <p className="content-header mb-25">Designation</p>
                                  </Col>
                                  <Col sm="12" md="12" lg="2">
                                    <p className="content-header mb-25">Duration</p>
                                  </Col>
                                  <Col sm="12" md="12" lg="2">
                                    <p className="content-header mb-25">Amount</p>
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
                                        <Col sm="12" md="12" lg="4">
                                          <p className="font-small-3 fw-bold content-description">{worker?.role}</p>
                                        </Col>
                                        <Col sm="12" md="12" lg="2">
                                          <p className="font-small-3 fw-bold content-description ms-25">
                                            {worker?.number_of_weeks} week
                                          </p>
                                        </Col>
                                        <Col sm="12" md="12" lg="2">
                                          <p className="content-description">${roundOfAmount(worker?.amount)}</p>
                                        </Col>
                                      </Row>
                                    ))}
                                  </div>
                                )}
                                <Row>
                                  <Col sm="12" md="12" lg="7" />
                                  <Col sm="12" md="12" lg="4">
                                    <hr className="mt-50" />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm="12" md="12" lg="8" />
                                  <Col sm="12" md="12" lg="2">
                                    <p className="font-small-3 fw-bold content-description text-end me-3">
                                      Platform Fee
                                    </p>
                                  </Col>
                                  <Col sm="12" md="12" lg="2">
                                    <p className="content-description">${milestone?.platform_fee}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm="12" md="12" lg="7" />
                                  <Col sm="12" md="12" lg="3">
                                    <p className="font-small-3 fw-bolder content-description text-end me-3">
                                      Total Milestone Amount
                                    </p>
                                  </Col>
                                  <Col sm="12" md="12" lg="2">
                                    <p className="fw-bolder content-description">
                                      ${roundOfAmount(milestone?.total_milestone_cost)}
                                    </p>
                                  </Col>
                                </Row>
                              </AccordionBodyContent>
                            </AccordionBody>
                          </AccordionItem>
                        ))}
                      </UncontrolledAccordion>
                    </div>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
            <Card>
              {bidInfo?.documents?.length > 0 && (
                <CardBody className="gap-3">
                  {bidInfo?.documents?.map((item, index) => (
                    <div
                      className={classnames('d-flex', 'align-items-center', 'w-100', {
                        'mb-space': index !== bidInfo?.documents?.length - 1,
                      })}
                      key={item?.file_key}
                    >
                      {downloadUrlIsLoading && selectedFileKey === item?.file_key ? (
                        <div className="d-flex align-items-center justify-content-between">
                          <Spinner color="primary" />
                        </div>
                      ) : (
                        <div
                          className="d-flex align-items-center w-100 cursor-pointer"
                          style={{ color: theme.activeColor, maxWidth: 'fit-content' }}
                          onClick={() => {
                            setSelectedFileKey(item?.file_key);
                            dispatch(
                              getDownloadUrl({
                                fileKey: item?.file_key,
                                onSuccess: onDownloadResumeUrlSuccess,
                                fileName: item?.file_name,
                              }),
                            );
                          }}
                        >
                          {renderFilePreview(item)} <span className="mb-0">{item?.file_name}</span>
                        </div>
                      )}
                      <div className="d-flex justify-content-end w-100 ms-1 font-weight-bold">
                        <div className="d-flex gap-4">
                          <CardText className="mb-0">{formatFileSize(item?.size)}</CardText>
                          <CardText className="mb-0">
                            {item?.created_at ? DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') : '-'}
                          </CardText>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </BidDetailsWrap>
    </div>
  );
};

export default BidDetails;
