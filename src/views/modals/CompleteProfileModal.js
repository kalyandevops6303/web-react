import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Progress, CardText } from 'reactstrap';
import CompleteProfileGif from '../../assets/images/completeYourProfileGif.gif';
import { giveProgressBarColorClassName } from '../../utility/Utils';
import { returnCompleteProfileDetailsCta } from '../../utility/constants/CompleteProfileDetailsCta';
import { profilePercentage, userData } from '../../redux/selectors/dashboardSelectors';
import { setItemFromSession } from '../../utility/sessesionStorageControl';

const CompleteProfileModal = ({ modal, toggleModal, modalInfoText }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userDetailsData = useSelector(userData);
  const profilePercentageData = useSelector(profilePercentage);

  const onAddDetailsClick = (path) => {
    setItemFromSession('backRouteForProfileEdit', location.pathname);
    navigate(path, {
      state: { isEditing: true },
    });
  };

  return (
    <Modal
      isOpen={modal}
      contentClassName="custom-larger-than-medium-modal-style"
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="py-0">
        <div className="d-flex align-items-center px-50 py-0">
          <img src={CompleteProfileGif} alt="complete-profile" width={140} height={140} />
          <div className="pe-1 ms-3">
            <h2 className="fw-bold font-large-1">Complete Profile</h2>
            <p className="fw-normal font-medium-3 mt-1">
              Completing your profile will enable you to {modalInfoText || 'perform this action'}
            </p>
            <span className="font-weight-bold percentage">{profilePercentageData?.profile_completed}%</span>
            <Progress
              style={{ height: '0.5rem' }}
              className={`${giveProgressBarColorClassName(profilePercentageData?.profile_completed)} mt-25`}
              value={profilePercentageData?.profile_completed}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end pb-2 pe-2">
          {returnCompleteProfileDetailsCta(userDetailsData?.user_type, profilePercentageData?.values_missing) && (
            <CardText
              className="card-text font-medium-2 mt-2 mb-0 text-primary text-center cursor-pointer"
              onClick={() =>
                onAddDetailsClick(
                  returnCompleteProfileDetailsCta(userDetailsData?.user_type, profilePercentageData?.values_missing)
                    ?.path,
                )
              }
            >
              {
                returnCompleteProfileDetailsCta(userDetailsData?.user_type, profilePercentageData?.values_missing)
                  ?.label
              }
            </CardText>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CompleteProfileModal;

CompleteProfileModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  modalInfoText: Proptypes.string,
};

CompleteProfileModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  modalInfoText: '',
};
