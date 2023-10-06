import React from 'react';
import { CardText, CardTitle, Badge } from 'reactstrap';
import hat from '@src/assets/images/hat.svg';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import { Heart } from 'react-feather';
import { useDispatch } from 'react-redux';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { makeFavFromMarketplace, removeFavFromMarketplace } from '../../redux/actions/marketPlaceActions';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';

const BaseInfoCard = ({ isSearchPage, data }) => {
  const dispatch = useDispatch();

  const clientDetails = data?.client ?? data?.client_details;

  const handleLike = () => {
    dispatch(makeFavFromMarketplace({ project_id: data?._id }));
  };
  const handleUnLike = () => {
    dispatch(removeFavFromMarketplace({ project_id: data?._id }));
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
    <div>
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center gap-50">
          {data?.is_alma_mater && (
            <Badge className="alma-mater ms-50 bg-white">
              <img src={hat} alt="client-badge" className="bg-white" />
            </Badge>
          )}
          {!isSearchPage && (
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
      </div>
      <div className="d-flex mb-2 align-items-center">
        <img
          className="market-place-card-photo me-75"
          src={clientDetails?.image_uri?.length ? clientDetails?.image_uri : defaultAvatar}
          alt="avatar"
          width={40}
          height={50}
          style={{ objectFit: 'cover' }}
        />
        <div className="d-flex w-100 align-items-center">
          <div className="flex-grow-1">
            <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
              {clientDetails?.first_name} {clientDetails?.last_name}
            </CardTitle>
            <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
              {clientDetails?.title ?? clientDetails?.company_name}
            </CardText>
          </div>
          <div className="d-flex flex-grow-1">
            <RatingBadge number={Math.round(clientDetails?.rating ?? 0)} />
            <CardText className="ps-1 font-small-3 fw-300 rating-label">
              {clientDetails?.project_listed_count ?? 0} Projects
            </CardText>
          </div>
        </div>
      </div>
      <div>
        <BadgeGroup title="Skills" data={data?.proficiency?.skills} color="light-blue" />
        <BadgeGroup title="Tools" data={data?.proficiency?.tools} color="light-blue" />
      </div>
    </div>
  );
};

BaseInfoCard.propTypes = {
  data: PropTypes.object,
  isSearchPage: PropTypes.bool,
};

BaseInfoCard.defaultProps = {
  data: {},
  isSearchPage: false,
};
export default BaseInfoCard;
