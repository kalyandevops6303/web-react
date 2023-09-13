/* eslint-disable react/prop-types */
import React from 'react';
import { CardText, CardTitle, Badge, Col, Card, CardBody } from 'reactstrap';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import hat from '@src/assets/images/hat.svg';
import { Heart } from 'react-feather';
import AvatarGroup from '@components/avatar-group';
import theme from '../../configs/themeVariables';
import BadgeGroup from '../../@core/components/badge-group';
import { ProjectCardWrap } from './style';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';

function TeamCard({ data }) {
  const avatarGroup = data?.team_members?.length
    ? data?.team_members?.map((worker) => ({
        title: `${worker?.first_name} ${worker?.last_name}`,
        img: worker?.image_uri?.length ? worker?.image_uri : defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

  return (
    <ProjectCardWrap>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column w-75">
              <CardTitle className="d-flex truncate-2 text-primary">{data?.name}</CardTitle>
              <CardText>{data?.introduction}</CardText>
              <AvatarGroup size="sm" className="ms-25 mb-50" data={avatarGroup?.slice(0, 3)} />
              <div className="d-flex flex-grow-1 mt-25">
                <RatingBadge number={Math.round(data?.rating ?? 0)} />
                <CardText className="ps-1 font-small-3 fw-300 rating-label">
                  {data?.client?.project_count ?? 0} Projects
                </CardText>
              </div>
            </div>

            <Col>
              <div className="d-flex align-items-center justify-content-end">
                {true && (
                  <Badge className="alma-mater ms-50 bg-white">
                    <img src={hat} alt="client-badge" width={20} height={20} />
                  </Badge>
                )}
                {data?.is_favorite ? (
                  <Heart
                    className="cursor-pointer d-flex ms-50 heart"
                    fill={theme.red}
                    stroke={theme.red}
                    onClick=""
                    size={18}
                  />
                ) : (
                  <Heart className="cursor-pointer d-flex  ms-50 heart" onClick="" size={18} />
                )}
              </div>
              <BadgeGroup title="Skills" data={data?.skills} color="light-blue" />
              <BadgeGroup title="Tools" data={data?.tools} color="light-blue" />
            </Col>
          </div>
        </CardBody>
      </Card>
    </ProjectCardWrap>
  );
}

export default TeamCard;
