import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, Spinner } from 'reactstrap';
import Notepad from '../../assets/images/youDidIt.gif';
import { AcceptModalWrapper } from './style';

const AcceptMilestoneModal = ({ data, onSuccess, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  const isLoading = useSelector((state) => state.milestone.isMilestoneAccepting);

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody className="pt-0">
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif mt-3" src={Notepad} width={180} height={180} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom fw-bold">
                Are you sure you want to accept the milestone?{' '}
              </CardTitle>
              <CardTitle className="font-medium-2 mt-75">
                By accepting this milestone you will be releasing the associated payment
              </CardTitle>
              <div className="d-flex my-2">
                <div className="pe-1 d-flex flex-column justify-content-end">
                  <p className="custom-accept-text m-0 fw-bold">{data?.name}</p>
                  <p className="custom-accept-label m-0 mt-50">Milestone {data?.seq}</p>
                </div>
                <div className="amount-container ps-1 d-flex flex-column justify-content-end">
                  <p className="custom-accept-text m-0 fw-bold">${data?.estimated_cost}</p>
                  <p className="custom-accept-label m-0 mt-50">Milestone Amount</p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-1  justify-content-end">
            <Button disabled={isLoading} outline color="primary" onClick={onClose} className="me-1">
              Cancel
            </Button>
            <Button disabled={isLoading} color="primary" onClick={onSuccess}>
              {isLoading ? <Spinner size="sm" /> : 'Accept & Pay'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default AcceptMilestoneModal;

AcceptMilestoneModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onSuccess: Proptypes.func,
  data: Proptypes.object,
};

AcceptMilestoneModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onSuccess: () => {},
  data: {},
};
