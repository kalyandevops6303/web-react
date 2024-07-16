/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useRef, useState } from 'react';
import { AsyncPaginate, reduceGroupedOptions } from 'react-select-async-paginate';
import * as yup from 'yup';
// import Select from 'react-select';
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
  paginatedInstitutesService,
  projectAreasService,
  skillsService,
  toolsService,
} from '../../services/staticServices';
import { profileImageUploadService, profileImageUploadToAzureService } from '../../services/talentOnboardingServices';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { updateTeamLoading } from '../../redux/selectors/teamSelectors';
import { GroupLabelWrapper } from './style';
import EducationInstitutionModal from './EducationInstitutionModal';
import {
  createDraftClub,
  getDraftClubById,
  setClubCreateDataAction,
  updateClub,
  updateDraftClub,
} from '../../redux/actions/clubActions';
import { getTeamById } from '../../services/teamServices';
import { getProjectAreas, getSkills, getTools } from '../../redux/actions/staticActions';
import { projectAreas, skillsList, toolsList } from '../../redux/selectors/staticSelectors';
import { CUSTOMER_SUPPORT_TYPES, userProfileEdit } from '../../utility/constants/Constant';
import RemoveUploadedPicture from '../../@core/components/remove-uploaded-picture';
import { confirmSaveForLater, formData, formDocuments, formImage, isFormImageRemoved, navigatingRoute } from '../../redux/selectors/formDataSelectors';
import { setConfirmSaveForLater, setFormData, setFormDocuments, setFormImage, setIsFormImageRemoved } from '../../redux/reducers/formData';
import { clearClubCreateData } from '../../redux/reducers/clubs';
import TextEditor from '../CreateProject/TextEditor';
import CustomerSupportCTA from '../Onboarding/CustomerSupportCTA';
import CustomerSupportModal from '../modals/CustomerSupportModal';
import FeedbackForCustomerSupportModal from '../modals/CustomerSupportFeedbackModal';
import { getCustomerSupportCount } from '../../redux/actions/supportActions';
import NoteComponent from '../Onboarding/NoteComponent';
import { getDraftClubLoading, saveDraftClubLoading } from '../../redux/selectors/clubSelectors';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import SaveForLaterModal from '../modals/SaveForLaterModal';

