/* eslint-disable no-undef */
import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import SwitchMember from '../../assets/images/gifs/switch.gif';
import { InviteUsersListContainer } from '../CreateProject/style';
import { changeMemberType } from '../../redux/actions/clubActions';
import { selectUserData } from '../../redux/selectors/authSelectors';
import ShowToastMessage from '../../@core/components/toast';
import { SUCCESS } from '../../utility/constants/ToastTypes';
import { getTeamMembers } from '../../redux/actions/dashboardActions';

const ChangeClubMemberModal = ({ modal, toggleModal, memberType }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetailsData = useSelector(selectUserData);

  const member = memberType.member_type === 'ADMIN' ? 'Member' : 'Admin';
  const metadata = { page: 1, page_size: 10 };
  const handleClose = () => {
    toggleModal();
  };

  const onSuccess = () => {
    ShowToastMessage(SUCCESS, 'Member type changed successfully');
    setLoading(false);
    dispatch(getTeamMembers({ metadata }));
    toggleModal();
  };

  const handleChange = () => {
    setLoading(true);
    const data = {
      team_id: userDetailsData._id,
      user_id: memberType.user_id,
      member_type: memberType.member_type === 'ADMIN' ? 'MEMBER' : 'ADMIN',
    };
    dispatch(changeMemberType(data, onSuccess));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : handleClose} />
      <ModalBody className="px-3 py-0">
        <div className="d-flex align-items-center">
          <img src={SwitchMember} alt="great-job" width={120} height={120} className="me-4" />
          <div className="w-100">
            <h2 className="fw-bold modal-heading mb-1">Change Membership</h2>
            <p className="fw-light modal-body-text mt-75">
              You are about to change the role type to <span className="text-primary fw-bolder">{member}.</span>
            </p>
            <InviteUsersListContainer>
              <Row className="d-flex align-items-center mb-2 mx-0">
                <Col sm="12" md="12" lg="12">
                  <div className="d-flex align-items-center">
                    <Avatar img={defaultAvatar} imgHeight="48" imgWidth="48" className="me-2 user-pic" />
                    <div>
                      <p className="font-medium-1 fw-bold m-0">
                        {memberType?.first_name} {memberType?.last_name}
                      </p>
                      <p className="font-small-3 m-0">{memberType?.role?.name}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </InviteUsersListContainer>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-1 mb-2">
          <Button disabled={loading} color="outline-secondary" className="me-1" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={loading} color="primary" onClick={handleChange}>
            {loading ? <Spinner size="sm" /> : 'Change'}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ChangeClubMemberModal;

ChangeClubMemberModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  memberType: Proptypes.string,
};

ChangeClubMemberModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  memberType: '',
};
