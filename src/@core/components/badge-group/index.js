import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import BadgeGroupWrap from './style';
import { CustomBadge } from '../../../views/styled';

const BadgeGroup = ({ title, data, color, gapWrap, isTeamAssociations }) => {
  if (!data || data.length === 0) {
    return null;
  }
  if (data?.name) {
    return (
      <BadgeGroupWrap>
        <div className="badge-box-wrap mb-50">
          <div className="info-key">{title || ''}</div>
          <div className="badge-box mt-75">
            <CustomBadge>
              <Badge className={color} color={color}>
                {data?.name}
              </Badge>
            </CustomBadge>
          </div>
        </div>
      </BadgeGroupWrap>
    );
  }

  const renderBadge = (item, index) => {
    console.log(item);
    const { name } = item;
    const isLongName = isTeamAssociations ? item.length > 35 : name?.length > 35;
    const badgeClassName = isLongName ? `${color} truncate-1` : color;
    const badgeColor = `${color} badge`;

    return (
      <span key={index}>
        {isLongName ? (
          <>
            <CustomBadge>
              <Badge className={badgeClassName} color={badgeColor} id={`tooltip-${index}`}>
                {name || item}
              </Badge>
            </CustomBadge>
            <UncontrolledTooltip target={`tooltip-${index}`}>{name}</UncontrolledTooltip>
          </>
        ) : (
          <CustomBadge>
            <Badge className={badgeClassName} color={badgeColor}>
              {name || item}
            </Badge>
          </CustomBadge>
        )}
      </span>
    );
  };

  return (
    <BadgeGroupWrap>
      <div className="badge-box-wrap mb-50">
        <div className="info-key">{title || ''}</div>
        <div className={`badge-box mt-75 ${gapWrap && 'd-flex flex-wrap gap-50'}`}>
          {data && data?.map(renderBadge)}
        </div>
      </div>
    </BadgeGroupWrap>
  );
};

export default BadgeGroup;
