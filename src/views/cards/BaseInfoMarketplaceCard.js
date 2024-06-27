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
import { selectUserData } from '../../redux/selectors/authSelectors';

const BaseInfoMarketplaceCard = ({ isSearchPage, data, setRelistConfirmationModal, setDeleteDraftModal }) => {
  const project = data?.project;
  const bid = data?.bid;
  const [isFavorite, setIsFavorite] = useState(project?.is_favourite);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientDetails = data?.client ?? data?.client_details;
  const isFavUnfavLoading = useSelector(selectFavUnfavLoading);
  const userData = useSelector(selectUserData);
  const location = useLocation();

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isFavUnfavLoading) {
      setIsFavorite(true);
      dispatch(makeFav({ project_id: project?._id, onError: () => setIsFavorite(false) }));
    }
  };
  const handleUnLike = (e) => {
    e.stopPropagation();
    if (!isFavUnfavLoading) {
      setIsFavorite(false);
      dispatch(removeFav({ project_id: project?._id, onError: () => setIsFavorite(true) }));
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
    if (data?.bidders) {
      if (data?.bidders?.user_type === userTypes.team) {
        navigate(`/profile/team/${data?.bidders?.team_id}`, { state });
      } else {
        navigate(`/profile/talent/${data?.bidders?.talent_id}`, { state });
      }
    } else {
      navigate(`/profile/client/${clientDetails?._id}`, { state });
    }
  };

  const getImage = () => {
    if (data?.bidders) {
      if (data?.bidders?.user_type === userTypes.team) {
        return data?.bidders?.team_logo?.length ? data?.bidders?.team_logo : defaultAvatar;
      } else {
        return data?.bidders?.talent_image_uri?.length ? data?.bidders?.talent_image_uri : defaultAvatar;
      }
    } else {
      return clientDetails?.image_uri?.length ? clientDetails?.image_uri : defaultAvatar;
    }
  };

  const avatarGroup = data?.bidders?.length
    ? data?.bidders?.map((bidder) => ({
        user_id: bidder?.talent_id || bidder?.team_id,
        user_type: bidder?.team_id ? userTypes.team : userTypes.talent,
        title: bidder?.team_name || `${bidder?.talent_first_name} ${bidder?.talent_last_name}`,
        img: bidder?.team_logo || bidder?.talent_image_uri || defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

  const bidsReceivedAvatarGroup = data?.bidders?.length
    ? data?.bidders?.map((bidder) => ({
        user_id: bidder?.talent_id || bidder?.team_id,
        user_type: bidder?.team_id ? userTypes.team : userTypes.talent,
        title: bidder?.team_name || `${bidder?.talent_first_name} ${bidder?.talent_last_name}`,
        img: bidder?.team_logo || bidder?.talent_image_uri || defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

  const onEditDraftClick = () => {
    const bidType = bid?.bid_type?.toLowerCase() || 'simple';
    if (bid?.entity === userTypes.talent) {
      navigate(`/create-bid/${project?._id}/${project?.pay_type?.toLowerCase()}-${bidType}/${bid?._id}/milestone`);
    } else {
      navigate(`/create-bid/${project?._id}/${project?.pay_type?.toLowerCase()}-${bidType}/${bid?._id}/team`);
    }
  };

  return (
    <div>
      <IconWrapper className="d-flex justify-content-end pt-50">
        <div className="d-flex align-items-center gap-70">
          {project?.is_alma_mater && (
            <Badge className="alma-mater ms-50 bg-white">
              <img src={hat} alt="client-badge" className="bg-white" />
            </Badge>
          )}
          {!isSearchPage && !location.pathname.split('/').includes('my_listings') && (
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

          {project?.match_percentage ? (
            <div className="circular-progressbar-container m-0">
              <CircularProgressbarWithChildren
                value={project?.match_percentage}
                styles={{
                  path: {
                    stroke: giveStrokeColor(project?.match_percentage),
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
                  <p className="percentage-text m-0">{project?.match_percentage}%</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          ) : null}
        </div>
      </IconWrapper>
      {!location.pathname.split('/').includes('my_listings') && (
        <div className="d-flex mb-25 align-items-center">
          {data?.bidders ? (
            <div>
              {data?.bidders?.user_type === userTypes.talent && (
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
          <div onClick={(e) => handleNavigate(e)} className="d-flex w-100 align-items-center">
            <div className="flex-grow-1">
              <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
                <span>
                {clientDetails?.title ?? clientDetails?.company_name}
                </span>
              </CardTitle>
              <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
              {clientDetails?.first_name}&nbsp;
              {clientDetails?.last_name}
              </CardText>
            </div>
            <div className="d-flex flex-grow-1">
              <RatingBadge number={clientDetails?.rating || 0} />
              <CardText className="ps-1 font-small-3 fw-300 rating-label">
                {clientDetails?.projects_worked_on_count ?? 0} Projects
              </CardText>
            </div>
          </div>
        </div>
      )}
      {data?.bidders && data?.bidders?.user_type === userTypes.team ? (
        <div className="mb-2">
          {avatarGroup?.length > 3 ? (
            <AvatarGroup
              totalCount={data?.bidders?.length || 0}
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
          data={project?.skills_required}
          color="light-blue"
          id={`tooltip-skills-project-${data?._id}`}
        />
        <BadgeGroup
          title="Tools"
          data={project?.tools_required}
          color="light-blue"
          id={`tooltip-tools-project-${data?._id}`}
        />
      </div>
      {location.pathname.split('/').includes('my_listings') && (
        <BidsReceivedWrapper>
          <p className="wrapper-title mb-50">Bids Received</p>
          <div className="d-flex align-items-center justify-content-between">
              {bidsReceivedAvatarGroup?.length === 0 ? (
                <p className="m-0">None</p>
              ) : (
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
              )}
              {data?.project?.status === 'LISTING_EXPIRED' ? (
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
              ) : null}
            </div>
        </BidsReceivedWrapper>
      )}
      {location.pathname.split('/').includes('my_bids') &&
        userData?.user_type !== userTypes.client &&
        data?.bid?.status === 'DRAFT' && (
          <BidsReceivedWrapper>
            <div className="d-flex justify-content-end mt-3">
              <Button
                color="flat-danger"
                className="me-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteDraftModal(true);
                }}
              >
                Delete Draft
              </Button>
              <div className="relist-btn-wrapper">
                <Button
                  color="primary"
                  outline
                  className="relist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditDraftClick();
                  }}
                >
                  Edit Draft
                </Button>
              </div>
            </div>
          </BidsReceivedWrapper>
        )}
    </div>
  );
};

BaseInfoMarketplaceCard.propTypes = {
  data: PropTypes.object,
  isSearchPage: PropTypes.bool,
  setRelistConfirmationModal: PropTypes.func,
  setDeleteDraftModal: PropTypes.func,
};

BaseInfoMarketplaceCard.defaultProps = {
  data: {},
  isSearchPage: false,
  setRelistConfirmationModal: () => {},
  setDeleteDraftModal: () => {},
};

export default BaseInfoMarketplaceCard;
