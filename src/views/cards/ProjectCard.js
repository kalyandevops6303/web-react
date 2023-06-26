/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { round } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
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

const ProjectCard = ({ isExpanded, data }) => {
  const isTab = useIsTab();
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowFullText(isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const statusEnum = {
    OPEN: 'Open Listing',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
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
              <CardTitle>
                <span className="cursor-pointer" onClick={() => setShowModal(true)}>
                  {data?.details?.name}
                </span>
              </CardTitle>
              <div className="d-flex project-stats">
                <CardText className="project">
                  {data?.pay_type?.variable_cost ? (
                    <>Variable Price &nbsp; </>
                  ) : (
                    <>
                      Fixed Price - {data?.pay_type?.fixed_cost} {data?.pay_type?.currency?.[0]?.code} &nbsp;
                    </>
                  )}
                  {data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toFormat('LL/dd/yyyy') : '-'}
                </CardText>
                {data?.match_percentage > 1 && (
                  <CardText className="project d-flex align-items-center">
                    <img src={LikeIcon} alt="recommanded_icon" className="recom" /> Recommended
                  </CardText>
                )}
                <CardText className="project d-flex align-items-center">
                  <img src={Mpin} alt="Mpin" className="mpin" />
                  {data?.client_details?.[0]?.office_address?.country?.[0]?.name || 'Location'}
                </CardText>
                <CardText className="project">
                  {data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toRelative() : '-'}
                </CardText>
              </div>
              <ReactShowMoreText
                lines={4}
                more={
                  <span
                    style={{ color: theme.lightBlueColor, textDecoration: 'none', cursor: 'pointer' }}
                    onClick={() => setShowFullText(true)}
                  >
                    show more
                  </span>
                }
                less={
                  <span
                    style={{ color: theme.lightBlueColor, textDecoration: 'none', cursor: 'pointer' }}
                    onClick={() => setShowFullText(false)}
                  >
                    show less
                  </span>
                }
                className="content-css project-desc d-none"
                anchorClass="show-more-less-clickable"
                expanded={showFullText}
                // eslint-disable-next-line no-undef
                width={isTab ? round(window.innerWidth - 120) : round(window.innerWidth - window.innerWidth * 0.43)}
              >
                {showFullText ? ReactHtmlParser(data?.details?.description) : data?.details?.description}
              </ReactShowMoreText>
              {ReactHtmlParser(data?.details?.description)}
            </Col>
            <Col lg="4">
              <div className="d-flex mb-2 align-items-center">
                <img className="market-place-card-photo me-1" src={lisa} alt="avatar" />
                <div className="d-flex w-100 align-items-center">
                  <div className="flex-grow-1">
                    <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
                      {data?.client_details?.[0]?.first_name} {data?.client_details?.[0]?.last_name}
                    </CardTitle>
                    <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
                      {data?.client_details?.[0]?.company_name}
                    </CardText>
                  </div>
                  <div className="d-flex flex-grow-1">
                    <RatingBadge number="0" />
                    <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
                  </div>
                </div>
              </div>
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
};

ProjectCard.defaultProps = {
  isExpanded: false,
  data: {},
};

export default ProjectCard;
