/* eslint-disable no-else-return */
import React, { useState } from 'react';
import { CardText, CardTitle, Badge, Button } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import hat from '@src/assets/images/hat.svg';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import AvatarGroup from '@components/avatar-group';
import { Heart } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { makeFav, removeFav } from '../../redux/actions/marketPlaceActions';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { userTypes } from '../../utility/constants/Constant';
import { BidsReceivedWrapper, IconWrapper } from './style';
import selectFavUnfavLoading from '../../redux/selectors/favUnfavSelectors';

const BaseInfoCard = ({ isSearchPage, data, setRelistConfirmationModal }) => {
  const [isFavorite, setIsFavorite] = useState(data?.is_favourite);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientDetails = data?.client ?? data?.client_details;
  const isFavUnfavLoading = useSelector(selectFavUnfavLoading);

  const location = useLocation();

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isFavUnfavLoading) {
      setIsFavorite(true);
      dispatch(makeFav({ project_id: data?._id, onError: () => setIsFavorite(false), flexTern: flexTern }));
    }
  };
  const handleUnLike = (e) => {
    e.stopPropagation();
    if (!isFavUnfavLoading) {
      setIsFavorite(false);
      dispatch(removeFav({ project_id: data?._id, onError: () => setIsFavorite(true) }));
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
  const fromLocationSearch = () => ({ title: 'Clients', link: '' });

  const handleNavigate = (e) => {
    e.stopPropagation();
    const state = {
      from: {
        primary: fromLocationPrimary(),
        secondary: fromLocationSecondary() || fromLocationSearch(),
      },
    };
    if (data?.bidder_details) {
      if (data?.bidder_details?.user_type === userTypes.team) {
        navigate(`/profile/team/${data?.bidder_details?.team_id}`, { state });
      } else {
        navigate(`/profile/talent/${data?.bidder_details?.user_id}`, { state });
      }
    } else {
      navigate(`/profile/client/${data?.client_details?.user_id}`, { state });
    }
  };

  const getImage = () => {
    if (data?.bidder_details) {
      if (data?.bidder_details?.user_type === userTypes.team) {
        return data?.bidder_details?.team_logo?.length ? data?.bidder_details?.team_logo : defaultAvatar;
      } else {
        return data?.bidder_details?.image_uri?.length ? data?.bidder_details?.image_uri : defaultAvatar;
      }
    } else {
      return clientDetails?.image_uri?.length ? clientDetails?.image_uri : defaultAvatar;
    }
  };

  const avatarGroup = data?.bidder_details?.workers?.length
    ? data?.bidder_details?.workers?.map((worker) => ({
        user_id: worker?.user_id,
        user_type: userTypes.talent,
        title: `${worker?.first_name} ${worker?.last_name}`,
        img: worker?.image_uri?.length ? worker?.image_uri : defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

  const bidsReceivedAvatarGroup = data?.bid_profiles?.length
    ? data?.bid_profiles?.map((bidder) => ({
        user_id: bidder?.talent_id || bidder?.team_id,
        user_type: bidder?.team_id ? userTypes.team : userTypes.talent,
        title: bidder?.team_name || `${bidder?.talent_first_name} ${bidder?.talent_last_name}`,
        img: bidder?.team_logo || bidder?.talent_image_uri || defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

  return (
    <div>
      <IconWrapper className="d-flex justify-content-end pt-50">
        <div className="d-flex align-items-center gap-70">
          {data?.is_alma_mater && (
            <Badge className="alma-mater ms-50 bg-white">
              <img src={hat} alt="client-badge" className="bg-white" />
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
            <div className="circular-progressbar-container m-0">
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
          ) : null}
        </div>
      </IconWrapper>
      {!location.pathname.split('/').includes('my_listings') && (
        <div className="d-flex mb-25 align-items-center">
          {data?.bidder_details ? (
            <div>
              {data?.bidder_details?.user_type === userTypes.talent && (
                <img
                  className="market-place-card-photo me-75"
                  src={getImage()}
                  alt="avatar"
                  width={40}
                  height={50}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          ) : (
            <img
              className="market-place-card-photo me-75"
              src={getImage()}
              alt="avatar"
              width={40}
              height={50}
              style={{ objectFit: 'cover' }}
            />
          )}
          <div className="d-flex w-100 align-items-center">
            <div onClick={(e) => handleNavigate(e)} className="flex-grow-1">
              <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
                {data?.bidder_details ? (
                  <span>
                    {data?.bidder_details?.user_type === userTypes.team
                      ? data?.bidder_details?.name
                      : `${data?.bidder_details?.first_name} ${data?.bidder_details?.last_name}`}
                  </span>
                ) : (
                  <span>
                    {data?.client_details?.first_name}&nbsp;
                    {data?.client_details?.last_name}
                  </span>
                )}
              </CardTitle>
              {data?.bidder_details ? (
                <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
                  {data?.bidder_details?.role?.name}
                </CardText>
              ) : (
                <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
                  {clientDetails?.title ?? clientDetails?.company_name}
                </CardText>
              )}
            </div>
            <div className="d-flex flex-grow-1">
              <RatingBadge
                number={data?.bidder_details ? data?.bidder_details?.rating ?? 0 : clientDetails?.rating ?? 0}
              />
              {data?.bidder_details ? (
                <CardText className="ps-1 font-small-3 fw-300 rating-label">
                  {data?.bidder_details?.projects_worked_on_count ?? 0} Projects
                </CardText>
              ) : (
                <CardText className="ps-1 font-small-3 fw-300 rating-label">
                  {clientDetails?.projects_worked_on_count ?? 0} Projects
                </CardText>
              )}
            </div>
          </div>
        </div>
      )}
      {data?.bidder_details && data?.bidder_details?.user_type === userTypes.team ? (
        <div className="mb-2">
          {avatarGroup?.length > 3 ? (
            <AvatarGroup
              totalCount={data?.bidder_details?.workers?.length || 0}
              size="sm"
              className="ms-25 mb-50"
              data={avatarGroup?.slice(0, 3)}
            />
          ) : (
            <AvatarGroup size="sm" className="ms-25 mb-50" data={avatarGroup} />
          )}
        </div>
      ) : (
        <div className="mb-2" />
      )}
      <div>
        <BadgeGroup
          title="Skills"
          data={data?.proficiency?.skills}
          color="light-blue"
          id={`tooltip-skills-project-${data?._id}`}
        />
        <BadgeGroup
          title="Tools"
          data={data?.proficiency?.tools}
          color="light-blue"
          id={`tooltip-tools-project-${data?._id}`}
        />
      </div>
      {location.pathname.split('/').includes('my_listings') && (
        <BidsReceivedWrapper>
          <p className="wrapper-title mb-50">Bids Received</p>
          {bidsReceivedAvatarGroup?.length ? (
            <div className="d-flex align-items-center">
              {bidsReceivedAvatarGroup?.length > 3 ? (
                <AvatarGroup size="sm" className="ms-25 mb-50" data={bidsReceivedAvatarGroup?.slice(0, 3)} />
              ) : (
                <AvatarGroup size="sm" className="ms-25 mb-50" data={bidsReceivedAvatarGroup} />
              )}
              <div className="total-count px-75 ms-1">
                <p className="m-0">{bidsReceivedAvatarGroup?.length}</p>
              </div>
            </div>
          ) : (
            <p className="m-0">None</p>
          )}
          {data?.status === 'LISTING_EXPIRED' && (
            <div className="d-flex justify-content-end relist-btn-wrapper">
              <Button
                color="primary"
                outline
                className="relist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setRelistConfirmationModal(true);
                }}
              >
                Re-list
              </Button>
            </div>
          )}
        </BidsReceivedWrapper>
      )}
    </div>
  );
};

BaseInfoCard.propTypes = {
  data: PropTypes.object,
  isSearchPage: PropTypes.bool,
  setRelistConfirmationModal: PropTypes.func,
};

BaseInfoCard.defaultProps = {
  data: {},
  isSearchPage: false,
  setRelistConfirmationModal: () => {},
};
export default BaseInfoCard;
