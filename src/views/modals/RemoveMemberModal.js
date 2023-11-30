import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { RemoveMemberModalWrapper } from './style';
import { removeTeamMember } from '../../redux/actions/dashboardActions';
import { switchProfile } from '../../redux/actions/authActions';
import { selectSavedUserData } from '../../redux/selectors/authSelectors';
import { getTeamId } from '../../utility/Utils';

const RemoveMemberModal = ({ modal, toggleModal, data }) => {
  const dispatch = useDispatch();
  const savedUserDetails = useSelector(selectSavedUserData);

  const onClose = () => {
    toggleModal();
  };

  const handleRemoveMember = (removeData) => {
    const onSuccess = () => {
      if (savedUserDetails?._id === removeData.user_id) {
        dispatch(switchProfile({ data: savedUserDetails, onSuccess: () => {}, selected: false }));
      }
    };
    onClose();
    const teamId = getTeamId('team_id');
    const postData = {
      user_id: removeData.user_id,
      team_id: teamId,
      is_deleted: true,
    };
    dispatch(removeTeamMember({ postData, onSuccess, isSelfRemove: savedUserDetails?._id === removeData.user_id }));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <RemoveMemberModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
            <div className="me-4">
              <CardTitle className="modal-title-custom">Tough Call</CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">Remove Team Member</CardSubtitle>
              <CardText className="desc fw-light w-76">
                You are about to remove the below <br /> team member
              </CardText>

              <div>
                <div className="d-flex gap-1 stats">
                  <Avatar img={data?.image_uri || avatar7} imgHeight="52" imgWidth="52" />
                  <div>
                    <CardText className="value mt-25 mb-25 font-weight-bolder">
                      {data?.first_name} {data?.last_name}
                    </CardText>
                    <small className="key">{data?.role?.name}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 me-1 justify-content-end">
            <Button outline color="primary" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button onClick={() => handleRemoveMember(data)} color="danger">
              Remove
            </Button>
          </div>
        </RemoveMemberModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default RemoveMemberModal;

RemoveMemberModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
};

RemoveMemberModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
};
