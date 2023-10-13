import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Label, Row, Spinner } from 'reactstrap';
import { ChevronLeft, ChevronRight, Plus } from 'react-feather';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { getUserDetails, saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';
import { profileDetailsLoading } from '../../../redux/selectors/talentOnboardingSelectors';
import {
  certificatesService,
  educationsService,
  paginatedInstitutesService,
  skillsService,
  toolsService,
} from '../../../services/staticServices';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { removeEmptyKeys, returnFilteredDropdownOptions } from '../../../utility/Utils';
import { userOnboarding } from '../../../utility/constants/Constant';

const Educational = () => {
  const EducationalSchema = yup.object().shape({
    educationDetails: yup
      .array()
      .of(
        yup.object().shape({
          educationInstitution: yup
            .object()
            .shape({
              label: yup.string().required('College or university is required'),
              value: yup.string().required('College or university is required'),
            })
            .required('College or university is required'),
          education: yup
            .object()
            .shape({
              label: yup.string().required('Degree is required'),
              value: yup.string().required('Degree is required'),
            })
            .required('Degree is required'),
        }),
      )
      .min(1, 'At least one degree should be added'),
    tools: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five tools can be added'),
    certificates: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
    skills: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five skills can be added')
      .min(1, 'At least one skill is required')
      .required('Skill is required'),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EducationalSchema),
    defaultValues: {
      educationDetails: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educationDetails',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [educationsOptions, setEducationsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [certificatesOptions, setCertificatesOptions] = useState(null);

  const profileDetailsIsLoading = useSelector(profileDetailsLoading);

  const onBackClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/personal-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/personal-details`);
    }
  };

  const onSkipClick = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/availability-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/availability-details`);
    }
  };

  const onSuccess = () => {
    if (location?.state?.isEditing) {
      navigate(`/${userOnboarding.talent}/availability-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/${userOnboarding.talent}/availability-details`);
    }
  };

  const onSubmit = (data) => {
    const { educationDetails, skills, tools, certificates } = data;

    const educational_institute = educationDetails.map((educationDetail) => ({
      institution: educationDetail.educationInstitution.value,
      education: educationDetail.education.value,
    }));
    const expertise = {
      skills: skills.map((skill) => skill.value),
      tools: tools?.map((tool) => tool.value),
      certificates: certificates?.map((certificate) => certificate.value),
    };

    const reqData = {
      educational_institute,
      expertise,
    };

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
  };

  const loadInstitutesOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await paginatedInstitutesService(page, search);

      return {
        options: response?.data?.data?.data?.map((institute) => ({ label: institute.name, value: institute._id })),
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

  const loadToolsOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, toolsOptions),
      };
    }
    try {
      const response = await toolsService();

      const options = response?.data?.data?.map((tool) => ({ label: tool.name, value: tool._id }));

      setToolsOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadCertificatesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, certificatesOptions),
      };
    }
    try {
      const response = await certificatesService();

      const options = response?.data?.data?.map((certificate) => ({ label: certificate.name, value: certificate._id }));

      setCertificatesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadSkillsOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, skillsOptions),
      };
    }
    try {
      const response = await skillsService();

      const options = response?.data?.data?.map((skill) => ({ label: skill.name, value: skill._id }));

      setSkillsOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const handleAddEducation = () => {
    const isFilled = watch('educationDetails').every((item) => {
      const { educationInstitution, education } = item;
      return educationInstitution?.value && educationInstitution?.label && education?.value && education?.label;
    });

    if (isFilled) {
      append({});
    } else {
      ShowToastMessage(ERROR, 'Please fill all required education fields above');
    }
  };

  const handleRemoveEducation = (index) => {
    remove(index);
  };

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      if (res?.talent_info?.educational_institute.length > 0) {
        setValue(
          'educationDetails',
          res?.talent_info?.educational_institute.map((detail) => ({
            educationInstitution: { label: detail.institution.name, value: detail.institution._id },
            education: { label: detail.education.name, value: detail.education._id },
          })),
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.expertise?.tools.length > 0) {
        setValue(
          'tools',
          res?.talent_info?.expertise?.tools.map((tool) => ({ label: tool.name, value: tool._id })),
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.expertise?.certificates.length > 0) {
        setValue(
          'certificates',
          res?.talent_info?.expertise?.certificates.map((certificate) => ({
            label: certificate.name,
            value: certificate._id,
          })),
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.expertise?.skills.length > 0) {
        setValue(
          'skills',
          res?.talent_info?.expertise?.skills.map((skill) => ({ label: skill.name, value: skill._id })),
          { shouldValidate: true },
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(onGetUserDetailsSuccess));
  }, []);

  return (
    <ProfileFormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-75">
          <CardHeader>
            <h4 className="m-0 mt-1">Education</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            {fields.map((item, index) => (
              <Row key={item.id} className="mt-1 d-flex align-items-center">
                <Col sm="12" md="12" lg="5">
                  <Label className="form-label" for={`educationDetails.${index}.educationInstitution`}>
                    Name of College or University<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id={`educationDetails.${index}.educationInstitution`}
                    name={`educationDetails.${index}.educationInstitution`}
                    control={control}
                    invalid={
                      errors &&
                      errors.educationDetails &&
                      errors.educationDetails.length > 0 &&
                      errors.educationDetails[index] &&
                      errors.educationDetails[index].educationInstitution &&
                      true
                    }
                    render={({ field }) => (
                      <AsyncPaginate
                        debounceTimeout={1000}
                        additional={{ page: 1 }}
                        loadOptions={loadInstitutesOptions}
                        classNamePrefix="select"
                        placeholder="Select your college or university"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid':
                            errors &&
                            errors.educationDetails &&
                            errors.educationDetails.length > 0 &&
                            errors.educationDetails[index] &&
                            errors.educationDetails[index].educationInstitution,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors &&
                    errors.educationDetails &&
                    errors.educationDetails.length > 0 &&
                    errors.educationDetails[index] && (
                      <FormFeedback>
                        {errors.educationDetails[index].educationInstitution &&
                          errors.educationDetails[index].educationInstitution.label.message}
                      </FormFeedback>
                    )}
                </Col>
                <Col sm="12" md="12" lg="5">
                  <Label className="form-label" for={`educationDetails.${index}.education`}>
                    Degree<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id={`educationDetails.${index}.education`}
                    name={`educationDetails.${index}.education`}
                    control={control}
                    invalid={
                      errors &&
                      errors.educationDetails &&
                      errors.educationDetails.length > 0 &&
                      errors.educationDetails[index] &&
                      errors.educationDetails[index].education &&
                      true
                    }
                    render={({ field }) => (
                      <AsyncPaginate
                        loadOptions={loadEducationsOptions}
                        classNamePrefix="select"
                        placeholder="Select your degree"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid':
                            errors &&
                            errors.educationDetails &&
                            errors.educationDetails.length > 0 &&
                            errors.educationDetails[index] &&
                            errors.educationDetails[index].education,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors &&
                    errors.educationDetails &&
                    errors.educationDetails.length > 0 &&
                    errors.educationDetails[index] && (
                      <FormFeedback>
                        {errors.educationDetails[index].education &&
                          errors.educationDetails[index].education.label.message}
                      </FormFeedback>
                    )}
                </Col>
                <Col sm="12" md="12" lg="2">
                  {index !== 0 && (
                    <Button
                      type="button"
                      color="flat-danger"
                      className="mt-2"
                      onClick={() => handleRemoveEducation(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Col>
              </Row>
            ))}
            <Row className="mt-2 mb-3">
              <div className="d-flex align-items-center upload-button cursor-pointer" onClick={handleAddEducation}>
                <UploadIconContainer>
                  <Plus size={18} color={theme.activeNavPillText} />
                </UploadIconContainer>
                <h5 className="fw-bold">Add New</h5>
              </div>
            </Row>
          </CardBody>
        </Card>
        <Card className="w-75">
          <CardHeader>
            <h4 className="m-0 mt-1">Expertise</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="tools">
                  Tools<span className="label-asterisk me-50">*</span>
                  <i>(Top 5)</i>
                </Label>
                <Controller
                  id="tools"
                  name="tools"
                  control={control}
                  invalid={errors.tools && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadToolsOptions}
                      menuPosition="fixed"
                      minMenuHeight={200}
                      classNamePrefix="select"
                      placeholder="Select up to 5 tools"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.tools,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.tools && <FormFeedback>{errors.tools.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="certificates">
                  Certificates
                </Label>
                <Controller
                  id="certificates"
                  name="certificates"
                  control={control}
                  invalid={errors.certificates && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadCertificatesOptions}
                      menuPosition="fixed"
                      minMenuHeight={200}
                      classNamePrefix="select"
                      placeholder="Select certificates"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.certificates,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.certificates && <FormFeedback>{errors.certificates.message}</FormFeedback>}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Label className="form-label" for="skills">
                  Skills<span className="label-asterisk">*</span> <i>(Top 5)</i>
                </Label>
                <Controller
                  id="skills"
                  name="skills"
                  control={control}
                  invalid={errors.skills && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadSkillsOptions}
                      menuPosition="fixed"
                      minMenuHeight={200}
                      menuPlacement="top"
                      classNamePrefix="select"
                      placeholder="Select up to 5 skills"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.skills,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.skills && <FormFeedback>{errors.skills.message}</FormFeedback>}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-75">
          <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Button color="primary" outline className="me-2" onClick={onSkipClick}>
              <span className="me-50">Skip</span>
              <ChevronRight size={14} />
            </Button>
            <Button color="primary" type="submit" disabled={!isValid || profileDetailsIsLoading}>
              {profileDetailsIsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">Save & Continue</span>
                  <ChevronRight size={14} />
                </>
              )}
            </Button>
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Educational;
