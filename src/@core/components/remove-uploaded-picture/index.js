import React from 'react';
import '../../../views/custom-styles.scss';
import { Trash2, Upload } from 'react-feather';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';

const RemoveUploadedPicture = ({ fileInputRef, onRemovePicture, offset }) => {
  return (
    <UncontrolledPopover trigger="legacy" placement="bottom" target="popFocus" offset={offset}>
      <PopoverBody className="p-0">
        <div
          className="btn-option-1 py-1 px-2 d-flex cursor-pointer align-items-center hover:bg-trublue-light hover:text-trublue-secondary-500"
          onClick={() => fileInputRef.current.click()}
        >
          <Upload size={18} className="me-50" />
          <p className="m-0">Upload from device</p>
        </div>
        <div
          className="btn-option-2 py-1 px-2 d-flex cursor-pointer align-items-center hover:bg-trublue-light hover:text-trublue-secondary-500"
          onClick={onRemovePicture}
        >
          <Trash2 size={18} className="me-50" />
          <p className="m-0">Remove current picture</p>
        </div>
      </PopoverBody>
    </UncontrolledPopover>
  );
};

export default RemoveUploadedPicture;
