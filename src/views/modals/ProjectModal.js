import React from 'react';
import Proptypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Card, CardHeader, CardTitle, CardBody, Row, Col, CardText } from 'reactstrap';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import styled from 'styled-components';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group';
import '../custom-styles.scss';

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
`;
const ProjectModal = ({ modal, toggleModal, data }) => (
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
            <Row>
              <Col lg="4">
                <div className="d-flex">
                  <img className="card-photo me-1 mt-50" src={lisa} alt="avatar" />
                  <div>
                    <CardTitle className="mb-25 title">
                      {data?.client_details?.[0]?.first_name} {data?.client_details?.[0]?.last_name}
                    </CardTitle>
                    <div className="d-flex">
                      <RatingBadge number="0" />
                      <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CardTitle className="mb-25 fw-bolder">{data?.details?.name}</CardTitle>
                  <CardText className="project-name">Project Name</CardText>
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CardTitle className="mb-25 fw-bolder">{data?.details?.expected_duration}</CardTitle>
                  <CardText className="project-name">Expected duration</CardText>
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
            <CardText className="fw-300 ms-75 project-desc">{data?.details?.description}</CardText>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="mb-0 d-flex justify-content-between w-100">
              <span>Requirements</span>
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
