/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { TagsWrap } from './style';

const TagsSection = ({ tags, open }) => {
  const [visibleTags, setVisibleTags] = useState([]);
  const [hiddenTagsCount, setHiddenTagsCount] = useState(0);
  const calculateTagWidth = (tagName) => {
    const tempTag = document.createElement('span');
    tempTag.textContent = tagName;
    tempTag.style.whiteSpace = 'nowrap';
    tempTag.style.position = 'fixed'; // Ensures the element doesn't affect layout
    tempTag.style.visibility = 'hidden'; // Keeps the element hidden

    document.body.appendChild(tempTag);
    const tagWidth = tempTag.getBoundingClientRect().width;
    document.body.removeChild(tempTag);
    if (tagWidth > 120) {
      return 120;
    }
    return tagWidth;
  };
  const arrangeTags = () => {
    const tagsContainer = document.querySelector('.tags-wrap');
    const containerWidth = tagsContainer.getBoundingClientRect().width - 16;

    const tagsArray = tags?.map((item) => item.name);
    let currentRowWidth = 0;
    let visibleTagsCount = 0;
    const visibleTagsArray = [];
    // eslint-disable-next-line no-plusplus

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

    const hiddenTagsCount2 = tagsArray.length - visibleTagsCount;
    setVisibleTags(visibleTagsArray);
    setHiddenTagsCount(hiddenTagsCount2);
  };

  useEffect(() => {
    arrangeTags();
    const handleResize = () => arrangeTags();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [tags, open]);

  return (
    <TagsWrap className="tags-wrap align-items-center">
      <div className="badge-box-wrap">
        {visibleTags?.map((tag) => (
          <Badge key={tag} className="tag-margin">
            {tag}
          </Badge>
        ))}
      </div>
      {hiddenTagsCount > 0 && (
        <div className="additional-text">
          <span className="d-block mb-50">+{hiddenTagsCount}</span>
        </div>
      )}
    </TagsWrap>
  );
};

TagsSection.propTypes = {
  tags: PropTypes.array,
  open: PropTypes.string,
};
TagsSection.defaultProps = {
  tags: [],
  open: '',
};
export default TagsSection;
