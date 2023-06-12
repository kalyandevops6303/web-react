import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Progress } from 'reactstrap';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import DribbleIcon from '@src/assets/images/dribble.png';
import BehanceIcon from '@src/assets/images/behance.png';

import Avatar from '@components/avatar';

import Rating from 'react-rating';
import { Heart, Linkedin, Twitter } from 'react-feather';
import { LeftSidebarProfileWrapper } from './style';
import BadgeGroup from '../../../@core/components/badge-group';
import theme from '../../../configs/themeVariables';
import { makeFavourite, removeFavourite } from '../../../redux/actions/profileActions';

const LeftSidebarProfile = ({ isClient, data, isEditable }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const handleLike = () => {
    dispatch(makeFavourite(param?.userId, param?.userType.toUpperCase()));
  };
  const handleUnLike = () => {
    dispatch(removeFavourite(param?.userId));
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
            <img src={avatar7} alt="user" />
          </div>

          {isEditable && !isClient && (
            <div className="private">
              <CardText className="text-center user-name mb-50">{`${data?.first_name || '-'} ${
                data?.last_name || '-'
              }`}</CardText>
              <Button size="sm" outline color="primary" className="d-flex m-auto outline-btn mt-2">
                {data?.role?.name || '-'}
              </Button>
            </div>
          )}
          {!isEditable && !isClient && (
            <div className="public">
              <CardText className="text-center user-name mb-50 fw-300">{`${data?.first_name} ${data?.last_name}`}</CardText>
              <Button size="sm" outline color="primary" className="d-flex m-auto outline-btn">
                {data?.role?.name || '-'}
              </Button>
            </div>
          )}
          {isClient && (
            <div className="public">
              <CardText className="text-center user-name mb-25 fw-300">{`${data?.company_name || '-'}`}</CardText>
              <CardText className="text-center font-small-4 user-name mb-50 fw-300">{`${data?.first_name || '-'} ${
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
          {isEditable && !isClient && (
            <>
              <div className="profile-completion mt-2">
                <CardText className="mb-25">62%</CardText>
                <Progress
                  style={{ height: '0.4rem', borderRadius: '6px' }}
                  className="progress-bar-warning"
                  value={62}
                />
                <CardText className="font-small-3 mt-25">Profile Completion</CardText>
              </div>
              <CardText className="text-center text-decoration-underline card-text me-25 mt-1 mb-1 text-primary">
                Update Profile
              </CardText>
            </>
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
                  <CardText>
                    {data?.office_address?.city?.name}, {data?.office_address?.state?.name},{' '}
                    {data?.office_address?.country?.name}
                  </CardText>
                </div>
                <div className="d-flex mb-75">
                  <span className="info-key">Industry:</span>
                  <CardText>{data?.company_industry?.name || '-'} </CardText>
                </div>
              </>
            ) : (
              <div className="d-flex mb-75">
                <span className="info-key">Location:</span>
                <CardText>
                  {data?.current_residency?.city?.name}, {data?.current_residency?.state?.name},
                  {data?.current_residency?.country?.name}
                </CardText>
              </div>
            )}

            {isClient ? (
              <BadgeGroup
                color="light-success-2"
                title="Project area of interest"
                data={data?.project_area_of_interest?.skills}
              />
            ) : (
              <>
                <BadgeGroup color="light-blue" title="Certificates" data={data?.expertise?.certificates} />
                <BadgeGroup color="light-blue" title="Skills" data={data?.expertise?.skills} />
                <BadgeGroup color="light-blue" title="Tools" data={data?.expertise?.tools} />
                <BadgeGroup color="light-success-2" title="Language" data={data?.languages_speak} />
              </>
            )}
            <BadgeGroup
              color="light-success-2"
              title="Available time zone"
              data={[
                {
                  name:
                    `${data?.availability?.timezone?.abbreviation}(
                      ${data?.availability?.timezone?.offset_name})` || '-',
                },
              ]}
            />

            <div className="social-links">
              <CardText className="Info-key mt-50">Social Links</CardText>
              {data?.social_links?.length === 0 && <CardText className="Info-key font-small-3 mt-0">No links</CardText>}
              {data?.social_links?.map((item) => {
                if (item?.platform === 'linkedIn')
                  return (
                    <a href={item?.url} target="_blank" rel="noopener noreferrer">
                      <Avatar
                        color="light-primary"
                        icon={
                          <Linkedin fill={theme.activeNavPillText} stroke={theme.activeNavPillBackground} size={24} />
                        }
                        onClick={item?.url}
                        className="me-1 p-25"
                      />
                    </a>
                  );
                if (item?.platform === 'twitter')
                  return (
                    <a href={item?.url} target="_blank" rel="noopener noreferrer">
                      <Avatar
                        color="light-primary"
                        icon={
                          <Twitter fill={theme.activeNavPillText} stroke={theme.activeNavPillBackground} size={24} />
                        }
                        onClick={item?.url}
                        className="me-1 p-25"
                      />
                    </a>
                  );
                return false;
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
                <Button className="w-50" color="primary">
                  Edit
                </Button>
              </div>
            ) : (
              <>
                <div className="d-flex gap-1 mt-3">
                  <Button className="w-100" outline color="primary">
                    Invite
                  </Button>
                  <Button className="w-100" color="primary">
                    Message
                  </Button>
                </div>
                <CardText className="report-text m-0 text-center mt-1 fw-bold">Report</CardText>
              </>
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
