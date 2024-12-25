import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation
import { CometChat } from '@cometchat-pro/chat';
import { getItem, setItem } from '../localStorageControl';
import { clearAllFormData, setFormDocuments } from '@/redux/reducers/formData';
import { logoutAction } from '@/redux/actions/authActions';
import { messaging } from '@/configs/api/firebase';

import { logOut } from '@/redux/reducers/auth';
import { clearTeams } from '@/redux/reducers/team';
import { clearTeamCardData } from '@/redux/reducers/myTeams';
import { clearProjectCardData } from '@/redux/reducers/project';
import { clearMarketplaceCardData } from '@/redux/reducers/marketPlace';
import { clearNotificationsData } from '@/redux/reducers/notifications';

// Flexternships Imports
import { logout as logoutZustand } from '@/flexternships/utils/core-utils';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fcmToken = useSelector((state) => state.auth.fcmToken);
  const handleLogout = async ({ preventRedirect = false, suppressToast = false }) => {
    const onSuccess = async () => {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.history.pushState(null, '', '/auth/login');
      window.addEventListener('popstate', () => {
        window.history.pushState(null, '', '/auth/login');
      });

      if (!preventRedirect) {
        navigate('/auth/login');
      }

      // Unsubscribe FCM Token
      if (fcmToken) {
        try {
          await messaging?.deleteToken();
        } catch (error) {
          console.error('Error deleting FCM token:', error);
        }
      }

      // CometChat logout
      const cometChatToken = getItem('cometChatToken');
      if (cometChatToken) {
        try {
          CometChat.disconnect();
          await CometChat.logout();
        } catch (error) {
          console.error('Error logging out from CometChat:', error);
        }
      }

      const keyToPreserve = 'isUserVisited';
      const preservedValue = getItem(keyToPreserve);
      if (preservedValue) {
        setItem(keyToPreserve, preservedValue);
      }

      // Zustand Logout
      logoutZustand();

      dispatch(logOut());
      dispatch(clearTeams());
      dispatch(clearTeamCardData());
      dispatch(clearProjectCardData());
      dispatch(clearMarketplaceCardData());
      dispatch(clearNotificationsData());

      dispatch(clearAllFormData());
      dispatch(setFormDocuments(null));
    };

    await dispatch(logoutAction({ fcmToken, suppressToast, onSuccess }));
  };

  return { handleLogout };
};

export default useLogout;
