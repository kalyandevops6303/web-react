export const chatsWrapperStyle = (props, theme) => {
  const borderStyle =
    props._parent === ''
      ? {
          border: `1px solid ${theme.borderColor.primary}`,
        }
      : {};

  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxSizing: 'border-box',
    ...borderStyle,
    '*': {
      boxSizing: 'border-box',
      '::-webkit-scrollbar': {
        width: '8px',
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

export const chatsHeaderStyle = (theme) => {
  return {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.borderColor.primary}`,
    height: '69px',
  };
};
export const chatsHeaderSearch = () => {
  return {
    position: 'relative',
    border: '2px solid #EBE9F1',
    height: '40px',
    background: 'white',
    width: '100%',
    borderRadius: '50px',
    paddingLeft: '31px',
    paddingRight: '11px',
    paddingTop: '4px',
    paddingBottom: '4px',
    fontSize: '13px',
    color: '#555',
    ':focus': {
      outline: 'none',
    },
    '::placeholder': {
      color: '#B9B9C3',
    },
  };
};
export const chatsHeaderSearchIcon = () => {
  return {
    position: 'absolute',
    height: '12px',
    width: '12px',
    background: 'transparent',
    border: '2px solid #B9B9C3',
    left: '10px',
    top: '12px',
    borderRadius: '100%',
    '::after': {
      content: '""',
      position: 'absolute',
      background: '#B9B9C3',
      height: '6px',
      width: '2px',
      bottom: '-5px',
      right: '-3px',
      transform: 'rotate(-45deg)',
    },
  };
};
// export const chatsProfileImage=()=>
// {
// 	return {
// 		width:"30px",
// 		height:"30px",
// 		borderRadius:"50%",
// 		marginRight:"10px"
// 		}
// }
export const thumbnailStyle = () => {
  return {
    display: 'inline-block',
    width: '36px',
    height: '36px',
    flexShrink: '0',
  };
};
export const chatsHeaderContanier = () => {
  return {
    position: 'relative',
    width: '100%',
    marginLeft: '10px',
  };
};
export const upperArrowImage = () => {
  return {
    height: '20px',
    width: '20px',
    marginLeft: '20px',
    // marginTop: '16px',
    marginRight: '5px',
  };
};
export const arrowImageContainer = () => {
  return {
    display: 'flex',
    cursor: 'pointer',
  };
};
export const chatCategoryContainer = () => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: 'white',
    marginTop: '1rem',
  };
};
export const createIconCss = () => {
  return {
    height: '20px',
    width: '20px',
    marginLeft: '20px',
    // marginTop: '16px',
    marginRight: '20px',
    cursor: 'pointer',
  };
};
export const chatCategory = () => {
  return {
    color: '#2196F3',
    fontWeight: 600,
  };
};
export const unReadMessageCountAddImageDiv = () => {
  return {
    display: 'flex',
  };
};
export const chatsHeaderDiv = () => {
  return {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: '0 1rem',
  };
};
export const chatsHeaderCloseStyle = (img, theme) => {
  const mq = [...theme.breakPoints];

  return {
    cursor: 'pointer',
    display: 'none',
    mask: `url(${img}) no-repeat left center`,
    backgroundColor: `${theme.primaryColor}`,
    height: '24px',
    width: '33%',
    [`@media ${mq[0]}`]: {
      display: 'block!important',
    },
  };
};

export const chatsHeaderTitleStyle = (props) => {
  const alignment =
    props.hasOwnProperty('enableCloseMenu') && props.enableCloseMenu.length > 0
      ? {
          width: '33%',
          textAlign: 'center',
        }
      : {};

  return {
    margin: '0',
    display: 'inline-block',
    width: '100%',
    textAlign: 'left',
    fontSize: '22px',
    fontWeight: '700',
    lineHeight: '26px',
    ...alignment,
    '&[dir=rtl]': {
      textAlign: 'right',
    },
  };
};

export const chatsMsgStyle = () => {
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

export const chatsMsgTxtStyle = (theme) => {
  return {
    margin: '0',
    minHeight: '36px',
    color: `${theme.color.secondary}`,
    fontSize: '20px!important',
    fontWeight: '600',
    lineHeight: '30px',
    wordWrap: 'break-word',
    padding: '0 16px',
  };
};

export const chatsListStyle = () => {
  return {
    height: 'calc(100% - 75px)',
    width: '100%',
    // overflowY: "auto",
    margin: '0',
    padding: '0',
  };
};
