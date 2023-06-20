import { Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group';
import { UserCardWrap } from './style';

const UserCard = () => (
  <UserCardWrap>
    <Card>
      <CardBody>
        <Row>
          <Col lg="8">
            <div className="d-flex">
              <img className="market-place-card-photo me-1 mt-50" src={lisa} alt="avatar" />
              <div>
                <CardTitle className="marketplace-card-title mb-0 ms-25">Lisa</CardTitle>
                <CardText className="font-small-3 fw-300 mb-25 ms-25 marketplace-card-role">
                  Senior Sales Associate
                </CardText>
                <div className="d-flex">
                  <RatingBadge number="4.1" />
                  <CardText className="ps-1 font-small-3 fw-300 rating-label">51 Projects</CardText>
                </div>
              </div>
            </div>
            <CardText className="mt-2 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. A cras semper auctor neque. Ipsum dolor sit amet consectetur adipiscing elit
              pellentesque habitant. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet.
            </CardText>
          </Col>
          <Col lg="4">
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
  </UserCardWrap>
);
export default UserCard;
