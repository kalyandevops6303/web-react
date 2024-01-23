import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ProjectModal from '../../modals/ProjectModal';
import SwitchConfirmModal from '../../modals/SwitchConfirm';
import { getModalData } from '../../../redux/actions/dashboardActions';
import { getPath } from '../../../utility/Utils';

const ProjectModalViews = ({
  isActiveProject,
  switchModal,
  setSwitchModal,
  isUpcomingProject,
  project_id,
  showModal,
  toggleModal,
}) => {
  // const [switchModal, setSwitchModal] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();

  const onSuccess = (projectRes) => {
    setModalData(projectRes);
  };
  useEffect(() => {
    dispatch(getModalData({ project_id, onSuccess, onError: toggleModal }));
  }, []);

  const handleToggle = () => {
    toggleModal();
  };

  const toggleCompleteProfileModal = () => {
    toggleModal();
    setCompleteProfileModal(!completeProfileModal);
  };

  return (
    <div>
      {modalData && showModal && (
        <ProjectModal
          isUpcomingProject={isUpcomingProject}
          isActiveProject={isActiveProject}
          data={modalData}
          modal={showModal}
          toggleModal={handleToggle}
          setCreateBidModal={() => {}}
          setSelectedProject={modalData}
          toggleCompleteProfileModal={toggleCompleteProfileModal}
          setSwitchProfileModal={setSwitchModal}
        />
      )}

      {switchModal && (
        <SwitchConfirmModal
          entity={modalData?.switch_team_id ? 'TEAM' : 'TALENT'}
          navigateTo={getPath({ isActiveProject, projectId: modalData?._id })}
          switchTeamId={modalData?.switch_team_id}
          modal={switchModal}
          toggleModal={() => setSwitchModal(!switchModal)}
        />
      )}
    </div>
  );
};

ProjectModalViews.propTypes = {
  project_id: PropTypes.string,
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  isActiveProject: PropTypes.bool,
  isUpcomingProject: PropTypes.bool,
  switchModal: PropTypes.bool,
  setSwitchModal: PropTypes.func,
};

ProjectModalViews.defaultProps = {
  project_id: '',
  showModal: false,
  toggleModal: () => {},
  isActiveProject: false,
  isUpcomingProject: false,
  switchModal: false,
  setSwitchModal: () => {},
};

export default ProjectModalViews;
