import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getItem } from '../../utility/localStorageControl';
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
    useMatch('/teams/all') ||
    useMatch('/teams/recommended') ||
    useMatch('/teams/invited') ||
    useMatch('/teams/join_request') ||
    useMatch('/teams/Favorite');

  const [primaryFilter, setPrimaryFilter] = useState(routesMatch?.pathname?.split('/')?.[2]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/teams/${props}`);
  };

  // const userData = useSelector(selectAuthUserData);
  const userDataLocal = getItem('userData');

  // eslint-disable-next-line react/no-unstable-nested-components
  const SecondComp = () => <SecondaryFilters userType={userDataLocal?.user_type} primaryFilter={primaryFilter} />;

  const primaryEnum = {
    all: 'Teams',
    recommended: 'Recommended',
    invited: 'Invited',
    join_request: 'Join Request',
    favorite: 'Favorite',
  };

  return (
    <TeamsContainer>
      <div className="d-flex justify-content-between">
        <BreadCrumbs data={[{ title: 'My Teams', link: '/teams/all' }, { title: primaryEnum[primaryFilter] }]} />

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
        userType={userDataLocal?.user_type}
      />
      <Routes>
        <Route path="all" element={<SecondComp />} />
        <Route path="recommended" element={<SecondComp />} />
        <Route path="invited" element={<SecondComp />} />
        <Route path="join_request" element={<SecondComp />} />
        <Route path="Favorite" element={<SecondComp />} />
      </Routes>
    </TeamsContainer>
  );
};

export default MyTeams;
