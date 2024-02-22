/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Mpin from '@src/assets/images/map-pin.png';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DateTime from '../../lib/date-time';
import { ProjectCardWrap } from './style';
import { CustomBadge, Elevate } from '../styled';
import ProjectModal from '../modals/ProjectModal';
import RelistConfirmationModal from '../modals/RelistConfirmationModal';
import RelistListingDetailsModal from '../modals/RelistListingDetailsModal';
import RelistSuccessModal from '../modals/RelistSuccessModal';
import BaseInfoUI from './BaseInfoCard';
import CreateBidModal from '../modals/CreateBidModal';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import { selectUserData } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import NewTag from '../../@core/components/new-tag';
import { updateCardStatus } from '../../redux/actions/dashboardActions';
import { getReadType } from '../../utility/Utils';

const SearchProjectCard = ({
  primaryFilter,
  secondFilterState,
  isSearchPage,
  isExpanded,
  data,
  isPopoverOpen,
  isTeam,
}) => {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);
  const [isNewTag, setIsTagNew] = useState(data?.is_read === false);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const [relistConfirmationModal, setRelistConfirmationModal] = useState(null);
  const [relistListingDetailsModal, setRelistListingDetailsModal] = useState(null);
  const [relistSuccessModal, setRelistSuccessModal] = useState(null);
  const [projectRelistData, setProjectRelistData] = useState(null);

  const toggleRelistConfirmationModal = () => setRelistConfirmationModal(!relistConfirmationModal);

  const toggleRelistListingDetailsModal = () => setRelistListingDetailsModal(!relistListingDetailsModal);

  const toggleRelistSuccessModal = () => setRelistSuccessModal(!relistSuccessModal);

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
  };

  const divRef = useRef(null);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      setIsContentOverflowing(divElement.scrollHeight > divElement.clientHeight);
    }

    setProjectRelistData({
      id: data?._id,
      name: data?.details?.name ?? data?.name,
    });
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
    if (primaryFilter === 'my_bids') {
      postData.metadata.bid_id = data?.bids?._id;
    } else {
      postData.metadata.project_id = data?._id;
    }
    if (postData?.type && data?.is_read === false) {
      dispatch(updateCardStatus({ data: postData, onSuccess }));
    }
  };

  return (
    <ProjectCardWrap>
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
                          ? data?.bid_status
                          : data?.status
                      } truncate-1`}
                      color="badge"
                    >
                      {primaryFilter === 'my_bids' && userData?.user_type !== userTypes.client
                        ? statusEnum[data?.bid_status]
                        : statusEnum[data?.status]}
                    </Badge>
                  </CustomBadge>
                </div>
                <CardTitle className="d-flex align-items-center">
                  <span className="cursor-pointer">{data?.details?.name ?? data?.name}</span>
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
                  {/* <CardText className=" project mb-1">{`Assigned Date - ${
                  data?.total_estimated_cost
                }$ | ${DateTime?.fromMillis(data?.assigned_date ?? 0).toFormat('dd-MM-yy')}`}</CardText> */}
                  <CardText className="project d-flex align-items-center">
                    <img src={Mpin} alt="Mpin" className="mpin" />
                    {data?.client?.office_address?.country?.name ||
                      data?.client_details?.office_address?.country?.name ||
                      'Location'}
                  </CardText>
                  <CardText className=" mb-1">
                    {`Posted ${data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toRelative() : '-'}`}
                  </CardText>
                </div>

                {!showFullText ? (
                  <div className="my-div" ref={divRef} style={{ maxHeight: '6.1rem', overflow: 'hidden' }}>
                    {data?.details?.description ?? data?.description}
                  </div>
                ) : (
                  <div className="my-div" ref={divRef}>
                    {data?.details?.description ?? data?.description}
                  </div>
                )}

                {isContentOverflowing && (
                  <CardText className="cursor-pointer show-more" onClick={(e) => handleToggleView(e)}>
                    {showFullText ? 'Show less' : 'Show more'}
                  </CardText>
                )}
              </Col>
              <Col lg="4">
                <BaseInfoUI
                  isSearchPage={isSearchPage}
                  data={data}
                  setRelistConfirmationModal={setRelistConfirmationModal}
                />
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
          isMyTeam={isTeam}
          setRelistConfirmationModal={setRelistConfirmationModal}
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

SearchProjectCard.propTypes = {
  secondFilterState: PropTypes.object,
  isExpanded: PropTypes.bool,
  data: PropTypes.object,
  isPopoverOpen: PropTypes.bool,
  isTeam: PropTypes.bool,
  isSearchPage: PropTypes.bool,
  primaryFilter: PropTypes.string,
};

SearchProjectCard.defaultProps = {
  secondFilterState: {},
  isExpanded: false,
  data: {},
  isPopoverOpen: false,
  isTeam: false,
  isSearchPage: false,
  primaryFilter: '',
};

export default SearchProjectCard;
