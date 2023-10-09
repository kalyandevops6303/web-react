/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Mpin from '@src/assets/images/map-pin.png';
import { useState, useEffect, useRef } from 'react';
import DateTime from '../../lib/date-time';
import { ProjectCardWrap } from './style';
import { CustomBadge } from '../styled';
import ProjectModal from '../modals/ProjectModal';
import ProjectWithTeamUI from './ProjectWithTeamUI';
import BaseInfoUI from './BaseInfoCardUI';
import CreateBidModal from '../modals/CreateBidModal';
import CompleteProfileModal from '../modals/CompleteProfileModal';

const ProjectCard = ({ isProjectWithTeam, isTeam, isExpanded, data, isPopoverOpen }) => {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);
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
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
    COMPLETED: 'Completed',
    ON_GOING: 'On Going',
  };
  // const giveStrokeColor = (percentage) => {
  //   if (percentage <= 40) {
  //     return theme.red;
  //     // eslint-disable-next-line
  //   } else if (percentage > 40 && percentage <= 70) {
  //     return theme.orange;
  //   } else {
  //     return theme.green;
  //   }
  // };

  // const avatarGroup = data?.worker_details?.workers?.map((worker) => ({
  //   title: `${worker?.first_name} ${worker?.last_name}`,
  //   img: worker?.image_uri?.length ? worker?.image_uri : defaultAvatar,
  //   placement: 'bottom',
  //   imgHeight: 33,
  //   imgWidth: 33,
  // }));

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

  return (
    <ProjectCardWrap>
      <Card>
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
                  {data?.name}{' '}
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
                <CardText className=" project mb-1">{`Assigned Date: ${DateTime?.fromMillis(
                  data?.assigned_date ?? 0,
                ).toFormat('dd-MM-yy')}`}</CardText>
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
                <CardText className="cursor-pointer show-more" onClick={handleToggleView}>
                  {showFullText ? 'Show less' : 'Show more'}
                </CardText>
              )}
            </Col>
            <Col lg="4">
              {isProjectWithTeam ? <ProjectWithTeamUI data={data} /> : null}
              {!isTeam && !isProjectWithTeam && <BaseInfoUI data={data} />}
              {/* {!isProjectWithTeam &&  <BaseInfoUI data={data} />} */}
              {/* {!isProjectWithTeam && !isRecommended && !isTeam && BaseInfoUI} */}
              {/* <div className={`d-flex mb-2 ${data?.match_percentage >= 0 ? '' : 'align-items-center'}`}>
                <Avatar
                  img={data?.client_details?.image_uri?.length > 0 ? data?.client_details?.image_uri : defaultAvatar}
                  imgHeight="30"
                  imgWidth="30"
                  className={`market-place-card-photo me-1 ${data?.match_percentage >= 0 ? 'mt-25' : ''}`}
                />
                <div className={`${data?.match_percentage >= 0 ? '' : ' d-flex w-100 align-items-center'}`}>
                  <div className="flex-grow-1">
                    <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
                      {data?.client_details?.first_name} {data?.client_details?.last_name}
                    </CardTitle>
                    <CardText className="fw-300 ms-25 marketplace-card-role">
                      {data?.client_details?.company_name}
                    </CardText>
                  </div>
                  <div className="d-flex flex-grow-1 align-items-center">
                    <RatingBadge number={returnFormattedRating(data?.client_details?.rating)} />
                    <CardText className="ps-1 font-small-3 fw-300 rating-label">
                      {data?.client_details?.projects_listed_count} Projects
                    </CardText>
                  </div>
                </div>
                {data?.match_percentage >= 0 && (
                  <div className="circular-progressbar-container mt-25">
                    <CircularProgressbarWithChildren
                      value={data?.match_percentage}
                      styles={{
                        path: {
                          stroke: giveStrokeColor(data?.match_percentage),
                          strokeLinecap: 'round',
                          transition: 'stroke-dashoffset 0.5s ease 0s',
                          transform: 'rotate(0turn)',
                          transformOrigin: 'center center',
                        },
                        trail: {
                          stroke: theme.progressBarBg,
                          strokeLinecap: 'round',
                          transform: 'rotate(0turn)',
                          transformOrigin: 'center center',
                        },
                      }}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <p className="percentage-text m-0">{data?.match_percentage}%</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                )}
              </div> */}
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

ProjectCard.propTypes = {
  isExpanded: PropTypes.bool,
  data: PropTypes.object,
  isPopoverOpen: PropTypes.bool,
  isProjectWithTeam: PropTypes.bool,
  isTeam: PropTypes.bool,
};

ProjectCard.defaultProps = {
  isExpanded: false,
  data: {},
  isPopoverOpen: false,
  isProjectWithTeam: false,
  isTeam: false,
};

export default ProjectCard;
