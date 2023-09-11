/* eslint-disable no-undef */
import { ChevronRight } from 'react-feather';
import React from 'react';
import Proptypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  CardText,
  Button,
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import DateTime from '../../lib/date-time';
import theme from '../../configs/themeVariables';
import BadgeGroup from '../../@core/components/badge-group';
import '../custom-styles.scss';
import AvailableTimeComp from '../../@core/components/available-time-comp';
import { userTypes } from '../../utility/constants/Constant';
import { getCheckBid } from '../../redux/actions/createBidActions';
import { checkBidLoading } from '../../redux/selectors/createBidSelectors';
import { selectUserData } from '../../redux/selectors/authSelectors';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';

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

const ProjectModal = ({ modal, toggleModal, data, setCreateBidModal, setSelectedProject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkBidLoadingIsLoading = useSelector(checkBidLoading);
  const selectUserDetailsData = useSelector(selectUserData);

  const onNoBidFound = () => {
    toggleModal();
    setCreateBidModal(true);
  };

  const onBidFound = (bidData) => {
    const { bid_id, bid_type, project_type, entity, workers, milestones, status } = bidData;

    if (status !== 'DRAFT') {
      ShowToastMessage(ERROR, 'You have already submitted a bid for this project');
    } else {
      toggleModal();
      if (entity === userTypes.talent) {
        if (milestones) {
          navigate(`/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/preview`);
        } else {
          navigate(
            `/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/milestone`,
          );
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (milestones && workers) {
          navigate(`/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/preview`);
        } else if (workers && !milestones) {
          navigate(
            `/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/milestone`,
          );
        } else if (!workers && !milestones) {
          navigate(`/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/team`);
        }
      }
    }
  };

  const isViewable =
    window.location.pathname.split('/').includes('my_bids') ||
    window.location.pathname.split('/').includes('my_listings');
  const handleRedirectTodetailsView = () => {
    navigate(`/project-details/${data?._id}/bid`);
  };

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
                      {DateTime?.fromMillis(data?.listing_details?.start_date_epoch).toFormat('dd LLL yyyy')} to{' '}
                      {DateTime?.fromMillis(data?.listing_details?.end_date_epoch).toFormat('dd LLL yyyy')}
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
              <CardText className="fw-300 ms-75 project-desc"> {data?.details?.description} </CardText>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Requirement Details</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <BadgeGroup title="Skills" data={data?.proficiency?.skills} color="light-blue" gapWrap />
              <BadgeGroup title="Tools" data={data?.proficiency?.tools} color="light-blue" gapWrap />
            </CardBody>
          </Card>

          {isViewable ? (
            <div className="d-flex justify-content-end align-items-center mt-2 mb-2">
              <Button onClick={handleRedirectTodetailsView} color="primary">
                <span className="me-50">View Bid</span>
                <ChevronRight size={14} />
              </Button>
            </div>
          ) : (
            <div>
              {(selectUserDetailsData?.user_type === userTypes.talent ||
                selectUserDetailsData?.user_type === userTypes.team) && (
                <div className="d-flex justify-content-end align-items-center mt-2 mb-2">
                  <Button color="flat-danger" className="me-1">
                    Report
                  </Button>
                  <Button
                    color="primary"
                    disabled={checkBidLoadingIsLoading}
                    onClick={() => {
                      setSelectedProject(data);
                      dispatch(getCheckBid(data._id, onNoBidFound, onBidFound));
                    }}
                  >
                    {checkBidLoadingIsLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      <>
                        <span className="me-50">Create Bid</span>
                        <ChevronRight size={14} />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
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
  setCreateBidModal: Proptypes.func,
  setSelectedProject: Proptypes.func,
};

ProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  setCreateBidModal: () => {},
  setSelectedProject: () => {},
};
