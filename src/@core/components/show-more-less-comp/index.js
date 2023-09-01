import { useState } from 'react';
import PropTypes from 'prop-types';
import theme from '../../../configs/themeVariables';

const ShowMoreLess = ({ content, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedContent = isExpanded ? content : content?.slice(0, maxLength);

  return (
    <p>
      <span>{displayedContent}</span>
      {content?.length > maxLength && (
        <span className="cursor-pointer" style={{ color: theme.activeNavPillText }} onClick={toggleExpanded}>
          {isExpanded ? ' read less' : '... read more'}
        </span>
      )}
    </p>
  );
};
ShowMoreLess.propTypes = {
  content: PropTypes.string,
  maxLength: PropTypes.number,
};
ShowMoreLess.defalutProps = {
  maxLength: 100,
  content: '',
};
export default ShowMoreLess;
