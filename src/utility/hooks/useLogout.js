import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation
import { CometChat } from '@cometchat-pro/chat';
import { removeCookiesItem } from '../cookiesControl';
import { getItem, setItem } from '../localStorageControl';
import { clearAllFormData, setFormDocuments } from '@/redux/reducers/formData';
import { logoutAction } from '@/redux/actions/authActions';
import { messaging } from '@/configs/api/firebase';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fcmToken = useSelector((state) => state.auth.fcmToken);

  const handleLogout = async () => {
    const onSuccess = async () => {
      window.history.pushState(null, '', '/auth/login');
      window.addEventListener('popstate', () => {
        window.history.pushState(null, '', '/auth/login');
      });

      navigate('/auth/login');

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
      window.localStorage.clear();
      window.sessionStorage.clear();
      removeCookiesItem('access_token');
      if (preservedValue) {
        setItem(keyToPreserve, preservedValue);
      }

      dispatch(clearAllFormData());
      dispatch(setFormDocuments(null));
    };

    dispatch(logoutAction({ fcmToken, onSuccess }));
  };

  return { handleLogout };
};

export default useLogout;
