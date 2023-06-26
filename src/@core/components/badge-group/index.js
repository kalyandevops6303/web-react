import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import BadgeGroupWrap from './style';
import { CustomBadge } from '../../../views/styled';

const BadgeGroup = ({ title, data, color }) => {
  if (data?.length === 0) {
    return <></>;
  }

  return (
    <BadgeGroupWrap>
      <div className="badge-box-wrap mb-50">
        <div className="info-key">{data?.length > 0 ? title : ''}</div>
        <div className="badge-box mt-75">
          {data?.map((item, index) => (
            <span key={index}>
              {item?.name?.length > 35 ? (
                <>
                  <CustomBadge>
                    <Badge className={`${color} truncate-1`} color={`${color} badge`} id={`tooltip-${index}`}>
                      {item?.name}
                    </Badge>
                  </CustomBadge>
                  <UncontrolledTooltip target={`tooltip-${index}`}>{item?.name}</UncontrolledTooltip>
                </>
              ) : (
                <CustomBadge>
                  <Badge className={color} color={`${color} badge`}>
                    {item?.name}
                  </Badge>
                </CustomBadge>
              )}
            </span>
          ))}
        </div>
      </div>
    </BadgeGroupWrap>
  );
};

export default BadgeGroup;
