import React from 'react';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import GreatJobTick from '../../assets/images/greatJobGif.gif';
import { RelistModalWrapper } from './style';
import { convertUnixTimestampToDate } from '../../utility/Utils';
import { selectSavedUserData } from '../../redux/selectors/authSelectors';

const RelistSuccessModal = ({ modal, toggleModal, projectRelistData }) => {
  const navigate = useNavigate();
  const savedUserData = useSelector(selectSavedUserData);
  const onDoneClick = () => {
    navigate('/marketplace/my_listings');
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0">
        <RelistModalWrapper className="pe-50">
          <div className="d-flex pr-1">
            <div className="me-3 d-flex align-items-end mb-2">
              <img src={GreatJobTick} alt="project-relisted" width={167} height={167} />
            </div>
            <div>
              <h2 className="mb-1">Project Re-listed</h2>
              <p className="note-text font-medium-3 mt-75">Your project is now re-listed in the marketplace.</p>
              <p className="note-text font-medium-3 mt-75">
                Project Name: <span className="fw-bolder">{projectRelistData?.name}</span>
              </p>
              <p className="note-text font-medium-3 mt-75">
                Listing Duration:{' '}
                <span className="fw-bolder">
                  {projectRelistData?.listingOption === 'select-duration'
                    ? 
                    // `${DateTime?.fromMillis(projectRelistData?.startDate).toFormat(
                    //     'dd LLL yyyy',
                    //   )} - ${DateTime?.fromMillis(projectRelistData?.endDate).toFormat('dd LLL yyyy')}`
                      `${convertUnixTimestampToDate(projectRelistData?.startDate, savedUserData?.availability?.timezone?.name || 'America/New_York')} - ${convertUnixTimestampToDate(projectRelistData?.endDate, savedUserData?.availability?.timezone?.name || 'America/New_York')}`
                    : `${projectRelistData?.duration} Days`}
                </span>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center mb-2 mt-1">
            <Button color="flat-danger" className="me-2" onClick={toggleModal}>
              Cancel
            </Button>
            <Button color="primary" onClick={onDoneClick}>
              Done
            </Button>
          </div>
        </RelistModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default RelistSuccessModal;

RelistSuccessModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  projectRelistData: Proptypes.object,
};

RelistSuccessModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  projectRelistData: {},
};
