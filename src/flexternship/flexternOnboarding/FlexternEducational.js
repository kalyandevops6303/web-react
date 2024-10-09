import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  Label,
  Row,
  Spinner,
  FormGroup,
  Input,
 Progress , CardText } from 'reactstrap';
import { ChevronLeft, ChevronRight, Plus, Info } from 'react-feather';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { ProfileFormContainer, UploadIconContainer } from '../../views/Onboarding/style';
import theme from '../../configs/themeVariables';
import {
  getUserDetails,
  saveProfileDetails,
  getResumeParsedDetails,
} from '../../redux/actions/talentOnboardingActions';
import { resumeParsedDetailsSuccess } from '../../redux/reducers/talentOnboarding';
import {
  profileDetailsLoading,
  userDetailsLoading,
  resumeParsedDetails,
  resumeParsedDetailsLoading,
} from '../../redux/selectors/talentOnboardingSelectors';
import {
  // certificatesService,
  educationsService,
  paginatedInstitutesService,
  skillsService,
  toolsService,
} from '../../services/staticServices';
import ShowToastMessage from '../../@core/components/toast';
import { CUSTOMER_SUPPORT_TYPES, userOnboarding, userProfileEdit , userTypes } from '../../utility/constants/Constant';
import { getCustomerSupportCount } from '../../redux/actions/supportActions';
import { filteredFormSchema, isEmpty, removeEmptyKeys, returnFilteredDropdownOptions , giveProgressBarColorClassName } from '../../utility/Utils';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import {
  formData,
  resumeParsed,
  formDocuments,
  resumeDataUploadedForEducation,
  fileKey,
} from '../../redux/selectors/formDataSelectors';
import {
  clearAllFormData,
  setFormData,
  setResumeParsed,
  setFormDocuments,
  setResumeDataUploadedForEducation,
  setFileKey,
} from '../../redux/reducers/formData';
import { updateParsedResumeService } from '../../services/talentOnboardingServices';

import { returnCompleteProfileDetailsCta } from '../../utility/constants/CompleteProfileDetailsCta';
import "../../App.css";

import { ERROR } from '../../utility/constants/ToastTypes';
import CustomerSupportModal from '../../views/modals/CustomerSupportModal';
import FeedbackForCustomerSupportModal from '../../views/modals/CustomerSupportFeedbackModal';
import NoteComponent from '../../views/Onboarding/NoteComponent';
import CustomerSupportCTA from '../../views/Onboarding/CustomerSupportCTA';

