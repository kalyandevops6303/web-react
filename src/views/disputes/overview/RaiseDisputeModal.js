import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, Label, FormFeedback, Input, Button, Spinner } from 'reactstrap';
import { AsyncPaginate } from 'react-select-async-paginate';
import { returnFilteredDropdownOptions, selectThemeColors } from '../../../utility/Utils';
import { disputeTypesService } from '../../../services/staticServices';
import { DisputeFormContainer } from '../style';
import { paginatedProjectsService } from '../../../services/disputeServices';
import { getAllDisputes, raiseNewDispute } from '../../../redux/actions/disputeActions';
import { raiseDisputeLoading } from '../../../redux/selectors/disputeSelectors';

const RaiseDisputeModal = ({ modal, toggleModal }) => {
  const DisputeSchema = yup.object().shape({
    projectName: yup
      .object()
      .shape({
        label: yup.string().required('Project Name is required'),
        value: yup.string().required('Project Name is required'),
      })
      .required('Project Name is required'),
    disputeType: yup
      .object()
      .shape({
        label: yup.string().required('Dispute Type is required'),
        value: yup.string().required('Dispute Type is required'),
      })
      .required('Dispute Type is required'),
    disputeDetails: yup
      .string()
      .min(100, 'Dispute details must be at least 100 characters')
      .max(2000, 'Dispute details must be 2000 characters or less')
      .required('Dispute details is required'),
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

  const [disputeTypesOptions, setDisputeTypesOptions] = useState(null);

  const raiseDisputeIsLoading = useSelector(raiseDisputeLoading);

  const onSuccess = () => {
    dispatch(getAllDisputes(1, 10, []));
    toggleModal();
  };

  const onSubmit = (data) => {
    const { projectName, disputeType, disputeDetails } = data;

    const reqData = {
      project_id: projectName.value,
      dispute_type: disputeType.value,
      description: disputeDetails,
    };

    dispatch(raiseNewDispute(reqData, onSuccess));
  };

  const loadProjectsOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await paginatedProjectsService(page, search);

      return {
        options: response?.data?.data?.data?.map((project) => ({ label: project.name, value: project._id })),
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const loadDisputeTypesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, disputeTypesOptions),
      };
    }
    try {
      const response = await disputeTypesService();

      const options = response?.data?.data?.map((dispute) => ({ label: dispute.name, value: dispute._id }));

      setDisputeTypesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 px-5">
        <h2 className="font-large-1 text-center">Raise Dispute</h2>
        <h4 className="mt-2 mb-75">Enter Dispute Details</h4>
        <p className="mb-3">Tell us in detail why you are raising this dispute</p>
        <DisputeFormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="5">
                <Label className="form-label" for="projectName">
                  Project Name
                </Label>
                <Controller
                  id="projectName"
                  name="projectName"
                  control={control}
                  invalid={errors.projectName && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      debounceTimeout={1000}
                      additional={{ page: 1 }}
                      loadOptions={loadProjectsOptions}
                      classNamePrefix="select"
                      placeholder="Select project name"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.projectName,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.projectName && <FormFeedback>{errors.projectName.label.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="5">
                <Label className="form-label" for="disputeType">
                  Dispute Type
                </Label>
                <Controller
                  id="disputeType"
                  name="disputeType"
                  control={control}
                  invalid={errors.disputeType && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      loadOptions={loadDisputeTypesOptions}
                      classNamePrefix="select"
                      placeholder="Select dispute type"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.disputeType,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.disputeType && <FormFeedback>{errors.disputeType.label.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Controller
                  id="disputeDetails"
                  name="disputeDetails"
                  control={control}
                  invalid={errors.disputeDetails && true}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Enter dispute details"
                      rows="6"
                      invalid={errors.disputeDetails && true}
                    />
                  )}
                />
                {errors.disputeDetails && <FormFeedback>{errors.disputeDetails.message}</FormFeedback>}
              </Col>
            </Row>
            <div className="d-flex justify-content-end py-1">
              <Button outline color="primary" className="me-2" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={!isValid || raiseDisputeIsLoading}>
                {raiseDisputeIsLoading ? <Spinner size="sm" /> : 'Submit'}
              </Button>
            </div>
          </Form>
        </DisputeFormContainer>
      </ModalBody>
    </Modal>
  );
};

export default RaiseDisputeModal;

RaiseDisputeModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

RaiseDisputeModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
