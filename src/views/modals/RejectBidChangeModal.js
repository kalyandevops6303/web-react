import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Info } from 'react-feather';
import '../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, FormFeedback, Input, Button, Spinner } from 'reactstrap';
import { ChangeRequestModalWrapper } from './style';
import theme from '../../configs/themeVariables';
import { rejectBidChange } from '../../redux/actions/projectDetailsAction';

const RejectBidChangeModal = ({ modal, toggleModal }) => {
  const DisputeSchema = yup.object().shape({
    rejectBid: yup
      .string()
      .min(100, 'Reason must be at least 100 characters')
      .max(2000, 'Reason must be 500 characters or less')
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

  const loading = useSelector((state) => state.projectDetails.requestChangeLoading);

  //   const onSuccess = () => {
  //     toggleModal();
  //   };

  const onSubmit = () => {
    // const { projectName, disputeType, disputeDetails } = data;
    // const reqData = {
    //   project_id: projectName.value,
    //   dispute_type: disputeType.value,
    //   description: disputeDetails,
    // };
    dispatch(rejectBidChange({ id: 123 }));
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 px-5">
        <h2 className="font-large-1 text-center mb-2">Reject Bid Change</h2>
        <p className="mb-75">Tell us in detail why you rejecting the bid change</p>
        <ChangeRequestModalWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Controller
                  id="rejectBid"
                  name="rejectBid"
                  control={control}
                  invalid={errors.rejectBid && true}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Enter reason"
                      rows="6"
                      invalid={errors.rejectBid && true}
                    />
                  )}
                />
                {errors.rejectBid && <FormFeedback>{errors.rejectBid.message}</FormFeedback>}
              </Col>
            </Row>

            <div className="info-bg mb-1 d-flex px-1 py-1 mt-2">
              <p className="font-medium-1 m-0 error d-flex justify-content-between w-100">
                <span>
                  <Info size={18} color={theme.activeColor} className="me-50 mb-25" />
                  <span className="fw-bolder font-medium-1">Note:&nbsp; </span>
                  Any signed NDA & Contracts will be null and void once bid change request is initiated.
                </span>
              </p>
            </div>
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
};

RejectBidChangeModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  primaryFilter: '',
  projectDetail: null,
};
