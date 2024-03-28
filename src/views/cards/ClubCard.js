import { Card, CardBody, CardText, CardTitle, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import AvatarGroup from '@components/avatar-group';
import hat from '@src/assets/images/hat.svg';
import { Heart } from 'react-feather';
import { useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { TeamCardWrap } from './style';
import theme from '../../configs/themeVariables';
import { makeFav, removeFav } from '../../redux/actions/marketPlaceActions';
import { userTypes } from '../../utility/constants/Constant';
import { Elevate } from '../styled';
import NewTag from '../../@core/components/new-tag';
import selectFavUnfavLoading from '../../redux/selectors/favUnfavSelectors';

const ClubCard = ({ data, isSearchPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = [];
  const isFavUnfavLoading = useSelector(selectFavUnfavLoading);

  const [isFavorite, setIsFavorite] = useState(data?.is_favorite);
  data?.team_members?.map((user) =>
    users.push({
      user_id: user?.user_id,
      user_type: userTypes.talent,
      title: `${user?.full_name ?? user?.first_name}` || 'user',
      img: (user?.profile_picture ?? user?.image_uri) || avatar7,
      placement: 'bottom',
      imgHeight: 33,
      imgWidth: 33,
    }),
  );

  const handleLike = (e) => {
    e.stopPropagation();
    if (isFavUnfavLoading === false) {
      setIsFavorite(true);
      dispatch(
        makeFav({
          user_id: data?._id,
          user_type: 'TEAM',
          onSuccess: () => {},
          onError: () => setIsFavorite(false),
        }),
      );
    }
  };
  const handleUnLike = (e) => {
    e.stopPropagation();
    if (isFavUnfavLoading === false) {
      setIsFavorite(false);
      dispatch(removeFav({ team_id: data?._id, onSuccess: () => {}, onError: () => setIsFavorite(true) }));
    }
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

  const handleCard = () => {
    navigate(`/profile/CLUB/${data?._id}`);
  };

  return (
    <TeamCardWrap>
      <Card onClick={handleCard} className="cursor-pointer">
        <NewTag />

        <Elevate>
          <CardBody>
            <div className="d-flex teamcard-flex-cloumn">
              <div className="w-75">
                <div className="d-flex justify-content-between">
                  <CardTitle className="card-title mb-1 d-flex justify-space-between">
                    <span>{data?.name}</span>
                  </CardTitle>
                  {/* <span className="me-3">
                  {data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toRelative() : ''}
                </span> */}
                </div>
                <CardText className="team-desc mb-1">{data?.introduction} </CardText>

                <div className="avatar-wrap mb-1">
                  {users.length > 3 ? (
                    <span className="d-flex avatars">
                      <AvatarGroup
                        totalCount={data?.team_members_count || data?.workers_count}
                        size="md"
                        className="mr-4"
                        data={users.slice(0, 3)}
                      />
                    </span>
                  ) : (
                    <AvatarGroup size="md" data={users} />
                  )}
                </div>
                <div className="d-flex">
                  <RatingBadge number={data?.rating ?? 0} />
                  <CardText className="ps-1 font-small-3 fw-300 rating-label">0 Projects</CardText>
                </div>
              </div>
              <div className="w-25 teamcard-width">
                <div className="d-flex flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-end gap-1">
                    {data?.is_alma_mater && (
                      <Badge className="bg-white" style={{ marginTop: '-3px' }}>
                        <img src={hat} alt="client-badge" width={20} height={20} />
                      </Badge>
                    )}
                    {!isSearchPage && (
                      <div className="mb-25">
                        {isFavorite ? (
                          <Heart
                            className="cursor-pointer d-flex heart"
                            fill={theme.red}
                            stroke={theme.red}
                            onClick={(e) => handleUnLike(e)}
                            size={20}
                          />
                        ) : (
                          <Heart className="cursor-pointer d-flex heart" onClick={(e) => handleLike(e)} size={20} />
                        )}
                      </div>
                    )}
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
                              {data?.match_percentage ?? 0}%
                            </p>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="">
                  <BadgeGroup
                    title="Skills"
                    data={data?.skills}
                    color="light-blue"
                    id={`tooltip-skills-${data?._id}`}
                  />
                  <BadgeGroup title="Tools" data={data?.tools} color="light-blue" id={`tooltip-tools-${data?._id}`} />
                </div>
              </div>
            </div>
          </CardBody>
        </Elevate>
      </Card>
    </TeamCardWrap>
  );
};

ClubCard.propTypes = {
  data: PropTypes.object,
  isSearchPage: PropTypes.bool,
};
ClubCard.defaultProps = {
  data: {},
  isSearchPage: false,
};
export default ClubCard;
