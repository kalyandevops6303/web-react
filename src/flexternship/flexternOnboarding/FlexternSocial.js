import React, { useEffect, useState } from 'react';
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
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
  Progress,
  CardText,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info, Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileFormContainer, UploadIconContainer } from '../../views/Onboarding/style';
import theme from '../../configs/themeVariables';
import {
  deleteResume,
  getResumeParsedDetails,
  getUserDetails,
  saveProfileDetails,
  saveFlexternProfileDetails,
} from '../../redux/actions/talentOnboardingActions';
import {
  deleteResumeLoading,
  profileDetailsLoading,
  resumeParsedDetails,
  resumeParsedDetailsLoading,
  userDetails,
  userDetailsLoading,
} from '../../redux/selectors/talentOnboardingSelectors';
import AccountCreatedModal from '../../views/Onboarding/AccountCreatedModal';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import {
  filteredFormSchema,
  formatUrl,
  isEmpty,
  isUrlWithoutProtocol,
  removeEmptyKeys,
  giveProgressBarColorClassName,
  formatDateWithTime,
  downloadFile,
  downloadUploadedFile,
  renderFilePreview,
} from '../../utility/Utils';
import { maxFileSize, userOnboarding, userProfileEdit, userTypes } from '../../utility/constants/Constant';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import {
  fileKey,
  formData,
  formDocuments,
  resumeDataUploadedForSocial,
  resumeParsed,
  resumeDataUploadedForPersonal,
  resumeDataUploadedForEducation,
} from '../../redux/selectors/formDataSelectors';
import {
  clearAllFormData,
  setFileKey,
  setFormData,
  setFormDocuments,
  setResumeDataUploadedForSocial,
  setResumeDataUploadedForEducation,
  setResumeDataUploadedForPersonal,
  setResumeParsed,
  setResumeDataUploadedForAdditional,
} from '../../redux/reducers/formData';
import { resumeParsedDetailsSuccess } from '../../redux/reducers/talentOnboarding';
import { updateParsedResumeService, resumeUploadService } from '../../services/talentOnboardingServices';
import { selectFlexternBoolean, selectTrumioTalent } from '../../redux/selectors/authSelectors';

import { returnCompleteProfileDetailsCta } from '../../utility/constants/CompleteProfileDetailsCta';
import '../../App.css';
import { downloadUrlLoading, userData } from '@/redux/selectors/dashboardSelectors';
import { projectFileUploadToAzureService } from '../../services/createProjectServices';
import uuidv4 from '../../lib/uuidv4';

