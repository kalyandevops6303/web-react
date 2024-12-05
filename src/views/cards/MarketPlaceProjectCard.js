/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Mpin from '@src/assets/images/map-pin.png';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import DateTime from '../../lib/date-time';
import { ProjectCardWrap } from './style';
import { CustomBadge, Elevate } from '../styled';
import ProjectModal from '../modals/ProjectModal';
import RelistConfirmationModal from '../modals/RelistConfirmationModal';
import RelistListingDetailsModal from '../modals/RelistListingDetailsModal';
import RelistSuccessModal from '../modals/RelistSuccessModal';
import CreateBidModal from '../modals/CreateBidModal';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import { appPermissionsSelector, selectUserData } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import NewTag from '../../@core/components/new-tag';
import { updateCardStatus } from '../../redux/actions/dashboardActions';
import { getModifiedProjectResponse, getReadType } from '../../utility/Utils';
import BaseInfoForBidReceived from './BaseInfoForBidReceived';
import BaseInfoMarketplaceCard from './BaseInfoMarketplaceCard';
import DeleteDraftModal from '../modals/DeleteDraftModal';
import SavedDraftsAvailableModal from '../modals/SavedDraftsAvailableModal';
import { deleteDraftBid } from '../../redux/actions/createBidActions';
import { deleteDraftBidLoading } from '../../redux/selectors/createBidSelectors';
import PermissionWrapper from '@/PermissionWrapper';

