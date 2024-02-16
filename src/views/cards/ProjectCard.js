/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Mpin from '@src/assets/images/map-pin.png';
import { useState, useEffect, useRef } from 'react';
import DateTime from '../../lib/date-time';
import { ProjectCardWrap } from './style';
import { CustomBadge, Elevate } from '../styled';
import ProjectModal from '../modals/ProjectModal';
import ProjectWithTeamUI from './ProjectWithTeamUI';
import BaseInfoUI from './BaseInfoCardUI';
import CreateBidModal from '../modals/CreateBidModal';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import SwitchConfirmModal from '../modals/SwitchConfirm';
import { getPath, getReadType } from '../../utility/Utils';
import NewTag from '../../@core/components/new-tag';
import { updateCardStatus } from '../../redux/actions/dashboardActions';

const ProjectCard = ({
  secondaryFilterForInvitedType,
  secondFilterState,
  primaryFilter,
  isProjectWithTeam,
  isTeam,
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

  return (
    <ProjectCardWrap>
      <Card onClick={handleShowProject} className="cursor-pointer">
        {isNewTag && <NewTag />}
        <Elevate>
          <CardBody>
            <Row>
              <Col lg="8">
                <div className="d-flex mb-1 status-row">
                  <CustomBadge>
                    <Badge className={`${data?.status} truncate-1`} color="badge">
                      {statusEnum[data?.status]}
                    </Badge>
                  </CustomBadge>
                </div>
                <CardTitle className="d-flex align-items-center">
                  <span className="cursor-pointer" onClick={handleRedirection}>
                    {data?.name}
                  </span>
                </CardTitle>
                <div className="d-flex flex-wrap project-stats">
                  <CardText className="project">
                    {data?.pay_type?.variable_cost ? (
                      <>Variable Price&nbsp;</>
                    ) : (
                      <>
                        Fixed Price - {data?.pay_type?.fixed_cost} {data?.pay_type?.currency?.code}&nbsp;
                      </>
                    )}
                  </CardText>
                  <CardText className=" project mb-1">
                    {data?.assigned_date
                      ? `Assigned Date: ${DateTime?.fromMillis(data?.assigned_date).toFormat('dd-MM-yy')}`
                      : ''}
                    &nbsp;&nbsp;&nbsp;
                    {data?.invitation_to?.updated_at
                      ? `Invite Date: ${DateTime?.fromMillis(data?.invitation_to?.updated_at).toFormat('dd-MM-yy')}`
                      : ''}
                  </CardText>
                  <CardText className="project d-flex align-items-center">
                    <img src={Mpin} alt="Mpin" className="mpin" />
                    {data?.client?.office_address?.country?.name || 'Location'}
                  </CardText>
                  <CardText className=" mb-1">
                    {`Posted ${data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toRelative() : '-'}`}
                  </CardText>
                </div>

                {!showFullText ? (
                  <div
                    className="my-div"
                    ref={divRef}
                    style={{ maxHeight: '6.1rem', overflow: 'hidden', whiteSpace: 'pre-line' }}
                  >
                    {data?.details?.description}
                  </div>
                ) : (
                  <div className="my-div" ref={divRef} style={{ whiteSpace: 'pre-line' }}>
                    {data?.details?.description}
                  </div>
                )}

                {isContentOverflowing && (
                  <CardText className="cursor-pointer show-more" onClick={(e) => handleToggleView(e)}>
                    {showFullText ? 'Show less' : 'Show more'}
                  </CardText>
                )}
              </Col>
              <Col lg="4">
                {isProjectWithTeam && primaryFilter !== 'terminated' ? (
                  <ProjectWithTeamUI
                    secondaryFilterForInvitedType={secondaryFilterForInvitedType}
                    primaryFilter={primaryFilter}
                    data={data}
                  />
                ) : (
                  <BaseInfoUI data={data} />
                )}
                {!isTeam && !isProjectWithTeam && <BaseInfoUI data={data} />}
              </Col>
            </Row>
          </CardBody>
        </Elevate>
      </Card>
      {showModal && (
        <ProjectModal
          onUpdateCard={updateCard}
          data={data}
          modal={showModal}
          toggleModal={handleToggle}
          setCreateBidModal={setCreateBidModal}
          setSelectedProject={setSelectedProject}
          toggleCompleteProfileModal={toggleCompleteProfileModal}
          setSwitchProfileModal={setSwitchProfileModal}
        />
      )}
      {switchProfileModal && (
        <SwitchConfirmModal
          onUpdateCard={updateCard}
          entity={data?.switch_team_id ? 'TEAM' : 'TALENT'}
          navigateTo={getPath({ isActiveProject: false, projectId: data?._id })}
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
  isProjectWithTeam: PropTypes.bool,
  isTeam: PropTypes.bool,
  primaryFilter: PropTypes.string,
  secondaryFilterForInvitedType: PropTypes.string,
};

ProjectCard.defaultProps = {
  secondFilterState: {},
  isExpanded: false,
  data: {},
  isPopoverOpen: false,
  isProjectWithTeam: false,
  isTeam: false,
  primaryFilter: '',
  secondaryFilterForInvitedType: '',
};

export default ProjectCard;
