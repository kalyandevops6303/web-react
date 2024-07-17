import { Card, CardBody, CardText, CardTitle, Badge, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import AvatarGroup from '@components/avatar-group';
import hat from '@src/assets/images/hat.svg';
import { Heart } from 'react-feather';
import { useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import parse from 'html-react-parser';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { IconWrapper, TeamCardWrap } from './style';
import theme from '../../configs/themeVariables';
import { makeFav, removeFav } from '../../redux/actions/marketPlaceActions';
import { TEAM_STATUS, userTypes } from '../../utility/constants/Constant';
import { Elevate } from '../styled';
import NewTag from '../../@core/components/new-tag';
import { updateCardStatus } from '../../redux/actions/dashboardActions';
import { getReadType } from '../../utility/Utils';
import { selectUserType } from '../../redux/selectors/authSelectors';
import selectFavUnfavLoading from '../../redux/selectors/favUnfavSelectors';
import { deleteDraftTeamLoading } from '../../redux/selectors/teamSelectors';
import DeleteDraftTeamModal from '../modals/DeleteTeamDraftModal';
import { deleteDraftTeam } from '../../redux/actions/teamsActions';

const Team = ({ data, isSearchPage, primaryFilter, secondFilterState }) => {
  const dispatch = useDispatch();
  const [deleteDraftModal, setDeleteDraftModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDeleteDraftLoading = useSelector(deleteDraftTeamLoading);
  const userType = useSelector(selectUserType);
  const isFavUnfavLoading = useSelector(selectFavUnfavLoading);

  const users = [];
  const [isFavorite, setIsFavorite] = useState(data?.is_favourite);
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
    if (!isFavUnfavLoading) {
      setIsFavorite(true);
      dispatch(
        makeFav({
          user_id: data?._id,
          user_type: data?.user_type,
          onError: () => setIsFavorite(false),
        }),
      );
    }
  };
  const handleUnLike = (e) => {
    e.stopPropagation();
    if (!isFavUnfavLoading) {
      setIsFavorite(false);
      dispatch(removeFav({ team_id: data?._id, onError: () => setIsFavorite(true) }));
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

  const updateCard = () => {
    const postData = {
      metadata: {
        team_id: data._id,
      },
      type: getReadType({ primaryFilter, secondFilterState, userType }),
    };
    if (postData?.type && data?.is_read === false) {
      dispatch(updateCardStatus({ data: postData }));
    }
  };

  const handleCard = () => {
    updateCard();
    if (data?.creation_status === TEAM_STATUS?.DRAFT) {
      navigate(`/create-team/profile-details/${data?._id}`);
    } else {
      navigate(`/profile/team/${data?._id}`);
    }
  };

  const toggleDeleteDraftModal = () => setDeleteDraftModal(!deleteDraftModal);

  const onDeleteDraftTeamSuccess = () => {
    toggleDeleteDraftModal();
    if (location?.state?.isDraftTeams) {
      navigate('/my-teams/teams', {
        state: {
          isDraftTeams: true,
        },
      });
    } else {
      navigate('/my-teams/teams');
    }
  };

  return (
    <TeamCardWrap>
      {deleteDraftModal && (
        <DeleteDraftTeamModal
          modal={deleteDraftModal}
          toggleModal={toggleDeleteDraftModal}
          teamName={data?.name}
          onDeleteDraft={() => {
            dispatch(
              deleteDraftTeam({
                id: data?._id,
                onSuccess: () => {
                  onDeleteDraftTeamSuccess();
                },
                onError: () => {},
              }),
            );
          }}
          teamType={data?.team_type}
          isDeleteDraftLoading={isDeleteDraftLoading}
        />
      )}
      <Card onClick={handleCard} className="cursor-pointer">
        {data?.is_read === false && <NewTag />}
        <Elevate>
          <CardBody>
            <div className="d-flex teamcard-flex-cloumn">
              <div className="w-75">
                <div className="d-flex flex-column gap-1 justify-content-between">
                  {data?.creation_status === 'DRAFT' && <div className="draft-badge">Draft</div>}
                  <CardTitle className="card-title mb-1 d-flex justify-space-between">
                    <span>{data?.name || <b className='text-secondary'>(Untitled Team)</b>}</span>
                  </CardTitle>
                  {/* <span className="me-3">
                  {data?.created_at ? DateTime?.fromMillis(data?.created_at)?.toRelative() : ''}
                </span> */}
                </div>
                <CardText className="team-desc mb-1">
                  {data?.introduction ? parse(data?.introduction) : <i> ( Add Description )</i>}{' '}
                </CardText>

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
                <IconWrapper className="d-flex flex-column align-items-start pt-50">
                  <div className="d-flex w-100 justify-content-end gap-70">
                    {data?.is_alma_mater && (
                      <Badge className="bg-white" style={{ marginTop: '-3px' }}>
                        <img src={hat} alt="client-badge" width={20} height={20} />
                      </Badge>
                    )}
                    {data?.creation_status !== 'DRAFT' && !isSearchPage && (
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
                </IconWrapper>
                <div className="">
                  {data?.skills && (
                    <BadgeGroup
                      title="Skills"
                      data={data?.skills}
                      color="light-blue"
                      id={`tooltip-skills-${data?._id}`}
                      isDraft={data?.creation_status === 'DRAFT'}
                    />
                  )}
                  {data?.tools && (
                    <BadgeGroup
                      title="Tools"
                      data={data?.tools}
                      color="light-blue"
                      id={`tooltip-tools-${data?._id}`}
                      isDraft={data?.creation_status === 'DRAFT'}
                    />
                  )}
                </div>
                {data?.creation_status === 'DRAFT' && (
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
                          navigate(`/create-team/profile-details/${data?._id}`);
                        }}
                      >
                        Edit Draft
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Elevate>
      </Card>
    </TeamCardWrap>
  );
};

Team.propTypes = {
  primaryFilter: PropTypes.string,
  secondFilterState: PropTypes.object,
  data: PropTypes.object,
  isSearchPage: PropTypes.bool,
};
Team.defaultProps = {
  primaryFilter: '',
  secondFilterState: {},
  data: {},
  isSearchPage: false,
};
export default Team;
