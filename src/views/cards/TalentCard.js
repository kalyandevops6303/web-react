import React from 'react';
import Avatar from '@components/avatar';
import { PropTypes } from 'prop-types';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Badge, Card, CardBody, CardText, CardTitle, Col } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Heart } from 'react-feather';
import hat from '@src/assets/images/hat.png';
import { TeamCardWrap } from './style';
import { userTypes } from '../../utility/constants/Constant';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { returnFormattedRating } from '../../utility/Utils';
import theme from '../../configs/themeVariables';
import { makeFavFromMarketplace, removeFavFromMarketplace } from '../../redux/actions/marketPlaceActions';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';

function TalentCard({ data }) {
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

  const handleLike = () => {
    dispatch(makeFavFromMarketplace({ user_id: data?.user_id, user_type: data?.user_type }));
  };
  const handleUnLike = () => {
    dispatch(removeFavFromMarketplace({ user_id: data?.user_id }));
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
  return (
    <TeamCardWrap>
      <Card>
        <CardBody>
          <div className="d-flex">
            <div className="w-75">
              <div className="d-flex">
                <Avatar
                  img={data?.image_uri?.length > 0 ? data?.image_uri : defaultAvatar}
                  imgHeight="40"
                  imgWidth="40"
                  className={`market-place-card-photo me-1 mt-25 ${data?.match_percentage >= 0 ? 'mt-25' : ''}`}
                />
                <Col>
                  <CardTitle className="d-flex truncate-1 text-decoration-none marketplace-card-title mb-0">
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
                    {data?.role?.name || 'Role'}
                  </CardText>
                  <div className="d-flex">
                    <RatingBadge number={returnFormattedRating(data?.rating)} />
                    <CardText className="ps-1 font-small-3 fw-300 rating-label">
                      {data?.user_type === userTypes.talent ? data?.projects_worked_on_count : 0} Projects
                    </CardText>
                  </div>
                </Col>
              </div>
              <div className="mt-2">{data?.professional_intro}</div>
            </div>
            <div className="w-25">
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex w-100 justify-content-end gap-1">
                  {true && (
                    <Badge className="bg-white" style={{ marginTop: '-3px' }}>
                      <img src={hat} alt="client-badge" width={20} height={20} />
                    </Badge>
                  )}
                  <div className="mb-25">
                    {data?.is_favorite ? (
                      <Heart
                        className="cursor-pointer d-flex heart"
                        fill={theme.red}
                        stroke={theme.red}
                        onClick={handleUnLike}
                        size={20}
                      />
                    ) : (
                      <Heart className="cursor-pointer d-flex heart" onClick={handleLike} size={20} />
                    )}
                  </div>
                  {data?.match_percentage ? (
                    <div style={{ width: '35px', height: '35px', marginTop: '-8px' }}>
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
                          <p className="m-0" style={{ fontSize: '10px' }}>
                            {data?.match_percentage ?? 80}%
                          </p>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="">
                <BadgeGroup title="Skills" data={data?.expertise?.skills} color="light-blue" user_id={data?.user_id} />
                <BadgeGroup title="Tools" data={data?.expertise?.tools} color="light-blue" user_id={data?.user_id} />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </TeamCardWrap>
  );
}

TalentCard.propTypes = {
  data: PropTypes.object,
};

TalentCard.defaultProps = {
  data: {},
};

export default TalentCard;
