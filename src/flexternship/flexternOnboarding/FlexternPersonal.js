/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import * as yup from 'yup';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
  FormGroup,
  UncontrolledTooltip,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info, Loader } from 'react-feather';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { ProfileFormContainer, UploadIconContainer } from '../../views/Onboarding/style';
import theme from '../../configs/themeVariables';
import { getLanguages } from '../../redux/actions/staticActions';
import { languages, languagesLoading } from '../../redux/selectors/staticSelectors';
import {
  deleteResume,
  getResumeParsedDetails,
  getUserDetails,
  // saveProfileDetails,
  saveFlexternProfileDetails,
} from '../../redux/actions/talentOnboardingActions';
import {
  deleteResumeLoading,
  profileDetailsLoading,
  // resumeParsedDetails,
  resumeParsedDetailsLoading,
  resumeParsedDetails,
  userDetailsLoading,
  // userDetails,
} from '../../redux/selectors/talentOnboardingSelectors';
import { languagesService, talentRolesService, timezonesService } from '../../services/staticServices';
import {
  downloadFile,
  downloadUploadedFile,
  removeEmptyKeys,
  returnFilteredDropdownOptions,
  renderFilePreview,
  filteredFormSchema,
  isEmpty,
  giveProgressBarColorClassName,
  // renderFormattedListingDate,
  formatDateWithTime,
} from '../../utility/Utils';
import { maxFileSize, userOnboarding, userProfileEdit, userTypes } from '../../utility/constants/Constant';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { projectFileUploadToAzureService } from '../../services/createProjectServices';
import uuidv4 from '../../lib/uuidv4';
import { resumeUploadService } from '../../services/talentOnboardingServices';
import { getDownloadUrl } from '../../redux/actions/dashboardActions';
import { downloadUrlLoading, userData } from '../../redux/selectors/dashboardSelectors';
// import TextEditor from '../../views/CreateProject/TextEditor';
import { resumeParsedDetailsSuccess } from '../../redux/reducers/talentOnboarding';
import {
  formData,
  formDocuments,
  resumeDataUploadedForPersonal,
  resumeParsed,
} from '../../redux/selectors/formDataSelectors';
import {
  clearAllFormData,
  setFileKey,
  setFormData,
  setFormDocuments,
  setResumeDataUploadedForAdditional,
  setResumeDataUploadedForEducation,
  setResumeDataUploadedForPersonal,
  setResumeDataUploadedForSocial,
  setResumeParsed,
} from '../../redux/reducers/formData';
import { returnCompleteProfileDetailsCta } from '../../utility/constants/CompleteProfileDetailsCta';
import '../../App.css';
import UploadResumeModal from '../../views/modals/UploadResumeModal';

