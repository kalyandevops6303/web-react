import React, { useRef, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
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
  UncontrolledTooltip,
} from 'reactstrap';
import { Camera, ChevronLeft, ChevronRight, Info, UserPlus } from 'react-feather';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { AccountImageContainer, ProfileFormContainer, UploadIconContainer } from '../Onboarding/style';
import theme from '../../configs/themeVariables';
import { returnFilteredDropdownOptions, selectThemeColors } from '../../utility/Utils';
import { languagesService, skillsService, toolsService } from '../../services/staticServices';

const Profile = () => {
  const ProfileSchema = yup.object().shape({
    teamName: yup.string().max(30, 'Name must be 30 characters or less').required('Name is required'),
    teamTagline: yup.string().max(60, 'Tagline must be 60 characters or less').required('Tagline is required'),
    teamIntroduction: yup
      .string()
      .max(150, 'Introduction must be 150 characters or less')
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
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ProfileSchema),
  });

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [servicesOptions, setServicesOptions] = useState(null);
  const [languagesOptions, setLanguagesOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const fileInputRef = useRef(null);

  const isFileValid = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && isFileValid(file)) {
      const thumbnail = URL.createObjectURL(file);
      setSelectedImage(file);
      setSelectedImagePreview(thumbnail);
    }
  };

  const onSubmit = () => {};

  const loadServicesOptions = async (search) => {
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, servicesOptions),
      };
    }
    try {
      const response = await languagesService();

      const options = response?.data?.data?.map((service) => ({ label: service.name, value: service._id }));

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

  const onBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <ProfileFormContainer>
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
                  onClick={() => fileInputRef.current.click()}
                >
                  <Camera className="me-50" />
                  Upload Team Logo
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
                    <Input {...field} placeholder="Enter your team's name" invalid={errors.teamName && true} />
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
                      placeholder="Enter your team tagline in 60 character"
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
                      placeholder="Write your team introduction in 150 character"
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
        <div className="d-flex justify-content-between align-items-center pb-2 mt-1">
          <div className="d-flex align-items-center upload-button cursor-pointer" onClick={onBackClick}>
            <UploadIconContainer>
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-bold">Back</h5>
          </div>
          <div>
            <Button color="primary" type="submit" outline>
              <span className="me-50">Save</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </Form>
    </ProfileFormContainer>
  );
};

export default Profile;
