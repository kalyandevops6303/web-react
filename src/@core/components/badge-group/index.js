import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import BadgeGroupWrap from './style';

const BadgeGroup = ({ title, data, color }) => {
  if (data?.length === 0) {
    return <></>;
  }
  console.log(data);

  return (
    <BadgeGroupWrap>
      <div className="badge-box-wrap">
        <div className="info-key mt-50">{title}</div>
        <div className="badge-box mt-75">
          {data
            ? data.map((item, index) => (
                <span key={index}>
                  {item?.name?.length > 35 ? (
                    <>
                      <Badge className="truncate-1" color={`${color} badge`} id={`tooltip-${index}`}>
                        {item?.name}
                      </Badge>
                      <UncontrolledTooltip target={`tooltip-${index}`}>{item?.name}</UncontrolledTooltip>
                    </>
                  ) : (
                    <Badge color={`${color} badge`}>{item?.name}</Badge>
                  )}
                </span>
              ))
            : '-'}
        </div>
      </div>
    </BadgeGroupWrap>
  );
};

export default BadgeGroup;
