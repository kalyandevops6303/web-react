import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectThemeColors } from '@utils';
import { Badge, Card, CardBody, Col, Label, Row } from 'reactstrap';
import { useNavigate } from 'react-router';
import { Bell } from 'react-feather';
import DateTime from '../../lib/date-time';
import { BorderCardContainer, NotificationBadgeContainer } from './style';
import theme from '../../configs/themeVariables';
import getNotifications from '../../redux/actions/notificationsActions';
import { notifications, notificationsLoading } from '../../redux/selectors/notificationsSelectors';
import NoDataFoundGif from '../../assets/images/noDataFoundGif.gif';
import { clearNotificationsData } from '../../redux/reducers/notifications';
import SwitchConfirmModal from '../modals/SwitchConfirm';
import { selectUserData } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { setItem } from '../../utility/localStorageControl';

const Notifications = () => {
  const [switchProfileModal, setSwitchProfileModal] = useState(false);
  const userData = useSelector(selectUserData);
  const [switchData, setSwitchData] = useState();
  const navigate = useNavigate();
  const priorities = {
    PRIORITY_1: 'red',
    PRIORITY_2: 'green',
    PRIORITY_3: 'info',
    PRIORITY_4: 'secondary',
  };

  const [selectedPriority, setSelectedPriority] = useState({ label: 'All Priorities', value: '' });

  const dispatch = useDispatch();

  const notificationsData = useSelector(notifications);
  const isLoading = useSelector(notificationsLoading);
  useEffect(() => {
    dispatch(getNotifications('', 1, 10, []));
    setItem('baseRoute', 'notification');
    return () => dispatch(clearNotificationsData());
  }, []);

  const loadNewNotifications = () => {
    dispatch(
      getNotifications(
        '',
        // eslint-disable-next-line no-unsafe-optional-chaining
        notificationsData?.metadata?.current_page + 1,
        10,
        notificationsData?.data,
      ),
    );
  };

  const onPriorityChange = (option) => {
    setSelectedPriority(option);
    dispatch(getNotifications(option.value, 1, 10, []));
  };

  const redirectionFunction = ({ projectId, inviteId, status }) => {
    if (status === 'Project Invitation Request' && projectId && inviteId) {
      navigate(`/project-details/${projectId}/project/project-invitation-by-client/${inviteId}`);
    } else if (status === 'Team Invitation Request' && inviteId) {
      navigate(`/team-invitation/${inviteId}`);
    } else if (status === 'Project Team Invitation Request' && projectId && inviteId) {
      navigate(`/project-details/${projectId}/project/project-invitation/${inviteId}`);
    } else if (status === 'Team Join Request' && inviteId) {
      navigate(`/join-request/${inviteId}`);
    } else {
      navigate(`/project-details/${projectId}/bid`);
    }
  };

  const disputesRedirection = (type) => {
    if (type === 'DISPUTE_CREATED' || type === 'DISPUTE_UPDATED') {
      navigate(`/disputes/open`);
    } else if (type === 'DISPUTE_RESOLVED') {
      navigate(`/disputes/resolved`);
    } else {
      navigate(`/disputes/open`);
    }
  };

  const isReqeustFlowStatus = (status) => {
    switch (status) {
      case 'Project Invitation Request':
        return true;
      case 'Team Invitation Request':
        return true;
      case 'Project Team Invitation Request':
        return true;
      case 'Team Join Request':
        return true;
      default:
        return false;
    }
  };

  const isDisputesNotification = (type) => {
    switch (type) {
      case 'DISPUTE_CREATED':
        return true;
      case 'DISPUTE_UPDATED':
        return true;
      case 'DISPUTE_RESOLVED':
        return true;
      default:
        return false;
    }
  };

  const dashboardRedirection = () => {
    navigate(`/dashboard`);
  };

  const handleNotification = (data) => {
    setSwitchData({
      ...data,
      isDisputesNotification: isDisputesNotification(data?.notification_type),
      // eslint-disable-next-line no-unneeded-ternary
      isDashboardRedirection: data?.title === 'Team Created' || data?.title === 'Team Member Added' ? true : false,
    });

    if (userData?.user_type === userTypes.talent && data?.custom_payload?.switch_team_id) {
      setSwitchProfileModal(true);
    } else if (isReqeustFlowStatus(data?.title)) {
      redirectionFunction({
        status: data?.title,
        projectId: data?.custom_payload?.request_for?.project_id,
        inviteId: data?.custom_payload?.request_id,
      });
    } else if (isDisputesNotification(data?.notification_type)) {
      disputesRedirection(data?.notification_type);
    } else if (data?.title === 'Milestone Submitted') {
      navigate(`/project-details/${data?.custom_payload?.project_id}/milestone`);
    } else if (data?.title === 'Project Accepted') {
      navigate(`/project-details/${data?.custom_payload?.project_id}/payment`);
    } else {
      redirectionFunction({ projectId: data?.custom_payload?.project_id });
    }

    // if (data?.notification_type === 'TEAM_INVITATION') {
    //   navigate(`/team-invitation/${data.custom_payload?.invitation_id}`);
    // }
    // if (data?.notification_type === 'PROJECT_INVITATION') {
    //   navigate(
    //     `/project-details/${data.custom_payload?.project_id}/project/project-invitation/${data.custom_payload?.invitation_id}`,
    //   );
    // }
    // setItem('inviteToken', data.custom_payload?.token);
  };

  if (isLoading) {
    return <ComponentSpinner />;
  }
  return (
    <>
      <div className="d-flex justify-content-between mb-2 mt-1">
        <h2>Notifications</h2>
        <Row className="mt-2 w-100 justify-content-end">
          <Col sm="6" md="4" lg="2">
            <Label>Priority</Label>
            <Select
              options={[
                { label: 'All Priorities', value: '' },
                { label: 'Priority 1', value: 'PRIORITY_1' },
                { label: 'Priority 2', value: 'PRIORITY_2' },
                { label: 'Priority 3', value: 'PRIORITY_3' },
                { label: 'Priority 4', value: 'PRIORITY_4' },
              ]}
              value={selectedPriority}
              classNamePrefix="select"
              placeholder="Select priority"
              theme={selectThemeColors}
              className="react-select"
              onChange={(option) => onPriorityChange(option)}
            />
          </Col>
        </Row>
      </div>

      <InfiniteScroll
        dataLength={notificationsData?.data?.length || 0}
        next={loadNewNotifications}
        hasMore={notificationsData?.metadata?.has_next_page}
        loader={<div className="d-flex justify-content-center">Loading...</div>}
      >
        {notificationsData?.data?.length > 0 ? (
          notificationsData?.data?.map((item) => (
            <BorderCardContainer
              onClick={() => handleNotification(item)}
              key={item?._id}
              priorityColor={priorities?.[item?.custom_payload?.priority]}
            >
              <Card className="cursor-pointer">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <NotificationBadgeContainer priorityColor={priorities?.[item?.custom_payload?.priority]}>
                        <div className="position-relative">
                          <Badge pill color="danger" className="badge-up" />
                          <Bell color={theme.white} size={18} />
                        </div>
                      </NotificationBadgeContainer>
                      <p className="notification-title fw-bolder m-0 ms-1">{item.title}</p>
                    </div>
                    <p className="font-small-3 fw-light">
                      {item?.created_at ? DateTime?.fromMillis(item?.created_at)?.toRelative() : '-'}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between ms-3">
                    <p className="m-0">{item.message}</p>
                  </div>
                </CardBody>
              </Card>
            </BorderCardContainer>
          ))
        ) : (
          <div className="no-data-found-container d-flex flex-column align-items-center py-1">
            <img src={NoDataFoundGif} alt="no-data" width={200} height={200} className="no-data-found-gif" />
            <p className="m-0 fw-bold font-medium-3">No Data Found</p>
          </div>
        )}
        {switchProfileModal && (
          <SwitchConfirmModal
            data={switchData}
            modal={switchProfileModal}
            toggleModal={() => setSwitchProfileModal(!switchProfileModal)}
            disputesRedirection={disputesRedirection}
            dashboardRedirection={dashboardRedirection}
          />
        )}
      </InfiniteScroll>
    </>
  );
};

export default Notifications;
