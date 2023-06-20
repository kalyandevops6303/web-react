import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import UserCard from '../cards/UserCard';
import { useIsTab } from '../../utility/Utils';
import Institute from '../cards/Institute';
import ProjectCard from '../cards/ProjectCard';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';

const MarketPlaceContainer = styled.div`
  .marketplace-search {
    .input-group-text {
      padding: 0.571rem 0.6rem 0.571rem 0.8rem;
    }
  }
`;

const MarketPlace = () => {
  const isTab = useIsTab();
  const { control } = useForm();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExapantion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <MarketPlaceContainer>
      <BreadCrumbs data={[{ title: 'Marketplace' }]} />
      <PrimaryFilter isTab={isTab} />
      <SecondaryFilters control={control} toggleExapantion={toggleExapantion} isExpanded={isExpanded} />
      <UserCard />
      <Institute />
      <ProjectCard isExpanded={isExpanded} />
      <ProjectCard isExpanded={isExpanded} />
    </MarketPlaceContainer>
  );
};

export default MarketPlace;
