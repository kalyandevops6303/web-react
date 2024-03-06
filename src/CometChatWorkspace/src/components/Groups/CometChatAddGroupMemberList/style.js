export const modalWrapperStyle = (context) => {
  const mq = context.theme.breakPoints.map((x) => `@media ${x}`);

  return {
    minWidth: '350px',
    minHeight: '450px',
    width: '40%',
    height: '40%',
    // overflow: 'hidden',
    backgroundColor: `${context.theme.backgroundColor.white}`,
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1002',
    margin: '0 auto',
    boxShadow: 'rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px',
    borderRadius: '12px',
    display: 'block',
    [mq[0]]: {
      width: '100%',
      height: '100%',
    },
    [mq[1]]: {
      width: '100%',
      height: '100%',
    },
    [mq[2]]: {
      width: '100%',
      height: '100%',
    },
  };
};

export const closeIconContainerStyle = () => {
  return {
    position: 'absolute',
    top: '-7px',
    right: '-7px',
    padding: '7px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: 'rgba(44, 63, 88, 0.22) 0px 4px 15px 0px',
  };
};

export const modalCloseStyle = (img, context) => {
  return {
    width: '20px',
  };
};

export const modalBodyStyle = () => {
  return {
    padding: '24px',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'flex-start',
  };
};

export const modalCaptionStyle = (dir) => {
  const textAlignStyle =
    dir === 'rtl'
      ? {
          textAlign: 'right',
          paddingRight: '32px',
        }
      : {
          textAlign: 'left',
        };

  return {
    fontSize: '20px',
    marginBottom: '16px',
    fontWeight: '600',
    lineHeight: '24px',
    color: '#5E5873',
    ...textAlignStyle,
    width: '100%',
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

export const modalSearchStyle = () => {
  return {
    border: '1px solid #D8D6DE',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '10px 0px',
  };
};

export const searchIconStyle = (img, context) => {
  return {
    width: '14px',
    height: '14px',
    margin: '10px 5px 10px 14px',
  };
};

export const searchInputStyle = () => {
  return {
    padding: '8px 34px 8 14px',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '24px',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    flexGrow: 1,
  };
};

export const modalListStyle = (context) => {
  const mq = [...context.theme.breakPoints];

  return {
    height: 'calc(100% - 125px)',
    overflowY: 'auto',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    [`@media ${mq[1]}, ${mq[2]}`]: {
      height: '100%',
    },
  };
};

export const modalFootStyle = (props, state, img, context) => {
  const loadingState = state.addingMembers
    ? {
        disabled: 'true',
        pointerEvents: 'none',
        background: `url(${img}) ${context.theme.primaryColor} no-repeat right 10px center`,
      }
    : {};

  const textMargin = state.addingMembers ? { marginRight: '24px' } : {};

  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    margin: '16px 0',
    button: {
      cursor: 'pointer',
      padding: '10px 22px',
      backgroundColor: '#0065C1',
      borderRadius: '5px',
      color: '#fff',
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: '0.4px',
      outline: '0',
      border: '0',
      ...loadingState,
      span: {
        ...textMargin,
      },
    },
  };
};

export const contactMsgStyle = () => {
  return {
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55%',
  };
};

export const contactMsgTxtStyle = (context) => {
  return {
    margin: '0',
    height: '30px',
    color: `${context.theme.color.secondary}`,
    fontSize: '20px!important',
    fontWeight: '600',
  };
};

export const selectedUsersContainerStyle = (context) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap-content',
  };
};

export const selectedUserItemStyle = (context) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    padding: '3px 6px',
    alignItems: 'center',
    borderRadius: '3px',
    backgroundColor: '#4DAAEC',
    margin: '6px',
  };
};

export const selectedUserNameStyle = (context) => {
  return {
    color: '#fff',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '18px',
    marginRight: '4px',
  };
};

export const removeSelectionIconStyle = (context) => {
  return {
    height: '12px',
    width: '12px',
    cursor: 'pointer',
  };
};
