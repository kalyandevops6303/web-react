/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Card, CardBody, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectWrapper } from './style';
import ProjectModalViews from './ProjectModalViews';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import { convertUnixTimestampToDate, roundOfAmount } from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';

const UpcomingProjectCard = ({ accordionName, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);

  const dispatch = useDispatch();
  const savedUserData = useSelector(selectSavedUserData);
  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);

  const viewProject = () => {
    // navigate(`/project-details/${data._id}/bid`);
    setShowModal(true);
  };

  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data._id,
      },
      type: accordionName,
    };
    if (data?.is_read === false) {
      dispatch(updateCardStatus({ id: data?._id, data: postData, type: 'upcomingProjectsForClient' }));
    }
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.is_read && <NewTag />}
        <CardBody>
          <p className="active-project-name truncate-2 mt-50" style={{ height: '40px' }}>
            {data?.name}
          </p>
          <div className="team-badge px-1">
            <p className="mb-25">Team</p>
          </div>
          <p className="active-project-team-name">
            {data?.bid_by ? ('name' in data.bid_by ? data.bid_by.name : `${data.bid_by.first_name} ${data.bid_by.last_name}`) : ''}
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
          <div className="bottom-detail d-flex mt-1">
            <div className="design-planning-wrapper">
              <div className="design-planning">
                <p className="mb-25 details-box-title">Start Date</p>
                <p className="mb-0 details-box">
                  {`${
                    convertUnixTimestampToDate(data?.start_date, savedUserData?.availability?.timezone?.name) || '-'
                  }`}
                </p>
              </div>
              <div className="design-planning">
                <p className="mb-25 details-box-title">Amount</p>
                <p className="mb-0 details-box">${roundOfAmount(data?.amount)}</p>
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
          cardData={data}
          onUpdateCard={updateCard}
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

export default UpcomingProjectCard;

UpcomingProjectCard.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
  accordionName: Proptypes.string,
};

UpcomingProjectCard.defaultProps = {
  data: {},
  className: '',
  accordionName: '',
};
