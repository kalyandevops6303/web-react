export const containerStyle = () => {
  return {
    '&&': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      height: '100%',
      width: '100%',
      zIndex: 10,
      borderRadius: '5px',
      overflowY: 'scroll',
      '::-webkit-scrollbar': {
        width: '4px',
        height: '4px',
      },
      '::-webkit-scrollbar-track': {
        background: '#ffffff00',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#ccc',
        '&:hover': {
          background: '#aaa',
        },
      },
    },
  };
};

export const closeImgStyle = () => {
  return {
    height: '18px',
    width: '18px',
    cursor: 'pointer',
  };
};

export const closeImgContainerStyle = () => {
  return {
    textAlign: 'right',
    padding: '13px',
  };
};

export const groupProfileBodyStyle = () => {
  return {
    padding: '25px',
  };
};

export const avatarMainWrapperStyle = () => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};
export const chatThumbnailContainerStyle = () => {
  return {
    '&&': {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
  };
};

export const chatThumbnailStyle = () => {
  return {
    '&&': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
      overflow: 'hidden',
    },
  };
};

export const avatarOverlayStyle = () => {
  return {
    '&&': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      padding: '2px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
  };
};

export const avatarInputStyle = () => {
  return {
    display: 'none',
  };
};

export const sectionHeaderContainerStyle = () => {
  return {
    '&&': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };
};

export const sectionHeaderContentStyle = () => {
  return {
    '&&': {
      color: '#B9B9C3',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '23px',
      letterSpacing: '0.6px',
      textTransform: 'uppercase',
      margin: 0,
    },
  };
};

export const sectionHeaderOptionContainerStyle = () => {
  return {};
};

export const sectionHeaderOptionStyle = () => {
  return {
    '&&': {
      width: '24px',
      height: '24px',
      objectFit: 'cover',
      cursor: 'pointer',
    },
  };
};

export const aboutContainerStyle = () => {
  return {
    '&&': {
      margin: '20px 0',
    },
  };
};

export const aboutNameContainerStyle = () => {
  return {
    '&&': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: 0,
    },
  };
};

export const aboutNameStyle = () => {
  return {
    '&&': {
      color: '#5E5873',
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: '24px',
      border: 'none',
      outline: 'none',
      flexGrow: 1,
      backgroundColor: 'transparent',
    },
  };
};

export const aboutNameIconStyle = () => {
  return {
    cursor: 'pointer',
  };
};

export const endLineStyle = (props) => {
  return {
    border: 'none',
    width: '100%',
    backgroundColor: '#D8D6DE',
    height: '1px',
    margin: '14px 0',
  };
};