const FlexternPersonal = () => {
  const PersonalSchema = yup.object().shape({
    tagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    professionalIntroduction: yup
      .string()
      .max(500, 'Professional introduction must be 500 characters or less')
      .required('Professional introduction is required'),
    role: yup
      .object()
      .shape({
        label: yup.string().required('Role is required'),
        value: yup.string().required('Role is required'),
      })
      .required('Role is required'),
    workingTimeZone: yup
      .object()
      .shape({
        label: yup.string().required('Prefered working time zone is required'),
        value: yup.string().required('Prefered working time zone is required'),
      })
      .required('Prefered working time zone is required'),
    speakLanguages: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five languages can be added'),
    writeLanguages: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five languages can be added'),
  });
  const savedFormData = useSelector(formData);
  const savedFormDocuments = useSelector(formDocuments);
  const IsresumeParsed = useSelector(resumeParsed);
  const isResumeDataUploadedForPersonal = useSelector(resumeDataUploadedForPersonal);
  // const userData = useSelector(userDetails);
  const [parsedUploaded, setParsedUploaded] = useState(isResumeDataUploadedForPersonal || false);
  const {
    control,
    handleSubmit,
    // watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(PersonalSchema),
    defaultValues: {
      tagline: savedFormData?.tagline || '',
      professionalIntroduction: savedFormData?.professionalIntroduction || '',
      role: savedFormData?.role || null,
      resume: savedFormData?.resume || null,
      parseResume: IsresumeParsed || false,
      workingTimeZone: savedFormData?.workingTimeZone || null,
    },
  });

  const localFormData = useWatch({ control });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [parseResume, setParseResume] = useState(IsresumeParsed || false);
  const [talentRolesOptions, setTalentRolesOptions] = useState(null);
  const [workingTimeZonesOptions, setWorkingTimeZonesOptions] = useState([]);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [languagesOptions, setLanguagesOptions] = useState(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [files, setFiles] = useState(savedFormDocuments ?? []);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const resumeParsedLoading = useSelector(resumeParsedDetailsLoading);
  const parsedResumeData = useSelector(resumeParsedDetails);
  const languagesData = useSelector(languages);
  const languagesIsLoading = useSelector(languagesLoading);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);

  const profileCompletionFlextern = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed);
  const profileCompletionFlexternMissingValues = useSelector(
    (state) => state.auth?.profileCompletionFlextern?.values_missing,
  );
  const profileCompletionProject = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed);
  // const profileCompletionProjectMissingValues = useSelector(
  //   (state) => state.dashboard?.profilePercentage?.values_missing,
  // );

  const isFlexternReady = useSelector((state) => state.auth?.profileCompletionFlextern?.profile_completed) === 100;
  // const isProjectReady = useSelector((state) => state.dashboard?.profilePercentage?.profile_completed) === 100;
  const isFlextern = useSelector((state) => state.auth?.is_flextern);
  // const isTrumioTalent = useSelector((state) => state.auth?.trumio_talent);

  // const [flexternOrProjectModal, setFlexternOrProjectModal] = useState(false);
  const [overallPercentageCompletion, setOverallPercentageCompletion] = useState(0);

  const getOverallPercentageCompletion = () => {
    setOverallPercentageCompletion(profileCompletionFlextern);
  };

  useEffect(() => {
    getOverallPercentageCompletion();
  }, [profileCompletionFlextern, profileCompletionProject]);

  useEffect(() => {
    if (uploadingFiles && uploadingFiles?.length > 0) {
      setResumeModalOpen(false);
    }
  }, [uploadingFiles]);

  useEffect(() => {
    if (parseResume === false && resumeParsedLoading === false) {
      const allData = { ...savedFormData, ...localFormData };
      dispatch(setFormData(allData));
    }
  }, [localFormData, parseResume, resumeParsedLoading]);

  useEffect(() => {
    if (savedFormDocuments) {
      if (parseResume === false) {
        if (savedFormData) {
          const requiredFields = filteredFormSchema({
            savedData: savedFormData,
            formSchemaFields: PersonalSchema.fields,
          });
          reset(requiredFields);
          const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
          trigger(keysWithValues);
        }
      }
      setFiles(savedFormDocuments ?? []);
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
        dispatch(setResumeDataUploadedForPersonal(false));
        dispatch(setResumeDataUploadedForEducation(false));
        dispatch(setResumeDataUploadedForSocial(false));
        dispatch(setResumeDataUploadedForAdditional(false));
        setFiles([...filtered]);
        setParsedUploaded(false);
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
        'Content-File-Type': file.file.type,
      });
    } catch (error) {
      dispatch(resumeParsedDetailsSuccess(null));
      setParseResume(false);
      ShowToastMessage(ERROR, 'Something went wrong. Please try uploading again.');
    } finally {
      setUploadingFiles((prevFiles) => prevFiles.filter((f) => f.file !== file.file));
    }
  };

  const loadLanguagesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, languagesOptions),
      };
    }
    try {
      const response = await languagesService();

      const options = response?.data?.data?.map((language) => ({ label: language.name, value: language._id }));

      setLanguagesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const onGetUserResumeDetailsSuccess = (res) => {
    if (res) {
      if (res?.talent_info?.resume && 'file_name' in res?.talent_info?.resume) {
        const fileUrl = {
          file: {
            name: res?.talent_info?.resume?.file_name,
            size: res?.talent_info?.resume?.size,
          },
          uploadData: {
            file_key: res?.talent_info?.resume?.file_key,
          },
          isUploaded: true,
          lastModified: res?.talent_info?.resume?.created_at,
        };
        dispatch(
          setFileKey(
            savedFormDocuments != null
              ? savedFormDocuments[0]?.uploadData?.file_key
              : res?.talent_info?.resume?.file_key,
          ),
        );
        setValue(
          'resume',
          {
            file_name: fileUrl?.file?.name,
            file_key: fileUrl?.uploadData?.file_key,
          },
          { shouldValidate: true },
        );
        setFiles([fileUrl]);
        dispatch(setFormDocuments([fileUrl]));
      }
    }
  };

  const setResumeParsedDetails = async (res) => {
    const languageDetails = await loadLanguagesOptions();
    if (res) {
      if (res?.tagline && res?.tagline.length > 0) {
        setValue('tagline', res?.tagline, { shouldValidate: true });
      } else {
        setValue('tagline', savedFormData?.tagline ? savedFormData.tagline : userData?.talent_info?.tagline, {
          shouldValidate: true,
        });
      }
      if (res?.professional_introduction && res?.professional_introduction.length > 0) {
        setValue('professionalIntroduction', res?.professional_introduction, { shouldValidate: true });
      } else {
        setValue(
          'professionalIntroduction',
          savedFormData?.professionalIntroduction || userData?.talent_info?.professional_intro,
          {
            shouldValidate: true,
          },
        );
      }
      if (res?.role && Object.keys(res?.role).length > 0) {
        setValue(
          'role',
          {
            label: res?.role?.name,
            value: res?.role?._id,
          },
          { shouldValidate: true },
        );
      } else if (userData?.talent_info?.role && Object.keys(userData?.talent_info?.role).length > 0) {
        setValue(
          'role',
          {
            label: userData?.talent_info?.role?.name,
            value: userData?.talent_info?.role?._id,
          },
          { shouldValidate: true },
        );
      }
      if (userData?.availability?.timezone) {
        if ('name' in userData?.availability?.timezone) {
          setValue(
            'workingTimeZone',
            {
              label: savedFormData?.workingTimeZone?.label
                ? `${savedFormData?.workingTimeZone?.label}`
                : `${userData?.availability?.timezone?.name} (${userData?.availability?.timezone?.abbreviation})`,
              value: savedFormData?.workingTimeZone?.value
                ? savedFormData?.workingTimeZone?.value
                : userData?.availability?.timezone?._id,
            },
            { shouldValidate: true },
          );
        }
      }
      if (res?.languages_speak && res?.languages_speak.length > 0) {
        setValue(
          'speakLanguages',
          res.languages_speak?.map((language) => ({
            label: language?.name || languageDetails?.options?.filter((lang) => lang.value === language._id)[0]?.label,
            value: language?._id,
          })),
          { shouldValidate: true },
        );
      } else {
        setValue(
          'speakLanguages',
          [
            {
              label: 'English',
              value: '64831445a51384fb6948e678',
            },
          ],
          { shouldValidate: true },
        );
      }
      if (res?.languages_write && res?.languages_write.length > 0) {
        setValue(
          'writeLanguages',
          res.languages_write?.map((language) => ({
            label: language?.name || languageDetails?.options?.filter((lang) => lang.value === language._id)[0]?.label,
            value: language?._id,
          })),
          { shouldValidate: true },
        );
      } else {
        setValue(
          'writeLanguages',
          [
            {
              label: 'English',
              value: '64831445a51384fb6948e678',
            },
          ],
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
    dispatch(
      setFormDocuments([
        {
          id: fileWithUrl?.id,
          file: {
            name: file?.name,
            size: file?.size,
          },
          uploadData: fileWithUrl?.uploadData,
          lastModified: fileWithUrl?.lastModified,
          isUploaded: fileWithUrl?.isUploaded,
        },
      ]),
    );
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

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location?.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/account-details`);
    } else {
      navigate(`/${userOnboarding.talent}/account-details`);
    }
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    dispatch(setFormDocuments(null));
    if (location?.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/educational-details`);
    } else {
      navigate(`/${userOnboarding.talent}/educational-details`);
    }
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    // dispatch(setFormDocuments(files));
    dispatch(setFormDocuments(null));
    if (location?.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/educational-details`);
    } else {
      dispatch(getUserDetails(() => {}));
      navigate(`/${userOnboarding.talent}/educational-details`);
    }
    dispatch(setResumeDataUploadedForPersonal(parseResume));
  };

  const onSubmit = (data) => {
    const { tagline, professionalIntroduction, role, speakLanguages, writeLanguages, workingTimeZone } = data;

    const professional_intro = professionalIntroduction;
    const languages_speak = speakLanguages?.map((language) => language.value);
    const languages_write = writeLanguages?.map((language) => language.value);

    const reqData = {
      tagline,
      professional_intro,
      role: role.value,
      languages_speak,
      languages_write,
      availability: {
        timezone: workingTimeZone.value,
      },
      resume: !isEmpty(files)
        ? {
            file_name: files[0]?.file?.name || '',
            file_key: files[0]?.uploadData?.file_key || '',
          }
        : {},
    };

    dispatch(saveFlexternProfileDetails(removeEmptyKeys(reqData), onSuccess));
    // if (IsresumeParsed) {
    //   const languagesWritten = watch('writeLanguages')?.map((language) => ({
    //     name: language.label,
    //     _id: language.value,
    //   }));
    //   const languagesSpoken = watch('speakLanguages')?.map((language) => ({
    //     name: language.label,
    //     _id: language.value,
    //   }));
    //   const resumeUpdatedData = {
    //     target_info: {
    //       ...parsedResumeData,
    //       languages_speak: languagesSpoken,
    //       languages_write: languagesWritten,
    //       tagline,
    //       professional_introduction: professionalIntroduction,
    //     },
    //   };

    //   dispatch(updateParsedResumeService(parsedResumeData?._id, resumeUpdatedData));
    // }
  };

  const loadTalentRolesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, talentRolesOptions),
      };
    }
    try {
      const response = await talentRolesService();

      const options = response?.data?.map((role) => ({ label: role.name, value: role._id }));

      setTalentRolesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };
  const loadPreferedWorkingTimezoneOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, workingTimeZonesOptions),
      };
    }
    try {
      const response = await timezonesService();
      const options = response?.data?.data?.map((timezone) => ({
        label: `${timezone.name} (${timezone.abbreviation})`,
        value: timezone._id,
      }));

      setWorkingTimeZonesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      if (res?.talent_info?.tagline.length > 0) {
        setValue('tagline', savedFormData?.tagline || res?.talent_info?.tagline, {
          shouldValidate: true,
        });
      }
      if (res?.talent_info?.professional_intro.length > 0) {
        setValue(
          'professionalIntroduction',
          savedFormData?.professionalIntroduction || res?.talent_info?.professional_intro,
          { shouldValidate: true },
        );
      }
      if ('name' in res?.talent_info?.role) {
        setValue(
          'role',
          {
            label: savedFormData?.role?.label || res?.talent_info?.role?.name,
            value: savedFormData?.role?.value || res?.talent_info?.role?._id,
          },
          { shouldValidate: true },
        );
      }
      if (res?.availability?.timezone) {
        if ('name' in res?.availability?.timezone) {
          setValue(
            'workingTimeZone',
            {
              label: savedFormData?.workingTimeZone?.label
                ? `${savedFormData?.workingTimeZone?.label}`
                : `${res?.availability?.timezone?.name} (${res?.availability?.timezone?.abbreviation})`,
              value: savedFormData?.workingTimeZone?.value
                ? savedFormData?.workingTimeZone?.value
                : res?.availability?.timezone?._id,
            },
            { shouldValidate: true },
          );
        }
      }
      if (res?.talent_info?.resume && 'file_name' in res?.talent_info?.resume) {
        const fileUrl = {
          file: {
            name: res?.talent_info?.resume?.file_name,
            size: res?.talent_info?.resume?.size,
          },
          uploadData: {
            file_key: res?.talent_info?.resume?.file_key,
          },
          isUploaded: true,
          lastModified: res?.talent_info?.resume?.created_at,
        };
        dispatch(setFileKey(res?.talent_info?.resume?.file_key));
        setValue(
          'resume',
          {
            file_name: fileUrl?.file?.name,
            file_key: fileUrl?.uploadData?.file_key,
          },
          { shouldValidate: true },
        );
        setFiles([fileUrl]);
        dispatch(setFormDocuments([fileUrl]));
      } else {
        setResumeModalOpen(true);
      }
      if (res?.talent_info?.languages_speak.length > 0) {
        setValue(
          'speakLanguages',
          res?.talent_info?.languages_speak?.map((language) => ({
            label: language.name,
            value: language._id,
          })),
          { shouldValidate: true },
        );
      } else {
        setValue(
          'speakLanguages',
          languagesData?.map((language) => ({
            label: language.name,
            value: language._id,
          })),
          { shouldValidate: true },
        );
      }
      if (res?.talent_info?.languages_write.length > 0) {
        setValue(
          'writeLanguages',
          res?.talent_info?.languages_write?.map((language) => ({
            label: language.name,
            value: language._id,
          })),
          { shouldValidate: true },
        );
      } else {
        setValue(
          'writeLanguages',
          languagesData?.map((language) => ({
            label: language.name,
            value: language._id,
          })),
          { shouldValidate: true },
        );
      }
    }
  };

  useEffect(() => {
    if (!IsresumeParsed && languagesData?.length > 0) {
      setValue(
        'speakLanguages',
        languagesData?.map((language) => ({
          label: language.name,
          value: language._id,
        })),
        { shouldValidate: true },
      );
      setValue(
        'writeLanguages',
        languagesData?.map((language) => ({
          label: language.name,
          value: language._id,
        })),
        { shouldValidate: true },
      );
    }
  }, [languagesData, IsresumeParsed]);

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
        dispatch(getUserDetails(onGetUserResumeDetailsSuccess));
      } else if (!parsedUploaded && parsedResumeData === null) {
        dispatch(
          getResumeParsedDetails(
            setResumeParsedDetails,
            setParseResume,
            savedFormDocuments[0]?.uploadData?.file_key,
            setFiles,
            location?.state?.isResumeParsedUploaded || false,
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
        dispatch(getUserDetails(onGetUserResumeDetailsSuccess));
      }
    } else {
      dispatch(getUserDetails(onGetUserDetailsSuccess));
    }
    dispatch(getLanguages());
  }, [parseResume, parsedResumeData, parsedUploaded]);

  const handleParseResumeToggle = () => {
    setParsedUploaded(false);
    setParseResume(!parseResume);
    dispatch(setResumeParsed(!parseResume));
  };

  return (
    <ProfileFormContainer>
      {userDetailsIsLoading && languagesIsLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100">
            <Col className="w-70" xs="12" sm="12" lg="8">
              <Card>
                <CardHeader>
                  <h4 className="m-0 mt-1 text-lg font-medium">About</h4>
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <div className="d-flex">
                        <Label className="form-label" for="tagline">
                          Tagline<span className="label-asterisk me-50">*</span>
                        </Label>
                        <Info size={18} color={theme.infoIcon} id="tagline-info" />
                        <UncontrolledTooltip placement="right" target="tagline-info">
                          <div className="d-flex flex-column align-items-start">Tagline is required !</div>
                        </UncontrolledTooltip>
                      </div>

                      <Controller
                        id="tagline"
                        name="tagline"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter your tagline in 60 character."
                            invalid={errors.tagline && true}
                          />
                        )}
                      />
                      {errors.tagline && <FormFeedback>{errors.tagline.message}</FormFeedback>}
                    </Col>
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="role">
                        Role<span className="label-asterisk">*</span>
                      </Label>
                      <Controller
                        id="role"
                        name="role"
                        control={control}
                        invalid={errors.role && true}
                        render={({ field }) => (
                          <AsyncPaginate
                            loadOptions={loadTalentRolesOptions}
                            classNamePrefix="select"
                            placeholder="Enter your role"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.role,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.role && <FormFeedback>{errors.role.label.message}</FormFeedback>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <div className="d-flex">
                        <Label className="form-label" for="professionalIntroduction">
                          Professional Introduction<span className="label-asterisk me-50">*</span>
                        </Label>
                        <Info size={18} color={theme.infoIcon} id="professional-info" />
                        <UncontrolledTooltip placement="right" target="professional-info">
                          <div className="d-flex flex-column align-items-start">
                            Professional Introduction is required !
                          </div>
                        </UncontrolledTooltip>
                      </div>
                      <Controller
                        id="professionalIntroduction"
                        name="professionalIntroduction"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="textarea"
                            invalid={errors.professionalIntroduction && true}
                            placeholder="Share a summary of your interests and skills (minimum 200 char)"
                          />
                        )}
                      />
                      {errors.professionalIntroduction && (
                        <FormFeedback>{errors.professionalIntroduction.message}</FormFeedback>
                      )}
                    </Col>
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="role">
                        Preferred Time Zone<span className="label-asterisk">*</span>
                      </Label>
                      <Controller
                        id="role"
                        name="workingTimeZone"
                        control={control}
                        invalid={errors.workingTimeZone && true}
                        render={({ field }) => (
                          <AsyncPaginate
                            loadOptions={loadPreferedWorkingTimezoneOptions}
                            classNamePrefix="select"
                            placeholder="Select preferred time zone"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.workingTimeZone,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.workingTimeZone && <FormFeedback>{errors.workingTimeZone.labe?.message}</FormFeedback>}
                    </Col>
                  </Row>
                  <Row className="mb-1 mt-3">
                    <h5 className="m-0 text-lg font-medium">Languages</h5>
                  </Row>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="speakLanguages">
                        Language - I can speak well <span className="italic"> (Top 5) </span>
                      </Label>
                      <Controller
                        id="speakLanguages"
                        name="speakLanguages"
                        control={control}
                        invalid={errors.speakLanguages && true}
                        render={({ field }) => (
                          <AsyncPaginate
                            // isDisabled
                            isMulti
                            loadOptions={loadLanguagesOptions}
                            classNamePrefix="select"
                            placeholder="Select top 5 language you can speak"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.speakLanguages,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.speakLanguages && <FormFeedback>{errors.speakLanguages.message}</FormFeedback>}
                    </Col>

                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="writeLanguages">
                        Language - I can write well <span className="italic"> (Top 5) </span>
                      </Label>
                      <Controller
                        id="writeLanguages"
                        name="writeLanguages"
                        control={control}
                        invalid={errors.writeLanguages && true}
                        render={({ field }) => (
                          <AsyncPaginate
                            // isDisabled
                            isMulti
                            loadOptions={loadLanguagesOptions}
                            classNamePrefix="select"
                            placeholder="Select top 5 language you can write"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.writeLanguages,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.writeLanguages && <FormFeedback>{errors.writeLanguages.message}</FormFeedback>}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <div className="d-flex justify-content-between align-items-center pb-2 mt-1">
                <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
                  <UploadIconContainer>
                    <ChevronLeft size={18} color={theme.activeNavPillText} />
                  </UploadIconContainer>
                  <h5 className="fw-bold">Back</h5>
                </div>
                <div className="d-flex justify-content-end">
                  {location?.pathname.includes('profile-edit') && (
                    <Button
                      color="primary"
                      outline
                      className="d-flex align-items-center justify-content-between me-2"
                      onClick={onSkipClick}
                    >
                      <span className="me-50">Skip</span>
                      <ChevronRight size={14} />
                    </Button>
                  )}
                  <Button
                    color="primary"
                    type="submit"
                    className="d-flex align-items-center justify-content-between"
                    disabled={!isValid || profileDetailsIsLoading}
                  >
                    {profileDetailsIsLoading ? <Spinner size="sm" /> : <span className="me-50">Save & Continue</span>}
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
                        // background: parseResume ? '#0185E426' : theme.greyedOutBackground,
                        background: '#0185E426',
                        // padding: files.length === 0 ? '12px 20px 12px 20px' : '16px',
                        padding: '16px',
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
                            <Col lg="10" style={{ color: '#004280' }} className="font-semibold mr-2">
                              {files &&
                                files?.length > 0 &&
                                (resumeParsedLoading ? 'Auto filling your profile...' : 'Auto Fill Profile')}
                              {files && files.length === 0 && (
                                <span className="font-normal">
                                  <span className="font-semibold">Go Faster</span> - Upload your resume to auto fill
                                  your profile.<span className="label-asterisk me-50">*</span>
                                </span>
                              )}
                            </Col>

                            {resumeParsedLoading ? (
                              <Loader size="xs" color="#0185E4" className="rotating-icon" />
                            ) : (
                              !uploadingFiles.includes(files[0]) &&
                              !isEmpty(files) && (
                                <FormGroup switch className="p-0">
                                  <Input type="switch" checked={parseResume} onClick={handleParseResumeToggle} />
                                </FormGroup>
                              )
                            )}
                          </div>
                          {files?.length === 0 && (
                            <div className=" px-0 py-0">
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
                  {isFlextern && !isFlexternReady && (
                    <div className="d-flex gap-1 mt-1 justify-content-center">
                      <div>
                        <CardText className="m-0">
                          <a
                            href="#"
                            className="text-primary cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(
                                returnCompleteProfileDetailsCta(
                                  userTypes.talent,
                                  profileCompletionFlexternMissingValues,
                                )?.path || '/dashboard',
                              );
                            }}
                          >
                            Add More
                          </a>
                        </CardText>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
      {resumeModalOpen && (
        <UploadResumeModal
          modal={resumeModalOpen}
          toggleModal={() => setResumeModalOpen(false)}
          uploadButton={
            <div className="d-flex justify-content-center mt-1 align-items-center">
              <Label for="resume" className="d-flex flex-col align-items-center upload-button cursor-pointer">
                <h5
                  style={{
                    background: '#0065c1',
                    color: 'white',
                    paddingBlock: '12px',
                    borderRadius: '5px',
                    paddingInline: '16px',
                  }}
                  className="fw-bold"
                >
                  Upload Resume
                </h5>
              </Label>
            </div>
          }
        />
      )}
    </ProfileFormContainer>
  );
};

export default FlexternPersonal;
