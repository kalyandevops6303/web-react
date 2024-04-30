import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectThemeColors } from '@utils';
import { Badge, Button, Card, CardBody, Label, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Bell } from 'react-feather';
import DateTime from '../../lib/date-time';
import { BorderCardContainer, MarkAllAsReadButtonContainer, NotificationBadgeContainer } from './style';
import theme from '../../configs/themeVariables';
import {
  markAllNotificationAsReadLoading,
  notifications,
  notificationsLoading,
  notificationsPolling,
} from '../../redux/selectors/notificationsSelectors';
import NoDataFoundGif from '../../assets/images/noDataFoundGif.gif';
import { clearNotificationsData } from '../../redux/reducers/notifications';
import SwitchConfirmModal from '../modals/SwitchConfirm';
import { selectUserData } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { setItem } from '../../utility/localStorageControl';
import { ElevateShadow } from '../styled';
import {
  getNotifications,
  getNotificationsPolling,
  markAllNotificationAsRead,
  markNotificationAsRead,
} from '../../redux/actions/notificationsActions';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import ShowToastMessage from '../../@core/components/toast';

const Notifications = () => {
  const [switchProfileModal, setSwitchProfileModal] = useState(false);
  const userData = useSelector(selectUserData);
  const [switchData, setSwitchData] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const priorities = {
    1: 'red',
    2: 'green',
    3: 'info',
    4: 'secondary',
  };

  const [selectedPriority, setSelectedPriority] = useState({ label: 'All Priorities', value: 0 });

  const notificationsData = useSelector(notifications);
  const isLoading = useSelector(notificationsLoading);
  const markAllNotificationAsReadIsLoading = useSelector(markAllNotificationAsReadLoading);
  const notificationsPollingData = useSelector(notificationsPolling);

  useEffect(() => {
    dispatch(getNotifications({ priority: 0, page: 1, pageSize: 10, oldData: [] }));
    setItem('baseRoute', 'notifications');
    return () => dispatch(clearNotificationsData());
  }, []);

  const loadNewNotifications = () => {
    dispatch(
      getNotifications({
        priority: selectedPriority?.value,
        // eslint-disable-next-line no-unsafe-optional-chaining
        page: notificationsData?.metadata?.current_page + 1,
        pageSize: 10,
        oldData: notificationsData?.data,
      }),
    );
  };

  const onPriorityChange = (option) => {
    setSelectedPriority(option);
    dispatch(getNotifications({ priority: option.value, page: 1, pageSize: 10, oldData: [] }));
  };

  const handleNotificationClick = (path, notificationId) => {
    // eslint-disable-next-line no-undef
    const url = new URL(`${window.location.protocol}//${window.location.host}${path}`);
    const params = url.searchParams;
    const switch_team_id = params.get('switch_team_id');
    if (userData?.user_type === userTypes.talent && path.includes('switch_team_id') && switch_team_id?.length > 0) {
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

  const FiltersWrap = styled.div`
    .select__control {
      cursor: pointer;
    }
  `;

  const onMarkAllAsReadSuccess = (res) => {
    setSelectedPriority({ label: 'All Priorities', value: 0 });
    dispatch(getNotificationsPolling());
    dispatch(getNotifications({ priority: 0, page: 1, pageSize: 10, oldData: [] }));
    ShowToastMessage(SUCCESS, res.data.data.message);
  };

  const onMarkAllAsReadClick = () => {
    dispatch(markAllNotificationAsRead(onMarkAllAsReadSuccess));
  };

  if (isLoading) {
    return <ComponentSpinner />;
  }

  return (
    <>
      <h2>Notifications</h2>
      <div className="d-flex justify-content-between align-items-end mb-2 mt-2">
        {notificationsPollingData?.unread_notifications_count > 0 && notificationsData?.data?.length > 0 ? (
          <MarkAllAsReadButtonContainer>
            <Button outline onClick={onMarkAllAsReadClick} className="py-75">
              {markAllNotificationAsReadIsLoading ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <p className="m-0 fw-normal">Mark all as read</p>
              )}
            </Button>
          </MarkAllAsReadButtonContainer>
        ) : (
          <div />
        )}
        <div>
          <Label>Priority</Label>
          <FiltersWrap>
            <Select
              style={{ cursor: 'pointer' }}
              options={[
                { label: 'All Priorities', value: 0 },
                { label: 'Priority 1', value: 1 },
                { label: 'Priority 2', value: 2 },
                { label: 'Priority 3', value: 3 },
                { label: 'Priority 4', value: 4 },
              ]}
              value={selectedPriority}
              classNamePrefix="select"
              placeholder="Select priority"
              theme={selectThemeColors}
              className="cursor-pointer"
              onChange={(option) => onPriorityChange(option)}
            />
          </FiltersWrap>
        </div>
      </div>

      <InfiniteScroll
        dataLength={notificationsData?.data?.length || 0}
        next={loadNewNotifications}
        className="overflow-visible"
        hasMore={notificationsData?.metadata?.has_next_page}
        loader={<div className="d-flex justify-content-center">Loading...</div>}
      >
        {notificationsData?.data?.length > 0 ? (
          notificationsData?.data?.map((item) => (
            <BorderCardContainer
              onClick={() => handleNotificationClick(item?.path, item?.status === 'UNREAD' ? item?._id : null)}
              key={item?._id}
              priorityColor={priorities?.[item?.priority]}
            >
              <Card className="cursor-pointer">
                <ElevateShadow>
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <NotificationBadgeContainer priorityColor={priorities?.[item?.priority]}>
                          <div className="position-relative">
                            {item?.status === 'UNREAD' && <Badge pill color="danger" className="badge-up" />}
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
                </ElevateShadow>
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
            entity={switchData?.entity}
            navigateTo={switchData?.navigateTo}
            switchTeamId={switchData?.switchTeamId}
            notificationId={switchData?.notificationId}
            modal={switchProfileModal}
            toggleModal={() => setSwitchProfileModal(!switchProfileModal)}
          />
        )}
      </InfiniteScroll>
    </>
  );
};

export default Notifications;
