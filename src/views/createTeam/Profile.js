/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useRef, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
import Select from 'react-select';
import Proptypes from 'prop-types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
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
  UncontrolledTooltip,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, ChevronRight, Info, UserPlus } from 'react-feather';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { AccountImageContainer, ProfileFormContainer } from '../Onboarding/style';
import theme from '../../configs/themeVariables';
import {
  filteredFormSchema,
  removeEmptyKeys,
  returnFilteredDropdownOptions,
  selectThemeColors,
} from '../../utility/Utils';
import {
  languagesService,
  servicesService,
  skillsService,
  timezonesService,
  toolsService,
} from '../../services/staticServices';
import timeOptions from '../../utility/constants/TimeDropdownOptions';
import TeamCreatedModal from './TeamCreatedModal';
import { profileImageUploadService, profileImageUploadToAzureService } from '../../services/talentOnboardingServices';
import { createDraftTeam, deleteDraftTeam, getDraftTeamById, updateDraftTeam, updateTeam } from '../../redux/actions/teamsActions';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { getTeamById } from '../../services/teamServices';
import { getDraftTeamLoading, saveDraftTeamLoading, updateTeamLoading } from '../../redux/selectors/teamSelectors';
import InviteTalentToTeam from '../invite-talent-to-team';
import { clearModalData } from '../../redux/reducers/inviteTalent';
import { getLanguages } from '../../redux/actions/staticActions';
import { languages } from '../../redux/selectors/staticSelectors';
import TeamCreatingModal from './TeamCreatingModal';
import RemoveUploadedPicture from '../../@core/components/remove-uploaded-picture';
import { confirmSaveForLater, formData, formDocuments, formImage, isFormImageRemoved, navigatingRoute } from '../../redux/selectors/formDataSelectors';
import { setConfirmSaveForLater, setFormData, setFormDocuments, setFormImage, setIsFormImageRemoved } from '../../redux/reducers/formData';
import { getItemFromSession } from '../../utility/sessesionStorageControl';
import TextEditor from '../CreateProject/TextEditor';
import CustomerSupportCTA from '../Onboarding/CustomerSupportCTA';
import { clubOrTeamStatuses, CUSTOMER_SUPPORT_TYPES, teamTypes } from '../../utility/constants/Constant';
import { getCustomerSupportCount } from '../../redux/actions/supportActions';
import NoteComponent from '../Onboarding/NoteComponent';
import CustomerSupportModal from '../modals/CustomerSupportModal';
import FeedbackForCustomerSupportModal from '../modals/CustomerSupportFeedbackModal';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import SaveForLaterModal from '../modals/SaveForLaterModal';

