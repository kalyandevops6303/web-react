import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { getItem, setItem } from '../../utility/localStorageControl';

const TeamsContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const MyTeams = () => {
  const userDetailsData = useSelector(userData);
  const isTab = useIsTab();
  const navigate = useNavigate();
  const [primaryFilter, setPrimaryFilter] = useState(getItem('selectedMyTeamsTab') ?? 'teams');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    setItem('baseRoute', 'my-teams');
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

  return (
    <TeamsContainer>
      <div className="d-flex justify-content-between">
        <BreadCrumbs data={[{ title: 'My Teams', link: '/my-teams' }, { title: primaryEnum[primaryFilter] }]} />
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
