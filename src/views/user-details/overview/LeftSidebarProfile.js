/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { unionBy } from 'lodash';
import { Badge, Button, Card, CardBody, CardText, CardTitle, Progress, UncontrolledTooltip } from 'reactstrap';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import DribbleIcon from '@src/assets/images/dribble.png';
import BehanceIcon from '@src/assets/images/behance.png';

import Avatar from '@components/avatar';

import Rating from 'react-rating';
import { GitHub, Heart, Link, Linkedin, UserCheck } from 'react-feather';
import { LeftSidebarProfileWrapper } from './style';
import BadgeGroup from '../../../@core/components/badge-group';
import theme from '../../../configs/themeVariables';
import { makeFavourite, removeFavourite } from '../../../redux/actions/profileActions';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import { giveProgressBarColorClassName } from '../../../utility/Utils';
import { CustomBadge } from '../../styled';
import { getItem } from '../../../utility/localStorageControl';
import { userTypes } from '../../../utility/constants/Constant';
import TwitterXIcon from '../../../assets/images/logo/X-logo.svg';
import { getProfilePercentage, getTeamProfilePercentage } from '../../../redux/actions/dashboardActions';
import { inviteTalents } from '../../../redux/actions/inviteTalent';

const LeftSidebarProfile = ({
  isTalentView,
  isInvited,
  isProjectDetailsView,
  isTeamView,
  isClient,
  data,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const userData = getItem('userData');
  const teamId = getItem('teamId');

  const handleLike = () => {
    dispatch(makeFavourite(param?.userId, param?.userType.toUpperCase()));
  };
  const handleUnLike = () => {
    dispatch(removeFavourite(param?.userId));
  };

  const profilePercentageData = useSelector(profilePercentage);

  const onEditClick = () => {
    if (data.user_type === userTypes.team) {
      navigate(`/create-team/profile-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${data.user_type.toLowerCase()}-onboarding/account-details`, {
        state: { isEditing: true },
      });
    }
  };

  const onMessageClick = () => {
    navigate(`/chat`, {
      state: { targetId: param?.userId },
    });
  };

  useEffect(() => {
    if (isTalentView || isClient) {
      dispatch(getProfilePercentage());
      return;
    }
    isTeamView && dispatch(getTeamProfilePercentage());
  }, []);
  const handleJoinTeam = () => {
    const newPostData = {
      message: '',
      redirect_url: `${`${window.location.protocol}//${window.location.host}`}/auth/login`,
      requests_to: {
        user_ids: [],
        team_ids: [param?.userId],
        email_ids: [],
      },
      request_for: {
        project_id: '',
        team_id: '',
        role: '',
      },
    };
    const onSuccess = () => {};
    dispatch(inviteTalents({ data: newPostData, onSuccess, isJoinRequest: true }));
  };

  return (
    <LeftSidebarProfileWrapper>
      <Card>
        <CardBody>
          <div>
            {isInvited && (
              <div className="d-flex gap-50 align-items-center">
                <UserCheck size={16} />
                <CustomBadge>
                  <Badge className="INVITED">Invited</Badge>
                </CustomBadge>
              </div>
            )}
            {!(isClient && userData?.user_type === userTypes.client) &&
              !isProjectDetailsView &&
              !isEditable &&
              !isTeamView &&
              (data?.is_favourited ? (
                <Heart
                  className="cursor-pointer d-flex ms-auto heart"
                  fill={theme.red}
                  stroke={theme.red}
                  onClick={handleUnLike}
                />
              ) : (
                <Heart className="cursor-pointer d-flex ms-auto heart" onClick={handleLike} />
              ))}
          </div>

          <div className="user-image">
            {isClient && (
              <img
                src={data?.company_logo?.length > 0 ? data?.company_logo : avatar7}
                alt="user"
                width={112}
                height={120}
              />
            )}

            {isTalentView && (
              <img src={data?.image_uri?.length > 0 ? data?.image_uri : avatar7} alt="user" width={112} height={120} />
            )}
            {isTeamView && (
              <img src={data?.team_logo?.length > 0 ? data?.team_logo : avatar7} alt="user" width={112} height={120} />
            )}
          </div>

          {isEditable && isTalentView && (
            <div className="private">
              <CardText className="text-center user-name mb-50">{`${data?.first_name || '-'} ${
                data?.last_name || '-'
              }`}</CardText>

              <CardText className="text-center mb-50 fw-bold">{`${data?.role?.name || ''}`}</CardText>
            </div>
          )}
          {!isEditable && isTalentView && (
            <div className="public">
              <CardText className="text-center user-name mb-50 fw-300">{`${data?.first_name} ${data?.last_name}`}</CardText>
              <CardText className="text-center mb-50 fw-bold">{`${data?.role?.name}`}</CardText>
            </div>
          )}

          {isClient && (
            <div className="public">
              <CardText className="text-center user-name mb-25 fw-300">{`${
                data?.company_name || 'Company name'
              }`}</CardText>
              <CardText className="text-center mb-50 fw-bold">{`${data?.first_name || '-'} ${
                data?.last_name || '-'
              }`}</CardText>
            </div>
          )}
          {isTeamView && (
            <div className="public">
              <CardText className="text-center user-name fw-bold mb-25 ">{data?.name}</CardText>
              <CardText className="text-center mb-50 fw-300">{`${data?.created_by?.first_name} ${data?.created_by?.last_name}`}</CardText>
            </div>
          )}

          {!isEditable && (
            <div className="projects-rating projects-rating-public">
              <Rating
                initialRating={0}
                emptySymbol={<img height={22} src={EmptyStar} alt="Empty star" />}
                fullSymbol={<img height={22} src={FilledStar} alt="Filled star" />}
                readonly
              />
              <CardText className={`mt-50 font-small-3 project-text ${isEditable && 'fw-bolder'}`}>
                0 Projects | 0 reviews
              </CardText>
            </div>
          )}

          <div className="profile-completion mt-2">
            <CardText className="mb-25">{profilePercentageData?.profile_completed}%</CardText>
            <Progress
              style={{ height: '0.4rem', borderRadius: '6px' }}
              className={giveProgressBarColorClassName(profilePercentageData?.profile_completed)}
              value={profilePercentageData?.profile_completed}
            />
            <CardText className="font-small-3 mt-25">Profile Completion</CardText>
          </div>

          <section className="user-details mt-2">
            <CardTitle className="info-detail-title main mb-75">Details</CardTitle>
            {data?.educational_institute?.map((item, index) => (
              <div key={(item, index)} className="mb-50">
                <CardTitle className="m-0 uni-name">{item?.institution?.name}</CardTitle>
                <CardText className="font-small-3">{item?.education?.name}</CardText>
              </div>
            ))}

            {isClient && (
              <>
                <div className="d-flex mb-75">
                  <span className="info-key">Location:</span>
                  {data?.office_address?.city ? (
                    <CardText>
                      {data?.office_address?.city?.name}, {data?.office_address?.state?.name},
                      {data?.office_address?.country?.name}
                    </CardText>
                  ) : (
                    '-'
                  )}
                </div>
                <div className="d-flex mb-75">
                  <span className="info-key">Industry:</span>
                  <CardText>{data?.company_industry?.name || '-'} </CardText>
                </div>
              </>
            )}
            {isTalentView && (
              <div className="d-flex mb-75">
                <span className="info-key">Location:</span>
                {data?.current_residency?.city ? (
                  <CardText>
                    {data?.current_residency?.city?.name}, {data?.current_residency?.state?.name},
                    {data?.current_residency?.country?.name}
                  </CardText>
                ) : (
                  '-'
                )}
              </div>
            )}

            {isClient && (
              <BadgeGroup
                color="light-success-2"
                title="Project area of interest"
                data={data?.project_area_of_interest?.area?.name ? data?.project_area_of_interest?.area : []}
              />
            )}
            {isTeamView && (
              <BadgeGroup
                color="light-success-2"
                title="Project area of interest"
                data={data?.services?.name ? data?.services : []}
              />
            )}
            {isTalentView && (
              <>
                <BadgeGroup color="light-blue" title="Certificates" data={data?.expertise?.certificates} />
                <BadgeGroup color="light-blue" title="Skills" data={data?.expertise?.skills} />
                <BadgeGroup color="light-blue" title="Tools" data={data?.expertise?.tools} />
                <BadgeGroup
                  color="light-success-2"
                  title="Language"
                  data={unionBy(data?.languages_speak, data?.languages_read, data?.languages_write, 'name')}
                />
              </>
            )}
            {isTeamView && (
              <>
                <BadgeGroup color="light-blue" title="Skills" data={data?.skills} />
                <BadgeGroup color="light-blue" title="Tools" data={data?.tools} />
                <BadgeGroup color="light-blue" title="Language" data={data?.languages_supported} />
              </>
            )}
            <BadgeGroup
              color="light-success-2"
              title="Time zone"
              data={
                data?.availability?.timezone
                  ? [
                      {
                        name:
                          `${data?.availability?.timezone?.abbreviation}(${data?.availability?.timezone?.offset_name})` ||
                          '-',
                      },
                    ]
                  : []
              }
            />

            {!isTeamView && (
              <div className="social-links">
                <CardText className="Info-key mt-50 mb-50">Social Links</CardText>
                {data?.social_links?.length === 0 && (
                  <CardText className="Info-key font-small-3 mt-0">No links</CardText>
                )}

                {data?.social_links?.map((item, index) => {
                  if (item?.platform === 'linkedIn')
                    return (
                      <a href={item?.url} target="_blank" rel="noopener noreferrer">
                        <Avatar
                          color="light-primary"
                          icon={
                            <Linkedin fill={theme.activeNavPillText} stroke={theme.activeNavPillBackground} size={24} />
                          }
                          onClick={item?.url}
                          className="me-1 p-25 mb-1"
                          id={`tooltip-links-${index}`}
                        />
                        <UncontrolledTooltip target={`tooltip-links-${index}`}>{item?.platform}</UncontrolledTooltip>
                      </a>
                    );
                  if (item?.platform === 'twitter')
                    return (
                      <a href={item?.url} target="_blank" rel="noopener noreferrer">
                        <Avatar
                          color="light-primary"
                          icon={<img src={TwitterXIcon} alt="" width={20} height={20} />}
                          onClick={item?.url}
                          className="me-1 p-25 mb-1"
                          id={`tooltip-links-${index}`}
                        />
                        <UncontrolledTooltip target={`tooltip-links-${index}`}>{item?.platform}</UncontrolledTooltip>
                      </a>
                    );

                  if (item?.platform === 'github')
                    return (
                      <a href={item?.url} target="_blank" rel="noopener noreferrer">
                        <Avatar
                          color="light-primary"
                          icon={
                            <GitHub fill={theme.activeNavPillText} stroke={theme.activeNavPillBackground} size={24} />
                          }
                          onClick={item?.url}
                          className="me-1 p-25 mb-1"
                          id={`tooltip-links-${index}`}
                        />
                        <UncontrolledTooltip target={`tooltip-links-${index}`}>{item?.platform}</UncontrolledTooltip>
                      </a>
                    );
                  return (
                    <a key={item?.url} href={item?.url} target="_blank" rel="noopener noreferrer">
                      <Avatar
                        color="light-primary"
                        icon={<Link fill={theme.activeNavPillText} stroke={theme.activeNavPillBackground} size={24} />}
                        onClick={item?.url}
                        className="me-1 p-25 mb-1"
                        id={`tooltip-links-${index}`}
                      />
                      <UncontrolledTooltip target={`tooltip-links-${index}`}>{item?.platform}</UncontrolledTooltip>
                    </a>
                  );
                })}

                <Avatar
                  color="light-primary"
                  icon={<img src={DribbleIcon} alt="driblle-icon" />}
                  className="d-none me-1 p-25"
                />
                <Avatar
                  color="light-primary"
                  icon={<img src={BehanceIcon} alt="driblle-icon" />}
                  className=" d-none me-1 p-25"
                />
              </div>
            )}

            {isEditable && (
              <div className="d-flex gap-1 mt-3 justify-content-center">
                <Button className="w-50" color="primary" onClick={onEditClick}>
                  Edit
                </Button>
              </div>
            )}
            {!isEditable && !isTeamView && (
              // To be taken for team members
              <div className="">
                <div className="d-flex gap-1 mt-3 justify-content-center">
                  <Button className="w-50" outline color="primary">
                    Invite
                  </Button>
                  <Button className="w-50" color="primary" onClick={onMessageClick}>
                    Message
                  </Button>
                </div>
                <CardText className="report-text m-0 text-center mt-1 fw-bold">Report</CardText>
              </div>
            )}
            {isProjectDetailsView && (
              <div className="invited-box">
                <div className="d-flex gap-1 mt-3 justify-content-center">
                  <Button size="md" className="w-50" outline color="primary">
                    View Profile
                  </Button>
                  <Button size="md" className="w-50" color="primary" onClick={onMessageClick}>
                    Message
                  </Button>
                </div>
              </div>
            )}
            {isTeamView && !teamId && userData?.user_type === userTypes.talent && (
              <div className="d-flex gap-1 mt-3 justify-content-center">
                <Button className="w-50" color="primary" onClick={handleJoinTeam}>
                  Join Team
                </Button>
              </div>
            )}
          </section>
        </CardBody>
      </Card>
    </LeftSidebarProfileWrapper>
  );
};

LeftSidebarProfile.propTypes = {
  isEditable: PropTypes.bool,
  data: PropTypes.object,
  isClient: PropTypes.bool,
  isTalentView: PropTypes.bool,
  isTeamView: PropTypes.bool,
  isProjectDetailsView: PropTypes.bool,
  isInvited: PropTypes.bool,
};
LeftSidebarProfile.defaultProps = {
  isEditable: false,
  data: {},
  isClient: false,
  isTalentView: false,
  isTeamView: false,
  isProjectDetailsView: false,
  isInvited: false,
};

export default LeftSidebarProfile;
