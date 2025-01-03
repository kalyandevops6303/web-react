/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ProjectWrapper } from './style';
import NewTag from '../../../@core/components/new-tag';
import { updateCardStatus } from '../../../redux/actions/dashboardActions';
import DurationSegment from './DurationSegment';
import { getModifiedProjectResponse, truncateSentence } from '../../../utility/Utils';
import ProjectModal from '@/views/modals/ProjectModal';

const OpenProjectCardForClient = ({ accordionName, data, className }) => {
  const [showModal, setShowModal] = useState(false);
  const handleToggle = () => {
    setShowModal(!showModal);
  };
  const dispatch = useDispatch();
  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);

  const navigate = useNavigate();

  const updateCard = () => {
    const postData = {
      metadata: {
        project_id: data.project?._id,
      },

      type: accordionName,
    };
    if (data?.project?.is_read === false) {
      dispatch(updateCardStatus({ id: data.project?._id, data: postData, type: 'openProjectsForClient' }));
    }
  };
  const viewProject = () => {
    updateCard();
    navigate(`/project-details/${data.project?._id}/milestone`);
  };
  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data.project?.is_read && <NewTag />}
        <CardBody>
          <h4 className="active-project-name mt-1 truncate-2">
            {truncateSentence({ sentence: data?.project?.name, maxCharacters: 30 })}
          </h4>
          <p className="active-project-simple-heading">Project</p>
          <DurationSegment
            start_date={data?.project?.expected_start_date}
            end_date={data?.project?.listing_end_date}
            showEndDate={false}
          />

          <div
            onClick={viewProject}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-50"
          >
            {isModalLoading && projectModalId === data?.project?._id ? <Spinner size="sm" /> : 'View Project'}
          </div>
        </CardBody>
      </Card>
      {showModal && (
        <ProjectModal
          data={getModifiedProjectResponse({ data })}
          modal={showModal}
          toggleModal={handleToggle}
          isMyTeam={false}
        />
      )}
    </ProjectWrapper>
  );
};

export default OpenProjectCardForClient;

OpenProjectCardForClient.propTypes = {
  accordionName: Proptypes.string,
  data: Proptypes.object,
  className: Proptypes.string,
};

OpenProjectCardForClient.defaultProps = {
  accordionName: '',
  data: {},
  className: '',
};
