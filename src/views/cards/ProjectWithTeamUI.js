import React, { useState } from 'react';
import { CardText, CardTitle, Badge } from 'reactstrap';
import hat from '@src/assets/images/hat.svg';
import PropTypes from 'prop-types';
import { Heart } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import AvatarGroup from '@components/avatar-group';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { makeFav, removeFav } from '../../redux/actions/marketPlaceActions';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { selectAuthUserData } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import selectFavUnfavLoading from '../../redux/selectors/favUnfavSelectors';

const ProjectWithTeamUI = ({ secondaryFilterForInvitedType, primaryFilter, data }) => {
  const userData = useSelector(selectAuthUserData);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(data?.is_favorite);
  const isFavUnfavLoading = useSelector(selectFavUnfavLoading);

  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation();
    if (isFavUnfavLoading) {
      setIsFavorite(true);
      dispatch(makeFav({ project_id: data?._id, onError: () => setIsFavorite(false) }));
    }
  };
  const handleUnLike = (e) => {
    e.stopPropagation();
    if (isFavUnfavLoading) {
      setIsFavorite(false);
      dispatch(removeFav({ project_id: data?._id, onError: () => setIsFavorite(true) }));
    }
  };

  const handleClientNavigate = (e) => {
    e.stopPropagation();
    navigate(`/profile/client/${data?.client?.user_id}`);
  };

  const handleTeamTalentNavigate = (e) => {
    e.stopPropagation();
    if (data?.worker_details?.user_type === userTypes.team) {
      navigate(`/profile/team/${data?.worker_details?.team_id}`);
    } else if (data?.worker_details?.user_type === userTypes.talent) {
      navigate(`/profile/talent/${data?.worker_details?.user_id}`);
    }
  };

  let profileToShowInRightSideOfCard;
  if (userData.user_type === userTypes.talent) {
    profileToShowInRightSideOfCard = data?.invitation_by;
  } else if (userData.user_type === userTypes.team) {
    if (secondaryFilterForInvitedType === 'SENT') {
      profileToShowInRightSideOfCard = data?.invitation_to;
    } else {
      profileToShowInRightSideOfCard = data?.invited_type;
    }
  } else {
    profileToShowInRightSideOfCard = data?.invitation_to;
  }

  const handleTalentTeamClientNavigate = (e) => {
    e.stopPropagation();
    if (profileToShowInRightSideOfCard?.user_type === userTypes.team) {
      navigate(`/profile/team/${profileToShowInRightSideOfCard?.team_id}`);
    } else if (profileToShowInRightSideOfCard?.user_type === userTypes.talent) {
      navigate(`/profile/talent/${profileToShowInRightSideOfCard?.user_id}`);
    } else if (profileToShowInRightSideOfCard?.user_type === userTypes.client) {
      navigate(`/profile/client/${profileToShowInRightSideOfCard?.user_id}`);
    }
  };

  const avatarGroup = data?.worker_details?.workers?.length
    ? data?.worker_details?.workers?.map((worker) => ({
        user_type: userTypes.talent,
        user_id: worker?.user_id,
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

  const teamAvatar = profileToShowInRightSideOfCard?.team_members?.length
    ? profileToShowInRightSideOfCard?.team_members?.map((user) => ({
        user_id: user?.user_id,
        user_type: userTypes.talent,
        title: `${user?.first_name} ${user?.last_name}`,
        img: user?.image_uri?.length ? user?.image_uri : defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

  return (
    <div className="d-flex flex-column gap-1 mb-2">
      <div className="d-flex align-items-center justify-content-end pt-50">
        <div className="d-flex align-items-center gap-50">
          {profileToShowInRightSideOfCard?.is_alma_mater && (
            <Badge className="alma-mater ms-50 bg-white">
              <img src={hat} alt="client-badge" className="bg-white" />
            </Badge>
          )}
          <div>
            {isFavorite ? (
              <Heart
                className="cursor-pointer d-flex heart"
                fill={theme.red}
                stroke={theme.red}
                onClick={(e) => handleUnLike(e)}
                size={20}
                display="none"
              />
            ) : (
              <Heart className="cursor-pointer d-flex heart" onClick={(e) => handleLike(e)} size={20} />
            )}
          </div>
        </div>
      </div>
      {primaryFilter === 'invited' ? (
        <section>
          {profileToShowInRightSideOfCard?.user_type === userTypes.team ? (
            <div className="w-100">
              <div className="flex-grow-1">
                <CardTitle
                  onClick={(e) => handleTalentTeamClientNavigate(e)}
                  className="marketplace-card-title mb-50 ms-25 fw-bolder"
                >
                  {profileToShowInRightSideOfCard?.name ??
                    `${profileToShowInRightSideOfCard?.team_members?.first_name} ${data?.team_members?.last_name}`}
                </CardTitle>
              </div>
              {teamAvatar?.length > 3 ? (
                <AvatarGroup
                  totalCount={profileToShowInRightSideOfCard?.team_members_count}
                  size="sm"
                  className="ms-25 mb-50"
                  data={teamAvatar?.slice(0, 3)}
                />
              ) : (
                <AvatarGroup size="sm" className="ms-25 mb-50" data={teamAvatar} />
              )}

              <div className="d-flex flex-grow-1 mt-25">
                <RatingBadge number={Math.round(profileToShowInRightSideOfCard?.rating ?? 0)} />
                <CardText className="ps-1 font-small-3 fw-300 rating-label">
                  {profileToShowInRightSideOfCard?.project_count ?? 0} Projects
                </CardText>
              </div>
              <div className="d-flex gap-1 mt-2">
                <div className="w-50">
                  <BadgeGroup
                    title="Skills"
                    data={[...clientSkills]?.sort((a, b) => b.name.length - a.name.length)}
                    color="light-blue"
                    id={`tooltip-skills-${data?._id}`}
                  />
                </div>
                <div className="w-50">
                  <BadgeGroup
                    title="Tools"
                    data={[...clientTools]?.sort((a, b) => b.name.length - a.name.length)}
                    color="light-blue"
                    id={`tooltip-tools-${data?._id}`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <section className="w-100 me-2">
              <div className="d-flex w-100">
                <img
                  className="market-place-card-photo me-75"
                  src={
                    profileToShowInRightSideOfCard?.image_uri?.length
                      ? profileToShowInRightSideOfCard?.image_uri
                      : defaultAvatar
                  }
                  alt="avatar"
                  width={40}
                  height={50}
                  style={{ objectFit: 'cover' }}
                  onClick={(e) => handleTalentTeamClientNavigate(e)}
                />
                <div>
                  <div onClick={(e) => handleTalentTeamClientNavigate(e)} className="flex-grow-1">
                    <CardTitle className="marketplace-card-title mb-25 ms-25 fw-bolder">
                      {profileToShowInRightSideOfCard?.first_name} {profileToShowInRightSideOfCard?.last_name}
                    </CardTitle>
                    <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role text-truncate ">
                      {profileToShowInRightSideOfCard?.user_type === userTypes.client ? 'Client' : ''}
                    </CardText>
                  </div>
                  <div className="d-flex flex-grow-1 mt-25">
                    <RatingBadge number={Math.round(profileToShowInRightSideOfCard?.rating ?? 0)} />
                    <CardText className="ps-1 font-small-3 fw-300 rating-label">
                      {profileToShowInRightSideOfCard?.project_count ?? 0} Projects
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-1 mt-2">
                <div className="w-50">
                  <BadgeGroup
                    title="Skills"
                    data={[...clientSkills]?.sort((a, b) => b.name.length - a.name.length)}
                    color="light-blue"
                    id={`tooltip-skills-${data?._id}`}
                  />
                </div>
                <div className="w-50">
                  <BadgeGroup
                    title="Tools"
                    data={[...clientTools]?.sort((a, b) => b.name.length - a.name.length)}
                    color="light-blue"
                    id={`tooltip-tools-${data?._id}`}
                  />
                </div>
              </div>
            </section>
          )}
        </section>
      ) : (
        <>
          <div className="d-flex">
            <section
              className={
                userData?.user_type === userTypes.client
                  ? 'w-50 me-2 d-none'
                  : 'w-50 me-2 d-flex flex-column justify-content-between'
              }
            >
              <div className="d-flex w-100">
                <img
                  className="market-place-card-photo cursor-pointer me-75"
                  src={clientDetails?.image_uri?.length ? clientDetails?.image_uri : defaultAvatar}
                  alt="avatar"
                  width={40}
                  height={50}
                  style={{ objectFit: 'cover' }}
                  onClick={(e) => handleClientNavigate(e)}
                />
                <div>
                  <div onClick={(e) => handleClientNavigate(e)} className="flex-grow-1">
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
                      {data?.client?.project_count ?? 0} Projects
                    </CardText>
                  </div>
                </div>
              </div>
            </section>
            <div
              className={
                userData?.user_type === userTypes.talent || userData?.user_type === userTypes.team
                  ? 'w-50 d-flex flex-column justify-content-between'
                  : 'w-50'
              }
            >
              <div>
                {data?.worker_details?.user_type === userTypes.talent ? (
                  <div className={userData?.user_type === userTypes.talent ? 'd-none' : ''}>
                    <div className="d-flex w-100">
                      <img
                        className="market-place-card-photo cursor-pointer me-75"
                        src={data?.worker_details?.image_uri?.length ? data?.worker_details?.image_uri : defaultAvatar}
                        alt="avatar"
                        width={40}
                        height={50}
                        style={{ objectFit: 'cover' }}
                        onClick={(e) => handleClientNavigate(e)}
                      />
                      <div>
                        <div onClick={(e) => handleClientNavigate(e)} className="flex-grow-1">
                          <CardTitle className="marketplace-card-title mb-25 ms-25 fw-bolder">
                            {data?.worker_details?.name ??
                              `${data?.worker_details?.first_name} ${data?.worker_details?.last_name}`}{' '}
                          </CardTitle>
                          <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role text-truncate ">
                            {data?.worker_details?.title || 'Role'}
                          </CardText>
                        </div>
                        <div className="d-flex flex-grow-1 mt-25">
                          <RatingBadge number={Math.round(data?.worker_details?.rating ?? 0)} />
                          <CardText className="ps-1 font-small-3 fw-300 rating-label">
                            {data?.worker_details?.project_count ?? 0} Projects
                          </CardText>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={userData?.user_type === userTypes.team ? 'd-none' : ''}>
                    <div className="flex-grow-1" onClick={(e) => handleTeamTalentNavigate(e)}>
                      <CardTitle className="marketplace-card-title mb-50 ms-25 fw-bolder">
                        {data?.worker_details?.name ??
                          `${data?.worker_details?.first_name} ${data?.worker_details?.last_name}`}
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
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <section className="w-50 me-2">
              <div className="d-flex mt-2" style={{ marginTop: '35px' }}>
                <BadgeGroup
                  title="Skills"
                  data={[...clientSkills]?.sort((a, b) => b.name.length - a.name.length)}
                  color="light-blue"
                  id={`tooltip-skills-${data?._id}`}
                />
              </div>
            </section>
            <div className="w-50">
              <div className="mt-2">
                <BadgeGroup
                  title="Tools"
                  data={[...clientTools]?.sort((a, b) => b.name.length - a.name.length)}
                  color="light-blue"
                  id={`tooltip-tools-${data?._id}`}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ProjectWithTeamUI.propTypes = {
  data: PropTypes.object,
  primaryFilter: PropTypes.string,
  secondaryFilterForInvitedType: PropTypes.string,
};

ProjectWithTeamUI.defaultProps = {
  data: {},
  primaryFilter: '',
  secondaryFilterForInvitedType: '',
};

export default ProjectWithTeamUI;
