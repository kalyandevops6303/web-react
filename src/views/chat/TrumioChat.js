/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CometChat } from '@cometchat-pro/chat';
// eslint-disable-next-line import/no-relative-packages
import { CometChatUI } from '../../CometChatWorkspace/src/components';
import { requestPermission } from '../../configs/api/firebase';
import { COMETCHAT_CONSTANTS } from '../../constants';

const appId = COMETCHAT_CONSTANTS.APP_ID;
const region = COMETCHAT_CONSTANTS.REGION;
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

// CometChat.init(appId, appSetting).then(
//   () => {
//     console.log('Initialisation successfully completed!');
//   },
//   (error) => {
//     console.log('Initialisation failed with error:', error);
//   },
// );

// const loginUser = async (authToken) => {
//   const user = await CometChat.login(authToken);
//   console.log(user, 'USER COMET');
//   const fcmToken = await requestPermission();
//   console.log(fcmToken, 'FCM COMET');
//   const response = await CometChat.callExtension('push-notification', 'POST', 'v2/tokens', {
//     fcmToken,
//   });
//   console.log(response, 'RES COMET');
// };

// Documenting the authentication flow
function TrumioChat({ authToken, targetId = undefined, targetType = 'user', style, ...rest }) {
  // useEffect(() => {
  //   loginUser(authToken);
  // }, []);

  // loginUser("superhero1");
  return (
    <div style={style}>
      <CometChatUI targetId={targetId} targetType={targetType} {...rest} />
    </div>
  );
}

export default TrumioChat;

TrumioChat.propTypes = {
  authToken: PropTypes.string,
  targetId: PropTypes.string,
  targetType: PropTypes.string,
  style: PropTypes.object,
};
TrumioChat.defaultProps = {
  authToken: '',
  targetId: '',
  targetType: '',
  style: {},
};
