import React, { useState } from 'react';
import { CardText, CardTitle, Badge } from 'reactstrap';
import hat from '@src/assets/images/hat.svg';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import { Heart } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import BadgeGroup from '../../@core/components/badge-group';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { makeFav, removeFav } from '../../redux/actions/marketPlaceActions';
import selectFavUnfavLoading from '../../redux/selectors/favUnfavSelectors';

const BaseInfoUI = ({ data, hideUserInfo }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(data?.is_favourite);
  const isFavUnfavLoading = useSelector(selectFavUnfavLoading);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isFavUnfavLoading) {
      setIsFavorite(true);
      dispatch(makeFav({ project_id: data?._id, onError: () => setIsFavorite(false) }));
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

  return (
    <div>
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center gap-1">
          {data?.is_alma_mater && (
            <Badge className="alma-mater ms-50 bg-white">
              <img src={hat} alt="client-badge" className="bg-white" width={20} height={20} />
            </Badge>
          )}
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

          {data?.match_percentage && (
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
          )}
        </div>
      </div>
      {!hideUserInfo && (
        <div className="d-flex mb-2 align-items-center">
          <img
            className="market-place-card-photo me-75"
            src={data?.client?.image_uri?.length ? data?.client?.image_uri : defaultAvatar}
            alt="avatar"
          />
          <div className="d-flex w-100 align-items-center">
            <div className="flex-grow-1">
              <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
                {data?.client?.first_name} {data?.client?.last_name}
              </CardTitle>
              <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
                {data?.client?.company_name}
              </CardText>
            </div>
            <div className="d-flex flex-grow-1">
              <RatingBadge number={Math.round(data?.invitations_to?.rating ?? data?.client?.rating)} />
              <CardText className="ps-1 font-small-3 fw-300 rating-label">
                {data?.client?.projects_worked_on_count || 0} Projects
              </CardText>
            </div>
          </div>
        </div>
      )}
      <div>
        <BadgeGroup
          title="Skills"
          data={data?.proficiency?.skills}
          color="light-blue"
          id={`tooltip-skills-${data?._id}`}
        />
        <BadgeGroup
          title="Tools"
          data={data?.proficiency?.tools}
          color="light-blue"
          id={`tooltip-tools-${data?._id}`}
        />
      </div>
    </div>
  );
};

BaseInfoUI.propTypes = {
  data: PropTypes.object,
  hideUserInfo: PropTypes.bool,
};

BaseInfoUI.defaultProps = {
  data: {},
  hideUserInfo: false,
};
export default BaseInfoUI;
