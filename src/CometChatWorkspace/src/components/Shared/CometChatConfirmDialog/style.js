export const alertWrapperStyle = (props) => {
  return {
    // width: "500px",
    // height: "auto",
    maxWidth: '600px',
    backgroundColor: `${props.theme.backgroundColor.white}`,
    position: 'fixed',
    // margin: "auto",
    padding: '30px 24px',
    fontSize: '13px',
    borderRadius: '8px',
    border: '1px solid #eee',
    zIndex: '4',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
};

export const crossIconContainerStyle = () => {
  return {
    position: 'absolute',
    top: '-7px',
    right: '-7px',
    padding: '7px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: 'rgba(44, 63, 88, 0.22) 0px 4px 15px 0px',
  };
};

export const crossIconStyle = () => {
  return {
    width: '20px',
  };
};

export const confirmDialogBodyStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
  };
};

export const confirmDialogImgWrapperStyle = () => {
  return {
    padding: '13px',
  };
};

export const confirmDialogImgStyle = () => {
  return {
    height: '120px',
  };
};

export const confirmDialogContentWrapperStyle = () => {
  return {
    padding: '13px',
  };
};

export const confirmDialogContentHeadingStyle = () => {
  return {
    color: '#EA5455',
    fontSize: '26px',
    fontWeight: '500',
    marginBottom: '8px',
  };
};

export const confirmDialogContentStyle = () => {
  return {
    color: '#6E6B7B',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    margin: '4px 0',
  };
};

export const confirmDialogContentNoteStyle = () => {
  return {
    color: '#6E6B7B',
    fontSize: '13px',
    fontWeight: '600',
    margin: '6px 0',
  };
};

// export const alertMessageStyle = () => {
// 	return {
// 		textAlign: "center",
// 	};
// };

export const alertButtonStyle = (props) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '24px 0 0 0',
    '> button': {
      padding: '8px 20px',
      margin: '0 12px',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    '> button[value=yes]': {
      backgroundColor: `#EA5455`,
      color: `${props.theme.color.white}`,
      border: '0',
      fontWeight: '500',
    },
    '> button[value=no]': {
      border: `1px solid ${props.theme.primaryColor}`,
      color: `${props.theme.primaryColor}`,
      backgroundColor: `${props.theme.color.white}`,
      fontWeight: '400',
    },
  };
};
