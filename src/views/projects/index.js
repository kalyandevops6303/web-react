import React, { useState, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getProfilePercentage } from '../../redux/actions/dashboardActions';
import { selectAuthUserData } from '../../redux/selectors/authSelectors';

const ProjectListingContainer = styled.div`
  .projects-search {
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

const ProjectsListing = () => {
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Primary filters

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
    dispatch(getProfilePercentage());
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/projects/${props}`);
  };

  const userDataLocal = useSelector(selectAuthUserData);

  // eslint-disable-next-line react/no-unstable-nested-components
  const SecondComp = () => <SecondaryFilters userType={userDataLocal?.user_type} primaryFilter={primaryFilter} />;

  const primaryEnum = {
    ongoing: 'Ongoing',
    upcoming: 'Upcoming',
    completed: 'Completed',
    terminated: 'Terminated',
    dispute: 'Dispute',
  };

  return (
    <ProjectListingContainer>
      <BreadCrumbs data={[{ title: 'Projects', link: '/projects/upcoming' }, { title: primaryEnum[primaryFilter] }]} />

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
    </ProjectListingContainer>
  );
};

export default ProjectsListing;
