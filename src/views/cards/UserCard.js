import { Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group';
import { UserCardWrap } from './style';

const UserCard = ({ data }) => (
  <UserCardWrap>
    <Card>
      <CardBody>
        <Row>
          <Col lg="8">
            <div className="d-flex">
              <img className="market-place-card-photo me-1 mt-50" src={lisa} alt="avatar" />
              <div>
                <CardTitle className="marketplace-card-title mb-0 ms-25">
                  <Link to={`/profile/${data?.company_name ? 'client' : 'talent'}/${data?.user_id}`}>
                    {data?.first_name}&nbsp;
                    {data?.last_name}
                  </Link>
                </CardTitle>
                <CardText className="font-small-3 fw-300 mb-25 ms-25 marketplace-card-role">
                  {data?.company_name || data?.role?.name || 'Company name'}
                </CardText>
                <div className="d-flex">
                  <RatingBadge number="0" />
                  <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
                </div>
              </div>
            </div>
            <CardText className="mt-2 ">{data?.company_tagline || data?.professional_intro} </CardText>
          </Col>
          <Col lg="4">
            {data?.company_name && (
              <BadgeGroup title="Area of interest" data={data?.project_area_of_interest?.area} color="light-blue" />
            )}
            <BadgeGroup
              title="Skills"
              data={data?.company_name ? data?.project_area_of_interest?.skills : data?.expertise?.skills}
              color="light-blue"
            />
            <BadgeGroup
              title="Tools"
              data={data?.company_name ? data?.project_area_of_interest?.tools : data?.expertise?.tools}
              color="light-blue"
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  </UserCardWrap>
);
UserCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.object,
};
export default UserCard;
