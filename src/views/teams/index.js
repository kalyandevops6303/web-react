import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { userData } from '../../redux/selectors/dashboardSelectors';

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
  // Primary filters

  // Adjust the number of lines based on the desired limit

  const routesMatch =
    useMatch('/my-teams') ||
    useMatch('/my-teams/invitations') ||
    useMatch('/my-teams/join-requests') ||
    useMatch('/my-teams/favourites');

  const initialState =
    routesMatch?.pathname === '/my-teams'
      ? routesMatch?.pathname?.split('/')?.[1]
      : routesMatch?.pathname?.split('/')?.[2];

  const [primaryFilter, setPrimaryFilter] = useState(initialState);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/${props}`);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const SecondComp = () => <SecondaryFilters userType={userDetailsData?.user_type} primaryFilter={primaryFilter} />;

  const primaryEnum = {
    'my-teams': 'All Teams',
    invitations: 'Invited',
    'join-requests': 'Join Request',
    favourites: 'Favorite',
  };

  return (
    <TeamsContainer>
      <div className="d-flex justify-content-between">
        <BreadCrumbs data={[{ title: 'My Teams', link: '/my-teams' }, { title: primaryEnum[primaryFilter] }]} />

        {userDetailsData?.user_type === 'CLIENT' && (
          <Link to="/create-project">
            <Button as="link" color="primary">
              Create Project
            </Button>
          </Link>
        )}
      </div>
      <PrimaryFilter
        selected={primaryFilter}
        handlePrimaryChangeFilter={handlePrimaryChangeFilter}
        isTab={isTab}
        userType={userDetailsData?.user_type}
      />
      <Routes>
        <Route path="/" element={<SecondComp />} />
        <Route path="invitations" element={<SecondComp />} />
        <Route path="join-requests" element={<SecondComp />} />
        <Route path="favourites" element={<SecondComp />} />
      </Routes>
    </TeamsContainer>
  );
};

export default MyTeams;
