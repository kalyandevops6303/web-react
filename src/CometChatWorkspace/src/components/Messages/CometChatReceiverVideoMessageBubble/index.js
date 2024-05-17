import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';

import { CometChatMessageActions, CometChatThreadedMessageReplyCount, CometChatReadReceipt } from '../';
import { CometChatMessageReactions } from '../Extensions';

import { checkMessageForExtensionsData, getMessageFileMetadata } from '../../../util/common';
import * as enums from '../../../util/enums.js';

import { CometChatContext } from '../../../util/CometChatContext';

import { theme } from '../../../resources/theme';
import Translator from '../../../resources/localization/translator';

import srcIcon from './resources/1px.png';
import { getUserColor } from '../../../util/HelperFunctions.js';
import { CometChatAvatar } from '../../Shared/index.js';

import {
  messageContainerStyle,
  messageWrapperStyle,
  messageVideoWrapperStyle,
  messageInfoWrapperStyle,
  messageReactionsWrapperStyle,
  messageImgWrapper,
  nameWrapperStyle,
  nameStyle,
  messageDetailsStyle,
  messageThumbnailStyle,
} from './style';

class CometChatReceiverVideoMessageBubble extends React.Component {
  static contextType = CometChatContext;
  timer = null;

  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
      fileData: {},
    };
  }

  componentDidMount() {
    const fileData = this.getFileData();
    this.setState({ fileData: fileData });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);

    if (
      currentMessageStr !== nextMessageStr ||
      this.state.isHovering !== nextState.isHovering ||
      this.state.fileData !== nextState.fileData
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    const previousMessageStr = JSON.stringify(prevProps.message);
    const currentMessageStr = JSON.stringify(this.props.message);

    if (previousMessageStr !== currentMessageStr) {
      const fileData = this.getFileData();

      const previousfileData = JSON.stringify(this.state.fileData);
      const currentfileData = JSON.stringify(fileData);

      if (previousfileData !== currentfileData) {
        this.setState({ fileData: fileData });
      }
    }
  }

  getFileData = () => {
    const metadataKey = enums.CONSTANTS['FILE_METADATA'];
    const fileMetadata = getMessageFileMetadata(this.props.message, metadataKey);

    if (fileMetadata instanceof Blob) {
      return { fileName: fileMetadata['name'] };
    } else if (
      this.props.message.data.attachments &&
      typeof this.props.message.data.attachments === 'object' &&
      this.props.message.data.attachments.length
    ) {
      const fileName = this.props.message.data.attachments[0]?.name;
      const fileUrl = this.props.message.data.attachments[0]?.url;

      return { fileName, fileUrl: fileUrl };
    }
  };

  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
  };

  toggleHoverState = (state) => {
    return {
      isHovering: !state.isHovering,
    };
  };

  render() {
    let avatar = null,
      name = null;

    avatar = (
      <div css={messageThumbnailStyle()} className="message__thumbnail">
        <CometChatAvatar user={this.props.message.sender} />
      </div>
    );

    const userColor = getUserColor(this.props.message.sender);
    this.context.userColor = userColor;

    name = (
      <div css={nameWrapperStyle(avatar)} className="message__name__wrapper">
        <span css={nameStyle(this.context)} className="message__name">
          {this.props.message.sender.name}
        </span>
      </div>
    );

    let messageReactions = null;
    const reactionsData = checkMessageForExtensionsData(this.props.message, 'reactions');
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = (
          <div css={messageReactionsWrapperStyle()} className="message__reaction__wrapper">
            <CometChatMessageReactions message={this.props.message} actionGenerated={this.props.actionGenerated} />
          </div>
        );
      }
    }

    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (
        <CometChatMessageActions message={this.props.message} actionGenerated={this.props.actionGenerated} />
      );
    }

    return (
      <div
        css={messageContainerStyle()}
        className="sender__message__container message__image"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {avatar}
        {/* Add name here in case required */}

        <div css={messageDetailsStyle()} className="message__details">
          {name}
          {toolTipView}
          <div css={messageWrapperStyle()} className="message__wrapper">
            <div css={messageImgWrapper(this.context)} onClick={this.open} className="message__video__wrapper">
              <video controls src={this.state.fileData?.fileUrl}
              ></video>
            </div>
          </div>

          {messageReactions}

          <div css={messageInfoWrapperStyle()} className="message__info__wrapper">
            <CometChatThreadedMessageReplyCount
              message={this.props.message}
              actionGenerated={this.props.actionGenerated}
            />
            <CometChatReadReceipt message={this.props.message} />
          </div>
        </div>
      </div>
    );
  }
}

// Specifies the default values for props:
CometChatReceiverVideoMessageBubble.defaultProps = {
  actionGenerated: () => { },
};

CometChatReceiverVideoMessageBubble.propTypes = {
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatReceiverVideoMessageBubble };