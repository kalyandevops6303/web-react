/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { Badge, Card, CardBody, CardText, Spinner } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useSelector } from 'react-redux';
import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
import DateTime from '../../../lib/date-time';
import ProjectModalViews from './ProjectModalViews';

const ActiveProjectCardForTeam = ({ data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);

  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);

  const statusEnum = {
    OPEN: 'Open Listing',
    IN_REVIEW: 'In Review',
    ON_GOING: 'On Going',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
  };

  const viewProject = () => {
    // navigate(`/project-details/${data._id}/milestone`);
    setShowModal(true);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design">
        <CardBody>
          <CustomBadge>
            <Badge className={`${data?.status}`} color="badge">
              {statusEnum[data?.status]}
            </Badge>
          </CustomBadge>
          <p className="active-project-name mt-1 truncate-2" style={{ height: '40px' }}>
            {data?.name}
          </p>
          <div className="d-flex">
            <div className="me-3">
              <div className="client-badge px-1 mb-75">
                <p className="mb-0">Client</p>
              </div>
              <p className="active-project-team-name mb-50">{`${data?.client_info?.first_name} ${data?.client_info?.last_name}`}</p>
              <div className="mb-1">
                <span className="d-flex avatars">
                  <AvatarGroup
                    size="sm"
                    className="mr-4"
                    data={[
                      {
                        title: `${data?.client_info?.first_name} ${data?.client_info?.last_name} ` || 'user',
                        img: data?.client_info.image_uri || defaultAvatar,
                        placement: 'bottom',
                        imgHeight: 33,
                        imgWidth: 33,
                        tooltipId: `tooltip_${data?._id}_${data?.current_milestone?.name.replace(/\s+/g, '-')}`,
                      },
                    ]}
                  />
                </span>
              </div>
            </div>
            <div>
              <div className="team-badge px-1 mb-75">
                <p className="mb-0">Team</p>
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
                          title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                          img: worker.image_uri || defaultAvatar,
                          placement: 'bottom',
                          imgHeight: 33,
                          imgWidth: 33,
                          tooltipId: `tooltip_${data?._id}_${worker?.first_name.replace(
                            /\s+/g,
                            '-',
                          )}_${data?.current_milestone?.name.replace(/\s+/g, '-')}`,
                        })),
                      ]}
                    />
                  </span>
                ) : (
                  <AvatarGroup
                    size="sm"
                    data={[
                      ...data?.worker_details?.map((worker) => ({
                        title: `${worker?.first_name} ${worker?.last_name} ` || 'user',
                        img: worker.image_uri || defaultAvatar,
                        placement: 'bottom',
                        imgHeight: 33,
                        imgWidth: 33,
                        tooltipId: `tooltip_${data?._id}_${worker?.first_name.replace(
                          /\s+/g,
                          '-',
                        )}_${data?.current_milestone?.name.replace(/\s+/g, '-')}`,
                      })),
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
          <p className="active-project-simple-heading">Milestone {data?.current_milestone?.seq}</p>
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper justify-content-between w-100">
              <div className="design-planning">
                <CardText className="mb-25">Due Date</CardText>
                <h6 className="mb-0">{`${
                  DateTime.fromMillis(data?.current_milestone?.due_date).toFormat('MMM dd, yy') || '-'
                }`}</h6>
              </div>
              <p className="active-project-milestone-name">{data?.current_milestone?.name}</p>
            </div>
          </div>
          <div
            onClick={viewProject}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-50"
          >
            {isModalLoading && projectModalId === data?._id ? <Spinner size="sm" /> : 'View Project'}
          </div>
        </CardBody>
      </Card>
      {(showModal || switchModal) && (
        <ProjectModalViews
          isActiveProject
          project_id={data?._id}
          showModal={showModal}
          toggleModal={() => setShowModal(!showModal)}
          switchModal={switchModal}
          setSwitchModal={setSwitchModal}
        />
      )}
    </ProjectWrapper>
  );
};

export default ActiveProjectCardForTeam;

ActiveProjectCardForTeam.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

ActiveProjectCardForTeam.defaultProps = {
  data: {},
  className: '',
};
