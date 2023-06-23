import React from 'react';
import Proptypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Card, CardHeader, CardTitle, CardBody, Row, Col, CardText } from 'reactstrap';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import styled from 'styled-components';
import { Heart } from 'react-feather';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group';

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
const is_favourited = false;
const ProjectModal = ({ modal, toggleModal }) => (
  <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered modal-lg">
    <ModalHeader toggle={toggleModal} />
    <ModalBody>
      <ViewProjectDetailModalWrap>
        <Card>
          <CardHeader>
            <CardTitle className="mb-0 d-flex justify-content-between w-100">
              <span>Project Details</span>
              {is_favourited ? (
                <Heart className="d-flex ms-2 heart" fill={theme.red} stroke={theme.red} />
              ) : (
                <Heart className="d-flex ms-2 heart" />
              )}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg="4">
                <div className="d-flex">
                  <img className="card-photo me-1 mt-50" src={lisa} alt="avatar" />
                  <div>
                    <CardTitle className="mb-25 title">Cloudwell Automation</CardTitle>
                    <div className="d-flex">
                      <RatingBadge number="4.1" />
                      <CardText className="ps-1 font-small-3 fw-300 rating-label">51 Projects</CardText>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CardTitle className="mb-25 fw-bolder">Cloudwell Automation</CardTitle>
                  <CardText className="project-name">Project Name</CardText>
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CardTitle className="mb-25 fw-bolder">115w</CardTitle>
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
            <CardText className="fw-300 ms-75 project-desc">
              The data collection and payment system is designed to allow automotive companies to compensate users for
              sharing their data. By collecting data such as driving habits, vehicle usage, road conditions and other
              environmental data, valuable insights that can be created to support autonomous driving. The payment
              system would be integrated into the vehicls software, allowing for seamless data collection and
              compensation for users who opt-in. Users would be required to agree to the terms and conditions of the
              program before their data could be collected and shared. The data collected would include driving
              behavior, vehicle usage, location, and other environment data such as weather conditions and traffic
              patterns. The data would be securely transmitted to the automotive companys servers, where it would be
              analyzed and used to improve their products and services. Compensation for the data would be based on
              factors such as the amount and quality of data provided, as well as the specific needs of the automotive
              company. Payment options could include direct monetary compensation, discounts on vehicle purchases or
              services, or other rewards such as gift cards or exclusive access to new products.
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="mb-0 d-flex justify-content-between w-100">
              <span>Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <BadgeGroup
              title="Project deliverables"
              data={[{ name: 'html' }, { name: 'css' }, { name: 'html' }, { name: 'css' }]}
              color="light-blue"
            />
            <BadgeGroup
              title="Skills"
              data={[{ name: 'html' }, { name: 'css' }, { name: 'html' }, { name: 'css' }]}
              color="light-blue"
            />
            <BadgeGroup
              title="Tools"
              data={[{ name: 'html' }, { name: 'css' }, { name: 'html' }, { name: 'css' }]}
              color="light-blue"
            />
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
};

ProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
