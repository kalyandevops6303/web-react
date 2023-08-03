// ** React Imports
import ReactDOM from 'react-dom';
import { useEffect, useState, useRef } from 'react';

// ** Third Party Components
import PropTypes from 'prop-types';

// ** Styles Imports
import '@styles/base/bootstrap-extended/_include.scss';
import './autocomplete.scss';

const Autocomplete = (props) => {
  // ** Refs
  const container = useRef(null);
  const inputElRef = useRef(null);

  // ** States
  const [focused, setFocused] = useState(false);
  const [userInput, setUserInput] = useState(props.value ? props.value : '');

  // ** Input On Change Event
  const onChange = (e) => {
    const userInput = e.currentTarget.value;
    setUserInput(userInput);
  };

  // ** Input Click Event
  const onInputClick = (e) => {
    e.stopPropagation();
  };

  // ** Input's Keydown Event
  const onKeyDown = (e) => {
    // ** Custom Keydown Event
    if (props.onKeyDown !== undefined && props.onKeyDown !== null) {
      props.onKeyDown(e, userInput);
    }
  };

  //** ComponentDidUpdate
  useEffect(() => {
    const textInput = ReactDOM.findDOMNode(inputElRef.current);

    // ** For searchbar focus
    if (textInput !== null && props.autoFocus) {
      inputElRef.current.focus();
    }

    // ** Function to run on user passed Clear Input
    if (props.clearInput) {
      props.clearInput(userInput, setUserInput);
    }
  }, [focused, userInput, props]);

  return (
    <div className="autocomplete-container" ref={container}>
      <input
        type="text"
        onChange={(e) => {
          onChange(e);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        onKeyDown={(e) => onKeyDown(e)}
        onClick={onInputClick}
        className={`autocomplete-search ${props.className ? props.className : ''}`}
        placeholder={props.placeholder}
        ref={inputElRef}
        defaultValue={props.defaultValue}
        onFocus={() => setFocused(true)}
        autoFocus={props.autoFocus}
        onBlur={(e) => {
          if (props.onBlur) props.onBlur(e);
          setFocused(false);
        }}
      />
    </div>
  );
};

export default Autocomplete;

// ** PropTypes
Autocomplete.propTypes = {
  grouped: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  clearInput: PropTypes.func,
  placeholder: PropTypes.string,
  externalClick: PropTypes.func,
  defaultValue: PropTypes.string,
  wrapperClass: PropTypes.string,
  filterHeaderKey: PropTypes.string,
  suggestionLimit: PropTypes.number,
  onSuggestionsShown: PropTypes.func,
  onSuggestionItemClick: PropTypes.func,
  filterKey: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
};
