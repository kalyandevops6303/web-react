import React from 'react';
import '../../custom-styles.scss';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import DisputeClosedGif from '../../../assets/images/disputeClosed.gif';
import { DisputeClosedModalContainer } from '../style';
import { getAllDisputes, getDisputesCount, resolveDisputeApi } from '../../../redux/actions/disputeActions';
import { resolveDisputeLoading } from '../../../redux/selectors/disputeSelectors';
import { disputeStatuses } from '../../../utility/constants/Constant';

const DisputeClosedModal = ({ modal, toggleModal, selectedDispute, toggleDetailsModal, primaryFilter }) => {
  const dispatch = useDispatch();

  const { _id, dispute_type, created_by, description } = selectedDispute;

  const resolveDisputeIsLoading = useSelector(resolveDisputeLoading);

  const onSuccess = () => {
    if (primaryFilter === 'all') {
      dispatch(getAllDisputes(null, 1, 10, []));
    } else if (primaryFilter === 'open') {
      dispatch(getAllDisputes(disputeStatuses.open, 1, 10, []));
    } else if (primaryFilter === 'resolved') {
      dispatch(getAllDisputes(disputeStatuses.resolved, 1, 10, []));
    }
    dispatch(getDisputesCount());
    toggleModal();
    toggleDetailsModal();
  };

  const onCloseClick = () => {
    dispatch(resolveDisputeApi(_id, onSuccess));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={!resolveDisputeIsLoading ? toggleModal : null} />
      <ModalBody className="pt-0 px-5">
        <DisputeClosedModalContainer className="d-flex justify-content-between">
          <img src={DisputeClosedGif} alt="closed" height={174} width={174} className="mt-2" />
          <div>
            <h2 className="font-large-1 text-blue">Dispute Closed</h2>
            <h4 className="my-1">{dispute_type?.name}</h4>
            <div className="description-container">
              <p className="font-medium-3 description">{description || ''}</p>
            </div>
            <div className="d-flex align-items-center mt-1">
              <Avatar
                img={created_by?.image_uri?.length > 0 ? created_by?.image_uri : defaultAvatar}
                imgHeight="50"
                imgWidth="50"
                className="me-1"
              />
              <div>
                <p className="fw-bold font-medium-3 mb-0">{`${created_by?.first_name} ${created_by?.last_name}`}</p>
                <p className="mb-0">
                  {'company_name' in created_by ? created_by?.company_name : created_by?.role?.name}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-2 mt-1">
              <Button color="primary" outline onClick={onCloseClick} disabled={resolveDisputeIsLoading}>
                {resolveDisputeIsLoading ? <Spinner size="sm" /> : 'Okay'}
              </Button>
            </div>
          </div>
        </DisputeClosedModalContainer>
      </ModalBody>
    </Modal>
  );
};

export default DisputeClosedModal;

DisputeClosedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedDispute: Proptypes.object,
  toggleDetailsModal: Proptypes.func,
  primaryFilter: Proptypes.string,
};

DisputeClosedModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedDispute: {},
  toggleDetailsModal: () => {},
  primaryFilter: '',
};
