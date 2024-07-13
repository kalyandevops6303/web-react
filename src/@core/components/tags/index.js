/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import Tagwrapper from './style';

const Tag = ({ count, hasNew, noMargin }) => {
  if (!count) {
    count = 0;
  }

  return (
    <Tagwrapper noMargin={!!noMargin}>
      <span className="tag">{count < 10 && count > 0 ? `0${count}` : count}</span>
      {hasNew ? <span className="dot" /> : null}
    </Tagwrapper>
  );
};
Tag.propTypes = {
  count: PropTypes.number,
  hasNew: PropTypes.bool,
};
export default Tag;
