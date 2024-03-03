export const presenceStyle = (props) => {
  let presenceStatus = {
    backgroundColor: '#ff9c44',
  };

  if (props.status === 'online' || props.status === 'available') {
    presenceStatus = {
      // backgroundColor: "#3BDF2F",
      backgroundColor: '#28c76f',
    };
  }

  return {
    width: '11px',
    height: '11px',
    top: '-12px',
    float: 'right',
    position: 'relative',
    ...presenceStatus,
  };
};
