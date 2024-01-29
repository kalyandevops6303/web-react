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
  UncontrolledAccordion,
  UncontrolledTooltip,
} from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { DateTime } from 'luxon';
import PdfIcon from '@src/assets/images/pdfimg.png';
import styled from 'styled-components';
import theme from '../../configs/themeVariables';
import { BidDetailsWrap } from './style';
import { getBidDetails, updateBidStatus } from '../../redux/actions/projectDetailsAction';
import { userTypes } from '../../utility/constants/Constant';
import { downloadFile, formatFileSize, truncateSentence } from '../../utility/Utils';
import AcceptBidModal from '../modals/AccpetBidModal';
import RejectBidModal from '../modals/RejectBidModal';
import LeftSidebarProfile from './bidDetailsOverview/LeftSideBarProfile';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { getItem } from '../../utility/localStorageControl';
import { AccordionBodyContent, AccordionTableHeader } from '../create-bid/style';
import ShowMoreLess from '../../@core/components/show-more-less-comp';

const BidDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const [acceptBidModal, setAcceptBidModal] = useState(false);
  const [rejectBidModal, setRejectBidModal] = useState(false);

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
  const bidView = location?.pathname?.split('/')?.slice(0, -1)?.join('/');

  useEffect(() => {
    dispatch(getBidDetails({ bid_id: param?.bidId }));
  }, []);

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

  const BidDetailsHeaderSection = styled.div`
    .fixed-head {
      z-index: 20;
      margin-top: -5rem;
      padding-top: 1rem;
      position: fixed;
      width: 74%;
      background: ${theme.bodyBgColor};
      padding-bottom: 0.8rem;
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
      margin-top: 3.6rem;
    }
  `;

  if (isLoading) return <ComponentSpinner />;

  return (
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
            role: bidInfo?.user_details?.user_type === userTypes.team ? 'Team Name' : bidInfo?.user_details?.role?.name,
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
            role: bidInfo?.user_details?.user_type === userTypes.team ? 'Team Name' : bidInfo?.user_details?.role?.name,
            value: bidInfo?.total_estimated_cost,
          }}
          modal={rejectBidModal}
          toggleModal={handleCancel}
          data={bidInfo}
          onAccept={() => handleUpadteStatus('REJECTED')}
          isLoading={isBidStatusUpating}
        />
      )}

      <Row className="pt-1">
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
                {bidInfo?.is_acceptable && (
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
                            Accept
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
                  <CardText className="value">${bidInfo?.total_estimated_cost}</CardText>
                  <div className="d-flex align-items-center m-0">
                    <CardText className="key mb-0">Total Bid Amount</CardText>
                    <Info size={14} color={theme.infoIcon} id="amount-info" className="ms-50" />
                    <UncontrolledTooltip placement="bottom" target="amount-info">
                      <p className="m-0">A Total of talent cost + duration for all the milestone</p>
                    </UncontrolledTooltip>
                  </div>
                </div>
                <p className="m-0 symbol font-medium-4">+</p>
                <div>
                  <CardText className="value">${(bidInfo?.total_estimated_cost * 0.2).toFixed(0)}</CardText>
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
                  <CardText className="value">
                    ${(bidInfo?.total_estimated_cost + bidInfo?.total_estimated_cost * 0.2).toFixed(0)}
                  </CardText>
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
                      <p className="m-0">Sum total of all milestone duration hours/week</p>
                    </UncontrolledTooltip>
                  </div>
                </div>
              </CardBody>
            </Card>
          </BidDetailsHeaderSection>

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
                                  {filterUniqueWorkers(milestone?.workers?.filter((worker) => worker.user_id))?.length >
                                  3 ? (
                                    <AvatarGroup
                                      totalCount={
                                        filterUniqueWorkers(milestone?.workers?.filter((worker) => worker.user_id))
                                          ?.length || 0
                                      }
                                      size="sm"
                                      className="ms-25 mb-50"
                                      data={filterUniqueWorkers(milestone?.workers?.filter((worker) => worker.user_id))
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
                                  ${(milestone.estimated_cost + milestone.estimated_cost * 0.2).toFixed(0)}
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
                                        <p className="content-description">${worker?.amount || 0}</p>
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
                                  <p className="font-small-3 fw-bold content-description text-end me-3">Platform Fee</p>
                                </Col>
                                <Col sm="12" md="12" lg="2">
                                  <p className="content-description">${(milestone.estimated_cost * 0.2).toFixed(0)}</p>
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
                                    ${(milestone.estimated_cost + milestone.estimated_cost * 0.2).toFixed(0)}
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
            {bidInfo?.documents?.map((item) => (
              <a
                key={item?.created_at}
                className="text-decoration-none "
                style={{ color: theme.activeColor }}
                onClick={() => downloadFile({ data: item })}
                rel="noopener noreferrer"
              >
                <CardBody className="d-flex align-items-center">
                  <img src={PdfIcon} alt="pdficon" />
                  <div className="d-flex justify-content-between w-100 ms-1 font-weight-bold">
                    <CardText className="mb-0">{item?.file_name}</CardText>
                    <div className="d-flex gap-4">
                      <CardText className="mb-0">{formatFileSize(item?.size)}</CardText>
                      <CardText className="mb-0">
                        {item?.created_at ? DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') : '-'}
                      </CardText>
                    </div>
                  </div>
                </CardBody>
              </a>
            ))}
          </Card>
        </Col>
      </Row>
    </BidDetailsWrap>
  );
};

export default BidDetails;