const FlexternEducational = () => {
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
      .max(5, 'Maximum of five tools can be added')
      .nullable()
      .optional(),
    certificates: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
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
      .max(5, 'Maximum of five skills can be added')
      .min(1, 'At least one skill is required')
      .required('Skill is required'),
  });
  const savedFormData = useSelector(formData);
  const fileKeyDetails = useSelector(fileKey);
  const savedFormDocuments = useSelector(formDocuments);
  const parsedResumeData = useSelector(resumeParsedDetails);
  const IsresumeParsed = useSelector(resumeParsed);
  const resumeParsedLoading = useSelector(resumeParsedDetailsLoading);
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
      educationDetails: savedFormData?.educationDetails ?? null,
      tools: savedFormData?.tools || null,
      certificates: savedFormData?.certificates || null,
      skills: savedFormData?.skills || null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educationDetails',
  });
  const [parseResume, setParseResume] = useState(IsresumeParsed || false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const localFormData = useWatch({ control });

  const getOverallPercentageCompletion = () => {
    if (isFlextern && !isTrumioTalent) {
      setOverallPercentageCompletion(profileCompletionFlextern);
    }
    else if (!isFlextern && isTrumioTalent) {
      setOverallPercentageCompletion(profileCompletionProject);
    }
    else {
      setOverallPercentageCompletion((profileCompletionFlextern + profileCompletionProject) / 2);
    }
  };

  useEffect(() => {
    if (parseResume === false && resumeParsedLoading === false) {
      const allData = { ...savedFormData, ...localFormData };
      dispatch(setFormData(allData));
    }
  }, [localFormData, parseResume, resumeParsedLoading]);

  useEffect(() => {
    dispatch(setResumeParsed(parseResume));
  }, [parseResume]);

  useEffect(() => {
    if (parseResume === false) {
      if (savedFormData) {
        const requiredFields = filteredFormSchema({
          savedData: savedFormData,
          formSchemaFields: EducationalSchema.fields,
        });
        reset(requiredFields);
        const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
        trigger(keysWithValues);
      }
    }
  }, [parseResume]);
  const [educationsOptions, setEducationsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  // const [certificatesOptions, setCertificatesOptions] = useState(null);
  const [files, setFiles] = useState(savedFormDocuments || []);
  const isResumeDataUploadedForEducation = useSelector(resumeDataUploadedForEducation);
  const [parsedUploaded, setParsedUploaded] = useState(isResumeDataUploadedForEducation || false);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const supportData = useSelector((state) => state.support.supportCount);

  const profileCompletionFlextern = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed);
  const profileCompletionFlexternMissingValues = useSelector((state) => state.auth?.profileCompletionFlextern?.values_missing);
  const profileCompletionProject = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed);
  const profileCompletionProjectMissingValues = useSelector((state) => state.dashboard?.profilePercentage?.values_missing);

  const isFlexternReady = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed) == 100;
  const isProjectReady = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed) == 100;
  const isFlextern = useSelector((state) => state.auth?.flextern);
  const isTrumioTalent = useSelector((state) => state.auth?.trumio_talent);

  const [flexternOrProjectModal, setFlexternOrProjectModal] = useState(false);
  const [overallPercentageCompletion, setOverallPercentageCompletion] = useState(0);

  useEffect(() => {
    getOverallPercentageCompletion();
  }, [profileCompletionFlextern, profileCompletionProject]);

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/personal-details`);
    } else {
      navigate(`/${userOnboarding.talent}/personal-details`);
    }
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/social-details`);
    } else {
      navigate(`/${userOnboarding.talent}/social-details`);
    }
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/social-details`);
    } else {
      navigate(`/${userOnboarding.talent}/social-details`);
    }
    dispatch(setResumeDataUploadedForEducation(parseResume));
  };

  const onSubmit = (data) => {
    const { educationDetails, skills, tools, certificates } = data;

    const educational_institute = educationDetails?.map((educationDetail) => ({
      institution: educationDetail.educationInstitution.value,
      education: educationDetail.education.value,
    }));
    const expertise = {
      skills: skills?.map((skill) => skill.value),
      tools: tools?.map((tool) => tool.value),
      certificates: certificates?.map((certificate) => certificate.value),
    };

    const reqData = {
      educational_institute,
      expertise,
    };

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
    if (IsresumeParsed) {
      const resumeUpdatedData = {
        target_info: {
          ...parsedResumeData,
          educational_institute: educationDetails?.map((details) => ({
            institution: { name: details.educationInstitution.label, _id: details.educationInstitution.value },
            education: { name: details.education.label, _id: details.education.value },
          })),
          skills: skills?.map((skill) => ({
            name: skill?.label,
            _id: skill?.value,
          })),
          tools: tools?.map((tool) => ({
            name: tool?.label,
            _id: tool?.value,
          })),
          certificates: certificates?.map((certificate) => ({
            name: certificate?.label,
            _id: certificate?.value,
          })),
        },
      };

      dispatch(updateParsedResumeService(parsedResumeData?._id, resumeUpdatedData));
    }
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

  // const loadCertificatesOptions = async (search) => {
  //   if (search) {
  //     return {
  //       options: returnFilteredDropdownOptions(search, certificatesOptions),
  //     };
  //   }
  //   try {
  //     const response = await certificatesService();

  //     const options = response?.data?.data?.map((certificate) => ({ label: certificate.name, value: certificate._id }));

  //     setCertificatesOptions(options);

  //     return {
  //       options,
  //     };
  //   } catch (error) {
  //     return { options: [] };
  //   }
  // };

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
          savedFormData?.educationDetails?.length > 0
            ? savedFormData?.educationDetails
            : res?.talent_info?.educational_institute?.map((detail) => ({
              educationInstitution: { label: detail.institution.name, value: detail.institution._id },
              education: { label: detail.education.name, value: detail.education._id },
            })),
          { shouldValidate: true },
        );
      } else {
        setValue('educationDetails', [{ educationInstitution: '', education: '' }]);
      }
      if (res?.talent_info?.expertise?.tools.length > 0) {
        setValue(
          'tools',
          savedFormData?.tools ||
          res?.talent_info?.expertise?.tools?.map((tool) => ({ label: tool.name, value: tool._id })),
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.expertise?.certificates.length > 0) {
        setValue(
          'certificates',
          savedFormData?.certificates ||
          res?.talent_info?.expertise?.certificates?.map((certificate) => ({
            label: certificate.name,
            value: certificate._id,
          })),
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.expertise?.skills.length > 0) {
        setValue(
          'skills',
          savedFormData?.skills ||
          res?.talent_info?.expertise?.skills?.map((skill) => ({ label: skill.name, value: skill._id })),
          { shouldValidate: true },
        );
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (res?.talent_info?.resume && 'file_name' in res?.talent_info?.resume) {
        const fileUrl = {
          file: {
            name: savedFormDocuments != null ? savedFormDocuments[0]?.file?.name : res?.talent_info?.resume?.file_name,
            size: savedFormDocuments != null ? savedFormDocuments[0]?.file?.size : res?.talent_info?.resume?.size,
          },
          uploadData: {
            file_key:
              savedFormDocuments != null
                ? savedFormDocuments[0]?.uploadData?.file_key
                : res?.talent_info?.resume?.file_key,
          },
          isUploaded: true,
        };
        dispatch(setFileKey(res?.talent_info?.resume?.file_key));
        dispatch(setFormDocuments([fileUrl]));
      }
    }
  };

  const setResumeParsedDetails = (res) => {
    if (res) {
      if (res?.talent_info?.educational_institute?.length > 0) {
        setValue(
          'educationDetails',
          res?.talent_info?.educational_institute?.map((detail) => ({
            educationInstitution: { label: detail.institution.name, value: detail.institution._id },
            education: { label: detail.education.name, value: detail.education._id },
          })),
          { shouldValidate: true },
        );
      } else {
        setValue('educationDetails', [{}]);
      }
      if (res?.tools && res?.tools.length > 0) {
        setValue(
          'tools',
          res?.tools?.map((tool) => ({ label: tool.name, value: tool._id })),
          { shouldValidate: true },
        );
      }
      if (res?.certificates && res?.certificates.length > 0) {
        setValue(
          'certificates',
          res?.certificates?.map((certificate) => ({
            label: certificate.name,
            value: certificate._id,
          })),
          { shouldValidate: true },
        );
      }
      if (res?.skills && res?.skills.length > 0) {
        setValue(
          'skills',
          res?.skills?.map((skill) => ({ label: skill.name, value: skill._id })),
          { shouldValidate: true },
        );
      }
    }
  };

  useEffect(() => {
    if (parseResume) {
      if (parsedUploaded) {
        dispatch(getUserDetails(onGetUserDetailsSuccess));
      } else if (!parsedUploaded && parsedResumeData != null) {
        setResumeParsedDetails(parsedResumeData);
        dispatch(resumeParsedDetailsSuccess(parsedResumeData));
      } else if (!parsedUploaded && parsedResumeData === null) {
        dispatch(
          getResumeParsedDetails(
            setResumeParsedDetails,
            setParseResume,
            savedFormDocuments[0]?.uploadData?.file_key ?? fileKeyDetails,
          ),
        );
      }
    } else {
      dispatch(getUserDetails(onGetUserDetailsSuccess));
    }
    dispatch(getCustomerSupportCount());
  }, [parseResume, parsedResumeData, parsedUploaded]);

  const [customerSupportModal, setCustomerSupportModal] = useState(false);
  const [feedbackModal, setFeedbackSupportModal] = useState(false);
  const [defaultSelected, setDefaultSelected] = useState([]);
  const handleCustomerSupport = (value) => {
    setCustomerSupportModal(true);
    setDefaultSelected(value);
  };

  const toggleSupportModal = () => {
    setCustomerSupportModal(!customerSupportModal);
  };

  const toggleFeedbackSupportModal = () => {
    setFeedbackSupportModal(!feedbackModal);
  };

  const onCustomerSupportSuccess = () => {
    setCustomerSupportModal(false);
    setFeedbackSupportModal(true);
    dispatch(getCustomerSupportCount());
  };

  useEffect(() => {
    if (files?.length > 0 && !files[0].file?.name) {
      setFiles([]);
    }
  }, [files]);

  return (
    <ProfileFormContainer>
      {(resumeParsed ? resumeParsedLoading : userDetailsIsLoading) ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100">
            <Col className="w-75" xs="100" sm="100" lg="75">
              <Card className="w-100">
                <CardHeader className="d-flex align-items-end">
                  <h4 className="m-0 mt-1">Education</h4>
                  <CustomerSupportCTA
                    type={CUSTOMER_SUPPORT_TYPES.education}
                    handleCustomerSupport={handleCustomerSupport}
                  />
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody>
                  {fields?.length === 0 ? (
                    <Row className="mt-1 d-flex align-items-center">
                      <Col sm="12" md="12" lg="5">
                        <Label className="form-label" for="educationInstitution">
                          Name of College or University<span className="label-asterisk me-50">*</span>
                        </Label>
                        <Controller
                          id="educationInstitution"
                          name="educationInstitution"
                          control={control}
                          render={({ field }) => (
                            <AsyncPaginate
                              debounceTimeout={1000}
                              additional={{ page: 1 }}
                              loadOptions={loadInstitutesOptions}
                              classNamePrefix="select"
                              placeholder="Select your college or university"
                              theme={selectThemeColors}
                              className={classNames('react-select', {
                                'is-invalid': errors && errors.educationInstitution,
                              })}
                              {...field}
                            />
                          )}
                        />
                        {errors && errors.educationInstitution && (
                          <FormFeedback>{errors.educationInstitution?.message}</FormFeedback>
                        )}
                      </Col>
                      <Col sm="12" md="12" lg="5">
                        <Label className="form-label" for="education">
                          Degree<span className="label-asterisk me-50">*</span>
                        </Label>
                        <Controller
                          id="education"
                          name="education"
                          control={control}
                          render={({ field }) => (
                            <AsyncPaginate
                              loadOptions={loadEducationsOptions}
                              classNamePrefix="select"
                              placeholder="Select your degree"
                              theme={selectThemeColors}
                              className={classNames('react-select', {
                                'is-invalid': errors && errors.education,
                              })}
                              {...field}
                            />
                          )}
                        />
                        {errors && errors.education && <FormFeedback>{errors.education?.message}</FormFeedback>}
                      </Col>
                    </Row>
                  ) : (
                    fields?.map((item, index) => (
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
                                {errors?.educationDetails[index]?.educationInstitution &&
                                  errors?.educationDetails[index]?.educationInstitution?.label?.message}
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
                                {errors?.educationDetails[index]?.education &&
                                  errors?.educationDetails[index]?.education?.label?.message}
                              </FormFeedback>
                            )}
                        </Col>
                        <Col sm="12" md="12" lg="2">
                          {getValues('educationDetails') && getValues('educationDetails')?.length > 1 && (
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
                    ))
                  )}

                  <Row className="mt-2 mb-3">
                    <div
                      className="d-flex align-items-center upload-button cursor-pointer"
                      onClick={handleAddEducation}
                    >
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
              <Card className="w-100">
                <CardHeader className="d-flex align-items-end">
                  <h4 className="m-0 mt-1">Expertise</h4>
                  <CustomerSupportCTA
                    type={CUSTOMER_SUPPORT_TYPES.tools_and_skills}
                    handleCustomerSupport={handleCustomerSupport}
                  />
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody>
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
                      {errors.skills && <FormFeedback>{errors.skills?.message}</FormFeedback>}
                    </Col>
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
                            placeholder="Select up to 5 tools"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.tools,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.tools && <FormFeedback>{errors.tools?.message}</FormFeedback>}
                    </Col>
                    {/* <Col sm="12" md="12" lg="6">
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
                      {errors.certificates && <FormFeedback>{errors.certificates?.message}</FormFeedback>}
                    </Col> */}
                  </Row>
                  <Row className="mb-2">

                    {/* <Col sm="12" md="12" lg="6">
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
                            placeholder="Select up to 5 tools"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.tools,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.tools && <FormFeedback>{errors.tools?.message}</FormFeedback>}
                    </Col> */}
                  </Row>
                  {supportData?.tools_and_skills?.pending_requests > 0 && (
                    <NoteComponent type="info" requestCount={supportData?.tools_and_skills?.pending_requests} />
                  )}
                  {supportData?.tools_and_skills?.approved_requests > 0 && (
                    <NoteComponent type="success" requestCount={supportData?.tools_and_skills?.approved_requests} />
                  )}
                </CardBody>
              </Card>
              <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-100">
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
            </Col>
            {!isEmpty(files) && (
              <Col>
                <Card>
                  <CardBody>
                    <div className="d-flex flex-column">
                      <div className="d-flex" style={{ backgroundColor: '#0185E426', padding: 20 }}>
                        <Col lg="fit">
                          <Info className="font-medium-3 me-50" color="#004280" />
                        </Col>

                        <Col>
                          <div className="d-flex justify-content-between w-100">
                            <span style={{ color: '#004280' }}>
                              <span className="fw-bold">Auto Fill</span>

                              <FormGroup switch>
                                <Input
                                  type="switch"
                                  checked={parseResume}
                                  onClick={() => {
                                    setParsedUploaded(false);
                                    setParseResume(!parseResume);
                                    dispatch(setResumeParsed(!parseResume));
                                  }}
                                />
                              </FormGroup>
                            </span>
                          </div>
                        </Col>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <h4 className="m-0 mt-1">Profile Completion</h4>
                    <CardText className="m-0 mt-1">Make it easier for others to find you by completing your profile.</CardText>
                    <h3 className="m-0 mt-1 mb-1">{overallPercentageCompletion}%</h3>
                    <Progress value={overallPercentageCompletion}
                      style={{ height: '0.5rem' }}
                      className={`${giveProgressBarColorClassName(overallPercentageCompletion)} p-0 m-0 w-100`}
                     />

                  </CardHeader>

                  <CardBody>
                    <hr className="m-0 card-header-border" />

                    {isTrumioTalent && <div className='d-flex gap-1 mt-1'>
                      <div className="custom-checkbox-wrapper">
                        <Input type="checkbox" id="customCheckbox" className="custom-checkbox-input" checked={isProjectReady} />
                        <label htmlFor="customCheckbox" className="custom-checkbox-label" />
                      </div>
                      <div>
                        <CardText className="m-0">Client Projects Ready</CardText>
                        <b className='text-primary cursor-pointer'
                          onClick={() => navigate(returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)?.path || "/marketplace")}
                        >{isProjectReady ? 'Explore Projects' : `${returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)?.label}`} <ChevronRight size="1.2em" /></b>
                      </div>
                    </div>}

                    {isFlextern && <div className='d-flex gap-1 mt-1'>
                      <div className="custom-checkbox-wrapper">
                        <Input type="checkbox" id="customCheckbox2" className="custom-checkbox-input" checked={isFlexternReady} />
                        <label htmlFor="customCheckbox2" className="custom-checkbox-label" />
                      </div>
                      <div>
                        <CardText className="m-0">Flexternship Ready</CardText>
                        <b className='text-primary cursor-pointer'
                          onClick={() => navigate(returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)?.path || "/dashboard")}
                        >{isFlexternReady ? 'Explore Flexternships' : `${returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)?.label}`} <ChevronRight size="1.2em" /></b>
                      </div>
                    </div>}
                  </CardBody>
                </Card>
              </Col>
            )}
            {isEmpty(files) && (
              <Col>
                <Card>
                  <CardHeader>
                    <h4 className="m-0 mt-1">Profile Completion</h4>
                    <CardText className="m-0 mt-1">Make it easier for others to find you by completing your profile.</CardText>
                    <h3 className="m-0 mt-1 mb-1">{overallPercentageCompletion}%</h3>
                    <Progress value={overallPercentageCompletion}
                      style={{ height: '0.5rem' }}
                      className={`${giveProgressBarColorClassName(overallPercentageCompletion)} p-0 m-0 w-100`}
                     />

                  </CardHeader>

                  <CardBody>
                    <hr className="m-0 card-header-border" />

                    {isTrumioTalent && <div className='d-flex gap-1 mt-1'>
                      <div className="custom-checkbox-wrapper">
                        <Input type="checkbox" id="customCheckbox" className="custom-checkbox-input" checked={isProjectReady} />
                        <label htmlFor="customCheckbox" className="custom-checkbox-label" />
                      </div>
                      <div>
                        <CardText className="m-0">Client Projects Ready</CardText>
                        <b className='text-primary cursor-pointer'
                          onClick={() => navigate(returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)?.path || "/marketplace")}
                        >{isProjectReady ? 'Explore Projects' : `${returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)?.label}`} <ChevronRight size="1.2em" /></b>
                      </div>
                    </div>}

                    {isFlextern && <div className='d-flex gap-1 mt-1'>
                      <div className="custom-checkbox-wrapper">
                        <Input type="checkbox" id="customCheckbox2" className="custom-checkbox-input" checked={isFlexternReady} />
                        <label htmlFor="customCheckbox2" className="custom-checkbox-label" />
                      </div>
                      <div>
                        <CardText className="m-0">Flexternship Ready</CardText>
                        <b className='text-primary cursor-pointer'
                          onClick={() => navigate(returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)?.path || "/dashboard")}
                        >{isFlexternReady ? 'Explore Flexternships' : `${returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)?.label}`} <ChevronRight size="1.2em" /></b>
                      </div>
                    </div>}
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
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

export default FlexternEducational;
