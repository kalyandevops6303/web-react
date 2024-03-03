export const listItem = (props) => {
  const selectedState =
    props.selectedConversation && props.selectedConversation.conversationId === props.conversation.conversationId
      ? {
          // backgroundColor: `${props.theme.backgroundColor.primary}`,
          background: 'linear-gradient(47deg, #2196F3 0%, #84C8FF 100%) !important',
        }
      : {};

  return {
    '&&': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      width: '100%',
      padding: '8px 16px',
      position: 'relative',
      ...selectedState,
      '&:hover': {
        // backgroundColor: `${props.theme.backgroundColor.primary}`,
        background: 'linear-gradient(47deg, #2196F3 0%, #84C8FF 100%) !important',
        '.item__details__name , .item__details__last-message, .item__details__timestamp ': {
          color: 'white',
        },
        '.list__item__thumbnail': {
          border: '2px solid white',
          borderRadius: '50%',
        },
      },
    },
  };
};

export const itemThumbnailStyle = () => {
  return {
    '&&': {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      flexShrink: '0',
    },
  };
};

export const itemDetailStyle = () => {
  return {
    '&&': {
      width: 'calc(100% - 45px)',
      flexGrow: '1',
      paddingLeft: '16px',
      '&[dir=rtl]': {
        paddingRight: '16px',
        paddingLeft: '0',
      },
    },
  };
};

export const itemRowStyle = () => {
  return {
    '&&': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
  };
};

export const itemNameStyle = (props) => {
  return {
    '&&': {
      fontSize: '15px',
      fontWeight: '500',
      display: 'block',
      width: 'calc(100% - 70px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: '22px',
      // color: `${props.theme.color.primary}`,
      color: '#5E5873',
    },
  };
};

export const itemLastMsgStyle = (props) => {
  return {
    '&&': {
      margin: '0',
      fontSize: '14px',
      fontWeight: '400',
      width: 'calc(100% - 50px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: '20px',
      // color: `${props.theme.color.helpText}`,
      color: '#B9B9C3',
    },
  };
};

export const itemLastMsgTimeStyle = (props) => {
  return {
    '&&': {
      fontSize: '11px',
      width: '70px',
      textAlign: 'right',
      // color: `${props.theme.color.helpText}`,
      color: '#B9B9C3',
    },
  };
};
