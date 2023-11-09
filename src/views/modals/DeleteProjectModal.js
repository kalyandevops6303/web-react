import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { DeleteModalWrapper } from './style';

const DeleteProjectModal = ({ modal, toggleModal, data }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style delete-modal" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <DeleteModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={DeleteGif} width={150} height={150} alt="gif" />
            <div>
              <CardTitle className="modal-title-custom">Delete Project</CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">Don’t want to continue with the project? </CardSubtitle>
              <CardText className="desc fw-light w-76">
                <span className="fw-bolder">Delete : </span> Deleting the project will remove this project from the
                platform.
              </CardText>
              <CardText className="desc fw-light w-76">
                <span className="fw-bolder">Relist Project :</span> Relisting the project will terminate the contract
                with the existing team/talent & list this project back in marketplace.
              </CardText>
              <section className="mt-3 d-flex gap-1 stats">
                <div className="names">
                  <CardText className="value  mb-25">{data?.details?.name}</CardText>
                  <small className="key">Prject Name</small>
                </div>
                <div>
                  <CardText className="value mb-25">-</CardText>
                  <small className="key">Team name</small>
                </div>
              </section>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button outline color="danger">
              Delete
            </Button>
            <Button color="danger">Relist Project</Button>
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
  data: Proptypes.object,
};

DeleteProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
};
