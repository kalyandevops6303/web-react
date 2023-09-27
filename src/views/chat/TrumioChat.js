/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-relative-packages
import { CometChatUI } from '../../CometChatWorkspace/src/components';

function TrumioChat({ authToken, targetId, targetType = 'user', style, ...rest }) {
  return (
    <div style={style}>
      <CometChatUI targetId={undefined} targetType={targetType} {...rest} />
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
