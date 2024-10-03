import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap';
import { AsyncPaginate, reduceGroupedOptions } from 'react-select-async-paginate';
import * as yup from 'yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { ChevronRight, Upload } from 'react-feather';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import {
  downloadFile,
  downloadUploadedFile,
  getFileSize,
  isFileValid,
  removeEmptyKeys,
  renderFilePreview,
  renderFormattedListingDate,
  returnFilteredDropdownOptions,
  selectThemeColors,
} from '../../../utility/Utils';
import { countriesService, educationsService, paginatedInstitutesService } from '../../../services/staticServices';
import CustomerSupportCTA from '../CustomerSupportCTA';
import { CUSTOMER_SUPPORT_TYPES, studyYears, userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import CustomerSupportModal from '../../modals/CustomerSupportModal';
import { getCustomerSupportCount } from '../../../redux/actions/supportActions';
import theme from '../../../configs/themeVariables';
import { downloadUrlLoading, userData } from '../../../redux/selectors/dashboardSelectors';
import { GroupLabelWrapper } from '../../createClub/style';
import { profileDetailsLoading } from '../../../redux/selectors/talentOnboardingSelectors';
import { clearAllFormData, setFileKey, setFormDocuments } from '../../../redux/reducers/formData';
import { resumeUploadService } from '../../../services/talentOnboardingServices';
import uuidv4 from '../../../lib/uuidv4';
import { projectFileUploadToAzureService } from '../../../services/createProjectServices';
import { resumeParsedDetailsSuccess } from '../../../redux/reducers/talentOnboarding';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { getDownloadUrl } from '../../../redux/actions/dashboardActions';
import EmailVerifyModal from '../../createClub/EmailVerifyModal';
import { saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';
import { useLocation, useNavigate } from 'react-router-dom';

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
    institutionEmail: yup.string().email('Must be a valid email').required('Institution email is required'),
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

  const {
    control,
    handleSubmit,
    watch,
    unregister,
    register,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(AdditionalInformationSchema),
    defaultValues: {
      gender: '', // For radio buttons, use empty string or the default selected value.
      country: null, // Assuming `AsyncPaginate` expects null or an object.
      startYear: null, // Assuming you're using `Select`, initialize as null or the appropriate year value.
      graduationYear: null, // Same as `startYear`.
      institutionEmail: '', // Initialize with an empty string for input fields.
      institution: null, // For `AsyncPaginate` or select fields.
      education: null, // For degree selection.
    },
  });

  const localFormData = useWatch({ control });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('localFormData', localFormData);
    console.log(isValid);
  }, [localFormData]);

  const [countriesOptions, setCountriesOptions] = useState([]);
  const [educationsOptions, setEducationsOptions] = useState([]);
  const [customerSupportModal, setCustomerSupportModal] = useState(false);
  const [feedbackSupportModal, setFeedbackSupportModal] = useState(false);
  const [defaultSelected, setDefaultSelected] = useState(null);
  const [emailVerifyModal, setEmailVerifyModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const filesRef = useRef();

  const userDetailsData = useSelector(userData);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
  const handleCustomerSupport = (value) => {
    setCustomerSupportModal(true);
    setDefaultSelected(value);
  };


  const onCustomerSupportSuccess = () => {
    setCustomerSupportModal(false);
    setFeedbackSupportModal(true);
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
    const response = await resumeUploadService(file.name);
    const fileWithUrl = {
      id: uuidv4(),
      file,
      uploadData: response?.data?.data,
      isUploaded: false,
    };
    dispatch(setFormDocuments([fileWithUrl]));
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
      const myInstitution = userDetailsData?.talent_info?.educational_institute
        .map((educationDetails) => educationDetails.institution)
        .map((institute) => ({ label: institute.name, value: institute._id }));

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
    // await dispatch(
    //   deleteResume(() => {
    //     const filtered = uploadedFiles.filter((i) => i.id !== file.id);
    //     dispatch(setFormDocuments(null));
    //     setFiles([...filtered]);
    //   }),
    // );
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
                  <h5>{renderFormattedListingDate(file.file.lastModifiedDate)}</h5>
                </Col>
                <Button
                  color="flat-danger"
                  className="btn-left-margin"
                  disabled={uploadingFiles.includes(file)}
                  onClick={() => {
                    handleRemoveFile(file);
                  }}
                >
                  {uploadingFiles.includes(file) ? <Spinner size="sm" /> : 'Remove'}
                </Button>
              </Col>
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

  const onSuccess = () => {
    dispatch(clearAllFormData());
    dispatch(setFormDocuments(files));
    if (location?.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/additional-details`);
    } else {
      navigate(`/${userOnboarding.talent}/additional-details`);
    }
  };

  const onSubmit = (data) => {
    const {
      gender,
      country,
      startYear,
      graduationYear,
      institutionEmail, // adjust naming
      institution,
      degree,
    } = data;
  
    const StartYear = parseInt(startYear, 10) || 0;
    const GraduationYear = parseInt(graduationYear, 10) || 0;
  
    // Update the field names to match what the API expects
    const reqData = {
      "additional_info": {
        "user_id": "64e373744556ff69c1e31be5",
        "gender": "MALE",
        "country": "6479c2071183add75cda4d72",
        "educational_institute": {
          "institute_email": "soumyarajbag@gmail.com",
          "institute_email_verify": false,
          "institution": "659d259d877a3bbe74e985b5",
          "degree": "64830f8cb03b9ecd069097d2",
          "start_year": 2020,
          "grad_year": 2024
        }
      }
    }
    
  
    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
  };
  

  return (
    <ProfileFormContainer className="w-75">
      <Form onSubmit={handleSubmit(onSubmit)}>
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
                    <div style={{ maxWidth: '350px' }} className="form-check form-check-inline checkbox-custom-margin">
                      <Input type="radio" {...field} id="male" value="MALE" checked={field.value === 'MALE'} />
                      <Label for="male" className="form-check-label">
                        Male
                      </Label>
                    </div>
                    <div style={{ maxWidth: '350px' }} className="form-check form-check-inline checkbox-custom-margin">
                      <Input type="radio" {...field} id="female" value="FEMALE" checked={field.value === 'FEMALE'} />
                      <Label htmlFor="female" className="form-check-label">
                        Female
                      </Label>
                    </div>
                    <div style={{ maxWidth: '350px' }} className="form-check form-check-inline checkbox-custom-margin">
                      <Input type="radio" {...field} id="other" value="OTHER" checked={field.value === 'OTHER'} />
                      <Label htmlFor="other" className="form-check-label">
                        Prefer not to say
                      </Label>
                    </div>
                  </div>
                )}
              />
              {errors.isWebpage && <FormFeedback>{errors.isWebpage.message}</FormFeedback>}
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
          <CustomerSupportCTA type={CUSTOMER_SUPPORT_TYPES.education} handleCustomerSupport={handleCustomerSupport} />
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <Row className="mb-1 mt-2">
            <Col sm="6" md="6" lg="2">
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
              {errors.weekendStartTime && <FormFeedback>{errors.weekendStartTime.label.message}</FormFeedback>}
            </Col>
            <Col sm="6" md="6" lg="2">
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
                      watch('graduationYear')
                        ? studyYears?.filter((t) => parseInt(t?.value, 10) > parseInt(watch('startYear')?.value, 10))
                        : studyYears
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
            <Col sm="12" md="12" lg="8">
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
                      <Input {...field} placeholder="Enter URL" invalid={errors.institutionEmail && true} />
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
        <CardBody>
          <div className="d-flex flex-column">
            <div className="d-flex" style={{ padding: 20 }}>
              <Col lg="fit">{/* <Info className="font-medium-3 me-50" color="#004280" /> */}</Col>

              <Col className="w-100 ">
                <h5>Please upload a valid government approved photo ID (like Aadhar Card, Institute ID, Passport)</h5>

                {files?.length === 0 && (
                  <>
                    <Label
                      for="photoId"
                      className="me-2 mt-2  d-flex flex-col align-items-center upload-button cursor-pointer"
                    >
                      <h5 className="fw-bold">Upload ID</h5>
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
          </div>
        </CardBody>
      </Card>

      <div className="d-flex justify-content-end align-items-center pb-2 mt-1">
        <Button color="primary" type="submit" disabled={ profileDetailsIsLoading}>
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
      </Form>

      {customerSupportModal && (
        <CustomerSupportModal
          onSuccess={onCustomerSupportSuccess}
          modal={customerSupportModal}
          toggleModal={toggleSupportModal}
          defaultSelected={defaultSelected}
        />
      )}
    </ProfileFormContainer>
  );
};

export default Additional;
