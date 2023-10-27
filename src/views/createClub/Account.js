/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useRef, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
// import Select from 'react-select';
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
import { servicesService, skillsService, toolsService } from '../../services/staticServices';
import { profileImageUploadService, profileImageUploadToAzureService } from '../../services/talentOnboardingServices';
import { userData } from '../../redux/selectors/dashboardSelectors';
import { updateTeamLoading } from '../../redux/selectors/teamSelectors';
import { GroupLabelWrapper } from './style';
import EducationInstitutionModal from './EducationInstitutionModal';
import EmailVerifyModal from './EmailVerifyModal';

const Account = () => {
  const ProfileSchema = yup.object().shape({
    clubName: yup.string().max(30, 'Name must be 30 characters or less').required('Name is required'),
    clubTagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    educationInstitution: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .required('Education institution is required'),
    clubIntroduction: yup
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

    tools: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Five tools has to be added')
      .min(5, 'Five tools has to be added'),
    skills: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .max(5, 'Maximum of five skills can be added')
      .min(5, 'Five skills has to be added')
      .required('Skill is required'),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [servicesOptions, setServicesOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [imageUrlRes, setImageUrlRes] = useState(null);
  const [educationInstitutionModal, setEducationInstitutionModal] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [teamDetails, setTeamDetails] = useState(null);
  const fileInputRef = useRef(null);

  const userDetailsData = useSelector(userData);
  const updateTeamIsLoading = useSelector(updateTeamLoading);

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

  const onSuccess = () => {
    if (location?.state?.isEditing) {
      navigate(`/create-club/profile-details`, {
        state: { isEditing: true },
      });
    } else {
      navigate(`/create-club/profile-details`);
    }
  };

  const onSubmit = (data) => {
    const { clubName, clubTagline, clubIntroduction, services, tools, skills } = data;
    const skillsSelected = skills.map((skill) => skill.value);
    const servicesSelected = services.map((skill) => skill.value);
    const toolsSelected = tools?.map((skill) => skill.value);

    let reqData;

    if (location?.state?.isEditing) {
      if (imageUrlRes) {
        reqData = {
          _id: userDetailsData._id,
          name: clubName,
          team_logo: imageUrlRes.file_key,
          tagline: clubTagline,
          introduction: clubIntroduction,
          services: servicesSelected,
          tools: toolsSelected,
          skills: skillsSelected,
        };
      } else {
        reqData = {
          _id: userDetailsData._id,
          name: clubName,
          tagline: clubTagline,
          introduction: clubIntroduction,
          services: servicesSelected,
          tools: toolsSelected,
          skills: skillsSelected,
        };
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (imageUrlRes) {
        reqData = {
          name: clubName,
          team_logo: imageUrlRes.file_key,
          tagline: clubTagline,
          introduction: clubIntroduction,
          services: servicesSelected,
          tools: toolsSelected,
          skills: skillsSelected,
        };
      } else {
        reqData = {
          name: clubName,
          tagline: clubTagline,
          introduction: clubIntroduction,
          services: servicesSelected,
          tools: toolsSelected,
          skills: skillsSelected,
        };
      }
    }

    console.log('data -- ', data);
    console.log('reqData -- ', reqData);
    onSuccess();

    // if (location?.state?.isEditing) {
    //   const onApiSuccess = () => {
    //     navigate('/dashboard');
    //   };
    //   dispatch(updateTeam(removeEmptyKeys(reqData), onApiSuccess));
    // } else {
    //   setTeamCreateData(removeEmptyKeys(reqData));
    //   setTeamCreatedModal(true);
    // }
  };

  const loadEducationInstitutionOptions = async (search) => {
    const options = [
      {
        label: 'My Institutions',
        options: [
          { value: 'IIT - G', label: 'IIT - G' },
          { value: 'IIT - M', label: 'IIT - M' },
        ],
      },
      {
        label: 'Other Institutions',
        options: [
          { value: 'IIM', label: 'IIM' },
          { value: 'NIT', label: 'NIT' },
        ],
      },
    ];

    return { options };

    //  if (search) {
    //    return {
    //      options: toolsOptions.filter(
    //        (tool) =>
    //          tool.label.toLowerCase().startsWith(search.toLowerCase()) ||
    //          tool.label.toLowerCase().includes(search.toLowerCase()),
    //      ),
    //    };
    //  }
    //  try {
    //    const response = await toolsService();
    //    const options = response?.data?.data?.map((tool) => ({ label: tool.name, value: tool._id }));
    //    setToolsOptions(options);
    //    return {
    //      options,
    //    };
    //  } catch (error) {
    //    return { options: [] };
    //  }
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

  const onBackClick = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    if (location?.state?.isEditing) {
      if (teamDetails) {
        if (teamDetails?.team_logo.length > 0) {
          setSelectedImage(teamDetails.team_logo);
          setSelectedImagePreview(teamDetails.team_logo);
        }
        if (teamDetails?.name?.length > 0) {
          setValue('clubName', teamDetails?.name, { shouldValidate: true });
        }
        if (teamDetails?.tagline?.length > 0) {
          setValue('clubTagline', teamDetails?.tagline, { shouldValidate: true });
        }
        if (teamDetails?.introduction?.length > 0) {
          setValue('clubIntroduction', teamDetails?.introduction, { shouldValidate: true });
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
      }
    }
  }, [teamDetails]);

  const formatGroupLabel = (data) => (
    <GroupLabelWrapper>
      <span>{data.label}</span>
    </GroupLabelWrapper>
  );

  return (
    <ProfileFormContainer>
      {educationInstitutionModal && (
        <EducationInstitutionModal
          modal={educationInstitutionModal}
          toggleModal={() => setEducationInstitutionModal(!educationInstitutionModal)}
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
                  {isImageUploading ? <Spinner size="sm" /> : 'Upload Club Logo'}
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
                <Label className="form-label" for="clubName">
                  Club Name<span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="clubName"
                  name="clubName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter your club's name" invalid={errors.clubName && true} />
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
                  Education Institution
                </Label>
                <Controller
                  id="educationInstitution"
                  name="educationInstitution"
                  control={control}
                  invalid={errors.educationInstitution && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      loadOptions={loadEducationInstitutionOptions}
                      classNamePrefix="select"
                      placeholder="Enter your institution name"
                      theme={selectThemeColors}
                      formatGroupLabel={formatGroupLabel}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.educationInstitution,
                      })}
                      {...field}
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
                  id="services"
                  name="services"
                  control={control}
                  invalid={errors.services && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isMulti
                      loadOptions={loadServicesOptions}
                      classNamePrefix="select"
                      placeholder="Select up to 5 interests"
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
              disabled={isImageUploading || !isValid || updateTeamIsLoading}
              type="submit"
            >
              {updateTeamIsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">{location?.state?.isEditing ? 'Save' : 'Save & Continue'}</span>
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
