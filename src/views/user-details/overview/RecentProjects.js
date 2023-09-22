import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import TeamNoDataGif from '@src/assets/images/emptyGif.gif';
import { RecentProjectsWrap } from './style';
import Project from './Project';
import { getRecentProjects } from '../../../redux/actions/profileActions';

const RecentProjects = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const recentProjectData = useSelector((state) => state.currentProfile.userRecentProject);
  const metadata = { page: 1, page_size: 10 };

  useEffect(() => {
    dispatch(getRecentProjects({ user_id: param?.userId, entity: param?.userType.toUpperCase(), metadata }));
  }, []);

  return (
    <RecentProjectsWrap>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle className="fw-bolder">Recent Projects</CardTitle>
          </div>

          {recentProjectData?.data?.length > 0 ? (
            <div style={{ height: '40rem', overflowY: 'auto', padding: '0.8rem' }}>
              <Row>
                {recentProjectData?.data?.map((item) => (
                  <Col key={item?._id} lg="6" sm="12">
                    <Project
                      data={item}
                      role={item?.role}
                      rating={item?.rating}
                      userType={param?.userType.toUpperCase()}
                      title={item?.details?.name}
                      desc={item?.details?.description}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <>
              <img src={TeamNoDataGif} width={230} height={230} className="d-flex empty-gif m-auto" alt="empty-gif" />
              <div className="empty mb-1 font-weig ht-normal text-center text-primary project-cta cursor-pointer">
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
