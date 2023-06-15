import React from 'react';
import { Badge } from 'reactstrap';
import BadgeGroupWrap from './style';

const BadgeGroup = ({ title, data, color }) => {
  if (data?.length == 0) {
    return <></>;
  }
  return (
    <BadgeGroupWrap>
      <div className="badge-box-wrap">
        <div className="info-key mt-50">{title}</div>
        <div className="badge-box mt-75">
          {data
            ? data?.map((item) => {
                return <Badge color={`${color} badge`}>{item?.name}</Badge>;
              })
            : '-'}
        </div>
      </div>
    </BadgeGroupWrap>
  );
};
export default BadgeGroup;
