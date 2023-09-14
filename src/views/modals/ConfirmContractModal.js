import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import AcceptGif from '../../assets/images/gifs/accept_contract.gif';
import { AcceptModalWrapper } from './style';

const ConfirmContractModal = ({ docType, terminateData, onAccept, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };
  const isLoading = useSelector((state) => state.projectDetails.sendDocumentLoading);
  const isSignLoading = useSelector((state) => state.projectDetails.signContractByTalentLoading);
  const isContractView = docType === 'CONTRACT';

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={AcceptGif} width={150} height={150} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Sign {isContractView ? 'Contract' : 'NDA'}</CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">
                Agree & Accept {isContractView ? 'Contract' : 'NDA'}
              </CardSubtitle>

              <CardText className="desc fw-light">
                Are you sure you want to sign the {isContractView ? 'contract' : 'NDA'}
              </CardText>
              <section className="d-flex gap-2 stats">
                <div>
                  <CardText className="value mb-25">{terminateData?.name || 'Talent/Team name'}</CardText>
                  <small className="key">Talent/Team name</small>
                </div>
                <div>
                  <CardText className="value mb-25">$-</CardText>
                  <small className="key">Project value</small>
                </div>
              </section>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button disabled={isSignLoading || isLoading} outline color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={onAccept}>
              {isSignLoading || isLoading ? <Spinner size="sm" /> : 'Agree & Sign'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmContractModal;

ConfirmContractModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  terminateData: Proptypes.object,
  onAccept: Proptypes.func,
  docType: Proptypes.string,
};

ConfirmContractModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  terminateData: {},
  onAccept: () => {},
  docType: '',
};
