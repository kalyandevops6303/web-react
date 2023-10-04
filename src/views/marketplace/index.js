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
import { selectAuthUserData } from '../../redux/selectors/authSelectors';
import { clearProjectData } from '../../redux/reducers/projectDetails';

const MarketPlaceContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const SecondComp = ({ primaryFilter }) => {
  const userData = useSelector(selectAuthUserData);
  return <SecondaryFilters userType={userData?.user_type} primaryFilter={primaryFilter} />;
};
SecondComp.propTypes = {
  primaryFilter: PropTypes.string,
};
SecondComp.defaultProps = {
  primaryFilter: '',
};

const MarketPlace = () => {
  const isTab = useIsTab();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routesMatch =
    useMatch('/marketplace/clients') ||
    useMatch('/marketplace/all_listings') ||
    useMatch('/marketplace/my_listings') ||
    useMatch('/marketplace/talents') ||
    useMatch('/marketplace/teams') ||
    useMatch('/marketplace/my_bids');

  const [primaryFilter, setPrimaryFilter] = useState(routesMatch?.pathname?.split('/')?.[2]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    dispatch(getProfilePercentage());
    dispatch(clearProjectData());
  }, []);

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    navigate(`/marketplace/${props}`);
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
    <MarketPlaceContainer>
      <BreadCrumbs
        data={[{ title: 'Marketplace', link: '/marketplace/all_listings' }, { title: primaryEnum[primaryFilter] }]}
      />
      <CreateProjectButton />
      <PrimaryFilter selected={primaryFilter} handlePrimaryChangeFilter={handlePrimaryChangeFilter} isTab={isTab} />
      <Routes>
        <Route path="all_listings" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="my_listings" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="my_bids" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="clients" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="talents" element={<SecondComp primaryFilter={primaryFilter} />} />
        <Route path="teams" element={<SecondComp primaryFilter={primaryFilter} />} />
      </Routes>
    </MarketPlaceContainer>
  );
};

export default MarketPlace;
