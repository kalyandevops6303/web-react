import React, { useEffect, useState, useRef } from 'react';
import { AsyncPaginate, reduceGroupedOptions } from 'react-select-async-paginate';
import { useLocation, useNavigate } from 'react-router-dom';
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
  FormGroup,
  Input,
  Progress,
  CardText,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Plus, Info } from 'react-feather';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { ProfileFormContainer, UploadIconContainer } from '../../views/Onboarding/style';
import theme from '../../configs/themeVariables';
import {
  deleteResume,
  getUserDetails,
  saveProfileDetails,
  getResumeParsedDetails,
  saveFlexternProfileDetails,
} from '../../redux/actions/talentOnboardingActions';
import { resumeParsedDetailsSuccess } from '../../redux/reducers/talentOnboarding';
import { resumeUploadService, updateParsedResumeService } from '../../services/talentOnboardingServices';
import { downloadUrlLoading, userData } from '../../redux/selectors/dashboardSelectors';
import {
  deleteResumeLoading,
  profileDetailsLoading,
  userDetailsLoading,
  resumeParsedDetails,
  resumeParsedDetailsLoading,
  userDetails,
} from '../../redux/selectors/talentOnboardingSelectors';
import {
  // certificatesService,
  educationsService,
  paginatedInstitutesService,
  skillsService,
  toolsService,
} from '../../services/staticServices';
import ShowToastMessage from '../../@core/components/toast';
import {
  CUSTOMER_SUPPORT_TYPES,
  userOnboarding,
  userProfileEdit,
  userTypes,
  studyYears,
  graduationYears,
  maxFileSize,
} from '../../utility/constants/Constant';
import { getCustomerSupportCount } from '../../redux/actions/supportActions';
import {
  formatDateWithTime,
  downloadFile,
  downloadUploadedFile,
  filteredFormSchema,
  isEmpty,
  removeEmptyKeys,
  returnFilteredDropdownOptions,
  giveProgressBarColorClassName,
  renderFilePreview,
} from '../../utility/Utils';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import {
  formData,
  resumeParsed,
  formDocuments,
  resumeDataUploadedForEducation,
  fileKey,
  resumeDataUploadedForPersonal,
  resumeDataUploadedForSocial,
} from '../../redux/selectors/formDataSelectors';
import {
  clearAllFormData,
  setFormData,
  setResumeParsed,
  setFormDocuments,
  setResumeDataUploadedForEducation,
  setFileKey,
} from '../../redux/reducers/formData';
import { getDownloadUrl } from '../../redux/actions/dashboardActions';
import { returnCompleteProfileDetailsCta } from '../../utility/constants/CompleteProfileDetailsCta';
import '../../App.css';

