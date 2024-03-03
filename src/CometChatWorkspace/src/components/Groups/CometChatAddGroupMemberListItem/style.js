export const modalRowStyle = (theme, checked) => {
  return {
    border: `1px solid ${theme.borderColor.primary}`,
    display: 'flex',
    width: '100%',
    fontSize: '14px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: checked ? '#84C8FF59' : '#fff',
    '&:not(:last-child)': {
      borderBottom: 'none',
    },
  };
};

export const modalColumnStyle = () => {
  return {
    width: 'calc(100% - 50px)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12px 6px',
  };
};

export const avatarStyle = () => {
  return {
    display: 'inline-block',
    float: 'left',
    width: '40px',
    height: '40px',
    marginRight: '8px',
  };
};

export const contentContainerStyle = () => {
  return {
    width: 'calc(100% - 50px)',
  };
};

export const nameStyle = () => {
  return {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '15px',
    lineHeight: '24px',
    fontWeight: '500',
    color: '#5E5873',
  };
};

export const aboutStyle = () => {
  return {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: '400',
    color: '#B9B9C3',
  };
};

export const selectionColumnStyle = () => {
  return {
    padding: '8px',
    width: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

export const selectionBoxStyle = () => {
  return {};
};
