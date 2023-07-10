import React from 'react';
import Proptypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { Modal, ModalHeader, ModalBody, Card, CardHeader, CardTitle, CardBody, Row, Col, CardText } from 'reactstrap';
import styled from 'styled-components';
import theme from '../../configs/themeVariables';
import BadgeGroup from '../../@core/components/badge-group';
import '../custom-styles.scss';
import AvailableTimeComp from '../../@core/components/available-time-comp';

const ViewProjectDetailModalWrap = styled.div`
  .card-header {
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    padding: 1.6rem 1.6rem 0.8rem;
  }
  .card-body {
    padding: 1.6rem !important;
  }
  .card-photo {
    height: 2.4rem;
    border-radius: 50%;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
    border: 2px solid white;
  }
  .title {
    font-weight: 400;
    font-size: 14px;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 300;
  }
  .project-name {
    font-size: 16px;
  }
  .project-desc {
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
  }

  .badge {
    width: fit-content !important;
    display: initial !important;
  }
`;

// eslint-disable-next-line arrow-body-style
const ProjectModal = ({ modal, toggleModal, data }) => {
  return (
    <Modal
      contentClassName="custom-modal-project-details"
      isOpen={modal}
      toggle={toggleModal}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggleModal} />
      <ModalBody>
        <ViewProjectDetailModalWrap>
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Project Details</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mb-2">
                <Col lg="5">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">{data?.details?.name}</CardTitle>
                    <CardText className="project-name">Project Name</CardText>
                  </div>
                </Col>
                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {data?.details?.expected_duration?.duration}
                      {data?.details?.expected_duration?.duration_type?.charAt(0)?.toLowerCase()}
                    </CardTitle>
                    <CardText className="project-name">Expected Duration</CardText>
                  </div>
                </Col>
                <Col lg="4">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {data?.listing_details?.start_date} to {data?.listing_details?.end_date}
                    </CardTitle>
                    <CardText className="project-name">Listing Duration</CardText>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg="5">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">{data?.pay_type?.currency?.name}</CardTitle>
                    <CardText className="project-name">Currency</CardText>
                  </div>
                </Col>

                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {data?.pay_type?.fixed_cost
                        ? ` Fixed - 
                          ${data?.pay_type?.currency?.code} ${data?.pay_type?.fixed_cost}`
                        : 'Variable'}
                    </CardTitle>
                    <CardText className="project-name">Payment Type</CardText>
                  </div>
                </Col>
                <Col lg="4">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">{data?.nda?.is_nda ? 'Yes' : 'No'}</CardTitle>
                    <CardText className="project-name">NDA</CardText>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg="5">
                  <AvailableTimeComp
                    timeZone={data?.availability?.timezone?.abbreviation}
                    weekdaysData={data?.availability?.weekdays_avl}
                    weekendsData={data?.availability?.weekends_avl}
                  />
                </Col>
                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">{data?.availability?.time_overlap} hr</CardTitle>
                    <CardText className="project-name">Minimum Overlap</CardText>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Project Description</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardText className="fw-300 ms-75 project-desc"> {ReactHtmlParser(data?.details?.description)} </CardText>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Requirement Details</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <BadgeGroup title="Skills" data={data?.proficiency?.skills} color="light-blue" />
              <BadgeGroup title="Tools" data={data?.proficiency?.tools} color="light-blue" />
            </CardBody>
          </Card>
        </ViewProjectDetailModalWrap>
      </ModalBody>
    </Modal>
  );
};

export default ProjectModal;

ProjectModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
};

ProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
};
