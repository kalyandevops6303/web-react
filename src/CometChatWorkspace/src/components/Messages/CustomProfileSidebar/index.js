import React from 'react';
import closeIcon from '../../../../../assets/images/chat/closeIcon.png';
import Email from '../../../../../assets/images/chat/Email.png';
import Phone from '../../../../../assets/images/chat/Phone.png';
import Clock from '../../../../../assets/images/chat/Clock.png';
import block from '../../../../../assets/images/chat/block.png';
import media from '../../../../../assets/images/chat/media.png';
import deleteIcon from '../../../../../assets/images/chat/deleteIcon.png';
import { CometChatBackdrop } from '../../Shared';
import {
  container,
  closeImg,
  closeImgDiv,
  avatarPresenceDiv,
  chatThumbnailDiv,
  profileNameDiv,
  profileName,
  profileDesignation,
  aboutDiv,
  aboutHeader,
  aboutDescription,
  personalInfoDiv,
  personalInfoHeader,
  optionHeader,
  labelImage,
  infoStyle,
  optionDiv,
} from './style';
class CustomProfileSidebar extends React.Component {
  item;
  // static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <CometChatBackdrop style={{ zIndex: -1 }} show={true} clicked={this.props.closePopup} />
        <div style={container()}>
          <div style={closeImgDiv()}>
            <img onClick={() => this.props.closePopup()} style={closeImg()} src={closeIcon} />
          </div>
          <div style={avatarPresenceDiv()}>
            <div style={chatThumbnailDiv()} className="chat__thumbnail">
              {this.props.data.avatar}
              {this.props.data.presence}
            </div>
          </div>
          <div style={profileNameDiv()}>
            <h3 style={profileName()}>{this.props.data.avatar.props.user.name}</h3>
            <p style={profileDesignation()}>UI/UX Designer</p>
          </div>
          <div style={aboutDiv()}>
            <p style={aboutHeader()}>ABOUT</p>
            <p style={aboutDescription()}>
              While most people enjoy casino gambling, sports betting, lottery and bingo playing for the fun and
              excitement it provides, others may experience gambling
            </p>
          </div>
          <div style={personalInfoDiv()}>
            <p style={personalInfoHeader()}>PERSONAL INFORMATION</p>
            <label style={labelImage()}>
              <img src={Email} /> <span style={infoStyle()}>carrie@gmail.com</span>
            </label>
            <label style={labelImage()}>
              <img src={Phone} /> <span style={infoStyle()}>+1(123) 456 - 7890</span>
            </label>
            <label style={labelImage()}>
              <img src={Clock} /> <span style={infoStyle()}>Mon - Fri 10AM - 8PM</span>
            </label>
          </div>
          <div style={optionDiv()}>
            <p style={optionHeader()}>OPTIONS</p>
            <label style={labelImage()}>
              <img src={media} /> <span style={infoStyle()}>Shared Media</span>
            </label>
            <label style={labelImage()}>
              <img src={deleteIcon} /> <span style={infoStyle()}>Delete Contact</span>
            </label>
            <label style={labelImage()}>
              <img src={block} /> <span style={infoStyle()}>Block Contact</span>
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// Specifies the default values for props:

// CometChatMessageHeader.defaultProps = {
// 	theme: theme,
// 	item: {},
// 	type: "",
// };

// CometChatMessageHeader.propTypes = {
// 	theme: PropTypes.object,
// 	item: PropTypes.object,
// 	type: PropTypes.string,
// };

export { CustomProfileSidebar };
