import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import Notepad from '../../assets/images/youDidIt.gif';
import { YouDidItGifContainer } from './style';

const DocumentsModal = () => {


  return ( 
    <Modal isOpen={true} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      
      <ModalBody>
        <div className="d-flex pr-1">
          <div>
          Hello
          </div>
        </div>

      </ModalBody>
    </Modal>
  );
};

export default DocumentsModal;

DocumentsModal.propTypes = {
};

DocumentsModal.defaultProps = {

};
