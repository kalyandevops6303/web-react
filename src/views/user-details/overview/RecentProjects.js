import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import TeamNoDataGif from '@src/assets/images/emptyGif.gif';
import { RecentProjectsWrap } from './style';
import Project from './Project';
import { getRecentProjects } from '../../../redux/actions/profileActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const RecentProjects = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const [hasMore, setHasMore] = useState(true);
  const recentProjectsMetadata = useSelector((state) => state.currentProfile.userRecentProjectMetaData);
  const recentProjectCurrentPreview = useSelector((state) => state.currentProfile.userRecentProjectCurrentPreview);
  const isLoading = useSelector((state) => state.currentProfile.isRecentProjectLoading);
  const recentProjectData = useSelector((state) => state.currentProfile.userRecentProject);
  const metadata = { page: 1, page_size: 10 };

  useEffect(() => {
    dispatch(
      getRecentProjects({
        user_id: param?.userId,
        entity: param?.userType === 'CLUB' ? 'TEAM' : param?.userType.toUpperCase(),
        metadata,
      }),
    );
  }, []);

  useEffect(() => {
    setHasMore(true);
    if (
      recentProjectCurrentPreview?.length === 0 ||
      recentProjectData?.length === recentProjectsMetadata?.total_records
    ) {
      setHasMore(false);
    }
  }, [recentProjectCurrentPreview]);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: recentProjectsMetadata?.current_page + 1 || 1,
    };
    dispatch(
      getRecentProjects({
        user_id: param?.userId,
        entity: param?.userType === 'CLUB' ? 'TEAM' : param?.userType.toUpperCase(),
        metadata: newMeteData,
      }),
    );
  };
  if (isLoading) {
    return (
      <RecentProjectsWrap>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between">
              <CardTitle className="fw-bolder">Recent Projects</CardTitle>
            </div>
            <ComponentSpinner />
          </CardBody>
        </Card>
      </RecentProjectsWrap>
    );
  }

  return (
    <RecentProjectsWrap>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle className="fw-bolder">Recent Projects</CardTitle>
          </div>

          {recentProjectData?.length > 0 ? (
            <div id="scrollableRecentProject" style={{ height: '40rem', overflowY: 'auto' }}>
              <InfiniteScroll
                style={{ padding: '1rem' }}
                dataLength={recentProjectData?.length}
                next={fetchMore}
                hasMore={hasMore}
                scrollableTarget="scrollableRecentProject"
                loader={<div className="d-flex justify-content-center">Loading...</div>}
              >
                <Row>
                  {recentProjectData?.map((item) => (
                    <Col key={item?._id} lg="6" sm="12">
                      <Project
                        data={item}
                        role={item?.role}
                        rating={item?.rating}
                        userType={param?.userType === 'CLUB' ? 'TEAM' : param?.userType.toUpperCase()}
                        title={item?.details?.name}
                        desc={item?.details?.description}
                      />
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
            </div>
          ) : (
            <>
              <img src={TeamNoDataGif} width={230} height={230} className="d-flex empty-gif m-auto" alt="empty-gif" />
              <div className="empty mb-1 font-weight-bolder text-center text-primary project-cta cursor-pointer">
                No projects found
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </RecentProjectsWrap>
  );
};
RecentProjects.propTypes = {};
RecentProjects.defaultProps = {};
export default RecentProjects;
