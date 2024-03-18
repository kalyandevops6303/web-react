import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { CometChat } from '@cometchat-pro/chat';

import { theme } from '../../../resources/theme';

import { imgStyle } from './style';

import srcIcon from './resources/1px.png';
import { generateAvatar } from '../../../util/HelperFunctions';

class CometChatAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
    this._isMounted = false;
    this.state = {
      avatarImage: srcIcon,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setAvatarImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setAvatarImage();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setAvatarImage = () => {
    if (this.props.image.trim().length) {
      this.getImage(this.props.image);
    } else if (Object.keys(this.props.user).length) {
      if (this.props.user.hasOwnProperty('avatar')) {
        const avatarImage = this.props.user.avatar;
        this.getImage(avatarImage);
      } else {
        const uid = this.props.user.uid;
        const char = this.props.user.name.charAt(0).toUpperCase();

        const avatarImage = generateAvatar(uid, char);
        this.getImage(avatarImage);
      }
    } else if (Object.keys(this.props.group).length) {
      if (this.props.group.hasOwnProperty('icon')) {
        const avatarImage = this.props.group.icon;
        this.getImage(avatarImage);
      } else {
        const guid = this.props.group.guid;
        const char = this.props.group.name.charAt(0).toUpperCase();

        const avatarImage = generateAvatar(guid, char);
        this.getImage(avatarImage);
      }
    }
  };

  getImage = (image) => {
    let img = new Image();
    img.src = image;
    img.onload = () => {
      if (this._isMounted) {
        this.setState({ avatarImage: image });
      }
    };
  };

  render() {
    const borderWidth = this.props.borderWidth;
    const borderStyle = this.props.borderStyle;
    const borderColor = this.props.borderColor;
    const cornerRadius = this.props.cornerRadius;

    const getStyle = () => ({
      borderWidth: borderWidth,
      borderStyle: borderStyle,
      borderColor: borderColor,
      borderRadius: cornerRadius,
    });

    return (
      <img
        src={this.state.avatarImage}
        css={imgStyle()}
        alt={this.state.avatarImage}
        style={getStyle()}
        ref={(el) => {
          this.imgRef = el;
        }}
      />
    );
  }
}

// Specifies the default values for props:
CometChatAvatar.defaultProps = {
  borderWidth: '0px',
  borderStyle: 'solid',
  borderColor: theme.borderColor.primary,
  borderRadius: '50%',
  theme: theme,
  image: '',
  user: {},
  group: {},
};

CometChatAvatar.propTypes = {
  borderWidth: PropTypes.string,
  borderStyle: PropTypes.string,
  borderColor: PropTypes.string,
  cornerRadius: PropTypes.string,
  image: PropTypes.string,
  theme: PropTypes.object,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.shape(CometChat.User)]),
  group: PropTypes.oneOfType([PropTypes.object, PropTypes.shape(CometChat.Group)]),
};

export { CometChatAvatar };
