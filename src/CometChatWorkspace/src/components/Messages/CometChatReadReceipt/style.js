export const msgTimestampStyle = (context, props, loggedInUser) => {
  return {
    display: 'flex',
    fontSize: '12px',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: '18px',
    textAlign: 'right',
    textTransform: 'lowercase',
    // color: `${context.theme.color.search}`,
    color: '#616161',
  };
};

export const iconStyle = (img, color) => {
  return {
    mask: `url(${img}) center center no-repeat`,
    backgroundColor: `${color}`,
    display: 'inline-block',
    width: '24px',
    height: '24px',
  };
};
