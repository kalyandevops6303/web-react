import { Badge, Card, CardBody, CardText, CardTitle, Col } from 'reactstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { PropTypes } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MapPin } from 'react-feather';
import { useDispatch } from 'react-redux';
import Avatar from '@components/avatar';
import hat from '@src/assets/images/hat.svg';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { UserCardWrap } from './style';
import theme from '../../configs/themeVariables';
import { userTypes } from '../../utility/constants/Constant';
import { makeFavFromMarketplace, removeFavFromMarketplace } from '../../redux/actions/marketPlaceActions';

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
  const dispatch = useDispatch();
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
  // const description = data?.company_tagline || data?.professional_intro;

  const locationDetails = data?.user_type === userTypes.client ? data?.office_address : data?.current_residency;

  const handleLike = () => {
    dispatch(makeFavFromMarketplace({ user_id: data?.user_id, user_type: data?.user_type }));
  };
  const handleUnLike = () => {
    dispatch(removeFavFromMarketplace({ user_id: data?.user_id }));
  };
  const isSearchPage = location.pathname.split('/').includes('search');

  const clientSkills = data?.project_area_of_interest?.skills ?? [];
  const talentSkills = data?.expertise?.skills ?? [];

  return (
    <UserCardWrap userType={userType}>
      <Card>
        <CardBody>
          <Col className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Avatar
                img={data?.image_uri?.length > 0 ? data?.image_uri : defaultAvatar}
                imgHeight="40"
                imgWidth="40"
                className={`market-place-card-photo me-1 mb-1 `}
              />
              <div className="d-flex flex-column">
                <CardTitle className="d-flex truncate-2 text-decoration-none marketplace-card-title mb-0">
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
                  {data?.is_alma_mater && (
                    <Badge className="alma-mater ms-50 bg-white">
                      <img src={hat} alt="client-badge" />
                    </Badge>
                  )}
                </CardTitle>
                <CardText className="truncate-1 font-small-3 fw-300 mb-25 marketplace-card-role">
                  {data?.user_type === userTypes.client
                    ? data?.company_name || 'Company Name'
                    : data?.role?.name || 'Role'}
                </CardText>
              </div>
            </div>
            <div className="d-flex">
              {!isSearchPage && (
                <span>
                  {data?.is_favorite ? (
                    <Heart
                      className="cursor-pointer d-flex ms-50  heart"
                      fill={theme.red}
                      stroke={theme.red}
                      onClick={handleUnLike}
                      size={18}
                    />
                  ) : (
                    <Heart className="cursor-pointer d-flex  ms-50 heart" onClick={handleLike} size={18} />
                  )}
                </span>
              )}
              {data?.match_percentage >= 0 && (
                <div className="circular-progressbar-container ms-50">
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
          </Col>
          <Col className="d-flex justify-content-between">
            <div className="d-flex flex-column w-50">
              {locationDetails ? (
                <div className="d-flex align-items-center mt-1">
                  <MapPin size={20} className="me-50" />
                  {locationDetails?.city?.name ? (
                    <span className="ml-50">{locationDetails?.city?.name},&nbsp;</span>
                  ) : (
                    ''
                  )}
                  {locationDetails?.country?.name ? <span>{locationDetails?.country?.name}</span> : ''}
                </div>
              ) : null}
              <div className="d-flex mt-50">
                <RatingBadge number="0" />
                <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
              </div>
            </div>
            <div className="d-flex w-50">
              <BadgeGroup
                title="Skills"
                data={
                  data?.user_type === userTypes.client
                    ? [...clientSkills]?.sort((a, b) => b.name.length - a.name.length)
                    : [...talentSkills].sort((a, b) => b.name.length - a.name.length)
                }
                color="light-blue"
                id={`tooltip-${data?.user_id}`}
              />
            </div>
          </Col>
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
