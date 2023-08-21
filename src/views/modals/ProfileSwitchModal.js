import React from 'react';
import Proptypes from 'prop-types';
import { CardText, Modal, ModalBody } from 'reactstrap';
import Spinner from '../../@core/components/spinner/Loading-spinner';

import '../custom-styles.scss';

// eslint-disable-next-line arrow-body-style
const ProfileSwitchModal = ({ modal }) => {
  return (
    <Modal contentClassName="custom-modal-style-sm" isOpen={modal} className="modal-dialog-centered modal-lg">
      <Spinner />
      <ModalBody>
        <CardText color="primary font-weight-bold"> Profile switching</CardText>
      </ModalBody>
    </Modal>
  );
};

export default ProfileSwitchModal;

ProfileSwitchModal.propTypes = {
  modal: Proptypes.bool,
};

ProfileSwitchModal.defaultProps = {
  modal: false,
};
