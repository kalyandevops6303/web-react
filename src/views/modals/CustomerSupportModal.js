import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncPaginate } from 'react-select-async-paginate';
import '../custom-styles.scss';
import * as yup from 'yup';
import classNames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  FormFeedback,
  Input,
  Button,
  Spinner,
  Label,
  CardText,
} from 'reactstrap';
import { SupportModalWrapper } from './style';
import { getMissingName, returnFilteredDropdownOptions, selectThemeColors } from '../../utility/Utils';
import theme from '../../configs/themeVariables';
import { getIssueTypeService } from '../../services/supportServices';
import { selectSavedUserData } from '../../redux/selectors/authSelectors';
import { customerSupport } from '../../redux/actions/supportActions';
import { CUSTOMER_SUPPORT_TYPES, SUPPORT_EMAIL } from '../../utility/constants/Constant';

const CustomerSupportModal = ({ modal, toggleModal, onSuccess, defaultSelected, assessment }) => {
  const [issueTypeOptions, setIssueTypeOptions] = useState(null);
  const isLoading = useSelector((state) => state.support.loading);
  const userData = useSelector(selectSavedUserData);
  const talentOnboardingData = useSelector((state) => state.talentOnboarding.userDetails);

  const getUserEmail = () => {
    const path = window.location.pathname.split('/');
    if (path.includes('talent-onboarding')) {
      return talentOnboardingData?.email;
    }
    if (path.includes('client-onboarding')) {
      // using same field for taking email of client and talent since it is stored like that
      return talentOnboardingData?.email;
    }
    if (userData?.email) {
      return userData?.email;
    }
    return '';
  };

  const userEmail = getUserEmail();

  const [defaultOption, setDefaultOption] = useState(null);
  const CustomerSupportSchema = yup.object().shape({
    issueType: yup
      .object()
      .shape({
        label: yup.string().required('Issue type is required'),
        value: yup.string().required('Issue type is required'),
      })
      .required('Issue type is required'),
    skill: yup.string().when('issueType.value', {
      is: (issueType) => issueType === CUSTOMER_SUPPORT_TYPES.missing_skill,
      then: () =>
        yup
          .string()
          .min(1, 'Skill must be at least 1 character')
          .max(150, 'Skill must be 150 characters or less')
          .required('Skill is required'),
    }),
    tool: yup.string().when('issueType.value', {
      is: (issueType) => issueType === CUSTOMER_SUPPORT_TYPES.missing_tool,
      then: () =>
        yup
          .string()
          .min(1, 'Tool must be at least 1 character')
          .max(150, 'Tool must be 150 characters or less')
          .required('Tool is required'),
    }),
    institute: yup.string().when('issueType.value', {
      is: (issueType) => issueType === CUSTOMER_SUPPORT_TYPES.missing_institute,
      then: () =>
        yup
          .string()
          .min(1, 'Institution must be at least 1 character')
          .max(150, 'Institution must be 150 characters or less')
          .required('Institution is required'),
    }),
    assessment: yup.string().when('issueType.value', {
      is: (issueType) => issueType === CUSTOMER_SUPPORT_TYPES.missing_assessment,
      then: () =>
        yup
          .string()
          .min(1, 'Assessment must be at least 1 character')
          .max(150, 'Assessment must be 150 characters or less')
          .required('Assessment is required'),
    }),
    supportDetails: yup
      .string()
      .min(50, 'Description must be at least 50 characters')
      .max(500, 'You have exeeded char limit of 500')
      .required('Description is required'),
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(CustomerSupportSchema),
    defaultValues: {
      issueType: defaultOption,
      assessment,
    },
  });

  const issueType = watch('issueType');
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const postData = {
      to_email: SUPPORT_EMAIL,
      cc_email: [userEmail],
      description: values?.supportDetails,
      issue_type: values?.issueType?.value,
      missing_name: getMissingName(values?.issueType?.value, values),
    };

    dispatch(customerSupport({ data: postData, onSuccess }));
  };

  const loadIssueTypeOptions = async (search, prevOptions, { page }) => {
    let filteredIssueTypeOptions = issueTypeOptions;

    // If there are default selected options, filter the initial options based on them
    if (defaultSelected?.length > 0) {
      const normalizedDefaultSelected = Array.isArray(defaultSelected) ? defaultSelected : [defaultSelected];
      filteredIssueTypeOptions = issueTypeOptions.filter((option) => normalizedDefaultSelected.includes(option.value));
    }

    // If there's a search term, filter the (already filtered) options based on it
    if (search) {
      return {
        options: returnFilteredDropdownOptions(search, filteredIssueTypeOptions),
      };
    }

    try {
      // Load new options from the service for the given page
      const response = await getIssueTypeService(page);
      const options = response?.data?.data?.map((project) => ({
        label: project.name, // Map the project name to the label
        value: project.type, // Map the project type to the value
      }));

      // Update the issueTypeOptions state with the new options
      setIssueTypeOptions(options);

      // Filter the new options based on defaultSelected if it exists
      let newFilteredOptions = options;
      if (defaultSelected && defaultSelected.length > 0) {
        const normalizedDefaultSelected = Array.isArray(defaultSelected) ? defaultSelected : [defaultSelected];
        newFilteredOptions = options.filter((option) => normalizedDefaultSelected.includes(option.value));
      }

      // Return the combined list of previous and new filtered options
      return {
        options: [...prevOptions, ...newFilteredOptions],
        hasMore: response?.data?.metadata?.has_next_page, // Whether there are more pages to load
        additional: {
          page: page + 1, // Increment the page number for the next request
        },
      };
    } catch (error) {
      return { options: [], hasMore: false }; // In case of an error, return no options and indicate no more pages
    }
  };

  useEffect(() => {
    // Loading issue types once modal is opened
    const getTypes = async () => {
      const response = await getIssueTypeService();
      const options = response?.data?.data?.map((project) => ({ label: project.name, value: project.type }));
      setIssueTypeOptions(options);

      // Find matching options for each element in defaultSelected
      const selectedOptions = options.filter((option) => defaultSelected.includes(option.value));
      setDefaultOption(selectedOptions);

      // Set the default value in the form to show selected option
      setValue('issueType', selectedOptions?.[0]);
    };
    if (defaultSelected?.length > 0) {
      getTypes();
    }
  }, []);

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style " className="modal-dialog trumio">
      <ModalHeader toggle={isLoading ? null : toggleModal} />
      <ModalBody className="pt-0 px-10">
        <h2 className="font-large-1 text-center mb-7 text-[28px]">Email Customer Support</h2>
        <SupportModalWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="8">
                <div className="d-flex align-items-center">
                  <CardText className="m-0 me-75 mr-3 fw-bold">TO: </CardText>{' '}
                  <Input
                    style={{ border: `1px solid ${theme.inputBorder}`, background: theme.inputBackground }}
                    disabled
                    value={SUPPORT_EMAIL}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="8">
                <div className="d-flex align-items-center">
                  <CardText className="m-0 me-75 mr-3 fw-bold">CC: </CardText>{' '}
                  <Input
                    style={{ border: `1px solid ${theme.inputBorder}`, background: theme.inputBackground }}
                    disabled
                    value={userEmail}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="7">
                <Label className="form-label text-grey font-normal text-sm" for="issueType">
                  Issue Type
                </Label>
                <Controller
                  id="issueType"
                  name="issueType"
                  control={control}
                  invalid={errors.issueType && true}
                  render={({ field }) => (
                    <AsyncPaginate
                      isDisabled={defaultSelected?.length === 1}
                      debounceTimeout={1000}
                      additional={{ page: 1 }}
                      loadOptions={loadIssueTypeOptions}
                      classNamePrefix="select"
                      placeholder="Select issue type"
                      theme={selectThemeColors}
                      className={classNames('react-select', {
                        'is-invalid': errors && errors.issueType,
                      })}
                      {...field}
                    />
                  )}
                />
                {errors.issueType && <FormFeedback>{errors.issueType?.label?.message}</FormFeedback>}
              </Col>

              {issueType?.value === CUSTOMER_SUPPORT_TYPES.missing_skill && (
                <Col sm="12" md="12" lg="5">
                  <Label className="form-label" for="skill">
                    Skill
                    <span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="skill"
                    name="skill"
                    control={control}
                    invalid={errors.skill && true}
                    render={({ field }) => (
                      <Input
                        {...field}
                        step="any"
                        onWheel={(e) => e.target.blur()}
                        placeholder="Enter skill"
                        invalid={errors.skill && true}
                      />
                    )}
                  />
                  {errors.skill && <FormFeedback>{errors.skill.message}</FormFeedback>}
                </Col>
              )}
              {issueType?.value === CUSTOMER_SUPPORT_TYPES.missing_tool && (
                <Col sm="12" md="12" lg="5">
                  <Label className="form-label" for="tool">
                    Tool
                    <span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="tool"
                    name="tool"
                    control={control}
                    invalid={errors.tool && true}
                    render={({ field }) => (
                      <Input
                        {...field}
                        step="any"
                        onWheel={(e) => e.target.blur()}
                        placeholder="Enter tool"
                        invalid={errors.tool && true}
                      />
                    )}
                  />
                  {errors.tool && <FormFeedback>{errors.tool.message}</FormFeedback>}
                </Col>
              )}
              {issueType?.value === CUSTOMER_SUPPORT_TYPES.missing_institute && (
                <Col sm="12" md="12" lg="5">
                  <Label className="form-label" for="institute">
                    Institute
                    <span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="institute"
                    name="institute"
                    control={control}
                    invalid={errors.institute && true}
                    render={({ field }) => (
                      <Input
                        {...field}
                        step="any"
                        onWheel={(e) => e.target.blur()}
                        placeholder="Enter institute"
                        invalid={errors.institute && true}
                        style={{ height: '54px' }}
                      />
                    )}
                  />
                  {errors.institute && <FormFeedback>{errors.institute.message}</FormFeedback>}
                </Col>
              )}
              {issueType?.value === CUSTOMER_SUPPORT_TYPES.missing_assessment && (
                <Col sm="12" md="12" lg="5">
                  <Label className="form-label" for="assessment">
                    Assessment
                    <span className="label-asterisk me-50">*</span>
                  </Label>
                  <Controller
                    id="assessment"
                    name="assessment"
                    control={control}
                    invalid={errors.tool && true}
                    render={({ field }) => (
                      <Input
                        {...field}
                        step="any"
                        onWheel={(e) => e.target.blur()}
                        placeholder="Enter Assessment"
                        invalid={errors.assessment && true}
                      />
                    )}
                  />
                  {errors.tool && <FormFeedback>{errors.assessment.message}</FormFeedback>}
                </Col>
              )}
            </Row>

            <Row className="mb-1">
              <Col sm="12" md="12" lg="12">
                <Label className="form-label text-grey font-normal text-sm" for="skill">
                  Tell us in detail how we can help you?
                  <span className="label-asterisk me-50">*</span>
                </Label>
                <Controller
                  id="supportDetails"
                  name="supportDetails"
                  control={control}
                  label="Details"
                  invalid={errors.supportDetails && true}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      placeholder="Enter details"
                      rows="6"
                      invalid={errors.supportDetails && true}
                    />
                  )}
                />
                {errors.supportDetails && <FormFeedback>{errors.supportDetails.message}</FormFeedback>}
              </Col>
            </Row>
            <div className="d-flex justify-content-end py-1">
              <Button outline color="primary" className="me-2" onClick={toggleModal}>
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={!isValid || isLoading}>
                {isLoading ? <Spinner size="sm" /> : 'Submit'}
              </Button>
            </div>
          </Form>
        </SupportModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default CustomerSupportModal;

CustomerSupportModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  primaryFilter: Proptypes.string,
  projectDetail: Proptypes.object,
  selectedTimeline: Proptypes.object,
  onSuccess: Proptypes.func,
  defaultSelected: Proptypes.string,
};

CustomerSupportModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  primaryFilter: '',
  projectDetail: null,
  selectedTimeline: null,
  onSuccess: () => {},
  defaultSelected: [],
};
