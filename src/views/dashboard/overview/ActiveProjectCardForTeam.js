/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { Badge, Card, CardBody, CardText, Spinner } from 'reactstrap';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectWrapper } from './style';
import { CustomBadge } from '../../styled';
import DateTime from '../../../lib/date-time';
import ProjectModalViews from './ProjectModalViews';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';

const ActiveProjectCardForTeam = ({ accordionName, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);
  const dispatch = useDispatch();

  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);

  const statusEnum = {
    OPEN: 'Open Listing',
    IN_REVIEW: 'In Review',
    ON_GOING: 'On Going',
    ACTIVE: 'Active',
    TERMINATED: 'Terminated',
    CLOSED: 'Closed',
    LISTING_EXPIRED: 'Listing Expired',
  };

  const viewProject = () => {
    // navigate(`/project-details/${data._id}/milestone`);
    setShowModal(true);
  };

  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data._id,
      },
      type: accordionName,
    };
    dispatch(updateCardStatus({ id: data?._id, data: postData, type: 'activeProjectsForTeam' }));
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.is_read && <NewTag />}
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
                        user_type: userTypes.client,
                        user_id: data?.client_info?.user_id,
                        title: `${data?.client_info?.first_name} ${data?.client_info?.last_name} ` || 'user',
                        img: data?.client_info.image_uri || defaultAvatar,
                        placement: 'bottom',
                        imgHeight: 33,
                        imgWidth: 33,
                        tooltipId: `tooltip-${data?.client_info?.first_name?.replace(
                          /\s+/g,
                          '-',
                        )}-${data?.client_info?.last_name?.replace(/\s+/g, '-')}`,
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
          cardData={data}
          onUpdateCard={updateCard}
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
  accordionName: Proptypes.string,
};

ActiveProjectCardForTeam.defaultProps = {
  data: {},
  className: '',
  accordionName: '',
};
