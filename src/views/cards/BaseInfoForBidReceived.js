/* eslint-disable no-else-return */
import React, { useState } from 'react';
import { Badge } from 'reactstrap';
import hat from '@src/assets/images/hat.svg';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import AvatarGroup from '@components/avatar-group';
import { Heart } from 'react-feather';
import { useDispatch } from 'react-redux';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import theme from '../../configs/themeVariables';
import { makeFav, removeFav } from '../../redux/actions/marketPlaceActions';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { userTypes } from '../../utility/constants/Constant';
import { BidsReceivedWrapper, IconWrapper } from './style';

const BaseInfoForBidReceived = ({ isSearchPage, data }) => {
  const project = data?.project;
  const [isFavorite, setIsFavorite] = useState(project?.is_favorite);
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.stopPropagation();
    setIsFavorite(true);
    dispatch(makeFav({ project_id: project?._id, onSuccess: () => {}, onError: () => setIsFavorite(false) }));
  };
  const handleUnLike = (e) => {
    e.stopPropagation();
    setIsFavorite(false);
    dispatch(removeFav({ project_id: project?._id, onSuccess: () => {}, onError: () => setIsFavorite(true) }));
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

  return (
    <div>
      <IconWrapper className="d-flex justify-content-end pt-50">
        <div className="d-flex align-items-center gap-70">
          {project?.is_alma_mater && (
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

      <div>
        <BadgeGroup
          title="Skills"
          data={project?.skills_required}
          color="light-blue"
          id={`tooltip-skills-project-${project?._id}`}
        />
        <BadgeGroup
          title="Tools"
          data={project?.tools_required}
          color="light-blue"
          id={`tooltip-tools-project-${project?._id}`}
        />
      </div>
      <BidsReceivedWrapper>
        <p className="wrapper-title mb-50">Bids Received</p>
        {bidsReceivedAvatarGroup?.length ? (
          <div>
            {bidsReceivedAvatarGroup?.length > 3 ? (
              <AvatarGroup
                totalCount={data?.bidders?.length || 0}
                size="sm"
                className="ms-25 mb-50"
                data={bidsReceivedAvatarGroup?.slice(0, 3)}
              />
            ) : (
              <AvatarGroup size="sm" className="ms-25 mb-50" data={bidsReceivedAvatarGroup} />
            )}
          </div>
        ) : (
          <p className="m-0">None</p>
        )}
      </BidsReceivedWrapper>
    </div>
  );
};

BaseInfoForBidReceived.propTypes = {
  data: PropTypes.object,
  isSearchPage: PropTypes.bool,
};

BaseInfoForBidReceived.defaultProps = {
  data: {},
  isSearchPage: false,
};
export default BaseInfoForBidReceived;
