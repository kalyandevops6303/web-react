/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import Tagwrapper from './style';

const Tag = ({ count, hasNew }) => {
  if (!count) {
    return '';
  }
  return (
    <Tagwrapper>
      <span className="tag">{count < 10 ? `0${count}` : count}</span>
      {hasNew && <span className="dot" />}
    </Tagwrapper>
  );
};
Tag.propTypes = {
  count: PropTypes.number,
  hasNew: PropTypes.bool,
};
export default Tag;