import { ERROR } from '../../utility/constants/ToastTypes';
import CustomerSupportModal from '../../views/modals/CustomerSupportModal';
import FeedbackForCustomerSupportModal from '../../views/modals/CustomerSupportFeedbackModal';
import NoteComponent from '../../views/Onboarding/NoteComponent';
import CustomerSupportCTA from '../../views/Onboarding/CustomerSupportCTA';
import Select from 'react-select';
import uuidv4 from '../../lib/uuidv4';
import { projectFileUploadToAzureService } from '../../services/createProjectServices';
const EducationFormRow = ({
  index,
  control,
  errors,
  getValues,
  handleRemoveEducation,
  loadInstitutesOptions,
  loadEducationsOptions,
}) => {
  return (
    <Row className="mt-5">
      {/* Institution Column */}
      <Col sm="12" lg="6">
        <Label className="form-label" for={`otherEducationDetails.${index}.educationInstitution`}>
          Institution
        </Label>
        <Controller
          id={`otherEducationDetails.${index}.educationInstitution`}
          name={`otherEducationDetails.${index}.educationInstitution`}
          control={control}
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
                'is-invalid': errors?.otherEducationDetails?.[index]?.educationInstitution,
              })}
            />
          )}
        />
        {errors?.otherEducationDetails?.[index]?.educationInstitution?.label?.message && (
          <FormFeedback>{errors.otherEducationDetails[index].educationInstitution.label.message}</FormFeedback>
        )}
      </Col>

      {/* Degree Column with Remove Button */}
      <Col sm="12" lg="6">
        <Label className="form-label" for={`otherEducationDetails.${index}.education`}>
          Degree
        </Label>
        <div className="d-flex gap-2">
          <div className="flex-grow-1">
            <Controller
              id={`otherEducationDetails.${index}.education`}
              name={`otherEducationDetails.${index}.education`}
              control={control}
              render={({ field }) => (
                <AsyncPaginate
                  {...field}
                  loadOptions={loadEducationsOptions}
                  placeholder="Enter your degree"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classNames('react-select', {
                    'is-invalid': errors?.otherEducationDetails?.[index]?.education,
                  })}
                />
              )}
            />
            {errors?.otherEducationDetails?.[index]?.education?.label?.message && (
              <FormFeedback>{errors.otherEducationDetails[index].education.label.message}</FormFeedback>
            )}
          </div>
          {getValues('otherEducationDetails')?.length > 0 && (
            <Button
              type="button"
              color="flat-danger"
              className="text-sm h-[38px]  px-3 py-0"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};
const FlexternEducational = () => {
  const EducationalSchema = yup.object().shape({
    startYear: yup
      .object()
      .shape({
        label: yup.string().required('Start year is required'),
        value: yup.string().required('Start year is required'),
      })
      .required('Start year is required'),
    graduationYear: yup
      .object()
      .shape({
        label: yup.string().required('Graduation year is required'),
        value: yup.string().required('Graduation year is required'),
      })
      .when('startYear', (startYear, schema) => {
        if (startYear) {
          return schema.test(
            'is-after-start',
            'Graduation year must be after start year',
            (value) => parseInt(value?.value, 10) > parseInt(startYear.value, 10),
          );
        }
        return schema;
      })
      .required('Graduation year is required'),
    institutionEmail: yup.string().email('Must be a valid email').nullable().optional(),
    institution: yup
      .object()
      .shape({
        label: yup.string().required('Institution is required'),
        value: yup.string().required('Institution is required'),
      })
      .required('Educational Institution is required'),
    education: yup
      .object()
      .shape({
        label: yup.string().required('Education is required'),
        value: yup.string().required('Education is required'),
      })
      .required('Education is required'),
    otherEducationDetails: yup
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
      .nullable()
      .optional(),
    // .min(1, 'At least one degree should be added'),
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
    resume: yup
      .object()
      .shape({
        file_name: yup.string().required('Resume is required'),
        file_key: yup.string().required('Resume is required'),
      })
      .required('Resume is required'),
  });
  const savedFormData = useSelector(formData);
  const fileKeyDetails = useSelector(fileKey);
  const savedFormDocuments = useSelector(formDocuments);
  const parsedResumeData = useSelector(resumeParsedDetails);
  const IsresumeParsed = useSelector(resumeParsed);
  const resumeParsedLoading = useSelector(resumeParsedDetailsLoading);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
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
      otherEducationDetails: savedFormData?.otherEducationDetails || null,
      tools: savedFormData?.tools || null,
      certificates: savedFormData?.certificates || null,
      skills: savedFormData?.skills || null,
      startYear: savedFormData?.startYear || null,
      graduationYear: savedFormData?.graduationYear || null,
      institutionEmail: savedFormData?.institutionEmail || null,
      institution: savedFormData?.institution || null,
      education: savedFormData?.education || null,
      resume: savedFormData?.resume || null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'otherEducationDetails',
  });
  const [parseResume, setParseResume] = useState(IsresumeParsed || false);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isResumeDataUploadedForEducation = useSelector(resumeDataUploadedForEducation);
  const isResumeDataUploadedForPersonal = useSelector(resumeDataUploadedForPersonal);
  const isResumeDataUploadedForSocial = useSelector(resumeDataUploadedForSocial);
  const [parsedUploaded, setParsedUploaded] = useState(
    isResumeDataUploadedForEducation || isResumeDataUploadedForPersonal || isResumeDataUploadedForSocial || false,
  );
  const [files, setFiles] = useState(savedFormDocuments || []);

  const localFormData = useWatch({ control });

  const getOverallPercentageCompletion = () => {
    setOverallPercentageCompletion(profileCompletionFlextern);
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
      setFiles(savedFormDocuments || []);
    }
  }, [parseResume]);
  useEffect(() => {
    if (!files || (files?.length > 0 && !files[0].file?.name)) {
      setFiles([]);
    }
  }, [files]);
  const isDeleteResumeLoading = useSelector(deleteResumeLoading);
  const handleRemoveFile = async (file) => {
    const uploadedFiles = files;
    await dispatch(
      deleteResume(() => {
        const filtered = uploadedFiles.filter((i) => i.id !== file.id);
        dispatch(setFormDocuments(null));
        setFiles([...filtered]);
      }),
    );
    setValue('resume', null, { shouldValidate: true });
  };
  const isFileValid = (file) => {
    if (file.size > maxFileSize) {
      ShowToastMessage(ERROR, `${file.name} size exceeds the maximum limit (5MB).`);
      return false;
    }
    return true;
  };
  const handleUploadFile = async (file) => {
    try {
      setUploadingFiles([file]);

      await projectFileUploadToAzureService(file.uploadData.upload_url, file.file, {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'multipart/form-data',
      });
    } catch (error) {
      dispatch(resumeParsedDetailsSuccess(null));
      setParseResume(false);
      ShowToastMessage(ERROR, 'Something went wrong. Please try uploading again.');
    } finally {
      setUploadingFiles((prevFiles) => prevFiles.filter((f) => f.file !== file.file));
    }
  };

  const [educationsOptions, setEducationsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  // const [certificatesOptions, setCertificatesOptions] = useState(null);

  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const supportData = useSelector((state) => state.support.supportCount);

  const profileCompletionFlextern = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed);
  const profileCompletionFlexternMissingValues = useSelector(
    (state) => state.auth?.profileCompletionFlextern?.values_missing,
  );
  const profileCompletionProject = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed);
  const profileCompletionProjectMissingValues = useSelector(
    (state) => state.dashboard?.profilePercentage?.values_missing,
  );

  const isFlexternReady = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed) == 100;
  const isProjectReady = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed) == 100;
  const isFlextern = useSelector((state) => state.auth?.is_flextern);
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
      dispatch(getUserDetails(() => {}));
      navigate(`/${userOnboarding.talent}/social-details`);
    }
    dispatch(setResumeDataUploadedForEducation(parseResume));
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

  useEffect(() => {
    if (watch('educationDetails')?.length < 2) {
      setValue('educationDetails', [
        { educationInstitution: watch('educationInstitution'), education: watch('education') },
      ]);
    }
  }, [watch('educationInstitution'), watch('education')]);

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
    const isFilled = watch('otherEducationDetails')?.every((item) => {
      const { educationInstitution, education } = item;
      return educationInstitution?.value && educationInstitution?.label && education?.value && education?.label;
    });

    if (!fields.length || isFilled) {
      append({
        educationInstitution: null,
        education: null,
      });
    } else {
      ShowToastMessage(ERROR, 'Please fill all required education fields above');
    }
  };

  const handleRemoveEducation = (index) => {
    // Remove the field from the form
    remove(index);

    // Get current form data
    const currentFormData = { ...savedFormData };

    // If otherEducationDetails exists, remove the entry at the specified index
    if (currentFormData.otherEducationDetails) {
      currentFormData.otherEducationDetails = currentFormData.otherEducationDetails.filter((_, i) => i !== index);
      // Update form data in Redux store
      dispatch(setFormData(currentFormData));
    }
  };

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      if (res?.talent_info?.other_educational_institutes.length > 0) {
        setValue(
          'otherEducationDetails',
          savedFormData?.otherEducationDetails?.length > 0
            ? savedFormData?.otherEducationDetails
            : res?.talent_info?.other_educational_institutes?.map((detail) => ({
                educationInstitution: { label: detail.institution.name, value: detail.institution._id },
                education: { label: detail.education.name, value: detail.education._id },
              })),
          { shouldValidate: true },
        );
      }
      if (!isEmpty(res?.talent_info?.educational_institute)) {
        setValue(
          'institution',
          isEmpty(res?.talent_info?.educational_institute?.institution)
            ? null
            : {
                label: savedFormData?.institution?.label || res?.talent_info?.educational_institute?.institution?.name,
                value: savedFormData?.institution?.value || res?.talent_info?.educational_institute?.institution?._id,
              },
        );
        setValue(
          'education',
          isEmpty(res?.talent_info?.educational_institute?.education)
            ? null
            : {
                label: savedFormData?.education?.label || res?.talent_info?.educational_institute?.education?.name,
                value: savedFormData?.education?.value || res?.talent_info?.educational_institute?.education?._id,
              },
        );
        setValue(
          'institutionEmail',
          savedFormData?.institutionEmail || res?.talent_info?.educational_institute?.institute_email,
        );
        setValue(
          'startYear',
          res?.talent_info?.educational_institute?.start_year === 0
            ? null // Set to null to show placeholder
            : {
                label: savedFormData?.startYear?.label || res?.talent_info?.educational_institute?.start_year,
                value: savedFormData?.startYear?.value || res?.talent_info?.educational_institute?.start_year,
              },
        );
        setValue(
          'graduationYear',
          res?.talent_info?.educational_institute?.grad_year === 0
            ? null // Set to null to show placeholder
            : {
                label: savedFormData?.graduationYear?.label || res?.talent_info?.educational_institute?.grad_year,
                value: savedFormData?.graduationYear?.value || res?.talent_info?.educational_institute?.grad_year,
              },
        );
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
            file_key: res?.talent_info?.resume?.file_key,
          },
          isUploaded: true,
          lastModified:
            savedFormDocuments != null
              ? savedFormDocuments[0]?.lastModified
                ? savedFormDocuments[0]?.lastModified
                : res?.talent_info?.resume?.created_at
              : res?.talent_info?.resume?.created_at,
        };
        dispatch(
          setFileKey(
            savedFormDocuments != null
              ? savedFormDocuments[0]?.uploadData?.file_key
              : res?.talent_info?.resume?.file_key,
          ),
        );
        setValue('resume', {
          file_name: fileUrl?.file?.name,
          file_key: fileUrl?.uploadData?.file_key,
        });
        setFiles([fileUrl]);
        dispatch(setFormDocuments([fileUrl]));
      }
    }
  };
  const userData = useSelector(userDetails);
  const setResumeParsedDetails = (res) => {
    if (res) {
      // Handle educational institutes from resume parsing
      if (res?.educational_institute?.length > 0) {
        // Set primary education (first entry)
        if (userData?.talent_info?.educational_institute?.start_year) {
          setValue(
            'startYear',
            {
              label: userData?.talent_info?.educational_institute?.start_year,
              value: userData?.talent_info?.educational_institute?.start_year,
            },
            { shouldValidate: true },
          );
        }
        if (userData?.talent_info?.educational_institute?.grad_year) {
          setValue(
            'graduationYear',
            {
              label: userData?.talent_info?.educational_institute?.grad_year,
              value: userData?.talent_info?.educational_institute?.grad_year,
            },
            { shouldValidate: true },
          );
        }
        if (userData?.talent_info?.educational_institute?.institute_email) {
          setValue('institutionEmail', userData?.talent_info?.educational_institute?.institute_email);
        }
        const primaryEducation = res.educational_institute[0];
        setValue(
          'institution',
          {
            label: primaryEducation?.institution?.name,
            value: primaryEducation?.institution?._id,
          },
          { shouldValidate: true },
        );

        setValue(
          'education',
          {
            label: primaryEducation?.education?.name,
            value: primaryEducation?.education?._id,
          },
          { shouldValidate: true },
        );

        // Set other education details (remaining entries)
        if (res?.educational_institute?.length > 1) {
          setValue(
            'otherEducationDetails',
            res?.educational_institute?.slice(1).map((detail) => ({
              educationInstitution: {
                label: detail.institution.name,
                value: detail.institution._id,
              },
              education: {
                label: detail.education.name,
                value: detail.education._id,
              },
            })),
            { shouldValidate: true },
          );
        }
      }

      // Handle tools
      if (res?.tools && res?.tools.length > 0) {
        setValue(
          'tools',
          res.tools.map((tool) => ({
            label: tool.name,
            value: tool._id,
          })),
          { shouldValidate: true },
        );
      }

      // Handle certificates
      if (res?.certificates && res?.certificates.length > 0) {
        setValue(
          'certificates',
          res.certificates.map((certificate) => ({
            label: certificate.name,
            value: certificate._id,
          })),
          { shouldValidate: true },
        );
      }

      // Handle skills
      if (res?.skills && res?.skills.length > 0) {
        setValue(
          'skills',
          res.skills.map((skill) => ({
            label: skill.name,
            value: skill._id,
          })),
          { shouldValidate: true },
        );
      }
      if (savedFormDocuments) {
        setFiles([
          {
            file: {
              name: savedFormDocuments[0]?.file?.name,
              size: savedFormDocuments[0]?.file?.size,
            },
            uploadData: {
              file_key: savedFormDocuments[0]?.uploadData?.file_key,
            },
            isUploaded: true,
            lastModified: savedFormDocuments[0]?.lastModified,
          },
        ]);
      }
    }
  };

  const fetchUploadUrl = async (file) => {
    const response = await resumeUploadService(file.name);
    const fileWithUrl = {
      id: uuidv4(),
      file,
      uploadData: response?.data?.data,
      lastModified: Date.now(),
      isUploaded: false,
    };
    dispatch(setFormDocuments([fileWithUrl]));
    setFiles([fileWithUrl]);
    await handleUploadFile(fileWithUrl);
    dispatch(setFileKey(response?.data?.data?.file_key));
    setValue(
      'resume',
      {
        file_name: file?.name,
        file_key: response?.data?.data?.file_key,
      },
      { shouldValidate: true },
    );
    trigger(['resume']);
    // if (response)
    //   dispatch(
    //     getResumeParsedDetails(setResumeParsedDetails, setParseResume, response?.data?.data?.file_key, setFiles),
    //   );
    dispatch(setResumeParsed(true));
    setParseResume(true);
  };

  const handleFileChange = async (e) => {
    if (e.target.files) {
      if (isFileValid(e.target.files[0])) {
        dispatch(clearAllFormData());
        await fetchUploadUrl(e.target.files[0]);
        setParseResume(true);
        dispatch(setResumeParsed(true));
      }
    } else {
      e.target.value = '';
    }
  };

  const filesRef = useRef();
  useEffect(() => {
    const fileReRender = async () => {
      if (savedFormDocuments != null) {
        filesRef.current = files;
        setFiles(savedFormDocuments);
        dispatch(setFormDocuments(savedFormDocuments));
      } else {
        setFiles([]);
      }
    };
    fileReRender();
  }, [savedFormDocuments]);

  const onDownloadResumeUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
  };

  const downloadResume = (file) => {
    if (file.isUploaded) {
      dispatch(
        getDownloadUrl({
          fileKey: file?.uploadData?.file_key,
          onSuccess: onDownloadResumeUrlSuccess,
          fileName: file.file.name,
        }),
      );
    } else {
      downloadUploadedFile({ file: file.file });
    }
  };

  const fileList = () => (
    <div className="custom-card ">
      <Card className="mb-0">
        {files?.map((file, index) => (
          <Row
            key={file.id}
            className={
              index !== files.length - 1
                ? 'd-flex flex-column align-items-start mb-1'
                : 'd-flex flex-column align-items-start'
            }
          >
            <div className="d-flex flex-wrap w-100 gap-1 gap-xl-0 justify-content-between">
              <Col
                className="d-flex cursor-pointer justify-content-between align-items-center  px-1 w-100"
                style={{ color: theme.activeColor, maxWidth: 'fit-content' }}
                onClick={() => downloadResume(file)}
              >
                {downloadUrlIsLoading ? (
                  <div className="d-flex align-items-center justify-content-center w-100">
                    <Spinner color="primary" />
                  </div>
                ) : (
                  <div className="d-flex align-items-center w-100 ">
                    <span>{renderFilePreview(file.file)}</span>
                    <div className="d-flex flex-column">
                      <span className="text-sm text-grey-heading font-medium">{file.file.name}</span>
                      <span className="text-xs text-grey font-normal"> {formatDateWithTime(file.lastModified)}</span>
                    </div>
                  </div>
                )}
              </Col>
              <Button
                color="flat-danger"
                className="btn-left-margin"
                disabled={uploadingFiles.includes(file) || isDeleteResumeLoading}
                onClick={() => {
                  handleRemoveFile(file);
                  setParseResume(false);
                  dispatch(resumeParsedDetailsSuccess(null));
                  dispatch(setResumeParsed(false));
                }}
              >
                {uploadingFiles.includes(file) || isDeleteResumeLoading ? <Spinner size="sm" /> : 'Remove'}
              </Button>
            </div>
            {/* <Row className="mt-2">
              <Row>
                <Col>{uploadingFiles.includes(file) ? <span>Uploading...</span> : <span>Uploaded</span>}</Col>
                <Col>{getFileSize(file.file.size)}</Col>
              </Row>
              <Row className="d-flex align-items-center">
                <Col>{requiredFormattedDate}</Col>
                <Col>
                  <Button
                    color="flat-danger"
                    className="btn-left-margin"
                    disabled={uploadingFiles.includes(file) || isDeleteResumeLoading}
                    onClick={() => {
                      handleRemoveFile(file);
                      setParseResume(false);
                      dispatch(resumeParsedDetailsSuccess(null));
                      dispatch(setResumeParsed(false));
                    }}
                  >
                    {isDeleteResumeLoading ? <Spinner size="sm" /> : 'Remove'}
                  </Button>
                </Col>
              </Row>
            </Row> */}
          </Row>
        ))}
      </Card>
    </div>
  );
  const onSubmit = (data) => {
    const {
      otherEducationDetails,
      skills,
      tools,
      certificates,
      startYear,
      graduationYear,
      institutionEmail,
      institution,
      education,
    } = data;

    const other_educational_institutes = otherEducationDetails?.map((educationDetail) => ({
      institution: educationDetail.educationInstitution.value,
      education: educationDetail.education.value,
    }));
    const expertise = {
      skills: skills?.map((skill) => skill.value),
      tools: tools?.map((tool) => tool.value),
      certificates: certificates?.map((certificate) => certificate.value),
    };

    const reqData = {
      educational_institute: {
        institution: institution?.value,
        institute_email: institutionEmail,
        institute_email_verify: false,
        education: education?.value,
        start_year: parseInt(startYear?.value, 10) || 0,
        grad_year: parseInt(graduationYear?.value, 10) || 0,
      },
      resume: !isEmpty(files)
        ? {
            file_name: files[0]?.file?.name || '',
            file_key: files[0]?.uploadData?.file_key || '',
          }
        : {},
      other_educational_institutes: other_educational_institutes,
      expertise,
    };

    dispatch(saveFlexternProfileDetails(removeEmptyKeys(reqData), onSuccess));
    // if (IsresumeParsed) {
    //   const resumeUpdatedData = {
    //     target_info: {
    //       ...parsedResumeData,
    //       educational_institute: otherEducationDetails?.map((details) => ({
    //         institution: { name: details.educationInstitution.label, _id: details.educationInstitution.value },
    //         education: { name: details.education.label, _id: details.education.value },
    //       })),
    //       skills: skills?.map((skill) => ({
    //         name: skill?.label,
    //         _id: skill?.value,
    //       })),
    //       tools: tools?.map((tool) => ({
    //         name: tool?.label,
    //         _id: tool?.value,
    //       })),
    //       certificates: certificates?.map((certificate) => ({
    //         name: certificate?.label,
    //         _id: certificate?.value,
    //       })),
    //     },
    //   };

    //   dispatch(updateParsedResumeService(parsedResumeData?._id, resumeUpdatedData));
    // }
  };

  useEffect(() => {
    if (parseResume) {
      if (parsedUploaded) {
        dispatch(getUserDetails(onGetUserDetailsSuccess));
      } else if (!parsedUploaded && parsedResumeData != null) {
        setResumeParsedDetails(parsedResumeData);
        dispatch(resumeParsedDetailsSuccess(parsedResumeData));
        if (savedFormDocuments) {
          setFiles([
            {
              file: {
                name: savedFormDocuments[0]?.file?.name,
                size: savedFormDocuments[0]?.file?.size,
              },
              uploadData: {
                file_key: savedFormDocuments[0]?.uploadData?.file_key,
              },
              isUploaded: true,
              lastModified: savedFormDocuments[0]?.lastModified,
            },
          ]);
          dispatch(setFileKey(savedFormDocuments[0]?.uploadData?.file_key));
        }
      } else if (!parsedUploaded && parsedResumeData === null) {
        dispatch(
          getResumeParsedDetails(
            setResumeParsedDetails,
            setParseResume,
            savedFormDocuments[0]?.uploadData?.file_key ?? fileKeyDetails,
          ),
        );
        setFiles([
          {
            file: {
              name: savedFormDocuments[0]?.file?.name,
              size: savedFormDocuments[0]?.file?.size,
            },
            uploadData: {
              file_key: savedFormDocuments[0]?.uploadData?.file_key,
            },
            isUploaded: true,
            lastModified: savedFormDocuments[0]?.lastModified,
          },
        ]);
        dispatch(setFileKey(savedFormDocuments[0]?.uploadData?.file_key));
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
  const handleParseResumeToggle = () => {
    setParsedUploaded(false);
    setParseResume(!parseResume);
    dispatch(setResumeParsed(!parseResume));
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
      {userDetailsIsLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100">
            <Col className="w-70" xs="12" sm="12" lg="8">
              <Card className="w-100">
                <CardHeader className="d-flex align-items-end">
                  <h4 className="m-0 mt-1 text-lg font-medium">Current Education</h4>
                  <CustomerSupportCTA
                    type={CUSTOMER_SUPPORT_TYPES.education}
                    handleCustomerSupport={handleCustomerSupport}
                  />
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody>
                  <Row className="mb-1 mt-2">
                    <Col sm="6" md="6" lg="3">
                      <Label className="form-label" for="startYear">
                        Start Year<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        id="startYear"
                        name="startYear"
                        control={control}
                        invalid={errors.graduationYear && true}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={studyYears}
                            classNamePrefix="select"
                            placeholder="Start of education"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.graduationYear,
                            })}
                            onChange={(selOption) => {
                              field.onChange(selOption);
                              setValue('graduationYear', null);
                              trigger('graduationYear');
                            }}
                          />
                        )}
                      />
                      {errors.weekendStartTime && <FormFeedback>{errors.weekendStartTime.label.message}</FormFeedback>}
                    </Col>
                    <Col sm="6" md="6" lg="3">
                      <Label className="form-label" for="graduationYear">
                        Graduation Year<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        id="graduationYear"
                        name="graduationYear"
                        control={control}
                        invalid={errors.graduationYear && true}
                        render={({ field }) => (
                          <Select
                            options={
                              watch('startYear')
                                ? graduationYears?.filter(
                                    (t) => parseInt(t?.value, 10) > parseInt(watch('startYear')?.value, 10),
                                  )
                                : graduationYears
                            }
                            classNamePrefix="select"
                            placeholder="End of education "
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.weekendEndTime,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.weekendEndTime && <FormFeedback>{errors.weekendEndTime.label.message}</FormFeedback>}
                    </Col>
                    <Col sm="6" md="6" lg="6">
                      <Label className="form-label" for="institutionEmail">
                        Institution Email
                      </Label>
                      {/* <Row className="d-flex align-items-center justify-content-center"> */}
                      {/* <Col> */}
                      <Controller
                        id="institutionEmail"
                        name="institutionEmail"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            style={{ height: '38px' }}
                            placeholder="Enter your institute email id"
                            invalid={errors.institutionEmail && true}
                          />
                        )}
                      />
                      {errors.institutionEmail && <FormFeedback>{errors.institutionEmail.message}</FormFeedback>}
                      {/* </Col> */}
                      {/* <Col>
                  <div
                    className={`upload-button cursor-pointer ${
                      !watch('institutionEmail') || errors.institutionEmail ? 'disabled' : ''
                    }`}
                    onClick={() => {
                      if (!errors.institutionEmail && watch('institutionEmail')) {
                        toggleEmailVerifyModal();
                      }
                    }}
                  >
                    <h5 className="fw-bold" color={theme.activeNavPillText}>
                      Verify
                    </h5>
                  </div>
                </Col> */}
                      {/* </Row> */}
                    </Col>
                  </Row>

                  <Row className="flex justify-between mb-5 mt-4">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="institution">
                        Education Institution<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        id="institution"
                        name="institution"
                        control={control}
                        invalid={errors.institution && true}
                        render={({ field }) => (
                          <AsyncPaginate
                            {...field}
                            debounceTimeout={1000}
                            additional={{ page: 1 }}
                            loadOptions={loadInstitutesOptions}
                            // reduceOptions={reduceGroupedOptions}
                            // onChange={(selOption) => handleSelectChange(selOption, field)}
                            classNamePrefix="select"
                            placeholder="Enter your institution name"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.institution,
                            })}
                          />
                        )}
                      />
                      {errors.institution && <FormFeedback>{errors.institution.message}</FormFeedback>}
                    </Col>

                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="degree">
                        Education<span className="label-asterisk me-50">*</span>
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
                              'is-invalid': errors && errors.degree,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.degree && <FormFeedback>{errors.degree.message}</FormFeedback>}
                    </Col>
                  </Row>
                  <span
                    style={{
                      height: '1px',
                      display: 'block',
                      marginTop: '24px',
                      marginBottom: '24px',
                      backgroundColor: '#EBE9F1',
                    }}
                    className=""
                  ></span>
                  <p className="text-lg font-medium ">Other Education</p>
                  {fields?.length === 0 ? (
                    // <Row className="mt-2 mb-3">
                    <div
                      className="d-flex align-items-center upload-button cursor-pointer mt-5"
                      onClick={handleAddEducation}
                    >
                      <UploadIconContainer>
                        <Plus size={18} color={theme.activeNavPillText} />
                      </UploadIconContainer>
                      <h5 className="fw-bolder text-sm">Add Education</h5>
                    </div>
                  ) : (
                    // </Row>
                    fields?.map((item, index) => (
                      <EducationFormRow
                        key={item.id}
                        index={index}
                        control={control}
                        errors={errors}
                        getValues={getValues}
                        handleRemoveEducation={handleRemoveEducation}
                        loadInstitutesOptions={loadInstitutesOptions}
                        loadEducationsOptions={loadEducationsOptions}
                      />
                    ))
                  )}
                  {fields?.length > 0 && (
                    <Row className="mt-5 mb-5">
                      <div
                        className="d-flex align-items-center upload-button cursor-pointer"
                        onClick={handleAddEducation}
                      >
                        <UploadIconContainer>
                          <Plus size={18} color={theme.activeNavPillText} />
                        </UploadIconContainer>
                        <h5 className="fw-bolder text-sm">Add Education</h5>
                      </div>
                    </Row>
                  )}
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
                  <h4 className="m-0 mt-1 text-lg font-medium">Expertise</h4>
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
                  </Row>
                  <Row className="mb-2"></Row>
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
                <div className="d-flex justify-content-end">
                  <Button
                    color="primary"
                    outline
                    className="d-flex align-items-center justify-content-between me-2"
                    onClick={onSkipClick}
                  >
                    <span className="me-50">Skip</span>
                    <ChevronRight size={14} />
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    className="d-flex align-items-center justify-content-between"
                    disabled={!isValid || profileDetailsIsLoading}
                  >
                    {profileDetailsIsLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      <>
                        <span className="me-50">Save Continue</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs="12" sm="12" lg="4">
              <Card>
                <CardHeader>
                  <h4 className="m-0 mt-1 text-lg text-grey-heading font-medium">
                    Resume <span className="label-asterisk">*</span>
                  </h4>
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody style={{ paddingBottom: files.length === 0 ? '0px' : '11px' }}>
                  {/* IsresumeParsed ? resumeParsedLoading :  */}
                  <div className="d-flex flex-column gap-7">
                    <div
                      style={{
                        background: parseResume ? '#0185E426' : theme.greyedOutBackground,
                        padding: files.length === 0 ? '12px 20px 12px 20px' : '16px',
                      }}
                    >
                      <div className={`d-flex ${files?.length > 0 ? 'align-items-center' : ''}`}>
                        <Col lg="fit">
                          <Info className="font-medium-3 me-50" color="#004280" />
                        </Col>
                        <Col className="w-100 ">
                          <div
                            style={{ color: '#004280' }}
                            className="d-flex w-100  justify-content-between align-items-center"
                          >
                            <Col lg="10" style={{ color: '#004280' }} className="fw-bold mr-2">
                              Auto Fill {files && files?.length > 0 && 'Profile'}
                              {files && files.length === 0 && <span> - Upload your resume</span>}
                            </Col>
                            {resumeParsedLoading ? (
                              <Spinner size="sm" />
                            ) : (
                              !uploadingFiles.includes(files[0]) &&
                              !isEmpty(files) && (
                                <FormGroup switch className="p-0">
                                  <Input type="switch" checked={parseResume} onClick={handleParseResumeToggle} />
                                </FormGroup>
                              )
                            )}
                          </div>
                          {files?.length == 0 && (
                            <div className=" px-0 py-0">
                              <>
                                <Label
                                  for="resume"
                                  className="mt-2  d-flex flex-col align-items-center w-fit cursor-pointer"
                                >
                                  <h5 className="fw-bold ml-0 text-trublue-secondary-500">Upload Resume</h5>
                                </Label>
                                <Controller
                                  id="resume"
                                  name="resume"
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      ref={filesRef}
                                      id="resume"
                                      type="file"
                                      max={1}
                                      accept="application/pdf"
                                      className="d-none"
                                      onChange={(e) => {
                                        handleFileChange(e);
                                      }}
                                    />
                                  )}
                                />
                              </>
                            </div>
                          )}
                        </Col>
                      </div>
                    </div>
                    <Row>{files && files.length > 0 && <div>{fileList()}</div>}</Row>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h4 className="m-0 mt-1 text-lg font-medium">Profile Completion</h4>
                  <CardText className="m-0 mt-1">
                    Make it easier for others to find you by completing your profile.
                  </CardText>
                  <h3 className="m-0 mt-1 mb-1 text-xl font-semibold text-grey">{overallPercentageCompletion}%</h3>
                  <Progress
                    value={overallPercentageCompletion}
                    style={{ height: '0.5rem' }}
                    className={`${giveProgressBarColorClassName(overallPercentageCompletion)} p-0 m-0 w-100`}
                  />
                </CardHeader>

                <CardBody>
                  <hr className="m-0 card-header-border" />
                  {isFlextern && (
                    <div className="d-flex gap-1 mt-1">
                      <div className="custom-checkbox-wrapper">
                        <Input
                          type="checkbox"
                          id="customCheckbox2"
                          className="custom-checkbox-input"
                          checked={isFlexternReady}
                        />
                        <label htmlFor="customCheckbox2" className="custom-checkbox-label" />
                      </div>
                      <div>
                        <CardText className="m-0">Flexternship Ready</CardText>
                        <b
                          className="text-primary cursor-pointer d-flex align-items-center"
                          onClick={() =>
                            navigate(
                              returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionFlexternMissingValues)
                                ?.path || '/dashboard',
                            )
                          }
                        >
                          {isFlexternReady
                            ? 'Explore Flexternships'
                            : `${
                                returnCompleteProfileDetailsCta(
                                  userTypes.talent,
                                  profileCompletionFlexternMissingValues,
                                )?.label
                              }`}{' '}
                          <ChevronRight size="1.2em" />
                        </b>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
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
