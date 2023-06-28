import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardText, CardTitle, Progress } from 'reactstrap';
import { AlertCardWrapper } from './style';
import getNotifications from '../../../redux/actions/notificationsActions';
import { clearNotificationsData } from '../../../redux/reducers/notifications';
import { notifications } from '../../../redux/selectors/notificationsSelectors';
import { userData } from '../../../redux/selectors/dashboardSelectors';

const Alerts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications('', 1, 10, []));

    return () => dispatch(clearNotificationsData());
  }, []);

  const notificationsData = useSelector(notifications);
  const userDetailsData = useSelector(userData);

  return (
    <AlertCardWrapper>
      <Card>
        <CardHeader className="earning-head">
          <CardTitle tag="h4">Alerts</CardTitle>
          <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">
            <Link to="/notifications">View All</Link>
          </CardText>
        </CardHeader>
        <Card className="card-inside">
          <CardHeader>
            <CardTitle tag="h4">Profile Completion!</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText className="mb-50">
              Make it easier for others to find you by <br /> completing your profile.
            </CardText>
            <span className="font-weight-bold percentage ">45%</span>
            <Progress style={{ height: '0.5rem' }} className="progress-bar-success mt-25" value={45} />
            <div className="mt-2 font-weight-normal text-center text-primary add-det mt-25">
              Add your Availability 15%.
            </div>
          </CardBody>
        </Card>

        <Card className="card-inside">
          <CardHeader>
            <CardTitle tag="h4">Upcoming Projects</CardTitle>
          </CardHeader>
          <CardBody className="d-flex justify-content-center align-items-center">
            <CardText className="text-center card-text font-medium-1 fw-bold mt-20 mb-2 text-primary">
              No projects !
            </CardText>
          </CardBody>
        </Card>

        {userDetailsData?.user_type === 'CLIENT' && (
          <>
            <Card className="card-inside">
              <CardHeader>
                <CardTitle tag="h4">Bid Submitted</CardTitle>
              </CardHeader>
              <CardBody className="d-flex justify-content-center align-items-center">
                <CardText className="text-center card-text font-medium-1 fw-bold mt-20 mb-2 text-primary">
                  No bids !
                </CardText>
              </CardBody>
            </Card>
            <Card className="card-inside">
              <CardHeader>
                <CardTitle tag="h4">Upcoming Payments</CardTitle>
              </CardHeader>
              <CardBody className="d-flex justify-content-center align-items-center">
                <CardText className="text-center card-text font-medium-1 fw-bold mt-20 mb-2 text-primary">
                  No payments !
                </CardText>
              </CardBody>
            </Card>
          </>
        )}

        {userDetailsData?.user_type === 'TALENT' && (
          <>
            <Card className="card-inside">
              <CardHeader>
                <CardTitle tag="h4">Project Invitations</CardTitle>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>
            <Card className="card-inside">
              <CardHeader>
                <CardTitle tag="h4">Team Invitations</CardTitle>
              </CardHeader>
              <CardBody className="d-flex justify-content-center align-items-center">
                <CardText className="text-center card-text font-medium-1 fw-bold mt-20 mb-2 text-primary">
                  No invitations !
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
