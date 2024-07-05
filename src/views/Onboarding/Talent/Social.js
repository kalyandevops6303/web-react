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
} from 'reactstrap';
import { ChevronLeft, ChevronRight, Info, Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileFormContainer, UploadIconContainer } from '../style';
import theme from '../../../configs/themeVariables';
import {
  getResumeParsedDetails,
  getUserDetails,
  saveProfileDetails,
} from '../../../redux/actions/talentOnboardingActions';
import {
  profileDetailsLoading,
  resumeParsedDetails,
  resumeParsedDetailsLoading,
  userDetailsLoading,
} from '../../../redux/selectors/talentOnboardingSelectors';
import AccountCreatedModal from '../AccountCreatedModal';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { filteredFormSchema, formatUrl, isEmpty, isUrlWithoutProtocol, removeEmptyKeys } from '../../../utility/Utils';
import { userOnboarding, userProfileEdit } from '../../../utility/constants/Constant';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { formData, formDocuments, resumeParsed } from '../../../redux/selectors/formDataSelectors';
import { clearAllFormData, setFormData, setFormDocuments, setResumeParsed } from '../../../redux/reducers/formData';
import { resumeParsedDetailsSuccess } from '../../../redux/reducers/talentOnboarding';
import { updateParsedResumeService } from '../../../services/talentOnboardingServices';

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
  const savedFormDocuments = useSelector(formDocuments);
  const parsedResumeData = useSelector(resumeParsedDetails);
  const IsresumeParsed = useSelector(resumeParsed);
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
    if (parseResume === false && resumeParsedLoading === false) {
      const allData = { ...savedFormData, ...localFormData };
      dispatch(setFormData(allData));
    }
  }, [localFormData, parseResume, resumeParsedLoading]);

  useEffect(() => {
    dispatch(setResumeParsed(parseResume));
  }, [parseResume]);

  useEffect(() => {
    if (files?.length > 0 && !files[0].file?.name) setFiles([]);
  }, [files]);

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

    if (IsresumeParsed) {
      const resumeUpdatedData = {
        target_info: {
          ...parsedResumeData,
          social_links,
        },
      };

      dispatch(updateParsedResumeService(parsedResumeData?._id, resumeUpdatedData));
    }
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
      // eslint-disable-next-line no-unsafe-optional-chaining
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
        dispatch(setFormDocuments([fileUrl]));
      }
    }
  };

  const setResumeParsedDetails = (res) => {
    if (res) {
      if (res?.social_links.length > 0) {
        if (res?.social_links.find((link) => link.platform === 'LinkedIn')) {
          setValue('linkedInLink', res?.social_links.find((link) => link.platform === 'LinkedIn').url, {
            shouldValidate: true,
          });
        }
        if (res?.social_links.find((link) => link.platform === 'Twitter')) {
          setValue('twitterLink', res?.social_links.find((link) => link.platform === 'Twitter').url, {
            shouldValidate: true,
          });
        }
        if (res?.social_links.find((link) => link.platform === 'GitHub')) {
          setValue('githubLink', res?.social_links.find((link) => link.platform === 'GitHub').url, {
            shouldValidate: true,
          });
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
        }
      }
    }
  };
  useEffect(() => {
    if (parseResume) {
      if (parsedResumeData != null) {
        setResumeParsedDetails(parsedResumeData);
        dispatch(resumeParsedDetailsSuccess(parsedResumeData));
      } else {
        dispatch(getResumeParsedDetails(setResumeParsedDetails, savedFormDocuments[0]?.uploadData?.file_key));
      }
    } else {
      dispatch(getUserDetails(onGetUserDetailsSuccess));
    }
  }, [parseResume, parsedResumeData]);

  return (
    <ProfileFormContainer>
      {accountCreatedModal && (
        <AccountCreatedModal modal={accountCreatedModal} toggleModal={toggleAccountCreatedModal} />
      )}
      {(resumeParsed ? resumeParsedLoading : userDetailsIsLoading) ? (
        <div className="w-75">
          <ComponentSpinner className="mt-5" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="w-100">
            <Col className="w-75" xs="100" sm="100" lg="75">
              <Card className="w-100">
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
                              {errors.otherSocialLinks[index].linkName &&
                                errors.otherSocialLinks[index].linkName.message}
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
              <div className="d-flex justify-content-between align-items-center pb-2 mt-1 w-100">
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

            {!isEmpty(files) && (
              <Col>
                <Card>
                  <CardBody>
                    <div className="d-flex flex-column">
                      <div className="d-flex" style={{ backgroundColor: '#0185E426', padding: 20 }}>
                        <Col lg="fit">
                          <Info className="font-medium-3 me-50" color="#004280" />
                        </Col>

                        <Col>
                          <div className="d-flex justify-content-between w-100">
                            <span style={{ color: '#004280' }}>
                              <span className="fw-bold">Auto Fill</span>

                              <FormGroup switch>
                                <Input
                                  type="switch"
                                  checked={parseResume}
                                  onClick={() => {
                                    setParseResume(!parseResume);
                                    dispatch(setResumeParsed(!parseResume));
                                  }}
                                />
                              </FormGroup>
                            </span>
                          </div>
                        </Col>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </Form>
      )}
    </ProfileFormContainer>
  );
};

export default Social;
