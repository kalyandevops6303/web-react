import React, { useState, useEffect } from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { CustomBadge } from '../../../views/styled';
import { BadgeGroupWrap } from './style';

const BadgeGroup = ({ user_id, data, title, color }) => {
  const [visibleTags, setVisibleTags] = useState([]);
  const [hiddenTagsCount, setHiddenTagsCount] = useState(0);
  if (!data || data.length === 0) {
    return null;
  }

  if (data?.name) {
    return (
      <BadgeGroupWrap>
        <div className="badge-box-wrap mb-50">
          <div className="info-key">{title || ''}</div>
          <div className="badge-box mt-25">
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

  useEffect(() => {
    arrangeTags();
    const handleResize = () => arrangeTags();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  const arrangeTags = () => {
    const tagsContainer = document.querySelector('.badge-box-wrap');
    const containerWidth = tagsContainer.getBoundingClientRect().width - 17;

    const tagsArray = data?.map((item) => item.name);

    let currentRowWidth = 0;
    let visibleTagsCount = 0;
    const visibleTagsArray = [];
    for (let i = 0; i < tagsArray.length; i++) {
      const tagWidth = calculateTagWidth(tagsArray[i]);
      console.log(containerWidth, 'container', tagWidth);

      if (currentRowWidth + tagWidth < containerWidth) {
        visibleTagsCount++;
        visibleTagsArray.push(tagsArray[i]);
        currentRowWidth += tagWidth;
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

    return tagWidth;
  };

  const renderBadge = (name, index) => {
    // const { name } = item;
    const isLongName = name.length > 35;
    const badgeClassName = isLongName ? `${color} truncate-1` : color;
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
  const customBadgeId = `tooltip-${title}-${user_id}`; // Generate a unique ID using uuidv4()
  console.log(document.getElementById(customBadgeId));
  return (
    <BadgeGroupWrap>
      <div className="badge-box-wrap mb-50">
        <div className="info-key">{title || ''}</div>
        <div className="d-flex align-items-center">
          <div className="badge-box mt-25">{visibleTags && visibleTags?.map(renderBadge)}</div>
          {hiddenTagsCount > 0 && (
            <>
              <CustomBadge id={customBadgeId}>
                <Badge color="light-blue" className="light-blue">
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
