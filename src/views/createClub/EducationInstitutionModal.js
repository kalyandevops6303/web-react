import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, Label, FormFeedback, Button, Spinner } from 'reactstrap';
import { AsyncPaginate } from 'react-select-async-paginate';
import { returnFilteredDropdownOptions, selectThemeColors } from '../../utility/Utils';
import { disputeTypesService } from '../../services/staticServices';
import { paginatedProjectsService } from '../../services/disputeServices';
import { getAllDisputes, getDisputesCount, raiseNewDispute } from '../../redux/actions/disputeActions';
import { raiseDisputeLoading } from '../../redux/selectors/disputeSelectors';
import { disputeStatuses } from '../../utility/constants/Constant';
import { EducationInstitutionModalContainer } from './style';

const EducationInstitutionModal = ({ modal, toggleModal, primaryFilter }) => {
  const EducationInstitutionSchema = yup.object().shape({
    educationInstitution: yup
      .object()
      .shape({
        label: yup.string().required('Education Institution is required'),
        value: yup.string().required('Education Institution is required'),
      })
      .required('Education Institution is required'),
    degree: yup.object().shape({
      label: yup.string().required('Degree is required'),
      value: yup.string().required('Degree is required'),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EducationInstitutionSchema),
  });

  const dispatch = useDispatch();

  const [disputeTypesOptions, setDisputeTypesOptions] = useState(null);

  const raiseDisputeIsLoading = useSelector(raiseDisputeLoading);

  const onSuccess = () => {
    if (primaryFilter === 'all') {
      dispatch(getAllDisputes(null, 1, 10, []));
    } else if (primaryFilter === 'open') {
      dispatch(getAllDisputes(disputeStatuses.open, 1, 10, []));
    } else if (primaryFilter === 'resolved') {
      dispatch(getAllDisputes(disputeStatuses.resolved, 1, 10, []));
    }
    dispatch(getDisputesCount());
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
        <h2 className="font-large-1 text-center">Add University</h2>
        <p className="mb-2 mt-2">
          You are adding the below university to your club. Same will be added to your institution list.
        </p>
        <h4 className="mb-2 mt-2">Club Name</h4>
        <EducationInstitutionModalContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="9">
                <Label className="form-label" for="projectName">
                  Education Institution<span className="label-asterisk text-danger me-50">*</span>
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
            </Row>
            <Row className="mb-1 mt-2">
              <Col sm="12" md="12" lg="9">
                <Label className="form-label" for="disputeType">
                  Education<span className="label-asterisk text-danger me-50">*</span>
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
            <div className="d-flex justify-content-end py-1">
              <Button outline color="primary" className="me-2" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={!isValid || raiseDisputeIsLoading}>
                {raiseDisputeIsLoading ? <Spinner size="sm" /> : 'Submit'}
              </Button>
            </div>
          </Form>
        </EducationInstitutionModalContainer>
      </ModalBody>
    </Modal>
  );
};

export default EducationInstitutionModal;

EducationInstitutionModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  primaryFilter: Proptypes.string,
};

EducationInstitutionModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  primaryFilter: '',
};
