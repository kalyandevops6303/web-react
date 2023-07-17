import { Briefcase, Calendar, Check, DollarSign } from 'react-feather';
import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Row } from 'reactstrap';
import Statbox from './overview/Statbox';
import round from '../../lib/round';
import capitalize from '../../lib/capitalize';

import LeftSidebarProfile from './overview/LeftSidebarProfile';
import UserBio from './overview/UserBio';
import RecentProjects from './overview/RecentProjects';
import Reviews from './overview/Reviews';
import { getProfile } from '../../redux/actions/profileActions';
import { selectCurrentProfile, selectError, selectLoading } from '../../redux/selectors/profileSelectors';
import { getItem } from '../../utility/localStorageControl';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { clearData } from '../../redux/reducers/profile';
import Error from '../Error';
import { userTypes } from '../../utility/constants/Constant';

const UserDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const location = useLocation();

  useEffect(() => {
    dispatch(clearData());
    // eslint-disable-next-line no-undef
    window?.scrollTo(0, 0);
    dispatch(getProfile(param?.userId, param?.userType.toUpperCase()));
  }, []);

  const isClient = param?.userType.toUpperCase() === userTypes.client;
  const currentProfile = useSelector(selectCurrentProfile);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const userData = getItem('userData');

  const calculateAvailableHoursPerWeek = (availability) => {
    // Calculate weekday hours per week
    let weekdayHoursPerWeek = 0;
    let weekendHoursPerWeek = 0;

    if (availability?.weekdays_avl?.days) {
      const weekdayStartTime = parseInt(availability?.weekdays_avl?.start_time, 10);
      const weekdayEndTime = parseInt(availability?.weekdays_avl?.end_time, 10);
      const weekdayDurationPerDay = weekdayEndTime - weekdayStartTime;
      const weekdaysPerWeek = availability?.weekdays_avl?.days?.length;
      weekdayHoursPerWeek = weekdayDurationPerDay * weekdaysPerWeek;
    }

    // Check if weekends_avl property exists
    if (availability?.weekends_avl?.days) {
      const weekendStartTime = parseInt(availability.weekends_avl.start_time, 10);
      const weekendEndTime = parseInt(availability.weekends_avl.end_time, 10);
      const weekendDurationPerDay = weekendEndTime - weekendStartTime;
      const weekendsPerWeek = availability?.weekends_avl?.days.length;
      weekendHoursPerWeek = weekendDurationPerDay * weekendsPerWeek;
    }

    const totalHoursPerWeek = weekdayHoursPerWeek + weekendHoursPerWeek;
    return totalHoursPerWeek;
  };

  const calculateYearsFromMonths = (totalMonths) => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const combined = `${years}y ${months}m`;
    return combined;
  };

  const defaultBreadCrumb = [{ title: currentProfile?.first_name || 'User' }];
  const dynamicBreadCrumb = [
    { title: capitalize(location?.state?.from), link: location?.state?.link },
    { title: currentProfile?.first_name || 'User' },
  ];

  if (loading) {
    return <ComponentSpinner />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <BreadCrumbs data={location?.state?.from ? dynamicBreadCrumb : defaultBreadCrumb} />
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
                  title={`${currentProfile?.currency_preference?.code} ${currentProfile?.hourly_rate}`}
                  desc="Hourly Billing Rate"
                  icon={<DollarSign height={20} />}
                  color="light-warning"
                />
              </Col>
            )}
            {!isClient && (
              <Col lg="3">
                <Statbox
                  title={`${calculateYearsFromMonths(currentProfile?.work_experience)}`}
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
                    {calculateAvailableHoursPerWeek(currentProfile?.availability) < 0
                      ? 0
                      : round(calculateAvailableHoursPerWeek(currentProfile?.availability), 2)}{' '}
                    hours/week <br /> {currentProfile?.availability?.timezone?.abbreviation} (
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
