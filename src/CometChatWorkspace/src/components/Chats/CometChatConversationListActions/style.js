export const conversationActionStyle = (context) => {
  return {
    display: 'flex',
    listStyleType: 'none',
    width: '24px',
    height: '24px',
    backgroundColor: `transparent`,
    borderRadius: '4px',
    justifyContent: 'center',
    position: 'absolute',
    right: '30px',
    top: '30px',
  };
};

export const groupButtonStyle = (actionInProgress, progressIcon, actionIcon) => {
  // const backgroundImage = actionInProgress ? progressIcon : actionIcon;

  return {
    '&&': {
      outline: '0',
      border: '0',
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'center',
      position: 'relative',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      // background: `url(${backgroundImage}) center center no-repeat`,
    },
  };
};

export const messageDeleteStyle = () => {
  return {
    '&&': {
      height: '18px',
      width: '18px',
    },
  };
};
