/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
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
import { Download, GitHub, Heart, Link, Linkedin, UserCheck } from 'react-feather';
import { DownloadIconContainer, LeftSidebarProfileWrapper } from './style';
import BadgeGroup from '../../../@core/components/badge-group';
import theme from '../../../configs/themeVariables';
import { makeFavourite, removeFavourite } from '../../../redux/actions/profileActions';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import { getTeamId, giveProgressBarColorClassName, returnFormattedRating } from '../../../utility/Utils';
import { CustomBadge } from '../../styled';
import { clubStatus, userTypes } from '../../../utility/constants/Constant';
import TwitterXIcon from '../../../assets/images/logo/X-logo.svg';
import {
  getProfilePercentage,
  getTeamProfilePercentage,
  updateInvitation,
} from '../../../redux/actions/dashboardActions';
import { inviteTalents } from '../../../redux/actions/inviteTalent';
import { selectAuthUserData, selectUserData } from '../../../redux/selectors/authSelectors';
import SendInvitationModal from '../../modals/SendInvitationModal';
import AcceptRequestModal from '../../modals/AcceptRequestModal';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import { makeTeamMemberSuccess } from '../../../redux/reducers/profile';
import { getRequestStatusSuccess } from '../../../redux/reducers/inviteTalent';
import InvitationSentModal from '../../modals/InvitationSentModal';
import JoinTeamModal from '../../modals/JoinTeamModal';
import ReportUserModal from './ReportUserModal';
import SendClubInvitationModal from '../../modals/SendClubInvitationModal';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';

