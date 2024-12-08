import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { clearProjectData } from '../../redux/reducers/projectDetails';
import { getItem, setItem } from '../../utility/localStorageControl';
import CreateProjectButton from '../marketplace/overview/CreateProjectButton';
import { clearData } from '../../redux/reducers/project';
import { appPermissionsSelector, selectAuthUserData } from '../../redux/selectors/authSelectors';
import PermissionWrapper from '@/PermissionWrapper';

const ProjectContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const SecondaryFiltersWrapper = ({ primaryFilter }) => {
  const userData = useSelector(selectAuthUserData);
  return <SecondaryFilters userType={userData?.user_type} primaryFilter={primaryFilter} />;
};
SecondaryFiltersWrapper.propTypes = {
  primaryFilter: PropTypes.string,
};
SecondaryFiltersWrapper.defaultProps = {
  primaryFilter: '',
};

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector(selectAuthUserData);
  const appPermissions = useSelector(appPermissionsSelector);
  const isTab = useIsTab();

  const routesMatch =
    useMatch('/projects/ongoing') ||
    useMatch('/projects/upcoming') ||
    useMatch('/projects/completed') ||
    useMatch('/projects/terminated') ||
    useMatch('/projects/dispute') ||
    useMatch('/projects/blocked') ||
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
    blocked: 'Blocked',
    invited: 'Invited',
  };

  return (
    <div className="trumio">
      <ProjectContainer>
        <BreadCrumbs data={[{ title: 'Project', link: '/projects' }, { title: primaryEnum[primaryFilter] }]} />

        <CreateProjectButton />
        <PrimaryFilter
          selected={primaryFilter}
          handlePrimaryChangeFilter={handlePrimaryChangeFilter}
          isTab={isTab}
          userType={userData?.user_type}
        />

        <Routes>
          <Route
            path="ongoing"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.ONGOING']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="upcoming"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.UPCOMING']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="completed"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.COMPLETED']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="terminated"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.TERMINATED']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="dispute"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.DISPUTED']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          {primaryFilter === 'blocked' && (
            <Route
              path="/"
              element={
                <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.BLOCKED']}>
                  <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
                </PermissionWrapper>
              }
            />
          )}
          <Route
            path="invited"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.INVITED']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
        </Routes>
      </ProjectContainer>
    </div>
  );
};

export default Projects;
