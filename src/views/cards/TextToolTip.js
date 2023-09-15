/* eslint-disable react/prop-types */
import { UncontrolledTooltip } from 'reactstrap';

const TextToolTip = ({ text, id }) => {
  const isLongText = text?.length > 8;
  return (
    <div>
      <span id={`tooltip-${id}`} className={`${isLongText ? 'truncate-1' : ''}`}>
        {text}
      </span>
      {isLongText ? <UncontrolledTooltip target={`tooltip-${id}`}>{text}</UncontrolledTooltip> : null}
    </div>
  );
};
export default TextToolTip;
