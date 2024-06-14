/* eslint-disable no-unsafe-optional-chaining */
import { useEffect } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useParams } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import classNames from 'classnames';
import { Label, Row, Col, Input, Form, Button, Card, CardHeader, CardBody, FormFeedback, Spinner } from 'reactstrap';
import * as yup from 'yup';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequirementsFormContainer } from '../style';
import theme from '../../../configs/themeVariables';
import { UploadIconContainer } from '../../Onboarding/style';
import { saveDraftProject } from '../../../redux/actions/createProjectActions';
import { saveDraftProjectId, saveDraftProjectLoading } from '../../../redux/selectors/createProjectSelectors';
import { removeEmptyKeys, filteredFormSchema } from '../../../utility/Utils';
import { formData } from '../../../redux/selectors/formDataSelectors';
import { setFormData } from '../../../redux/reducers/formData';

const Listing = ({ stepper, setListingDetails, setDraftSavedModal, projectDetails, files, draftListingDetails }) => {
  const ListingDetailsSchema = yup.object().shape({
    listingOption: yup.string().required('Select one'),
    startDate: yup.object().when('listingOption', {
      is: (listingOption) => listingOption === 'select-duration',
      then: () => yup.date().typeError('Start date is required').required('Start date is required'),
    }),
    endDate: yup.date().when('listingOption', {
      is: (listingOption) => listingOption === 'select-duration',
      then: () => yup.date().typeError('End date is required').required('End date is required'),
    }),
    duration: yup.number().when('listingOption', {
      is: (listingOption) => listingOption === 'enter-duration',
      then: () =>
        yup
          .number()
          .min(1, 'Must be at least 1')
          .max(90, 'Must be 90 or less')
          .integer('Must be a number')
          .required('Number is required')
          .typeError('Must be a number'),
    }),
  });

  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    resetField,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ListingDetailsSchema),
    defaultValues: {},
  });

  const params = useParams();
  const dispatch = useDispatch();
  const draftProjectId = useSelector(saveDraftProjectId);
  const saveDraftProjectIsLoading = useSelector(saveDraftProjectLoading);

  const onSaveDraftSuccess = () => setDraftSavedModal(true);

  const handleSaveDraft = () => {
    let localListingDetails;

    if (!watch('listingOption')) {
      trigger('listingOption');
    } else if (watch('listingOption') === 'select-duration') {
      trigger('startDate');
      trigger('endDate');
    } else if (watch('listingOption') === 'enter-duration') {
      trigger('duration');
    }

    if (
      watch('listingOption') === 'select-duration' &&
      watch('startDate') &&
      watch('startDate')?.length > 0 &&
      watch('endDate') &&
      watch('endDate')?.length > 0
    ) {
      const requiredFormData = {
        listingOption: watch('listingOption'),
        startDate: new Date(watch('startDate')),
        endDate: new Date(watch('endDate')),
      };
      setListingDetails(requiredFormData);
      localListingDetails = requiredFormData;
    } else if (watch('listingOption') === 'enter-duration' && watch('duration')) {
      const newData = {
        listingOption: watch('listingOption'),
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + parseInt(watch('duration'), 10))),
        duration: watch('duration'),
      };
      setListingDetails(newData);
      localListingDetails = newData;
    }

    let details;

    if (files.length > 0) {
      const documents = files.map((file) => ({
        file_name: file.file.name,
        file_key: file.uploadData.file_key,
      }));

      details = {
        name: projectDetails?.projectName.trim(),
        description: projectDetails?.projectDescription,
        expected_duration: {
          duration: projectDetails?.expectedDuration,
          duration_type: projectDetails?.expectedDurationPeriod?.value,
        },
        documents,
      };
    } else {
      details = {
        name: projectDetails?.projectName.trim(),
        description: projectDetails?.projectDescription,
        expected_duration: {
          duration: projectDetails?.expectedDuration,
          duration_type: projectDetails?.expectedDurationPeriod?.value,
        },
      };
    }

    const proficiency = {
      skills: projectDetails?.skills.map((skill) => skill.value),
      tools: projectDetails?.tools?.map((tool) => tool.value),
    };
    const availability = {
      timezone: projectDetails?.preferredWorkingTimeZone.value._id,
      time_overlap: projectDetails?.minTimeOverlapHr,
      weekdays_avl: {
        start_time: projectDetails?.availabilityDays?.includes('weekdays')
          ? projectDetails?.weekdayStartTime?.value
          : null,
        end_time: projectDetails?.availabilityDays?.includes('weekdays') ? projectDetails?.weekdayEndTime?.value : null,
        days: projectDetails?.availabilityDays?.includes('weekdays') ? projectDetails?.weekdays : null,
      },
      weekends_avl: {
        start_time: projectDetails?.availabilityDays?.includes('weekends')
          ? projectDetails?.weekendStartTime?.value
          : null,
        end_time: projectDetails?.availabilityDays?.includes('weekends') ? projectDetails?.weekendEndTime?.value : null,
        days: projectDetails?.availabilityDays?.includes('weekends') ? projectDetails?.weekends : null,
      },
    };
    const countries = {
      included: projectDetails?.includedCountriesSelection?.map((country) => country.value),
      excluded: projectDetails?.excludedCountriesSelection?.map((country) => country.value),
    };
    const pay_type = {
      currency: projectDetails?.currencyType?.value?._id,
      variable_cost: projectDetails?.projectPayType !== 'fixed-price',
      fixed_cost: projectDetails?.projectPayType === 'fixed-price' ? parseInt(projectDetails?.projectFixedCost, 10) : 0,
    };
    const nda = {
      is_nda: projectDetails?.nda === 'yes',
    };

    const start_date = Date.parse(localListingDetails?.startDate);
    const end_date = Date.parse(localListingDetails?.endDate);

    const listing_details = {
      start_date,
      end_date,
    };

    const requiredData = {
      details,
      proficiency,
      availability,
      countries,
      pay_type,
      nda,
      listing_details,
    };

    dispatch(
      saveDraftProject({
        projectId: params?.projectId || draftProjectId,
        data: removeEmptyKeys(requiredData),
        onSuccess: onSaveDraftSuccess,
      }),
    );
  };

  const savedFormData = useSelector(formData);

  const localFormData = useWatch({ control });

  useEffect(() => {
    const allData = { ...savedFormData, ...localFormData };
    dispatch(setFormData(allData));
  }, [localFormData]);

  const onSubmit = () => {
    if (!watch('listingOption')) {
      trigger('listingOption');
    } else if (watch('listingOption') === 'select-duration') {
      trigger('startDate');
      trigger('endDate');
    } else if (watch('listingOption') === 'enter-duration') {
      trigger('duration');
    }

    if (
      watch('listingOption') === 'select-duration' &&
      watch('startDate') &&
      watch('startDate')?.length > 0 &&
      watch('endDate') &&
      watch('endDate')?.length > 0
    ) {
      const requiredFormData = {
        listingOption: watch('listingOption'),
        startDate: new Date(watch('startDate')),
        endDate: new Date(watch('endDate')),
      };

      setListingDetails(requiredFormData);
      stepper.next();
    } else if (watch('listingOption') === 'enter-duration' && watch('duration')) {
      const newData = {
        listingOption: watch('listingOption'),
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + parseInt(watch('duration'), 10))),
        duration: watch('duration'),
      };

      setListingDetails(newData);
      stepper.next();
    }
  };

  useEffect(() => {
    if (params?.projectId) {
      reset(draftListingDetails);
    }
  }, [draftListingDetails]);

  useEffect(() => {
    if (savedFormData) {
      const requiredFields = filteredFormSchema({
        savedData: savedFormData,
        formSchemaFields: ListingDetailsSchema.fields,
      });
      reset(requiredFields);
      const keysWithValues = Object.keys(requiredFields).filter((key) => requiredFields[key]);
      trigger(keysWithValues);
    }
  }, []);

  return (
    <RequirementsFormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <h4 className="m-0 mt-1">Project Listing Details</h4>
          </CardHeader>
          <hr className="m-0 card-header-border" />
          <CardBody>
            <Row className="mb-1">
              <Controller
                control={control}
                name="listingOption"
                render={({ field }) => (
                  <div className="demo-inline-spacing mx-25">
                    <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
                      <Input
                        type="radio"
                        {...field}
                        id="enter-duration"
                        checked={field.value === 'enter-duration'}
                        onChange={async (e) => {
                          clearErrors('startDate');
                          clearErrors('endDate');
                          resetField('startDate');
                          resetField('endDate');
                          setValue('startDate', undefined);
                          setValue('endDate', undefined);

                          const isChecked = e.target.checked;
                          const value = 'enter-duration';

                          if (isChecked) {
                            field.onChange(value);
                          } else {
                            field.onChange('');
                          }
                        }}
                      />
                      <Label for="enter-duration" className="form-check-label fw-bold">
                        <h5 className="m-0">List in marketplace immediately</h5>
                      </Label>
                    </div>
                  </div>
                )}
              />
            </Row>
            <Row className="d-flex align-items-center">
              <Col sm="12" md="12" lg="7" className="d-flex align-items-center ps-3">
                <h5 className="fw-light m-0">De-list After</h5>
                <Col sm="6" md="4" lg="3" className="mx-1">
                  <Controller
                    id="duration"
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        disabled={watch('listingOption') !== 'enter-duration'}
                        type="number"
                        min={0}
                        onWheel={(e) => e.target.blur()}
                        placeholder="number of"
                        invalid={errors.duration && true}
                      />
                    )}
                  />
                </Col>
                <h5 className="fw-light m-0">Days</h5>
              </Col>
              {errors.duration && <FormFeedback>{errors.duration.message}</FormFeedback>}
            </Row>
            <Row className="mb-1 mt-2">
              <Controller
                control={control}
                name="listingOption"
                render={({ field }) => (
                  <div className="demo-inline-spacing mx-25">
                    <div className="form-check form-check-inline checkbox-custom-margin custom-checkbox-border">
                      <Input
                        type="radio"
                        {...field}
                        id="select-duration"
                        checked={field.value === 'select-duration'}
                        onChange={async (e) => {
                          clearErrors('duration');
                          setValue('duration', '');

                          const isChecked = e.target.checked;
                          const value = 'select-duration';

                          if (isChecked) {
                            field.onChange(value);
                          } else {
                            field.onChange('');
                          }
                        }}
                      />
                      <Label for="select-duration" className="form-check-label fw-bold">
                        <h5 className="m-0">Select custom listing duration</h5>
                      </Label>
                    </div>
                  </div>
                )}
              />
            </Row>
            <Row className="mb-1">
              <Col sm="12" md="6" lg="4" className="ps-3">
                <Label className="form-label" for="startDate">
                  Listing Start Date<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  control={control}
                  id="startDate"
                  name="startDate"
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      disabled={watch('listingOption') !== 'select-duration'}
                      placeholder="Select start date"
                      options={{
                        minDate: 'today',
                        maxDate: new Date().setMonth(new Date().getMonth() + 3),
                        dateFormat: 'M d, Y',
                      }}
                      className={classNames('form-control', {
                        'is-invalid': errors && errors.startDate,
                      })}
                    />
                  )}
                />
                {errors.startDate && <FormFeedback>{errors.startDate.message}</FormFeedback>}
              </Col>
              <Col sm="12" md="6" lg="4" className="ps-3">
                <Label className="form-label" for="endDate">
                  Listing End Date<span className="label-asterisk">*</span>
                </Label>
                <Controller
                  control={control}
                  id="endDate"
                  name="endDate"
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      disabled={watch('listingOption') !== 'select-duration'}
                      placeholder="Select end date"
                      options={{
                        minDate: watch('startDate')
                          ? new Date(watch('startDate')[0])?.setDate(watch('startDate')[0]?.getDate() + 1)
                          : 'today',
                        maxDate: watch('startDate')
                          ? new Date(watch('startDate')[0])?.setMonth(watch('startDate')[0]?.getMonth() + 3)
                          : 'today',
                        dateFormat: 'M d, Y',
                      }}
                      className={classNames('form-control', {
                        'is-invalid': errors && errors.endDate,
                      })}
                    />
                  )}
                />
                {errors.endDate && <FormFeedback>{errors.endDate.message}</FormFeedback>}
              </Col>
            </Row>
            {errors.listingOption && <FormFeedback>{errors.listingOption.message}</FormFeedback>}
          </CardBody>
        </Card>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center upload-btn cursor-pointer" onClick={() => stepper.previous()}>
            <UploadIconContainer className="px-25 py-25 p-0">
              <ChevronLeft size={18} color={theme.activeNavPillText} />
            </UploadIconContainer>
            <h5 className="fw-light mb-0 mx-75">Back</h5>
          </div>
          <div className="d-flex">
            <Button
              color="primary"
              className="me-2"
              outline
              onClick={handleSaveDraft}
              disabled={saveDraftProjectIsLoading}
            >
              {saveDraftProjectIsLoading ? <Spinner size="sm" /> : <span>Save as Draft</span>}
            </Button>
            <Button color="primary" onClick={() => onSubmit()}>
              <span className="me-50">Continue</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </Form>
    </RequirementsFormContainer>
  );
};

export default Listing;

Listing.propTypes = {
  stepper: Proptypes.object,
  setListingDetails: Proptypes.func,
  setDraftSavedModal: Proptypes.func,
  projectDetails: Proptypes.object,
  files: Proptypes.array,
  draftListingDetails: Proptypes.object,
};

Listing.defaultProps = {
  stepper: {},
  setListingDetails: () => {},
  setDraftSavedModal: () => {},
  projectDetails: {},
  files: [],
  draftListingDetails: {},
};
