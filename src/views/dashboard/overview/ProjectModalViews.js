import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProjectModal from '../../modals/ProjectModal';
import SwitchConfirmModal from '../../modals/SwitchConfirm';
import { getModalData } from '../../../redux/actions/dashboardActions';

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
  const navigate = useNavigate();
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

  const dashboardRedirection = () => {
    if (isActiveProject) {
      navigate(`/project-details/${project_id}/milestone`);
    } else if (isUpcomingProject) {
      navigate(`/project-details/${project_id}/bid`);
    }
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
          dashboardRedirection={dashboardRedirection}
          data={{ ...modalData, project_id: modalData?._id, isDashboardRedirection: true }}
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
