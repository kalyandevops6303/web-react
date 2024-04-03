import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, FormFeedback, Input, Button, Spinner } from 'reactstrap';
import { ChangeRequestModalWrapper } from './style';
import { rejectBidChange } from '../../redux/actions/projectDetailsAction';

const RejectBidChangeModal = ({ modal, toggleModal, selectedTimeline }) => {
  const DisputeSchema = yup.object().shape({
    desc: yup
      .string()
      .min(50, 'Reason must be at least 50 characters')
      .max(500, 'Reason must be 500 characters or less')
      .required('Reason is required'),
  });

  const {
    control,
    handleSubmit,
    // setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(DisputeSchema),
  });

  const dispatch = useDispatch();
  const param = useParams();
  const loading = useSelector((state) => state.projectDetails.rejectBidChangeLoading);

  const onSuccess = () => {
    toggleModal();
  };

  const onSubmit = (values) => {
    dispatch(
      rejectBidChange({
        snapshot_id: selectedTimeline?.snapshot_id,
        description: values?.desc,
        project_id: param?.projectId,
        onSuccess,
      }),
    );
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={loading ? null : toggleModal} />
      <ModalBody className="pt-0 px-5">
        <h2 className="font-large-1 text-center mb-2">Reject Bid Change</h2>
        <p className="mb-75">Tell us in detail why you rejecting the bid change</p>
        <ChangeRequestModalWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Controller
                  id="desc"
                  name="desc"
                  control={control}
                  invalid={errors.desc && true}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Enter reason"
                      rows="6"
                      invalid={errors.desc && true}
                    />
                  )}
                />
                {errors.desc && <FormFeedback>{errors.desc.message}</FormFeedback>}
              </Col>
            </Row>

            <div className="d-flex justify-content-end py-1">
              <Button outline color="primary" className="me-2" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="danger" type="submit" disabled={!isValid || loading}>
                {loading ? <Spinner size="sm" /> : 'Reject'}
              </Button>
            </div>
          </Form>
        </ChangeRequestModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default RejectBidChangeModal;

RejectBidChangeModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  primaryFilter: Proptypes.string,
  projectDetail: Proptypes.object,
  selectedTimeline: Proptypes.object,
};

RejectBidChangeModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  primaryFilter: '',
  projectDetail: null,
  selectedTimeline: null,
};
