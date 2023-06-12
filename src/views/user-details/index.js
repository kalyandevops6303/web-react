import { Briefcase, Calendar, Check, DollarSign } from 'react-feather';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Row } from 'reactstrap';
import Statbox from './overview/Statbox';
import LeftSidebarProfile from './overview/LeftSidebarProfile';
import UserBio from './overview/UserBio';
import RecentProjects from './overview/RecentProjects';
import Reviews from './overview/Reviews';
import { getProfile } from '../../redux/actions/profileActions';
import { getItem } from '../../utility/localStorageControl';
import { selectCurrentProfile } from '../../redux/selectors/profileSelectors';

const UserDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const userData = getItem('userData');

  useEffect(() => {
    dispatch(getProfile(param?.userId, param?.userType.toUpperCase()));
  }, []);

  const currentProfile = useSelector(selectCurrentProfile);

  return (
    <>
      <BreadCrumbs data={[{ title: 'User' }]} />
      <Row>
        <Col lg="3">
          <LeftSidebarProfile data={currentProfile} isEditable={userData?._id === param?.userId} />
        </Col>
        <Col lg="9">
          <Row>
            <Col>
              <Statbox title="56" desc="Completed Projects" icon={<Check height={20} />} color="light-success" />
            </Col>
            <Col>
              <Statbox title="$50" desc="Hourly Billing Rate" icon={<DollarSign height={20} />} color="light-warning" />
            </Col>
            <Col>
              <Statbox title="10 yr" desc="Work Experience" icon={<Briefcase height={20} />} color="light-warning" />
            </Col>
            <Col>
              <Statbox
                title={
                  <>
                    25 hours/week <br /> US PST (+9:00 UTC)
                  </>
                }
                desc="Availability"
                icon={<Calendar height={20} />}
                color="light-primary"
              />
            </Col>
          </Row>
          <Row>
            <UserBio isEditable={userData?._id === param?.userId} />
          </Row>
          <Row>
            <RecentProjects isEditable={userData?._id === param?.userId} />
          </Row>
          <Row>
            <Reviews />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default UserDetails;
