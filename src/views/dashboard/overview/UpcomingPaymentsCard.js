/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Proptypes from 'prop-types';
import { Badge, Card, CardBody, CardText } from 'reactstrap';

import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import DateTime from '../../../lib/date-time';
import SwitchConfirmModal from '../../modals/SwitchConfirm';

import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';

const UpcomingPaymentsCard = ({ data, className }) => {
  const navigate = useNavigate();
  const [openSwitchModal, setOpenSwitchModal] = useState(false);

  const handleViewDetails = (transactionData) => {
    if (data?.switch_team_id?.length > 0) {
      setOpenSwitchModal(true);
    } else {
      navigate(`/project-details/${transactionData?._id}/payment`);
    }
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        <NewTag />
        <CardBody>
          {data?.payment_status?.length > 0 ? (
            <CustomBadge>
              <Badge className="status" color="badge">
                status
              </Badge>
            </CustomBadge>
          ) : null}
          <p className="active-project-name mt-1 truncate-2" style={{ height: '40px' }}>
            {data?.name}
          </p>
          <div className={`${'name' in data?.bid_by ? 'team-badge' : 'client-badge'} px-1 mb-75`}>
            <p className="mb-0">{'name' in data?.bid_by ? 'Team' : 'Talent'}</p>
          </div>
          <p className="active-project-team-name mb-50">
            {'name' in data?.bid_by ? data?.bid_by?.name : `${data?.bid_by?.first_name} ${data?.bid_by?.last_name}`}
          </p>
          <div className="mb-1">
            {data?.worker_details.length > 3 ? (
              <span className="d-flex avatars">
                <AvatarGroup
                  totalCount={data?.team_members_count || data?.workers_count}
                  size="sm"
                  className="mr-4"
                  data={[
                    ...data?.worker_details?.slice(0, 3)?.map((worker) => ({
                      user_type: userTypes.talent,
                      user_id: worker?.user_id,
                      title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                      img: worker.image_uri || defaultAvatar,
                      placement: 'bottom',
                      imgHeight: 33,
                      imgWidth: 33,
                      tooltipId: `tooltip-${worker?.first_name?.replace(/\s+/g, '-')}-${worker?.last_name?.replace(
                        /\s+/g,
                        '-',
                      )}`,
                    })),
                  ]}
                />
              </span>
            ) : (
              <AvatarGroup
                size="sm"
                data={[
                  ...data?.worker_details?.map((worker) => ({
                    user_type: userTypes.talent,
                    user_id: worker?.user_id,
                    title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                    img: worker.image_uri || defaultAvatar,
                    placement: 'bottom',
                    imgHeight: 33,
                    imgWidth: 33,
                    tooltipId: `tooltip-${worker?.first_name?.replace(/\s+/g, '-')}-${worker?.last_name?.replace(
                      /\s+/g,
                      '-',
                    )}`,
                  })),
                ]}
              />
            )}
          </div>
          <p className="active-project-simple-heading">Milestone Payment </p>
          <div className="d-flex gap-2">
            <div className="bottom-detail d-flex mt-1">
              <div className="design-planning-wrapper">
                <div className="design-planning">
                  <CardText className="mb-25">Due Date</CardText>
                  <h6 className="mb-0">{`${
                    DateTime.fromMillis(data?.project_start_date).toFormat('MMM dd, yy') || '-'
                  }`}</h6>
                </div>
              </div>
            </div>
            <div className="bottom-detail d-flex mt-1">
              <div className="design-planning-wrapper">
                <div className="design-planning">
                  <CardText className="mb-25">Payment Due</CardText>
                  <h6 className="mb-0">${data?.amount}</h6>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleViewDetails(data)}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-50"
          >
            View Details
          </div>
        </CardBody>
      </Card>
      {openSwitchModal && (
        <SwitchConfirmModal
          entity={data?.switch_team_id ? 'TEAM' : 'TALENT'}
          navigateTo={`/project-details/${data?._id}/payment`}
          switchTeamId={data?.switch_team_id}
          modal={openSwitchModal}
          toggleModal={() => setOpenSwitchModal(!openSwitchModal)}
        />
      )}
    </ProjectWrapper>
  );
};

export default UpcomingPaymentsCard;

UpcomingPaymentsCard.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

UpcomingPaymentsCard.defaultProps = {
  data: {},
  className: '',
};
