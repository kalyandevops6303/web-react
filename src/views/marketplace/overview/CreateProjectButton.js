import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import { profilePercentage, userData } from '../../../redux/selectors/dashboardSelectors';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import { DashboardHeaderWrapper } from '../../dashboard/overview/style';
import { userTypes } from '../../../utility/constants/Constant';
import { draftProjectsCheck } from '../../../redux/actions/createProjectActions';
import { draftProjectsCheckLoading } from '../../../redux/selectors/createProjectSelectors';
import SavedDraftsAvailableModal from '../../modals/SavedDraftsAvailableModal';
import { getItem } from '../../../utility/localStorageControl';
import { resetProjectCreationStore } from '@/flexternships/utils/core-utils';

const CreateProjectButton = () => {
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);
  const draftProjectsCheckIsLoading = useSelector(draftProjectsCheckLoading);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isDelegate = getItem('isDelegate');

  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [savedDraftsAvailableModal, setSavedDraftsAvailableModal] = useState(null);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const toggleSavedDraftsAvailableModal = () => setSavedDraftsAvailableModal(!savedDraftsAvailableModal);

  const onDraftProjectsCheckSuccess = (res) => {
    if (res?.has_draft_project) {
      setSavedDraftsAvailableModal(true);
    } else if (profilePercentageData?.values_missing?.includes('company_name') && !isDelegate) {
      setCompleteProfileModal(true);
    } else {
      handleCreateNewProject();
    }
  };

  const onCreateProjectClick = () => {
    dispatch(draftProjectsCheck(onDraftProjectsCheckSuccess));
  };

  const handleCreateNewProject = () => {
    resetProjectCreationStore();
    navigate('/create-project');
  };

  return (
    <div>
      {completeProfileModal && (
        <CompleteProfileModal
          modalInfoText="create project"
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
        />
      )}
      {savedDraftsAvailableModal && (
        <SavedDraftsAvailableModal
          modal={savedDraftsAvailableModal}
          toggleModal={toggleSavedDraftsAvailableModal}
          modalText="You have project(s) in draft mode. Would you like to continue where you left off?"
          firstBtnText="Create New Project"
          secondBtnText="View Drafts"
          firstBtnAction={handleCreateNewProject}
          secondBtnAction={() =>
            navigate('/marketplace/my_listings', {
              state: {
                isDraftProjects: true,
              },
            })
          }
        />
      )}
      {userDetailsData?.user_type === userTypes.client && (
        <DashboardHeaderWrapper>
          {location?.pathname?.includes('my_listings') && (
            <Button
              color="primary"
              outline
              className="me-1"
              onClick={() =>
                navigate('/marketplace/my_listings', {
                  state: {
                    isDraftProjects: true,
                  },
                })
              }
            >
              View Draft
            </Button>
          )}
          <Button color="primary" onClick={onCreateProjectClick} disabled={draftProjectsCheckIsLoading}>
            {draftProjectsCheckIsLoading ? <Spinner size="sm" /> : 'Create Project'}
          </Button>
        </DashboardHeaderWrapper>
      )}
      {userDetailsData?.user_type !== userTypes.client && location?.pathname?.includes('my_bids') && (
        <DashboardHeaderWrapper>
          {location?.pathname?.includes('my_bids') && (
            <Button
              color="primary"
              outline
              onClick={() =>
                navigate('/marketplace/my_bids', {
                  state: {
                    isDraftBids: true,
                  },
                })
              }
            >
              View Draft
            </Button>
          )}
        </DashboardHeaderWrapper>
      )}
    </div>
  );
};

export default CreateProjectButton;
