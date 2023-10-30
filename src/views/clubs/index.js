import React, { useState, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { getItem, setItem } from '../../utility/localStorageControl';

const ClubContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const Clubs = () => {
  const userDetailsData = useSelector(userData);
  const isTab = useIsTab();
  const navigate = useNavigate();
  const [primaryFilter, setPrimaryFilter] = useState(getItem('selectedClubsTab') && 'my_clubs');

  const routesMatch = useMatch('/clubs/all_clubs') || useMatch('/clubs/my_clubs') || useMatch('/clubs/favourites');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    setPrimaryFilter(routesMatch?.pathname?.split('/')?.[2]);
    setItem('selectedClubsTab', routesMatch?.pathname?.split('/')?.[2]);
    setItem('baseRoute', 'clubs');
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/clubs/${props}`);
    setItem('selectedClubsTab', props);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const SecondComp = () => <SecondaryFilters userType={userDetailsData?.user_type} primaryFilter={primaryFilter} />;

  const primaryEnum = {
    my_clubs: 'My Clubs',
    all_clubs: 'All Clubs',
    favourites: 'Favourite',
  };

  return (
    <ClubContainer>
      <div className="d-flex justify-content-between">
        <BreadCrumbs data={[{ title: 'Clubs', link: '/clubs' }, { title: primaryEnum[primaryFilter] }]} />
      </div>
      <PrimaryFilter
        selected={primaryFilter}
        handlePrimaryChangeFilter={handlePrimaryChangeFilter}
        isTab={isTab}
        userType={userDetailsData?.user_type}
      />
      <Routes>
        <Route path="all_clubs" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="my_clubs" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="favourites" element={<SecondComp primaryFilter={primaryFilter} />} />
      </Routes>
    </ClubContainer>
  );
};

export default Clubs;
