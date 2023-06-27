import React from 'react';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import { Badge, Card, CardBody, Label } from 'reactstrap';
import { Bell } from 'react-feather';
import { BorderCardContainer, NotificationBadgeContainer } from './style';
import theme from '../../configs/themeVariables';

const Notifications = () => {
  const priorities = {
    p1: 'red',
    p2: 'green',
    p3: 'info',
    p4: 'secondary',
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Notifications</h2>
        <div className="mt-2">
          <Label>Priority</Label>
          <Select
            options={[
              { label: 'Priority 1', value: 'p1' },
              { label: 'Priority 2', value: 'p2' },
              { label: 'Priority 3', value: 'p3' },
              { label: 'Priority 4', value: 'p4' },
            ]}
            classNamePrefix="select"
            placeholder="Select priority"
            theme={selectThemeColors}
            className="react-select"
          />
        </div>
      </div>
      <div>
        <p className="fw-bold font-medium-1">TODAY</p>
        <BorderCardContainer priorityColor={priorities.p1}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <NotificationBadgeContainer priorityColor={priorities.p1}>
                    <div className="position-relative">
                      <Badge pill color="danger" className="badge-up" />
                      <Bell color={theme.white} size={18} />
                    </div>
                  </NotificationBadgeContainer>
                  <p className="notification-title fw-bolder m-0 ms-1">Payment Due</p>
                </div>
                <p className="font-small-3 fw-light">8 hours ago</p>
              </div>
              <div className="d-flex justify-content-between ms-3">
                <p className="m-0">Payment for 2nd milestone is due</p>
              </div>
            </CardBody>
          </Card>
        </BorderCardContainer>
        <BorderCardContainer priorityColor={priorities.p2}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <NotificationBadgeContainer priorityColor={priorities.p2}>
                    <div className="position-relative">
                      <Badge pill color="danger" className="badge-up" />
                      <Bell color={theme.white} size={18} />
                    </div>
                  </NotificationBadgeContainer>
                  <p className="notification-title fw-bolder m-0 ms-1">Payment Due</p>
                </div>
                <p className="font-small-3 fw-light">8 hours ago</p>
              </div>
              <div className="d-flex justify-content-between ms-3">
                <p className="m-0">Payment for 2nd milestone is due</p>
              </div>
            </CardBody>
          </Card>
        </BorderCardContainer>
        <BorderCardContainer priorityColor={priorities.p3}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <NotificationBadgeContainer priorityColor={priorities.p3}>
                    <div className="position-relative">
                      <Badge pill color="danger" className="badge-up" />
                      <Bell color={theme.white} size={18} />
                    </div>
                  </NotificationBadgeContainer>
                  <p className="notification-title fw-bolder m-0 ms-1">Payment Due</p>
                </div>
                <p className="font-small-3 fw-light">8 hours ago</p>
              </div>
              <div className="d-flex justify-content-between ms-3">
                <p className="m-0">Payment for 2nd milestone is due</p>
              </div>
            </CardBody>
          </Card>
        </BorderCardContainer>
        <BorderCardContainer priorityColor={priorities.p4}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <NotificationBadgeContainer priorityColor={priorities.p4}>
                    <div className="position-relative">
                      <Badge pill color="danger" className="badge-up" />
                      <Bell color={theme.white} size={18} />
                    </div>
                  </NotificationBadgeContainer>
                  <p className="notification-title fw-bolder m-0 ms-1">Payment Due</p>
                </div>
                <p className="font-small-3 fw-light">8 hours ago</p>
              </div>
              <div className="d-flex justify-content-between ms-3">
                <p className="m-0">Payment for 2nd milestone is due</p>
              </div>
            </CardBody>
          </Card>
        </BorderCardContainer>
      </div>
    </>
  );
};

export default Notifications;
