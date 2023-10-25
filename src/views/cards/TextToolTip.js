import { useEffect, useRef, useState } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { PropTypes } from 'prop-types';

const TextToolTip = ({ text, id }) => {
  const ref = useRef(null);
  const [isLongText, setIsLongText] = useState(false);

  useEffect(() => {
    if (ref.current && ref.current.scrollWidth > ref.current.offsetWidth) {
      setIsLongText(true);
    } else {
      setIsLongText(false);
    }
  }, [text]);

  return (
    <>
      <span
        id={id}
        className="w-100"
        ref={ref}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {text}
      </span>
      {isLongText && id ? <UncontrolledTooltip target={id}>{text}</UncontrolledTooltip> : null}
    </>
  );
};

TextToolTip.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
};

TextToolTip.defaultProps = {
  text: '',
  id: '',
};

export default TextToolTip;
