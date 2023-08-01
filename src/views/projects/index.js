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

const ProjectContainer = styled.div`
  .Project-search {
    .input-group-text {
      padding: 0.571rem 0.6rem 0.571rem 0.8rem;
    }
  }

  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const Projects = () => {
  const userDetailsData = useSelector(userData);
  const isTab = useIsTab();
  const navigate = useNavigate();
  // Primary filters

  // Adjust the number of lines based on the desired limit

  const routesMatch =
    useMatch('/projects/ongoing') ||
    useMatch('/projects/upcoming') ||
    useMatch('/projects/completed') ||
    useMatch('/projects/terminated') ||
    useMatch('/projects/dispute');

  const [primaryFilter, setPrimaryFilter] = useState(routesMatch?.pathname?.split('/')?.[2]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/projects/${props}`);
  };

  // const userData = useSelector(selectAuthUserData);
  const userDataLocal = getItem('userData');

  // eslint-disable-next-line react/no-unstable-nested-components
  const SecondComp = () => <SecondaryFilters userType={userDataLocal?.user_type} primaryFilter={primaryFilter} />;

  const primaryEnum = {
    clients: 'Clients',
    all_listings: 'All listings',
    my_listings: 'My listings',
    talents: 'Talent',
  };

  return (
    <ProjectContainer>
      <div className="d-flex justify-content-between">
        <BreadCrumbs
          data={[{ title: 'Project', link: '/project/all_listings' }, { title: primaryEnum[primaryFilter] }]}
        />

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
        <Route path="ongoing" element={<SecondComp />} />
        <Route path="upcoming" element={<SecondComp />} />
        <Route path="completed" element={<SecondComp />} />
        <Route path="terminated" element={<SecondComp />} />
        <Route path="dispute" element={<SecondComp />} />
      </Routes>
    </ProjectContainer>
  );
};

export default Projects;
