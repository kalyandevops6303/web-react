import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getItem, setItem } from '../../utility/localStorageControl';
import { profilePercentage, userData } from '../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../utility/constants/Constant';
import { getProfilePercentage } from '../../redux/actions/dashboardActions';
import CompleteProfileModal from '../modals/CompleteProfileModal';

const TeamsContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const MyTeams = () => {
  const dispatch = useDispatch();
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);
  const isTab = useIsTab();
  const navigate = useNavigate();
  const [primaryFilter, setPrimaryFilter] = useState(getItem('selectedMyTeamsTab') ?? 'teams');

  const [completeProfileModal, setCompleteProfileModal] = useState(null);
  const [completeProfileModalInfoText, setCompleteProfileModalInfoText] = useState(null);

  const toggleCompleteProfileModal = () => {
    setCompleteProfileModal(!completeProfileModal);
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    setItem('baseRoute', 'my-teams');
    dispatch(getProfilePercentage());
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/my-teams/${props}`);
    setItem('selectedMyTeamsTab', props);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const SecondComp = () => <SecondaryFilters userType={userDetailsData?.user_type} primaryFilter={primaryFilter} />;

  const primaryEnum = {
    teams: 'Teams',
    clients: 'Clients',
    talents: 'Talents',
    join_requests: 'Join Requests',
    favourites: 'Favourite',
    recommendation: 'Recommendation',
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
    <TeamsContainer>
      {completeProfileModal && (
        <CompleteProfileModal
          modal={completeProfileModal}
          toggleModal={toggleCompleteProfileModal}
          modalInfoText={completeProfileModalInfoText}
        />
      )}
      <div className="d-flex justify-content-between align-items-center">
        <BreadCrumbs data={[{ title: 'My Teams', link: '/my-teams' }, { title: primaryEnum[primaryFilter] }]} />

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
      <Routes>
        <Route path="teams" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="clients" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="talents" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="join_requests" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="favourites" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="recommendation" element={<SecondComp primaryFilter={primaryFilter} />} />
      </Routes>
    </TeamsContainer>
  );
};

export default MyTeams;
