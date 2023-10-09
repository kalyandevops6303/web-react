/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Mpin from '@src/assets/images/map-pin.png';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import DateTime from '../../lib/date-time';
import { ProjectCardWrap } from './style';
import { CustomBadge } from '../styled';
import ProjectModal from '../modals/ProjectModal';
import BaseInfoUI from './BaseInfoCard';
import CreateBidModal from '../modals/CreateBidModal';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import { selectUserData } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';

const MarketPlaceProjectCard = ({ primaryFilter, isSearchPage, isExpanded, data, isPopoverOpen, isTeam }) => {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);
  const userData = useSelector(selectUserData);
  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  useEffect(() => {
    setShowFullText(isExpanded);
  }, [isExpanded, isPopoverOpen]);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const handleToggleView = () => {
    setShowFullText(!showFullText);
  };

  const statusEnum = {
    OPEN: 'Open Listing',
    ON_GOING: 'On Going',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
    COMPLETED: 'Completed',
    DRAFT: 'Draft',
    NEW: 'New',
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected',
    REVIEWED: 'Reviewed',
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

  const handleShowProject = () => {
    setShowModal(true);
  };

  return (
    <ProjectCardWrap>
      <Card>
        <CardBody>
          <Row>
            <Col lg="8">
              <div className="d-flex mb-1 status-row">
                <CustomBadge>
                  <Badge
                    className={`${
                      primaryFilter === 'my_bids' && userData?.user_type === userTypes.talent
                        ? data?.bid_status
                        : data?.status
                    } truncate-1`}
                    color="badge"
                  >
                    {primaryFilter === 'my_bids' && userData?.user_type === userTypes.talent
                      ? statusEnum[data?.bid_status]
                      : statusEnum[data?.status]}
                  </Badge>
                </CustomBadge>
              </div>
              <CardTitle className="d-flex align-items-center">
                <span className="cursor-pointer" onClick={handleShowProject}>
                  {data?.details?.name ?? data?.name}
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
                <CardText className="cursor-pointer show-more" onClick={handleToggleView}>
                  {showFullText ? 'Show less' : 'Show more'}
                </CardText>
              )}
            </Col>
            <Col lg="4">
              <BaseInfoUI isSearchPage={isSearchPage} data={data} />
            </Col>
          </Row>
        </CardBody>
      </Card>
      {showModal && (
        <ProjectModal
          data={data}
          modal={showModal}
          toggleModal={handleToggle}
          setCreateBidModal={setCreateBidModal}
          setSelectedProject={setSelectedProject}
          toggleCompleteProfileModal={toggleCompleteProfileModal}
          isMyTeam={isTeam}
        />
      )}
      {createBidModal && (
        <CreateBidModal modal={createBidModal} toggleModal={toggleCreateBidModal} selectedProject={selectedProject} />
      )}
      {completeProfileModal && (
        <CompleteProfileModal
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
          modalInfoText="team"
        />
      )}
    </ProjectCardWrap>
  );
};

MarketPlaceProjectCard.propTypes = {
  isExpanded: PropTypes.bool,
  data: PropTypes.object,
  isPopoverOpen: PropTypes.bool,
  isTeam: PropTypes.bool,
  isSearchPage: PropTypes.bool,
  primaryFilter: PropTypes.string,
};

MarketPlaceProjectCard.defaultProps = {
  isExpanded: false,
  data: {},
  isPopoverOpen: false,
  isTeam: false,
  isSearchPage: false,
  primaryFilter: '',
};

export default MarketPlaceProjectCard;
