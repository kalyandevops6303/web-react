export const badgeStyle = (props) => {
  let style = {};
  if (props.mt !== undefined) {
    style = {
      marginTop: props.mt,
    };
  }
  if (props.mr !== undefined) {
    style = {
      ...style,
      marginRight: props.mr,
    };
  }
  return {
    display: 'block',
    fontSize: '12px',
    width: '20px',
    height: '20px',
    borderRadius: '18px',
    backgroundColor: '#f05454',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: '18px',
    padding: '1.5px',
    opacity: '1',
    transition: 'opacity .1s',
    ...style,
  };
};
