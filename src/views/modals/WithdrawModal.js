import React from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import DeleteGIF from '../../assets/images/gifs/delete.gif';
import { WithdrawModalWrapper } from './style';
import { withdrawProject } from '../../redux/actions/projectDetailsAction';
import { withdrawProjectLoading } from '../../redux/selectors/projectDetailsSelectors';

const WithdrawModal = ({ modal, toggleModal, projectDetailsData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const withdrawProjectIsLoading = useSelector(withdrawProjectLoading);
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={toggleModal} />
      <ModalBody>
        <WithdrawModalWrapper className="pe-50">
          <div className="d-flex pr-1">
            <div className="me-1">
              <img src={DeleteGIF} alt="you-did-it" width={189} height={189} />
            </div>
            <div>
              <h1 className="mb-1 heading">Withdraw Project</h1>
              <h3 className="mb-1">Are you sure you want to withdraw this project ?</h3>
              <ol className="list-font">
                <li>This project will be delisted from marketplace.</li>
                <li>Talent won’t be able to bid for this project.</li>
                <li>You can still review or accept the current bids.</li>
              </ol>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2 align-items-center gap-2 mb-2">
            <Button
              color="primary"
              onClick={() => {
                toggleModal();
              }}
            >
              Re-list
            </Button>
            <Button
              color="danger"
              onClick={() => {
                dispatch(
                  withdrawProject({
                    project_id: projectDetailsData?._id,
                    onSuccess: () => {
                      navigate('/marketplace/my_listings');
                    },
                  }),
                );
                toggleModal();
              }}
            >
              {withdrawProjectIsLoading ? <Spinner size="sm" /> : 'Withdraw'}
            </Button>
          </div>
        </WithdrawModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default WithdrawModal;

WithdrawModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  projectDetailsData: Proptypes.object,
};

WithdrawModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  projectDetailsData: {},
};