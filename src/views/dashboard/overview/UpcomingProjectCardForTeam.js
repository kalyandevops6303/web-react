/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardText, Spinner } from 'reactstrap';
import { ProjectWrapper } from './style';
import DateTime from '../../../lib/date-time';
import ProjectModalViews from './ProjectModalViews';

const UpcomingProjectCardForTeam = ({ data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);

  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);

  const viewProject = () => {
    // navigate(`/project-details/${data._id}/bid`);
    setShowModal(true);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design">
        <CardBody>
          <p className="active-project-name truncate-2" style={{ height: '40px' }}>
            {data?.name}
          </p>
          <div className="d-flex justify-content-between">
            <div className="">
              <div className="client-badge px-1 mb-75">
                <p className="mb-0">Client</p>
              </div>
              <p className="active-project-team-name mb-50 truncate-1">{`${data?.client_info?.first_name} ${data?.client_info?.last_name}`}</p>
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
              <p className="active-project-team-name mb-50 truncate-1">
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
                      })),
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper justify-content-between w-100">
              <div className="design-planning">
                <CardText className="mb-25">Start Date</CardText>
                <h6 className="mb-0">{`${DateTime.fromMillis(data?.start_date).toFormat('MMM dd, yy') || '-'}`}</h6>
              </div>
              <div className="design-planning">
                <CardText className="mb-25">Amount</CardText>
                <h6 className="mb-0">${data?.amount}</h6>
              </div>
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
          isUpcomingProject
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

export default UpcomingProjectCardForTeam;

UpcomingProjectCardForTeam.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

UpcomingProjectCardForTeam.defaultProps = {
  data: {},
  className: '',
};
