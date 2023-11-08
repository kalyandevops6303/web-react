import { Briefcase, Calendar, Check } from 'react-feather';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbs from '@components/breadcrumbs';
import { Col, Row } from 'reactstrap';
import MoneyIcon from '@src/assets/images/money.png';
import Statbox from './overview/Statbox';
import round from '../../lib/round';
import capitalize from '../../lib/capitalize';
import LeftSidebarProfile from './overview/LeftSidebarProfile';
import UserBio from './overview/UserBio';
import RecentProjects from './overview/RecentProjects';
import Reviews from './overview/Reviews';
import { getProfile } from '../../redux/actions/profileActions';
import { selectCurrentProfile, selectError, selectLoading } from '../../redux/selectors/profileSelectors';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { clearData } from '../../redux/reducers/profile';
import Error from '../Error';
import { userTypes } from '../../utility/constants/Constant';
import { selectAuthUserData } from '../../redux/selectors/authSelectors';
import { getItem } from '../../utility/localStorageControl';

const UserDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const userData = useSelector(selectAuthUserData);
  const recentProjectsMetadata = useSelector((state) => state.currentProfile.userRecentProjectMetaData);

  const isEditable = userData?._id === param?.userId;
  useEffect(() => {
    dispatch(clearData());
    // eslint-disable-next-line no-undef
    window?.scrollTo(0, 0);
    dispatch(getProfile(param?.userId, param?.userType.toUpperCase(), isEditable));
  }, []);

  const isClient = param?.userType.toUpperCase() === userTypes.client;
  const isTalentView = param?.userType.toUpperCase() === userTypes.talent;
  const isTeamView = param?.userType.toUpperCase() === userTypes.team;
  const isOwnProfile = param?.userId === userData?._id;

  const currentProfile = useSelector(selectCurrentProfile);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  // const userData = getItem('userData');

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

  const baseRoute = getItem('baseRoute');

  let secondaryRoute;

  if (baseRoute === 'marketplace') {
    secondaryRoute = getItem('selectedMarketplaceTab');
  } else if (baseRoute === 'projects') {
    secondaryRoute = getItem('selectedProjectTab');
  } else if (baseRoute === 'my-teams') {
    secondaryRoute = getItem('selectedMyTeamsTab');
  } else {
    secondaryRoute = null;
  }

  const baseRouteWithoutDash = baseRoute?.replace(/[-_]/g, ' ');
  const secondaryRouteWithoutDash = secondaryRoute?.replace(/[-_]/g, ' ');

  const defaultBreadCrumb = [
    { title: 'Profile', link: '#' },
    {
      title: isTeamView ? currentProfile?.name : `${currentProfile?.first_name} ${currentProfile?.last_name}` || 'User',
    },
  ];
  const dynamicBreadCrumb = [
    { title: capitalize(baseRouteWithoutDash), link: `/${baseRoute}` },
    ...(secondaryRoute
      ? [{ title: capitalize(secondaryRouteWithoutDash), link: `/${baseRoute}/${secondaryRoute}` }]
      : []),
    {
      title: isTeamView ? currentProfile?.name : `${currentProfile?.first_name} ${currentProfile?.last_name}` || 'User',
    },
  ];

  if (loading) {
    return <ComponentSpinner />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      {/* <BreadCrumbs data={location?.state?.from ? dynamicBreadCrumb : defaultBreadCrumb} /> */}
      <BreadCrumbs data={isOwnProfile ? defaultBreadCrumb : dynamicBreadCrumb} />
      <Row>
        <Col lg="3">
          <LeftSidebarProfile
            isTalentView={isTalentView}
            isTeamView={isTeamView}
            isClient={isClient}
            data={currentProfile}
            isEditable={userData?._id === param?.userId}
          />
        </Col>
        <Col lg="9">
          <Row>
            <Col lg="3">
              <Statbox
                title={recentProjectsMetadata?.total_records || 0}
                desc="Completed Projects"
                icon={<Check height={20} />}
                color="light-success"
              />
            </Col>
            {isTalentView && (
              <Col lg="3">
                <Statbox
                  title={`${currentProfile?.currency_preference?.code || ''} ${currentProfile?.hourly_rate || 0}`}
                  desc="Hourly Rate"
                  icon={<img src={MoneyIcon} height={22} alt="money" />}
                  color="light-warning"
                />
              </Col>
            )}
            {isTeamView && (
              <Col lg="3">
                <Statbox
                  title={`USD ${currentProfile?.total_project_value || 0}`}
                  desc="Total Project Value"
                  icon={<img src={MoneyIcon} height={22} alt="money" />}
                  color="light-warning"
                />
              </Col>
            )}
            {isTalentView && (
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
                    hours/week <br />
                    {currentProfile?.availability?.timezone?.abbreviation}(
                    {currentProfile?.availability?.timezone?.offset_name || 'Time zone'})
                  </>
                }
                desc="Availability"
                icon={<Calendar height={20} />}
                color="light-primary"
              />
            </Col>
          </Row>
          <Row>
            <UserBio
              data={currentProfile}
              isTalentView={isTalentView}
              isTeamView={isTeamView}
              isClient={isClient}
              isEditable={userData?._id === param?.userId}
            />
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
