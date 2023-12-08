/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { ChevronRight, FileText } from 'react-feather';
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
import { useNavigate, useLocation } from 'react-router';
import styled from 'styled-components';
import DateTime from '../../lib/date-time';
import theme from '../../configs/themeVariables';
import BadgeGroup from '../../@core/components/badge-group';
import '../custom-styles.scss';
import AvailableTimeComp from '../../@core/components/available-time-comp';
import { userTypes } from '../../utility/constants/Constant';
import { getCheckBid } from '../../redux/actions/createBidActions';
import { checkBidLoading } from '../../redux/selectors/createBidSelectors';
import { selectSavedUserData, selectUserData } from '../../redux/selectors/authSelectors';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { profilePercentage } from '../../redux/selectors/dashboardSelectors';
import { downloadFile } from '../../utility/Utils';

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

const ProjectModal = ({
  isUpcomingProject,
  isActiveProject,
  modal,
  toggleModal,
  data,
  setCreateBidModal,
  setSelectedProject,
  toggleCompleteProfileModal,
  setSwitchProfileModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const checkBidLoadingIsLoading = useSelector(checkBidLoading);
  const selectUserDetailsData = useSelector(selectUserData);
  const selectSavedUserDetailsData = useSelector(selectSavedUserData);
  const profilePercentageData = useSelector(profilePercentage);

  const expextedDuration = data?.details ? data?.details?.expected_duration : data?.expected_duration;

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
    location.pathname.split('/').includes('my_bids') || location.pathname.split('/').includes('my_listings');
  const isDashboard = location.pathname.split('/').includes('dashboard');

  const handleCreateBid = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      toggleCompleteProfileModal();
    } else {
      setSelectedProject(data);
      dispatch(getCheckBid(data._id, onNoBidFound, onBidFound));
    }
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} MB`;
      // eslint-disable-next-line
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} KB`;
    }
  };

  const isMyProjectMyTeam =
    location.pathname.split('/').includes('projects') || location.pathname.split('/').includes('my-teams');

  const handleViewProject = () => {
    if (location.pathname.split('/').includes('projects')) {
      if (selectUserDetailsData?.user_type === userTypes.talent && data?.switch_team_id) {
        toggleModal();
        setSwitchProfileModal(true);
      } else if (location.pathname.split('/').includes('ongoing')) {
        navigate(`/project-details/${data?._id}/milestone`);
      } else if (location.pathname.split('/').includes('completed')) {
        navigate(`/project-details/${data?._id}/rating`);
      } else {
        navigate(`/project-details/${data?._id}/bid`);
      }
    } else if (isDashboard) {
      if (selectUserDetailsData?.user_type === userTypes.talent && data?.switch_team_id) {
        toggleModal();
        setSwitchProfileModal(true);
      } else if (isActiveProject) {
        navigate(`/project-details/${data?._id}/milestone`);
      } else {
        navigate(`/project-details/${data?._id}/bid`);
      }
    } else {
      navigate(`/project-details/${data?._id}/bid`);
    }
  };

  const showCreateBidButton =
    selectUserDetailsData?.team_members?.map((member) => member?.user_id)?.includes(selectSavedUserDetailsData?._id) &&
    selectUserDetailsData?.team_members?.find((member) => member?.user_id === selectSavedUserDetailsData?._id)
      ?.member_type === 'ADMIN';

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
                    <CardTitle className="mb-25 fw-bolder">{data?.name ?? data?.details?.name}</CardTitle>
                    <CardText className="project-name">Project Name</CardText>
                  </div>
                </Col>
                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {expextedDuration?.duration}
                      {expextedDuration?.duration_type?.charAt(0)?.toLowerCase()}
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
              <CardText className="fw-300 ms-75 project-desc" style={{ whiteSpace: 'pre-line' }}>
                {' '}
                {data?.details?.description}{' '}
              </CardText>
            </CardBody>
          </Card>

          {data?.details?.documents?.length > 0 && (
            <Card>
              <CardBody>
                {data?.details?.documents.map((document, index) => (
                  <Row
                    key={document.file_key}
                    className={
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      index !== data?.details?.documents.length - 1
                        ? 'd-flex align-items-center mb-1'
                        : 'd-flex align-items-center'
                    }
                  >
                    <Col sm="6" md="6" lg="8">
                      <span
                        className="cursor-pointer"
                        style={{ color: theme.activeColor }}
                        onClick={() => downloadFile({ data: document })}
                      >
                        <FileText size="18" className="me-75" />
                        {document?.file_name}
                      </span>
                    </Col>
                    <Col sm="6" md="6" lg="2" className="text-end">
                      {renderFileSize(document?.size)}
                    </Col>
                    <Col sm="6" md="6" lg="2" className="text-end">
                      {DateTime?.fromMillis(document?.created_at).toFormat('dd MMM yyyy')}
                    </Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          )}

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

          {selectUserDetailsData?._id === data?.client_details?.user_id ||
          data?.has_bid ||
          isViewable ||
          isMyProjectMyTeam ||
          isActiveProject ||
          isUpcomingProject ? (
            <div className="d-flex justify-content-end mb-2">
              <Button color="primary" disabled={checkBidLoadingIsLoading} onClick={handleViewProject}>
                {checkBidLoadingIsLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <span className="me-50">View Project</span>
                    <ChevronRight size={14} />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div>
              {(selectUserDetailsData?.user_type === userTypes.talent ||
                selectUserDetailsData?.user_type === userTypes.team) && (
                <div className="d-flex justify-content-end align-items-center mt-2 mb-2">
                  <Button color="flat-danger" className="d-none me-1">
                    Report
                  </Button>

                  {(data?.status === 'OPEN' || data?.status === 'IN_REVIEW') &&
                    (selectUserDetailsData?.user_type === userTypes.team && selectUserDetailsData?.team_type === 'CLUB'
                      ? showCreateBidButton
                      : true) && (
                      <Button color="primary" disabled={checkBidLoadingIsLoading} onClick={handleCreateBid}>
                        {checkBidLoadingIsLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            <span className="me-50">Create Bid</span>
                            <ChevronRight size={14} />
                          </>
                        )}
                      </Button>
                    )}
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
  toggleCompleteProfileModal: Proptypes.func,
  setSwitchProfileModal: Proptypes.func,
  isActiveProject: Proptypes.bool,
  isUpcomingProject: Proptypes.bool,
};

ProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  setCreateBidModal: () => {},
  setSelectedProject: () => {},
  toggleCompleteProfileModal: () => {},
  setSwitchProfileModal: () => {},
  isActiveProject: false,
  isUpcomingProject: false,
};
