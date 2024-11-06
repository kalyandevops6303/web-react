import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useMatch, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getItem, setItem } from '../../utility/localStorageControl';
import { userTypes } from '../../utility/constants/Constant';
import { clearData } from '../../redux/reducers/myTeams';
import { appPermissionsSelector, selectAuthUserData } from '../../redux/selectors/authSelectors';
import PermissionWrapper from '@/PermissionWrapper';

const TeamsContainer = styled.div`
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

const MyTeams = () => {
  const appPermissions = useSelector(appPermissionsSelector);
  const userData = useSelector(selectAuthUserData);
  const isTab = useIsTab();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const filterFromUrl = location?.pathname?.split('/').pop();
  const [primaryFilter, setPrimaryFilter] = useState(getItem('selectedMyTeamsTab') || filterFromUrl);

  const routesMatch =
    useMatch('/my-teams/teams') ||
    useMatch('/my-teams/clients') ||
    useMatch('/my-teams/talents') ||
    useMatch('/my-teams/join_requests') ||
    useMatch('/my-teams/favourites') ||
    useMatch('/my-teams/recommendation');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);

    if (userData?.user_type === userTypes.talent && primaryFilter === 'talents') {
      setPrimaryFilter('teams');
      setItem('selectedMyTeamsTab', 'teams');
    } else if (userData?.user_type === userTypes.team && primaryFilter === 'teams') {
      setPrimaryFilter('talents');
      setItem('selectedMyTeamsTab', 'talents');
    } else if (primaryFilter !== routesMatch?.pathname?.split('/')?.[2]) {
      setPrimaryFilter(routesMatch?.pathname?.split('/')?.[2]);
      setItem('selectedMyTeamsTab', routesMatch?.pathname?.split('/')?.[2]);
    }

    setItem('baseRoute', 'my-teams');

    // Cleares data for project tab
    return () => dispatch(clearData());
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/my-teams/${props}`);
    setItem('selectedMyTeamsTab', props);
  };

  const primaryEnum = {
    teams: 'Teams',
    clients: 'Clients',
    talents: 'Talents',
    join_requests: 'Join Requests',
    favourites: 'Favourite',
    recommendation: 'Recommendation',
  };

  return (
    <div className="trumio">
      <TeamsContainer>
        <div className="d-flex justify-content-between w-100">
          <BreadCrumbs data={[{ title: 'My Teams', link: '/my-teams' }, { title: primaryEnum[primaryFilter] }]} />
          <div className="relist-btn-wrapper">
            <Button
              color="primary"
              outline
              className="relist-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/my-teams/teams', { state: { isDraftTeams: true } });
              }}
            >
              View Drafts
            </Button>
          </div>
        </div>
        <PrimaryFilter
          selected={primaryFilter}
          handlePrimaryChangeFilter={handlePrimaryChangeFilter}
          isTab={isTab}
          userType={userData?.user_type}
        />
        <Routes>
          <Route
            path="teams"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.TEAMS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="clients"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.CLIENTS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="talents"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.TEAM_MEMBERS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="join_requests"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.JOIN_REQUESTS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="favourites"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.FAVOURITES']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="recommendation"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MY_TEAM.RECOMMENDED']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
        </Routes>
      </TeamsContainer>
    </div>
  );
};

export default MyTeams;
