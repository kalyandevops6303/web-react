/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import Tagwrapper from './style';

const Tag = ({ children, hasNew }) => (
  <Tagwrapper>
    <span className="tag">{children}</span>
    {hasNew && <span className="dot" />}
  </Tagwrapper>
);
Tag.propTypes = {
  children: PropTypes.element,
  hasNew: PropTypes.bool,
};
export default Tag;