const Account = ({ setDraftSavedModal }) => {
  const ProfileSchema = yup.object().shape({
    clubName: yup.string().max(30, 'Name must be 30 characters or less').required('Name is required'),
    clubTagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    educationInstitution: yup
      .object()
      .shape({
        label: yup.string(),
        value: yup.string(),
      })
      .required('Education institution is required').nullable(),
    clubIntroduction: yup
      .string()
      .max(500, 'Introduction must be 500 characters or less')
      .required('Introduction is required'),
    interests: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five interests can be added')
      .min(1, 'At least one interest is required')
      .required('Interests is required'),

    tools: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five tools can be added')
      .min(1, 'At least one tool is required').nullable(),
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
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      clubName: savedFormData?.clubName || '',
      clubTagline: savedFormData?.clubTagline || '',
      clubIntroduction: savedFormData?.clubIntroduction || '',
      interests: savedFormData?.interests || [],
      tools: savedFormData?.tools || [],
      skills: savedFormData?.skills || [],
      educationInstitution: savedFormData?.educationInstitution || null,
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [projectAreasOptions, setProjectAreasOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [draftImagePreview, setDraftImagePreview] = useState(null);
  const [clubData, setClubData] = useState(null);
  const [imageUrlRes, setImageUrlRes] = useState(null);
  const [educationInstitutionModal, setEducationInstitutionModal] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [clubDetails, setClubDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const fileInputRef = useRef(null);
  const saveAsDraftClicked = useRef(null);
  const userDetailsData = useSelector(userData);
  const updateTeamIsLoading = useSelector(updateTeamLoading);
  const isGetDraftTeamLoading = useSelector(getDraftClubLoading);
  const clubCreateData = useSelector((state) => state.clubs.clubCreateData);
  const supportData = useSelector((state) => state.support.supportCount);
  const savedFormDocuments = useSelector(formDocuments);
  const savedFormImage = useSelector(formImage);
  const savedIsFormImageRemoved = useSelector(isFormImageRemoved);
  const params = useParams();
  const dispatch = useDispatch();
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
    dispatch(setIsFormImageRemoved(false));

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

  const handleSelectChange = (option, field) => {
    setSelectedOption(option);
    const selectedOptionValue = option?.value;
    const myInstitution = userDetailsData?.talent_info?.educational_institute
      .map((educationDetails) => educationDetails.institution)
      .map((institute) => institute._id);
    const otherIntitution = myInstitution.includes(selectedOptionValue);

    if (!otherIntitution) {
      setEducationInstitutionModal(true);
    }
    field.onChange(option);
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
    if (selectedImage) {
      dispatch(setFormDocuments(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    if (imageUrlRes) {
      uploadImage(imageUrlRes.upload_url);
      dispatch(setFormImage(imageUrlRes));
    }
  }, [imageUrlRes]);

  const onDraftSubmit = async() => {
      const skillsSelected = watch('skills') && watch('skills')?.map((skill) => skill.value);
      const interestsSelected = watch('interests') && watch('interests').map((skill) => skill.value);
      const toolsSelected = watch('tools') && watch('tools')?.map((skill) => skill.value);

      const reqData = {
        team_type: 'CLUB',
        name: watch('clubName'),
        team_logo: imageUrlRes?.file_key || null,
        tagline: watch('clubTagline') || null,
        introduction: watch('clubIntroduction') || null,
        education_institute: watch('educationInstitution')?.value || null,
        interests: interestsSelected || null,
        languages_supported: null,
        tools: toolsSelected || null,
        skills: skillsSelected || null,
        university_webpage: clubData?.university_webpage || null,
        linked_in: clubData?.linked_in || null,
        email: clubData?.email || null,
        email_code: clubData?.email_code || null,
        website: clubData?.website || null,
        // availibility: null,
        creation_status: 'DRAFT',
      };

      if (params?.id) {
       await dispatch(
          updateDraftClub({
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
       await dispatch(
          createDraftClub({
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

  const onSubmit = async(data) => {
    let otherIntitution;
    if (!location.pathname.includes('profile-edit')) {
      const selectedOptionValue = selectedOption?.value;
      const myInstitution = userDetailsData?.talent_info?.educational_institute
        .map((educationDetails) => educationDetails.institution)
        .map((institute) => institute._id);

      otherIntitution = myInstitution?.includes(selectedOptionValue);
    }

    if (!location.pathname.includes('profile-edit') && !otherIntitution) {
      setEducationInstitutionModal(true);
    } else {
      const { clubName, clubTagline, clubIntroduction, interests, tools, skills, educationInstitution } = data;
      const skillsSelected = skills.map((skill) => skill.value);
      const interestsSelected = interests.map((skill) => skill.value);
      const toolsSelected = tools?.map((skill) => skill.value);

      let reqData;

      if (location.pathname.includes('profile-edit')) {
        const onApiSuccess = () => {
          navigate(`/${userProfileEdit.club}/profile-details`);
        };

        if (imageUrlRes) {
          reqData = {
            _id: userDetailsData._id,
            team_logo: imageUrlRes.file_key,
            tagline: clubTagline,
            introduction: clubIntroduction,
            interests: interestsSelected,
            tools: toolsSelected,
            skills: skillsSelected,
            selectedImagePreview,
          };

          const removeEmpty = removeEmptyKeys(reqData);
          dispatch(setClubCreateDataAction(removeEmpty));

          dispatch(updateClub(removeEmptyKeys(removeEmpty), onApiSuccess));
        } else {
          reqData = {
            _id: userDetailsData._id,
            tagline: clubTagline,
            introduction: clubIntroduction,
            interests: interestsSelected,
            tools: toolsSelected,
            skills: skillsSelected,
          };

          const removeEmpty = removeEmptyKeys(reqData);
          dispatch(setClubCreateDataAction(removeEmpty));

          if (selectedImage && selectedImagePreview) {
            dispatch(updateClub(removeEmptyKeys(removeEmpty), onApiSuccess));
          } else {
            dispatch(updateClub({ ...removeEmptyKeys(removeEmpty), team_logo: '' }, onApiSuccess));
          }
        }
      } else {
        await  onDraftSubmit();
        // eslint-disable-next-line no-lonely-if
        if (imageUrlRes) {
          reqData = {
            name: clubName,
            team_logo: imageUrlRes.file_key,
            tagline: clubTagline,
            introduction: clubIntroduction,
            interests: interestsSelected,
            tools: toolsSelected,
            skills: skillsSelected,
            education_institute: educationInstitution,
            selectedImagePreview,
          };

          const removeEmpty = removeEmptyKeys(reqData);

          dispatch(setClubCreateDataAction(removeEmpty));
          if(params?.id){
            navigate(`/create-club/profile-details/${params?.id}`);
          }
          else{
            navigate(`/create-club/profile-details`);
          }
        
        } else {
          reqData = {
            name: clubName,
            tagline: clubTagline,
            introduction: clubIntroduction,
            interests: interestsSelected,
            tools: toolsSelected,
            skills: skillsSelected,
            education_institute: educationInstitution,
          };

          const removeEmpty = removeEmptyKeys(reqData);

          if (selectedImage && selectedImagePreview) {
            dispatch(setClubCreateDataAction(removeEmpty));
            if(params?.id){
              navigate(`/create-club/profile-details/${params?.id}`);
            }
            else{
              navigate(`/create-club/profile-details`);
            }
          } else {
            dispatch(setClubCreateDataAction({ ...removeEmpty, team_logo: '' }));
            if(params?.id){
              navigate(`/create-club/profile-details/${params?.id}`);
            }
            else{
              navigate(`/create-club/profile-details`);
            }
          }
        }
              
      }
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

  const loadInterestsOptions = async (search) => {
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

  const onGetDraftClubDetails = async (data) => {
    if (data) {
      const educationInstitutionOptionsLoaded = await loadEducationInstitutionOptions('', [], { page: 1 });
      const toolsOptionsLoaded = await loadToolsOptions();
      const skillsOptionsLoaded = await loadSkillsOptions();
      const interestsOptionsLoaded = await loadInterestsOptions();
      setClubData(data);
      setValue('clubName', data?.name || '', { shouldValidate: true });
      setValue('clubTagline', data?.tagline || '', { shouldValidate: true });
      setValue('clubIntroduction', data?.introduction || '', { shouldValidate: true });
      let institute;
      if (data?.education_institute) {
        const instituteList = educationInstitutionOptionsLoaded?.options?.find((institution) =>
          institution?.options?.find((option) => option?.value === data?.education_institute),
        );
        institute = instituteList?.options?.find((option) => option?.value === data?.education_institute);
      }

      setValue(
        'educationInstitution',
        {
          label: institute?.label,
          value: data?.education_institute,
        } || {},
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

      setValue(
        'interests',
        data?.interests?.map((tool) => ({
          label: interestsOptionsLoaded?.options?.find((toolOption) => toolOption?.value === tool)?.label,
          value: tool,
        })) || [],
        {
          shouldValidate: true,
        },
      );

      setDraftImagePreview(data?.team_logo);
    }
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(getDraftClubById({ id: params?.id, onSuccess: () => {}, onError: () => {}, onGetDraftClubDetails }));
    }
  }, [params, params?.id, dispatch]);

  const getTeamDetails = async () => {
    const res = await getTeamById(userDetailsData._id);
    if (res) {
      setClubDetails(res.data.data);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('profile-edit')) {
      getTeamDetails();
    } else {
      dispatch(clearClubCreateData());
    }
    return () => {
      dispatch(setFormDocuments(null));
    };
  }, []);

  const allToolsList = useSelector(toolsList);
  const allSkillsList = useSelector(skillsList);
  const projectAreasList = useSelector(projectAreas);
  const saveDraftIsClubLoading = useSelector(saveDraftClubLoading);

  useEffect(() => {
    if (clubCreateData) {
      if (savedIsFormImageRemoved) {
        dispatch(setIsFormImageRemoved(true));
        setSelectedImage(null);
        setSelectedImagePreview(null);
      } else if (clubCreateData?.team_logo?.length > 0 && !savedFormDocuments) {
        setSelectedImage(clubCreateData?.selectedImagePreview);
        setSelectedImagePreview(clubCreateData?.selectedImagePreview);
      } else if (savedFormDocuments) {
        setSelectedImage(savedFormDocuments);
        if (!location.pathname.includes('profile-edit')) {
          setSelectedImagePreview(URL.createObjectURL(savedFormDocuments));
          // setSelectedImagePreview(savedFormDocuments);
        } else {
          setSelectedImagePreview(savedFormDocuments);
        }
      }
      if (clubCreateData?.name?.length > 0 && !savedFormData?.clubName) {
        setValue('clubName', clubCreateData?.name, { shouldValidate: true });
      } else if (savedFormData?.clubName) {
        setValue('clubName', savedFormData?.clubName, { shouldValidate: true });
      }
      if (clubCreateData?.tagline?.length > 0 && !savedFormData?.clubTagline) {
        setValue('clubTagline', clubCreateData?.tagline, { shouldValidate: true });
      } else if (savedFormData?.clubTagline) {
        setValue('clubTagline', savedFormData?.clubTagline, { shouldValidate: true });
      }
      if (clubCreateData?.introduction?.length > 0 && !savedFormData?.clubIntroduction) {
        setValue('clubIntroduction', clubCreateData?.introduction, { shouldValidate: true });
      } else if (savedFormData?.clubIntroduction) {
        setValue('clubIntroduction', savedFormData?.clubIntroduction, { shouldValidate: true });
      }
      if (clubCreateData?.education_institute && !savedFormData?.educationInstitution) {
        setValue('educationInstitution', clubCreateData?.education_institute, { shouldValidate: true });
        setSelectedOption(clubCreateData?.education_institute);
      } else if (savedFormData?.educationInstitution) {
        setValue('educationInstitution', savedFormData?.educationInstitution, { shouldValidate: true });
        setSelectedOption(savedFormData?.educationInstitution);
      }
    } else if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: ProfileSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);

      setSelectedOption(savedFormData?.educationInstitution);
    }
    if (savedIsFormImageRemoved) {
      dispatch(setIsFormImageRemoved(true));
      setSelectedImage(null);
      setSelectedImagePreview(null);
    } else if (savedFormDocuments && !clubCreateData?.team_logo?.length) {
      setSelectedImage(savedFormDocuments);
      if (!location.pathname.includes('profile-edit')) {
        setSelectedImagePreview(URL.createObjectURL(savedFormDocuments));
      } else {
        setSelectedImagePreview(savedFormDocuments);
      }
    }
    if (savedFormImage) {
      setImageUrlRes(savedFormImage);
    }
  }, []);

  useEffect(() => {
    if (clubCreateData) {
      if (clubCreateData?.tools?.length > 0) {
        dispatch(getTools());
      }
      if (clubCreateData?.skills?.length > 0) {
        dispatch(getSkills());
      }
      if (clubCreateData?.interests?.length > 0) {
        dispatch(getProjectAreas());
      }
    }
  }, [clubCreateData]);

  useEffect(() => {
    if (location.pathname.includes('profile-edit')) {
      if (clubDetails) {
        if (clubDetails?.team_logo?.length > 0) {
          setSelectedImage(clubDetails.team_logo);
          setSelectedImagePreview(clubDetails.team_logo);
        }
        if (clubDetails?.name?.length > 0) {
          setValue('clubName', clubDetails?.name, { shouldValidate: true });
        }
        if (clubDetails?.tagline?.length > 0) {
          setValue('clubTagline', clubDetails?.tagline, { shouldValidate: true });
        }
        if (clubDetails?.introduction?.length > 0) {
          setValue('clubIntroduction', clubDetails?.introduction, { shouldValidate: true });
        }
        if (clubDetails?.education_institute) {
          setSelectedOption({
            label: clubDetails?.education_institute[0]?.name,
            value: clubDetails?.education_institute[0]._id,
          });
          setValue(
            'educationInstitution',
            {
              label: clubDetails?.education_institute[0]?.name,
              value: clubDetails?.education_institute[0]._id,
            },
            { shouldValidate: true },
          );
        }
        if (clubDetails?.interests?.length > 0) {
          setValue(
            'interests',
            clubDetails?.interests.map((interest) => ({
              label: interest.name,
              value: interest._id,
            })),
            { shouldValidate: true },
          );
        }
        if (clubDetails?.tools?.length > 0) {
          setValue(
            'tools',
            clubDetails?.tools.map((tool) => ({ label: tool.name, value: tool._id })),
            { shouldValidate: true },
          );
        }
        if (clubDetails?.skills?.length > 0) {
          setValue(
            'skills',
            clubDetails?.skills.map((skill) => ({ label: skill.name, value: skill._id })),
            { shouldValidate: true },
          );
        }
      }
    }
  }, [clubDetails]);

  useEffect(() => {
    if (clubCreateData?.interests?.length > 0 && projectAreasList?.length > 0 && !savedFormData?.interests?.length) {
      const selectedInterests = clubCreateData?.interests.map((interest) => interest);

      setValue(
        'interests',
        projectAreasList
          .filter((int) => selectedInterests.includes(int._id))
          .map((int) => ({
            label: int.name,
            value: int._id,
          })),
        { shouldValidate: true },
      );
    } else if (savedFormData?.interests?.length) {
      setValue('interests', savedFormData?.interests, { shouldValidate: true });
    }
    if (clubCreateData?.tools?.length > 0 && allToolsList?.length > 0 && !savedFormData?.tools?.length) {
      const selectedTools = clubCreateData?.tools.map((tool) => tool);
      setValue(
        'tools',
        allToolsList
          .filter((int) => selectedTools.includes(int._id))
          .map((int) => ({
            label: int.name,
            value: int._id,
          })),
        { shouldValidate: true },
      );
    } else {
      setValue('tools', savedFormData?.tools, { shouldValidate: true });
    }
    if (clubCreateData?.skills?.length > 0 && allSkillsList?.length > 0 && !savedFormData?.skills?.length) {
      const selectedSkills = clubCreateData?.skills.map((skill) => skill);
      setValue(
        'skills',
        allSkillsList
          .filter((int) => selectedSkills.includes(int._id))
          .map((int) => ({
            label: int.name,
            value: int._id,
          })),
        { shouldValidate: true },
      );
    } else if (savedFormData?.skills?.length) {
      setValue('skills', savedFormData?.skills, { shouldValidate: true });
    }
  }, [allToolsList, allSkillsList, projectAreasList, clubCreateData]);

  const onRemovePictureClick = () => {
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setImageUrlRes(null);
    dispatch(setFormDocuments(null));
    dispatch(setFormImage(null));
    dispatch(setIsFormImageRemoved(true));
  };

  const formatGroupLabel = (data) => (
    <GroupLabelWrapper>
      <span>{data.label}</span>
    </GroupLabelWrapper>
  );

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
      {educationInstitutionModal && (
        <EducationInstitutionModal
          modal={educationInstitutionModal}
          toggleModal={() => setEducationInstitutionModal(!educationInstitutionModal)}
          selectedOption={selectedOption}
        />
      )}
      {isGetDraftTeamLoading ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {openSaveLaterModal && <SaveForLaterModal modal={openSaveLaterModal} toggleModal={toggleOpenSaveLaterModal} draftType='CLUB' draftAction={onDraftSubmit} redirectionRoute={navigatedRoute} />}
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
                    {isImageUploading ? <Spinner size="sm" /> : 'Upload Club Logo'}
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
                  <Label className="form-label" for="clubName">
                    Club Name<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="clubName"
                    name="clubName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter your club's name"
                        disabled={location.pathname.includes('profile-edit')}
                        invalid={errors.clubName && true}
                        className={`${location.pathname.includes('profile-edit') ? 'disabled-input' : ''}`}
                      />
                    )}
                  />
                  {errors.clubName && <FormFeedback>{errors.clubName.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="clubTagline">
                    Club Tagline<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="clubTagline"
                    name="clubTagline"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter your club tagline in 60 character"
                        invalid={errors.clubTagline && true}
                      />
                    )}
                  />
                  {errors.clubTagline && <FormFeedback>{errors.clubTagline.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mb-1 mt-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="tools">
                    Education Institution<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="educationInstitution"
                    name="educationInstitution"
                    control={control}
                    invalid={errors.educationInstitution && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        {...field}
                        debounceTimeout={1000}
                        additional={{ page: 1 }}
                        loadOptions={loadEducationInstitutionOptions}
                        isDisabled={location.pathname.includes('profile-edit')}
                        reduceOptions={reduceGroupedOptions}
                        onChange={(selOption) => handleSelectChange(selOption, field)}
                        classNamePrefix="select"
                        placeholder="Enter your institution name"
                        theme={selectThemeColors}
                        formatGroupLabel={formatGroupLabel}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.educationInstitution,
                        })}
                      />
                    )}
                  />
                  {errors.educationInstitution && <FormFeedback>{errors.educationInstitution.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6" className="mt-auto mb-50">
                  <CustomerSupportCTA
                    type={CUSTOMER_SUPPORT_TYPES.education}
                    handleCustomerSupport={handleCustomerSupport}
                  />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="12">
                  <Label className="form-label" for="clubIntroduction">
                    Club Introduction<span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="clubIntroduction"
                    name="clubIntroduction"
                    control={control}
                    render={({ field }) => (
                      <TextEditor
                        name={field.name}
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Write your club introduction in 500 characters."
                      />
                    )}
                  />
                  {errors.clubIntroduction && <FormFeedback>{errors.clubIntroduction.message}</FormFeedback>}
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
            <CardHeader className="align-items-end">
              <h4 className="m-0 mt-1">Area of Interests</h4>
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
                    Interests<span className="label-asterisk">*</span> <i>(Top 5)</i>
                  </Label>
                  <Controller
                    id="interests"
                    name="interests"
                    control={control}
                    invalid={errors.interests && true}
                    render={({ field }) => (
                      <AsyncPaginate
                        isMulti
                        loadOptions={loadInterestsOptions}
                        classNamePrefix="select"
                        placeholder="Select up to 5 interests"
                        theme={selectThemeColors}
                        className={classNames('react-select', {
                          'is-invalid': errors && errors.interests,
                        })}
                        {...field}
                      />
                    )}
                  />
                  {errors.interests && <FormFeedback>{errors.interests.message}</FormFeedback>}
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
                        hideSelectedOptions
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
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="tools">
                    Tools
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
              </Row>

              {supportData?.tools_and_skills?.pending_requests > 0 && (
                <NoteComponent type="info" requestCount={supportData?.tools_and_skills?.pending_requests} />
              )}
              {supportData?.tools_and_skills?.approved_requests > 0 && (
                <NoteComponent type="success" requestCount={supportData?.tools_and_skills?.approved_requests} />
              )}
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
              disabled={saveDraftIsClubLoading || updateTeamIsLoading || isImageUploading}
            >
              {saveDraftIsClubLoading ? <Spinner size="sm" /> : <span>Save as Draft</span>}
            </Button>
            <div>
              <Button
                color="primary"
                outline={location.pathname.includes('profile-edit')}
                disabled={isImageUploading || !isValid || updateTeamIsLoading}
                type="submit"
              >
                {updateTeamIsLoading ? (
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

Account.propTypes = {
  setDraftSavedModal: Proptypes.func,
};

Account.defaultProps = {
  setDraftSavedModal: () => {},
};

export default Account;
