import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
  Progress,
  CardText,
} from 'reactstrap';
import { AsyncPaginate, reduceGroupedOptions } from 'react-select-async-paginate';
import * as yup from 'yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import {
  downloadFile,
  downloadUploadedFile,
  filteredFormSchema,
  getFileSize,
  isFileValid,
  removeEmptyKeys,
  renderFilePreview,
  renderFormattedListingDate,
  returnFilteredDropdownOptions,
  selectThemeColors,
  giveProgressBarColorClassName,
} from '../../../utility/Utils';
import { countriesService, educationsService, paginatedInstitutesService } from '../../../services/staticServices';
import CustomerSupportCTA from '../CustomerSupportCTA';
import {
  CUSTOMER_SUPPORT_TYPES,
  studyYears,
  userOnboarding,
  userProfileEdit,
  graduationYears,
  userTypes,
} from '../../../utility/constants/Constant';
import CustomerSupportModal from '../../modals/CustomerSupportModal';
import { getCustomerSupportCount } from '../../../redux/actions/supportActions';
import theme from '../../../configs/themeVariables';
import { downloadUrlLoading, userData } from '../../../redux/selectors/dashboardSelectors';
import { GroupLabelWrapper } from '../../createClub/style';
import {
  identityFileLoading,
  profileDetailsLoading,
  userDetails,
} from '../../../redux/selectors/talentOnboardingSelectors';
import { formData, formDocuments } from '../../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData, setFormDocuments } from '../../../redux/reducers/formData';
import { identityUploadService } from '../../../services/talentOnboardingServices';
import uuidv4 from '../../../lib/uuidv4';
import { projectFileUploadToAzureService } from '../../../services/createProjectServices';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { getDownloadUrl } from '../../../redux/actions/dashboardActions';
import { deleteIdentityFile, getUserDetails, saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { selectFlexternBoolean, selectTrumioTalent } from '../../../redux/selectors/authSelectors';

import { returnCompleteProfileDetailsCta } from '../../../utility/constants/CompleteProfileDetailsCta';
import '../../../App.css';

const customDropdownStyles = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: '150px', // Set the height you want
    overflowY: 'auto',
  }),
};

