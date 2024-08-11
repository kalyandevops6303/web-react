import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import ProjectCard from '../cards/internal/ProjectCard';
import { ResponsiveGrid } from '../cards/style';
import InfiniteScroll from '../../lib/infinite-scroll';
import { getAllProjectsService } from '../../services/internalProjectsServices';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';

const ProjectsContainer = styled.div`
  @media only screen and (max-device-width: 600px) {
    .primary-row {
      display: block;
    }
  }
`;

const InternalProjects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectsMetadata, setProjectsMetadata] = useState({ currentPage: 1, pageSize: 10, hasNextPage: false });

  const fetchProjects = async (page, pageSize, append = false) => {
    setIsLoading(!append);
    const postData = {
      metaData: {
        page: page,
        page_size: pageSize,
      },
      data: {}
    }
    try {
      const { data } = await getAllProjectsService(postData)
      setProjectsMetadata({
        currentPage: data?.data?.metadata?.current_page,
        pageSize: data?.data?.metadata?.page_size,
        hasNextPage: data?.data?.metadata?.has_next_page,
      });
      if (append) {
        setProjectsData((cur) => ([...cur, ...data?.data?.data]));
      } else {
        setProjectsData(data?.data?.data);
      }
      setIsLoading(false);

    } catch (err) {
      ShowToastMessage(ERROR, err?.response?.data?.errorData?.message || "Something went wrong!");
      setIsLoading(false);
    }
  }

  const fetchMore = async () => {
    await fetchProjects(projectsMetadata?.currentPage + 1, (projectsMetadata?.pageSize || 10), true);
  }

  const NoDataFoundComponent = () => (<div className="d-flex justify-content-center">No data found</div>)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    fetchProjects(projectsMetadata?.currentPage, projectsMetadata?.pageSize, false);
  }, []);

  return (
    <ProjectsContainer>
      {isLoading ? (
        <ComponentSpinner />
      ) : (
        <ResponsiveGrid>
          <InfiniteScroll
            dataLength={projectsData?.length}
            next={fetchMore}
            hasMore={projectsMetadata?.hasNextPage}
            endMessage={
              <div className="d-flex justify-content-center ">
                {projectsData?.length === 0 ? (
                  <NoDataFoundComponent />
                ) : (
                  ''
                )}
              </div>
            }
            loader={<div className="d-flex justify-content-center"><ComponentSpinner/></div>}
            className="responsive-grid"
          >
            {projectsData?.map((item) => {
              return (
                <ProjectCard
                  key={item?._id || item?.id}
                  data={item}
                  isExpanded={false}
                />
              );
            })}
          </InfiniteScroll>
        </ResponsiveGrid>
      )}
    </ProjectsContainer>
  );
};

export default InternalProjects;