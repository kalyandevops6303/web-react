import { Briefcase, Calendar, Check, DollarSign } from 'react-feather';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { divide } from 'lodash';
import { Col, Row } from 'reactstrap';
import Statbox from './overview/Statbox';
import LeftSidebarProfile from './overview/LeftSidebarProfile';
import UserBio from './overview/UserBio';
import RecentProjects from './overview/RecentProjects';
import Reviews from './overview/Reviews';
import { getProfile } from '../../redux/actions/profileActions';
import { selectCurrentProfile } from '../../redux/selectors/profileSelectors';
import { getItem } from '../../utility/localStorageControl';

const UserDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    dispatch(getProfile(param?.userId, param?.userType.toUpperCase()));
  }, []);

  const isClient = param?.userType.toUpperCase() === 'CLIENT';
  const currentProfile = useSelector(selectCurrentProfile);
  const userData = getItem('userData');

  const calculateAvailableHoursPerWeek = (availability) => {
    // Calculate weekday hours per week
    const weekdayStartTime = parseInt(availability?.weekdays_avl?.start_time, 10);
    const weekdayEndTime = parseInt(availability?.weekdays_avl?.end_time, 10);
    const weekdayDurationPerDay = weekdayEndTime - weekdayStartTime;
    const weekdaysPerWeek = availability?.weekdays_avl?.days.length;
    const weekdayHoursPerWeek = weekdayDurationPerDay * weekdaysPerWeek;

    // Check if weekends_avl property exists
    if (availability?.weekends_avl) {
      const weekendStartTime = parseInt(availability.weekends_avl.start_time, 10);
      const weekendEndTime = parseInt(availability.weekends_avl.end_time, 10);
      const weekendDurationPerDay = weekendEndTime - weekendStartTime;
      const weekendsPerWeek = availability.weekends_avl.days.length;
      const weekendHoursPerWeek = weekendDurationPerDay * weekendsPerWeek;

      // Calculate total available hours per week
      const totalHoursPerWeek = weekdayHoursPerWeek + weekendHoursPerWeek;

      return totalHoursPerWeek;
    }
    // Calculate total available hours per week without weekends
    return weekdayHoursPerWeek;
  };

  return (
    <>
      <BreadCrumbs data={[{ title: currentProfile?.first_name || 'User' }]} />
      <Row>
        <Col lg="3">
          <LeftSidebarProfile isClient={isClient} data={currentProfile} isEditable={userData?._id === param?.userId} />
        </Col>
        <Col lg="9">
          <Row>
            <Col lg="3">
              <Statbox title="-" desc="Completed Projects" icon={<Check height={20} />} color="light-success" />
            </Col>
            {!isClient && (
              <Col lg="3">
                <Statbox
                  title={`$${currentProfile?.hourly_rate}`}
                  desc="Hourly Billing Rate"
                  icon={<DollarSign height={20} />}
                  color="light-warning"
                />
              </Col>
            )}
            {!isClient && (
              <Col lg="3">
                <Statbox
                  title={`${divide(currentProfile?.work_experience, 12)}yr`}
                  desc="Work Experience"
                  icon={<Briefcase height={20} />}
                  color="light-warning"
                />
              </Col>
            )}
            <Col lg="3">
              <Statbox
                title={
                  <>
                    {calculateAvailableHoursPerWeek(currentProfile?.availability) || 0} hours/week <br />{' '}
                    {currentProfile?.availability?.timezone?.abbreviation} (
                    {currentProfile?.availability?.timezone?.offset_name})
                  </>
                }
                desc="Availability"
                icon={<Calendar height={20} />}
                color="light-primary"
              />
            </Col>
          </Row>
          <Row>
            <UserBio data={currentProfile} isClient={isClient} isEditable={userData?._id === param?.userId} />
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
