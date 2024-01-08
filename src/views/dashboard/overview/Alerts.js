import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, CardBody, CardHeader, CardText, CardTitle, Progress } from 'reactstrap';
import { AlertCardWrapper } from './style';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import { getAlerts, getProfilePercentage, getTeamProfilePercentage } from '../../../redux/actions/dashboardActions';
import { getTeamId, giveProgressBarColorClassName } from '../../../utility/Utils';
import { returnCompleteProfileDetailsCta } from '../../../utility/constants/CompleteProfileDetailsCta';
import { clubStatus, userTypes } from '../../../utility/constants/Constant';
import SwitchConfirmModal from '../../modals/SwitchConfirm';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { CustomBadge, Elevate } from '../../styled';

const NOTI = [
  {
    _id: '6594222f8132f14462d6825e',
    created_at: 1704206895747,
    updated_at: 1704206895747,
    is_deleted: false,
    notification_type: 'PAYMENT_REQUEST_FOR_CLIENT',
    title: 'Payment Request',
    priority: 1,
    trigger_type: 'MANUAL',
    path: '/project-details/657a9db38d6f34065659fec3/bid?entity=TALENT',
    status: 'UNREAD',
    topic: 'u64e843f347a11f69d95a8f7b',
    metadata: {
      project_id: '657a9db38d6f34065659fec3',
      project_name: 'Comprehensive Audio Book Platform',
      client_name: 'Vighnesh Client',
      talent_name: 'Jack jones',
      bid_id: '6593c78e19be5191f556237d',
      switch_team_id: '',
      entity: 'TALENT',
      entity_name: 'Jack jones',
      document_id: '6593dc82839a1f5b0995a46e',
    },
    to_entity: {
      user_id: '64e843f347a11f69d95a8f7b',
      user_type: 'CLIENT',
    },
    message: 'Please make the initial payment.',
    from_entity: {
      user_id: '64d60539e127974f873d31d8',
      user_type: 'TALENT',
    },
  },
  {
    _id: '6594222f8132f14462d6825e',
    created_at: 1704206895747,
    updated_at: 1704206895747,
    is_deleted: false,
    notification_type: 'PAYMENT_REQUEST_FOR_CLIENT',
    title: 'Payment Request For Client',
    priority: 2,
    trigger_type: 'MANUAL',
    path: '/project-details/657a9db38d6f34065659fec3/bid?entity=TALENT',
    status: 'UNREAD',
    topic: 'u64e843f347a11f69d95a8f7b',
    metadata: {
      project_id: '657a9db38d6f34065659fec3',
      project_name: 'Comprehensive Audio Book Platform',
      client_name: 'Vighnesh Client',
      talent_name: 'Jack jones',
      bid_id: '6593c78e19be5191f556237d',
      switch_team_id: '',
      entity: 'TALENT',
      entity_name: 'Jack jones',
      document_id: '6593dc82839a1f5b0995a46e',
    },
    to_entity: {
      user_id: '64e843f347a11f69d95a8f7b',
      user_type: 'CLIENT',
    },
    message: 'Please make the initial payment for the project: Comprehensive Audio Book Platform, to begin.',
    from_entity: {
      user_id: '64d60539e127974f873d31d8',
      user_type: 'TALENT',
    },
  },
  {
    _id: '6594222f8132f14462d6825e',
    created_at: 1704206895747,
    updated_at: 1704206895747,
    is_deleted: false,
    notification_type: 'PAYMENT_REQUEST_FOR_CLIENT',
    title: 'Team Join Request',
    priority: 3,
    trigger_type: 'MANUAL',
    path: '/project-details/657a9df48d6f34065659fec8/bid?entity=TEAM&switch_team_id=6555ecbe24bdfe4c836a7e27',
    status: 'UNREAD',
    topic: 'u64e843f347a11f69d95a8f7b',
    metadata: {
      project_id: '657a9df48d6f34065659fec8',
      project_name: 'Comprehensive Audio Book Platform',
      client_name: 'Vighnesh Client',
      talent_name: 'Jack jones',
      bid_id: '6593c78e19be5191f556237d',
      switch_team_id: '6555ecbe24bdfe4c836a7e27',
      entity: 'TALENT',
      entity_name: 'Jack jones',
      document_id: '6593dc82839a1f5b0995a46e',
    },
    to_entity: {
      user_id: '64e843f347a11f69d95a8f7b',
      user_type: 'CLIENT',
    },
    message: 'You have got a new team join request.',
    from_entity: {
      user_id: '64d60539e127974f873d31d8',
      user_type: 'TALENT',
    },
  },
  {
    _id: '6594222f8132f14462d6825e',
    created_at: 1704206895747,
    updated_at: 1704206895747,
    is_deleted: false,
    notification_type: 'PAYMENT_REQUEST_FOR_CLIENT',
    title: 'Milestone Submitted',
    priority: 4,
    trigger_type: 'MANUAL',
    path: '/project-details/655d9cc23c57c3bfbb03ef21/bid?entity=TEAM&switch_team_id=64ff01b2f2e6af73ce49c45c',
    status: 'UNREAD',
    topic: 'u64e843f347a11f69d95a8f7b',
    metadata: {
      project_id: '655d9cc23c57c3bfbb03ef21',
      project_name: 'Comprehensive Audio Book Platform',
      client_name: 'Vighnesh Client',
      talent_name: 'Jack jones',
      bid_id: '6593c78e19be5191f556237d',
      switch_team_id: '64ff01b2f2e6af73ce49c45c',
      entity: 'TEAM',
      entity_name: 'Jack jones',
      document_id: '6593dc82839a1f5b0995a46e',
    },
    to_entity: {
      user_id: '64e843f347a11f69d95a8f7b',
      user_type: 'CLIENT',
    },
    message: 'Milestone for the project: Comprehensive Audio Book Platform is submitted.',
    from_entity: {
      user_id: '64d60539e127974f873d31d8',
      user_type: 'TALENT',
    },
  },
];