const LeftSidebarProfile = ({
  isTalentView,
  isInvited,
  isProjectDetailsView,
  isTeamView,
  isClient,
  data,
  isClubProfile,
}) => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const userData = useSelector(selectAuthUserData);
  const recentProjectsMetadata = useSelector((state) => state.currentProfile.userRecentProjectMetaData);
  const reviewMetadata = useSelector((state) => state.currentProfile.userReviewMetaData);

  const [modalInformationText, setModalInformationText] = useState('');
  const teamId = getTeamId('team_id');
  const [isFavourite, setIsFavourite] = useState(data?.is_favourite);
  const isEditable = userData?._id === param?.userId;
  const userDataSelector = useSelector(selectUserData);
  const profilePercentageData = useSelector(profilePercentage);
  const showProfilePercent = param?.userId === userDataSelector?._id;
  const inJoinTeamLoading = useSelector((state) => state.inviteTalent.inviteTalentsLoading);
  const requestStatusData = useSelector((state) => state.inviteTalent.getRequestStatus);
  const [selectedTalent, setSelectedTalent] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sendInviteModal, setSendInviteModal] = useState(null);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [accpetModal, setAccpetModal] = useState(false);
  const [invitationSentModal, setInvitationSentModal] = useState(null);
  const [openJoinTeamModal, setOpenJoinTeamModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const toggleInvitationSentModal = () => setInvitationSentModal(!invitationSentModal);
  const toggleReportModal = () => setReportModal(!reportModal);

  const onAccept = () => {
    const postData = {
      action: 'ACCEPT',
      request_id: requestStatusData._id,
    };
    setIsStatusUpdating(true);
    dispatch(
      updateInvitation({
        data: postData,
        onSuccess: () => {
          setIsStatusUpdating(false);
          setAccpetModal(false);
          dispatch(getRequestStatusSuccess(null));
          dispatch(makeTeamMemberSuccess());
        },
        onError: () => {
          setIsStatusUpdating(false);
        },
      }),
    );
  };
  const handleAcceptRequest = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModal(true);
      setModalInformationText('accept request');
    } else {
      setAccpetModal(true);
    }
  };

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const handleCancel = () => {
    setCompleteProfileModal(false);
    setAccpetModal(false);
  };

  const handleJoinModalCancel = () => {
    setCompleteProfileModal(false);
    setOpenJoinTeamModal(false);
  };

  const handleLike = () => {
    setIsFavourite(true);
    dispatch(makeFavourite(param?.userId, param?.userType.toUpperCase()));
  };
  const handleUnLike = () => {
    setIsFavourite(false);
    dispatch(removeFavourite(param?.userId));
  };

  const onEditClick = () => {
    if (data.team_type === userTypes.team) {
      navigate(`/create-team/profile-details`, {
        state: { isEditing: true },
      });
    } else if (data.team_type === userTypes.club && data.club_status === clubStatus.ACCEPTED) {
      navigate(`/create-club/account-details`, {
        state: { isEditing: true },
      });
    } else if (data.team_type === userTypes.club && data.club_status === clubStatus.IN_REVIEW) {
      ShowToastMessage(ERROR, 'Club is not verified yet');
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
    if (showProfilePercent) {
      if (isTalentView || isClient) {
        dispatch(getProfilePercentage());
      }
      if (isTeamView) {
        dispatch(getTeamProfilePercentage());
      }
    }
  }, []);

  const sendJoinTeamRequest = () => {
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
    const onSuccess = () => {
      setOpenJoinTeamModal(false);
    };
    dispatch(inviteTalents({ data: newPostData, onSuccess, isJoinRequest: true }));
  };

  const handleJoinTeam = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModal(true);
      setModalInformationText('join team');
    } else {
      setOpenJoinTeamModal(true);
    }
  };

  const toggleSendInviteModal = () => {
    setSendInviteModal(!sendInviteModal);
  };

  const handleInviteTalent = () => {
    setSelectedTalent([data]);
    setSendInviteModal(true);
  };

  const handleDownload = () => {
    const downloadLink = userData?.talent_info?.resume?.download_url;
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = 'filename';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <LeftSidebarProfileWrapper>
      {completeProfileModal && (
        <CompleteProfileModal
          modalInfoText={modalInformationText}
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
        />
      )}
      {accpetModal && (
        <AcceptRequestModal
          title={requestStatusData?.request_type}
          isLoading={isStatusUpdating}
          data={requestStatusData}
          onAccept={onAccept}
          modal={accpetModal}
          toggleModal={handleCancel}
        />
      )}
      {openJoinTeamModal && (
        <JoinTeamModal
          isLoading={inJoinTeamLoading}
          data={data}
          title="Join Team"
          toggleModal={handleJoinModalCancel}
          modal={openJoinTeamModal}
          onAccept={sendJoinTeamRequest}
        />
      )}
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
              (isFavourite ? (
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
                style={{ objectFit: 'cover' }}
              />
            )}

            {isTalentView && (
              <img
                src={data?.image_uri?.length > 0 ? data?.image_uri : avatar7}
                alt="user"
                width={112}
                height={120}
                style={{ objectFit: 'cover' }}
              />
            )}
            {isTeamView && (
              <img
                src={data?.team_logo?.length > 0 ? data?.team_logo : avatar7}
                alt="user"
                width={112}
                height={120}
                style={{ objectFit: 'cover' }}
              />
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

          <div className="projects-rating projects-rating-public">
            <Rating
              initialRating={returnFormattedRating(data?.rating)}
              emptySymbol={<img height={22} src={EmptyStar} alt="Empty star" />}
              fullSymbol={<img height={22} src={FilledStar} alt="Filled star" />}
              readonly
            />
            <CardText className={`mt-50 font-small-3 project-text ${isEditable && 'fw-bolder'}`}>
              {recentProjectsMetadata?.total_records || 0} Projects | {reviewMetadata?.total_records || 0} Reviews
            </CardText>
          </div>

          {showProfilePercent && (
            <div className="profile-completion mt-2">
              <CardText className="mb-25">{profilePercentageData?.profile_completed}%</CardText>
              <Progress
                style={{ height: '0.4rem', borderRadius: '6px' }}
                className={giveProgressBarColorClassName(profilePercentageData?.profile_completed)}
                value={profilePercentageData?.profile_completed}
              />
              <CardText className="font-small-3 mt-25">Profile Completion</CardText>
            </div>
          )}

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
              <>
                {userData?.talent_info?.resume?.file_name && (
                  <div onClick={handleDownload} className="d-flex my-1  align-items-center cursor-pointer">
                    <DownloadIconContainer>
                      <Download size={18} color={theme.activeNavPillText} />
                    </DownloadIconContainer>
                    <h6 className="mb-0 ms-50 text-primary ">Download resume</h6>
                  </div>
                )}

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
              </>
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
                <BadgeGroup
                  color="light-success-2"
                  title="Team Associations"
                  data={data?.team_associations}
                  isTeamAssociations
                />
              </>
            )}
            {isTeamView && (
              <>
                {data?.services && data?.services?.length !== 0 && (
                  <div className="d-flex mb-50 ">
                    <span className="info-key me-25">Services:</span>
                    <div className="d-flex flex-wrap">
                      {data.services.map((item, index) => (
                        <span key={item?.id} className="me-25">
                          {item?.name}
                          {index !== data.services.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data?.interests && data?.interests?.length !== 0 && (
                  <div className="d-flex mb-50 ">
                    <span className="info-key me-25">Interests:</span>
                    <div className="d-flex flex-wrap">
                      {data.interests.map((item, index) => (
                        <span key={item?.id} className="me-25">
                          {item?.name}
                          {index !== data.interests.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
            <div>
              {/* Sensitive code below, If any changes done please check with all personas in each user type profile */}
              <div className="d-flex gap-1 mt-3 justify-content-center">
                {requestStatusData && !isClubProfile && (
                  <span className="w-50">
                    {!isEditable && teamId && data?.user_type === userTypes.talent && (
                      <Button className="w-100" outline color="primary" onClick={handleAcceptRequest}>
                        Accept
                      </Button>
                    )}
                    {isTeamView && (
                      <Button className="w-100" outline color="primary" onClick={handleAcceptRequest}>
                        Accept
                      </Button>
                    )}
                  </span>
                )}

                {!requestStatusData &&
                  !isEditable &&
                  !data?.is_team_member &&
                  teamId &&
                  data?.user_type === userTypes.talent && (
                    <Button className="w-50" outline color="primary" onClick={handleInviteTalent}>
                      Invite
                    </Button>
                  )}
                {!requestStatusData &&
                  !data?.is_team_member &&
                  isTeamView &&
                  !teamId &&
                  userData?.user_type === userTypes.talent &&
                  !isClubProfile && (
                    <div className="w-50 d-flex gap-1 justify-content-center">
                      <Button
                        disabled={inJoinTeamLoading}
                        className="w-100"
                        color="primary"
                        outline
                        onClick={handleJoinTeam}
                      >
                        Join Team
                      </Button>
                    </div>
                  )}
                {!isEditable && param?.userType.toUpperCase() !== userTypes.team && (
                  <Button className="w-50" color="primary" onClick={onMessageClick}>
                    Message
                  </Button>
                )}
              </div>
              {(userDataSelector?.user_type === userTypes.client || userDataSelector?.user_type === userTypes.team) &&
                param?.userType.toUpperCase() === userTypes.talent && (
                  <div className="d-flex justify-content-center">
                    <Button color="flat-danger" className="mt-1" onClick={() => setReportModal(true)}>
                      Report
                    </Button>
                  </div>
                )}
            </div>
          </section>
        </CardBody>
      </Card>
      {sendInviteModal && userData?.team_type !== 'CLUB' && (
        <SendInvitationModal
          modal={sendInviteModal}
          toggleModal={toggleSendInviteModal}
          selectedTalents={selectedTalent}
          setInvitationSentModal={setInvitationSentModal}
          message={inputMessage}
          setMessage={setInputMessage}
          description="You are inviting the below to join your team"
        />
      )}

      {sendInviteModal && userData?.team_type === 'CLUB' && (
        <SendClubInvitationModal
          modal={sendInviteModal}
          toggleModal={toggleSendInviteModal}
          selectedTalents={selectedTalent}
          setSelectedTalents={setSelectedTalent}
          setInvitationSentModal={setInvitationSentModal}
          message={inputMessage}
          setMessage={setInputMessage}
          description="You are inviting the below to join your club"
        />
      )}

      {invitationSentModal && (
        <InvitationSentModal
          modal={invitationSentModal}
          toggleModal={toggleInvitationSentModal}
          selectedTalents={selectedTalent}
          message={inputMessage}
          toggleSendInvitationModal={toggleSendInviteModal}
          setSelectedTalents={setSelectedTalent}
          description={`You’ve sent a ${userData?.team_type === 'CLUB' ? 'club' : 'team'} member invitation`}
        />
      )}
      {reportModal && <ReportUserModal modal={reportModal} toggleModal={toggleReportModal} userDetails={data} />}
    </LeftSidebarProfileWrapper>
  );
};

LeftSidebarProfile.propTypes = {
  data: PropTypes.object,
  isClient: PropTypes.bool,
  isTalentView: PropTypes.bool,
  isTeamView: PropTypes.bool,
  isProjectDetailsView: PropTypes.bool,
  isInvited: PropTypes.bool,
  isClubProfile: PropTypes.bool,
};
LeftSidebarProfile.defaultProps = {
  data: {},
  isClient: false,
  isTalentView: false,
  isTeamView: false,
  isProjectDetailsView: false,
  isInvited: false,
  isClubProfile: false,
};

export default LeftSidebarProfile;
