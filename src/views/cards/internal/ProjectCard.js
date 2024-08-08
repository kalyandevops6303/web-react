/* eslint-disable no-nested-ternary */
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Mpin from '@src/assets/images/map-pin.png';
import { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import DateTime from '../../../lib/date-time';
import { ProjectCardWrap } from '../style';
import { CustomBadge, Elevate } from '../../styled';
import ProjectModal from '../../modals/internal/ProjectModal';
import NewTag from '../../../@core/components/new-tag';
import { getModifiedProjectResponse } from '../../../utility/Utils';
import BaseInfoMarketplaceCard from '../BaseInfoMarketplaceCard';

const ProjectCard = ({
  isExpanded,
  data,
}) => {
  const project = data?.project;
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showModal, setShowModal] = useState(false);
  const [isNewTag, setIsTagNew] = useState(project?.is_read === false);

  useEffect(() => {
    setShowFullText(isExpanded);
  }, [isExpanded]);

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
  }, []);


  const handleShowProject = () => {
    setShowModal(true);
  };


  const descriptionToShow = project?.details?.description ?? project?.description;

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
                    <Badge
                      className={`${project?.status} truncate-1`}
                      color="badge"
                    >
                      {statusEnum[project?.status]}
                    </Badge>
                  </CustomBadge>
                </div>
                <CardTitle className="d-flex align-items-center">
                  <span className="cursor-pointer">{project?.details?.name ?? project?.name}</span>
                </CardTitle>
                <div className="d-flex gap-sm-5 flex-wrap project-stats">
                  <CardText className="project">
                    <>
                      {project?.pay_type} Price &nbsp;
                      {project?.total_cost > 0 ? `${project?.total_cost} ${project?.currency_symbol}` : ''}
                    </>
                  </CardText>
                  <CardText className="project d-flex align-items-center">
                    <img src={Mpin} alt="Mpin" className="mpin" />
                    {project?.client?.office_address?.country?.name ||
                      project?.client_details?.office_address?.country?.name ||
                      data?.client?.country_name ||
                      project?.country_name ||
                      'Location'}
                  </CardText>
                  <CardText className=" mb-1">
                    {`Posted ${project?.posted_date ? DateTime?.fromMillis(project?.posted_date)?.toRelative() : '-'}`}
                  </CardText>
                </div>

                {descriptionToShow && (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {!showFullText ? (
                      <div
                        className="my-div"
                        ref={divRef}
                        style={{ maxHeight: '6.1rem', overflow: 'hidden', marginTop: '10px' }}
                      >
                        {parse(descriptionToShow)}
                      </div>
                    ) : (
                      <div className="my-div" ref={divRef}>
                        {parse(descriptionToShow)}
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
                <BaseInfoMarketplaceCard
                  isSearchPage={false}
                  data={data}
                />
              </Col>
            </Row>
          </CardBody>
        </Elevate>
      </Card>
      {showModal && (
        <ProjectModal
          data={getModifiedProjectResponse({ data })}
          modal={showModal}
          toggleModal={handleToggle}
        />
      )}
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