/** @jsxRuntime classic */
/** @jsx jsx */
import { useContext, useState } from 'react';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { CometChat } from '@cometchat-pro/chat';

import { CometChatAvatar, CometChatUserPresence } from '../../Shared';

import { CometChatContext } from '../../../util/CometChatContext';
import { theme } from '../../../resources/theme';
import Translator from '../../../resources/localization/translator';
import checkedIcon from './resources/checked.png';
import uncheckedIcon from './resources/unchecked.png';

import { listItem, itemThumbnailStyle, itemDetailStyle, itemNameStyle, itemDescStyle, checkboxStyle } from './style';

const CometChatUserListItem = (props) => {
  const context = useContext(CometChatContext);
  const [checked, setChecked] = useState(false);

  let userPresence = <CometChatUserPresence status={props.user.status} />;

  const toggleTooltip = (event, flag) => {
    const elem = event.target;

    const scrollWidth = elem.scrollWidth;
    const clientWidth = elem.clientWidth;

    if (scrollWidth <= clientWidth) {
      return false;
    }

    if (flag) {
      elem.setAttribute('title', elem.textContent);
    } else {
      elem.removeAttribute('title');
    }
  };

  const handleClick = () => {
    props.clickHandler(props.user);
    setChecked((cur) => !cur);
  };

  return (
    <label css={listItem(props, context)} onClick={handleClick} className="list__item">
      {props.type === 'group' && (
        <img className="user__item__checkbox" src={checked ? checkedIcon : uncheckedIcon} css={checkboxStyle()} />
      )}
      <div css={itemThumbnailStyle()} className="list__item__thumbnail">
        <CometChatAvatar user={props.user} />
        {userPresence}
      </div>
      <div css={itemDetailStyle()} className="list__item__details" dir={Translator.getDirection(context.language)}>
        <div
          css={itemNameStyle(context)}
          className="item__details__name"
          onMouseEnter={(event) => toggleTooltip(event, true)}
          onMouseLeave={(event) => toggleTooltip(event, false)}
        >
          {props.user.name}
        </div>
        <div css={itemDescStyle(context)} className="item__details__desc">
          {props.user.metadata && props.user.metadata?.about}
        </div>
      </div>
    </label>
  );
};

// Specifies the default values for props:
CometChatUserListItem.defaultProps = {
  theme: theme,
  user: {},
};

CometChatUserListItem.propTypes = {
  theme: PropTypes.object,
  user: PropTypes.shape(CometChat.User),
};

export { CometChatUserListItem };
