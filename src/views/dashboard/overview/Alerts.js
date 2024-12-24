import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, CardBody, CardHeader, CardText, CardTitle, Progress } from 'reactstrap';
import { AlertCardWrapper } from './style';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import { getProfilePercentage, getTeamProfilePercentage } from '../../../redux/actions/dashboardActions';
import { giveProgressBarColorClassName } from '../../../utility/Utils';
import { returnCompleteProfileDetailsCta } from '../../../utility/constants/CompleteProfileDetailsCta';
import { clubStatus, userTypes } from '../../../utility/constants/Constant';
import SwitchConfirmModal from '../../modals/SwitchConfirm';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { CustomBadge, Elevate } from '../../styled';
import { setItemFromSession } from '../../../utility/sessesionStorageControl';
import { notifications } from '../../../redux/selectors/notificationsSelectors';
import { getAlertsNotifications, markNotificationAsRead } from '../../../redux/actions/notificationsActions';
import getTeamId from '../../../utility/commonUtils';
import { getItem } from '../../../utility/localStorageControl';
import { getProfileCompletionFlextern } from '../../../redux/actions/talentOnboardingActions';
import { isFlexternshipApp } from '@/configs/api/env';

const Alerts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [switchProfileModal, setSwitchProfileModal] = useState(false);
  const [switchData, setSwitchData] = useState();
  const userDetailsData = useSelector(selectUserData);
  const profilePercentageData = useSelector(profilePercentage);
  const notificationsData = useSelector(notifications);

  const profileCompletionFlextern = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed);
  const profileCompletionFlexternMissingValues = useSelector(
    (state) => state.auth?.profileCompletionFlextern?.values_missing,
  );

  const isProfileCompleted = profilePercentageData?.profile_completed === 100;
  const isFlexternProfileCompleted = profileCompletionFlextern === 100;
  const talentOrClientProfile =
    userDetailsData?.user_type === userTypes.talent || userDetailsData?.user_type === userTypes.client;

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;
  const isDelegate = getItem('isDelegate');
  useEffect(() => {
    dispatch(getAlertsNotifications({ priority: [1, 2], page: 1, pageSize: 4, oldData: [] }));

    if (userDetailsData?.user_type === userTypes.team && getTeamId('team_id')) {
      dispatch(getTeamProfilePercentage());
    } else if (isFlexternshipApp) {
      dispatch(getProfileCompletionFlextern());
    } else dispatch(getProfilePercentage());
  }, [userDetailsData?.user_type]);

  useEffect(() => {
    returnCompleteProfileDetailsCta(
      talentOrClientProfile ? userDetailsData?.user_type : userDetailsData?.team_type,
      profilePercentageData?.values_missing,
    );
  }, []);

  const onAddDetailsClick = (path) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    navigate(path);
  };

  const getStatusShortName = (status) => {
    switch (status) {
      case 'Project Invitation Request':
        return 'Project Invitation';

      case 'Team Invitation Request':
        return 'Team Invitation';

      case 'Club Invitation Request':
        return 'Club Invitation';

      case 'Project Team Invitation Request':
        return 'Project Invitation';

      case 'Project Club Invitation Request':
        return 'Project Invitation';

      case 'Team Join Request':
        return 'Join Request';

      default:
        return status;
    }
  };

  const handleAlertClick = (path, notificationId) => {
    // eslint-disable-next-line no-undef
    const url = new URL(`${window.location.protocol}//${window.location.host}${path}`);
    const params = url.searchParams;
    const switch_team_id = params.get('switch_team_id');
    if (
      userDetailsData?.user_type === userTypes.talent &&
      path.includes('switch_team_id') &&
      switch_team_id?.length > 0
    ) {
      setSwitchData({
        entity: switch_team_id ? 'TEAM' : 'TALENT',
        navigateTo: path?.split('?')[0],
        switchTeamId: switch_team_id,
        notificationId,
      });
      setSwitchProfileModal(true);
    } else {
      navigate(path?.split('?')[0]);
      if (notificationId) {
        dispatch(markNotificationAsRead(notificationId));
      }
    }
  };

  const handleRedirection = () => {
    navigate('/notifications');
  };

  return (
    <AlertCardWrapper>
      <Card>
        <CardHeader className="earning-head">
          <CardTitle tag="h5" style={{ fontSize: '18px' }}>
            Alerts
          </CardTitle>
          {isDisabled ? (
            <CardText className="text-decoration-underline view-all-cta card-text font-small-3 me-25 mb-0 text-muted cursor-not-allowed">
              View All
            </CardText>
          ) : (
            <Link to="/notifications">
              <CardText className="text-decoration-underline view-all-cta card-text font-small-3 me-25 mb-0 text-primary cursor-pointer">
                View All
              </CardText>
            </Link>
          )}
        </CardHeader>
        {!isProfileCompleted && !isDelegate && !isFlexternProfileCompleted && (
          <Card className="card-inside">
            <CardHeader>
              <CardTitle tag="h4">Profile Completion!</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText className="mb-50">
                Make it easier for others to find you by <br /> completing your profile.
              </CardText>
              <span className="font-weight-bold percentage ">
                {isFlexternshipApp ? profileCompletionFlextern : profilePercentageData?.profile_completed}%
              </span>
              <Progress
                style={{ height: '0.5rem' }}
                className={`${giveProgressBarColorClassName(
                  isFlexternshipApp ? profileCompletionFlextern : profilePercentageData?.profile_completed,
                )} mt-25`}
                value={isFlexternshipApp ? profileCompletionFlextern : profilePercentageData?.profile_completed}
              />
              {returnCompleteProfileDetailsCta(
                talentOrClientProfile ? userDetailsData?.user_type : userDetailsData?.team_type,
                isFlexternshipApp ? profileCompletionFlexternMissingValues : profilePercentageData?.values_missing,
              ) && (
                <CardText
                  className="card-text font-medium-2 mt-2 mb-0 text-primary text-center cursor-pointer"
                  onClick={() =>
                    onAddDetailsClick(
                      returnCompleteProfileDetailsCta(
                        talentOrClientProfile ? userDetailsData?.user_type : userDetailsData?.team_type,
                        isFlexternshipApp
                          ? profileCompletionFlexternMissingValues
                          : profilePercentageData?.values_missing,
                      )?.path,
                    )
                  }
                >
                  {
                    returnCompleteProfileDetailsCta(
                      talentOrClientProfile ? userDetailsData?.user_type : userDetailsData?.team_type,
                      isFlexternshipApp
                        ? profileCompletionFlexternMissingValues
                        : profilePercentageData?.values_missing,
                    )?.label
                  }
                </CardText>
              )}
            </CardBody>
          </Card>
        )}

        <Card className="card-inside d-none">
          <CardHeader>
            <CardTitle tag="h4">Upcoming Projects</CardTitle>
          </CardHeader>
          <CardBody className="d-flex justify-content-center align-items-center">
            <CardText className="text-center card-text font-small-4 mt-20 mb-2 text-primary">None available</CardText>
          </CardBody>
        </Card>

        {userDetailsData?.user_type === userTypes.client && (
          <>
            <Card className="card-inside d-none">
              <CardHeader>
                <CardTitle tag="h4">Bid Submitted</CardTitle>
              </CardHeader>
              <CardBody className="d-flex justify-content-center align-items-center">
                <CardText className="text-center card-text font-medium-1 fw-bold mt-20 mb-2 text-primary">
                  None available
                </CardText>
              </CardBody>
            </Card>
            <Card className="card-inside d-none">
              <CardHeader>
                <CardTitle tag="h4">Upcoming Payments</CardTitle>
              </CardHeader>
              <CardBody className="d-flex justify-content-center align-items-center">
                <CardText className="text-center card-text font-small-3 mt-20 mb-2 text-primary">
                  None scheduled
                </CardText>
              </CardBody>
            </Card>
          </>
        )}

        <div>
          <Card className="card-inside d-none">
            <CardHeader className="d-flex">
              <CardTitle tag="h4">Club - Request Submitted</CardTitle>
              <p className=" font-small-2 fw-light m-0">2 Hours ago</p>
            </CardHeader>
            <CardBody>
              <div className="d-flex justify-content-between">
                <p className="font-small-3 m-0"> The Intellectuals League</p>
                <div className="d-flex status-row">
                  <CustomBadge>
                    <Badge className="IN_REVIEW truncate-1" color="badge">
                      In Review
                    </Badge>
                  </CustomBadge>
                </div>
              </div>
            </CardBody>
          </Card>

          {notificationsData &&
            notificationsData?.data?.slice(0, 3).map((item) => (
              <Card
                onClick={() => handleAlertClick(item?.path, item?.status === 'UNREAD' ? item?._id : null)}
                key={item?._id}
                className="cursor-pointer card-inside"
              >
                <Elevate key={item?._id}>
                  <CardHeader className="d-flex">
                    <CardTitle className="w-65" tag="h4">
                      {getStatusShortName(item?.title)}
                    </CardTitle>
                    <p className="relative-time font-small-2 fw-light m-0 ms-50">
                      {item?.created_at ? DateTime?.fromMillis(item?.created_at)?.toRelative() : ''}
                    </p>
                  </CardHeader>
                  <CardBody>
                    <div key={item?._id}>
                      <div className="d-flex justify-content-between">
                        <p className="font-small-3 m-0">{item?.message || 'Name'}</p>
                        <CardText className="text-primary d-none">View</CardText>
                      </div>
                    </div>
                  </CardBody>
                </Elevate>
              </Card>
            ))}
          {notificationsData?.metadata?.total_records > 4 && (
            <span onClick={handleRedirection} className="cursor-pointer mb-1 additional-text text-center d-block">
              +{notificationsData.metadata.total_records - 4} more
            </span>
          )}
        </div>
      </Card>
      {switchProfileModal && (
        <SwitchConfirmModal
          entity={switchData?.entity}
          navigateTo={switchData?.navigateTo}
          switchTeamId={switchData?.switchTeamId}
          notificationId={switchData?.notificationId}
          modal={switchProfileModal}
          toggleModal={() => setSwitchProfileModal(!switchProfileModal)}
        />
      )}
    </AlertCardWrapper>
  );
};

export default Alerts;