const Alerts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [switchProfileModal, setSwitchProfileModal] = useState(false);
  const [switchData, setSwitchData] = useState();
  const userDetailsData = useSelector(selectUserData);
  const profilePercentageData = useSelector(profilePercentage);
  const alerts = useSelector((state) => state.dashboard.alerts);

  const isProfileCompleted = profilePercentageData?.profile_completed === 100;
  const talentOrClientProfile =
    userDetailsData?.user_type === userTypes.talent || userDetailsData?.user_type === userTypes.talent;

  const isDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW;

  useEffect(() => {
    dispatch(getAlerts());
    if (userDetailsData?.user_type === userTypes.team && getTeamId('team_id')) {
      dispatch(getTeamProfilePercentage());
    } else {
      dispatch(getProfilePercentage());
    }
  }, [userDetailsData]);

  const onAddDetailsClick = (path) => {
    navigate(path, {
      state: { isEditing: true },
    });
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

  const handleAlertClick = (path) => {
    const switch_team_id = path?.split('switch_team_id=')[1];
    if (userDetailsData?.user_type === userTypes.talent && path.includes('switch_team_id')) {
      setSwitchData({
        entity: switch_team_id ? 'TEAM' : 'TALENT',
        navigateTo: path?.split('?')[0],
        switchTeamId: switch_team_id,
      });
      setSwitchProfileModal(true);
    } else {
      navigate(path?.split('?')[0]);
    }
  };

  const handleRedirection = () => {
    navigate('/notifications');
  };

  return (
    <AlertCardWrapper>
      <Card>
        <CardHeader className="earning-head">
          <CardTitle tag="h4">Alerts</CardTitle>
          {isDisabled ? (
            <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-muted cursor-not-allowed">
              View All
            </CardText>
          ) : (
            <Link to="/notifications">
              <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary cursor-pointer">
                View All
              </CardText>
            </Link>
          )}
        </CardHeader>
        {!isProfileCompleted && (
          <Card className="card-inside">
            <CardHeader>
              <CardTitle tag="h4">Profile Completion!</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText className="mb-50">
                Make it easier for others to find you by <br /> completing your profile.
              </CardText>
              <span className="font-weight-bold percentage ">{profilePercentageData?.profile_completed}%</span>
              <Progress
                style={{ height: '0.5rem' }}
                className={`${giveProgressBarColorClassName(profilePercentageData?.profile_completed)} mt-25`}
                value={profilePercentageData?.profile_completed}
              />
              {returnCompleteProfileDetailsCta(
                talentOrClientProfile ? userDetailsData?.user_type : userDetailsData?.team_type,
                profilePercentageData?.values_missing,
              ) && (
                <CardText
                  className="card-text font-medium-2 mt-2 mb-0 text-primary text-center cursor-pointer"
                  onClick={() =>
                    onAddDetailsClick(
                      returnCompleteProfileDetailsCta(
                        talentOrClientProfile ? userDetailsData?.user_type : userDetailsData?.team_type,
                        profilePercentageData?.values_missing,
                      )?.path,
                    )
                  }
                >
                  {
                    returnCompleteProfileDetailsCta(
                      talentOrClientProfile ? userDetailsData?.user_type : userDetailsData?.team_type,
                      profilePercentageData?.values_missing,
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

          {NOTI &&
            NOTI?.map((item) => (
              <Card onClick={() => handleAlertClick(item?.path)} key={item?._id} className="cursor-pointer card-inside">
                <Elevate key={item?._id}>
                  <CardHeader className="d-flex">
                    <CardTitle tag="h4">{getStatusShortName(item?.title)}</CardTitle>
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

          {alerts &&
            alerts?.alerts?.data.map((item) => (
              <Card onClick={() => handleAlertClick(item?.path)} key={item?._id} className="cursor-pointer card-inside">
                <Elevate key={item?._id}>
                  <CardHeader className="d-flex">
                    <CardTitle tag="h4">{getStatusShortName(item?.title)}</CardTitle>
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
          {alerts?.alerts?.metadata?.total_records > 4 && (
            <span onClick={handleRedirection} className="cursor-pointer mb-1 additional-text text-center d-block">
              +{alerts.alerts.metadata.total_records - 4} more
            </span>
          )}
        </div>
      </Card>
      {switchProfileModal && (
        <SwitchConfirmModal
          entity={switchData?.entity}
          navigateTo={switchData?.navigateTo}
          switchTeamId={switchData?.switchTeamId}
          modal={switchProfileModal}
          toggleModal={() => setSwitchProfileModal(!switchProfileModal)}
        />
      )}
    </AlertCardWrapper>
  );
};

export default Alerts;
