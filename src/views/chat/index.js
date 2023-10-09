import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import TrumioChat from './TrumioChat';

const Chat = () => {
  const authToken = useSelector((state) => state.auth.cometChatToken);
  const location = useLocation();
  const { targetId, targetType } = location.state;

  return (
    <TrumioChat
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
      }}
      authToken={authToken}
      targetId={targetId}
      targetType={targetType || 'user'}
    />
  );
};

export default Chat;
