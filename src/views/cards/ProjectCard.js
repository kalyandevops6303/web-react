import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import { Heart } from 'react-feather';
import PropTypes from 'prop-types';
import { round } from 'lodash';
import ReactShowMoreText from 'react-show-more-text';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import Mpin from '@src/assets/images/map-pin.png';
import LikeIcon from '@src/assets/images/like.png';
import { useState, useEffect } from 'react';

import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group';
import { ProjectCardWrap } from './style';
import { useIsTab } from '../../utility/Utils';
import { CustomBadge } from '../styled';
import ProjectModal from '../modals/ProjectModal';

const ProjectCard = ({ isExpanded }) => {
  const isTab = useIsTab();
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowFullText(isExpanded);
  }, [isExpanded]);

  const text =
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  const is_favourited = false;
  const handleToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <ProjectCardWrap>
      <Card>
        <CardBody onClick={() => setShowModal(true)}>
          <Row>
            <Col lg="8">
              <div className="d-flex mb-1 status-row">
                <CustomBadge>
                  <Badge className="open-listing-color truncate-1" color="badge">
                    Open Listing
                  </Badge>
                </CustomBadge>
                {is_favourited ? (
                  <Heart className="d-flex ms-2 heart" fill={theme.red} stroke={theme.red} />
                ) : (
                  <Heart className="d-flex ms-2 heart" />
                )}
              </div>
              <CardTitle>NexusTech</CardTitle>
              <div className="d-flex project-stats">
                <CardText className="project">Fixed Price - 3500$</CardText>
                <CardText className="project d-flex align-items-center">
                  <img src={LikeIcon} alt="recommanded_icon" className="recom" /> Recommended
                </CardText>
                <CardText className="project d-flex align-items-center">
                  {/* <MapPin size={16} className="location " /> United states */}
                  <img src={Mpin} alt="Mpin" className="mpin" /> Recommended
                </CardText>
                <CardText className="project">Posted 1 hour ago</CardText>
              </div>
              <ReactShowMoreText
                lines={4}
                more={<span style={{ color: theme.lightBlueColor, textDecoration: 'none' }}>show more</span>}
                less={<span style={{ color: theme.lightBlueColor, textDecoration: 'none' }}>show less</span>}
                className="content-css project-desc"
                anchorClass="show-more-less-clickable"
                expanded={showFullText}
                onClick={() => setShowFullText(false)}
                // eslint-disable-next-line no-undef
                width={isTab ? round(window.innerWidth - 120) : round(window.innerWidth - window.innerWidth * 0.43)}
              >
                {text}
              </ReactShowMoreText>
            </Col>
            <Col lg="4">
              <div className="d-flex mb-2 align-items-center">
                <img className="market-place-card-photo me-1" src={lisa} alt="avatar" />
                <div className="d-flex w-100 align-items-center">
                  <div className="flex-grow-1">
                    <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">Lisa</CardTitle>
                    <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
                      Senior Sales Associate
                    </CardText>
                  </div>
                  <div className="d-flex flex-grow-1">
                    <RatingBadge number="4.1" />
                    <CardText className="ps-1 font-small-3 fw-300 rating-label">51 Projects</CardText>
                  </div>
                </div>
              </div>
              <BadgeGroup
                title="Skills"
                data={[{ name: 'html' }, { name: 'css' }, { name: 'html' }, { name: 'css' }]}
                color="light-blue"
              />
              <BadgeGroup title="Tools" data={[{ name: 'html' }, { name: 'css' }]} color="light-blue" />
            </Col>
          </Row>
        </CardBody>
      </Card>
      {showModal && <ProjectModal modal={showModal} toggleModal={handleToggle} />}
    </ProjectCardWrap>
  );
};

ProjectCard.propTypes = {
  isExpanded: PropTypes.bool,
};

ProjectCard.defaultProps = {
  isExpanded: false,
};

export default ProjectCard;
