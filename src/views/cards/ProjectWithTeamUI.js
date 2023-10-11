import React from 'react';
import { CardText, CardTitle, Badge } from 'reactstrap';
import hat from '@src/assets/images/hat.svg';
import PropTypes from 'prop-types';
import { Heart } from 'react-feather';
import { useDispatch } from 'react-redux';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import AvatarGroup from '@components/avatar-group';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { makeFavFromMarketplace, removeFavFromMarketplace } from '../../redux/actions/marketPlaceActions';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';

const ProjectWithTeamUI = ({ data }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(makeFavFromMarketplace({ project_id: data?._id }));
  };
  const handleUnLike = () => {
    dispatch(removeFavFromMarketplace({ project_id: data?._id }));
  };

  const avatarGroup = data?.worker_details?.workers?.length
    ? data?.worker_details?.workers?.map((worker) => ({
        title: `${worker?.first_name} ${worker?.last_name}`,
        img: worker?.image_uri?.length ? worker?.image_uri : defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

  const clientDetails = data?.client ?? data?.client_details;
  // eslint-disable-next-line no-unsafe-optional-chaining
  const clientSkills = data?.proficiency?.skills ?? [];
  const clientTools = data?.proficiency?.tools ?? [];

  return (
    <div className="d-flex flex-column  gap-1 mb-2">
      <div className="d-flex align-items-center justify-content-end">
        <div className="d-flex align-items-center gap-1">
          {data?.is_alma_mater && (
            <Badge className="alma-mater ms-50 bg-white">
              <img src={hat} alt="client-badge" className="bg-white" />
            </Badge>
          )}
          <div style={{ display: 'none' }}>
            {data?.is_favorite ? (
              <Heart
                className="cursor-pointer d-flex heart"
                fill={theme.red}
                stroke={theme.red}
                onClick={handleUnLike}
                size={20}
                display="none"
              />
            ) : (
              <Heart className="cursor-pointer d-flex heart" onClick={handleLike} size={20} />
            )}
          </div>
        </div>
      </div>
      <div className="d-flex">
        <section className="w-50 me-2 ">
          <div className="d-flex w-100">
            <img
              className="market-place-card-photo me-75"
              src={clientDetails?.image_uri?.length ? clientDetails?.image_uri : defaultAvatar}
              alt="avatar"
              width={40}
              height={50}
              style={{ objectFit: 'cover' }}
            />
            <div>
              <div className="flex-grow-1">
                <CardTitle className="marketplace-card-title mb-25 ms-25 fw-bolder">
                  {data?.client?.first_name} {data?.client?.last_name}
                </CardTitle>
                <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role text-truncate ">
                  {data?.client?.title}
                </CardText>
              </div>
              <div className="d-flex flex-grow-1 mt-25">
                <RatingBadge number={Math.round(data?.client?.rating ?? 0)} />
                <CardText className="ps-1 font-small-3 fw-300 rating-label">
                  {data?.client?.project_count} Projects
                </CardText>
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ marginTop: '35px' }}>
            <BadgeGroup
              title="Tools"
              data={[...clientTools]?.sort((a, b) => b.name.length - a.name.length)}
              color="light-blue"
              id={`tooltip-tools-${data?._id}`}
            />
          </div>
        </section>
        <div className="w-50">
          <div className="flex-grow-1">
            <CardTitle className="marketplace-card-title mb-50 ms-25 fw-bolder">
              {data?.worker_details?.name ?? `${data?.worker_details?.first_name} ${data?.worker_details?.last_name}`}
            </CardTitle>
          </div>
          {avatarGroup?.length > 3 ? (
            <AvatarGroup
              totalCount={data?.worker_details?.team_members_count || data?.worker_details?.workers_count}
              size="sm"
              className="ms-25 mb-50"
              data={avatarGroup?.slice(0, 3)}
            />
          ) : (
            <AvatarGroup size="sm" className="ms-25 mb-50" data={avatarGroup} />
          )}

          <div className="d-flex flex-grow-1 mt-25">
            <RatingBadge number={Math.round(data?.worker_details?.rating ?? 0)} />
            <CardText className="ps-1 font-small-3 fw-300 rating-label">
              {data?.client?.project_count} Projects
            </CardText>
          </div>
          <div className="mt-2">
            <BadgeGroup
              title="Skills"
              data={[...clientSkills]?.sort((a, b) => b.name.length - a.name.length)}
              color="light-blue"
              id={`tooltip-skills-${data?._id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectWithTeamUI.propTypes = {
  data: PropTypes.object,
};

ProjectWithTeamUI.defaultProps = {
  data: {},
};

export default ProjectWithTeamUI;
