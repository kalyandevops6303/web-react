import React from 'react';
import Proptypes from 'prop-types';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import classNames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, Form, Row, Input, Label, Col, FormFeedback, Spinner } from 'reactstrap';
import '../custom-styles.scss';
import { RequirementsFormContainer } from '../CreateProject/style';
import { relistProjectByDate } from '../../redux/actions/projectDetailsAction';
import { relistProjectByDateLoading } from '../../redux/selectors/projectDetailsSelectors';

const RelistListingDetailsModal = ({
  modal,
  toggleModal,
  setRelistConfirmationModal,
  setRelistSuccessModal,
  projectRelistData,
  setProjectRelistData,
}) => {
  const ListingDetailsSchema = yup.object().shape({
    listingOption: yup.string().required('Select one'),
    startDate: yup.object().when('listingOption', {
      is: (listingOption) => listingOption === 'select-duration',
      then: () => yup.date().typeError('Start date is required').required('Start date is required'),
    }),
    endDate: yup.date().when('listingOption', {
      is: (listingOption) => listingOption === 'select-duration',
      then: () => yup.date().typeError('End date is required').required('End date is required'),
    }),
    duration: yup.number().when('listingOption', {
      is: (listingOption) => listingOption === 'enter-duration',
      then: () =>
        yup
          .number()
          .min(1, 'Must be at least 1')
          .max(90, 'Must be 90 or less')
          .integer('Must be a number')
          .required('Number is required')
          .typeError('Must be a number'),
    }),
  });

  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    resetField,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ListingDetailsSchema),
    defaultValues: {},
  });

  const dispatch = useDispatch();

  const relistProjectByDateIsLoading = useSelector(relistProjectByDateLoading);

  const onSuccess = () => {
    toggleModal();
    setRelistSuccessModal(true);
  };

  const onSubmit = () => {
    if (!watch('listingOption')) {
      trigger('listingOption');
    } else if (watch('listingOption') === 'select-duration') {
      trigger('startDate');
      trigger('endDate');
    } else if (watch('listingOption') === 'enter-duration') {
      trigger('duration');
    }

    if (
      watch('listingOption') === 'select-duration' &&
      watch('startDate') &&
      watch('startDate')?.length > 0 &&
      watch('endDate') &&
      watch('endDate')?.length > 0
    ) {
      const requiredFormData = {
        listingOption: watch('listingOption'),
        startDate: new Date(watch('startDate')),
        endDate: new Date(watch('endDate')),
      };

      dispatch(
        relistProjectByDate(
          projectRelistData?.id,
          Date.parse(requiredFormData?.startDate),
          Date.parse(requiredFormData?.endDate),
          onSuccess,
        ),
      );
      setProjectRelistData({
        ...projectRelistData,
        startDate: Date.parse(requiredFormData?.startDate),
        endDate: Date.parse(requiredFormData?.endDate),
        listingOption: requiredFormData?.listingOption,
      });
    } else if (watch('listingOption') === 'enter-duration' && watch('duration')) {
      const newData = {
        listingOption: watch('listingOption'),
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + parseInt(watch('duration'), 10))),
        duration: watch('duration'),
      };

      dispatch(
        relistProjectByDate(
          projectRelistData?.id,
          Date.parse(newData?.startDate),
          Date.parse(newData?.endDate),
          onSuccess,
        ),
      );
      setProjectRelistData({
        ...projectRelistData,
        startDate: Date.parse(newData?.startDate),
        endDate: Date.parse(newData?.endDate),
        listingOption: newData?.listingOption,
        duration: newData?.duration,
      });
    }
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={relistProjectByDateIsLoading ? null : toggleModal} />
      <ModalBody className="px-3 pt-0">
        <h2 className="mb-2">Add Listing Details</h2>
        <RequirementsFormContainer className="mt-75">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Controller
                control={control}
                name="listingOption"
                render={({ field }) => (
                  <div className="demo-inline-spacing mx-25">
                    <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
                      <Input
                        type="radio"
                        {...field}
                        id="select-duration"
                        checked={field.value === 'select-duration'}
                        onChange={async (e) => {
                          clearErrors('duration');
                          setValue('duration', '');

                          const isChecked = e.target.checked;
                          const value = 'select-duration';

                          if (isChecked) {
                            field.onChange(value);
                          } else {
                            field.onChange('');
                          }
                        }}
                      />
                      <Label for="select-duration" className="form-check-label fw-bold">
                        <h5 className="m-0">Select dates</h5>
                      </Label>
                    </div>
                  </div>
                )}
              />
            </Row>
            <Row>
              <Col sm="12" md="6" lg="4" className="ps-3">
                <Label className="form-label" for="startDate">
                  Start Date<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  control={control}
                  id="startDate"
                  name="startDate"
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      disabled={watch('listingOption') !== 'select-duration'}
                      placeholder="Select start date"
                      options={{
                        minDate: 'today',
                        dateFormat: 'M d, Y',
                      }}
                      className={classNames('form-control', {
                        'is-invalid': errors && errors.startDate,
                      })}
                    />
                  )}
                />
                {errors.startDate && <FormFeedback>{errors.startDate.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="6" lg="4" className="ps-3">
                <Label className="form-label" for="endDate">
                  End Date<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  control={control}
                  id="endDate"
                  name="endDate"
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      disabled={watch('listingOption') !== 'select-duration'}
                      placeholder="Select end date"
                      options={{
                        minDate: watch('startDate') ? watch('startDate')[0] : 'today',
                        maxDate: watch('startDate')
                          ? // eslint-disable-next-line no-unsafe-optional-chaining
                            new Date(watch('startDate')[0]).setMonth(watch('startDate')[0]?.getMonth() + 3)
                          : 'today',
                        dateFormat: 'M d, Y',
                      }}
                      className={classNames('form-control', {
                        'is-invalid': errors && errors.endDate,
                      })}
                    />
                  )}
                />
                {errors.endDate && <FormFeedback>{errors.endDate.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1 mt-2">
              <Controller
                control={control}
                name="listingOption"
                render={({ field }) => (
                  <div className="demo-inline-spacing mx-25">
                    <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
                      <Input
                        type="radio"
                        {...field}
                        id="enter-duration"
                        checked={field.value === 'enter-duration'}
                        onChange={async (e) => {
                          clearErrors('startDate');
                          clearErrors('endDate');
                          resetField('startDate');
                          resetField('endDate');

                          const isChecked = e.target.checked;
                          const value = 'enter-duration';

                          if (isChecked) {
                            field.onChange(value);
                          } else {
                            field.onChange('');
                          }
                        }}
                      />
                      <Label for="enter-duration" className="form-check-label fw-bold">
                        <h5 className="m-0">Enter duration</h5>
                      </Label>
                    </div>
                  </div>
                )}
              />
            </Row>
            <Row className="d-flex align-items-center">
              <Col sm="12" md="12" lg="8" className="d-flex align-items-center ps-3">
                <h5 className="fw-light m-0">Ends after</h5>
                <Col sm="2" md="2" lg="2" className="mx-1">
                  <Controller
                    id="duration"
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        disabled={watch('listingOption') !== 'enter-duration'}
                        type="number"
                        min={0}
                        onWheel={(e) => e.target.blur()}
                        placeholder="number of"
                        invalid={errors.duration && true}
                      />
                    )}
                  />
                </Col>
                <h5 className="fw-light m-0">Days</h5>
              </Col>
              {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>}
            </Row>
            {errors.listingOption && <FormFeedback>{errors.listingOption.message}</FormFeedback>}
          </Form>
        </RequirementsFormContainer>
        <div className="d-flex justify-content-end align-items-center mb-2 mt-1">
          <Button
            color="primary"
            outline
            className="me-2"
            onClick={() => {
              toggleModal();
              setRelistConfirmationModal(true);
            }}
          >
            Cancel
          </Button>
          <Button color="primary" disabled={relistProjectByDateIsLoading} onClick={() => onSubmit()}>
            {relistProjectByDateIsLoading ? <Spinner size="sm" /> : 'Re-list'}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RelistListingDetailsModal;

RelistListingDetailsModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  setRelistConfirmationModal: Proptypes.func,
  setRelistSuccessModal: Proptypes.func,
  projectRelistData: Proptypes.object,
  setProjectRelistData: Proptypes.func,
};

RelistListingDetailsModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  setRelistConfirmationModal: () => {},
  setRelistSuccessModal: () => {},
  projectRelistData: {},
  setProjectRelistData: () => {},
};
