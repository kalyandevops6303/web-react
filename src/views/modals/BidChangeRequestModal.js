import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Info } from 'react-feather';
import '../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, FormFeedback, Input, Button, Spinner } from 'reactstrap';
import { ChangeRequestModalWrapper } from './style';
import theme from '../../configs/themeVariables';
import { requestChange } from '../../redux/actions/projectDetailsAction';

const BidChangeRequestModal = ({ modal, toggleModal }) => {
  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);
  const param = useParams();
  const DisputeSchema = yup.object().shape({
    changeRequest: yup
      .string()
      .min(50, 'Change request must be at least 50 characters')
      .max(500, 'Change request must be 500 characters or less')
      .required('Change request is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(DisputeSchema),
  });

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.projectDetails.requestChangeLoading);

  const onSuccess = () => {
    toggleModal();
  };

  const onSubmit = (values) => {
    dispatch(
      requestChange({
        bid_id: bidInfo?._id,
        description: values.changeRequest,
        project_id: param?.projectId,
        onSuccess,
      }),
    );
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={loading ? null : toggleModal} />
      <ModalBody className="pt-0 px-5">
        <h2 className="font-large-1 text-center mb-2">Bid Change Request</h2>
        <p className="mb-75">Tell us in detail what bid change are you requesting for</p>
        <ChangeRequestModalWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Controller
                  id="changeRequest"
                  name="changeRequest"
                  control={control}
                  invalid={errors.changeRequest && true}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Enter change request"
                      rows="6"
                      invalid={errors.changeRequest && true}
                    />
                  )}
                />
                {errors.changeRequest && <FormFeedback>{errors.changeRequest.message}</FormFeedback>}
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
              <Button color="primary" type="submit" disabled={!isValid || loading}>
                {loading ? <Spinner size="sm" /> : 'Submit'}
              </Button>
            </div>
          </Form>
        </ChangeRequestModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default BidChangeRequestModal;

BidChangeRequestModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  primaryFilter: Proptypes.string,
  projectDetail: Proptypes.object,
};

BidChangeRequestModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  primaryFilter: '',
  projectDetail: null,
};
