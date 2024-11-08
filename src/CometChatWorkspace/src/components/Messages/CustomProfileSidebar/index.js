import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import closeIcon from './resources/closeIcon.png';
import Phone from './resources/Phone.png';
import Email from './resources/Email.png';
import Clock from './resources/Clock.png';
import block from './resources/block.png';
import media from './resources/media.png';
import deleteIcon from './resources/deleteIcon.png';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatBackdrop } from '../../Shared';
import {
  containerStyle,
  closeImgStyle,
  closeImgContainerStyle,
  chatThumbnailContainerStyle,
  profileNameStyle,
  profileDesignationStyle,
  aboutContainerStyle,
  aboutDescriptionStyle,
  personalInfoContainerStyle,
  infoItemStyle,
  infoItemContentStyle,
  mainInfoStyle,
  optionsStyle,
  profileNameContainerStyle,
  sectionHeaderStyle,
  infoItemIconStyle,
  bodyStyle,
  emailItemStyle,
  infoWarnStyle,
  warnContentStyle,
  emailItemContentStyle,
  endLineStyle,
} from './style';
import { CometChatSharedMediaView } from '../../Shared/CometChatSharedMediaView';
class CustomProfileSidebar extends React.Component {
  item;
  // static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const uid = this.props.data.avatar.props.user.uid;
    CometChat.getUser(uid).then(
      (user) => {
        console.log('User details fetched for user:', user);
        this.setState({ user });
      },
      (error) => {
        console.log('User details fetching failed with error:', error);
      },
    );
  }

  toggleBlock = () => {
    const { blockedByMe, hasBlockedMe, uid } = this.state.user;

    this.setState({
      user: {
        ...this.state.user,
        blockedByMe: !blockedByMe,
      },
    });

    if (blockedByMe) {
      // unblock
      CometChat.unblockUsers([uid]).then(
        () => {
          console.log('User unblocked');
        },
        (error) => {
          console.log('Error unblocking user', error);
          this.setState({
            user: {
              ...this.state.user,
              blockedByMe,
            },
          });
        },
      );
    } else {
      // block
      CometChat.blockUsers([uid]).then(
        () => {
          console.log('User blocked');
        },
        (error) => {
          console.log('Error blocking user', error);
          this.setState({
            user: {
              ...this.state.user,
              blockedByMe,
            },
          });
        },
      );
    }
  };

  toTwelveHourString = (time_24h) => {
    if (time_24h < 0 || time_24h > 23) {
      return 'Not Available';
    }

    if (time_24h === 0) {
      return '12 AM';
    } else if (time_24h < 12) {
      return time_24h + ' AM';
    } else if (time_24h === 12) {
      return '12 PM';
    } else {
      return time_24h - 12 + ' PM';
    }
  };

  render() {
    if (!this.state.user) {
      return null;
    }
    const { metadata } = this.state.user;
    const about = metadata?.about || 'Not Available';
    const role = metadata?.title || 'Not Available';
    const email = metadata?.email || 'Not Available';
    const contactNumber = metadata?.contactNumber || 'Not Available';
    const weekdaysAvailability = metadata?.availability?.weekdays_avl;
    const weekdays = weekdaysAvailability?.days?.map((day) => day.substring(0, 3)).join(', ') || 'Not Available';
    const startTime = weekdaysAvailability?.start_time;
    const endTime = weekdaysAvailability?.end_time;

    const workingHours = weekdaysAvailability
      ? `${weekdays} ${this.toTwelveHourString(startTime)} - ${this.toTwelveHourString(endTime)}`
      : 'Not Available';

    return (
      <React.Fragment>
        {/* <CometChatBackdrop css={{ zIndex: -1 }} show={true} clicked={this.props.closePopup} /> */}
        <div className="custom__profile__sidebar" css={containerStyle()}>
          <div className="cross" css={closeImgContainerStyle()}>
            <img onClick={() => this.props.closePopup()} css={closeImgStyle()} src={closeIcon} />
          </div>
          <div className="custom__profile__sidebar__body" css={bodyStyle()}>
            <div className="main__info" css={mainInfoStyle()}>
              <div css={chatThumbnailContainerStyle()} className="chat__thumbnail">
                {this.props.data.avatar}
                {this.props.data.presence}
              </div>
              <div className="profile__name" css={profileNameContainerStyle()}>
                <h3 className="profile__name_content" css={profileNameStyle()}>
                  {this.props.data.avatar.props.user.name}
                </h3>
                <p className="profile__role" css={profileDesignationStyle()}>
                  {role}
                </p>
              </div>
            </div>

            <div className="profile__about" css={aboutContainerStyle()}>
              <p className="about__header" css={sectionHeaderStyle()}>
                ABOUT
              </p>
              <p className="about__description" css={aboutDescriptionStyle()}>
                {about}
              </p>
            </div>

            <hr css={endLineStyle()} />

            <div className="user__shared__media">
              <CometChatSharedMediaView containerHeight="225px" theme={this.props.theme} lang={this.context.language} />
            </div>

            <hr css={endLineStyle()} />

            <div className="profile__personal__info" css={personalInfoContainerStyle()}>
              <p className="personal__info__header" css={sectionHeaderStyle()}>
                PERSONAL INFORMATION
              </p>
              <a className="personal__info__item" css={emailItemStyle()} href={'mailto:' + email || '#'}>
                <img css={infoItemIconStyle()} src={Email} />{' '}
                <span css={[infoItemContentStyle(), emailItemContentStyle()]}>{email}</span>
              </a>
              <div className="personal__info__item" css={infoItemStyle()}>
                <img css={infoItemIconStyle()} src={Phone} /> <span css={infoItemContentStyle()}>{contactNumber}</span>
              </div>
              <div className="personal__info__item" css={infoItemStyle()}>
                <img css={infoItemIconStyle()} src={Clock} /> <span css={infoItemContentStyle()}>{workingHours}</span>
              </div>
            </div>

            <hr css={endLineStyle()} />

            <div className="profile__options" css={optionsStyle()}>
              {/* <p className="options__header" css={sectionHeaderStyle()}>
                OPTIONS
              </p> */}
              {/* <div className="options__item" css={infoItemStyle()}>
                <img css={infoItemIconStyle()} src={media} /> <span css={infoItemContentStyle()}>Shared Media</span>
              </div> */}
              {/* <div className="options__item" css={infoItemStyle()}>
                <img css={infoItemIconStyle()} src={deleteIcon} /> <span css={infoItemContentStyle()}>Delete Contact</span>
              </div> */}
              <div onClick={this.toggleBlock} className="options__item" css={[infoItemStyle(), infoWarnStyle()]}>
                <img css={[infoItemIconStyle()]} src={block} />{' '}
                <span css={[infoItemContentStyle(), warnContentStyle()]}>
                  {this.state.user.blockedByMe ? 'Unblock' : 'Block'}
                </span>
              </div>
            </div>
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
