/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Spinner } from 'reactstrap';
import { ProjectWrapper } from './style';
import NewTag from '../../../@core/components/new-tag';
import DurationSegment from './DurationSegment';
import { truncateSentence } from '../../../utility/Utils';
import RelistConfirmationModal from '@/views/modals/RelistConfirmationModal';
import RelistListingDetailsModal from '@/views/modals/RelistListingDetailsModal';
import RelistSuccessModal from '@/views/modals/RelistSuccessModal';
import { getWithdrawnProjectsForClient } from '@/redux/actions/dashboardActions';

const WithdrawnProjectCardForClient = ({ data, className }) => {
  const dispatch = useDispatch();
  const isModalLoading = useSelector((state) => state.dashboard.projectModalDataLoading);
  const projectModalId = useSelector((state) => state.dashboard.projectModalId);
  const [relistConfirmationModal, setRelistConfirmationModal] = useState(null);
  const [relistListingDetailsModal, setRelistListingDetailsModal] = useState(null);
  const [relistSuccessModal, setRelistSuccessModal] = useState(null);
  const [projectRelistData, setProjectRelistData] = useState(null);

  const toggleRelistConfirmationModal = () => setRelistConfirmationModal(!relistConfirmationModal);

  const toggleRelistListingDetailsModal = () => setRelistListingDetailsModal(!relistListingDetailsModal);

  const toggleRelistSuccessModal = () => {
    dispatch(getWithdrawnProjectsForClient());
    setRelistSuccessModal(!relistSuccessModal);
    setRelistConfirmationModal(false);
    setRelistListingDetailsModal(false);
  };

  const handleToggle = () => {
    setRelistConfirmationModal(true);
  };

  return (
    <ProjectWrapper className={className}>
      <Card className="card-app-design new-tag-relative-card">
        {!data?.project?.is_read && <NewTag />}
        <CardBody>
          <p className="truncate-2 mt-1" style={{ height: '40px', color: 'black' }}>
            {truncateSentence({ sentence: data?.project?.name, maxCharacters: 30 })}
          </p>
          <p className="active-project-simple-heading">Project</p>
          <DurationSegment
            start_date={data?.project?.expected_start_date}
            end_date={data?.project?.listing_end_date}
            showStartDate={false}
            showEndDate={false}
            showWithdrawnDate
            withdrawnDate={data?.project?.updated_at}
          />

          <div
            onClick={handleToggle}
            className="cursor-pointer font-weight-normal text-center text-primary project-cta mt-50"
          >
            {isModalLoading && projectModalId === data?.project?._id ? <Spinner size="sm" /> : 'Relist'}
          </div>
        </CardBody>
      </Card>
      {relistConfirmationModal && (
        <RelistConfirmationModal
          modal={relistConfirmationModal}
          toggleModal={toggleRelistConfirmationModal}
          setRelistListingDetailsModal={setRelistListingDetailsModal}
        />
      )}
      {relistListingDetailsModal && (
        <RelistListingDetailsModal
          modal={relistListingDetailsModal}
          toggleModal={toggleRelistListingDetailsModal}
          setRelistConfirmationModal={setRelistConfirmationModal}
          setRelistSuccessModal={setRelistSuccessModal}
          projectRelistData={projectRelistData}
          setProjectRelistData={setProjectRelistData}
          projectId={data?.project?._id}
        />
      )}

      {relistSuccessModal && (
        <RelistSuccessModal
          modal={relistSuccessModal}
          toggleModal={toggleRelistSuccessModal}
          projectRelistData={projectRelistData}
          data={data?.project}
        />
      )}
    </ProjectWrapper>
  );
};

export default WithdrawnProjectCardForClient;

WithdrawnProjectCardForClient.propTypes = {
  data: Proptypes.object,
  className: Proptypes.string,
};

WithdrawnProjectCardForClient.defaultProps = {
  data: {},
  className: '',
};
