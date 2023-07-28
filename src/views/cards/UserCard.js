import { Card, CardBody, CardText, CardTitle, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { PropTypes } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { UserCardWrap } from './style';
import theme from '../../configs/themeVariables';
import { userTypes } from '../../utility/constants/Constant';

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

const UserCard = ({ data, userType }) => {
  const location = useLocation();
  const fromLocationPrimary = () => {
    if (location.pathname.split('/').includes('marketplace'))
      return { title: 'Marketplace', link: '/marketplace/all_listings' };
    if (location.pathname.split('/').includes('search')) return { title: 'Search', link: '/search' };
    return '';
  };
  const fromLocationSecondary = () => {
    if (location.pathname.split('/').includes('all_listings')) return { title: 'Marketplace', link: location.pathname };
    if (location.pathname.split('/').includes('my_listings')) return { title: 'My listings', link: location.pathname };
    if (location.pathname.split('/').includes('talents')) return { title: 'Talent', link: location.pathname };
    if (location.pathname.split('/').includes('clients')) return { title: 'Clients', link: location.pathname };
    return '';
  };

  const fromLocationSearch = () => {
    if (data?.user_type === userTypes.client) return { title: 'Clients', link: '' };
    return { title: 'Talent', link: '' };
  };
  const description = data?.company_tagline || data?.professional_intro;
  return (
    <UserCardWrap userType={userType}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="5">
              <div className="d-flex">
                <Avatar
                  img={data?.image_uri?.length > 0 ? data?.image_uri : defaultAvatar}
                  imgHeight="30"
                  imgWidth="30"
                  className={`market-place-card-photo me-1 mt-25 ${data?.match_percentage >= 0 ? 'mt-25' : ''}`}
                />
                <div>
                  <CardTitle className="truncate-1 text-decoration-none marketplace-card-title mb-0">
                    <Link
                      state={{
                        from: {
                          primary: fromLocationPrimary(),
                          secondary: fromLocationSecondary() || fromLocationSearch(),
                        },
                      }}
                      to={`/profile/${data?.user_type === userTypes.client ? 'client' : 'talent'}/${data?.user_id}`}
                    >
                      {data?.first_name}&nbsp;
                      {data?.last_name}
                    </Link>
                  </CardTitle>
                  <CardText className="truncate-1 font-small-3 fw-300 mb-25 marketplace-card-role">
                    {data?.user_type === userTypes.client
                      ? data?.company_name || 'Company Name'
                      : data?.role?.name || 'Role'}
                  </CardText>
                  <div className="d-flex">
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
              </div>
              <CardText
                id={`tooltip-${data?.user_id}`}
                className={`mt-75 desc ${userType === 'client' ? 'truncate-4' : 'truncate-3'}`}
              >
                {description}
              </CardText>
              {description?.length > 80 && (
                <UncontrolledTooltip placement="right" target={`tooltip-${data?.user_id}`}>
                  <p className="m-0 text-start">{data?.company_tagline || data?.professional_intro}</p>
                </UncontrolledTooltip>
              )}
            </Col>

            <Col lg="7">
              {data?.user_type === userTypes.client && (
                <BadgeGroup
                  title="Area of interest"
                  data={data?.project_area_of_interest?.area?.name ? data?.project_area_of_interest?.area : []}
                  color="light-blue"
                  user_id={data?.user_id}
                />
              )}
              <BadgeGroup
                title="Skills"
                data={
                  data?.user_type === userTypes.client
                    ? data?.project_area_of_interest?.skills
                    : data?.expertise?.skills
                }
                color="light-blue"
                user_id={data?.user_id}
              />
              <BadgeGroup
                title="Tools"
                data={
                  data?.user_type === userTypes.client ? data?.project_area_of_interest?.tools : data?.expertise?.tools
                }
                color="light-blue"
                user_id={data?.user_id}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </UserCardWrap>
  );
};
UserCard.propTypes = {
  data: PropTypes.object,
  userType: PropTypes.string,
};
UserCard.defaultProps = {
  data: {},
  userType: 'string',
};
export default UserCard;
