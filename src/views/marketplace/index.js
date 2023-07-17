import React, { useState } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getItem } from '../../utility/localStorageControl';

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
  // Primary filters

  // Adjust the number of lines based on the desired limit

  const routesMatch =
    useMatch('/marketplace/clients') ||
    useMatch('/marketplace/all_listings') ||
    useMatch('/marketplace/my_listings') ||
    useMatch('/marketplace/talents');

  const [primaryFilter, setPrimaryFilter] = useState(routesMatch?.pathname?.split('/')?.[2]);
  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/marketplace/${props}`);
  };

  // const userData = useSelector(selectAuthUserData);
  const userData = getItem('userData');

  // eslint-disable-next-line react/no-unstable-nested-components
  const SecondComp = () => <SecondaryFilters userType={userData?.user_type} primaryFilter={primaryFilter} />;

  return (
    <MarketPlaceContainer>
      <BreadCrumbs data={[{ title: 'Marketplace' }]} />
      <PrimaryFilter
        selected={primaryFilter}
        handlePrimaryChangeFilter={handlePrimaryChangeFilter}
        isTab={isTab}
        userType={userData?.user_type}
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
