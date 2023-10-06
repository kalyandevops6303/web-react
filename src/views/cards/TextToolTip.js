/* eslint-disable react/prop-types */
import { UncontrolledTooltip } from 'reactstrap';

const TextToolTip = ({ text, id }) => {
  const isLongText = text?.length > 8;
  return (
    <div>
      <span id={id} className={isLongText ? 'truncate-1' : ''}>
        {text}
      </span>
      {isLongText && id ? <UncontrolledTooltip target={id}>{text}</UncontrolledTooltip> : null}
    </div>
  );
};
export default TextToolTip;