const Profile = ({ setDraftSavedModal }) => {
  const ProfileSchema = yup.object().shape({
    teamName: yup.string().max(30, 'Name must be 30 characters or less').required('Name is required'),
    teamTagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    teamIntroduction: yup
      .string()
      .max(500, 'Introduction must be 500 characters or less')
      .required('Introduction is required'),
    services: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five services can be added')
      .min(1, 'At least one service is required')
      .required('Service is required'),
    languagesSupported: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five languages can be added')
      .min(1, 'At least one language is required')
      .required('Language Supported is required'),
    tools: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five tools can be added'),
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
    preferredWorkingTimeZone: yup
      .object()
      .shape({
        label: yup.string().required('Preferred time zone is required'),
        value: yup.object().required('Preferred time zone is required'),
      })
      .required('Preferred time zone is required'),
    availabilityDays: yup.array().min(1, 'Select at least one work day').required('Select at least one work day'),
    weekdays: yup.array().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekdays'),
      then: () =>
        yup.array().min(1, 'Select at least one day in the week').required('Select at least one day in the week'),
    }),
    weekends: yup.array().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekends'),
      then: () =>
        yup.array().min(1, 'Select at least one day in the weekend').required('Select at least one day in the weekend'),
    }),
    weekdayStartTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekdays'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('Start time is required'),
            value: yup.string().required('Start time is required'),
          })
          .required('Start time is required'),
    }),
    weekdayEndTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekdays'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('End time is required'),
            value: yup.string().required('End time is required'),
          })
          .required('End time is required'),
    }),
    weekendStartTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekends'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('Start time is required'),
            value: yup.string().required('Start time is required'),
          })
          .required('Start time is required'),
    }),
    weekendEndTime: yup.object().when('availabilityDays', {
      is: (availabilityDays) => availabilityDays && availabilityDays.includes('weekends'),
      then: () =>
        yup
          .object()
          .shape({
            label: yup.string().required('End time is required'),
            value: yup.string().required('End time is required'),
          })
          .required('End time is required'),
    }),
  });
  const savedFormData = useSelector(formData);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      teamName: savedFormData?.teamName || '',
      teamTagline: savedFormData?.teamTagline || '',
      services: savedFormData?.services || [],
      languagesSupported: savedFormData?.languagesSupported || [],
      tools: savedFormData?.tools || [],
      skills: savedFormData?.skills || [],
      preferredWorkingTimeZone: savedFormData?.preferredWorkingTimeZone || null,
      weekdayStartTime: savedFormData?.weekdayStartTime || {},
      weekdayEndTime: savedFormData?.weekdayEndTime || {},
      weekendStartTime: savedFormData?.weekendStartTime || {},
      weekendEndTime: savedFormData?.weekendEndTime || {},
      teamIntroduction: savedFormData?.teamIntroduction || '',
      availabilityDays: [],
      weekdays: [],
      weekends: [],
    },
  });
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [teamCreatedModal, setTeamCreatedModal] = useState(null);
  const [draftTeamId, setDraftTeamId] = useState(null);
  const [teamCreatingModal, setTeamCreatingModal] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(false);
  const [inviteTeamMemberModal, setInviteTeamMemberModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [draftImagePreview, setDraftImagePreview] = useState(null);
  const [servicesOptions, setServicesOptions] = useState(null);
  const [languagesOptions, setLanguagesOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [timezonesOptions, setTimezonesOptions] = useState(null);
  const [imageUrlRes, setImageUrlRes] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [teamDetails, setTeamDetails] = useState(null);
  const [teamCreateData, setTeamCreateData] = useState(null);
  const fileInputRef = useRef(null);
  const saveAsDraftClicked = useRef();
  const userDetailsData = useSelector(userData);
  const updateTeamIsLoading = useSelector(updateTeamLoading);
  const saveDraftTeamIsLoading = useSelector(saveDraftTeamLoading);
  const languagesData = useSelector(languages);
  const supportData = useSelector((state) => state.support.supportCount);
  const savedFormDocuments = useSelector(formDocuments);
  const isGetDraftTeamLoading = useSelector(getDraftTeamLoading);
  const savedFormImage = useSelector(formImage);
  const savedIsFormImageRemoved = useSelector(isFormImageRemoved);
  const [openSaveLaterModal, setOpenSaveLaterModal] = useState(false);
  const isOpenSaveForLater = useSelector(confirmSaveForLater);
  const navigatedRoute = useSelector(navigatingRoute);
  const toggleOpenSaveLaterModal = () => {
    setOpenSaveLaterModal(!openSaveLaterModal);
    dispatch(setConfirmSaveForLater(false));
  };

  useEffect(() => {
    if(isOpenSaveForLater){
      setOpenSaveLaterModal(true);
    }
  }, [isOpenSaveForLater]);

  const localFormData = useWatch({ control });

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  const toggleTeamCreatedModal = () => {
    setTeamCreatedModal(!teamCreatedModal);
  };

  const toggleTeamCreatingModal = () => {
    setTeamCreatingModal(!teamCreatingModal);
  };

  const isFileValid = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      ShowToastMessage(ERROR, 'Please select a valid image file (JPG, JPEG, or PNG).');
      return false;
    }
    if (file.size > maxSize) {
      ShowToastMessage(ERROR, 'File size exceeds the maximum limit (5MB).');
      return false;
    }
    return true;
  };

  const fetchFile = async (file) => {
    const thumbnail = URL.createObjectURL(file);
    setSelectedImage(file);
    setSelectedImagePreview(thumbnail);

    try {
      setIsImageUploading(true);
      const res = await profileImageUploadService(file.name);
      setImageUrlRes(res?.data?.data);
    } catch (error) {
      setIsImageUploading(false);
      setImageUrlRes(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isFileValid(file)) {
      fetchFile(file);
    } else {
      e.target.value = '';
    }
  };

  const uploadImage = async (uploadUrl) => {
    try {
      const res = await profileImageUploadToAzureService(uploadUrl, selectedImage, {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': selectedImage.type,
      });

      if (res) {
        setIsImageUploading(false);
      }
    } catch {
      ShowToastMessage(ERROR, 'Something went wrong. Please try uploading again!');
      setIsImageUploading(false);
    }
  };

  useEffect(() => {
    if (imageUrlRes) {
      uploadImage(imageUrlRes.upload_url);
      dispatch(setFormImage(imageUrlRes));
    }
  }, [imageUrlRes]);

  const onDraftSubmit = () => {
      const languages_supported = watch('languagesSupported')?.map((language) => language.value);
      const skillsSelected = watch('skills')?.map((skill) => skill.value);
      const servicesSelected = watch('services').map((skill) => skill.value);
      const toolsSelected = watch('tools')?.map((skill) => skill.value);
      const availabilityData = {
        ...(watch('preferredWorkingTimeZone') && { timezone: watch('preferredWorkingTimeZone')?.value?._id || null }),
        ...(watch('availabilityDays')?.includes('weekdays') && {
          weekdays_avl: {
            start_time: watch('weekdayStartTime')?.value || '',
            end_time: watch('weekdayEndTime')?.value || '',
            days: watch('weekdays') || [],
          },
        }),
        ...(watch('availabilityDays')?.includes('weekends') && {
          weekends_avl: {
            start_time: watch('weekendStartTime')?.value || '',
            end_time: watch('weekendEndTime')?.value || '',
            days: watch('weekends') || [],
          },
        }),
      };
      const availability = Object.keys(availabilityData).length ? availabilityData : null;
      const reqData = {
        team_type: 'TEAM',
        name: watch('teamName'),
        // team_logo: imageUrlRes?.file_key ?? null,
        tagline: watch('teamTagline') || null,
        introduction: watch('teamIntroduction') || null,
        languages_supported: languages_supported || null,
        interests: null,
        services: servicesSelected || null,
        tools: toolsSelected || null,
        skills: skillsSelected || null,
        availability: availability || null,
        creation_status: 'DRAFT',
      };

      if (params?.id) {
        dispatch(
          updateDraftTeam({
            id: params?.id,
            data: reqData,
            onSuccess: () => setDraftSavedModal(true),
            onError: () => {
              ShowToastMessage(ERROR, 'Something went wrong. Please try again!');
            },
            redirection: ()=> navigate(navigatedRoute),
            isOpenSaveForLater,
          }),
        );
      } else {
        dispatch(
          createDraftTeam({
            data: reqData,
            onSuccess: () => setDraftSavedModal(true),
            onError: () => {
              ShowToastMessage(ERROR, 'Something went wrong. Please try again!');
            },
            redirection: ()=> navigate(navigatedRoute),
            isOpenSaveForLater,
          }),
        );
      }
  };

  const onSubmit = (data) => {
    const {
      availabilityDays,
      weekdays,
      weekends,
      teamName,
      teamTagline,
      teamIntroduction,
      services,
      languagesSupported,
      tools,
      skills,
      preferredWorkingTimeZone,
      weekdayStartTime,
      weekdayEndTime,
      weekendStartTime,
      weekendEndTime,
    } = data;

    const languages_supported = languagesSupported?.map((language) => language.value);
    const skillsSelected = skills?.map((skill) => skill.value);
    const servicesSelected = services.map((skill) => skill.value);
    const toolsSelected = tools?.map((skill) => skill.value);
    const availability = {
      timezone: preferredWorkingTimeZone.value._id,
      weekdays_avl: {
        start_time: availabilityDays?.includes('weekdays') ? weekdayStartTime?.value : null,
        end_time: availabilityDays?.includes('weekdays') ? weekdayEndTime?.value : null,
        days: availabilityDays?.includes('weekdays') ? weekdays : null,
      },
      weekends_avl: {
        start_time: availabilityDays?.includes('weekends') ? weekendStartTime?.value : null,
        end_time: availabilityDays?.includes('weekends') ? weekendEndTime?.value : null,
        days: availabilityDays?.includes('weekends') ? weekends : null,
      },
    };
    let reqData;

    if (location.pathname.includes('profile-edit')) {
      const onApiSuccess = async () => {
        navigate('/dashboard');
      };

      if (imageUrlRes) {
        reqData = {
          team_type: teamTypes.team,
          creation_status:clubOrTeamStatuses.SAVED,
          _id: userDetailsData._id,
          name: teamName,
          team_logo: imageUrlRes.file_key,
          tagline: teamTagline,
          introduction: teamIntroduction,
          services: servicesSelected,
          languages_supported,
          tools: toolsSelected,
          skills: skillsSelected,
          availability,
        };
        dispatch(updateTeam(removeEmptyKeys(reqData), onApiSuccess));
      } else {
        reqData = {
          team_type: teamTypes.team,
          creation_status:clubOrTeamStatuses.SAVED,
          _id: userDetailsData._id,
          name: teamName,
          tagline: teamTagline,
          introduction: teamIntroduction,
          services: servicesSelected,
          languages_supported,
          tools: toolsSelected,
          skills: skillsSelected,
          availability,
        };

        if (selectedImage && selectedImagePreview) {
          dispatch(updateTeam({ ...removeEmptyKeys(reqData) }, onApiSuccess));
        } else {
          dispatch(updateTeam({ ...removeEmptyKeys(reqData), team_logo: '' }, onApiSuccess));
        }
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (imageUrlRes) {
        reqData = {
          name: teamName,
          creation_status:clubOrTeamStatuses.SAVED,
          team_logo: imageUrlRes.file_key,
          tagline: teamTagline,
          introduction: teamIntroduction,
          services: servicesSelected,
          languages_supported,
          tools: toolsSelected,
          skills: skillsSelected,
          availability,
        };

        setTeamCreateData(removeEmptyKeys(reqData));
        setTeamCreatingModal(true);
      } else {
        reqData = {
          name: teamName,
          creation_status:clubOrTeamStatuses.SAVED,
          tagline: teamTagline,
          introduction: teamIntroduction,
          services: servicesSelected,
          languages_supported,
          tools: toolsSelected,
          skills: skillsSelected,
          availability,
        };

        if (selectedImage && selectedImagePreview) {
          setTeamCreateData(removeEmptyKeys(reqData));
          setTeamCreatingModal(true);
        } else {
          setTeamCreateData({ ...removeEmptyKeys(reqData), team_logo: '' });
          setTeamCreatingModal(true);
        }
      }
      dispatch(deleteDraftTeam({ id: draftTeamId, onSuccess: () => {}, onError: () => {} }));
    }
  };

  const loadServicesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, servicesOptions),
      };
    }
    try {
      const response = await servicesService();
      const options = response?.data?.data?.map((service) => ({ label: service.name, value: service._id }));

      const otherIndex = options.findIndex((option) => option.label === 'Other');

      if (otherIndex !== -1) {
        const otherOption = options.splice(otherIndex, 1)[0];
        options.push(otherOption);
      }

      setServicesOptions(options);
      return {
        options,
      };
    } catch (error) {
      return { options: [] };
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

  const loadTimezonesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, timezonesOptions),
      };
    }
    try {
      const response = await timezonesService();

      const options = response?.data?.data?.map((timezone) => ({
        label: `${timezone.name} (${timezone.abbreviation})`,
        value: timezone,
      }));

      setTimezonesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  const onGetDraftTeamDetails = async (data) => {
    if (data) {
      const servicesOptionsLoaded = await loadServicesOptions();
      const languageOptionsLoaded = await loadLanguagesOptions();
      const toolsOptionsLoaded = await loadToolsOptions();
      const skillsOptionsLoaded = await loadSkillsOptions();
      const timeZoneOptionsLoaded = await loadTimezonesOptions();

      setTeamData(data);
      setValue('teamName', data?.name || '', { shouldValidate: true });
      setValue('teamTagline', data?.tagline || '', { shouldValidate: true });
      setValue('teamIntroduction', data?.introduction || '', { shouldValidate: true });
      setValue(
        'languagesSupported',
        data?.languages_supported?.map((language) => ({
          label: languageOptionsLoaded?.options?.find((lang) => lang.value === language)?.label,
          value: language,
        })) ||
          languagesData?.map((language) => ({
            label: language.name,
            value: language._id,
          })),
        { shouldValidate: true },
      );

      setValue(
        'services',
        data?.services?.map((service) => ({
          label: servicesOptionsLoaded?.options?.find((serviceOption) => serviceOption?.value === service).label,
          value: service,
        })) || [],
        { shouldValidate: true },
      );

      setValue(
        'skills',
        data?.skills?.map((skill) => ({
          label: skillsOptionsLoaded?.options?.find((skillOption) => skillOption?.value === skill)?.label,
          value: skill,
        })) || [],
        {
          shouldValidate: true,
        },
      );

      setValue(
        'tools',
        data?.tools?.map((tool) => ({
          label: toolsOptionsLoaded?.options?.find((toolOption) => toolOption?.value === tool)?.label,
          value: tool,
        })) || [],
        {
          shouldValidate: true,
        },
      );
      const draftedTimeZone = timeZoneOptionsLoaded?.options?.find(
        (timezone) => timezone.value?._id === data?.availability?.timezone,
      );
      setValue(
        'preferredWorkingTimeZone',
        draftedTimeZone?.label && draftedTimeZone?.value
          ? {
              label: draftedTimeZone.label,
              value: draftedTimeZone.value,
            }
          : null,
        { shouldValidate: true },
      );
      setValue(
        'availabilityDays',
        [
          ...(data?.availability?.weekdays_avl ? ['weekdays'] : []),
          ...(data?.availability?.weekends_avl ? ['weekends'] : []),
        ],
        { shouldValidate: true },
      );
      setValue('weekdays', data?.availability?.weekdays_avl?.days || [], { shouldValidate: true });
      setValue('weekends', data?.availability?.weekdends_avl?.days || [], { shouldValidate: true });
      setValue(
        'weekdayStartTime',
        {
          label: timeOptions.find((time) => parseInt(time.value, 10) === data?.availability?.weekdays_avl?.start_time)
            ?.label,
          value: data?.availability?.weekdays_avl?.start_time,
        } || null,
        { shouldValidate: true },
      );
      setValue(
        'weekdayEndTime',
        {
          label: timeOptions.find((time) => parseInt(time.value, 10) === data?.availability?.weekdays_avl?.end_time)
            ?.label,
          value: data?.availability?.weekdays_avl?.end_time,
        } || null,
        { shouldValidate: true },
      );
      setValue(
        'weekendStartTime',
        {
          label: timeOptions.find((time) => parseInt(time.value, 10) === data?.availability?.weekends_avl?.start_time)
            ?.label,
          value: data?.availability?.weekends_avl?.start_time,
        } || null,
        { shouldValidate: true },
      );
      setValue(
        'weekendEndTime',
        {
          label: timeOptions.find((time) => parseInt(time.value, 10) === data?.availability?.weekends_avl?.end_time)
            ?.label,
          value: data?.availability?.weekends_avl?.end_time,
        } || null,
        { shouldValidate: true },
      );
      setDraftImagePreview(data?.team_logo);
      setDraftTeamId(data?._id);
    }
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(getDraftTeamById({ id: params?.id, onSuccess: () => {}, onError: () => {}, onGetDraftTeamDetails }));
    }
  }, [params, params?.id, dispatch]);

  const availabilityDays = watch('availabilityDays');

  const getTeamDetails = async () => {
    const res = await getTeamById(userDetailsData._id);
    if (res) {
      setTeamDetails(res.data.data);
    }
  };

  useEffect(() => {
    if (getItemFromSession('team_id')) {
      getTeamDetails();
    }
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    if (location.pathname.includes('profile-edit')) {
      if (teamDetails) {
        if (savedIsFormImageRemoved) {
          setSelectedImage(null);
          setSelectedImagePreview(null);
        } else if (teamDetails?.team_logo.length > 0 && !savedFormDocuments) {
          setSelectedImage(teamDetails.team_logo);
          setSelectedImagePreview(teamDetails.team_logo);
        } else {
          setSelectedImage(savedFormDocuments);
          if (savedFormImage) {
            setSelectedImagePreview(URL.createObjectURL(savedFormDocuments));
          } else {
            setSelectedImagePreview(savedFormDocuments);
          }
        }
        if (teamDetails?.name?.length > 0 && !savedFormData?.teamName) {
          setValue('teamName', teamDetails?.name, { shouldValidate: true });
        } else {
          setValue('teamName', savedFormData?.teamName, { shouldValidate: true });
        }
        if (teamDetails?.tagline?.length > 0 && !savedFormData?.teamTagline) {
          setValue('teamTagline', teamDetails?.tagline, { shouldValidate: true });
        } else {
          setValue('teamTagline', savedFormData?.teamTagline, { shouldValidate: true });
        }
        if (teamDetails?.introduction?.length > 0 && !savedFormData?.teamIntroduction) {
          setValue('teamIntroduction', teamDetails?.introduction, { shouldValidate: true });
        } else {
          setValue('teamIntroduction', savedFormData?.teamIntroduction, { shouldValidate: true });
        }
        if (teamDetails?.services?.length > 0 && !savedFormData?.services) {
          setValue(
            'services',
            teamDetails?.services.map((service) => ({
              label: service.name,
              value: service._id,
            })),
            { shouldValidate: true },
          );
        } else {
          setValue('services', savedFormData?.services, { shouldValidate: true });
        }
        if (teamDetails?.tools.length > 0 && !savedFormData?.tools) {
          setValue(
            'tools',
            teamDetails?.tools.map((tool) => ({ label: tool.name, value: tool._id })),
            { shouldValidate: true },
          );
        } else {
          setValue('tools', savedFormData?.tools, { shouldValidate: true });
        }
        if (teamDetails?.skills.length > 0 && !savedFormData?.skills) {
          setValue(
            'skills',
            teamDetails?.skills.map((skill) => ({ label: skill.name, value: skill._id })),
            { shouldValidate: true },
          );
        } else {
          setValue('skills', savedFormData?.skills, { shouldValidate: true });
        }
        if ('timezone' in teamDetails?.availability) {
          if (teamDetails?.availability?.timezone && !savedFormData?.preferredWorkingTimeZone) {
            setValue(
              'preferredWorkingTimeZone',
              {
                label: `${teamDetails?.availability?.timezone?.name} (${teamDetails?.availability?.timezone?.abbreviation})`,
                value: teamDetails?.availability?.timezone,
              },
              { shouldValidate: true },
            );
          } else {
            setValue('preferredWorkingTimeZone', savedFormData?.preferredWorkingTimeZone, { shouldValidate: true });
          }

          let talentAvailabilityDays = [];
          if ('weekdays_avl' in teamDetails?.availability && !savedFormData?.availabilityDays?.includes('weekdays')) {
            if ('days' in teamDetails?.availability?.weekdays_avl) {
              talentAvailabilityDays = [...talentAvailabilityDays, 'weekdays'];
              setValue('weekdays', teamDetails?.availability?.weekdays_avl?.days, { shouldValidate: true });
              setValue(
                'weekdayStartTime',
                timeOptions.find(
                  (time) => parseInt(time.value, 10) === teamDetails?.availability?.weekdays_avl?.start_time,
                ),
                { shouldValidate: true },
              );
              setValue(
                'weekdayEndTime',
                timeOptions.find(
                  (time) => parseInt(time.value, 10) === teamDetails?.availability?.weekdays_avl?.end_time,
                ),
                { shouldValidate: true },
              );
            }
          } else {
            setValue('weekdays', savedFormData?.weekdays, { shouldValidate: true });
            setValue('weekdayStartTime', savedFormData?.weekdayStartTime, { shouldValidate: true });
            setValue('weekdayEndTime', savedFormData?.weekdayEndTime, { shouldValidate: true });
          }
          if ('weekends_avl' in teamDetails?.availability && !savedFormData?.availabilityDays?.includes('weekends')) {
            if ('days' in teamDetails?.availability?.weekends_avl) {
              talentAvailabilityDays = [...talentAvailabilityDays, 'weekends'];
              setValue('weekends', teamDetails?.availability?.weekends_avl?.days, { shouldValidate: true });
              setValue(
                'weekendStartTime',
                timeOptions.find(
                  (time) => parseInt(time.value, 10) === teamDetails?.availability?.weekends_avl?.start_time,
                ),
                { shouldValidate: true },
              );
              setValue(
                'weekendEndTime',
                timeOptions.find(
                  (time) => parseInt(time.value, 10) === teamDetails?.availability?.weekends_avl?.end_time,
                ),
                { shouldValidate: true },
              );
            }
          } else {
            setValue('weekends', savedFormData?.weekends, { shouldValidate: true });
            setValue('weekendStartTime', savedFormData?.weekendStartTime, { shouldValidate: true });
            setValue('weekendEndTime', savedFormData?.weekendEndTime, { shouldValidate: true });
          }

          if (!savedFormData?.availabilityDays?.length) {
            setValue('availabilityDays', talentAvailabilityDays, { shouldValidate: true });
          } else {
            setValue('availabilityDays', savedFormData?.availabilityDays, { shouldValidate: true });
          }
        }
      }
    }
  }, [teamDetails]);

  useEffect(() => {
    if (languagesData?.length > 0) {
      setValue(
        'languagesSupported',
        languagesData?.map((language) => ({
          label: language.name,
          value: language._id,
        })),
        { shouldValidate: true },
      );
    }
  }, [languagesData]);

  const toggleInviteTeamMemberModal = () => {
    setInviteTeamMemberModal(!inviteTeamMemberModal);
    dispatch(clearModalData());
  };
  const onInvite = () => {
    setInviteTeamMemberModal(true);
    setInviteTalentToTeamModal(true);
    setTeamCreatedModal(false);
  };

  const handleClick = () => {
    if (Object.keys(errors).length === 0) {
      handleSubmit(onSubmit)();
    } else {
      ShowToastMessage(ERROR, 'Please fill the mandatory fields');
    }
  };

  const onRemovePictureClick = () => {
    setSelectedImage(null);
    setDraftImagePreview(null);
    setSelectedImagePreview(null);
    setImageUrlRes(null);
    dispatch(setFormDocuments(null));
    dispatch(setFormImage(null));
    dispatch(setIsFormImageRemoved(true));
  };

  useEffect(() => {
    if (selectedImage) {
      dispatch(setFormDocuments(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: ProfileSchema.fields,
      });
      reset(requiredFields);
      const cleanedRequiredFields = Object.entries(requiredFields)
        .filter(([, value]) => !(Array.isArray(value) && value.length === 0)) // Filter out keys with empty arrays
        .reduce((acc, [key, value]) => {
          acc[key] = value; // Recreate the object with remaining keys
          return acc;
        }, {});
      const keysWithValues = Object.keys(cleanedRequiredFields).filter((key) => cleanedRequiredFields[key]);
      trigger(keysWithValues);
    }
    if (savedIsFormImageRemoved) {
      dispatch(setIsFormImageRemoved(true));
      setSelectedImage(null);
      setSelectedImagePreview(null);
    } else if (savedFormDocuments) {
      setSelectedImage(savedFormDocuments);
      if (!location.pathname.includes('profile-edit')) {
        setSelectedImagePreview(URL?.createObjectURL(savedFormDocuments ?? null));
      } else {
        setSelectedImagePreview(savedFormDocuments);
      }
    }
    if (savedFormImage) {
      setImageUrlRes(savedFormImage);
    }
    return () => {
      dispatch(setFormDocuments(null));
    };
  }, []);

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

  return (
    <ProfileFormContainer className="w-75">
      {teamCreatingModal && (
        <TeamCreatingModal
          modal={teamCreatingModal}
          toggleModal={toggleTeamCreatingModal}
          onInvite={onInvite}
          setTeamData={setTeamData}
          teamCreateData={teamCreateData}
          setTeamCreatedModal={setTeamCreatedModal}
        />
      )}
      {teamCreatedModal && (
        <TeamCreatedModal
          previewImage={selectedImagePreview}
          teamCreateData={teamCreateData}
          onInvite={onInvite}
          modal={teamCreatedModal}
          toggleModal={toggleTeamCreatedModal}
          teamData={teamData}
        />
      )}
      {inviteTalentToTeamModal && (
        <InviteTalentToTeam
          createTeamView
          inviteTeamMemberModal={inviteTeamMemberModal}
          toggleInviteTeamMemberModal={toggleInviteTeamMemberModal}
          setInviteTalentToTeamModal={setInviteTalentToTeamModal}
        />
      )}
      {isGetDraftTeamLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {openSaveLaterModal && <SaveForLaterModal modal={openSaveLaterModal} toggleModal={toggleOpenSaveLaterModal} draftType='TEAM' draftAction={onDraftSubmit} redirectionRoute={navigatedRoute} />}
          <Card>
            <CardHeader>
              <h4 className="m-0 mt-1">About</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <div className="d-flex align-items-center pb-2 image-container">
                {draftImagePreview || (selectedImage && selectedImagePreview) ? (
                  <img src={draftImagePreview || selectedImagePreview} alt="profile" className="selected-image" />
                ) : (
                  <AccountImageContainer>
                    <UserPlus size={50} />
                  </AccountImageContainer>
                )}
                <div className="ml-2 mr-1">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="file-input"
                    ref={fileInputRef}
                  />
                  <Button
                    id={selectedImage && selectedImagePreview ? 'popFocus' : 'noFocus'}
                    color="primary"
                    className="ml-2 mr-1 d-flex align-items-center py-50"
                    disabled={isImageUploading}
                    onClick={() => !selectedImage && !selectedImagePreview && fileInputRef.current.click()}
                  >
                    <Camera className="me-50" />
                    {isImageUploading ? <Spinner size="sm" /> : 'Upload Team Logo'}
                  </Button>
                  {selectedImage && selectedImagePreview && (
                    <RemoveUploadedPicture
                      fileInputRef={fileInputRef}
                      onRemovePicture={onRemovePictureClick}
                      offset={[15, 10]}
                    />
                  )}
                </div>
                <Info size={18} color={theme.infoIcon} id="logo-info" />
                <UncontrolledTooltip placement="right" target="logo-info">
                  <div className="d-flex flex-column align-items-start">
                    <p className="m-0">Allowed file types:</p>
                    <p className="m-0">png, jpg, jpeg.</p>
                    <p className="m-0">Max file size: 5MB</p>
                  </div>
                </UncontrolledTooltip>
              </div>

              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="teamName">
                    Team Name<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="teamName"
                    name="teamName"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter your team name" invalid={errors.teamName && true} />
                    )}
                  />
                  {errors.teamName && <FormFeedback>{errors.teamName.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="teamTagline">
                    Team Tagline<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="teamTagline"
                    name="teamTagline"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter your team tagline in 60 characters"
                        invalid={errors.teamTagline && true}
                      />
                    )}
                  />
                  {errors.teamTagline && <FormFeedback>{errors.teamTagline.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="teamIntroduction">
                    Team Introduction<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="teamIntroduction"
                    name="teamIntroduction"
                    control={control}
                    render={({ field }) => (
                      <TextEditor
                        name={field.name}
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Add your team introduction in 500 characters."
                      />
                    )}
                  />
                  {errors.teamIntroduction && <FormFeedback>{errors.teamIntroduction.message}</FormFeedback>}
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="align-items-end">
              <h4 className="m-0 mt-1">Service</h4>
              <CustomerSupportCTA
                type={CUSTOMER_SUPPORT_TYPES.tools_and_skills}
                handleCustomerSupport={handleCustomerSupport}
              />
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="services">
                    Services<span className="label-asterisk">*</span> <i>(Top 5)</i>
                  </Label>
                  <Controller
                    id="services"
                    name="services"
                    control={control}
                    invalid={errors.services && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        isMulti
                        loadOptions={loadServicesOptions}
                        classNamePrefix="select"
                        placeholder="Select up to 5 services"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.services,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.services && <FormFeedback>{errors.services.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="languagesSupported">
                    Languages Supported<span className="label-asterisk">*</span> <i>(Top 5)</i>
                  </Label>
                  <Controller
                    id="languagesSupported"
                    name="languagesSupported"
                    control={control}
                    invalid={errors.languagesSupported && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        isMulti
                        isDisabled
                        loadOptions={loadLanguagesOptions}
                        classNamePrefix="select"
                        placeholder="Select up to 5 languages"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.languagesSupported,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.languagesSupported && <FormFeedback>{errors.languagesSupported.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mb-1">
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
              {supportData?.tools_and_skills?.pending_requests > 0 && (
                <NoteComponent type="info" requestCount={supportData?.tools_and_skills?.pending_requests} />
              )}
              {supportData?.tools_and_skills?.approved_requests > 0 && (
                <NoteComponent type="success" requestCount={supportData?.tools_and_skills?.approved_requests} />
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4 className="m-0 mt-1">Availability</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="preferredWorkingTimeZone">
                    Preferred time zone<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="preferredWorkingTimeZone"
                    name="preferredWorkingTimeZone"
                    control={control}
                    invalid={errors.preferredWorkingTimeZone && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        loadOptions={loadTimezonesOptions}
                        classNamePrefix="select"
                        placeholder="Select one"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.preferredWorkingTimeZone,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.preferredWorkingTimeZone && (
                    <FormFeedback>{errors?.preferredWorkingTimeZone?.label?.message}</FormFeedback>
                  )}
                </Col>
              </Row>
              <Row className="mt-2">
                <h5 className="m-0">
                  Days available<span className="label-asterisk me-50">*</span>
                </h5>
              </Row>
              <Row className="custom-checkbox-border">
                <Controller
                  control={control}
                  name="availabilityDays"
                  render={({ field }) => (
                    <div className="demo-inline-spacing">
                      <div className="form-check form-check-inline checkbox-custom-margin">
                        <Input
                          type="checkbox"
                          {...field}
                          id="weekdays"
                          checked={field.value.includes('weekdays')}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = 'weekdays';

                            if (isChecked) {
                              field.onChange([...field.value, value]);
                            } else {
                              field.onChange(field.value.filter((v) => v !== value));
                            }
                          }}
                        />
                        <Label for="weekdays" className="form-check-label">
                          Weekdays
                        </Label>
                      </div>
                      <div className="form-check form-check-inline checkbox-custom-margin">
                        <Input
                          type="checkbox"
                          {...field}
                          id="weekends"
                          checked={field.value.includes('weekends')}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const value = 'weekends';

                            if (isChecked) {
                              field.onChange([...field.value, value]);
                            } else {
                              field.onChange(field.value.filter((v) => v !== value));
                            }
                          }}
                        />
                        <Label htmlFor="weekends" className="form-check-label">
                          Weekends
                        </Label>
                      </div>
                    </div>
                  )}
                />
                {errors.availabilityDays && <FormFeedback>{errors.availabilityDays.message}</FormFeedback>}
              </Row>
              <Row>
                {availabilityDays &&
                  (availabilityDays?.includes('weekdays') || availabilityDays?.includes('weekends')) && (
                    <>
                      {availabilityDays?.includes('weekdays') && (
                        <div>
                          <Row className="mb-1 mt-2">
                            <div className="d-flex align-items-center">
                              <h5 className="m-0">Weekdays</h5>
                              <p className="m-0 mx-1 px-50 time-zone-border">
                                {watch('preferredWorkingTimeZone') &&
                                  watch('preferredWorkingTimeZone')?.value?.abbreviation}
                              </p>
                              <Info size={18} color={theme.infoIcon} id="time-zone-info-weekday" />
                              <UncontrolledTooltip placement="right" target="time-zone-info-weekday">
                                <div className="d-flex flex-column align-items-start">
                                  <p className="m-0">
                                    Based on preferred
                                    <br /> time zone
                                  </p>
                                </div>
                              </UncontrolledTooltip>
                            </div>
                          </Row>
                          <Row className="mb-1 mt-2">
                            <Col sm="6" md="6" lg="3">
                              <Label className="form-label" for="weekdayStartTime">
                                Start time<span className="label-asterisk me-50">*</span>
                              </Label>
                              <Controller
                                id="weekdayStartTime"
                                name="weekdayStartTime"
                                control={control}
                                invalid={errors.weekdayStartTime && true}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    options={timeOptions}
                                    classNamePrefix="select"
                                    placeholder="Select start time"
                                    theme={selectThemeColors}
                                    className={classNames('react-select', {
                                      'is-invalid': errors && errors.weekdayStartTime,
                                    })}
                                    onChange={(selectedOption) => {
                                      field.onChange(selectedOption);
                                      setValue('weekdayEndTime', null);
                                    }}
                                  />
                                )}
                              />
                              {errors.weekdayStartTime && (
                                <FormFeedback>{errors.weekdayStartTime.label?.message}</FormFeedback>
                              )}
                            </Col>
                            <Col sm="6" md="6" lg="3">
                              <Label className="form-label" for="weekdayEndTime">
                                End time<span className="label-asterisk me-50">*</span>
                              </Label>
                              <Controller
                                id="weekdayEndTime"
                                name="weekdayEndTime"
                                control={control}
                                invalid={errors.weekdayEndTime && true}
                                render={({ field }) => (
                                  <Select
                                    options={
                                      watch('weekdayStartTime')
                                        ? timeOptions.filter(
                                            (t) =>
                                              parseInt(t.value, 10) > parseInt(watch('weekdayStartTime').value, 10),
                                          )
                                        : timeOptions
                                    }
                                    classNamePrefix="select"
                                    placeholder="Select end time"
                                    theme={selectThemeColors}
                                    className={classNames('react-select', {
                                      'is-invalid': errors && errors.weekdayEndTime,
                                    })}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.weekdayEndTime && (
                                <FormFeedback>{errors.weekdayEndTime.label?.message}</FormFeedback>
                              )}
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <h5 className="m-0">
                              Which days?
                              <span className="label-asterisk me-50">*</span>
                            </h5>
                          </Row>
                          <div className="custom-checkbox-border">
                            <Controller
                              control={control}
                              name="weekdays"
                              render={({ field }) => (
                                <div className="demo-inline-spacing">
                                  <div className="form-check form-check-inline checkbox-custom-margin">
                                    <Input
                                      type="checkbox"
                                      {...field}
                                      id="MONDAY"
                                      checked={field.value.includes('MONDAY')}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const value = 'MONDAY';

                                        if (isChecked) {
                                          field.onChange([...field.value, value]);
                                        } else {
                                          field.onChange(field.value.filter((v) => v !== value));
                                        }
                                      }}
                                    />
                                    <Label for="MONDAY" className="form-check-label">
                                      Mon
                                    </Label>
                                  </div>
                                  <div className="form-check form-check-inline checkbox-custom-margin">
                                    <Input
                                      type="checkbox"
                                      {...field}
                                      id="TUESDAY"
                                      checked={field?.value.includes('TUESDAY')}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const value = 'TUESDAY';

                                        if (isChecked) {
                                          field.onChange([...field.value, value]);
                                        } else {
                                          field.onChange(field.value.filter((v) => v !== value));
                                        }
                                      }}
                                    />
                                    <Label for="TUESDAY" className="form-check-label">
                                      Tue
                                    </Label>
                                  </div>
                                  <div className="form-check form-check-inline checkbox-custom-margin">
                                    <Input
                                      type="checkbox"
                                      {...field}
                                      id="WEDNESDAY"
                                      checked={field?.value.includes('WEDNESDAY')}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const value = 'WEDNESDAY';

                                        if (isChecked) {
                                          field.onChange([...field.value, value]);
                                        } else {
                                          field.onChange(field?.value.filter((v) => v !== value));
                                        }
                                      }}
                                    />
                                    <Label for="WEDNESDAY" className="form-check-label">
                                      Wed
                                    </Label>
                                  </div>
                                  <div className="form-check form-check-inline checkbox-custom-margin">
                                    <Input
                                      type="checkbox"
                                      {...field}
                                      id="THURSDAY"
                                      checked={field.value.includes('THURSDAY')}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const value = 'THURSDAY';

                                        if (isChecked) {
                                          field.onChange([...field.value, value]);
                                        } else {
                                          field.onChange(field?.value.filter((v) => v !== value));
                                        }
                                      }}
                                    />
                                    <Label for="THURSDAY" className="form-check-label">
                                      Thu
                                    </Label>
                                  </div>
                                  <div className="form-check form-check-inline checkbox-custom-margin">
                                    <Input
                                      type="checkbox"
                                      {...field}
                                      id="FRIDAY"
                                      checked={field.value.includes('FRIDAY')}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const value = 'FRIDAY';

                                        if (isChecked) {
                                          field.onChange([...field.value, value]);
                                        } else {
                                          field.onChange(field?.value.filter((v) => v !== value));
                                        }
                                      }}
                                    />
                                    <Label for="FRIDAY" className="form-check-label">
                                      Fri
                                    </Label>
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                          {errors.weekdays && <FormFeedback>{errors.weekdays.message}</FormFeedback>}
                        </div>
                      )}

                      {availabilityDays.includes('weekends') && (
                        <div>
                          <Row className="mb-1 mt-2">
                            <div className="d-flex align-items-center">
                              <h5 className="m-0">Weekends</h5>
                              <p className="m-0 mx-1 px-50 time-zone-border">
                                {watch('preferredWorkingTimeZone') &&
                                  watch('preferredWorkingTimeZone')?.value?.abbreviation}
                              </p>
                              <Info size={18} color={theme.infoIcon} id="time-zone-info-weekend" />
                              <UncontrolledTooltip placement="right" target="time-zone-info-weekend">
                                <div className="d-flex flex-column align-items-start">
                                  <p className="m-0">
                                    Based on preferred
                                    <br /> time zone
                                  </p>
                                </div>
                              </UncontrolledTooltip>
                            </div>
                          </Row>
                          <Row className="mb-1 mt-2">
                            <Col sm="6" md="6" lg="3">
                              <Label className="form-label" for="weekendStartTime">
                                Start time<span className="label-asterisk me-50">*</span>
                              </Label>
                              <Controller
                                id="weekendStartTime"
                                name="weekendStartTime"
                                control={control}
                                invalid={errors.weekendStartTime && true}
                                render={({ field }) => (
                                  <Select
                                    options={timeOptions}
                                    classNamePrefix="select"
                                    placeholder="Select start time"
                                    theme={selectThemeColors}
                                    className={classNames('react-select', {
                                      'is-invalid': errors && errors.weekendStartTime,
                                    })}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.weekendStartTime && (
                                <FormFeedback>{errors.weekendStartTime.label.message}</FormFeedback>
                              )}
                            </Col>
                            <Col sm="6" md="6" lg="3">
                              <Label className="form-label" for="weekendEndTime">
                                End time<span className="label-asterisk me-50">*</span>
                              </Label>
                              <Controller
                                id="weekendEndTime"
                                name="weekendEndTime"
                                control={control}
                                invalid={errors.weekendEndTime && true}
                                render={({ field }) => (
                                  <Select
                                    options={
                                      watch('weekendStartTime')
                                        ? timeOptions.filter(
                                            (t) =>
                                              parseInt(t.value, 10) > parseInt(watch('weekendStartTime').value, 10),
                                          )
                                        : timeOptions
                                    }
                                    classNamePrefix="select"
                                    placeholder="Select end time"
                                    theme={selectThemeColors}
                                    className={classNames('react-select', {
                                      'is-invalid': errors && errors.weekendEndTime,
                                    })}
                                    {...field}
                                  />
                                )}
                              />
                              {errors.weekendEndTime && (
                                <FormFeedback>{errors.weekendEndTime.label.message}</FormFeedback>
                              )}
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <h5 className="m-0">
                              Which days?
                              <span className="label-asterisk me-50">*</span>
                            </h5>
                          </Row>
                          <div className="custom-checkbox-border">
                            <Controller
                              control={control}
                              name="weekends"
                              render={({ field }) => (
                                <div className="demo-inline-spacing">
                                  <div className="form-check form-check-inline checkbox-custom-margin">
                                    <Input
                                      type="checkbox"
                                      {...field}
                                      id="SATURDAY"
                                      checked={field.value.includes('SATURDAY')}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const value = 'SATURDAY';

                                        if (isChecked) {
                                          field.onChange([...field.value, value]);
                                        } else {
                                          field.onChange(field.value.filter((v) => v !== value));
                                        }
                                      }}
                                    />
                                    <Label for="SATURDAY" className="form-check-label">
                                      Sat
                                    </Label>
                                  </div>
                                  <div className="form-check form-check-inline checkbox-custom-margin">
                                    <Input
                                      type="checkbox"
                                      {...field}
                                      id="SUNDAY"
                                      checked={field.value.includes('SUNDAY')}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const value = 'SUNDAY';

                                        if (isChecked) {
                                          field.onChange([...field.value, value]);
                                        } else {
                                          field.onChange(field.value.filter((v) => v !== value));
                                        }
                                      }}
                                    />
                                    <Label for="SUNDAY" className="form-check-label">
                                      Sun
                                    </Label>
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                          {errors.weekends && <FormFeedback>{errors.weekends.message}</FormFeedback>}
                        </div>
                      )}
                    </>
                  )}
              </Row>
            </CardBody>
          </Card>
          <div className="d-flex justify-content-end align-items-center pb-2 mt-1">
            <Button
              onClick={() => {
                saveAsDraftClicked.current = true;
                handleSubmit(onDraftSubmit());
              }}
              color="primary"
              className="me-2"
              outline
              disabled={saveDraftTeamIsLoading || updateTeamIsLoading || isImageUploading || !watch('teamName')}
            >
              {saveDraftTeamIsLoading ? <Spinner size="sm" /> : <span>Save as Draft</span>}
            </Button>
            <div>
              <Button
                color="primary"
                outline={location.pathname.includes('profile-edit')}
                disabled={isImageUploading || updateTeamIsLoading}
                onClick={handleClick}
              >
                {updateTeamIsLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <span className="me-50">{location.pathname.includes('profile-edit') ? 'Save' : 'Create Team'}</span>
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

export default Profile;

Profile.propTypes = {
  setDraftSavedModal: Proptypes.func,
};

Profile.defaultProps = {
  setDraftSavedModal: () => {},
};
