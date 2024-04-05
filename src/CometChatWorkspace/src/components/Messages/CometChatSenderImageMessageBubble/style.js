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

export const messageImgWrapper = (context) => {
  const mq = [...context.theme.breakPoints];

  return {
    display: 'inline-block',
    height: '200px',
    cursor: 'pointer',
    flexShrink: '0',
    padding: '20px',
    boxShadow: '0px 4px 16px -7px rgba(150,170,180,0.5)',
    img: {
      borderRadius: '8px',
      height: '100%',
    },
    [`@media ${mq[1]}, ${mq[2]}`]: {
      minWidth: '50px',
      maxWidth: '150px',
      height: '100px',
      padding: '2px 2px',
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
    padding: '4px 8px',
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
