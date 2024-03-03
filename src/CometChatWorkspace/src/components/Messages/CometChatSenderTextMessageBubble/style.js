export const messageContainerStyle = () => {
  return {
    alignSelf: 'flex-end',
    // marginBottom: "16px",
    // paddingLeft: "16px",
    // paddingRight: "16px",
    padding: '5px 16px',
    width: '100%',
    // maxWidth: "65%",
    clear: 'both',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: '0',
    // ":hover": {
    // 	backgroundColor: "rgba(0, 0, 0, 0.1)"
    // },
  };
};

export const messageWrapperStyle = () => {
  return {
    width: '100%',
    // width: "auto",
    alignSelf: 'flex-end',
    display: 'flex',
    flex: '1 1',
  };
};

export const messageThumbnailStyle = () => {
  return {
    width: '36px',
    height: '36px',
    margin: '10px 5px',
    float: 'left',
    flexShrink: '0',
  };
};

export const messageDetailStyle = () => {
  return {
    flex: '1 1',
    display: 'flex',
    flexDirection: 'column',
  };
};

export const messageContentWrapperStyle = () => {
  return {
    flex: '1 1',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 4px 16px -7px rgba(150,170,180,0.5)',
    padding: '14px',
  };
};

export const nameWrapperStyle = (avatar) => {
  const paddingValue = avatar
    ? {
        padding: '3px 5px',
      }
    : {};

  return {
    alignSelf: 'flex-start',
    ...paddingValue,
  };
};

export const nameStyle = (context) => {
  return {
    fontSize: '15px',
    fontWeight: '800',
    fontStyle: 'bold',
    // color: `${context.theme.color.messageText}`,
    color: `${context.userColor || context.theme.color.messageText}`,
    cursor: 'default',
  };
};

export const messageTxtContainerStyle = () => {
  return {
    width: 'auto',
    flex: '1 1',
    display: 'flex',
    alignSelf: 'flex-start',
    // boxShadow: "2px 7px 20px -9px rgba(150,170,180,0.5)",
    // cursor: "default",
  };
};

export const messageTxtWrapperStyle = (context) => {
  return {
    display: 'inline-block',
    borderRadius: '5px',
    // background: `${context.theme.white}`,
    // backgroundColor: `${context.theme.primaryColor}`,
    // padding: "8px 5px",
    padding: '0 5px',
    width: 'auto',
  };
};

export const messageTxtStyle = (props, showVariation, count, context) => {
  let emojiAlignmentProp = {
    ' > img': {
      width: '24px',
      height: '24px',
      display: 'inline-block',
      verticalAlign: 'top',
      zoom: '1',
      margin: '0 2px',
    },
  };

  let emojiProp = {};
  let heightProp = {};

  if (count === 1) {
    emojiProp = {
      '> img': {
        width: '48px',
        height: '48px',
      },
    };
    heightProp = {
      height: '48px',
    };
  } else if (count === 2) {
    emojiProp = {
      '> img': {
        width: '36px',
        height: '36px',
      },
    };
    heightProp = {
      height: '36px',
    };
  } else if (count > 2) {
    emojiProp = {
      '> img': {
        width: '24px',
        height: '24px',
      },
    };
  }

  if (showVariation === false) {
    emojiProp = {
      '> img': {
        width: '24px',
        height: '24px',
      },
    };
  }

  return {
    margin: '0',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${context.theme.color.messageText}`,
    lineHeight: '21px',
    fontWeight: '400',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    textAlign: 'left',
    width: 'auto',
    ...heightProp,
    ' a': {
      color: '#0432FF',
      '&:hover': {
        color: '#04009D',
      },
    },
    " a[href^='mailto:']": {
      color: '#F38C00',
      '&:hover': {
        color: '#F36800',
      },
    },
    " a[href^='tel:']": {
      color: '#3802DA',
      '&:hover': {
        color: '#2D038F',
      },
    },
    ...emojiAlignmentProp,
    ...emojiProp,
  };
};

export const messageInfoWrapperStyle = () => {
  return {
    // alignSelf: "flex-start",
    padding: '10px 10px',
    display: 'flex',
    // justifyContent: "flex-end",
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25px',
  };
};

export const messageInfoPartContainerStyle = () => {
  return {
    display: 'flex',
    alignItems: 'center',
  };
};

export const messageReactionsWrapperStyle = () => {
  return {
    display: 'flex',
    alignSelf: 'flex-end',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    minHeight: '36px',
  };
};
