/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { unionBy, isEmpty } from 'lodash';
import { Badge, Button, Card, CardBody, CardText, CardTitle, Progress, Spinner, UncontrolledTooltip } from 'reactstrap';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import DribbleIcon from '@src/assets/images/dribble.png';
import BehanceIcon from '@src/assets/images/behance.png';
import InboxIcon from '@src/assets/images/inboxIcon.svg';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import Rating from 'react-rating';
import { Download, GitHub, Heart, Link, Linkedin, UserCheck } from 'react-feather';
import { ActionButtonWrapper, DownloadIconContainer, LeftSidebarProfileWrapper } from './style';
import BadgeGroup from '../../../@core/components/badge-group';
import theme from '../../../configs/themeVariables';
import { makeFavourite, removeFavourite } from '../../../redux/actions/profileActions';
import { downloadUrlLoading, profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import { downloadFile, giveProgressBarColorClassName, returnFormattedRating } from '../../../utility/Utils';
import { CustomBadge } from '../../styled';
import { clubStatus, userProfileEdit, userTypes } from '../../../utility/constants/Constant';
import TwitterXIcon from '../../../assets/images/logo/X-logo.svg';
import { getDownloadUrl } from '../../../redux/actions/dashboardActions';
import { selectAuthUserData, selectUserData } from '../../../redux/selectors/authSelectors';
// import ReportUserModal from './ReportUserModal';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';
import DelegateNameCard from '../../cards/DelegateNameCard';
import { publicTeamMembers } from '../../../redux/selectors/profileSelectors';
import ReportModal from '../../modals/ReportModal';
import FeedbackForCustomerSupportModal from '../../modals/CustomerSupportFeedbackModal';

const LeftSidebarProfile = ({ isTalentView, isInvited, isProjectDetailsView, isTeamView, isClient, data }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();
  const userData = useSelector(selectAuthUserData);
  const isClubAdmin = useSelector((state) => state.inviteTalent.isClubAdmin);
  const favUnfavLoading = useSelector((state) => state.currentProfile.favUnfavLoading);
  const [isFavourite, setIsFavourite] = useState(data?.is_favourite);
  const [successReportModal, setSuccessReportModal] = useState(false);
  const isEditable = userData?._id === param?.userId;
  const userDataSelector = useSelector(selectUserData);
  const profilePercentageData = useSelector(profilePercentage);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
  const publicTeamMembersData = useSelector(publicTeamMembers);
  const showProfilePercent = param?.userId === userDataSelector?._id;
  const [reportModal, setReportModal] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const toggleReportModal = () => setReportModal(!reportModal);

  // It is used to check if the user is a member of the team or not, if yes then it will disable the report button
  useEffect(() => {
    if (publicTeamMembersData?.data) {
      const memberConfirm = publicTeamMembersData.data.some((member) => member?.user_id === userDataSelector?._id);
      setIsMember(memberConfirm);
    }
  }, [publicTeamMembersData]);

  const handleLike = () => {
    setIsFavourite(true);
    dispatch(makeFavourite(param?.userId, param?.userType.toUpperCase()));
  };
  const handleUnLike = () => {
    setIsFavourite(false);
    dispatch(removeFavourite(param?.userId));
  };

  const onEditClick = () => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    if (data.team_type === userTypes.team) {
      navigate(`/${userProfileEdit.team}/profile-details`);
    } else if (data.team_type === userTypes.club && data.club_status === clubStatus.ACCEPTED) {
      if (isClubAdmin) {
        navigate(`/${userProfileEdit.club}/account-details`);
      } else {
        ShowToastMessage(ERROR, 'Only an admin can edit the club profile');
      }
    } else if (data.team_type === userTypes.club && data.club_status === clubStatus.IN_REVIEW) {
      ShowToastMessage(ERROR, 'Club is not verified yet');
    } else {
      navigate(`/${data.user_type.toLowerCase()}-profile-edit/account-details`);
    }
  };

  const onMessageClick = () => {
    navigate(`/chat`, {
      state: { targetId: param?.userId },
    });
  };

  const onDownloadResumeUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
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
              (isFavourite ? (
                <Heart
                  className="cursor-pointer d-flex ms-auto heart"
                  fill={theme.red}
                  stroke={theme.red}
                  onClick={favUnfavLoading ? null : handleUnLike}
                />
              ) : (
                <Heart className="cursor-pointer d-flex ms-auto heart" onClick={favUnfavLoading ? null : handleLike} />
              ))}
          </div>
          <div className="user-image">
            {isClient && (
              <img
                src={data?.company_logo?.length > 0 ? data?.company_logo : defaultAvatar}
                alt="user"
                width={112}
                height={120}
                style={{ objectFit: 'cover' }}
              />
            )}

            {isTalentView && (
              <img
                src={data?.image_uri?.length > 0 ? data?.image_uri : defaultAvatar}
                alt="user"
                width={112}
                height={120}
                style={{ objectFit: 'cover' }}
              />
            )}
            {isTeamView && (
              <img
                src={data?.team_logo?.length > 0 ? data?.team_logo : defaultAvatar}
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
            <div className="public mt-50 mb-1">
              <CardText className="text-center user-name fw-bold mb-1">{`${
                data?.company_name || 'Company name'
              }`}</CardText>
              <div className="d-flex align-items-center justify-content-center">
                <Avatar
                  img={data?.image_uri || defaultAvatar}
                  imgHeight="44"
                  imgWidth="44"
                  className="me-50 user-pic"
                />
                <div className="mt-25 mb-25">
                  <p className="fw-bold m-0 user-name client-name">
                    {data?.first_name} {data?.last_name}
                  </p>
                  <p className="m-0 line-height-20 client-title">{data?.title}</p>
                </div>
              </div>
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
              emptySymbol={<img height={20} src={EmptyStar} alt="Empty star" />}
              fullSymbol={<img height={20} src={FilledStar} alt="Filled star" />}
              readonly
            />
            <CardText className="mt-50 font-small-3">
              {data?.projects_worked_on_count || 0} Project(s)<span className="ms-50 me-25 fw-300">|</span>
              {data?.total_reviews || 0} Review(s)
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
          {!isEmpty(data.client_delegate) && (
            <section className="user-details mt-2">
              <CardTitle className="info-detail-title main mb-75">Client Delegate</CardTitle>
              <DelegateNameCard
                img={data.client_delegate.image_uri}
                userName={`${data.client_delegate.first_name} ${data.client_delegate.last_name}`}
                icon={InboxIcon}
              />
            </section>
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
                {data?.resume?.file_name && (
                  <div
                    onClick={() =>
                      dispatch(
                        getDownloadUrl({
                          fileKey: data?.resume?.file_key,
                          onSuccess: onDownloadResumeUrlSuccess,
                          fileName: `${data?.first_name} ${data?.last_name}`,
                        }),
                      )
                    }
                    className="d-flex my-1 align-items-center cursor-pointer"
                  >
                    {downloadUrlIsLoading ? (
                      <div className="d-flex align-items-center justify-content-center w-100">
                        <Spinner color="primary" />
                      </div>
                    ) : (
                      <>
                        <DownloadIconContainer>
                          <Download size={18} color={theme.activeNavPillText} />
                        </DownloadIconContainer>
                        <h6 className="mb-0 ms-50 text-primary ">Download resume</h6>
                      </>
                    )}
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
                <Button className="ps-3 pe-3" color="primary" onClick={onEditClick}>
                  Edit
                </Button>
              </div>
            )}
            <div className="d-flex gap-2 justify-content-center align-items-center flex-wrap">
              {(userDataSelector?.user_type === userTypes.client ||
                userDataSelector?.user_type === userTypes.team ||
                userDataSelector?.user_type === userTypes.talent) &&
                // param?.userType.toUpperCase() === userTypes.talent &&
                (((param?.userType.toUpperCase() === userTypes.team ||
                  param?.userType.toUpperCase() === userTypes.club) &&
                  !isMember) ||
                  param?.userType?.toUpperCase() === userTypes.talent ||
                  param?.userType?.toUpperCase() === userTypes.client) && (
                  <div className="d-flex justify-content-center">
                    <Button color="danger" onClick={() => setReportModal(true)}>
                      Report
                    </Button>
                  </div>
                )}
              <ActionButtonWrapper>
                <div className="d-flex gap-1  justify-content-center flex-wrap">
                  {!isEditable && param?.userType.toUpperCase() !== userTypes.team && (
                    <Button className="w-100" color="primary" onClick={onMessageClick}>
                      Message
                    </Button>
                  )}
                </div>
              </ActionButtonWrapper>
            </div>
          </section>
        </CardBody>
      </Card>
      {!isEmpty(data.delegates) && (
        <Card style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <CardBody>
            <div className="d-flex gap-50">
              <CardTitle>Other Delegate</CardTitle>
              <CardText className="fw-light font-small-2 mt-25">({data.delegates?.length} Members)</CardText>
            </div>
            <div className="d-flex flex-wrap gap-50">
              {data.delegates.map((delegate) => (
                <DelegateNameCard
                  key={delegate.id}
                  img={delegate.image_uri}
                  userName={`${delegate.first_name} ${delegate.last_name}`}
                  userType={delegate.userType}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      )}
      {/* {reportModal && <ReportUserModal modal={reportModal} toggleModal={toggleReportModal} userDetails={data} />}  */}

      {reportModal && (
        <ReportModal
          onSuccess={() => {
            setReportModal(false);
            setSuccessReportModal(true);
          }}
          modal={reportModal}
          toggleModal={toggleReportModal}
          reportTargetId={data?._id}
          reportTargetName={
            // param?.userType.toUpperCase() === (userTypes?.team || userTypes?.club) ? data?.name : data?.details?.name
            data?.name || data?.company_name || data?.details?.name
          }
          reportTargetImage={data?.company_logo || data?.team_logo}
          reportTargetDetails={`${data?.created_by?.first_name || data?.first_name} ${
            data?.created_by?.last_name || data?.last_name
          }`}
          entityType={
            param?.userType.toUpperCase() === userTypes.team
              ? 'TEAM'
              : param?.userType.toUpperCase() === userTypes.talent
              ? 'TALENT'
              : 'CLIENT'
          }
        />
      )}

      {successReportModal && (
        <FeedbackForCustomerSupportModal
          modal={successReportModal}
          toggleModal={() => setSuccessReportModal(false)}
          modalHeading="Thanks for your feedback !"
          modalText="Your feedback has reached our team. We’ll be working towards providing you the best possible experience."
        />
      )}
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
};
LeftSidebarProfile.defaultProps = {
  data: {},
  isClient: false,
  isTalentView: false,
  isTeamView: false,
  isProjectDetailsView: false,
  isInvited: false,
};

export default LeftSidebarProfile;
