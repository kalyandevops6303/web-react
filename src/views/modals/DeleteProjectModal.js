import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { DeleteModalWrapper } from './style';

const DeleteProjectModal = ({ modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <DeleteModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
            <div>
              <CardTitle className="modal-title-custom">Delete Project</CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">
                Are you sure you would want to delete this project?
              </CardSubtitle>
              <CardText className="desc fw-light w-76">
                <ol>
                  <li>This project will be delisted from marketplace.</li>
                  <li>You will lose all the project details.</li>
                  <li>Talents wont be able to bid for this project</li>
                </ol>
              </CardText>
              <section className="d-flex gap-1 stats">
                <div className="names">
                  <CardText className="value  mb-25">Usage data collection and payment</CardText>
                  <small className="key">Prject Name</small>
                </div>
                <div>
                  <CardText className="value mb-25">$1000</CardText>
                  <small className="key">Fixed amount</small>
                </div>
              </section>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button outline color="primary">
              Cancel
            </Button>
            <Button color="danger">Delete Project</Button>
          </div>
        </DeleteModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default DeleteProjectModal;

DeleteProjectModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

DeleteProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
