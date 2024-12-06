import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getProfilePercentage } from '../../redux/actions/dashboardActions';
import CreateProjectButton from './overview/CreateProjectButton';
import { appPermissionsSelector, selectAuthUserData, selectFlexternBoolean } from '../../redux/selectors/authSelectors';
import { clearProjectData } from '../../redux/reducers/projectDetails';
import { getItem, setItem } from '../../utility/localStorageControl';
import { userTypes } from '../../utility/constants/Constant';
import { clearData } from '../../redux/reducers/marketPlace';
import { getProfileCompletionFlextern } from '../../redux/actions/talentOnboardingActions';
import PermissionWrapper from '@/PermissionWrapper';
import { Button } from 'reactstrap';
const MarketPlaceContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const SecondaryFiltersWrapper = ({ primaryFilter }) => {
  const userData = useSelector(selectAuthUserData);
  return (
    <SecondaryFilters userType={userData?.user_type} appRole={userData?.app_roles?.[0]} primaryFilter={primaryFilter} />
  );
};
SecondaryFiltersWrapper.propTypes = {
  primaryFilter: PropTypes.string,
};
SecondaryFiltersWrapper.defaultProps = {
  primaryFilter: '',
};

const MarketPlace = () => {
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectAuthUserData);
  const appPermissions = useSelector(appPermissionsSelector);

  const routesMatch =
    useMatch('/marketplace/clients') ||
    useMatch('/marketplace/all_listings') ||
    useMatch('/marketplace/my_listings') ||
    useMatch('/marketplace/talents') ||
    useMatch('/marketplace/teams') ||
    useMatch('/marketplace/my_bids');

  const [primaryFilter, setPrimaryFilter] = useState(
    getItem('selectedMarketplaceTab') !== routesMatch?.pathname?.split('/')?.[2]
      ? routesMatch?.pathname?.split('/')?.[2]
      : getItem('selectedMarketplaceTab'),
  );

  const isFlextern = useSelector(selectFlexternBoolean);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    setPrimaryFilter(routesMatch?.pathname?.split('/')?.[2]);
    if (isFlextern) {
      dispatch(getProfileCompletionFlextern());
    } else {
      dispatch(getProfilePercentage());
    }
    dispatch(clearProjectData());
    setItem('baseRoute', 'marketplace');

    // Clears data for marketplace
    return () => dispatch(clearData());
  }, []);

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/marketplace/${props}`);
    setItem('selectedMarketplaceTab', props);
  };

  const primaryEnum = {
    clients: 'Clients',
    all_listings: 'All listings',
    my_listings: 'My listings',
    talents: 'Talent',
    teams: 'Teams',
    my_bids: 'My bids',
  };

  return (
    <div className="trumio">
      <MarketPlaceContainer>
        <BreadCrumbs
          data={[
            { title: 'Marketplace', link: '/marketplace/all_listings' },
            {
              title:
                userData?.user_type === userTypes.client && primaryEnum[primaryFilter] === 'My bids'
                  ? 'Bid Received'
                  : primaryEnum[primaryFilter],
            },
          ]}
        />
        <div className="d-flex justify-content-end align-items-center gap-2 mb-2">
          <div className="d-flex gap-2">
            <CreateProjectButton />
          </div>
        </div>
        <PrimaryFilter 
          selected={primaryFilter} 
          handlePrimaryChangeFilter={handlePrimaryChangeFilter} 
          isTab={isTab} 
        />
        <Routes>
          <Route
            path="all_listings"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.ALL_LISTINGS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="my_listings"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.MY_LISTINGS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="my_bids"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.BIDS_RECEIVED']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="clients"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.CLIENTS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="talents"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.TALENTS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
          <Route
            path="teams"
            element={
              <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.TEAMS']}>
                <SecondaryFiltersWrapper primaryFilter={primaryFilter} />
              </PermissionWrapper>
            }
          />
        </Routes>
      </MarketPlaceContainer>
    </div>
  );
};

export default MarketPlace;
