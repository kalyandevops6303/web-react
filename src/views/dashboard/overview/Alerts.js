import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardText, CardTitle, Progress } from 'reactstrap';
import { AlertCardWrapper } from './style';
import getNotifications from '../../../redux/actions/notificationsActions';
import { clearNotificationsData } from '../../../redux/reducers/notifications';
import { notifications } from '../../../redux/selectors/notificationsSelectors';
import { profilePercentage, userData } from '../../../redux/selectors/dashboardSelectors';
import { getProfilePercentage } from '../../../redux/actions/dashboardActions';
import { giveProgressBarColorClassName } from '../../../utility/Utils';
import { returnCompleteProfileDetailsCta } from '../../../utility/constants/CompleteProfileDetailsCta';
import { userTypes } from '../../../utility/constants/Constant';

const Alerts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNotifications('', 1, 10, []));
    dispatch(getProfilePercentage());

    return () => dispatch(clearNotificationsData());
  }, []);

  const notificationsData = useSelector(notifications);
  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);

  const onAddDetailsClick = (path) => {
    navigate(path, {
      state: { isEditing: true },
    });
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
        {userDetailsData?.user_type !== userTypes.team && (
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
              {returnCompleteProfileDetailsCta(userDetailsData?.user_type, profilePercentageData?.values_missing) && (
                <CardText
                  className="card-text font-medium-2 mt-2 mb-0 text-primary text-center cursor-pointer"
                  onClick={() =>
                    onAddDetailsClick(
                      returnCompleteProfileDetailsCta(userDetailsData?.user_type, profilePercentageData?.values_missing)
                        ?.path,
                    )
                  }
                >
                  {
                    returnCompleteProfileDetailsCta(userDetailsData?.user_type, profilePercentageData?.values_missing)
                      ?.label
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
        {userDetailsData?.user_type === userTypes.team && (
          <CardBody className="d-flex justify-content-center align-items-center">
            <CardText className="text-center card-text font-small-4 mt-20 mb-2 text-primary">None available</CardText>
          </CardBody>
        )}
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
        {userDetailsData?.user_type === userTypes.talent && (
          <>
            <Card className="card-inside">
              <CardHeader>
                <CardTitle tag="h4">Project Invitations</CardTitle>
              </CardHeader>
              <CardBody>
                {notificationsData?.data?.length > 0 ? (
                  <div>
                    {notificationsData?.data?.slice(0, 3)?.map((item) => (
                      <div key={item?._id} className="mb-1">
                        <div className="d-flex justify-content-between">
                          <CardText className="font-medium-2 fw-bold m-0">{item?.title}</CardText>
                          <p className="font-small-2 fw-light m-0">
                            {item?.created_at ? DateTime?.fromMillis(item?.created_at)?.toRelative() : '-'}
                          </p>
                        </div>
                        <p className="font-small-4 m-0">{item?.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <CardText className="text-center card-text font-medium-1 fw-bold mt-20 mb-2 text-primary">
                    No invitations !
                  </CardText>
                )}
              </CardBody>
            </Card>
            <Card className="card-inside d-none">
              <CardHeader>
                <CardTitle tag="h4">Team Invitations</CardTitle>
              </CardHeader>
              <CardBody className="d-flex justify-content-center align-items-center">
                <CardText className="text-center card-text font-small-3 mt-20 mb-2 text-primary">
                  None received
                </CardText>
              </CardBody>
            </Card>
          </>
        )}
      </Card>
    </AlertCardWrapper>
  );
};

export default Alerts;
