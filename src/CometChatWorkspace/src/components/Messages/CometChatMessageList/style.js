export const chatListStyle = (context) => {
  return {
    backgroundColor: `${context.theme.backgroundColor.white}`,
    // background: "url('/images/background-image.png'), lightgray 0px 0px / 100% 100% no-repeat",
    zIndex: '1',
    width: '100%',
    flex: '1 1 0',
    order: '2',
    position: 'relative',
  };
};

export const listWrapperStyle = () => {
  return {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    position: 'absolute',
    top: '0',
    transition: 'background .3s ease-out .1s',
    width: '100%',
    zIndex: '100',
    paddingTop: '16px',
    // paddingLeft: "5px",
    // paddingRight: "5px",
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

export const messageDateContainerStyle = () => {
  return {
    // marginBottom: "16px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '35px',
  };
};

export const messageDateStyle = (context) => {
  return {
    padding: '8px 12px',
    backgroundColor: '#fff',
    color: '#6e6b7b',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '18px',
    // backgroundColor: `${context.theme.backgroundColor.secondary}`,
    // color: `${context.theme.color.primary}`,
    borderRadius: '10px',
  };
};

export const decoratorMessageStyle = () => {
  return {
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
  };
};

export const decoratorMessageTxtStyle = (context) => {
  return {
    margin: '0',
    height: '36px',
    color: `${context.theme.color.secondary}`,
    fontSize: '20px!important',
    fontWeight: '600',
    lineHeight: '30px',
  };
};
