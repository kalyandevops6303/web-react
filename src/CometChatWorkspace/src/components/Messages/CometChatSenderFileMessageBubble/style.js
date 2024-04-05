export const messageContainerStyle = () => {
  return {
    alignSelf: 'stretch',
    marginBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    // maxWidth: '65%',
    clear: 'both',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: '0',
  };
};

export const messageWrapperStyle = () => {
  return {
    width: 'auto',
    flex: '1 1',
    alignSelf: 'stretch',
 
  };
};

export const messageFileWrapper = (context) => {
  return {
    boxShadow: '0px 4px 16px -7px rgba(150,170,180,0.5)',
    display: 'inline-block',
    borderRadius: '5px',
    backgroundColor: `#84CCFF1F`,
    color: `${context.theme.color.white}`,
    padding: '10px 20px 15px 20px',
    '.message__file': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '0 0',
      textDecoration: 'none',
      color: `${context.theme.color.white}`,
      maxWidth: '100%',
      fontSize: '14px',
      '&:visited, &:active, &:hover': {
        color: `${context.theme.color.white}`,
        textDecoration: 'none',
      },
      '> p': {
        margin: '0',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        textAlign: 'left',
        width: '100%',
        fontSize: '14px',
        marginLeft: '8px',
      },
    },
  };
};

export const messageInfoWrapperStyle = () => {
  return {
    alignSelf: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '25px',
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

export const iconStyle = () => {
  return {
    height: '24px',
    // display: 'inline-block',
    // mask: `url(${img}) center center no-repeat`,
    // backgroundColor: `${context.theme.color.white}`,
    // flexShrink: '0',
  };
};

export const fileTypeIconContainerStyle = (img, context) => {
  return {
    height: '42px',
    width: '42px',
    borderRadius: '21px',
    backgroundColor: '#0185E41F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

export const messageFileStyle = (img, context) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '10px',
    textDecoration: 'none',
    boxShadow: '0px 4px 8px 0px rgba(44, 63, 88, 0.1)',
  };
};

export const fileBodyStyle = (img, context) => {
  return {
    flexGrow: 1,
    padding: '5px',
  };
};

export const fileNameStyle = (img, context) => {
  return {
    maxWidth: '500px',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#5E5873',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
  };
};

export const fileSizeStyle = (img, context) => {
  return {
    color: '#B9B9C3',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '12px',
  };
};

export const fileDownloadIconStyle = (img, context) => {
  return {};
};

export const messageTitleStyle = (img, context) => {
  return {
    color: '#616161',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
    margin: '3px 0px',
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

export const messageDetailsStyle = () => {
  return {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  };
};
