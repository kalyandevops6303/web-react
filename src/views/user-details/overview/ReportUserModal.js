import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../../custom-styles.scss';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, FormFeedback, Input, Button, Spinner } from 'reactstrap';
import { reportProfile } from '../../../redux/actions/profileActions';
import { reportLoading } from '../../../redux/selectors/profileSelectors';

const ReportUserModal = ({ modal, toggleModal, userDetails }) => {
  const ReportSchema = yup.object().shape({
    reason: yup
      .string()
      .min(50, 'Reason must be at least 50 characters')
      .max(500, 'Reason must be 500 characters or less')
      .required('Reason is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ReportSchema),
  });

  const dispatch = useDispatch();

  const reportIsLoading = useSelector(reportLoading);

  const onSuccess = () => {
    toggleModal();
  };

  const onSubmit = (data) => {
    const { reason } = data;

    const reqData = {
      user_id: userDetails?.user_id,
      description: reason,
    };

    dispatch(reportProfile(reqData, onSuccess));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={reportIsLoading ? null : toggleModal} />
      <ModalBody className="pt-0 px-5">
        <h2 className="font-large-1 text-center text-danger">Report</h2>
        <p className="font-medium-1 mt-2">Are you sure you want to report this profile?</p>
        <div className="d-flex align-items-center my-1">
          <Avatar
            img={userDetails?.image_uri?.length > 0 ? userDetails?.image_uri : defaultAvatar}
            imgHeight="38"
            imgWidth="38"
            className="me-50"
          />
          <div>
            <p className="fw-bold mb-0">{`${userDetails?.first_name} ${userDetails?.last_name}`}</p>
            <p className="mb-0">{userDetails?.role?.name}</p>
          </div>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-1">
            <Col sm="12" md="12" lg="12">
              <Controller
                id="reason"
                name="reason"
                control={control}
                invalid={errors.reason && true}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="textarea"
                    placeholder="Enter reason to report"
                    rows="6"
                    invalid={errors.reason && true}
                  />
                )}
              />
              {errors.reason && <FormFeedback>{errors.reason.message}</FormFeedback>}
            </Col>
          </Row>
          <div className="d-flex justify-content-end py-1">
            <Button outline color="primary" className="me-2" onClick={toggleModal} disabled={reportIsLoading}>
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={reportIsLoading}>
              {reportIsLoading ? <Spinner size="sm" /> : 'Report'}
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ReportUserModal;

ReportUserModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  userDetails: Proptypes.object,
};

ReportUserModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  userDetails: {},
};
