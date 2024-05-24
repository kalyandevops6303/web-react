import React from 'react';
import { Quill } from 'react-quill';
// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar',
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
];

// Quill Toolbar component
const QuillToolbar = () => (
  <div id="toolbar" className="w-full">
    <span className="ql-formats">
      <button className="ql-bold" type="button" aria-label="Bold" />
      <button className="ql-italic" type="button" aria-label="Italic" />
      <button className="ql-underline" type="button" aria-label="Underline" />
      <button className="ql-strike" type="button" aria-label="Strikethrough" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" type="button" value="ordered" aria-label="Ordered List" />
      <button className="ql-list" type="button" value="bullet" aria-label="Bullet List" />
      <button className="ql-indent" type="button" value="-1" aria-label="Decrease Indent" />
      <button className="ql-indent" type="button" value="+1" aria-label="Increase Indent" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" type="button" value="super" aria-label="Superscript" />
      <button className="ql-script" type="button" value="sub" aria-label="Subscript" />
      <button className="ql-blockquote" type="button" aria-label="Blockquote" />
      <button className="ql-direction" type="button" aria-label="Text Direction" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" aria-label="Text Alignment" />
      <button className="ql-link" type="button" aria-label="Insert Link" />
    </span>
  </div>
);

export default QuillToolbar;
