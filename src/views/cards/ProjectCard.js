/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Mpin from '@src/assets/images/map-pin.png';
import LikeIcon from '@src/assets/images/like.png';
import AvatarGroup from '@components/avatar-group';
import { useState, useEffect, useRef } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useDispatch } from 'react-redux';
// import Avatar from '@components/avatar';
import { Heart } from 'react-feather';
import { useLocation } from 'react-router-dom';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../lib/date-time';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group';
import { ProjectCardWrap } from './style';
import { CustomBadge } from '../styled';
import ProjectModal from '../modals/ProjectModal';
import { makeFavFromMarketplace, removeFavFromMarketplace } from '../../redux/actions/marketPlaceActions';

const ProjectCard = ({ isProjectWithTeam, isTeam, isExpanded, data, isPopoverOpen }) => {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

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
  };
  const giveStrokeColor = (percentage) => {
    if (percentage <= 40) {
      return theme.red;
      // eslint-disable-next-line
    } else if (percentage > 40 && percentage <= 70) {
      return theme.orange;
    } else {
      return theme.green;
    }
  };

  const divRef = useRef(null);

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      setIsContentOverflowing(divElement.scrollHeight > divElement.clientHeight);
    }
  }, []);

  const avatarGroupArr = [
    {
      title: 'Billy Hopkins',
      img: defaultAvatar,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Amy Carson',
      img: defaultAvatar,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Brandon Miles',
      img: defaultAvatar,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Daisy Weber',
      img: defaultAvatar,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: 'Jenny Looper',
      img: defaultAvatar,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    },
  ];

  const isRecommended = data?.match_percentage >= 0;
  const ProjectWithTeamUI = (
    <div className={`d-flex  gap-1 mb-2 ${isRecommended || isProjectWithTeam ? '' : 'align-items-center'}`}>
      <section className="d-flex w-50">
        <img
          className={`market-place-card-photo me-75 ${isRecommended ? 'mt-25' : ''}`}
          src={defaultAvatar}
          alt="avatar"
        />
        <div
          className={`${
            isRecommended || isProjectWithTeam ? '' : ' d-flex w-100 align-items-center'
          } name-info-rating-wrapper`}
        >
          <div className="flex-grow-1">
            <CardTitle className="marketplace-card-title mb-25 ms-25 fw-bolder">
              {data?.client_details?.first_name} {data?.client_details?.last_name}
            </CardTitle>
            <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
              {data?.client_details?.company_name}
            </CardText>
          </div>
          <div className="d-flex flex-grow-1 mt-25">
            <RatingBadge number="0" />
            <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
          </div>
        </div>
      </section>
      <div className="w-50">
        <div className="flex-grow-1">
          <CardTitle className="marketplace-card-title mb-50 ms-25 fw-bolder">Research and development</CardTitle>
        </div>
        <AvatarGroup size="sm" className="ms-25 mb-50" data={avatarGroupArr.slice(0, 3)} />

        <div className="d-flex flex-grow-1 mt-25">
          <RatingBadge number="0" />
          <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
        </div>
      </div>
    </div>
  );
  const TeamUI = (
    <div className="w-50">
      <div className="flex-grow-1">
        <CardTitle className="marketplace-card-title mb-50 ms-25 fw-bolder">Research and development</CardTitle>
      </div>
      <AvatarGroup size="sm" className="ms-25 mb-50" data={avatarGroupArr.slice(0, 3)} />

      <div className="d-flex flex-grow-1 mt-25">
        <RatingBadge number="0" />
        <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
      </div>
    </div>
  );
  const RecommendedUI = (
    <div className="d-flex mb-2">
      <img className="market-place-card-photo me-75 mt-75" src={defaultAvatar} alt="avatar" />
      <div>
        <div className="flex-grow-1">
          <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
            {data?.client_details?.first_name} {data?.client_details?.last_name}
          </CardTitle>
          <CardText className="font-small-3 fw-300 ms-25 mb-25 marketplace-card-role">
            {data?.client_details?.company_name}
          </CardText>
        </div>
        <div className="d-flex flex-grow-1">
          <RatingBadge number="0" />
          <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
        </div>
      </div>
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
    </div>
  );

  const BaseInfoUI = (
    <div className="d-flex mb-2 align-items-center">
      <img className="market-place-card-photo me-75" src={defaultAvatar} alt="avatar" />
      <div className="d-flex w-100 align-items-center">
        <div className="flex-grow-1">
          <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
            {data?.client_details?.first_name} {data?.client_details?.last_name}
          </CardTitle>
          <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
            {data?.client_details?.company_name}
          </CardText>
        </div>
        <div className="d-flex flex-grow-1">
          <RatingBadge number="0" />
          <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
        </div>
      </div>
    </div>
  );
  const handleLike = () => {
    dispatch(makeFavFromMarketplace({ project_id: data?._id }));
  };
  const handleUnLike = () => {
    dispatch(removeFavFromMarketplace({ project_id: data?._id }));
  };
  const isSearchPage = location.pathname.split('/').includes('search');

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
                <span className="cursor-pointer" onClick={() => setShowModal(true)}>
                  {data?.details?.name}{' '}
                </span>
                {!isSearchPage && (
                  <span>
                    {data?.is_favorite ? (
                      <Heart
                        className="cursor-pointer d-flex m-auto ms-75  heart"
                        fill={theme.red}
                        stroke={theme.red}
                        onClick={handleUnLike}
                        size={20}
                      />
                    ) : (
                      <Heart className="cursor-pointer d-flex m-auto ms-75 heart" onClick={handleLike} size={20} />
                    )}
                  </span>
                )}
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
                {data?.match_percentage > 1 && (
                  <CardText className="project d-flex align-items-center">
                    <img src={LikeIcon} alt="recommanded_icon" className="recom" /> Recommended
                  </CardText>
                )}
                <CardText className="project d-flex align-items-center">
                  <img src={Mpin} alt="Mpin" className="mpin" />
                  {data?.client_details?.office_address?.country?.name || 'Location'}
                </CardText>
                <CardText className=" mb-1">
                  {data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toRelative() : '-'}
                </CardText>
              </div>

              {!showFullText ? (
                <div className="my-div" ref={divRef} style={{ maxHeight: '6.1rem', overflow: 'hidden' }}>
                  {data?.details?.description}
                </div>
              ) : (
                <div className="my-div" ref={divRef}>
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
              {isProjectWithTeam ? ProjectWithTeamUI : isTeam ? TeamUI : isRecommended ? RecommendedUI : ''}
              {!isProjectWithTeam && !isRecommended && !isTeam && BaseInfoUI}
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
                  <div className="d-flex flex-grow-1">
                    <RatingBadge number="0" />
                    <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
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
              <BadgeGroup title="Skills" data={data?.proficiency?.skills} color="light-blue" />
              <BadgeGroup title="Tools" data={data?.proficiency?.tools} color="light-blue" />
            </Col>
          </Row>
        </CardBody>
      </Card>
      {showModal && <ProjectModal data={data} modal={showModal} toggleModal={handleToggle} />}
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
