import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import TrumioChat from './TrumioChat';

const Chat = () => {
  const authToken = useSelector((state) => state.auth.cometChatToken);
  const location = useLocation();
  if (!authToken) {
    return null;
  }

  return (
    <TrumioChat
      style={{
        height: 'calc(100vh - 128px)',
      }}
      authToken={authToken}
      targetId={location?.state?.targetId || null}
      targetType={location?.state?.targetType || 'user'}
      milestoneAttachment={location?.state?.milestoneData}
    />
  );
};

export default Chat;
