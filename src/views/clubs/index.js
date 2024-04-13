import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getItem, setItem } from '../../utility/localStorageControl';
import { clearData } from '../../redux/reducers/clubs';
import { selectAuthUserData } from '../../redux/selectors/authSelectors';

const ClubContainer = styled.div`
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

const Clubs = () => {
  const userData = useSelector(selectAuthUserData);
  const dispatch = useDispatch();
  const location = useLocation();
  const isTab = useIsTab();
  const navigate = useNavigate();
  const filterFromUrl = location?.pathname?.split('/').pop();
  const [primaryFilter, setPrimaryFilter] = useState(getItem('selectedClubsTab') || filterFromUrl);

  const routesMatch = useMatch('/clubs/all_clubs') || useMatch('/clubs/my_clubs') || useMatch('/clubs/favourites');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    setPrimaryFilter(routesMatch?.pathname?.split('/')?.[2]);
    setItem('selectedClubsTab', routesMatch?.pathname?.split('/')?.[2]);
    setItem('baseRoute', 'clubs');

    // Clears my team data
    return () => dispatch(clearData());
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/clubs/${props}`);
    setItem('selectedClubsTab', props);
  };

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
        userType={userData?.user_type}
      />
      <Routes>
        <Route path="all_clubs" element={<SecondaryFiltersWrapper primaryFilter={primaryFilter} />} />
        <Route path="my_clubs" element={<SecondaryFiltersWrapper primaryFilter={primaryFilter} />} />
        <Route path="favourites" element={<SecondaryFiltersWrapper primaryFilter={primaryFilter} />} />
      </Routes>
    </ClubContainer>
  );
};

export default Clubs;
