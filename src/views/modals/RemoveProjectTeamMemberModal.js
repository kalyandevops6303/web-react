import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import Avatar from '@components/avatar';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import DeleteGif from '../../assets/images/gifs/delete.gif';
import { RemoveMemberModalWrapper } from './style';
import { removeWorkerLoading } from '../../redux/selectors/projectDetailsSelectors';
import { getTeamMembers, removeWorkerFromProjectTeam } from '../../redux/actions/projectDetailsAction';
import { selectUserData } from '../../redux/selectors/authSelectors';

const RemoveProjectTeamMemberModal = ({ modal, toggleModal, data }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const userData = useSelector(selectUserData);
  const removeWorkerIsLoading = useSelector(removeWorkerLoading);

  const onSuccess = () => {
    dispatch(getTeamMembers({ project_id: params.projectId }));
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={removeWorkerIsLoading ? null : toggleModal} />
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
                    <small className="key">{data?.role}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 me-1 justify-content-end">
            <Button outline color="primary" onClick={() => toggleModal()} disabled={removeWorkerIsLoading}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() =>
                dispatch(removeWorkerFromProjectTeam(params.projectId, userData?._id, data?.user_id, onSuccess))
              }
              disabled={removeWorkerIsLoading}
            >
              {removeWorkerIsLoading ? <Spinner size="sm" /> : 'Remove'}
            </Button>
          </div>
        </RemoveMemberModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default RemoveProjectTeamMemberModal;

RemoveProjectTeamMemberModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
};

RemoveProjectTeamMemberModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
};
