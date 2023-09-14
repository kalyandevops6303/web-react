import React, { useState, useEffect } from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { CustomBadge } from '../../../views/styled';
import { BadgeGroupWrap } from './style';

const BadgeGroup = ({ user_id, data, title, color ,id}) => {
  const [visibleTags, setVisibleTags] = useState([]);
  const [hiddenTagsCount, setHiddenTagsCount] = useState(0);
  if (!data || data.length === 0) {
    return null;
  }
  const renderBadge = (name, index) => {
    const isLongName = name?.length > 35;
    const badgeClassName = isLongName ? `${color}` : color;
    const badgeColor = `${color} badge`;
    return (
      <span key={index}>
        {isLongName ? (
          <>
            <CustomBadge>
              <Badge className={badgeClassName} color={badgeColor} id={`tooltip-${index}`}>
                {name}
              </Badge>
            </CustomBadge>
            <UncontrolledTooltip target={`tooltip-${index}`}>{name}</UncontrolledTooltip>
          </>
        ) : (
          <CustomBadge>
            <Badge className={badgeClassName} color={badgeColor}>
              {name}
            </Badge>
          </CustomBadge>
        )}
      </span>
    );
  };

  if (data?.name) {
    return (
      <BadgeGroupWrap>
        <div className="badge-box-wrap mb-50">
          <div className="info-key">{title || ''}</div>
          <div className="badge-box mt-25">{renderBadge(data.name, 0)}</div>
        </div>
      </BadgeGroupWrap>
    );
  }

  useEffect(() => {
    arrangeTags();
    const handleResize = () => arrangeTags();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  // This width is for the dynamic badge count that will be displayed, based on the number of tags. Substract this width from container width to have exact width of container.
  const widthToMinus = window.location.pathname.split('/')?.includes('search') ? 17 : 31;

  const arrangeTags = () => {
    const tagsContainer = document.querySelector('.badge-box-wrap');
    const containerWidth = tagsContainer.getBoundingClientRect().width - widthToMinus;

    const tagsArray = data?.map((item) => item.name);

    let currentRowWidth = 0;
    let visibleTagsCount = 0;
    const visibleTagsArray = [];
    for (let i = 0; i < tagsArray.length; i++) {
      const tagWidth = calculateTagWidth(tagsArray[i]);
      if (currentRowWidth + tagWidth < containerWidth) {
        visibleTagsCount++;
        visibleTagsArray.push(tagsArray[i]);
        currentRowWidth = currentRowWidth + tagWidth + 8;
      } else {
        break;
      }
    }
    const hiddenTagsCount = tagsArray.length - visibleTagsCount;
    setVisibleTags(visibleTagsArray);
    setHiddenTagsCount(hiddenTagsCount);
  };

  const calculateTagWidth = (tagName) => {
    const tempTag = document.createElement('span');
    tempTag.textContent = tagName;
    tempTag.style.whiteSpace = 'nowrap';
    tempTag.style.position = 'fixed'; // Ensures the element doesn't affect layout
    tempTag.style.visibility = 'hidden'; // Keeps the element hidden

    document.body.appendChild(tempTag);
    const tagWidth = tempTag.getBoundingClientRect().width;
    document.body.removeChild(tempTag);

    const tagsContainer = document.querySelector('.badge-box-wrap');
    const containerWidth = tagsContainer.getBoundingClientRect().width - widthToMinus;

    if (tagWidth > containerWidth) {
      return containerWidth - 16;
    }

    return tagWidth;
  };

  const customBadgeId = `tooltip-${id}-${user_id}`; // Generate a unique ID using uuidv4()
  return (
    <BadgeGroupWrap>
      <div className="badge-box-wrap mb-50">
        <div className="info-key">{title || ''}</div>
        <div className="d-flex align-items-center">
          <div className="badge-box mt-25">{visibleTags && visibleTags?.map(renderBadge)}</div>
          {hiddenTagsCount > 0 && (
            <>
              <CustomBadge id={customBadgeId} className="count">
                <Badge color="light-blue" className="light-blue ">
                  + {hiddenTagsCount}
                </Badge>
              </CustomBadge>
              <UncontrolledTooltip placement="right" target={customBadgeId}>
                {data
                  ?.filter((item) => !visibleTags.includes(item.name))
                  .map((item, index) => (
                    <span key={index}>
                      {index > 0 && ', '}
                      {item.name}
                    </span>
                  ))}
              </UncontrolledTooltip>
            </>
          )}
        </div>
      </div>
    </BadgeGroupWrap>
  );
};

export default BadgeGroup;
