import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
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
  InputGroup,
  InputGroupText,
  Label,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { ChevronRight, Info, UserPlus } from 'react-feather';
import { toast } from 'react-hot-toast';
import { AccountDetailsFormContainer, AccountImageContainer } from './style';
import IndianFlag from '../../assets/images/indian-flag.png';
import theme from '../../configs/themeVariables';

const Account = () => {
  const SignupSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    countryCode: yup.string().required(),
    mobileNumber: yup.string().required(),
    email: yup.string().email().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      countryCode: '+91',
      mobileNumber: '9876543210',
      email: 'example@email.com',
    },
  });

  const onSubmit = () => {};

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const isFileValid = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPG, JPEG, or PNG).');
      return false;
    }
    if (file.size > maxSize) {
      toast.error('File size exceeds the maximum limit (5MB).');
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

  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="m-0 mt-1">Account Details</h4>
        </CardHeader>
        <hr className="m-0" />
        <CardBody>
          <AccountDetailsFormContainer>
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
                <Button color="primary" className="ml-2 mr-1" onClick={() => fileInputRef.current.click()}>
                  Update Picture
                </Button>
              </div>
              <Info size={18} color={theme.infoIcon} id="image-info" />
              <UncontrolledTooltip placement="right" target="image-info">
                <div className="d-flex flex-column align-items-start">
                  <p className="m-0">Allowed file types:</p>
                  <p className="m-0">png, jpg, jpeg.</p>
                  <p className="m-0">Max file size: 5MB</p>
                </div>
              </UncontrolledTooltip>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="firstName">
                    First Name<span className="label-asterisk">*</span>
                  </Label>
                  <Controller
                    id="firstName"
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter first name" invalid={errors.firstName && true} />
                    )}
                  />
                  {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="lastName">
                    Last Name<span className="label-asterisk">*</span>
                  </Label>
                  <Controller
                    id="lastName"
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter last name" invalid={errors.lastName && true} />
                    )}
                  />
                  {errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
                </Col>
              </Row>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="mobileNumber">
                    Mobile number
                  </Label>
                  <Row>
                    <Col sm="3" md="3" lg="3">
                      <Controller
                        id="countryCode"
                        name="countryCode"
                        control={control}
                        render={({ field }) => (
                          <InputGroup className="input-group-merge mb-2">
                            <InputGroupText>
                              <img src={IndianFlag} alt="flag" />
                            </InputGroupText>
                            <Input
                              {...field}
                              placeholder="Enter country code"
                              className="filled-form-control"
                              disabled
                              invalid={errors.countryCode && true}
                            />
                          </InputGroup>
                        )}
                      />
                    </Col>
                    <Col sm="9" md="9" lg="9">
                      <Controller
                        id="mobileNumber"
                        name="mobileNumber"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter mobile number"
                            className="filled-form-control"
                            disabled
                            invalid={errors.mobileNumber && true}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  {errors.mobileNumber && <FormFeedback>{errors.mobileNumber.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="email">
                    Email address
                  </Label>
                  <Controller
                    id="email"
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter email address"
                        className="filled-form-control"
                        disabled
                        invalid={errors.email && true}
                      />
                    )}
                  />
                  {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                </Col>
              </Row>
            </Form>
          </AccountDetailsFormContainer>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-end">
        <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
          <span className="me-50">Next</span>
          <ChevronRight size={14} />
        </Button>
      </div>
    </>
  );
};

export default Account;
