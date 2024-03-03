export const modalWrapperStyle = (context) => {
  return {
    // width:"280px",
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    backgroundColor: 'white',
    borderRadius: '5px',
    height: '100%',
    width: '100%',
  };
};

export const closeBtn = (img, context) => {
  return {
    '&&': {
      height: '20px',
      width: '20px',
      margin: '5px 5px 0px 0px',
      cursor: 'pointer',
    },
  };
};
export const closeImgDiv = () => {
  return {
    textAlign: 'right',
    padding: '14px 14px 0 0',
  };
};
export const modalBodyStyle = () => {
  return {
    // padding: '0 0 16px 0',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
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
  };
};

export const modalErrorStyle = (context) => {
  return {
    fontSize: '12px',
    color: `${context.theme.color.red}`,
    textAlign: 'center',
    margin: '8px 0',
    width: '100%',
  };
};

export const modalTableStyle = (props) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    borderCollapse: 'collapse',
    margin: '0',
    padding: '0',
    tr: {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed',
    },
  };
};

export const tableCaptionStyle = () => {
  return {
    color: '#5E5873',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '23px',
    letterSpacing: '0.6px',
    padding: '0 25px',
  };
};

export const tableBodyStyle = () => {
  return {
    // height: "calc(100% - 40px)",
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 25px',
  };
};

export const tableFootStyle = (context, state, img) => {
  const loadingState = state.creatingGroup
    ? {
        disabled: 'true',
        pointerEvents: 'none',
        background: `url(${img}) no-repeat right 10px center ${context.theme.primaryColor}`,
      }
    : {};

  const textMargin = state.creatingGroup ? { marginRight: '24px' } : {};

  return {
    '&&': {
      display: 'inline-block',
      button: {
        cursor: 'pointer',
        padding: '8px 16px',
        backgroundColor: `${context.theme.primaryColor}`,
        borderRadius: '5px',
        color: `${context.theme.color.white}`,
        fontSize: '14px',
        outline: '0',
        border: '0',
        ...loadingState,
        span: {
          ...textMargin,
        },
      },
      tr: {
        border: 'none',
        td: {
          textAlign: 'center',
        },
      },
    },
  };
};

export const inputStyle = (context) => {
  return {
    '&&': {
      outline: 'none',
      borderColor: '#D8D6DE',
      borderStyle: 'solid',
      borderWidth: '1px',
      margin: '10px 0',
      borderRadius: '6px',
      backgroundColor: `white`,
      color: '#5E5873',
      fontWeight: '400',
      padding: '8px 14px',
      fontSize: '12px',
      '::placeholder': {
        color: '#B9B9C3',
        fontSize: '12px',
        fontWeight: '400',
      },
    },
  };
};
export const createGroupButton = (context) => {
  return {
    '&&': {
      backgroundColor: '#0065C1',
      border: '0px',
      color: 'white',
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: '0.4px',
      borderRadius: '5px',
      marginLeft: '20px',
      cursor: 'pointer',
      padding: '10px 22px',
    },
  };
};
export const closeCreateGroupPopupButton = (context) => {
  return {
    '&&': {
      backgroundColor: 'white',
      border: 'none',
      color: '#0185E4',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: '0.4px',
    },
  };
};
export const btnDiv = (context) => {
  return {
    '&&': {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px 25px 10px 25px',
    },
  };
};
export const endLine = (props) => {
  return {
    '&&': {
      margin: '16px 25px',
      border: 0,
      backgroundColor: '#D8D6DE',
      height: '1px',
    },
  };
};
export const groupIconImg = (props) => {
  return {
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    cursor: 'pointer',
  };
};

export const avatarInputStyle = () => {
  return {
    display: 'none',
  };
};

export const uploadIconImg = (props) => {
  return {
    position: 'relative',
    height: '25px',
    width: '25px',
    borderRadius: '50%',
    left: '-32px',
    top: '48px',
    cursor: 'pointer',
  };
};
export const groupIconContainer = (props) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px',
  };
};

export const groupIconStyle = (props) => {
  return {
    display: 'flex',
  };
};

export const groupNameHeader = (props) => {
  return {
    color: '#B9B9C3',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '23px',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
  };
};
export const selectMemeberHeader = (props) => {
  return {
    '&&': {
      marginTop: '-10px',
      color: '#B9B9C3',
      fontSize: '12px',
    },
  };
};

export const lowerBodyStyle = (props) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  };
};

export const footerStyle = () => {
  return {
    '&&': {
      position: 'sticky',
      bottom: 0,
      backgroundColor: 'white',
      padding: '0 0 16px 0',
    },
  };
};