const Additional = () => {
  const AdditionalInformationSchema = yup.object().shape({
    gender: yup
      .string()
      .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Please select a valid gender')
      .required('Gender is required'),
    country: yup
      .object()
      .shape({
        label: yup.string().required('Country is required'),
        value: yup.string().required('Country is required'),
      })
      .required('Country is required'),
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
    institutionEmail: yup.string().email('Must be a valid email'),
    institution: yup
      .object()
      .shape({
        label: yup.string().required('Institution is required'),
        value: yup.string().required('Institution is required'),
      })
      .required('Institution is required'),
    degree: yup
      .object()
      .shape({
        label: yup.string().required('Degree is required'),
        value: yup.string().required('Degree is required'),
      })
      .required('Degree is required'),
  });

  const savedFormData = useSelector(formData);
  const savedFormDocuments = useSelector(formDocuments);
  const flexternBoolean = useSelector(selectFlexternBoolean);
  const trumioTalent = useSelector(selectTrumioTalent);
  const isIdentityFileLoading = useSelector(identityFileLoading);
  const talentOnboardingData = useSelector(userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AdditionalInformationSchema),
    defaultValues: {
      gender: savedFormData?.gender || '',
      country: savedFormData?.country || null,
      startYear: savedFormData?.startYear || null,
      graduationYear: savedFormData?.graduationYear || null,
      institutionEmail: savedFormData?.institutionEmail || '',
      institution: savedFormData?.institution || null,
      education: savedFormData?.education || null,
    },
  });
  const localFormData = useWatch({ control });

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: AdditionalInformationSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields)?.filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const [countriesOptions, setCountriesOptions] = useState([]);
  const [educationsOptions, setEducationsOptions] = useState([]);
  const [customerSupportModal, setCustomerSupportModal] = useState(false);
  const [defaultSelected, setDefaultSelected] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const profileCompletionFlextern = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed);
  const profileCompletionFlexternMissingValues = useSelector(
    (state) => state.auth?.profileCompletionFlextern?.values_missing,
  );
  const profileCompletionProject = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed);
  const profileCompletionProjectMissingValues = useSelector(
    (state) => state.dashboard?.profilePercentage?.values_missing,
  );

  const isFlexternReady = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed) === 100;
  const isProjectReady = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed) === 100;
  const isFlextern = useSelector((state) => state.auth?.is_flextern);
  const isTrumioTalent = useSelector((state) => state.auth?.trumio_talent);

  const [overallPercentageCompletion, setOverallPercentageCompletion] = useState(0);

  const getOverallPercentageCompletion = () => {  
    setOverallPercentageCompletion(profileCompletionFlextern);
  };

  useEffect(() => {
    getOverallPercentageCompletion();
  }, [profileCompletionFlextern, profileCompletionProject]);

  const filesRef = useRef();
  // useEffect(() => {
  //   const fileReRender = async () => {
  //     if (savedFormDocuments != null) {
  //       filesRef.current = files;
  //       setFiles(savedFormDocuments);
  //       dispatch(setFormDocuments(savedFormDocuments));
  //     } else {
  //       setFiles([]);
  //     }
  //   };
  //   fileReRender();
  // }, [savedFormDocuments]);

  const userDetailsData = useSelector(userData);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
  const handleCustomerSupport = (value) => {
    setCustomerSupportModal(true);
    setDefaultSelected(value);
  };

  const onCustomerSupportSuccess = () => {
    setCustomerSupportModal(false);
    dispatch(getCustomerSupportCount());
  };

  const handleUploadFile = async (file) => {
    try {
      setUploadingFiles([file]);

      await projectFileUploadToAzureService(file.uploadData.upload_url, file.file, {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'multipart/form-data',
      });
    } catch (error) {
      ShowToastMessage(ERROR, 'Something went wrong. Please try uploading again.');
    } finally {
      setUploadingFiles((prevFiles) => prevFiles.filter((f) => f.file !== file.file));
    }
  };

  const fetchUploadUrl = async (file) => {
    const response = await identityUploadService(file.name);
    const fileWithUrl = {
      id: uuidv4(),
      file:{
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
      },
      uploadData: response?.data?.data,
      isUploaded: false,
    };
    // dispatch(setFormDocuments([fileWithUrl]));
    setFiles([fileWithUrl]);
    await handleUploadFile(fileWithUrl);
  };

  const handleFileChange = async (e) => {
    if (e.target.files) {
      if (isFileValid(e.target.files[0])) {
        dispatch(clearAllFormData());
        await fetchUploadUrl(e.target.files[0]);
      }
    } else {
      e.target.value = '';
    }
  };

  const loadCountriesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, countriesOptions),
      };
    }
    try {
      const response = await countriesService();

      const options = response?.data?.data?.map((country) => ({ label: country.name, value: country._id }));

      setCountriesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const loadEducationInstitutionOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await paginatedInstitutesService(page, search);
      let myInstitution = [];
      if (location.pathname.includes('profile-edit')) {
        myInstitution = userDetailsData?.talent_info?.educational_institute
          .map((educationDetails) => educationDetails.institution)
          .map((institute) => ({ label: institute.name, value: institute._id }));
      } else if (location.pathname.includes('talent-onboarding')) {
        myInstitution = talentOnboardingData?.talent_info?.educational_institute
          .map((educationDetails) => educationDetails.institution)
          .map((institute) => ({ label: institute.name, value: institute._id }));
      }

      const newOptions = response?.data?.data?.data
        .map((data) => ({ label: data.name, value: data._id }))
        .filter((option) => !myInstitution.some((myOption) => myOption.value === option.value));

      const instituteGroupLabels = [
        { label: 'My Institutions', options: [...myInstitution] },
        { label: 'Other Institutions', options: [...newOptions] },
      ];

      return {
        options: instituteGroupLabels,
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const handleSelectChange = (option, field) => {
    // const selectedOptionValue = option?.value;
    // const myInstitution = userDetailsData?.talent_info?.educational_institute
    //   .map((educationDetails) => educationDetails.institution)
    //   .map((institute) => institute._id);
    // const otherIntitution = myInstitution.includes(selectedOptionValue);

    // if (!otherIntitution) {
    //   setEducationInstitutionModal(true);
    // }
    field.onChange(option);
  };

  const formatGroupLabel = (data) => (
    <GroupLabelWrapper>
      <span>{data.label}</span>
    </GroupLabelWrapper>
  );

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

  const onDownloadResumeUrlSuccess = ({ download_url, file_name }) => {
    downloadFile({ data: { download_url }, file_name });
  };

  const downloadID = (file) => {
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

  const handleRemoveFile = async (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.id !== file.id);
    dispatch(setFormDocuments(null));
    setFiles([...filtered]);
    await dispatch(
      deleteIdentityFile(() => {
        dispatch(setFormDocuments(null));
        setFiles([...filtered]);
      }),
    );
  };

  const fileList = () => (
    <div className="custom-card mb-1">
      <Card className="py-1">
        {files?.map((file, index) => (
          <Row
            key={file.id}
            className={
              index !== files.length - 1
                ? 'd-flex flex-column align-items-start mb-1'
                : 'd-flex flex-column align-items-start'
            }
          >
            <div className="d-flex flex-wrap align-items-center w-100 gap-1 gap-xl-0 justify-content-between">
              <Col
                className="d-flex cursor-pointer justify-content-between align-items-center  px-1 w-75"
                style={{ color: theme.activeColor }}
                onClick={() => downloadID(file)}
              >
                {downloadUrlIsLoading ? (
                  <div className="d-flex align-items-center justify-content-center w-100">
                    <Spinner color="primary" />
                  </div>
                ) : (
                  <div className="d-flex align-items-center w-100 ">
                    <span>{renderFilePreview(file.file)}</span>
                    <span className="w-100">{file.file.name}</span>
                  </div>
                )}
              </Col>
              <Col className="d-flex align-items-center justify-content-around">
                <Col>
                  <h5>{getFileSize(file.file.size)}</h5>
                </Col>
                <Col>
                  <h5>{renderFormattedListingDate(new Date(file.file.lastModified))}</h5>
                </Col>
                <Button
                  color="flat-danger"
                  className="btn-left-margin"
                  disabled={uploadingFiles.includes(file)}
                  onClick={() => {
                    handleRemoveFile(file);
                  }}
                >
                  {isIdentityFileLoading || uploadingFiles.includes(file) ? <Spinner size="sm" /> : 'Remove'}
                </Button>
              </Col>
            </div>
          </Row>
        ))}
      </Card>
    </div>
  );

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    // dispatch(setFormDocuments(files));
    dispatch(setFormDocuments(null));
    if (location?.pathname.includes('profile-edit')) {
      if (flexternBoolean && trumioTalent) {
        navigate(`/${userProfileEdit.talent}/availability-details`);
      } else if (flexternBoolean && !trumioTalent) {
        navigate(`/dashboard`);
      }
    } else if (flexternBoolean && trumioTalent) {
      navigate(`/${userProfileEdit.talent}/availability-details`);
    } else if (flexternBoolean && !trumioTalent) {
      navigate(`/dashboard`);
    }
  };

  const onBackClick = () => {
    dispatch(clearAllFormData());
    dispatch(setFormDocuments(null));
    if (location.pathname?.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/social-details`);
    } else {
      navigate(`/${userOnboarding.talent}/social-details`);
    }
  };
  const onSuccess = () => {
    dispatch(clearAllFormData());
    // dispatch(setFormDocuments(files));
    dispatch(setFormDocuments(null));
    // if (location?.pathname.includes('profile-edit')) {
    //   if (flexternBoolean && trumioTalent) {
    //     navigate(`/${userProfileEdit.talent}/availability-details`);
    //   } else if (flexternBoolean && !trumioTalent) {
    //     navigate(`/dashboard`);
    //   }
    // } else if (flexternBoolean && trumioTalent) {
    //   navigate(`/${userProfileEdit.talent}/availability-details`);
    // } else if (flexternBoolean && !trumioTalent) {
    //   navigate(`/dashboard`);
    // }
    navigate('/dashboard');
  };

  const onSubmit = (data) => {
    const { gender, country, startYear, graduationYear, institutionEmail, institution, degree } = data;

    const reqData = {
      additional_info: {
        gender,
        country: country?.value,
        educational_institute: {
          institute_email: institutionEmail,
          institute_email_verify: false,
          institution: institution?.value,
          degree: degree?.value || null,
          start_year: parseInt(startYear?.value, 10) || 0,
          grad_year: parseInt(graduationYear?.value, 10) || 0,
        },
        identity_verification: {
          file_name: files[0]?.file?.name,
          file_key: files[0]?.uploadData?.file_key,
          download_url: files[0]?.uploadData?.download_url,
          size: files[0]?.file?.size,
          created_at: files[0]?.file?.lastModified,
        },
      },
    };

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
  };

  const onGetUserDetailsSuccess = (res) => {
    if (res && res.additional_info) {
      if (res?.additional_info?.gender) {
        setValue(
          'gender',
          res?.additional_info?.gender,

          {
            shouldValidate: true,
          },
        );
      }

      if (res?.additional_info?.country_info) {
        setValue(
          'country',
          {
            label: res?.additional_info?.country_info?.name,
            value: res?.additional_info?.country_info?._id,
          },
          {
            shouldValidate: true,
          },
        );
      }

      if (res?.additional_info?.educational_institute) {
        if (res?.additional_info?.educational_institute?.institution_info) {
          setValue(
            'institution',
            {
              label: res?.additional_info?.educational_institute?.institution_info?.name,
              value: res?.additional_info?.educational_institute?.institution_info?._id,
            },
            {
              shouldValidate: true,
            },
          );
        }
        if (res?.additional_info?.educational_institute?.degree_info) {
          setValue(
            'degree',
            {
              label: res?.additional_info?.educational_institute?.degree_info?.name,
              value: res?.additional_info?.educational_institute?.degree_info?._id,
            },
            {
              shouldValidate: true,
            },
          );
        }
        if (res?.additional_info?.educational_institute?.institute_email) {
          setValue('institutionEmail', res?.additional_info?.educational_institute?.institute_email, {
            shouldValidate: true,
          });
        }
        if (res?.additional_info?.educational_institute?.start_year) {
          setValue(
            'startYear',
            {
              label: res?.additional_info?.educational_institute?.start_year.toString(),
              value: res?.additional_info?.educational_institute?.start_year,
            },
            {
              shouldValidate: true,
            },
          );
        }
        if (res?.additional_info?.educational_institute?.grad_year) {
          setValue(
            'graduationYear',
            {
              label: res?.additional_info?.educational_institute?.grad_year.toString(),
              value: res?.additional_info?.educational_institute?.grad_year,
            },
            {
              shouldValidate: true,
            },
          );
        }
      }

      if (res?.additional_info?.identity_verification) {
        const file = {
          id: uuidv4(),
          file: {
            name: res?.additional_info?.identity_verification?.file_name,
            size: res?.additional_info?.identity_verification?.size,
            lastModified: res?.additional_info?.identity_verification?.created_at,
          },
          uploadData: {
            upload_url: res?.additional_info?.identity_verification?.upload_url,
            file_key: res?.additional_info?.identity_verification?.file_key,
          },
          isUploaded: true,
        };
        setFiles([file]);
      }
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(onGetUserDetailsSuccess));
  }, []);

  return (
    <ProfileFormContainer className="w-100">
      {profileDetailsIsLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex gap-2">
            <Row className="w-75">
              <Col>
                <Card>
                  <CardHeader>
                    <h4 className="m-0 mt-1">Gender</h4>
                  </CardHeader>
                  <hr className="m-0 card-header-border" />
                  <CardBody>
                    <Row className="mt-0">
                      <h5 className="m-0">
                        How do you identify?
                        <span className="label-asterisk me-50">*</span>
                      </h5>
                      <Row className="custom-checkbox-border">
                        <Controller
                          control={control}
                          name="gender"
                          id="gender"
                          render={({ field }) => (
                            <div className="demo-inline-spacing">
                              <div
                                style={{ maxWidth: '350px' }}
                                className="form-check form-check-inline checkbox-custom-margin"
                              >
                                <Input
                                  type="radio"
                                  {...field}
                                  id="male"
                                  value="MALE"
                                  checked={field.value === 'MALE'}
                                />
                                <Label for="male" className="form-check-label">
                                  Male
                                </Label>
                              </div>
                              <div
                                style={{ maxWidth: '350px' }}
                                className="form-check form-check-inline checkbox-custom-margin"
                              >
                                <Input
                                  type="radio"
                                  {...field}
                                  id="female"
                                  value="FEMALE"
                                  checked={field.value === 'FEMALE'}
                                />
                                <Label htmlFor="female" className="form-check-label">
                                  Female
                                </Label>
                              </div>
                              <div
                                style={{ maxWidth: '350px' }}
                                className="form-check form-check-inline checkbox-custom-margin"
                              >
                                <Input
                                  type="radio"
                                  {...field}
                                  id="other"
                                  value="OTHER"
                                  checked={field.value === 'OTHER'}
                                />
                                <Label htmlFor="other" className="form-check-label">
                                  Prefer not to say
                                </Label>
                              </div>
                            </div>
                          )}
                        />
                        {errors.gender && <FormFeedback>{errors.gender.message}</FormFeedback>}
                      </Row>
                    </Row>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h4 className="m-0 mt-1">Location</h4>
                  </CardHeader>
                  <hr className="m-0 card-header-border" />
                  <CardBody>
                    <Row className="mb-1">
                      <Col sm="12" md="12" lg="6">
                        <Label className="form-label" for="country">
                          Country<span className="label-asterisk me-50">*</span>
                        </Label>
                        <Controller
                          id="country"
                          name="country"
                          control={control}
                          invalid={errors.country && true}
                          render={({ field }) => (
                            <AsyncPaginate
                              styles={customDropdownStyles}
                              loadOptions={loadCountriesOptions}
                              classNamePrefix="select"
                              placeholder="Select your country"
                              theme={selectThemeColors}
                              className={classNames('react-select', {
                                'is-invalid': errors && errors.country,
                              })}
                              {...field}
                            />
                          )}
                        />
                        {errors.country && <FormFeedback>{errors.country.label.message}</FormFeedback>}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h4 className="m-0 mt-1">Current Education</h4>
                    <CustomerSupportCTA
                      type={CUSTOMER_SUPPORT_TYPES.education}
                      handleCustomerSupport={handleCustomerSupport}
                    />
                  </CardHeader>
                  <hr className="m-0 card-header-border" />
                  <CardBody>
                    <Row className="mb-1 mt-2">
                      <Col sm="6" md="6" lg="3">
                        <Label className="form-label" for="graduationYear">
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
                        {errors.weekendStartTime && (
                          <FormFeedback>{errors.weekendStartTime.label.message}</FormFeedback>
                        )}
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
                      <Col sm="12" md="12" lg="6">
                        <Label className="form-label" for="institutionEmail">
                          Institution Email
                        </Label>
                        <Row className="d-flex align-items-center justify-content-center">
                          <Col>
                            <Controller
                              id="institutionEmail"
                              name="institutionEmail"
                              control={control}
                              render={({ field }) => (
                                <Input {...field} placeholder="Enter your institute email id
                                " invalid={errors.institutionEmail && true} />
                              )}
                            />
                            {errors.institutionEmail && <FormFeedback>{errors.institutionEmail.message}</FormFeedback>}
                          </Col>
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
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mb-1 mt-2">
                      <Col sm="12" md="12" lg="6">
                        <Label className="form-label" for="institution">
                          Institution<span className="label-asterisk me-50">*</span>
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
                              loadOptions={loadEducationInstitutionOptions}
                              reduceOptions={reduceGroupedOptions}
                              onChange={(selOption) => handleSelectChange(selOption, field)}
                              classNamePrefix="select"
                              placeholder="Enter your institution name"
                              theme={selectThemeColors}
                              formatGroupLabel={formatGroupLabel}
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
                          Degree<span className="label-asterisk me-50">*</span>
                        </Label>
                        <Controller
                          id="degree"
                          name="degree"
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
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h4 className="m-0 mt-1">Identity Verification</h4>
                  </CardHeader>
                  <hr className="m-0 card-header-border" />
                  <CardBody className="d-flex flex-column">
                    <div className="d-flex" style={{ padding: 20 }}>
                      <Col className="w-100 ">
                        <h5>
                          Please upload a valid government approved photo ID (like Aadhar Card, Institute ID, Passport)
                        </h5>

                        {files?.length === 0 && (
                          <>
                            <Label
                              for="photoId"
                              className="me-2 mt-2  d-flex flex-col align-items-center upload-button cursor-pointer"
                            >
                              <h5
                                className="fw-bold"
                                style={{
                                  background: '#0065c1',
                                  color: 'white',
                                  paddingBlock: '12px',
                                  borderRadius: '5px',
                                  paddingInline: '16px',
                                }}
                              >
                                Upload ID
                              </h5>
                            </Label>
                            <Controller
                              id="photoId"
                              name="photoId"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  ref={filesRef}
                                  id="photoId"
                                  type="file"
                                  max={1}
                                  accept="application/pdf"
                                  style={{ display: 'none' }}
                                  onChange={(e) => {
                                    handleFileChange(e);
                                  }}
                                />
                              )}
                            />
                          </>
                        )}
                      </Col>
                    </div>
                    <Row>{files && files.length > 0 && <div>{fileList()}</div>}</Row>
                  </CardBody>
                </Card>

                <div className="d-flex justify-content-between align-items-center pb-2 w-100">
                  <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
                    <UploadIconContainer>
                      <ChevronLeft size={18} color={theme.activeNavPillText} />
                    </UploadIconContainer>
                    <h5 className="fw-bold">Back</h5>
                  </div>
                  <div>
                    {flexternBoolean && trumioTalent ? (
                      <Button color="primary" outline className="me-2" onClick={onSkipClick}>
                        <span className="me-50">Skip</span>
                        <ChevronRight size={14} />
                      </Button>
                    ) : null}
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
            </Row>
            <Row className="w-25">
              <Col>
                <Card>
                  <CardHeader>
                    <h4 className="m-0 mt-1">Profile Completion</h4>
                    <CardText className="m-0 mt-1">
                      Make it easier for others to find you by completing your profile.
                    </CardText>
                    <h3 className="m-0 mt-1 mb-1">{overallPercentageCompletion}%</h3>
                    <Progress
                      value={overallPercentageCompletion}
                      style={{ height: '0.5rem' }}
                      className={`${giveProgressBarColorClassName(overallPercentageCompletion)} p-0 m-0 w-100`}
                    />
                  </CardHeader>

                  <CardBody>
                    <hr className="m-0 card-header-border" />

                    {isTrumioTalent && (
                      <div className="d-flex gap-1 mt-1">
                        <div className="custom-checkbox-wrapper">
                          <Input
                            type="checkbox"
                            id="customCheckbox"
                            className="custom-checkbox-input"
                            checked={isProjectReady}
                          />
                          <label htmlFor="customCheckbox" className="custom-checkbox-label" />
                        </div>
                        <div>
                          <CardText className="m-0">Client Projects Ready</CardText>
                          <b
                            className="text-primary cursor-pointer"
                            onClick={() =>
                              navigate(
                                returnCompleteProfileDetailsCta(userTypes.talent, profileCompletionProjectMissingValues)
                                  ?.path || '/marketplace',
                              )
                            }
                          >
                            {isProjectReady
                              ? 'Explore Projects'
                              : `${
                                  returnCompleteProfileDetailsCta(
                                    userTypes.talent,
                                    profileCompletionProjectMissingValues,
                                  )?.label
                                }`}{' '}
                            <ChevronRight size="1.2em" />
                          </b>
                        </div>
                      </div>
                    )}

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
                            className="text-primary cursor-pointer"
                            onClick={() =>
                              navigate(
                                returnCompleteProfileDetailsCta(
                                  userTypes.talent,
                                  profileCompletionFlexternMissingValues,
                                )?.path || '/dashboard',
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
          </div>
        </Form>
      )}

      {customerSupportModal && (
        <CustomerSupportModal
          onSuccess={onCustomerSupportSuccess}
          modal={customerSupportModal}
          toggleModal={() => setCustomerSupportModal(!customerSupportModal)}
          defaultSelected={defaultSelected}
        />
      )}
    </ProfileFormContainer>
  );
};

export default Additional;
