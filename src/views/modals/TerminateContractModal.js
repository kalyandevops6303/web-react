import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { DeleteModalWrapper } from './style';
import { terminateContract } from '../../redux/actions/projectDetailsAction';

const TerminateContractModal = ({ terminateData, modal, toggleModal }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const onClose = () => {
    toggleModal();
  };
  const onSuccess = () => {
    onClose();
  };
  const onTerminate = () => {
    dispatch(terminateContract({ project_id: param?.projectId, doc_type: 'CONTRACT', onSuccess }));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <DeleteModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
            <div>
              <CardTitle className="modal-title-custom">Early termination</CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">Terminate Contract</CardSubtitle>

              <CardText className="desc fw-light w-76">
                Are you sure you would want to terminate the contract? You will have to uploade or sign a new contract
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
            <Button outline color="primary">
              Cancel
            </Button>
            <Button color="danger" onClick={onTerminate}>
              Terminate Contract
            </Button>
          </div>
        </DeleteModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default TerminateContractModal;

TerminateContractModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  terminateData: Proptypes.object,
};

TerminateContractModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  terminateData: {},
};
