import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import { useIsTab } from '../../utility/Utils';
import SecondaryFilters from './overview/SecondaryFilter';
import PrimaryFilter from './overview/PrimaryFilter';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { getProjectListing } from '../../redux/actions/projectActions';

const ProjectContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const Projects = () => {
  // Primary filters
  const dispatch = useDispatch();
  const userDetailsData = useSelector(userData);
  const isTab = useIsTab();

  // Adjust the number of lines based on the desired limit

  const [primaryFilter, setPrimaryFilter] = useState('ONGOING');

  const metaData = { page: 1, page_size: 10 };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, []);

  // Secondary filters

  const handlePrimaryChangeFilter = (props) => {
    setPrimaryFilter(props);
    dispatch(getProjectListing({ primaryFilter, metaData, userType: userDetailsData?.user_type }));
  };

  const primaryEnum = {
    CLOSED: 'Ongoing',
    IN_REVIEW: 'Upcoming',
    COMPLETED: 'Completed',
    TERMINATED: 'Terminated',
    DISPUTED: 'Disputed',
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
        userType={userDetailsData?.user_type}
      />
      <SecondaryFilters primaryFilter={primaryFilter} userType={userDetailsData?.user_type} />
    </ProjectContainer>
  );
};

export default Projects;
