import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { DeleteModalWrapper } from './style';
import { terminateContract } from '../../redux/actions/projectDetailsAction';
import { projectDetails } from '../../redux/selectors/projectDetailsSelectors';

const TerminateContractModal = ({ project_id, docType, modalData, modal, toggleModal }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.projectDetails.terminateContractLoading);
  const projectInfo = useSelector(projectDetails);

  const onClose = () => {
    toggleModal();
  };
  const onSuccess = () => {
    onClose();
  };
  const onTerminate = () => {
    dispatch(terminateContract({ isNDA: projectInfo?.nda?.is_nda, project_id, doc_type: docType, onSuccess }));
  };

  const isContractView = docType === 'CONTRACT';
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <DeleteModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
            <div>
              <CardTitle className="modal-heading">Early termination</CardTitle>
              <CardSubtitle className="mb-75 fw-bold modal-body-text">
                Terminate {isContractView ? 'Contract' : 'NDA'}
              </CardSubtitle>

              <CardText className="desc fw-light w-76">
                {`Are you sure you would want to terminate the ${
                  isContractView ? 'contract' : 'NDA'
                }? You will have to upload or sign a new ${isContractView ? 'contract' : 'NDA'}.`}
              </CardText>
              <section className="d-none d-flex gap-2 stats">
                <div style={{ minWidth: '10rem' }}>
                  <CardText className=" value mb-25">{modalData?.name || 'Talent/Team name'}</CardText>
                  <small className="key">Talent/Team name</small>
                </div>
                <div className="d-none">
                  <CardText className="value mb-25">$-</CardText>
                  <small className="key">Project value</small>
                </div>
              </section>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button disabled={isLoading} onClick={onClose} outline color="primary">
              Cancel
            </Button>
            <Button color="danger" onClick={onTerminate}>
              {isLoading ? <Spinner size="sm" /> : <span>{`Terminate ${isContractView ? 'Contract' : 'NDA'}`}</span>}
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
  modalData: Proptypes.object,
  docType: Proptypes.string,
  project_id: Proptypes.string,
};

TerminateContractModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  modalData: {},
  docType: '',
  project_id: '',
};
