/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Mpin from '@src/assets/images/map-pin.png';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTime from '../../lib/date-time';
import { CustomDraftProjectBadge, ProjectCardWrap } from './style';
import { Elevate } from '../styled';
import { getModifiedProjectResponse } from '../../utility/Utils';
import BaseInfoDraftMarketplaceCard from './BaseInfoDraftMarketplaceCard';
import DraftProjectModal from '../modals/DraftProjectModal';
import DeleteDraftModal from '../modals/DeleteDraftModal';
import { deleteDraftProject } from '../../redux/actions/createProjectActions';
import { deleteDraftProjectLoading } from '../../redux/selectors/createProjectSelectors';

const MarketPlaceDraftProjectCard = ({ isSearchPage, isExpanded, data, isPopoverOpen, isTeam }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const project = data?.project;
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showDraftProjectModal, setShowDraftProjectModal] = useState(false);
  const deleteDraftProjectIsLoading = useSelector(deleteDraftProjectLoading);
  const dispatch = useDispatch();
  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [deleteDraftModal, setDeleteDraftModal] = useState(null);

  const toggleDeleteDraftModal = () => setDeleteDraftModal(!deleteDraftModal);

  useEffect(() => {
    setShowFullText(isExpanded);
  }, [isExpanded, isPopoverOpen]);

  const handleToggle = () => {
    setShowDraftProjectModal(!showDraftProjectModal);
  };

  const handleToggleView = (e) => {
    e.stopPropagation();
    setShowFullText(!showFullText);
  };

  const statusEnum = {
    OPEN: 'Open Listing',
    ON_GOING: 'On Going',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Expired',
    COMPLETED: 'Completed',
    DRAFT: 'Draft',
    NEW: 'New',
    ACCEPTED: 'Accepted',
    REJECTED: 'Closed',
    REVIEWED: 'Reviewed',
    ACTIVE: 'Active',
    UPDATED: 'Updated',
    TO_BE_LISTED: 'To Be Listed',
  };

  const divRef = useRef(null);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      setIsContentOverflowing(divElement.scrollHeight > divElement.clientHeight);
    }
  }, []);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const handleShowDraftProjectModal = () => {
    setShowDraftProjectModal(true);
  };

  const onDeleteDraftSuccess = () => {
    toggleDeleteDraftModal();
    if (location?.state?.isDraftProjects) {
      navigate('/marketplace/my_listings', {
        state: {
          isDraftProjects: true,
        },
      });
    } else {
      navigate('/marketplace/my_listings');
    }
  };

  return (
    <ProjectCardWrap>
      {deleteDraftModal && (
        <DeleteDraftModal
          modal={deleteDraftModal}
          toggleModal={toggleDeleteDraftModal}
          projectName={project?.details?.name ?? project?.name ?? '(Untitled Project)'}
          onDeleteDraft={() => dispatch(deleteDraftProject(project?._id, onDeleteDraftSuccess))}
          isDeleteDraftLoading={deleteDraftProjectIsLoading}
          bidAmount={null}
        />
      )}
      <Card onClick={handleShowDraftProjectModal} className="cursor-pointer">
        <Elevate>
          <CardBody>
            <Row>
              <Col lg="8">
                <div className="d-flex mb-1 status-row">
                  <CustomDraftProjectBadge>
                    <Badge className={`${project?.status} truncate-1`} color="badge">
                      {statusEnum[project?.status]}
                    </Badge>
                  </CustomDraftProjectBadge>
                </div>
                <CardTitle className="d-flex align-items-center">
                  <span className="cursor-pointer">
                    {project?.details?.name ?? project?.name ?? '(Untitled Project)'}
                  </span>
                </CardTitle>
                <div className="d-flex flex-wrap project-stats">
                  {project?.pay_type && (
                    <CardText className="project">
                      <>
                        {project?.pay_type} Price &nbsp;
                        {project?.total_cost > 0 ? `${project?.total_cost} ${project?.currency_symbol}` : ''}
                      </>
                    </CardText>
                  )}
                  {project?.client?.office_address?.country?.name ||
                    project?.client_details?.office_address?.country?.name ||
                    (data?.client?.country_name && (
                      <CardText className="project d-flex align-items-center">
                        <img src={Mpin} alt="Mpin" className="mpin" />
                        {project?.client?.office_address?.country?.name ||
                          project?.client_details?.office_address?.country?.name ||
                          data?.client?.country_name}
                      </CardText>
                    ))}
                  <CardText className="mb-1">
                    {`Edited ${project?.posted_date ? DateTime?.fromMillis(project?.posted_date)?.toRelative() : '-'}`}
                  </CardText>
                </div>

                {!showFullText ? (
                  <div>
                    {project?.details?.description ?? project?.description ? (
                      <div
                        className="my-div"
                        ref={divRef}
                        style={{ maxHeight: '6.1rem', overflow: 'hidden' }}
                        dangerouslySetInnerHTML={{ __html: project?.details?.description ?? project?.description }}
                      />
                    ) : (
                      <p className="empty-text m-0 mt-50">
                        <i>(Add Description)</i>
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    {project?.details?.description ?? project?.description ? (
                      <div
                        className="my-div"
                        ref={divRef}
                        dangerouslySetInnerHTML={{ __html: project?.details?.description ?? project?.description }}
                      />
                    ) : (
                      <i>(Add Description)</i>
                    )}
                  </div>
                )}

                {isContentOverflowing && (
                  <CardText className="cursor-pointer show-more" onClick={(e) => handleToggleView(e)}>
                    {showFullText ? 'Show less' : 'Show more'}
                  </CardText>
                )}
              </Col>
              <Col lg="4">
                <BaseInfoDraftMarketplaceCard
                  isSearchPage={isSearchPage}
                  data={data}
                  setDeleteDraftModal={setDeleteDraftModal}
                />
              </Col>
            </Row>
          </CardBody>
        </Elevate>
      </Card>
      {showDraftProjectModal && (
        <DraftProjectModal
          data={getModifiedProjectResponse({ data })}
          modal={showDraftProjectModal}
          toggleModal={handleToggle}
          toggleCompleteProfileModal={toggleCompleteProfileModal}
          isMyTeam={isTeam}
          setDeleteDraftModal={setDeleteDraftModal}
        />
      )}
    </ProjectCardWrap>
  );
};

MarketPlaceDraftProjectCard.propTypes = {
  isExpanded: PropTypes.bool,
  data: PropTypes.object,
  isPopoverOpen: PropTypes.bool,
  isTeam: PropTypes.bool,
  isSearchPage: PropTypes.bool,
};

MarketPlaceDraftProjectCard.defaultProps = {
  isExpanded: false,
  data: {},
  isPopoverOpen: false,
  isTeam: false,
  isSearchPage: false,
};

export default MarketPlaceDraftProjectCard;
