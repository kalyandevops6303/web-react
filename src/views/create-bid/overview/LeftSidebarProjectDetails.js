import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Badge, Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import MoneyIcon from '@src/assets/images/money.png';
import Avatar from '@components/avatar';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import BadgeGroup from '../../../@core/components/badge-group';
import { LeftSidebarProjectDetailsWrapper } from '../style';
import RatingBadge from '../../../@core/components/rating-group/RatingBadge';
import { CustomBadge } from '../../styled';
import { getProjectDetails } from '../../../redux/actions/createBidActions';
import { projectDetails } from '../../../redux/selectors/createBidSelectors';

const LeftSidebarProjectDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const projectDetailsData = useSelector(projectDetails);

  const statusEnum = {
    OPEN: 'Open Listing',
    IN_REVIEW: 'In Review',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
  };

  useEffect(() => {
    dispatch(getProjectDetails(params.projectId));
  }, []);

  return (
    <LeftSidebarProjectDetailsWrapper>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between status-head">
            <CustomBadge bordered>
              <Badge className={`${projectDetailsData[0]?.status}`} color="badge">
                {statusEnum[projectDetailsData[0]?.status]}
              </Badge>
            </CustomBadge>
            <CardText className="fw-bold days">10 Days left</CardText>
          </div>
          <CardTitle className="title">{projectDetailsData[0]?.details?.name}</CardTitle>

          <div className="d-flex">
            <img className="project-details-card-photo me-1 mt-50" src={lisa} alt="avatar" />
            <div>
              <CardText className="mb-0 ms-25">Cloudwell Automation</CardText>
              <div className="d-flex">
                <RatingBadge number="0" />
                <CardText className="ps-75 font-small-2 fw-300 rating-label">0 Projects</CardText>
              </div>
            </div>
          </div>

          <section className="stats d-flex mt-2 justify-content-between ">
            {!projectDetailsData[0]?.pay_type.variable_cost && (
              <div className="d-flex amount gap-50 align-items-center">
                <Avatar
                  color="light-warning"
                  icon={<img src={MoneyIcon} height={22} alt="money" />}
                  className="stat-avatar"
                />
                <div>
                  <CardText className="font-small-3 mb-0 stat-value">
                    {projectDetailsData[0]?.pay_type.currency[0]} {projectDetailsData[0]?.pay_type.fixed_cost}
                  </CardText>
                  <CardText className="font-small-2 mb-0 stat-key">Value</CardText>
                </div>
              </div>
            )}
          </section>

          <section className="project-details mt-2">
            <CardTitle className="main-title mb-75">Project Details</CardTitle>
          </section>

          <div className="d-flex mb-75">
            <span className="info-key">Posted date:</span>
            <CardText className="info-value">
              {projectDetailsData[0]?.listing_details?.start_date.replaceAll('-', '/')}
            </CardText>
          </div>

          <BadgeGroup
            inline
            color="light-blue"
            title="Tags"
            data={[{ name: 'JS' }, { name: 'HTML HTML' }, { name: 'REACT' }, { name: 'Javascript' }]}
          />

          <div className="project-desc mb-75">
            <div className="project-desc-title">Description:</div>
            <CardText className="value">
              The data collection and payment system is designed to allow automotive companies to compensate users for
              sharing their data. By collecting data such as driving habits, vehicle usage, road conditions and other
              environmental data
            </CardText>
          </div>

          <div className="d-flex gap-1 mt-3 justify-content-center">
            <Button className="w-50" color="primary">
              Message
            </Button>
          </div>
        </CardBody>
      </Card>
    </LeftSidebarProjectDetailsWrapper>
  );
};

export default LeftSidebarProjectDetails;
