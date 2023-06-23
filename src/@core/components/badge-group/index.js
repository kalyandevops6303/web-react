import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import BadgeGroupWrap from './style';
import { CustomBadge } from '../../../views/styled';
import { isArray } from 'lodash';

const data1 = {
  skills: [
    {
      _id: '6486a65e34730cac6a48042b',
      name: '.NET Framework',
    },
    {
      _id: '6486a65e34730cac6a480436',
      name: 'AWS (Amazon Web Services)',
    },
    {
      _id: '6486a65e34730cac6a480443',
      name: 'D3.js (Data-Driven Documents)',
    },
    {
      _id: '6486a65e34730cac6a480467',
      name: 'Mobile App Security',
    },
    {
      _id: '6486a65e34730cac6a480481',
      name: 'Selenium',
    },
  ],
  tools: [],
  area: { _id: '6486a65e34730cac6a480481', name: 'Selenium' },
};
const BadgeGroup = ({ title, data, color }) => {
  if (!isArray(data)) {
    return (
      <BadgeGroupWrap>
        <div className="badge-box-wrap mb-50">
          <div className="info-key">{title || ''}</div>
          <div className="badge-box mt-75">
            <CustomBadge>
              <Badge className={color} color={`${color} badge`}>
                {data?.name}
              </Badge>
            </CustomBadge>
          </div>
        </div>
      </BadgeGroupWrap>
    );
  }
  if (data?.length === 0) {
    return <></>;
  }

  return (
    <BadgeGroupWrap>
      <div className="badge-box-wrap mb-50">
        <div className="info-key">{data?.length > 0 ? title : ''}</div>
        <div className="badge-box mt-75">
          {data &&
            data?.map((item, index) => (
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
