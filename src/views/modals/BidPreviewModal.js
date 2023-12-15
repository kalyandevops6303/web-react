/* eslint-disable no-confusing-arrow */
import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../custom-styles.scss';
import { DateTime } from 'luxon';
import {
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  CardText,
  Card,
  CardBody,
  UncontrolledTooltip,
  Row,
  Col,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from 'reactstrap';
import PdfIcon from '@src/assets/images/pdfimg.png';
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Info } from 'react-feather';
import { downloadFile, formatFileSize } from '../../utility/Utils';
import { BidDetailsWrap } from '../project-details/style';
import { userTypes } from '../../utility/constants/Constant';
import theme from '../../configs/themeVariables';
import { AccordionBodyContent, AccordionTableHeader } from '../create-bid/style';
import ShowMoreLess from '../../@core/components/show-more-less-comp';

const BidPreviewModal = ({ modal, toggleModal }) => {
  const navigate = useNavigate();

  const onClose = () => {
    toggleModal();
  };

  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);

  const onEditBidClick = () => {
    if (bidInfo?.bid_by?.entity === userTypes.talent) {
      navigate(
        `/create-bid/${bidInfo?.project_id}/${bidInfo?.project_type.toLowerCase()}-${bidInfo?.bid_type.toLowerCase()}/${
          bidInfo?._id
        }/milestone`,
      );
    } else {
      navigate(
        `/create-bid/${bidInfo?.project_id}/${bidInfo?.project_type.toLowerCase()}-${bidInfo?.bid_type.toLowerCase()}/${
          bidInfo?._id
        }/team`,
      );
    }
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style-70" className="modal-dialog-centered">
      <ModalHeader toggle={onClose} className="py-0 pt-50" />
      <ModalBody className="pt-0">
        <BidDetailsWrap>
          <div className="d-flex justify-content-between">
            <p className="font-medium-3 fw-bold">Bid Submitted Preview</p>
            {bidInfo?.status !== 'ACCEPTED' && bidInfo?.status !== 'REJECTED' && (
              <p className="edit-bid-btn mt-1 cursor-pointer" onClick={onEditBidClick}>
                Edit Bid
              </p>
            )}
          </div>
          <Card>
            <CardTitle className="main-card-title">Project Bid Estimation</CardTitle>
            <CardBody className="main-card-body bid-eta">
              <div>
                <CardText className="value">
                  {bidInfo?.total_estimated_duration?.duration}
                  {bidInfo?.total_estimated_duration?.duration_type &&
                    bidInfo?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
                </CardText>
                <div className="d-flex align-items-center m-0">
                  <CardText className="key mb-0">Estimated Duration</CardText>
                  <Info size={14} color={theme.infoIcon} id="bid-info" className="ms-50" />
                  <UncontrolledTooltip placement="bottom" target="bid-info">
                    <p className="m-0">Sum total of all milestone duration hours/week</p>
                  </UncontrolledTooltip>
                </div>
              </div>
              <div>
                <CardText className="value">${bidInfo?.total_estimated_cost}</CardText>
                <div className="d-flex align-items-center m-0">
                  <CardText className="key mb-0">Total Bid Amount</CardText>
                  <Info size={14} color={theme.infoIcon} id="duration-info" className="ms-50" />
                  <UncontrolledTooltip placement="right" target="duration-info">
                    <p className="m-0">A Total of talent cost + duration for all the milestone</p>
                  </UncontrolledTooltip>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="main-card-body">
              <CardText className="milestone-title d-block mb-1">Milestones</CardText>
              <AccordionTableHeader className="py-75 px-1">
                <Row>
                  <Col sm="12" md="12" lg="2">
                    <p>Payment For</p>
                  </Col>
                  <Col sm="12" md="12" lg="4">
                    <p>Milestone Name</p>
                  </Col>
                  <Col sm="12" md="12" lg="2">
                    <p>Duration</p>
                  </Col>
                  <Col sm="12" md="12" lg="2">
                    <p>Team Members</p>
                  </Col>
                  <Col sm="12" md="12" lg="2">
                    <p>Amount</p>
                  </Col>
                </Row>
              </AccordionTableHeader>
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
                        <Col sm="12" md="12" lg="2" className="ps-2">
                          <p className="fw-light m-0 font-small-4">{milestone?.estimated_duration?.duration} week</p>
                        </Col>
                        <Col sm="12" md="12" lg="2" className="ps-2">
                          <p className="fw-light m-0 font-small-4 ps-50">
                            {milestone?.workers?.filter((worker) => worker.user_id)?.length > 3 ? (
                              <AvatarGroup
                                totalCount={milestone?.workers?.filter((worker) => worker.user_id)?.length || 0}
                                size="sm"
                                className="ms-25 mb-50"
                                data={milestone?.workers
                                  ?.filter((worker) => worker.user_id)
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
                                data={milestone?.workers
                                  ?.filter((worker) => worker.user_id)
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
                                      (Math.random() * 30).toFixed(0),
                                    )}`,
                                  }))}
                              />
                            )}
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
                          <Col sm="12" md="12" lg="3">
                            <p className="content-header mb-25">Designation</p>
                          </Col>
                          <Col sm="12" md="12" lg="2">
                            <p className="content-header mb-25">Duration</p>
                          </Col>
                          <Col sm="12" md="12" lg="2">
                            <p className="content-header mb-25 text-end me-3">Amount</p>
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
                                <Col sm="12" md="12" lg="3">
                                  <p className="font-small-3 fw-bold content-description">{worker?.role}</p>
                                </Col>
                                <Col sm="12" md="12" lg="2">
                                  <p className="font-small-3 fw-bold content-description">
                                    {worker?.number_of_weeks} week
                                  </p>
                                </Col>
                                <Col sm="12" md="12" lg="2">
                                  <p className="content-description text-end me-3">${worker?.amount || 0}</p>
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
            </CardBody>
          </Card>
          <Card>
            {bidInfo?.documents?.map((item) => (
              <span
                key={item?.created_at}
                className="text-decoration-none cursor-pointer"
                onClick={() => downloadFile({ data: item })}
                style={{ color: theme.activeColor }}
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
              </span>
            ))}
          </Card>
        </BidDetailsWrap>
      </ModalBody>
    </Modal>
  );
};

export default BidPreviewModal;

BidPreviewModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

BidPreviewModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