const FlexternSocial = () => {
  const SocialSchema = yup.object().shape({
    linkedInLink: yup
      .string()
      .test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol)
      .nullable()
      .required('LinkedIn is required'),
    twitterLink: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
    githubLink: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
    otherSocialLinks: yup.array().of(
      yup.object().shape({
        linkName: yup.string().nullable(),
        link: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
      }),
    ),
    resume: yup
      .object()
      .shape({
        file_name: yup.string().required('Resume is required'),
        file_key: yup.string().required('Resume is required'),
      })
      .required('Resume is required'),
  });

  const savedFormData = useSelector(formData);
  const trumioTalentBoolean = useSelector(selectTrumioTalent);
  const flexternBoolean = useSelector(selectFlexternBoolean);
  const fileKeyDetails = useSelector(fileKey);
  const savedFormDocuments = useSelector(formDocuments);
  const parsedResumeData = useSelector(resumeParsedDetails);
  const IsresumeParsed = useSelector(resumeParsed);
  const isResumeDataUploadedForSocial = useSelector(resumeDataUploadedForSocial);
  const isResumeDataUploadedForEducation = useSelector(resumeDataUploadedForEducation);
  const isResumeDataUploadedForPersonal = useSelector(resumeDataUploadedForPersonal);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
  const [parsedUploaded, setParsedUploaded] = useState(isResumeDataUploadedForSocial || false);
  const resumeParsedLoading = useSelector(resumeParsedDetailsLoading);
  const [parseResume, setParseResume] = useState(IsresumeParsed || false);
  const [files, setFiles] = useState(savedFormDocuments || []);
  const defaultLink = {
    linkName: '',
    link: '',
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SocialSchema),
    defaultValues: {
      linkedInLink: savedFormData?.linkedInLink || '',
      twitterLink: savedFormData?.twitterLink || '',
      githubLink: savedFormData?.githubLink || '',
      otherSocialLinks: savedFormData?.otherSocialLinks || [defaultLink],
      resume: savedFormData?.resume || null,
    },
  });

  const {
    fields: otherSocialLinksFields,
    append: otherSocialLinksAppend,
    remove,
  } = useFieldArray({
    control,
    name: 'otherSocialLinks',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const localFormData = useWatch({ control });

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
  const userData = useSelector(userDetails);
  const isFlextern = useSelector((state) => state.auth?.is_flextern);
  const isTrumioTalent = useSelector((state) => state.auth?.trumio_talent);

  const [flexternOrProjectModal, setFlexternOrProjectModal] = useState(false);
  const [overallPercentageCompletion, setOverallPercentageCompletion] = useState(0);

  const getOverallPercentageCompletion = () => {
    setOverallPercentageCompletion(profileCompletionFlextern);
  };
  const handleParseResumeToggle = () => {
    setParsedUploaded(false);
    setParseResume(!parseResume);
    dispatch(setResumeParsed(!parseResume));
  };

  useEffect(() => {
    getOverallPercentageCompletion();
  }, [profileCompletionFlextern, profileCompletionProject]);

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
    if (!files || (files?.length > 0 && !files[0].file?.name)) {
      setFiles([]);
    }
  }, [files]);
  const isDeleteResumeLoading = useSelector(deleteResumeLoading);
  const handleRemoveFile = async (file) => {
    const uploadedFiles = files;
    dispatch(
      deleteResume(() => {
        const filtered = uploadedFiles.filter((i) => i.id !== file.id);
        dispatch(setFormDocuments(null));
        dispatch(setResumeDataUploadedForEducation(false));
        dispatch(setResumeDataUploadedForPersonal(false));
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
  useEffect(() => {
    if (parseResume === false) {
      if (savedFormData) {
        const requiredFields = filteredFormSchema({
          savedData: savedFormData,
          formSchemaFields: SocialSchema.fields,
        });
        reset(requiredFields);
        const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
        trigger(keysWithValues);
      }
    }
  }, [parseResume]);

  const [accountCreatedModal, setAccountCreatedModal] = useState(null);

  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  // const checkpointCompleteIsLoading = useSelector(checkpointCompleteLoading);

  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/educational-details`);
    } else {
      navigate(`/${userOnboarding.talent}/educational-details`);
    }
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/additional-details`);
    } else if (location.pathname.includes('onboarding')) {
      navigate(`/${userOnboarding.talent}/additional-details`);
    }
    dispatch(setResumeDataUploadedForSocial(parseResume));
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    // if (location.pathname.includes('profile-edit')) {
    //   if (flexternBoolean) navigate(`/${userProfileEdit.talent}/additional-details`);
    //   else if (trumioTalentBoolean) {
    //     navigate(`/${userProfileEdit.talent}/availability-details`);
    //   }
    // } else if (flexternBoolean) navigate(`/${userOnboarding.talent}/additional-details`);
    // else if (trumioTalentBoolean) {
    //   navigate(`/${userOnboarding.talent}/availability-details`);
    // }
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/additional-details`);
    } else if (location.pathname.includes('onboarding')) {
      navigate(`/${userOnboarding.talent}/additional-details`);
    }
  };

  const onSubmit = (data) => {
    const { linkedInLink, twitterLink, githubLink, otherSocialLinks } = data;

    const social_links = [
      {
        platform: 'linkedIn',
        url: formatUrl(linkedInLink),
      },
      {
        platform: 'twitter',
        url: formatUrl(twitterLink),
      },
      {
        platform: 'github',
        url: formatUrl(githubLink),
      },
      // eslint-disable-next-line
      ...otherSocialLinks?.map((link) => ({
        platform: link.linkName,
        url: formatUrl(link.link),
      })),
    ];

    const reqData = {
      social_links,
      resume: !isEmpty(files)
        ? {
            file_name: files[0]?.file?.name || '',
            file_key: files[0]?.uploadData?.file_key || '',
          }
        : {},
    };
    if (reqData) {
      dispatch(saveFlexternProfileDetails(removeEmptyKeys(reqData), onSuccess));
    }

    // if (IsresumeParsed) {
    //   const resumeUpdatedData = {
    //     target_info: {
    //       ...parsedResumeData,
    //       social_links,
    //     },
    //   };

    //   dispatch(updateParsedResumeService(parsedResumeData?._id, resumeUpdatedData));
    // }
  };

  const isValidURL = (url) => {
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)?$/i;
    return urlPattern.test(url);
  };

  const checkObjectValues = (arr) => {
    // eslint-disable-next-line
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      // eslint-disable-next-line
      if (!obj?.hasOwnProperty('link') || !obj?.hasOwnProperty('linkName')) {
        return false;
      }
      if (!obj.link || !obj.linkName) {
        return false;
      }
      if (!isValidURL(obj.link)) {
        return false;
      }
    }
    return true;
  };

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      if (res?.talent_info?.social_links.length > 0) {
        if (res?.talent_info?.social_links.find((link) => link.platform === 'linkedIn')) {
          setValue(
            'linkedInLink',
            savedFormData?.linkedInLink ||
              res?.talent_info?.social_links.find((link) => link.platform === 'linkedIn').url,
            {
              shouldValidate: true,
            },
          );
        } else {
          setValue('linkedInLink', savedFormData?.linkedInLink || '');
        }
        if (res?.talent_info?.social_links.find((link) => link.platform === 'twitter')) {
          setValue(
            'twitterLink',
            savedFormData?.twitterLink ||
              res?.talent_info?.social_links.find((link) => link.platform === 'twitter').url,
            {
              shouldValidate: true,
            },
          );
        } else {
          setValue('twitterLink', savedFormData?.twitterLink || '');
        }
        if (res?.talent_info?.social_links.find((link) => link.platform === 'github')) {
          setValue(
            'githubLink',
            savedFormData?.githubLink || res?.talent_info?.social_links.find((link) => link.platform === 'github').url,
            {
              shouldValidate: true,
            },
          );
        } else {
          setValue('githubLink', savedFormData?.githubLink || '');
        }
        if (
          res?.talent_info?.social_links.filter(
            (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
          ).length > 0
        ) {
          setValue(
            'otherSocialLinks',
            res?.talent_info?.social_links
              .filter(
                (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
              )
              .map((link) => ({
                linkName: link.platform,
                link: link.url,
              })),
            { shouldValidate: true },
          );
        } else {
          setValue('otherSocialLinks', savedFormData?.otherSocialLinks || [defaultLink]);
        }
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
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
          lastModified:
            savedFormDocuments != null
              ? savedFormDocuments[0]?.lastModified
                ? savedFormDocuments[0]?.lastModified
                : res?.talent_info?.resume?.created_at
              : res?.talent_info?.resume?.created_at,
        };
        setValue(
          'resume',
          {
            file_name: fileUrl?.file?.name,
            file_key: fileUrl?.uploadData?.file_key,
          },
          { shouldValidate: true },
        );
        setFiles([fileUrl]);
        dispatch(setFileKey(res?.talent_info?.resume?.file_key ?? savedFormDocuments[0]?.uploadData?.file_key));
        dispatch(setFormDocuments([fileUrl]));
      }
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
      }
    }
  };
  const setResumeParsedDetails = (res) => {
    if (res) {
      if (res?.social_links.length > 0) {
        if (res?.social_links.find((link) => link.platform === 'linkedIn' || link.platform === 'LinkedIn')) {
          setValue(
            'linkedInLink',
            res?.social_links.find((link) => link.platform === 'linkedIn' || link.platform === 'LinkedIn')?.url
              ?.length > 0
              ? res?.social_links.find((link) => link.platform === 'linkedIn' || link.platform === 'LinkedIn')?.url ||
                  savedFormData?.linkedInLink
              : userData?.talent_info?.social_links?.find(
                  (link) => link.platform === 'linkedIn' || link.platform === 'LinkedIn',
                )?.url,
            {
              shouldValidate: true,
            },
          );
        }
        if (res?.social_links.find((link) => link.platform === 'twitter' || link.platform === 'Twitter')) {
          setValue(
            'twitterLink',
            res?.social_links.find((link) => link.platform === 'twitter' || link.platform === 'Twitter')?.url?.length >
              0
              ? res?.social_links.find((link) => link.platform === 'twitter' || link.platform === 'Twitter')?.url ||
                  savedFormData?.twitterLink
              : userData?.talent_info?.social_links?.find(
                  (link) => link.platform === 'twitter' || link.platform === 'Twitter',
                )?.url,
            {
              shouldValidate: true,
            },
          );
        }

        if (res?.social_links.find((link) => link.platform === 'github' || link.platform === 'GitHub')) {
          setValue(
            'githubLink',
            res?.social_links.find((link) => link.platform === 'github' || link.platform === 'GitHub')?.url?.length > 0
              ? res?.social_links.find((link) => link.platform === 'github' || link.platform === 'GitHub')?.url ||
                  savedFormData?.githubLink
              : userData?.talent_info?.social_links?.find(
                  (link) => link.platform === 'github' || link.platform === 'GitHub',
                )?.url,
            {
              shouldValidate: true,
            },
          );
        }
        if (
          res?.talent_info?.social_links.filter(
            (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
          ).length > 0
        ) {
          setValue(
            'otherSocialLinks',
            res?.social_links
              .filter(
                (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
              )
              .map((link) => ({
                linkName: link.platform,
                link: link.url,
              })),
            { shouldValidate: true },
          );
        } else if (
          userData?.talent_info?.social_links.filter(
            (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
          ).length > 0
        ) {
          setValue(
            'otherSocialLinks',
            userData?.talent_info?.social_links
              .filter(
                (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
              )
              .map((link) => ({
                linkName: link.platform,
                link: link.url,
              })),
            { shouldValidate: true },
          );
        } else {
          setValue('otherSocialLinks', [defaultLink]);
        }
      } else {
        if (userData?.talent_info?.social_links?.find((link) => link.platform === 'linkedIn')) {
          setValue(
            'linkedInLink',
            userData?.talent_info?.social_links?.find((link) => link.platform === 'linkedIn')?.url ||
              savedFormData?.linkedInLink,
            {
              shouldValidate: true,
            },
          );
        }
        if (userData?.talent_info?.social_links?.find((link) => link.platform === 'twitter')) {
          setValue(
            'twitterLink',
            userData?.talent_info?.social_links?.find((link) => link.platform === 'twitter')?.url ||
              savedFormData?.twitterLink,
            {
              shouldValidate: true,
            },
          );
        }
        if (userData?.talent_info?.social_links?.find((link) => link.platform === 'github')) {
          setValue(
            'githubLink',
            userData?.talent_info?.social_links?.find((link) => link.platform === 'github')?.url ||
              savedFormData?.githubLink,
            {
              shouldValidate: true,
            },
          );
        }
        if (
          userData?.talent_info?.social_links.filter(
            (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
          ).length > 0
        ) {
          setValue(
            'otherSocialLinks',
            userData?.talent_info?.social_links
              ?.filter(
                (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
              )
              .map((link) => ({
                linkName: link.platform,
                link: link.url,
              })),
            { shouldValidate: true },
          );
        }
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
    // dispatch(setFormDocuments([fileWithUrl]));
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
          </Row>
        ))}
      </Card>
    </div>
  );
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
        dispatch(getUserDetails(onGetUserResumeDetailsSuccess));
      }
    } else {
      dispatch(getUserDetails(onGetUserDetailsSuccess));
    }
  }, [parseResume, parsedResumeData, parsedUploaded]);

  return (
    <ProfileFormContainer>
      {accountCreatedModal && (
        <AccountCreatedModal modal={accountCreatedModal} toggleModal={toggleAccountCreatedModal} />
      )}
      {userDetailsIsLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100">
            <Col className="w-70" xs="12" sm="12" lg="8">
              <Card className="w-100">
                <CardHeader>
                  <h4 className="m-0 mt-1 text-lg font-medium">Social Links</h4>
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="linkedInLink">
                        LinkedIn<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        id="linkedInLink"
                        name="linkedInLink"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter your profile URL"
                            invalid={errors.linkedInLink && true}
                          />
                        )}
                      />
                      {errors.linkedInLink && <FormFeedback>{errors.linkedInLink.message}</FormFeedback>}
                    </Col>
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="twitterLink">
                        X (Formerly Twitter)
                      </Label>
                      <Controller
                        id="twitterLink"
                        name="twitterLink"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Enter X handle" invalid={errors.twitterLink && true} />
                        )}
                      />
                      {errors.twitterLink && <FormFeedback>{errors.twitterLink.message}</FormFeedback>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="githubLink">
                        Github
                      </Label>
                      <Controller
                        id="githubLink"
                        name="githubLink"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Enter Github handle" invalid={errors.githubLink && true} />
                        )}
                      />
                      {errors.githubLink && <FormFeedback>{errors.githubLink.message}</FormFeedback>}
                    </Col>
                  </Row>
                  <hr className="m-0 card-header-border mt-2" />
                  <h5 className="m-0 mt-2 mb-1 text-lg font-medium">Other Social Links</h5>
                  {otherSocialLinksFields?.map((item, index) => (
                    <Row key={item.id} className="mb-1">
                      <Col sm="12" md="12" lg="6">
                        <Label className="form-label" for={`otherSocialLinks[${index}].linkName`}>
                          Link Name
                        </Label>
                        <Controller
                          id={`otherSocialLinks[${index}].linkName`}
                          name={`otherSocialLinks[${index}].linkName`}
                          control={control}
                          invalid={
                            errors &&
                            errors.otherSocialLinks &&
                            errors.otherSocialLinks.length > 0 &&
                            errors.otherSocialLinks[index] &&
                            errors.otherSocialLinks[index].linkName &&
                            true
                          }
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Website"
                              invalid={
                                errors &&
                                errors.otherSocialLinks &&
                                errors.otherSocialLinks.length > 0 &&
                                errors.otherSocialLinks[index] &&
                                errors.otherSocialLinks[index].linkName &&
                                true
                              }
                            />
                          )}
                        />
                        {errors &&
                          errors.otherSocialLinks &&
                          errors.otherSocialLinks.length > 0 &&
                          errors.otherSocialLinks[index] &&
                          errors.otherSocialLinks[index] && (
                            <FormFeedback>
                              {errors.otherSocialLinks[index].linkName &&
                                errors.otherSocialLinks[index].linkName.message}
                            </FormFeedback>
                          )}
                      </Col>
                      <Col sm="12" md="12" lg="6">
                        <Label className="form-label" for={`otherSocialLinks[${index}].link`}>
                          Link
                        </Label>
                        <div className="d-flex gap-2">
                          <div className="flex-grow-1">
                            <Controller
                              id={`otherSocialLinks[${index}].link`}
                              name={`otherSocialLinks[${index}].link`}
                              control={control}
                              invalid={
                                errors &&
                                errors.otherSocialLinks &&
                                errors.otherSocialLinks.length > 0 &&
                                errors.otherSocialLinks[index] &&
                                errors.otherSocialLinks[index].link &&
                                true
                              }
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Enter link"
                                  invalid={
                                    errors &&
                                    errors.otherSocialLinks &&
                                    errors.otherSocialLinks.length > 0 &&
                                    errors.otherSocialLinks[index] &&
                                    errors.otherSocialLinks[index].link &&
                                    true
                                  }
                                />
                              )}
                            />
                            {errors &&
                              errors.otherSocialLinks &&
                              errors.otherSocialLinks.length > 0 &&
                              errors.otherSocialLinks[index] &&
                              errors.otherSocialLinks[index] && (
                                <FormFeedback>
                                  {errors.otherSocialLinks[index].link && errors.otherSocialLinks[index].link.message}
                                </FormFeedback>
                              )}
                          </div>
                          {/* <Button type="button" color="flat-danger" className="" onClick={() => remove(index)}>
                            Remove
                          </Button> */}
                        </div>
                      </Col>
                    </Row>
                  ))}
                  <Row className="mt-2 mb-1">
                    <div
                      className="d-flex align-items-center upload-button cursor-pointer"
                      onClick={() => {
                        if (checkObjectValues(watch('otherSocialLinks'))) {
                          otherSocialLinksAppend(defaultLink);
                        } else {
                          ShowToastMessage(ERROR, 'Please fill social links above');
                        }
                      }}
                    >
                      <UploadIconContainer>
                        <Plus size={18} color={theme.activeNavPillText} />
                      </UploadIconContainer>
                      <h5 className="fw-bold">Add Social Link</h5>
                    </div>
                  </Row>
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
                    className="d-flex align-items-center justify-content-between me-2"
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

            <Col xs="12" sm="12" lg="4">
              <Card>
                <CardHeader>
                  <h4 className="m-0 mt-1 text-lg text-grey-heading font-medium">
                    Resume <span className="label-asterisk">*</span>
                  </h4>
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody style={{ paddingBottom: files.length === 0 ? '0px' : '11px' }}>
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
                  {isFlextern && (
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
    </ProfileFormContainer>
  );
};

export default FlexternSocial;
