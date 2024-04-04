export const chatComposerStyle = (context) => {
  return {
    padding: '13px',
    backgroundColor: `${context.theme.backgroundColor.white}`,
    zIndex: '1',
    order: '3',
    position: 'relative',
    flex: 'none',
    // minHeight: "105px",
  };
};

export const editPreviewContainerStyle = (context, keyframes) => {
  const slideAnimation = keyframes`
    from {
        bottom: -60px
    }
    to {
        bottom: 0px
    }`;

  return {
    padding: '7px',
    backgroundColor: `${context.theme.backgroundColor.white}`,
    borderColor: `${context.theme.borderColor.primary}`,
    borderWidth: '1px 1px 1px 5px',
    borderStyle: 'solid',
    color: `${context.theme.color.helpText}`,
    fontSize: '13px',
    animation: `${slideAnimation} 0.5s ease-out`,
    position: 'relative',
  };
};

export const previewHeadingStyle = () => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
};

export const previewTextStyle = () => {
  return {
    padding: '5px 0',
  };
};

export const previewCloseStyle = (img, context) => {
  return {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    cursor: 'pointer',
    mask: `url(${img}) center center no-repeat`,
    backgroundColor: `${context.theme.primaryColor}`,
  };
};

export const inputButtonContainerStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
  };
};

export const composerInputStyle = (props, state, context) => {
  const borderRadiusVal =
    state.emojiViewer || state.stickerViewer
      ? {
          borderRadius: '0 0 8px 8px',
        }
      : {
          borderRadius: '8px',
        };

  return {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    position: 'relative',
    zIndex: '2',
    padding: '0',
    // minHeight: "85px",
    border: `1px solid ${context.theme.borderColor.primary}`,
    backgroundColor: `${context.theme.backgroundColor.white}`,
    overflow: 'hidden',
    ...borderRadiusVal,
  };
};

export const inputInnerStyle = () => {
  return {
    flex: '1 1 auto',
    position: 'relative',
    outline: 'none',
    display: 'flex',
    // flexDirection: "column",
    flexDirection: 'row',
    width: '100%',
    // minHeight: "85px",
  };
};

export const messageInputStyle = (disabled) => {
  const disabledState = disabled
    ? {
        pointerEvents: 'none',
        opacity: '0.4',
      }
    : {};

  return {
    width: '100%',
    fontSize: '12px',
    lineHeight: '24px',
    fontWeight: '400',
    padding: '10px',
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    zIndex: '1',
    // minHeight: '30px',
    height: 'auto',
    maxHeight: '100px',
    userSelect: 'text',
    ...disabledState,
    '&:empty:before': {
      content: 'attr(placeholder)',
      color: 'rgb(153, 153, 153)',
      pointerEvents: 'none',
      display: 'block' /* For Firefox */,
    },
  };
};

export const inputStickyStyle = (disabled, attachments, context) => {
  const disabledState = disabled
    ? {
        pointerEvents: 'none',
      }
    : {};

  const flexDirectionProp =
    attachments === null
      ? {
          flexDirection: 'row-reverse',
        }
      : {};

  return {
    padding: '10px 20px',
    // height: "40px",
    borderTop: `1px solid ${context.theme.borderColor.primary}`,
    // backgroundColor: `${context.theme.backgroundColor.grey}`,
    display: 'flex',
    justifyContent: 'space-between',
    ...flexDirectionProp,
    ...disabledState,
    '&:empty:before': {
      pointerEvents: 'none',
    },
  };
};

export const stickyAttachmentStyle = () => {
  return {
    display: 'flex',
    width: 'auto',
  };
};

export const attachmentIconStyle = () => {
  return {
    margin: 'auto 0',
    width: '24px',
    height: '20px',
    cursor: 'pointer',
  };
};

export const filePickerStyle = (state) => {
  const active = state.showFilePicker
    ? {
        width: 'calc(100% - 20px)',
        opacity: '1',
      }
    : {};

  return {
    width: '0',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: '1',
    opacity: '0',
    transition: 'width 0.2s ease',
    ...active,
  };
};

export const fileListStyle = () => {
  return {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0 0 16px',
  };
};

export const fileItemStyle = (img, context) => {
  return {
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 16px 0 0',
    ' > i': {
      width: '24px',
      height: '24px',
      display: 'inline-block',
      mask: `url(${img}) center center no-repeat`,
      backgroundColor: `${context.theme.secondaryTextColor}`,
    },
    ' > input': {
      display: 'none',
    },
  };
};

export const stickyAttachButtonStyle = (img, context) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '18px',
    img: {
      width: '18px',
      height: '18px',
      display: 'inline-block',
    },
  };
};

export const stickyButtonStyle = (state) => {
  const active = state.showFilePicker
    ? {
        display: 'none',
      }
    : {
        display: 'flex',
      };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: 'auto',
    ...active,
  };
};

export const emojiButtonStyle = (img, context) => {
  return {
    height: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 0 16px',
    img: {
      width: '18px',
      height: '18px',
      display: 'inline-block',
    },
  };
};

export const sendButtonStyle = (img, context) => {
  return {
    height: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 0 16px',
    i: {
      width: '18px',
      height: '18px',
      display: 'inline-block',
      mask: `url(${img}) center center no-repeat`,
      backgroundColor: `${context.theme.primaryColor}`,
    },
  };
};

export const newSendButtonStyle = () => {
  return {
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#0185E4',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.4px',
    marginLeft: '14px',
    cursor: 'pointer',
  };
};

export const newSendButtonContainerStyle = () => {
  return {
    alignSelf: 'flex-start',
    padding: '2px 0',
  };
};

export const reactionBtnStyle = () => {
  return {
    cursor: 'pointer',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 0 16px',
  };
};

export const stickerBtnStyle = (img, context) => {
  return {
    cursor: 'pointer',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 0 16px',
    i: {
      width: '18px',
      height: '18px',
      display: 'inline-block',
      mask: `url(${img}) center center no-repeat`,
      backgroundColor: `${context.theme.secondaryTextColor}`,
    },
  };
};

export const milestoneContainerStyle = () => {
  return {
    borderRadius: '5px',
    backgroundColor: `#84CCFF1F`,
    width: '100%',
    maxWidth: '330px',
    height: '130px',
    margin: '13px',
  };
};

export const milestoneHeaderStyle = () => {
  return {
    padding: '10px 20px',
    position: 'relative',
  };
};

export const milestoneTitleStyle = () => {
  return {
    color: '#616161',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
  };
};

export const milestoneCloseIconStyle = () => {
  return {
    position: 'absolute',
    backgroundColor: '#21212166',
    height: '24px',
    width: '24px',
    borderRadius: '12px',
    right: '-9px',
    top: '-9px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };
};

export const milestoneBodyStyle = () => {
  return {
    padding: '10px 20px',
  };
};

export const milestoneAttachmentTileStyle = () => {
  return {
    borderRadius: '5px',
    backgroundColor: '#fff',
    padding: '10px',
    display: 'flex',
  };
};

export const milestoneAttachmentTileAvatarContainerStyle = () => {
  return {
    backgroundColor: '#0185E41F',
    height: '42px',
    width: '42px',
    borderRadius: '21px',
    marginRight: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

export const milestoneAttachmentTileAvatarStyle = () => {
  return {
    height: '24px',
  };
};

export const milestoneAttachmentTileBodyStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };
};

export const milestoneAttachmentFileNameStyle = () => {
  return {
    color: '#5E5873',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
  };
};

export const milestoneAttachmentFileSizeStyle = () => {
  return {
    color: '#B9B9C3',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '12px',
  };
};
