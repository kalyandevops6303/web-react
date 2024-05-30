import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// eslint-disable-next-line import/no-named-as-default
import QuillToolbar, {  formats, modules } from './EditorToolBar';

const TextEditor = ({ placeholder, name, onChange, value }) =>  (
    <div className="flex flex-col">
      <QuillToolbar />
      <ReactQuill
        placeholder={placeholder}
        name={name}
        id={name}
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        className="w-full border-2"
        onChange={onChange}
      />
    </div>
  );

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

TextEditor.defaultProps = {
  placeholder: 'Write something...',
};

export default TextEditor;
