/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useRef, useState } from 'react';
import { AsyncPaginate, reduceGroupedOptions } from 'react-select-async-paginate';
import * as yup from 'yup';
// import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { setClubCreateDataAction, updateClub } from '../../redux/actions/clubActions';
import { getTeamById } from '../../services/teamServices';
import { getProjectAreas, getSkills, getTools } from '../../redux/actions/staticActions';
import { projectAreas, skillsList, toolsList } from '../../redux/selectors/staticSelectors';
import { userProfileEdit } from '../../utility/constants/Constant';
import RemoveUploadedPicture from '../../@core/components/remove-uploaded-picture';
import { formData, formDocuments, formImage, isFormImageRemoved } from '../../redux/selectors/formDataSelectors';
import { setFormData, setFormDocuments, setFormImage, setIsFormImageRemoved } from '../../redux/reducers/formData';
import { clearClubCreateData } from '../../redux/reducers/clubs';

const Account = () => {
  const ProfileSchema = yup.object().shape({
    clubName: yup.string().max(30, 'Name must be 30 characters or less').required('Name is required'),
    clubTagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    educationInstitution: yup
      .object()
      .shape({
        label: yup.string(),
        value: yup.string(),
      })
      .required('Education institution is required'),
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
      .min(1, 'At least one tool is required'),
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

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [projectAreasOptions, setProjectAreasOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [imageUrlRes, setImageUrlRes] = useState(null);
  const [educationInstitutionModal, setEducationInstitutionModal] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [clubDetails, setClubDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const fileInputRef = useRef(null);

  const userDetailsData = useSelector(userData);
  const updateTeamIsLoading = useSelector(updateTeamLoading);
  const clubCreateData = useSelector((state) => state.clubs.clubCreateData);
  const savedFormData = useSelector(formData);
  const savedFormDocuments = useSelector(formDocuments);
  const savedFormImage = useSelector(formImage);
  const savedIsFormImageRemoved = useSelector(isFormImageRemoved);

  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
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
          navigate(`/create-club/profile-details`);
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
            navigate(`/create-club/profile-details`);
          } else {
            dispatch(setClubCreateDataAction({ ...removeEmpty, team_logo: '' }));
            navigate(`/create-club/profile-details`);
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
  }, []);

  const allToolsList = useSelector(toolsList);
  const allSkillsList = useSelector(skillsList);
  const projectAreasList = useSelector(projectAreas);

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

  return (
    <ProfileFormContainer className="w-75">
      {educationInstitutionModal && (
        <EducationInstitutionModal
          modal={educationInstitutionModal}
          toggleModal={() => setEducationInstitutionModal(!educationInstitutionModal)}
          selectedOption={selectedOption}
        />
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">About</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <div className="d-flex align-items-center pb-2 image-container">
              {selectedImage && selectedImagePreview ? (
                <img src={selectedImagePreview} alt="profile" className="selected-image" />
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
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Write your club introduction in 500 character"
                      rows="5"
                      invalid={errors.clubIntroduction && true}
                    />
                  )}
                />
                {errors.clubIntroduction && <FormFeedback>{errors.clubIntroduction.message}</FormFeedback>}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Area of Interests</h4>
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
          </CardBody>
        </Card>
        <div className="d-flex justify-content-end align-items-center pb-2 mt-1">
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
    </ProfileFormContainer>
  );
};

export default Account;
