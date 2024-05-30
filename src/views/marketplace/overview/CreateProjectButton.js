import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from 'reactstrap';
import { profilePercentage, userData } from '../../../redux/selectors/dashboardSelectors';
import CompleteProfileModal from '../../modals/CompleteProfileModal';
import { DashboardHeaderWrapper } from '../../dashboard/overview/style';

const CreateProjectButton = () => {
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);
  const navigate = useNavigate();

  const [completeProfileModal, setCompleteProfileModal] = useState(null);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  const onCreateProjectClick = () => {
    if (profilePercentageData?.values_missing?.includes('company_name')) {
      setCompleteProfileModal(true);
    } else {
      navigate('/create-project');
    }
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

      {userDetailsData?.user_type === 'CLIENT' && (
        <DashboardHeaderWrapper>
          <Button color="primary" onClick={onCreateProjectClick}>
            Create Project
          </Button>
        </DashboardHeaderWrapper>
      )}
    </div>
  );
};

export default CreateProjectButton;
