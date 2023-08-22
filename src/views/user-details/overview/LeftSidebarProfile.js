  import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { unionBy } from 'lodash';
import { Button, Card, CardBody, CardText, CardTitle, Progress, UncontrolledTooltip } from 'reactstrap';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import DribbleIcon from '@src/assets/images/dribble.png';
import BehanceIcon from '@src/assets/images/behance.png';

import Avatar from '@components/avatar';

import Rating from 'react-rating';
import { GitHub, Heart, Link, Linkedin} from 'react-feather';
import { LeftSidebarProfileWrapper } from './style';
import BadgeGroup from '../../../@core/components/badge-group';
import theme from '../../../configs/themeVariables';
import { makeFavourite, removeFavourite } from '../../../redux/actions/profileActions';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import { giveProgressBarColorClassName } from '../../../utility/Utils';

import TwitterXIcon from "../../../assets/images/logo/X-logo.svg";

const LeftSidebarProfile = ({ isClient, data, isEditable }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const handleLike = () => {
    dispatch(makeFavourite(param?.userId, param?.userType.toUpperCase()));
  };
  const handleUnLike = () => {
    dispatch(removeFavourite(param?.userId));
  };

  const profilePercentageData = useSelector(profilePercentage);

  const onEditClick = () => {
    navigate(`/${data.user_type.toLowerCase()}-onboarding/account-details`, {
      state: { isEditing: true },
    });
  };

  return (
    <LeftSidebarProfileWrapper>
      <Card>
        <CardBody>
          {!isEditable &&
            (data?.is_favourited ? (
              <Heart className="d-flex ms-auto heart" fill={theme.red} stroke={theme.red} onClick={handleUnLike} />
            ) : (
              <Heart className="d-flex ms-auto heart" onClick={handleLike} />
            ))}

          <div className="user-image">
            {isClient ? (
              <img
                src={data?.company_logo?.length > 0 ? data?.company_logo : avatar7}
                alt="user"
                width={112}
                height={120}
              />
            ) : (
              <img src={data?.image_uri?.length > 0 ? data?.image_uri : avatar7} alt="user" width={112} height={120} />
            )}
          </div>

          {isEditable && !isClient && (
            <div className="private">
              <CardText className="text-center user-name mb-50">{`${data?.first_name || '-'} ${
                data?.last_name || '-'
              }`}</CardText>

              <CardText className="text-center mb-50 fw-bold">{`${data?.role?.name || ''}`}</CardText>
            </div>
          )}
          {!isEditable && !isClient && (
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
          {isEditable && (
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

            {isClient ? (
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
            ) : (
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

            {isClient ? (
              <BadgeGroup
                color="light-success-2"
                title="Project area of interest"
                data={data?.project_area_of_interest?.area?.name ? data?.project_area_of_interest?.area : []}
              />
            ) : (
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

            <div className="social-links">
              <CardText className="Info-key mt-50 mb-50">Social Links</CardText>
              {data?.social_links?.length === 0 && <CardText className="Info-key font-small-3 mt-0">No links</CardText>}

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
                        icon={
                          <img src={TwitterXIcon} alt='' width={20} height={20} />
                        }
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

            {isEditable ? (
              <div className="d-flex gap-1 mt-3 justify-content-center">
                <Button className="w-50" color="primary" onClick={onEditClick}>
                  Edit
                </Button>
              </div>
            ) : (
              // To be taken for team memebers
              <div className="d-none">
                <div className="d-flex gap-1 mt-3 justify-content-center">
                  <Button className="w-50" outline color="primary">
                    Invite
                  </Button>
                  <Button className="w-50" color="primary">
                    Message
                  </Button>
                </div>
                <CardText className="report-text m-0 text-center mt-1 fw-bold">Report</CardText>
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
};
LeftSidebarProfile.defaultProps = {
  isEditable: false,
  data: {},
  isClient: false,
};

export default LeftSidebarProfile;
