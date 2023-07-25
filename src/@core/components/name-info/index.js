import React from 'react';
import Avatar from '@components/avatar';
import lisa from '@src/assets/images/portrait/small/lisa.png';

const NameInfo = ({ name, info }) => {
  return (
    <div className="d-flex align-items-center">
      <Avatar img={lisa} imgHeight="38" imgWidth="38" />
      <div className="ms-50">
        <h6 className="mb-25">{name}</h6>
        <span className="mb-50">{info}</span>
      </div>
    </div>
  );
};
export default NameInfo;
