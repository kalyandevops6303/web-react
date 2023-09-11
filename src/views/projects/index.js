import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { getItem } from '../../utility/localStorageControl';
import { userData } from '../../redux/selectors/dashboardSelectors';

const ProjectContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const Projects = () => {
  const userDetailsData = useSelector(userData);
  const isTab = useIsTab();
  // Primary filters

  // Adjust the number of lines based on the desired limit

  const [primaryFilter, setPrimaryFilter] = useState('ongoing');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
  };

  // const userData = useSelector(selectAuthUserData);
  const userDataLocal = getItem('userData');

  const primaryEnum = {
    ongoing: 'Ongoing',
    upcoming: 'Upcoming',
    completed: 'Completed',
    terminated: 'Terminated',
    dispute: 'Dispute',
  };

  return (
    <ProjectContainer>
      <div className="d-flex justify-content-between">
        <BreadCrumbs data={[{ title: 'Project', link: '/projects' }, { title: primaryEnum[primaryFilter] }]} />

        {userDetailsData?.user_type === 'CLIENT' && (
          <Link to="/create-project">
            <Button as="link" color="primary">
              Create Project
            </Button>
          </Link>
        )}
      </div>
      <PrimaryFilter
        selected={primaryFilter}
        handlePrimaryChangeFilter={handlePrimaryChangeFilter}
        isTab={isTab}
        userType={userDataLocal?.user_type}
      />
      <SecondaryFilters userType={userDataLocal?.user_type} primaryFilter={primaryFilter} />
    </ProjectContainer>
  );
};

export default Projects;
