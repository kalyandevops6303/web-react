import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap';
import { ChevronLeft, ChevronRight, Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { getUserDetails, saveProfileDetails } from '../../../redux/actions/talentOnboardingActions';
import { profileDetailsLoading, userDetailsLoading } from '../../../redux/selectors/talentOnboardingSelectors';
import AccountCreatedModal from '../AccountCreatedModal';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { filteredFormSchema, formatUrl, isUrlWithoutProtocol, removeEmptyKeys } from '../../../utility/Utils';
import { userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { formData } from '../../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData } from '../../../redux/reducers/formData';

const Social = () => {
  const SocialSchema = yup.object().shape({
    linkedInLink: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
    twitterLink: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
    githubLink: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
    otherSocialLinks: yup.array().of(
      yup.object().shape({
        linkName: yup.string().nullable(),
        link: yup.string().test('is-url', 'Please enter a valid URL', isUrlWithoutProtocol).nullable(),
      }),
    ),
  });

  const savedFormData = useSelector(formData);
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

  const localFormData = useWatch({ control });

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: SocialSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  const [accountCreatedModal, setAccountCreatedModal] = useState(null);

  const profileDetailsIsLoading = useSelector(profileDetailsLoading);
  const userDetailsIsLoading = useSelector(userDetailsLoading);
  // const checkpointCompleteIsLoading = useSelector(checkpointCompleteLoading);

  const toggleAccountCreatedModal = () => setAccountCreatedModal(!accountCreatedModal);

  const onBackClick = () => {
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/availability-details`);
    } else {
      navigate(`/${userOnboarding.talent}/availability-details`);
    }
  };

  const onSuccess = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/payment-details`);
    } else {
      navigate(`/${userOnboarding.talent}/payment-details`);
    }
  };

  const onSkipClick = () => {
    dispatch(clearAllFormData());
    if (location.pathname.includes('profile-edit')) {
      navigate(`/${userProfileEdit.talent}/payment-details`);
    } else {
      navigate(`/${userOnboarding.talent}/payment-details`);
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
    };

    dispatch(saveProfileDetails(removeEmptyKeys(reqData), onSuccess));
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
      if (!obj.hasOwnProperty('link') || !obj.hasOwnProperty('linkName')) {
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
          setValue('linkedInLink', savedFormData?.linkedInLink);
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
          setValue('twitterLink', savedFormData?.twitterLink);
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
          setValue('githubLink', savedFormData?.githubLink);
        }
        if (
          res?.talent_info?.social_links.filter(
            (link) => link.platform !== 'linkedIn' && link.platform !== 'twitter' && link.platform !== 'github',
          ).length > 0
        ) {
          setValue(
            'otherSocialLinks',
            savedFormData?.otherSocialLinks ||
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
          setValue('otherSocialLinks', savedFormData?.otherSocialLinks);
        }
      }
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(onGetUserDetailsSuccess));
  }, []);

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
          <Card className="w-75">
            <CardHeader>
              <h4 className="m-0 mt-1">Social Links</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="linkedInLink">
                    LinkedIn
                  </Label>
                  <Controller
                    id="linkedInLink"
                    name="linkedInLink"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter public URL" invalid={errors.linkedInLink && true} />
                    )}
                  />
                  {errors.linkedInLink && <FormFeedback>{errors.linkedInLink.message}</FormFeedback>}
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Label className="form-label" for="twitterLink">
                    Twitter
                  </Label>
                  <Controller
                    id="twitterLink"
                    name="twitterLink"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter URL" invalid={errors.twitterLink && true} />
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
                      <Input {...field} placeholder="Enter URL" invalid={errors.githubLink && true} />
                    )}
                  />
                  {errors.githubLink && <FormFeedback>{errors.githubLink.message}</FormFeedback>}
                </Col>
              </Row>
              <hr className="m-0 card-header-border mt-2" />
              <h5 className="m-0 mt-2 mb-1">Other</h5>
              {otherSocialLinksFields.map((item, index) => (
                <Row key={item.id} className="mb-1">
                  <Col sm="12" md="12" lg="5">
                    <Label className="form-label" for={`otherSocialLinks[${index}].linkName`}>
                      Website
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
                          placeholder="Enter description"
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
                          {errors.otherSocialLinks[index].linkName && errors.otherSocialLinks[index].linkName.message}
                        </FormFeedback>
                      )}
                  </Col>
                  <Col sm="12" md="12" lg="5">
                    <Label className="form-label" for={`otherSocialLinks[${index}].link`}>
                      Link
                    </Label>
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
                          placeholder="Enter URL"
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
                  </Col>
                  <Col sm="12" md="12" lg="2">
                    {index !== 0 && (
                      <Button type="button" color="flat-danger" className="mt-2" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    )}
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
                  <h5 className="fw-bold">Add New</h5>
                </div>
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
        </Form>
      )}
    </ProfileFormContainer>
  );
};

export default Social;
