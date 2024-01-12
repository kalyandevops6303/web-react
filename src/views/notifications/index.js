import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectThemeColors } from '@utils';
import { Badge, Card, CardBody, Col, Label, Row } from 'reactstrap';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
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
import { ElevateShadow } from '../styled';

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

  const [selectedPriority, setSelectedPriority] = useState({ label: 'All Priorities', value: '' });

  const notificationsData = useSelector(notifications);
  const isLoading = useSelector(notificationsLoading);
  useEffect(() => {
    dispatch(getNotifications('', 1, 10, []));
    setItem('baseRoute', 'notifications');
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

  const handleNotificationClick = (path) => {
    const switch_team_id = path?.split('switch_team_id=')[1];
    if (userData?.user_type === userTypes.talent && path.includes('switch_team_id')) {
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
  const FiltersWrap = styled.div`
    .select__control {
      cursor: pointer;
    }
  `;

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
            <FiltersWrap>
              <Select
                style={{ cursor: 'pointer' }}
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
                className="cursor-pointer"
                onChange={(option) => onPriorityChange(option)}
              />
            </FiltersWrap>
          </Col>
        </Row>
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
              onClick={() => handleNotificationClick(item?.path)}
              key={item?._id}
              priorityColor={priorities?.[item?.custom_payload?.priority]}
            >
              <Card className="cursor-pointer">
                <ElevateShadow>
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
            modal={switchProfileModal}
            toggleModal={() => setSwitchProfileModal(!switchProfileModal)}
          />
        )}
      </InfiniteScroll>
    </>
  );
};

export default Notifications;
