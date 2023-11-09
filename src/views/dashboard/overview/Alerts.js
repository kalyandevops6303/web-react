import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, CardBody, CardHeader, CardText, CardTitle, Progress } from 'reactstrap';
import { AlertCardWrapper } from './style';
import { profilePercentage } from '../../../redux/selectors/dashboardSelectors';
import { getAlerts, getProfilePercentage, getTeamProfilePercentage } from '../../../redux/actions/dashboardActions';
import { giveProgressBarColorClassName } from '../../../utility/Utils';
import { returnCompleteProfileDetailsCta } from '../../../utility/constants/CompleteProfileDetailsCta';
import { userTypes } from '../../../utility/constants/Constant';
import SwitchConfirmModal from '../../modals/SwitchConfirm';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import { CustomBadge } from '../../styled';

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

  useEffect(() => {
    dispatch(getAlerts());
    if (userDetailsData?.user_type === userTypes.team) {
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

  const isDisputesNotification = (type) => {
    switch (type) {
      case 'Dispute Created':
        return true;
      case 'Dispute Replied!':
        return true;
      case 'Dispute Resolved!':
        return true;
      default:
        return false;
    }
  };

  const isReqeustFlowStatus = (status) => {
    switch (status) {
      case 'Project Invitation Request':
        return true;
      case 'Team Invitation Request':
        return true;
      case 'Club Invitation Request':
        return true;
      case 'Project Team Invitation Request':
        return true;
      case 'Project Club Invitation Request':
        return true;
      case 'Team Join Request':
        return true;
      case 'Membership Updated':
        return true;
      case 'Club - Request Submitted':
        return true;

      default:
        return false;
    }
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
  const redirectionFunction = ({ projectId, inviteId, status }) => {
    if (status === 'Project Invitation Request' && projectId && inviteId) {
      navigate(`/project-details/${projectId}/project/project-invitation-by-client/${inviteId}`);
    } else if (status === 'Team Invitation Request' && inviteId) {
      navigate(`/team-invitation/${inviteId}`);
    } else if (status === 'Club Invitation Request' && inviteId) {
      navigate(`/club-invitation/${inviteId}`);
    } else if (status === 'Project Team Invitation Request' && projectId && inviteId) {
      navigate(`/project-details/${projectId}/project/project-invitation/${inviteId}`);
    } else if (status === 'Project Club Invitation Request' && projectId && inviteId) {
      navigate(`/project-details/${projectId}/project/project-invitation/${inviteId}`);
    } else if (status === 'Team Join Request' && inviteId) {
      navigate(`/join-request/${inviteId}`);
    } else if (status === 'Membership Updated') {
      navigate('/dashboard');
    } else if (status === 'Club - Request Submitted') {
      navigate('/dashboard');
    } else {
      navigate(`/project-details/${projectId}/bid`);
    }
  };

  const disputesAlertRedirection = (type) => {
    if (type === 'Dispute Created' || type === 'Dispute Replied!') {
      navigate(`/disputes/open`);
    } else if (type === 'Dispute Resolved!') {
      navigate(`/disputes/resolved`);
    } else {
      navigate(`/disputes/open`);
    }
  };

  const handleView = (data) => {
    // setSwitchProfileModal(true);

    setSwitchData({ ...data, isDisputeAlert: isDisputesNotification(data?.title) });

    if (userDetailsData?.user_type === userTypes.talent && data?.custom_payload?.switch_team_id) {
      setSwitchProfileModal(true);
    } else if (isReqeustFlowStatus(data?.title)) {
      redirectionFunction({
        status: data?.title,
        projectId: data?.custom_payload?.request_for?.project_id,
        inviteId: data?.custom_payload?.request_id,
      });
    } else if (isDisputesNotification(data?.title)) {
      disputesAlertRedirection(data?.title);
    } else {
      redirectionFunction({ projectId: data?.custom_payload?.project_id });
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
          <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">
            <Link to="/notifications">View All</Link>
          </CardText>
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

          {alerts &&
            alerts?.alerts?.data.map((item) => (
              <Card key={item?._id} className="card-inside">
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
                      <CardText className="cursor-pointer text-primary" onClick={() => handleView(item)}>
                        View
                      </CardText>
                    </div>
                  </div>
                </CardBody>
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
          data={switchData}
          modal={switchProfileModal}
          toggleModal={() => setSwitchProfileModal(!switchProfileModal)}
          disputesAlertRedirection={disputesAlertRedirection}
        />
      )}
    </AlertCardWrapper>
  );
};

export default Alerts;
