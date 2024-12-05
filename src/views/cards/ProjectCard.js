/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import Mpin from '@src/assets/images/map-pin.png';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DateTime from '../../lib/date-time';
import { EstimatedTimeHeading, ProjectCardWrap, CardInfoWrapper } from './style';
import { CustomBadge, Elevate } from '../styled';
import ProjectModal from '../modals/ProjectModal';
import ProjectWithTeamUI from './ProjectWithTeamUI';
import BaseInfoUI from './BaseInfoCardUI';
import CreateBidModal from '../modals/CreateBidModal';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import SwitchConfirmModal from '../modals/SwitchConfirm';
import { convertUnixTimestampToDate, getModifiedProjectResponse, getPath, getReadType } from '../../utility/Utils';
import NewTag from '../../@core/components/new-tag';
import { updateCardStatus } from '../../redux/actions/dashboardActions';
import { appPermissionsSelector, selectSavedUserData, selectUserData } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import PermissionWrapper from '@/PermissionWrapper';
import { AlertCircle } from 'react-feather';

const ProjectCard = ({
  secondaryFilterForInvitedType,
  secondFilterState,
  primaryFilter,
  isExpanded,
  data,
  isPopoverOpen,
}) => {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);
  const [isNewTag, setIsTagNew] = useState(data?.is_read === false);
  const dispatch = useDispatch();
  const [switchProfileModal, setSwitchProfileModal] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [switchData, setSwitchData] = useState();
  const userdata = useSelector(selectUserData);
  const appPermissions = useSelector(appPermissionsSelector);
  const location = useLocation();
  const pathname = location.pathname.split('/').pop();

  useEffect(() => {
    setShowFullText(isExpanded);
  }, [isExpanded, isPopoverOpen]);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const handleToggleView = (e) => {
    e.stopPropagation();
    setShowFullText(!showFullText);
  };

  const statusEnum = {
    OPEN: 'Open Listing',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
    COMPLETED: 'Completed',
    ON_GOING: 'On Going',
    ACTIVE: 'Active',
    BID_SUBMITTED: 'Bid Submitted',
    BID_IN_REVIEW: 'Bid In Review',
    BID_ACCEPTED: 'Bid Accepted',
    BID_CHANGE_REQUEST: 'Change Request',
    SIGN_CONTRACT: 'Sign Contract',
    SIGN_NDA: 'Sign NDA',
    PAYMENT_PENDING: 'Payment Pending',
    WITHDRAWN: 'Withdrawn',
    DISPUTED: 'Disputed',
    SIGN_REQUESTED: 'Sign Requested',
    NOT_FUNDED: 'Not Funded',
    INTIATE_FUNDS: 'Initiate Funds',
    BLOCKED: 'Blocked',
  };

  const primaryStatus = {
    OPEN: 'Open Listing',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
    COMPLETED: 'Completed',
    ON_GOING: 'On Going',
    ACTIVE: 'Active',
    WITHDRAWN: 'Withdrawn',
    DISPUTED: 'Disputed',
    BLOCKED: 'Blocked',
  };

  const divRef = useRef(null);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      setIsContentOverflowing(divElement.scrollHeight > divElement.clientHeight);
    }
  }, []);

  const [createBidModal, setCreateBidModal] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const savedUserData = useSelector(selectSavedUserData);
  const toggleCreateBidModal = () => {
    setCreateBidModal(!createBidModal);
  };

  const toggleCompleteProfileModal = () => {
    setShowModal(false);
    setCompleteProfileModal(!completeProfileModal);
  };

  const handleRedirection = () => {
    setShowModal(true);
  };

  const handleShowProject = () => {
    setShowModal(true);
  };

  const updateCard = () => {
    const onSuccess = () => {
      setIsTagNew(false);
    };
    const postData = {
      metadata: {
        project_id: data._id,
      },
      type: getReadType({ primaryFilter, secondFilterState }),
    };
    if (postData?.type && data?.is_read === false) {
      dispatch(updateCardStatus({ data: postData, onSuccess }));
    }
  };

  const handleSwitchProfileModalNavigation = () => {
    if (!location.pathname.split('/').includes('invited')) {
      return getPath({ isActiveProject: false, projectId: data?._id, isFlextern: true });
    }

    return switchData?.navigateTo;
  };
  return (
    <ProjectCardWrap className={data?.status?.toLowerCase()}>
      <Card onClick={handleShowProject} className="cursor-pointer">
        {isNewTag && <NewTag />}
        {primaryStatus[data?.status] === primaryStatus.BLOCKED && (
          <CardInfoWrapper className={`${data?.status?.toLowerCase()}-card-info`}>
            <div className="d-flex flex-row align-items-center">
              <AlertCircle size={18} />
            </div>
            <div>
              <span className="info-heading mr-1">Temporarily Blocked:</span>
              <span className="info-content">
                Request you to complete the feedback forms in order to resume back to the project viewing.
              </span>
            </div>
          </CardInfoWrapper>
        )}
        <Elevate className="card-elevate">
          <CardBody>
            <Row>
              <Col lg="8">
                <div className="d-flex mb-1 status-row">
                  <CustomBadge>
                    <Badge
                      className={`${
                        Object.keys(primaryStatus)?.includes(data?.status) ? data?.status : pathname
                      } truncate-1`}
                      color="badge"
                    >
                      {`${statusEnum[data?.status] || data?.status}`}
                    </Badge>
                  </CustomBadge>
                </div>
                <CardTitle className="d-flex align-items-center mb-3">
                  <span className="cursor-pointer" onClick={handleRedirection}>
                    {data?.name || data?.details?.name}
                  </span>
                </CardTitle>
                <div className="d-flex flex-wrap project-stats">
                  <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.PRICE']}>
                    <CardText className="project">
                      {data?.pay_type?.variable_cost ? (
                        <>Variable Price</>
                      ) : (
                        <>
                          Fixed Price - {data?.pay_type?.fixed_cost} {data?.pay_type?.currency?.code}&nbsp;
                        </>
                      )}
                    </CardText>
                  </PermissionWrapper>
                  {(data?.assigned_date || data?.completed_date || data?.invite_date || data?.listing_details) && (
                    <CardText className="mb-6">
                      {(data?.assigned_date || data?.listing_details?.start_date_epoch) && (
                        <span className="me-1">
                          Assigned Date:{' '}
                          {convertUnixTimestampToDate(
                            data?.assigned_date || data?.listing_details?.start_date_epoch,
                            savedUserData?.availability?.timezone?.name,
                          ) || data?.listing_details?.start_date}
                        </span>
                      )}
                      {(data?.completed_date || data?.listing_details?.end_date_epoch) && (
                        <span className="me-1">
                          {data?.completed_date || data?.listing_details?.end_date_epoch
                            ? `Completed Date: ${convertUnixTimestampToDate(
                                data?.completed_date || data?.listing_details?.end_date_epoch,
                                savedUserData?.availability?.timezone?.name,
                              )}   `
                            : ''}
                        </span>
                      )}
                      {data?.invite_date && (
                        <span className="me-1">
                          {data?.invite_date
                            ? `Invite Date: ${convertUnixTimestampToDate(
                                data?.invite_date,
                                savedUserData?.availability?.timezone?.name,
                              )}`
                            : ''}
                        </span>
                      )}
                    </CardText>
                  )}
                  <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.LOCATION']}>
                    <CardText className="project d-flex align-items-center ms-25">
                      <img src={Mpin} alt="Mpin" className="mpin" />
                      {data?.client?.office_address?.country?.name || 'Location'}
                    </CardText>
                  </PermissionWrapper>
                  <CardText className=" mb-6">
                    {`Posted ${data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toRelative() : '-'}`}
                  </CardText>
                </div>

                {data?.details?.description && (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {!showFullText ? (
                      <div
                        className="my-div mb-6"
                        ref={divRef}
                        style={{ maxHeight: '6.1rem', overflow: 'hidden', whiteSpace: 'pre-line' }}
                      >
                        {data?.details?.description}
                      </div>
                    ) : (
                      <div className="my-div mb-6" ref={divRef} style={{ whiteSpace: 'pre-line' }}>
                        {data?.details?.description}
                      </div>
                    )}
                  </>
                )}

                {isContentOverflowing && (
                  <CardText className="cursor-pointer show-more" onClick={(e) => handleToggleView(e)}>
                    {showFullText ? 'Show less' : 'Show more'}
                  </CardText>
                )}

                <EstimatedTimeHeading>Estimated time to complete feedback 3min 30sec</EstimatedTimeHeading>
              </Col>
              <Col lg="4">
                {primaryFilter !== 'terminated' ? (
                  <ProjectWithTeamUI
                    secondaryFilterForInvitedType={secondaryFilterForInvitedType}
                    primaryFilter={primaryFilter}
                    data={data}
                  />
                ) : (
                  <BaseInfoUI
                    hideUserInfo={primaryFilter === 'terminated' && userdata?.user_type === userTypes.client}
                    data={data}
                    primaryFilter={primaryFilter}
                  />
                )}
              </Col>
            </Row>
          </CardBody>
        </Elevate>
      </Card>
      {showModal && (
        <ProjectModal
          onUpdateCard={updateCard}
          data={getModifiedProjectResponse({
            data: {
              project: {
                ...data,
                ...data.details,
                duration: data?.details?.expected_duration?.duration,
                duration_hours_per_week: data?.details?.expected_duration?.hours_per_week,
                is_invited: true,
              },
              client: data.client_info[0],
            },
          })}
          modal={showModal}
          toggleModal={handleToggle}
          setCreateBidModal={setCreateBidModal}
          setSelectedProject={setSelectedProject}
          toggleCompleteProfileModal={toggleCompleteProfileModal}
          setSwitchProfileModal={setSwitchProfileModal}
          setSwitchData={setSwitchData}
        />
      )}
      {switchProfileModal && (
        <SwitchConfirmModal
          onUpdateCard={updateCard}
          entity={data?.switch_team_id ? 'TEAM' : 'TALENT'}
          navigateTo={handleSwitchProfileModalNavigation()}
          switchTeamId={data?.switch_team_id}
          modal={switchProfileModal}
          toggleModal={() => setSwitchProfileModal(!switchProfileModal)}
        />
      )}
      {createBidModal && (
        <CreateBidModal modal={createBidModal} toggleModal={toggleCreateBidModal} selectedProject={selectedProject} />
      )}

      {completeProfileModal && (
        <CompleteProfileModal
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
          modalInfoText="create bid"
        />
      )}
    </ProjectCardWrap>
  );
};

ProjectCard.propTypes = {
  isExpanded: PropTypes.bool,
  data: PropTypes.object,
  secondFilterState: PropTypes.object,
  isPopoverOpen: PropTypes.bool,
  primaryFilter: PropTypes.string,
  secondaryFilterForInvitedType: PropTypes.string,
};

ProjectCard.defaultProps = {
  secondFilterState: {},
  isExpanded: false,
  data: {},
  isPopoverOpen: false,
  primaryFilter: '',
  secondaryFilterForInvitedType: '',
};

export default ProjectCard;
