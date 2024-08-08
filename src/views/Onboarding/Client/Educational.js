import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  Label,
  Row,
  Spinner,
  UncontrolledTooltip,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info, Plus } from 'react-feather';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { saveProfileDetails } from '../../../redux/actions/clientOnboardingActions';
import { profileDetailsLoading } from '../../../redux/selectors/clientOnboardingSelectors';
import {
  educationsService,
  paginatedInstitutesService,
  projectAreasService,
  skillsService,
  toolsService,
} from '../../../services/staticServices';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { filteredFormSchema, removeEmptyKeys, returnFilteredDropdownOptions } from '../../../utility/Utils';
import { getUserDetails } from '../../../redux/actions/talentOnboardingActions';
import { CUSTOMER_SUPPORT_TYPES, userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import { userDetailsLoading } from '../../../redux/selectors/talentOnboardingSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { formData } from '../../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../../redux/reducers/formData';
import { getCustomerSupportCount } from '../../../redux/actions/supportActions';
import CustomerSupportModal from '../../modals/CustomerSupportModal';
import FeedbackForCustomerSupportModal from '../../modals/CustomerSupportFeedbackModal';
import NoteComponent from '../NoteComponent';
import CustomerSupportCTA from '../CustomerSupportCTA';

const Educational = () => {
  const EducationalSchema = yup.object().shape({
    educationDetails: yup.array().of(
      yup.object().shape({
        educationInstitution: yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      }),
    ),
    area: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable()
    .optional(),
    skills: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .nullable()
      .optional()
      .max(5, 'Maximum of five skills can be added'),
    tools: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .nullable()
      .optional()
      .max(5, 'Maximum of five tools can be added'),
  });

  const savedFormData = useSelector(formData);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EducationalSchema),
    defaultValues: {
      educationDetails: savedFormData?.educationDetails || [{educationInstitution:"",education:""}],
      area: savedFormData?.area || null,
      skills: savedFormData?.skills || null,
      tools: savedFormData?.tools || null,
    },
  });
  const localFormData = useWatch({ control });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: EducationalSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educationDetails',
  });

  const [educationsOptions, setEducationsOptions] = useState(null);
  const [projectAreasOptions, setProjectAreasOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);

  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const supportData = useSelector((state) => state.support.supportCount);

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.client}/personal-details`);
    } else {
      navigate(`/${userOnboarding.client}/personal-details`);
    }
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.client}/availability-details`);
    } else {
      navigate(`/${userOnboarding.client}/availability-details`);
    }
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.client}/availability-details`);
    } else {
      navigate(`/${userOnboarding.client}/availability-details`);
    }
  };

  const onSubmit = (data) => {
    const { educationDetails, area, skills, tools } = data;

    const educational_institute = educationDetails?.map((educationDetail) => ({
      institution: educationDetail.educationInstitution.value,
    }));
    const project_area_of_interest = {
      skills: skills?.map((skill) => skill.value),
      tools: tools?.map((tool) => tool.value),
      area: area?.value,
    };

    const reqData = {
      educational_institute,
      project_area_of_interest,
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

  const loadAreaOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, projectAreasOptions),
      };
    }
    try {
      const response = await projectAreasService();

      const options = response?.data?.data?.map((area) => ({ label: area.name, value: area._id }));

      setProjectAreasOptions(options);

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

  const handleAddEducation = () => {
    const isFilled = watch('educationDetails').every((item) => {
      const { educationInstitution } = item;
      return educationInstitution?.value && educationInstitution?.label;
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
      if (res?.client_info?.educational_institute.length > 0) {
        setValue(
          'educationDetails',
          savedFormData?.educationDetails ||
            res?.client_info?.educational_institute?.map((detail) => ({
              educationInstitution: { label: detail.institution.name, value: detail.institution._id },
            })),
          { shouldValidate: true },
        );
      }
      if (res?.client_info?.project_area_of_interest?.tools.length > 0) {
        setValue(
          'tools',
          savedFormData?.tools ||
            res?.client_info?.project_area_of_interest?.tools?.map((tool) => ({ label: tool.name, value: tool._id })),
          { shouldValidate: true },
        );
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
      if ('name' in res?.client_info?.project_area_of_interest?.area) {
        setValue(
          'area',
          {
            label: savedFormData?.area?.label || res?.client_info?.project_area_of_interest?.area.name,
            value: savedFormData?.area?.value || res?.client_info?.project_area_of_interest?.area._id,
          },
          { shouldValidate: true },
        );
      }
      if (res?.client_info?.project_area_of_interest?.skills.length > 0) {
        setValue(
          'skills',
          savedFormData?.skills ||
            res?.client_info?.project_area_of_interest?.skills?.map((skill) => ({
              label: skill.name,
              value: skill._id,
            })),
          { shouldValidate: true },
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(onGetUserDetailsSuccess));
    dispatch(getCustomerSupportCount());
  }, []);

  const [customerSupportModal, setCustomerSupportModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [defaultSelected, setDefaultSelected] = useState([]);
  const handleCustomerSupport = (value) => {
    setCustomerSupportModal(true);
    setDefaultSelected(value);
  };

  const toggleSupportModal = () => {
    setCustomerSupportModal(!customerSupportModal);
  };

  const toggleFeedbackSupportModal = () => {
    setFeedbackModal(!feedbackModal);
  };

  const onCustomerSupportSuccess = () => {
    setCustomerSupportModal(false);
    setFeedbackModal(true);
    dispatch(getCustomerSupportCount());
  };

  return (
    <ProfileFormContainer>
      {userDetailsIsLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-75">
            <CardHeader className="d-flex align-items-end">
              <h4 className="m-0 mt-1">Education</h4>
              <CustomerSupportCTA
                type={CUSTOMER_SUPPORT_TYPES.education}
                handleCustomerSupport={handleCustomerSupport}
              />
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              {fields.map((item, index) => (
                <Row key={item.id} className="mt-1">
                  <Col sm="12" md="12" lg="5">
                    <Label className="form-label" for={`educationDetails.${index}.educationInstitution`}>
                      Name of College or University
                    </Label>
                    <Info className="ms-25" size={18} color={theme.infoIcon} id="college" />
                    <UncontrolledTooltip placement="right" target="college">
                      <div className="d-flex flex-column align-items-start">
                        Used to match to talent from your Alma Mater
                      </div>
                    </UncontrolledTooltip>
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
                          {errors?.educationDetails[index]?.educationInstitution &&
                            errors?.educationDetails[index]?.educationInstitution?.label?.message}

                        </FormFeedback>
                      )}
                  </Col>
                  <Col sm="12" md="12" lg="5" className="d-none">
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
                    {getValues('educationDetails').length > 1 && (
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

              {supportData?.education?.pending_requests > 0 && (
                <NoteComponent type="info" requestCount={supportData?.education?.pending_requests} />
              )}
              {supportData?.education?.approved_requests > 0 && (
                <NoteComponent type="success" requestCount={supportData?.education?.approved_requests} />
              )}
            </CardBody>
          </Card>
          <Card className="w-75">
            <CardHeader className="d-flex align-items-end">
              <h4 className="m-0 mt-1">
                Project Domain 
              </h4>
              <CustomerSupportCTA
                type={CUSTOMER_SUPPORT_TYPES.tools_and_skills}
                handleCustomerSupport={handleCustomerSupport}
              />
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="area">
                    Area of interest
                  </Label>
                  <Controller
                    id="area"
                    name="area"
                    control={control}
                    invalid={errors.area && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        loadOptions={loadAreaOptions}
                        classNamePrefix="select"
                        placeholder="Select areas of interest"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.area,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.area && <FormFeedback>{errors.area.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="skills">
                    Skills <i>(Top 5)</i>
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
                        classNamePrefix="select"
                        placeholder="Select top 5 skills"
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
              <Row className="mb-2">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="tools">
                    Tools <i>(Top 5)</i>
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
                        placeholder="Select top 5 tools"
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
              </Row>

              {supportData?.tools_and_skills?.pending_requests > 0 && (
                <NoteComponent type="info" requestCount={supportData?.tools_and_skills?.pending_requests} />
              )}
              {supportData?.tools_and_skills?.approved_requests > 0 && (
                <NoteComponent type="success" requestCount={supportData?.tools_and_skills?.approved_requests} />
              )}
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
      )}
      {customerSupportModal && (
        <CustomerSupportModal
          onSuccess={onCustomerSupportSuccess}
          modal={customerSupportModal}
          toggleModal={toggleSupportModal}
          defaultSelected={defaultSelected}
        />
      )}
      {feedbackModal && (
        <FeedbackForCustomerSupportModal modal={feedbackModal} toggleModal={toggleFeedbackSupportModal} />
      )}
    </ProfileFormContainer>
  );
};

export default Educational;