const MarketPlaceProjectCard = ({
  primaryFilter,
  secondFilterState,
  isSearchPage,
  isExpanded,
  data,
  isPopoverOpen,
  isTeam,
}) => {
  const project = data?.project;
  const bid = data?.bid;
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);
  const [isNewTag, setIsTagNew] = useState(project?.is_read === false);
  const userData = useSelector(selectUserData);
  const deleteDraftBidIsLoading = useSelector(deleteDraftBidLoading);
  const appPermissions = useSelector(appPermissionsSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [relistConfirmationModal, setRelistConfirmationModal] = useState(null);
  const [relistListingDetailsModal, setRelistListingDetailsModal] = useState(null);
  const [relistSuccessModal, setRelistSuccessModal] = useState(null);
  const [projectRelistData, setProjectRelistData] = useState(null);
  const [deleteDraftModal, setDeleteDraftModal] = useState(null);
  const [savedDraftsAvailableModal, setSavedDraftsAvailableModal] = useState(null);

  const toggleRelistConfirmationModal = () => setRelistConfirmationModal(!relistConfirmationModal);

  const toggleRelistListingDetailsModal = () => setRelistListingDetailsModal(!relistListingDetailsModal);

  const toggleRelistSuccessModal = () => setRelistSuccessModal(!relistSuccessModal);

  const toggleDeleteDraftModal = () => setDeleteDraftModal(!deleteDraftModal);

  const toggleSavedDraftsAvailableModal = () => setSavedDraftsAvailableModal(!savedDraftsAvailableModal);
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
    WITHDRAWN: 'Withdrawn',
  };

  const divRef = useRef(null);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      setIsContentOverflowing(divElement.scrollHeight > divElement.clientHeight);
    }

    setProjectRelistData({
      id: project?._id,
      name: project?.details?.name ?? project?.name,
    });
  }, []);

  const [createBidModal, setCreateBidModal] = useState(null);

  const toggleCreateBidModal = () => {
    setCreateBidModal(!createBidModal);
  };

  const toggleCompleteProfileModal = () => {
    setShowModal(false);
    setCompleteProfileModal(!completeProfileModal);
  };

  const handleShowProject = () => {
    setShowModal(true);
  };

  const updateCard = () => {
    const onSuccess = () => {
      setIsTagNew(false);
    };
    const postData = {
      metadata: {},
      type: getReadType({ primaryFilter, secondFilterState }),
    };
    if (primaryFilter === 'my_bids' && userData?.user_type !== userTypes.client) {
      postData.metadata.bid_id = data?.bid?._id;
    } else {
      postData.metadata.project_id = project?._id;
    }
    if (postData?.type && isNewTag) {
      dispatch(updateCardStatus({ data: postData, onSuccess }));
    }
  };

  const descriptionToShow = project?.details?.description ?? project?.description;
  const onDeleteDraftBidSuccess = () => {
    toggleDeleteDraftModal();
    if (location?.state?.isDraftBids) {
      navigate('/marketplace/my_bids', {
        state: {
          isDraftBids: true,
        },
      });
    } else {
      navigate('/marketplace/my_bids');
    }
  };

  return (
    <ProjectCardWrap>
      {deleteDraftModal && (
        <DeleteDraftModal
          modal={deleteDraftModal}
          toggleModal={toggleDeleteDraftModal}
          projectName={project?.details?.name ?? project?.name}
          onDeleteDraft={() => dispatch(deleteDraftBid(bid?._id, onDeleteDraftBidSuccess))}
          isDeleteDraftLoading={deleteDraftBidIsLoading}
          bidAmount={null}
        />
      )}
      {savedDraftsAvailableModal && (
        <SavedDraftsAvailableModal
          modal={savedDraftsAvailableModal}
          toggleModal={toggleSavedDraftsAvailableModal}
          modalText="You have a bid in draft mode for this project. Would you like to continue where you left off?"
          firstBtnText="Create New Bid"
          secondBtnText="View Draft"
          firstBtnAction={() => {
            toggleSavedDraftsAvailableModal();
            setCreateBidModal(true);
          }}
          secondBtnAction={() =>
            navigate('/marketplace/my_bids', {
              state: {
                isDraftBids: true,
                draftBidProjectId: project?._id,
              },
            })
          }
        />
      )}
      {relistConfirmationModal && (
        <RelistConfirmationModal
          modal={relistConfirmationModal}
          toggleModal={toggleRelistConfirmationModal}
          setRelistListingDetailsModal={setRelistListingDetailsModal}
        />
      )}
      {relistListingDetailsModal && (
        <RelistListingDetailsModal
          modal={relistListingDetailsModal}
          toggleModal={toggleRelistListingDetailsModal}
          setRelistConfirmationModal={setRelistConfirmationModal}
          setRelistSuccessModal={setRelistSuccessModal}
          projectRelistData={projectRelistData}
          setProjectRelistData={setProjectRelistData}
        />
      )}
      {relistSuccessModal && (
        <RelistSuccessModal
          modal={relistSuccessModal}
          toggleModal={toggleRelistSuccessModal}
          projectRelistData={projectRelistData}
        />
      )}
      <Card onClick={handleShowProject} className="cursor-pointer">
        {isNewTag && <NewTag />}
        <Elevate>
          <CardBody>
            <Row>
              <Col lg="8">
                <div className="d-flex mb-1 status-row">
                  <CustomBadge>
                    <Badge
                      className={`${
                        primaryFilter === 'my_bids' && userData?.user_type !== userTypes.client
                          ? data?.bid?.status
                          : project?.status
                      } truncate-1`}
                      color="badge"
                    >
                      {primaryFilter === 'my_bids' && userData?.user_type !== userTypes.client
                        ? statusEnum[data?.bid?.status]
                        : statusEnum[project?.status]}
                    </Badge>
                  </CustomBadge>
                </div>
                <CardTitle className="d-flex align-items-center mb-3">
                  <span className="cursor-pointer">{project?.details?.name ?? project?.name}</span>
                </CardTitle>
                <div className="d-flex gap-sm-5 flex-wrap project-stats">
                  <PermissionWrapper
                    permissions={appPermissions}
                    permissionName={['MARKETPLACE.PROJECT_DETAILS.PRICE']}
                  >
                    <CardText className="project">
                      <>
                        {project?.pay_type} Price &nbsp;
                        {project?.total_cost > 0 ? `${project?.total_cost} ${project?.currency_symbol}` : ''}
                      </>
                    </CardText>
                  </PermissionWrapper>
                  <PermissionWrapper
                    permissions={appPermissions}
                    permissionName={['MARKETPLACE.PROJECT_DETAILS.LOCATION']}
                  >
                    <CardText className="project d-flex align-items-center">
                      <img src={Mpin} alt="Mpin" className="mpin" />
                      {project?.client?.office_address?.country?.name ||
                        project?.client_details?.office_address?.country?.name ||
                        data?.client?.country_name ||
                        project?.country_name ||
                        'Location'}
                    </CardText>
                  </PermissionWrapper>
                  <CardText className="mb-6">
                    {`Posted ${project?.posted_date ? DateTime?.fromMillis(project?.posted_date)?.toRelative() : '-'}`}
                  </CardText>
                </div>

                {descriptionToShow && (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {!showFullText ? (
                      <div className="my-div" ref={divRef} style={{ maxHeight: '6.1rem', overflow: 'hidden' }}>
                        {descriptionToShow}
                      </div>
                    ) : (
                      <div className="my-div" ref={divRef}>
                        {descriptionToShow}
                      </div>
                    )}
                  </>
                )}

                {isContentOverflowing && (
                  <CardText className="cursor-pointer show-more" onClick={(e) => handleToggleView(e)}>
                    {showFullText ? 'Show less' : 'Show more'}
                  </CardText>
                )}
              </Col>
              <Col lg="4">
                {primaryFilter === 'my_bids' && userData?.user_type === userTypes.client ? (
                  <BaseInfoForBidReceived
                    isSearchPage={isSearchPage}
                    data={data}
                    setRelistConfirmationModal={setRelistConfirmationModal}
                  />
                ) : (
                  <BaseInfoMarketplaceCard
                    isSearchPage={isSearchPage}
                    data={data}
                    setRelistConfirmationModal={setRelistConfirmationModal}
                    setDeleteDraftModal={setDeleteDraftModal}
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
          data={getModifiedProjectResponse({ data })}
          modal={showModal}
          toggleModal={handleToggle}
          setCreateBidModal={setCreateBidModal}
          toggleCompleteProfileModal={toggleCompleteProfileModal}
          isMyTeam={isTeam}
          setRelistConfirmationModal={setRelistConfirmationModal}
          setSavedDraftsAvailableModal={setSavedDraftsAvailableModal}
        />
      )}
      {createBidModal && (
        <CreateBidModal
          modal={createBidModal}
          toggleModal={toggleCreateBidModal}
          selectedProject={getModifiedProjectResponse({ data })}
        />
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

MarketPlaceProjectCard.propTypes = {
  secondFilterState: PropTypes.object,
  isExpanded: PropTypes.bool,
  data: PropTypes.object,
  isPopoverOpen: PropTypes.bool,
  isTeam: PropTypes.bool,
  isSearchPage: PropTypes.bool,
  primaryFilter: PropTypes.string,
};

MarketPlaceProjectCard.defaultProps = {
  secondFilterState: {},
  isExpanded: false,
  data: {},
  isPopoverOpen: false,
  isTeam: false,
  isSearchPage: false,
  primaryFilter: '',
};

export default MarketPlaceProjectCard;
