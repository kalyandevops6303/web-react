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
import {
  deleteIdentityFile,
  getUserDetails,
  saveCheckpointComplete,
  saveProfileDetails,
  saveFlexternProfileDetails,
} from '../../../redux/actions/talentOnboardingActions';
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
      file: {
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
  const boxShadowStyle = {
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.06) !important',
  };
  const fileList = () => (
    <div className="py-3 px-5 shadow-card rounded-[6px] mt-5">
      {files?.map((file, index) => (
        <Row
          key={file.id}
          className={classNames(
            'd-flex flex-column align-items-start',
            { 'mb-1': index !== files.length - 1 }
          )}
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
                  <span className="w-100 text-sm text-grey-heading font-medium">{file.file.name}</span>
                </div>
              )}
            </Col>
            <Col className="d-flex align-items-center">
              <Col>
                <h5 className="text-sm text-grey font-normal text-center">{getFileSize(file.file.size)}</h5>
              </Col>
              <Col>
                <h5 className="text-sm text-grey font-normal text-center">
                  {renderFormattedListingDate(new Date(file.file.lastModified))}
                </h5>
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
    </div>
  );

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    // dispatch(setFormDocuments(files));
    dispatch(setFormDocuments(null));
    navigate('/marketplace/all_listings');
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
    navigate('/marketplace/all_listings');
  };

  const onSubmit = (data) => {
    const { gender, country, startYear, graduationYear, institutionEmail, institution, degree } = data;

    const reqData = {
      additional_info: {
        gender,
        country: country?.value,
        identity_verification: {
          file_name: files[0]?.file?.name,
          file_key: files[0]?.uploadData?.file_key,
          download_url: files[0]?.uploadData?.download_url,
          size: files[0]?.file?.size,
          created_at: files[0]?.file?.lastModified,
        },
      },
    };

    dispatch(saveFlexternProfileDetails(removeEmptyKeys(reqData), onSuccess));
    dispatch(saveCheckpointComplete(() => {}));
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

      if (
        res?.additional_info?.identity_verification &&
        Object.keys(res.additional_info.identity_verification).length > 0
      ) {
        const file = {
          id: uuidv4(),
          file: {
            name: res.additional_info.identity_verification.file_name,
            size: res.additional_info.identity_verification.size,
            lastModified: res.additional_info.identity_verification.created_at,
          },
          uploadData: {
            upload_url: res.additional_info.identity_verification.upload_url,
            file_key: res.additional_info.identity_verification.file_key,
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
                    <h4 className="m-0 mt-1 text-lg font-medium">Gender</h4>
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
                    <h4 className="m-0 mt-1 text-lg font-medium">Location</h4>
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
                    <h4 className="m-0 mt-1 text-lg font-medium">Identity Verification (optional)</h4>
                  </CardHeader>
                  <hr className="m-0 card-header-border" />
                  <CardBody className="d-flex flex-column">
                    <div className="d-flex">
                      <Col className="w-100 ">
                        <h5 className="text-sm font-normal text-grey-500">
                          Please upload a valid government approved photo ID (like passport, PAN card, Institute ID,
                          Driver's License)
                        </h5>

                        {files?.length === 0 && (
                          <>
                            <Label for="photoId" className="mt-4  d-flex align-items-center  cursor-pointer">
                              <h5
                                className="font-bold  py-3"
                                style={{
                                  background: '#0065c1',
                                  color: 'white',
                                  borderRadius: '5px',
                                  paddingLeft: '48px',
                                  paddingRight: '48px',
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
                    {files && files.length > 0 && fileList()}
                  </CardBody>
                </Card>

                <div className="d-flex justify-content-between align-items-center pb-2 w-100">
                  <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
                    <UploadIconContainer>
                      <ChevronLeft size={18} color={theme.activeNavPillText} />
                    </UploadIconContainer>
                    <h5 className="fw-bold">Back</h5>
                  </div>
                  <div className="d-flex justify-content-end">
                    {/* {flexternBoolean && trumioTalent ? ( */}
                    <Button
                      color="primary"
                      outline
                      className="d-flex align-items-center justify-content-between me-2"
                      onClick={onSkipClick}
                    >
                      <span className="me-50">Skip</span>
                      <ChevronRight size={14} />
                    </Button>
                    {/* ) : null} */}
                    <Button
                      className="d-flex align-items-center justify-content-between"
                      color="primary"
                      type="submit"
                      disabled={!isValid || profileDetailsIsLoading}
                    >
                      {profileDetailsIsLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <span className="me-50">Save & Continue</span>
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
                    <h4 className="m-0 mt-1 text-lg font-medium">Profile Completion</h4>
                    <CardText className="m-0 mt-1 ">
                      Make it easier for others to find you by completing your profile.
                    </CardText>
                    <h3 className="m-0 mt-1 mb-1 text-lg font-semibold text-grey">{overallPercentageCompletion}%</h3>
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
                            className="text-primary cursor-pointer d-flex align-items-center"
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
