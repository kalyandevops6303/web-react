import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, MessageSquare } from 'react-feather';
import NavbarSearch from './NavbarSearch';
import UserDropdown from './UserDropdown';
import theme from '../../../../configs/themeVariables';
import { MessageIconContainer, NotificationIconContainer } from './style';
import { useIsTab } from '../../../../utility/Utils';
import { notificationCount } from '../../../../redux/reducers/notifications';
import { selectUserData } from '../../../../redux/selectors/authSelectors';
import ShowToastMessage from '../../../components/toast';
import { ERROR } from '../../../../utility/constants/ToastTypes';
import { clubStatus } from '../../../../utility/constants/Constant';
import { getNotificationsPolling } from '../../../../redux/actions/notificationsActions';
import { notificationsPolling } from '../../../../redux/selectors/notificationsSelectors';
import styled from 'styled-components';
import { clearAllFormData } from '../../../../redux/reducers/formData';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import { useAppStore } from '@/flexternships/stores/core-stores';

const NavbarUser = ({ setNavBarLoading }) => {
  const isTab = useIsTab();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isUserDataLoading = useSelector((state) => state.auth.userDataLoading);
  const isNavbarSearchBarOpen = useSelector((state) => state.search.isNavbarSearchBarOpen);
  const isNotificationCount = useSelector((state) => state.notifications.notificationCount);
  const userDetailsData = useSelector(selectUserData);
  const notificationsPollingData = useSelector(notificationsPolling);

  const isTabDisabled = userDetailsData?.club_status === clubStatus.IN_REVIEW || isUserDataLoading;
  const isNotificationView = location.pathname.includes('/notifications');

  const isWorkInProgress = useAppStore((state) => state.isWip);
  const openModal = useAppStore((state) => state.openModal);

  const handleNotificaionClick = () => {
    if (isWorkInProgress) {
      openModal(GlobalModalType.UNSAVED_WORK, undefined, undefined, { nextPath: '/notifications' });
      return;
    }
    navigate('/notifications');
    isNotificationCount && dispatch(notificationCount(false));
  };

  useEffect(() => {
    if (userDetailsData) {
      dispatch(getNotificationsPolling());
    }
  }, [location, userDetailsData]);

  useEffect(() => {
    dispatch(clearAllFormData());
  }, [location.pathname]);

  const LineWrapper = styled.div`
    position: relative;
    .line {
      height: 3px;
      background: ${theme.activeColor};
      width: 90%;
      position: absolute;
      bottom: -21px;
      margin: auto;
      left: 0;
      right: 0;
    }
  `;
  return (
    <ul className="nav navbar-nav align-items-center ms-auto d-contents">
      <NavbarSearch />
      {isTab && isNavbarSearchBarOpen ? (
        ''
      ) : (
        <>
          {isTabDisabled ? (
            <div className="text-muted cursor-not-allowed d-flex align-items-center">
              <NotificationIconContainer>
                <Bell size={20} color={theme.bodyColor} />
              </NotificationIconContainer>
            </div>
          ) : (
            <NotificationIconContainer onClick={handleNotificaionClick} className="d-flex align-items-center">
              <div className="cursor-pointer">
                {(isNotificationCount || notificationsPollingData?.unread_notifications_count > 0) && (
                  <span className="notification-dot" />
                )}
                <Bell size={20} color={isNotificationView ? theme.activeColor : theme.bodyColor} />
              </div>
              {isNotificationView && (
                <LineWrapper>
                  <div className="line"></div>
                </LineWrapper>
              )}
            </NotificationIconContainer>
          )}

          <UserDropdown />
        </>
      )}
    </ul>
  );
};
export default NavbarUser;
