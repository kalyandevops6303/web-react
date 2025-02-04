/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import AvatarGroup from '@components/avatar-group';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Card, CardBody, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ProjectWrapper } from './style';
import ProjectModalViews from './ProjectModalViews';
import { userTypes } from '../../../utility/constants/Constant';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import { convertUnixTimestampToDate, roundOfAmount, truncateSentence } from '../../../utility/Utils';
import { selectSavedUserData } from '../../../redux/selectors/authSelectors';
import { isFlexternshipApp } from '@/configs/api/env';

const UpcomingProjectCardForTalent = ({ accordionName, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);
  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);

  const dispatch = useDispatch();

  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data._id,
      },
      type: accordionName,
    };
    if (data?.is_read === false) {
      dispatch(updateCardStatus({ id: data?._id, data: postData, type: 'upcomingProjectsForTalent' }));
    }
  };

  const navigate = useNavigate();

  const viewProject = () => {
    updateCard();
    navigate(`/project-details/${data._id}/team`);
  };
  const savedUserData = useSelector(selectSavedUserData);
  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.is_read && <NewTag />}
        <CardBody>
          <p className="active-project-name truncate-2 mt-50">
            {truncateSentence({ sentence: data?.name, maxCharacters: 30 })}
          </p>
          <div className="client-badge px-1">
            <p className="mb-25">Client</p>
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
                    img: data?.client_info?.image_uri || defaultAvatar,
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
              {!isFlexternshipApp && (
                <div className="design-planning">
                  <p className="mb-25 details-box-title">Amount</p>
                  <p className="mb-0 details-box">${roundOfAmount(data?.amount)}</p>
                </div>
              )}
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

export default UpcomingProjectCardForTalent;

UpcomingProjectCardForTalent.propTypes = {
  accordionName: Proptypes.string,
  data: Proptypes.object,
  className: Proptypes.string,
};

UpcomingProjectCardForTalent.defaultProps = {
  accordionName: '',
  data: {},
  className: '',
};
