import React from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import Saved from '../../assets/images/gifs/saveForLater.gif';
import { RelistModalWrapper } from './style';

const SaveForLaterModal = ({ modal, toggleModal, draftAction, redirectionRoute, loading }) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0">
        <RelistModalWrapper className="pe-50">
          <div className="d-flex pr-1">
            <div className="me-3 ms-1">
              <img src={Saved} alt="you-did-it" width={180} height={180} />
            </div>
            <div>
              <h2 className="mb-1 modal-heading">Save For Later</h2>
              <p className="modal-sub-heading mb-50 mt-1">You have unsaved work. Do you want to save it as a draft?</p>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center mb-2">
            <Button color="danger" outline className="me-2" onClick={()=>{
              toggleModal();
              navigate(redirectionRoute);
            }}>
              Discard
            </Button>
            <Button
              color="primary"
              onClick={() => {
                draftAction();
              }}
            >
              {loading ? <Spinner size="sm" /> : <span>Save as Draft</span>}
            </Button>
          </div>
        </RelistModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default SaveForLaterModal;

SaveForLaterModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  draftAction: Proptypes.func,
  redirectionRoute: Proptypes.string,
  loading: Proptypes.bool,
};

SaveForLaterModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  draftAction: () => {},
  redirectionRoute: '',
  loading: false,
};