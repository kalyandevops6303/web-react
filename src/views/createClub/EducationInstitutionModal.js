import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, Label, FormFeedback, Button, Spinner } from 'reactstrap';
import { AsyncPaginate } from 'react-select-async-paginate';
import { removeEmptyKeys, returnFilteredDropdownOptions, selectThemeColors } from '../../utility/Utils';
import { educationsService, paginatedInstitutesService } from '../../services/staticServices';
import { EducationInstitutionModalContainer } from './style';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { saveProfileDetails } from '../../redux/actions/talentOnboardingActions';
import { getUserData } from '../../redux/actions/authActions';

const EducationInstitutionModal = ({ modal, toggleModal, selectedOption }) => {
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
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EducationInstitutionSchema),
  });

  const dispatch = useDispatch();
  const [educationsOptions, setEducationsOptions] = useState(null);
  const [loading, setLoading] = useState(false);

  const userDetailsData = useSelector(userData);

  const onSuccess = () => {
    dispatch(getUserData());
    setLoading(false);
    toggleModal();
  };

  const onSubmit = (data) => {
    setLoading(true);
    const { educationInstitution, degree } = data;
    const myInstitutions = userDetailsData?.talent_info?.educational_institute.map((educationDetails) => ({
      institution: educationDetails.institution._id,
      education: educationDetails.education._id,
    }));

    const reqData = {
      educational_institute: [
        ...myInstitutions,
        {
          institution: educationInstitution?.value,
          education: degree?.value,
        },
      ],
    };

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
  };

  const loadInstitutesOptions = async (search, prevOptions, { page }) => {
    try {
      const myInstitution = userDetailsData?.talent_info?.educational_institute
        .map((educationDetails) => educationDetails?.institution)
        .map((institute) => ({ label: institute?.name, value: institute?._id }));
      const response = await paginatedInstitutesService(page, search);

      return {
        options: response?.data?.data?.data
          .map((institute) => ({ label: institute.name, value: institute._id }))
          .filter((option) => !myInstitution.some((myOption) => myOption.value === option.value)),
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const loadEducationsOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, educationsOptions),
      };
    }
    try {
      const response = await educationsService();

      const options = response?.data?.data?.map((education) => ({ label: education.name, value: education._id }));

      setEducationsOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  useEffect(() => {
    if (selectedOption) {
      setValue('educationInstitution', selectedOption);
    }
  }, [selectedOption]);

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
                <Label className="form-label" for="educationInstitution">
                  Education Institution<span className="label-asterisk text-danger me-50">*</span>
                </Label>
                <Controller
                  id="educationInstitution"
                  name="educationInstitution"
                  control={control}
                  invalid={errors.educationInstitution && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      {...field}
                      debounceTimeout={1000}
                      additional={{ page: 1 }}
                      loadOptions={loadInstitutesOptions}
                      classNamePrefix="select"
                      placeholder="Enter your institution name"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.educationInstitution,
                      })}
                    />
                  )}
                />
                {errors.educationInstitution && (
                  <FormFeedback>{errors.educationInstitution.label.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row className="mb-1 mt-2">
              <Col sm="12" md="12" lg="9">
                <Label className="form-label" for="degree">
                  Education<span className="label-asterisk text-danger me-50">*</span>
                </Label>
                <Controller
                  id="degree"
                  name="degree"
                  control={control}
                  invalid={errors.degree && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      loadOptions={loadEducationsOptions}
                      classNamePrefix="select"
                      placeholder="Enter your education"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.degree,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.degree && <FormFeedback>{errors.degree.label.message}</FormFeedback>}
              </Col>
            </Row>
            <div className="d-flex justify-content-end py-1">
              <Button outline color="primary" className="me-2" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={!isValid || loading}>
                {loading ? <Spinner size="sm" /> : 'Submit'}
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
  selectedOption: Proptypes.object,
};

EducationInstitutionModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  primaryFilter: '',
  selectedOption: {},
};
