/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Row,
  UncontrolledAccordion,
  UncontrolledTooltip,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, FileText, Info } from 'react-feather';
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { AccordionBodyContent, AccordionTableHeader, PreviewSectionWrapper } from '../style';
import theme from '../../../configs/themeVariables';
import { UploadIconContainer } from '../../Onboarding/style';
import BidSubmittedModal from './BidSubmittedModal';
import { getBidDetails } from '../../../redux/actions/createBidActions';
import { bidDetails, bidDetailsLoading } from '../../../redux/selectors/createBidSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import ShowMoreLess from '../../../@core/components/show-more-less-comp';
import { userTypes } from '../../../utility/constants/Constant';

const Preview = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [bidSubmittedModal, setBidSubmittedModal] = useState(null);

  const bidDetailsIsLoading = useSelector(bidDetailsLoading);
  const bidDetailsData = useSelector(bidDetails);

  const toggleBidSubmittedModal = () => {
    setBidSubmittedModal(!bidSubmittedModal);
  };

  const renderFilePreview = () => <FileText size="18" className="me-75 mb-50" />;

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} MB`;
      // eslint-disable-next-line
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} KB`;
    }
  };

  const renderFormattedDate = (date) => {
    const formattedDate = date
      .toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      .replace(',', '')
      .split(' ');

    return `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;
  };

  const fileList = () => (
    <div className="custom-card mb-1">
      <Card className="p-1 px-2">
        {bidDetailsData?.documents.map((file, index) => (
          <Row
            key={file.file_key}
            className={
              // eslint-disable-next-line no-unsafe-optional-chaining
              index !== bidDetailsData?.documents?.length - 1
                ? 'd-flex align-items-center mb-1'
                : 'd-flex align-items-center'
            }
          >
            <Col sm="6" md="6" lg="8">
              {renderFilePreview()}
              {file.file_name}
            </Col>
            <Col sm="2" md="4" lg="2">
              {renderFileSize(file.size)}
            </Col>
            <Col sm="2" md="2" lg="2" className="d-flex justify-content-end">
              {renderFormattedDate(new Date(file.created_at))}
            </Col>
          </Row>
        ))}
      </Card>
    </div>
  );

  useEffect(() => {
    dispatch(getBidDetails(params.bidId, () => {}));
    // eslint-disable-next-line no-undef
    setTimeout(() => window.scrollTo(0, 0), 30);
  }, []);

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

  return (
    <PreviewSectionWrapper>
      {bidSubmittedModal && <BidSubmittedModal modal={bidSubmittedModal} toggleModal={toggleBidSubmittedModal} />}
      {bidDetailsIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <>
          <Card className="mt-2">
            <CardHeader className="py-75">
              <h4 className="m-0 mt-75">Project Bid Estimate</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody className="main-card-body bid-eta">
              <div>
                <CardText className="value mb-25">{bidDetailsData?.total_estimated_duration?.duration}w</CardText>
                <div className="d-flex align-items-center">
                  <CardText className="key m-0">Estimated Duration</CardText>
                  <Info size={14} color={theme.infoIcon} id="duration-info" className="ms-50" />
                  <UncontrolledTooltip placement="right" target="duration-info">
                    <p className="m-0">Sum total of all milestone duration hours/week</p>
                  </UncontrolledTooltip>
                </div>
              </div>
              <div>
                <CardText className="value mb-25">${bidDetailsData?.total_estimated_cost}</CardText>
                <div className="d-flex align-items-center">
                  <CardText className="key m-0">Talent Cost</CardText>
                  <Info size={14} color={theme.infoIcon} id="cost-info" className="ms-50" />
                  <UncontrolledTooltip placement="right" target="cost-info">
                    <p className="m-0">Talent cost is the full fee paid to the talent</p>
                  </UncontrolledTooltip>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="main-card-body">
              <CardText className="milestone-title font-medium-3 fw-bold mb-1">Milestones</CardText>
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
                        <p>Amount</p>
                      </Col>
                    </Row>
                  </AccordionTableHeader>
                  <div className="custom-milestone-accordion">
                    <UncontrolledAccordion>
                      {bidDetailsData?.milestones?.map((milestone, index) => (
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
                                <p className="fw-light m-0 font-small-4 ps-50">${milestone.estimated_cost}</p>
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
                                          <Avatar
                                            img={worker?.image_uri?.length > 0 ? worker?.image_uri : defaultAvatar}
                                            imgHeight="32"
                                            imgWidth="32"
                                          />
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

          {bidDetailsData?.documents?.length > 0 && fileList()}

          <div className="d-flex justify-content-between align-items-center">
            <div
              className="d-flex align-items-center upload-button cursor-pointer"
              onClick={() =>
                navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/milestone`)
              }
            >
              <UploadIconContainer>
                <ChevronLeft size={18} color={theme.activeNavPillText} />
              </UploadIconContainer>
              <h5 className="fw-bold">Back</h5>
            </div>
            <Button color="primary" onClick={() => setBidSubmittedModal(true)}>
              <span className="me-50">Save & Continue</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </>
      )}
    </PreviewSectionWrapper>
  );
};

export default Preview;
