import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { profilePercentage, userData } from '../../redux/selectors/dashboardSelectors';
import { clearProjectData } from '../../redux/reducers/projectDetails';
import { getItem, setItem } from '../../utility/localStorageControl';
import { userTypes } from '../../utility/constants/Constant';
import CompleteProfileModal from '../modals/CompleteProfileModal';
import { getProfilePercentage } from '../../redux/actions/dashboardActions';

const ProjectContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const Projects = () => {
  // Primary filters
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);
  const isTab = useIsTab();

  // Adjust the number of lines based on the desired limit

  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [completeProfileModalInfoText, setCompleteProfileModalInfoText] = useState(null);

  // eslint-disable-next-line no-undef
  const [primaryFilter, setPrimaryFilter] = useState(getItem('selectedProjectTab') ?? 'ONGOING');

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    dispatch(clearProjectData());
    setItem('baseRoute', 'projects');
    dispatch(getProfilePercentage());
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    // eslint-disable-next-line no-undef
    setItem('selectedProjectTab', props);
  };

  const primaryEnum = {
    ONGOING: 'Ongoing',
    UPCOMING: 'Upcoming',
    COMPLETED: 'Completed',
    TERMINATED: 'Terminated',
    DISPUTE: 'Disputed',
  };

  const onCreateProjectClick = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      setCompleteProfileModalInfoText('project');
      setCompleteProfileModal(true);
    } else {
      navigate('/create-project');
    }
  };

  return (
    <ProjectContainer>
      {completeProfileModal && (
        <CompleteProfileModal
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
          modalInfoText={completeProfileModalInfoText}
        />
      )}
      <div className="d-flex justify-content-between align-items-center">
        <BreadCrumbs data={[{ title: 'Project', link: '/projects' }, { title: primaryEnum[primaryFilter] }]} />

        {userDetailsData?.user_type === userTypes.client && (
          <Button as="link" color="primary" onClick={onCreateProjectClick} className="mb-2">
            Create Project
          </Button>
        )}
      </div>
      <PrimaryFilter
        selected={primaryFilter}
        handlePrimaryChangeFilter={handlePrimaryChangeFilter}
        isTab={isTab}
        userType={userDetailsData?.user_type}
      />
      <SecondaryFilters primaryFilter={primaryFilter} userType={userDetailsData?.user_type} />
    </ProjectContainer>
  );
};

export default Projects;
