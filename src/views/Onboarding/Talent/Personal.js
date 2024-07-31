/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useRef, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useLocation, useNavigate } from 'react-router-dom';
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
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info } from 'react-feather';
import classNames from 'classnames';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeColors } from '@utils';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { getStates, getCities, getLanguages } from '../../../redux/actions/staticActions';
import {
  states,
  statesLoading,
  cities,
  citiesLoading,
  languages,
  languagesLoading,
} from '../../../redux/selectors/staticSelectors';
import {
  deleteResume,
  getResumeParsedDetails,
  getUserDetails,
  saveProfileDetails,
} from '../../../redux/actions/talentOnboardingActions';
import {
  deleteResumeLoading,
  profileDetailsLoading,
  resumeParsedDetails,
  resumeParsedDetailsLoading,
  // resumeParsedDetails,
  userDetails,
  userDetailsLoading,
} from '../../../redux/selectors/talentOnboardingSelectors';
import { countriesService, languagesService, talentRolesService } from '../../../services/staticServices';
import {
  downloadFile,
  downloadUploadedFile,
  removeEmptyKeys,
  // getFileSize,
  returnFilteredDropdownOptions,
  renderFilePreview,
  filteredFormSchema,
  isEmpty,
} from '../../../utility/Utils';
import { maxFileSize, userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { projectFileUploadToAzureService } from '../../../services/createProjectServices';
import uuidv4 from '../../../lib/uuidv4';
import { resumeUploadService, updateParsedResumeService } from '../../../services/talentOnboardingServices';
import { getDownloadUrl } from '../../../redux/actions/dashboardActions';
import { downloadUrlLoading } from '../../../redux/selectors/dashboardSelectors';
import TextEditor from '../../CreateProject/TextEditor';
import { resumeParsedDetailsSuccess } from '../../../redux/reducers/talentOnboarding';
import {
  formData,
  formDocuments,
  resumeDataUploadedForPersonal,
  resumeParsed,
} from '../../../redux/selectors/formDataSelectors';
import {
  clearAllFormData,
  setFileKey,
  setFormData,
  setFormDocuments,
  setResumeDataUploadedForPersonal,
  setResumeParsed,
} from '../../../redux/reducers/formData';

const Personal = () => {
  const PersonalSchema = yup.object().shape({
    tagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    workExperienceYear: yup
      .number()
      .min(0, 'Year cannot be negative')
      .max(99, 'Year must be 99 or less')
      .integer('Year must be a number')
      .typeError('Year must be a number')
      .transform((value) => (Number.isNaN(value) ? undefined : value)),
    workExperienceMonth: yup
      .number()
      .min(0, 'Month cannot be negative')
      .max(11, 'Month must be 11 or less')
      .integer('Month must be a number')
      .typeError('Month must be a number')
      .transform((value) => (Number.isNaN(value) ? undefined : value)),
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
    resume: yup.mixed(),
    speakLanguages: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five languages can be added'),
    readLanguages: yup
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
    streetAddress: yup.string(),
    houseNumber: yup.string(),
    zipCode: yup.string(),
    country: yup
      .object()
      .shape({
        label: yup.string().required('Country is required'),
        value: yup.string().required('Country is required'),
      })
      .required('Country is required'),
    state: yup
      .object()
      .shape({
        label: yup.string().required('State is required'),
        value: yup.string().required('State is required'),
      })
      .transform((value) => (value === null ? undefined : value))
      .required('State is required'),
    city: yup
      .object()
      .shape({
        label: yup.string().required('City is required'),
        value: yup.string().required('City is required'),
      })
      .transform((value) => (value === null ? undefined : value))
      .required('City is required'),
  });
  const savedFormData = useSelector(formData);
  const savedFormDocuments = useSelector(formDocuments);
  const IsresumeParsed = useSelector(resumeParsed);
  const isResumeDataUploadedForPersonal = useSelector(resumeDataUploadedForPersonal);
  const [parsedUploaded, setParsedUploaded] = useState(isResumeDataUploadedForPersonal || false);
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
    resolver: yupResolver(PersonalSchema),
    defaultValues: {
      tagline: savedFormData?.tagline || '',
      professionalIntroduction: savedFormData?.professionalIntroduction || '',
      streetAddress: savedFormData?.streetAddress || '',
      houseNumber: savedFormData?.houseNumber || '',
      workExperienceMonth: parseInt(savedFormData?.workExperienceMonth, 10) || null,
      workExperienceYear: parseInt(savedFormData?.workExperienceYear, 10) || null,
      role: savedFormData?.role || null,
      zipCode: savedFormData?.zipCode || '',
      country: savedFormData?.country || null,
      state: savedFormData?.state || null,
      city: savedFormData?.city || null,
      resume: savedFormData?.resume || null,
      parseResume: IsresumeParsed || false,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [parseResume, setParseResume] = useState(IsresumeParsed || false);
  const [talentRolesOptions, setTalentRolesOptions] = useState(null);
  const [languagesOptions, setLanguagesOptions] = useState(null);
  const [countriesOptions, setCountriesOptions] = useState(null);
  const [statesOptions, setStatesOptions] = useState(null);
  const [citiesOptions, setCitiesOptions] = useState(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [files, setFiles] = useState(savedFormDocuments ?? []);

  const statesData = useSelector(states);
  const statesIsLoading = useSelector(statesLoading);
  const citiesData = useSelector(cities);
  const citiesIsLoading = useSelector(citiesLoading);
  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  const resumeParsedLoading = useSelector(resumeParsedDetailsLoading);
  const userDetailsData = useSelector(userDetails);
  const parsedResumeData = useSelector(resumeParsedDetails);
  const languagesData = useSelector(languages);
  const languagesIsLoading = useSelector(languagesLoading);
  const downloadUrlIsLoading = useSelector(downloadUrlLoading);
  const localFormData = useWatch({ control });

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
        setFiles([...filtered]);
      }),
    );
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
        'Content-Type': file.file.type,
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

  const setResumeParsedDetails = async (res) => {
    const languageDetails = await loadLanguagesOptions();
    if (res) {
      if (res?.tagline && res?.tagline.length > 0) {
        setValue('tagline', res?.tagline, { shouldValidate: true });
      }
      if (res?.professional_introduction && res?.professional_introduction.length > 0) {
        setValue('professionalIntroduction', res?.professional_introduction, { shouldValidate: true });
      }
      if (res?.work_experience && res?.work_experience > 0) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const years = Math.floor(res?.work_experience / 12);
        const months = res?.work_experience % 12;

        setValue('workExperienceYear', years, { shouldValidate: true });
        setValue('workExperienceMonth', months, { shouldValidate: true });
      }
      if (res?.languages_read && res?.languages_read.length > 0) {
        setValue(
          'readLanguages',
          res.languages_read?.map((language) => ({
            label: language?.name || languageDetails?.options?.filter((lang) => lang.value === language._id)[0]?.label,
            value: language?._id,
          })),
          { shouldValidate: true },
        );
      } else {
        setValue(
          'readLanguages',
          [
            {
              label: 'English',
              value: '64831445a51384fb6948e678',
            },
          ],
          { shouldValidate: true },
        );
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
      // As now resume parser API is not sending any data regarding the addresses, so mapping it from the userDetailsData API for better User Experience flow
      if (parsedUploaded) {
        if (
          'streetAddress' in userDetailsData?.talent_info?.current_residency ||
          'houseNumber' in userDetailsData?.talent_info?.current_residency ||
          'zipCode' in userDetailsData?.talent_info?.current_residency ||
          'country' in userDetailsData?.talent_info?.current_residency ||
          'state' in userDetailsData?.talent_info?.current_residency ||
          'city' in userDetailsData?.talent_info?.current_residency
        ) {
          if (userDetailsData?.talent_info?.current_residency?.street_address.length > 0) {
            setValue(
              'streetAddress',
              savedFormData?.streetAddress || userDetailsData?.talent_info?.current_residency?.street_address,
              { shouldValidate: true },
            );
          }
          if (userDetailsData?.talent_info?.current_residency?.house_number.length > 0) {
            setValue(
              'houseNumber',
              savedFormData?.houseNumber || userDetailsData?.talent_info?.current_residency?.house_number,
              {
                shouldValidate: true,
              },
            );
          }
          if (userDetailsData?.talent_info?.current_residency?.zip_code > 0) {
            setValue('zipCode', savedFormData?.zipCode || userDetailsData?.talent_info?.current_residency?.zip_code, {
              shouldValidate: true,
            });
          }
          if ('country' in userDetailsData?.talent_info?.current_residency) {
            setValue(
              'country',
              {
                label: savedFormData?.country?.label || userDetailsData?.talent_info?.current_residency.country.name,
                value: savedFormData?.country?.value || userDetailsData?.talent_info?.current_residency.country._id,
              },
              { shouldValidate: true },
            );
          }
          if ('state' in userDetailsData?.talent_info?.current_residency) {
            setValue(
              'state',
              {
                label: savedFormData?.state?.label || userDetailsData?.talent_info?.current_residency.state.name,
                value: savedFormData?.state?.value || userDetailsData?.talent_info?.current_residency.state._id,
              },
              { shouldValidate: true },
            );
          }
          if ('city' in userDetailsData?.talent_info?.current_residency) {
            setValue(
              'city',
              {
                label: savedFormData?.city?.label || userDetailsData?.talent_info?.current_residency.city.name,
                value: savedFormData?.city?.value || userDetailsData?.talent_info?.current_residency.city._id,
              },
              { shouldValidate: true },
            );
          }
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
      isUploaded: false,
    };
    dispatch(setFormDocuments([fileWithUrl]));
    setFiles([fileWithUrl]);
    await handleUploadFile(fileWithUrl);
    dispatch(setFileKey(response?.data?.data?.file_key));
    if (response)
      dispatch(
        getResumeParsedDetails(setResumeParsedDetails, setParseResume, response?.data?.data?.file_key, setFiles),
      );
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
  // const formattedDate = new Date()
  //   .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  //   .replace(',', '')
  //   .split(' ');
  // const requiredFormattedDate = `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;

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
                    <span className="w-75">{file.file.name}</span>
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

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData, country: watch('country') };
    dispatch(setFormData(allData));
    if (watch('country')?.value !== userDetailsData?.talent_info?.current_residency?.country?._id) {
      setValue('state', null);
      setValue('city', null);
    }

    if (watch('country')) {
      dispatch(getStates(watch('country').value));
      setCitiesOptions([]);
    }
    if (savedFormData && savedFormData.country != null && savedFormData?.country?.value === watch('country')?.value) {
      setValue('state', savedFormData?.state);
      if (savedFormData && savedFormData?.state != null) {
        setValue('city', savedFormData?.city);
      }
    }
  }, [watch('country')]);

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData, state: watch('state') };
    dispatch(setFormData(allData));
    if (watch('state')?.value !== userDetailsData?.talent_info?.current_residency?.state?._id) {
      setValue('city', null);
    }

    if (watch('state')) {
      dispatch(getCities(watch('state').value));
    }
    const state = watch('state');
    const savedState = savedFormData?.state?.value;
    const currentState = state?.value;

    if (state && savedFormData && savedState === currentState) {
      setValue('city', savedFormData?.city ?? '');
    }
  }, [watch('state')]);

  useEffect(() => {
    const requiredData = statesData?.map((state) => ({ label: state.name, value: state._id }));
    setStatesOptions(requiredData);
  }, [statesData]);

  useEffect(() => {
    const requiredData = citiesData?.map((city) => ({ label: city.name, value: city._id }));
    setCitiesOptions(requiredData);
  }, [citiesData]);

  const onBackClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/account-details`);
    } else {
      navigate(`/${userOnboarding.talent}/account-details`);
    }
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    dispatch(setFormDocuments(files));
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/educational-details`);
    } else {
      navigate(`/${userOnboarding.talent}/educational-details`);
    }
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    dispatch(setFormDocuments(files));
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/educational-details`);
    } else {
      navigate(`/${userOnboarding.talent}/educational-details`);
    }
    dispatch(setResumeDataUploadedForPersonal(parseResume));
  };

  const onSubmit = (data) => {
    const {
      tagline,
      workExperienceYear,
      workExperienceMonth,
      professionalIntroduction,
      role,
      speakLanguages,
      readLanguages,
      writeLanguages,
      streetAddress,
      houseNumber,
      zipCode,
      country,
      state,
      city,
    } = data;
    // console.log(data)

    const years = parseInt(workExperienceYear, 10) || 0;
    const months = parseInt(workExperienceMonth, 10) || 0;

    const work_experience = years * 12 + months;
    const professional_intro = professionalIntroduction;
    const languages_speak = speakLanguages?.map((language) => language.value);
    const languages_read = readLanguages?.map((language) => language.value);
    const languages_write = writeLanguages?.map((language) => language.value);
    const current_residency = {
      country: country.value,
      state: state.value,
      city: city.value,
      street_address: streetAddress,
      house_number: houseNumber,
      zip_code: zipCode,
    };

    let reqData;

    if (workExperienceYear || workExperienceMonth) {
      reqData = {
        tagline,
        work_experience,
        professional_intro,
        role: role.value,
        languages_speak,
        languages_read,
        languages_write,
        current_residency,
        resume: !isEmpty(files)
          ? {
              file_name: files[0]?.file?.name || '',
              file_key: files[0]?.uploadData?.file_key || '',
            }
          : {},
      };
    } else {
      reqData = {
        tagline,
        professional_intro,
        role: role.value,
        languages_speak,
        languages_read,
        languages_write,
        current_residency,
        resume: !isEmpty(files)
          ? {
              file_name: files[0]?.file?.name || '',
              file_key: files[0]?.uploadData?.file_key || '',
            }
          : {},
      };
    }
    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
    if (IsresumeParsed) {
      const languagesWritten = watch('writeLanguages')?.map((language) => ({
        name: language.label,
        _id: language.value,
      }));
      const languagesSpoken = watch('speakLanguages')?.map((language) => ({
        name: language.label,
        _id: language.value,
      }));
      const languagesRead = watch('readLanguages')?.map((language) => ({
        name: language.label,
        _id: language.value,
      }));
      const resumeUpdatedData = {
        target_info: {
          ...parsedResumeData,
          languages_speak: languagesSpoken,
          languages_write: languagesWritten,
          languages_read: languagesRead,
          tagline,
          professional_introduction: professionalIntroduction,
        },
      };

      dispatch(updateParsedResumeService(parsedResumeData?._id, resumeUpdatedData));
    }
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

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      if (res?.talent_info?.tagline.length > 0) {
        setValue('tagline', savedFormData?.tagline || res?.talent_info?.tagline, {
          shouldValidate: true,
        });
      }
      if (res?.talent_info?.work_experience > 0) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const years = Math.floor(savedFormData?.workExperienceYear || res?.talent_info?.work_experience / 12);
        const months = savedFormData?.workExperienceMonth || res?.talent_info?.work_experience % 12;

        setValue('workExperienceYear', years, { shouldValidate: true });
        setValue('workExperienceMonth', months, { shouldValidate: true });
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
        dispatch(
          setFileKey(
            savedFormDocuments != null
              ? savedFormDocuments[0]?.uploadData?.file_key
              : res?.talent_info?.resume?.file_key,
          ),
        );
        setFiles([fileUrl]);
        dispatch(setFormDocuments([fileUrl]));
      }
      if (
        'streetAddress' in res?.talent_info?.current_residency ||
        'houseNumber' in res?.talent_info?.current_residency ||
        'zipCode' in res?.talent_info?.current_residency ||
        'country' in res?.talent_info?.current_residency ||
        'state' in res?.talent_info?.current_residency ||
        'city' in res?.talent_info?.current_residency
      ) {
        if (res?.talent_info?.current_residency?.street_address.length > 0) {
          setValue(
            'streetAddress',
            savedFormData?.streetAddress || res?.talent_info?.current_residency?.street_address,
            { shouldValidate: true },
          );
        }
        if (res?.talent_info?.current_residency?.house_number.length > 0) {
          setValue('houseNumber', savedFormData?.houseNumber || res?.talent_info?.current_residency?.house_number, {
            shouldValidate: true,
          });
        }
        if (res?.talent_info?.current_residency?.zip_code > 0) {
          setValue('zipCode', savedFormData?.zipCode || res?.talent_info?.current_residency?.zip_code, {
            shouldValidate: true,
          });
        }
        if ('country' in res?.talent_info?.current_residency) {
          setValue(
            'country',
            {
              label: savedFormData?.country?.label || res?.talent_info?.current_residency.country.name,
              value: savedFormData?.country?.value || res?.talent_info?.current_residency.country._id,
            },
            { shouldValidate: true },
          );
        }
        if ('state' in res?.talent_info?.current_residency) {
          setValue(
            'state',
            {
              label: savedFormData?.state?.label || res?.talent_info?.current_residency.state.name,
              value: savedFormData?.state?.value || res?.talent_info?.current_residency.state._id,
            },
            { shouldValidate: true },
          );
        }
        if ('city' in res?.talent_info?.current_residency) {
          setValue(
            'city',
            {
              label: savedFormData?.city?.label || res?.talent_info?.current_residency.city.name,
              value: savedFormData?.city?.value || res?.talent_info?.current_residency.city._id,
            },
            { shouldValidate: true },
          );
        }
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
      if (res?.talent_info?.languages_read.length > 0) {
        setValue(
          'readLanguages',
          res?.talent_info?.languages_read?.map((language) => ({
            label: language.name,
            value: language._id,
          })),
          { shouldValidate: true },
        );
      } else {
        setValue(
          'readLanguages',
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
        'readLanguages',
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
            },
          ]);
          dispatch(setFileKey(savedFormDocuments[0]?.uploadData?.file_key));
        }
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
          },
        ]);
        dispatch(setFileKey(savedFormDocuments[0]?.uploadData?.file_key));
      }
    } else {
      dispatch(getUserDetails(onGetUserDetailsSuccess));
    }
    dispatch(getLanguages());
  }, [parseResume, parsedResumeData, parsedUploaded]);

  return (
    <ProfileFormContainer>
      {(IsresumeParsed ? resumeParsedLoading : userDetailsIsLoading && languagesIsLoading) ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100">
            <Col className="w-75" xs="100" sm="75" lg="75">
              <Card>
                <CardHeader>
                  <h4 className="m-0 mt-1">About</h4>
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="tagline">
                        Tagline<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        id="tagline"
                        name="tagline"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter your tagline in 60 characters or less"
                            invalid={errors.tagline && true}
                          />
                        )}
                      />
                      {errors.tagline && <FormFeedback>{errors.tagline.message}</FormFeedback>}
                    </Col>
                    <Col sm="12" md="12" lg="6">
                      <Row>
                        <Col sm="12" md="6" lg="6">
                          <Label className="form-label" for="workExperienceYear">
                            Work Experience - Years
                          </Label>
                          <Controller
                            id="workExperienceYear"
                            name="workExperienceYear"
                            control={control}
                            render={({ field }) => (
                              <InputGroup className="input-group-merge">
                                <Input
                                  {...field}
                                  type="number"
                                  min={0}
                                  onWheel={(e) => e.target.blur()}
                                  placeholder="Enter"
                                  invalid={errors.workExperienceYear && true}
                                />
                                <InputGroupText>Year(s)</InputGroupText>
                              </InputGroup>
                            )}
                          />
                          {errors.workExperienceYear && (
                            <FormFeedback>{errors.workExperienceYear.message}</FormFeedback>
                          )}
                        </Col>
                        <Col sm="12" md="6" lg="6">
                          <Label className="form-label" for="workExperienceMonth">
                            Months
                          </Label>
                          <Controller
                            id="workExperienceMonth"
                            name="workExperienceMonth"
                            control={control}
                            render={({ field }) => (
                              <InputGroup className="input-group-merge">
                                <Input
                                  {...field}
                                  type="number"
                                  min={0}
                                  onWheel={(e) => e.target.blur()}
                                  placeholder="Enter"
                                  invalid={errors.workExperienceMonth && true}
                                />
                                <InputGroupText>Month(s)</InputGroupText>
                              </InputGroup>
                            )}
                          />
                          {errors.workExperienceMonth && (
                            <FormFeedback>{errors.workExperienceMonth.message}</FormFeedback>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="professionalIntroduction">
                        Professional Introduction<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        id="professionalIntroduction"
                        name="professionalIntroduction"
                        control={control}
                        render={({ field }) => (
                          <TextEditor
                            name={field.name}
                            onChange={field.onChange}
                            value={field.value}
                            placeholder="Describe in 500 characters."
                          />
                        )}
                      />
                      {errors.professionalIntroduction && (
                        <FormFeedback>{errors.professionalIntroduction.message}</FormFeedback>
                      )}
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
                            placeholder="Select your role"
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
                  <Row className="mb-1 mt-3">
                    <h5 className="m-0">Languages</h5>
                  </Row>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="speakLanguages">
                        I can speak well (Top 5)
                      </Label>
                      <Controller
                        id="speakLanguages"
                        name="speakLanguages"
                        control={control}
                        invalid={errors.speakLanguages && true}
                        render={({ field }) => (
                          <AsyncPaginate
                            isDisabled
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
                      <Label className="form-label" for="readLanguages">
                        I can read well (Top 5)
                      </Label>
                      <Controller
                        id="readLanguages"
                        name="readLanguages"
                        control={control}
                        invalid={errors.readLanguages && true}
                        render={({ field }) => (
                          <AsyncPaginate
                            isDisabled
                            isMulti
                            loadOptions={loadLanguagesOptions}
                            classNamePrefix="select"
                            placeholder="Select top 5 language you can read"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.readLanguages,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.readLanguages && <FormFeedback>{errors.readLanguages.message}</FormFeedback>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="writeLanguages">
                        I can write well (Top 5)
                      </Label>
                      <Controller
                        id="writeLanguages"
                        name="writeLanguages"
                        control={control}
                        invalid={errors.writeLanguages && true}
                        render={({ field }) => (
                          <AsyncPaginate
                            isDisabled
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
                  <Row className="mb-1 mt-3">
                    <h5 className="m-0">
                      Current Address<span className="label-asterisk">*</span>
                    </h5>
                  </Row>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="streetAddress">
                        Street Address
                      </Label>
                      <Controller
                        id="streetAddress"
                        name="streetAddress"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter street address"
                            invalid={errors.streetAddress && true}
                            autoComplete="none"
                          />
                        )}
                      />
                      {errors.streetAddress && <FormFeedback>{errors.streetAddress.message}</FormFeedback>}
                    </Col>
                    <Col sm="12" md="12" lg="6">
                      <Row>
                        <Col sm="6" md="6" lg="6">
                          <Label className="form-label" for="houseNumber">
                            House Number
                          </Label>
                          <Controller
                            id="houseNumber"
                            name="houseNumber"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter house number"
                                invalid={errors.houseNumber && true}
                                autoComplete="none"
                              />
                            )}
                          />
                          {errors.houseNumber && <FormFeedback>{errors.houseNumber.message}</FormFeedback>}
                        </Col>
                        <Col sm="6" md="6" lg="6">
                          <Label className="form-label" for="zipCode">
                            Zip Code
                          </Label>
                          <Controller
                            id="zipCode"
                            name="zipCode"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter zip code"
                                invalid={errors.zipCode && true}
                                autoComplete="none"
                              />
                            )}
                          />
                          {errors.zipCode && <FormFeedback>{errors.zipCode.message}</FormFeedback>}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
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
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="state">
                        State<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        id="state"
                        name="state"
                        control={control}
                        invalid={errors.state && true}
                        value={watch('state')}
                        render={({ field }) => (
                          <Select
                            isDisabled={!watch('country')}
                            isLoading={statesIsLoading}
                            options={statesOptions}
                            menuPosition="fixed"
                            classNamePrefix="select"
                            placeholder="Select your state"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.state,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.state && <FormFeedback>{errors?.state?.label?.message}</FormFeedback>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col sm="12" md="12" lg="6">
                      <Label className="form-label" for="city">
                        City<span className="label-asterisk me-50">*</span>
                      </Label>
                      <Controller
                        id="city"
                        name="city"
                        control={control}
                        invalid={errors.city && true}
                        value={watch('city')}
                        render={({ field }) => (
                          <Select
                            isDisabled={!watch('country') || !watch('state')}
                            isLoading={citiesIsLoading}
                            menuPosition="fixed"
                            minMenuHeight={200}
                            options={citiesOptions}
                            classNamePrefix="select"
                            placeholder="Select your city"
                            theme={selectThemeColors}
                            className={classNames('react-select', {
                              'is-invalid': errors && errors.city,
                            })}
                            {...field}
                          />
                        )}
                      />
                      {errors.city && <FormFeedback>{errors.city.label.message}</FormFeedback>}
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
            </Col>
            <Col className="w-25">
              <Card>
                <CardHeader>
                  <h4 className="m-0 mt-1">Resume</h4>
                </CardHeader>
                <hr className="m-0 card-header-border" />
                <CardBody>
                  <div className="d-flex flex-column">
                    <div className="d-flex" style={{ backgroundColor: '#0185E426', padding: 20 }}>
                      <Col lg="fit">
                        <Info className="font-medium-3 me-50" color="#004280" />
                      </Col>

                      <Col className="w-100 ">
                        <div className="d-flex flex-xl-row flex-column align-items-xl-center w-100  flex-wrap justify-content-between">
                          <span style={{ color: '#004280' }}>
                            <span style={{ color: '#004280' }} className="fw-bold mr-2">
                              Auto Fill {files && files?.length > 0 && 'Profile'}
                            </span>

                            {files && files.length === 0 && (
                              <span> - Upload your resume to auto fill your personal details</span>
                            )}
                          </span>
                          <div>
                            {files && files?.length > 0 && (
                              <FormGroup switch>
                                <Input
                                  className='cursor-pointer'
                                  type="switch"
                                  checked={parseResume}
                                  onClick={() => {
                                    setParsedUploaded(false);
                                    setParseResume(!parseResume);
                                    dispatch(setResumeParsed(!parseResume));
                                    dispatch(setFormDocuments(files));
                                  }}
                                />
                              </FormGroup>
                            )}
                          </div>
                        </div>

                        {files?.length === 0 && (
                          <>
                            <Label
                              for="resume"
                              className="me-2 mt-2 d-flex flex-col align-items-center upload-button cursor-pointer"
                            >
                              {/* <UploadIconContainer>
                                <Upload size={18} color={theme.activeNavPillText} />
                                
                              </UploadIconContainer> */}
                              <h5 className="fw-bold">Upload Resume</h5>
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
            </Col>
          </Row>
        </Form>
      )}
    </ProfileFormContainer>
  );
};

export default Personal;
