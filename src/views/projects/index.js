import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { clearProjectData } from '../../redux/reducers/projectDetails';
import { getItem, setItem } from '../../utility/localStorageControl';
import CreateProjectButton from '../marketplace/overview/CreateProjectButton';
import { clearData } from '../../redux/reducers/project';

const ProjectContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userDetailsData = useSelector(userData);
  const isTab = useIsTab();

  const routesMatch =
    useMatch('/projects/ongoing') ||
    useMatch('/projects/upcoming') ||
    useMatch('/projects/completed') ||
    useMatch('/projects/terminated') ||
    useMatch('/projects/dispute') ||
    useMatch('/projects/invited');
  const filterFromUrl = location.pathname.split('/').pop();
  const [primaryFilter, setPrimaryFilter] = useState(getItem('selectedProjectTab') || filterFromUrl);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    setPrimaryFilter(routesMatch?.pathname?.split('/')?.[2]);
    setItem('selectedProjectTab', routesMatch?.pathname?.split('/')?.[2]);
    dispatch(clearProjectData());
    setItem('baseRoute', 'projects');

    // Cleares data for project tab
    return () => dispatch(clearData());
  }, []);

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/projects/${props}`);
    setItem('selectedProjectTab', props);
  };

  const primaryEnum = {
    ongoing: 'Ongoing',
    upcoming: 'Upcoming',
    completed: 'Completed',
    terminated: 'Terminated',
    dispute: 'Dispute',
    invited: 'Invited',
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const SecondComp = () => <SecondaryFilters userType={userDetailsData?.user_type} primaryFilter={primaryFilter} />;

  return (
    <ProjectContainer>
      <BreadCrumbs data={[{ title: 'Project', link: '/projects' }, { title: primaryEnum[primaryFilter] }]} />

      <CreateProjectButton />
      <PrimaryFilter
        selected={primaryFilter}
        handlePrimaryChangeFilter={handlePrimaryChangeFilter}
        isTab={isTab}
        userType={userDetailsData?.user_type}
      />

      <Routes>
        <Route
          path="ongoing"
          element={<SecondComp primaryFilter={primaryFilter} userType={userDetailsData?.user_type} />}
        />
        <Route
          path="upcoming"
          element={<SecondComp primaryFilter={primaryFilter} userType={userDetailsData?.user_type} />}
        />
        <Route
          path="completed"
          element={<SecondComp primaryFilter={primaryFilter} userType={userDetailsData?.user_type} />}
        />
        <Route
          path="terminated"
          element={<SecondComp primaryFilter={primaryFilter} userType={userDetailsData?.user_type} />}
        />
        <Route
          path="dispute"
          element={<SecondComp primaryFilter={primaryFilter} userType={userDetailsData?.user_type} />}
        />
        <Route
          path="invited"
          element={<SecondComp primaryFilter={primaryFilter} userType={userDetailsData?.user_type} />}
        />
      </Routes>
    </ProjectContainer>
  );
};

export default Projects;
