import React from 'react';
import PropTypes from 'prop-types';
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

const isLike = false;
const LeftSidebarProfile = ({ isEditable }) => (
  <LeftSidebarProfileWrapper>
    <Card>
      <CardBody>
        {!isEditable &&
          (isLike ? (
            <Heart className="d-flex ms-auto heart" />
          ) : (
            <Heart className="d-flex ms-auto heart" fill={theme.red} stroke={theme.red} />
          ))}

        <div className="user-image">
          <img src={avatar7} alt="user" />
        </div>

        {isEditable ? (
          <div className="private">
            <CardText className="text-center user-name mb-50">Gertrude Barton</CardText>
            <Button size="sm" outline color="primary" className="d-flex m-auto outline-btn mt-2">
              Front-End Developer
            </Button>
          </div>
        ) : (
          <div className="public">
            <CardText className="text-center user-name mb-50 fw-300">Gertrude Barton</CardText>
            <Button size="sm" outline color="primary" className="d-flex m-auto outline-btn">
              Front-End Developer
            </Button>
          </div>
        )}

        <div className="projects-rating projects-rating-public">
          <Rating
            initialRating={4}
            emptySymbol={<img height={22} src={EmptyStar} alt="Empty star" />}
            fullSymbol={<img height={22} src={FilledStar} alt="Filled star" />}
            readonly
          />
          <CardText className={`mt-50 font-small-3 project-text ${isEditable && 'fw-bolder'}`}>
            56 Projects | 16 reviews
          </CardText>
        </div>
        <div className="profile-completion mt-2">
          <CardText className="mb-25">62%</CardText>
          <Progress style={{ height: '0.4rem', borderRadius: '6px' }} className="progress-bar-warning" value={62} />
          <CardText className="font-small-3 mt-25">Profile Completion</CardText>
        </div>
        <CardText className="text-center text-decoration-underline card-text me-25 mt-1 mb-1 text-primary">
          Update Profile
        </CardText>

        <section className="user-details mt-2">
          <CardTitle className="info-detail-title main mb-75">Details</CardTitle>
          <div className="mb-50">
            <CardTitle className="m-0 uni-name">Columbia Unviersity</CardTitle>
            <CardText className="font-small-3">MBA</CardText>
          </div>
          <div className="mb-50">
            <CardTitle className="m-0 uni-name">Columbia Unviersity</CardTitle>
            <CardText className="font-small-3">MBA</CardText>
          </div>
          <div className="mb-50">
            <CardTitle className="m-0 uni-name">Columbia Unviersity</CardTitle>
            <CardText className="font-small-3">MBA</CardText>
          </div>

          <div className="d-flex mb-75">
            <span className="info-key">Location:</span>
            <CardText>City, State, Country</CardText>
          </div>

          <BadgeGroup color="light-blue" title="Certificates" data={['CFED', 'React', 'CFED']} />
          <BadgeGroup color="light-blue" title="Skills" data={['CFED', 'React', 'CFED', 'CFED', 'React', 'CFED']} />

          <BadgeGroup
            color="light-blue"
            title="Tools"
            data={['HTML', 'JAVASCRIPT', 'ADOBE', 'REACT', 'CSS', 'REACT']}
          />

          <BadgeGroup color="light-success-2" title="Language" data={['CFED', 'React']} />
          <BadgeGroup color="light-success-2" title="Team association" data={['Polygon', 'Falcon']} />
          <BadgeGroup
            color="light-success-2"
            title="Available time zone"
            data={['IST (GMT+5:30)', 'IST (GMT+5:30)', 'IST (GMT+5:30)']}
          />

          <div className="social-links">
            <CardText className="Info-key mt-50">Social Links</CardText>
            <Avatar
              color="light-primary"
              icon={<Twitter fill={theme.activeNavPillText} stroke={theme.activeNavPillBackground} size={24} />}
              className="me-1 p-25"
            />
            <Avatar
              color="light-primary"
              icon={<Linkedin fill={theme.activeNavPillText} stroke={theme.activeNavPillBackground} size={24} />}
              className="me-1 p-25"
            />
            <Avatar color="light-primary" icon={<img src={DribbleIcon} alt="driblle-icon" />} className="me-1 p-25" />
            <Avatar color="light-primary" icon={<img src={BehanceIcon} alt="driblle-icon" />} className="me-1 p-25" />
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

LeftSidebarProfile.propTypes = {
  isEditable: PropTypes.bool,
};
LeftSidebarProfile.defaultProps = {
  isEditable: false,
};

export default LeftSidebarProfile;
