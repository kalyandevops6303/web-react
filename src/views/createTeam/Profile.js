/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useRef, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
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
import { Camera, ChevronLeft, ChevronRight, Info, UserPlus } from 'react-feather';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { AccountImageContainer, ProfileFormContainer, UploadIconContainer } from '../Onboarding/style';
import theme from '../../configs/themeVariables';
import { removeEmptyKeys, returnFilteredDropdownOptions, selectThemeColors } from '../../utility/Utils';
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
import { updateTeam } from '../../redux/actions/teamsActions';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { getTeamById } from '../../services/teamServices';
import { updateTeamLoading } from '../../redux/selectors/teamSelectors';
import InviteTalentToTeam from '../invite-talent-to-team';
import { clearModalData } from '../../redux/reducers/inviteTalent';
import { getLanguages } from '../../redux/actions/staticActions';
import { languages } from '../../redux/selectors/staticSelectors';
import TeamCreatingModal from './TeamCreatingModal';

const Profile = () => {
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

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      availabilityDays: [],
      weekdays: [],
      weekends: [],
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [teamCreatedModal, setTeamCreatedModal] = useState(null);
  const [teamCreatingModal, setTeamCreatingModal] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [inviteTalentToTeamModal, setInviteTalentToTeamModal] = useState(false);
  const [inviteTeamMemberModal, setInviteTeamMemberModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
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

  const userDetailsData = useSelector(userData);
  const updateTeamIsLoading = useSelector(updateTeamLoading);
  const languagesData = useSelector(languages);

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && isFileValid(file)) {
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
    }
  }, [imageUrlRes]);

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

    if (location?.state?.isEditing) {
      if (imageUrlRes) {
        reqData = {
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
      } else {
        reqData = {
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
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (imageUrlRes) {
        reqData = {
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
      } else {
        reqData = {
          name: teamName,
          tagline: teamTagline,
          introduction: teamIntroduction,
          services: servicesSelected,
          languages_supported,
          tools: toolsSelected,
          skills: skillsSelected,
          availability,
        };
      }
    }

    if (location?.state?.isEditing) {
      const onApiSuccess = () => {
        navigate('/dashboard');
      };
      dispatch(updateTeam(removeEmptyKeys(reqData), onApiSuccess));
    } else {
      setTeamCreateData(removeEmptyKeys(reqData));
      setTeamCreatingModal(true);
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

  const onBackClick = () => {
    navigate('/dashboard');
  };

  const availabilityDays = watch('availabilityDays');

  const getTeamDetails = async () => {
    const res = await getTeamById(userDetailsData._id);
    if (res) {
      setTeamDetails(res.data.data);
    }
  };

  useEffect(() => {
    getTeamDetails();
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    if (location?.state?.isEditing) {
      if (teamDetails) {
        if (teamDetails?.team_logo.length > 0) {
          setSelectedImage(teamDetails.team_logo);
          setSelectedImagePreview(teamDetails.team_logo);
        }
        if (teamDetails?.name?.length > 0) {
          setValue('teamName', teamDetails?.name, { shouldValidate: true });
        }
        if (teamDetails?.tagline?.length > 0) {
          setValue('teamTagline', teamDetails?.tagline, { shouldValidate: true });
        }
        if (teamDetails?.introduction?.length > 0) {
          setValue('teamIntroduction', teamDetails?.introduction, { shouldValidate: true });
        }
        if (teamDetails?.services?.length > 0) {
          setValue(
            'services',
            teamDetails?.services.map((service) => ({
              label: service.name,
              value: service._id,
            })),
            { shouldValidate: true },
          );
        }
        if (teamDetails?.tools.length > 0) {
          setValue(
            'tools',
            teamDetails?.tools.map((tool) => ({ label: tool.name, value: tool._id })),
            { shouldValidate: true },
          );
        }
        if (teamDetails?.skills.length > 0) {
          setValue(
            'skills',
            teamDetails?.skills.map((skill) => ({ label: skill.name, value: skill._id })),
            { shouldValidate: true },
          );
        }
        if ('timezone' in teamDetails?.availability) {
          if (teamDetails?.availability?.timezone) {
            setValue(
              'preferredWorkingTimeZone',
              {
                label: `${teamDetails?.availability?.timezone?.name} (${teamDetails?.availability?.timezone?.abbreviation})`,
                value: teamDetails?.availability?.timezone,
              },
              { shouldValidate: true },
            );
          }

          let talentAvailabilityDays = [];
          if ('weekdays_avl' in teamDetails?.availability) {
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
          }
          if ('weekends_avl' in teamDetails?.availability) {
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
          }

          setValue('availabilityDays', talentAvailabilityDays, { shouldValidate: true });
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

  return (
    <ProfileFormContainer>
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
                  color="primary"
                  className="ml-2 mr-1 d-flex align-items-center py-50"
                  disabled={isImageUploading}
                  onClick={() => fileInputRef.current.click()}
                >
                  <Camera className="me-50" />
                  {isImageUploading ? <Spinner size="sm" /> : 'Upload Team Logo'}
                </Button>
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
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Write your team introduction in 500 characters"
                      rows="5"
                      invalid={errors.teamIntroduction && true}
                    />
                  )}
                />
                {errors.teamIntroduction && <FormFeedback>{errors.teamIntroduction.message}</FormFeedback>}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Service</h4>
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
                  <FormFeedback>{errors.preferredWorkingTimeZone.label.message}</FormFeedback>
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
              {availabilityDays && (availabilityDays.includes('weekdays') || availabilityDays.includes('weekends')) && (
                <>
                  {availabilityDays.includes('weekdays') && (
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
                            <FormFeedback>{errors.weekdayStartTime.label.message}</FormFeedback>
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
                                        (t) => parseInt(t.value, 10) > parseInt(watch('weekdayStartTime').value, 10),
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
                          {errors.weekdayEndTime && <FormFeedback>{errors.weekdayEndTime.label.message}</FormFeedback>}
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
                                  checked={field.value.includes('TUESDAY')}
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
                                  checked={field.value.includes('WEDNESDAY')}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = 'WEDNESDAY';

                                    if (isChecked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== value));
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
                                      field.onChange(field.value.filter((v) => v !== value));
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
                                      field.onChange(field.value.filter((v) => v !== value));
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
                                options={
                                  watch('weekendEndTime')
                                    ? timeOptions.filter(
                                        (t) => parseInt(t.value, 10) < parseInt(watch('weekendEndTime').value, 10),
                                      )
                                    : timeOptions
                                }
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
                                        (t) => parseInt(t.value, 10) > parseInt(watch('weekendStartTime').value, 10),
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
                          {errors.weekendEndTime && <FormFeedback>{errors.weekendEndTime.label.message}</FormFeedback>}
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
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1">
          <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Button
              color="primary"
              outline={location?.state?.isEditing}
              disabled={isImageUploading || updateTeamIsLoading}
              onClick={handleClick}
            >
              {updateTeamIsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">{location?.state?.isEditing ? 'Save' : 'Create Team'}</span>
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

export default Profile;
