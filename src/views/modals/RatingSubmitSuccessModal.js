import React from 'react';
import '../custom-styles.scss';
import Proptypes from 'prop-types';
import Avatar from '@components/avatar';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Star } from 'react-feather';
import Rating from '../../lib/rating';
import ThankYouGif from '../../assets/images/thankYou.gif';
import theme from '../../configs/themeVariables';

const RatingSubmitSuccessModal = ({ modal, toggleModal, data }) => {
  const { rating, image, name, otherInfo } = data;

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-2 px-5">
        <div className="d-flex align-items-center">
          <img src={ThankYouGif} alt="closed" height={217} width={217} className="me-2" />
          <div className="w-100">
            <h2 className="modal-heading mb-1">Thank You!</h2>
            <p className="modal-body-text fw-bold">Your input is valuable to us.</p>
            <Rating
              readonly
              initialRating={rating}
              emptySymbol={<Star size={24} fill={theme.white} stroke={theme.orangeColor} className="me-50" />}
              fullSymbol={<Star size={24} fill={theme.orangeColor} stroke={theme.orangeColor} className="me-50" />}
              className="mt-2 mb-1 ms-3"
            />
            <div className="d-flex align-items-center mt-50">
              <Avatar img={image} imgHeight="38" imgWidth="38" className="me-1" />
              <div>
                <p className="fw-bold font-medium-1 mb-0">{name}</p>
                <p className="mb-0">{otherInfo}</p>
              </div>
            </div>
            <div className="d-flex justify-content-end pt-3 pb-2">
              <Button color="primary" outline onClick={toggleModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RatingSubmitSuccessModal;

RatingSubmitSuccessModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
};

RatingSubmitSuccessModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
};
