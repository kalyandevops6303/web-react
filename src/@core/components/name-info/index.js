import React from 'react';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';

const NameInfo = ({ name, info, img }) => {
  return (
    <div className="d-flex align-items-center">
      <Avatar img={img || defaultAvatar} imgHeight="38" imgWidth="38" />
      <div className="ms-50">
        <h6 className="mb-25">{name}</h6>
        <span className="mb-50">{info}</span>
      </div>
    </div>
  );
};
export default NameInfo;
