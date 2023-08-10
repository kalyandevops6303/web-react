import React, { useState, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getItem } from '../../utility/localStorageControl';
import { getProfilePercentage } from '../../redux/actions/dashboardActions';
import CreateProjectButton from './overview/CreateProjectButton';

const MarketPlaceContainer = styled.div`
  .marketplace-search {
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

const MarketPlace = () => {
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Primary filters

  // Adjust the number of lines based on the desired limit

  const routesMatch =
    useMatch('/marketplace/clients') ||
    useMatch('/marketplace/all_listings') ||
    useMatch('/marketplace/my_listings') ||
    useMatch('/marketplace/talents');

  const [primaryFilter, setPrimaryFilter] = useState(routesMatch?.pathname?.split('/')?.[2]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    dispatch(getProfilePercentage());
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/marketplace/${props}`);
  };

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
    <MarketPlaceContainer>
      <BreadCrumbs
        data={[{ title: 'Marketplace', link: '/marketplace/all_listings' }, { title: primaryEnum[primaryFilter] }]}
      />

      <CreateProjectButton />

      <PrimaryFilter
        selected={primaryFilter}
        handlePrimaryChangeFilter={handlePrimaryChangeFilter}
        isTab={isTab}
        userType={userDataLocal?.user_type}
      />
      <Routes>
        <Route path="all_listings" element={<SecondComp />} />
        <Route path="my_listings" element={<SecondComp />} />
        <Route path="clients" element={<SecondComp />} />
        <Route path="talents" element={<SecondComp />} />
      </Routes>
    </MarketPlaceContainer>
  );
};

export default MarketPlace;
