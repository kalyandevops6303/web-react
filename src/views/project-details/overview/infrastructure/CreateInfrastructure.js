import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as yup from 'yup';
import classNames from 'classnames';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Button, Col, Form, FormFeedback, Label, Row, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ShowToastMessage from '../../../../@core/components/toast';
import { ERROR } from '../../../../utility/constants/ToastTypes';
import { selectThemeColors } from '@utils';
import { returnFilteredDropdownOptions } from '../../../../utility/Utils';
import { createInfraService } from '../../../../services/infrastructureServices';
import { formData } from '../../../../redux/selectors/formDataSelectors';
import { setFormData } from '../../../../redux/reducers/formData';
import { availableServices, openaiModels } from './constants';

const CreateInfrastructure = ({ updateInfraData }) => {
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [serviceOptions, setServiceOptions] = useState(null);
    const [modelOptions, setModelOptions] = useState(null);

    const InfrastructureSchema = yup.object().shape({
        servicesSelected: yup
            .array()
            .of(
                yup.object().shape({
                    service: yup.object().shape({
                        label: yup.string().required('Service is required'),
                        value: yup.string().required('Service is required')
                    }).required('Service is required'),
                    model: yup.object().shape({
                        label: yup.string(),
                        value: yup.string()
                    }).when('service.value', {
                        is: (val) => val === 'openai',
                        then: yup.object().shape({
                            label: yup.string().required('Model is required'),
                            value: yup.string().required('Model is required')
                        }),
                        otherwise: yup.object().notRequired()
                    })
                })
            )
            .min(1, 'At least one service is required')
            .required('Service is required'),
    });

    const savedFormData = useSelector(formData);
    const {
        control,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(InfrastructureSchema),
        defaultValues: {
            servicesSelected: [{}],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'servicesSelected',
    });

    const dispatch = useDispatch();
    const params = useParams();
    const localFormData = useWatch({ control });

    useEffect(() => {
        const allData = { ...savedFormData, ...localFormData };
        if (JSON.stringify(savedFormData) !== JSON.stringify(allData)) {
            dispatch(setFormData(allData));
        }
    }, [localFormData, dispatch, savedFormData]);


    const onSubmit = ({ servicesSelected }) => {
        setIsSubmitLoading(true);

        const formattedServicesSelected = servicesSelected.map((serviceItem) => {
            let formattedServiceItem = {
                display_name: serviceItem?.service?.label,
                unique_reference_name: serviceItem?.service?.value
            }

            // check and append model info
            if (serviceItem?.model) {
                formattedServiceItem.model_name = serviceItem?.model?.value;
            }

            return formattedServiceItem;
        });

        createInfraService(params?.projectId, formattedServicesSelected)
            .then(({ data }) => {
                updateInfraData(data.data);
                setIsSubmitLoading(false);
            })
            .catch(({ response, message }) => {
                let errorMsg = response?.data?.errorData?.message;
                if (!errorMsg)
                    errorMsg = message;
                ShowToastMessage(ERROR, errorMsg);
                setIsSubmitLoading(false);
            });
    };

    const handleAddService = () => {
        const isFilled = watch('servicesSelected').every((item) => {
            const { service } = item;
            return service?.value;
        });

        if (isFilled) {
            append({});
        } else {
            ShowToastMessage(ERROR, 'Please fill all required service fields before adding a new one');
        }
    };

    const handleRemoveService = (index) => {
        remove(index);
    };

    const loadServiceOptions = async (search) => {
        if (search) {
            return {
                options: returnFilteredDropdownOptions(search, serviceOptions),
            };
        }
        try {
            const selectedServices = watch('servicesSelected').map(item => item.service?.value);
            const options = availableServices
                .filter(service => !selectedServices.includes(service._id))
                .map(service => ({ label: service.name, value: service._id }));

            setServiceOptions(options);

            return {
                options,
            };
        } catch (error) {
            return { options: [] };
        }
    };

    const loadModelOptions = async (search) => {
        if (search) {
            return {
                options: returnFilteredDropdownOptions(search, modelOptions),
            };
        }
        try {
            const options = openaiModels.map(service => ({ label: service.name, value: service._id }));

            setModelOptions(options);

            return {
                options,
            };
        } catch (error) {
            return { options: [] };
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm="9">
                    <p className="fw-bold font-medium-5">
                        No active infrastructure for this project.
                    </p>
                    <p>
                        Add the services you need and submit to create the infrastructure.
                    </p>
                    {/* <p className="text-info">
                        It's absolutely free and we are not charging you even a single buck for the usage.
                    </p> */}
                </Col>
            </Row>
            <Row className="gap-2 pt-50">
                <Col sm="12" md="6" lg="8">
                    {fields.map((item, index) => (
                        <Row key={item.id} className="mt-1 d-flex align-items-center">
                            <Col sm="12" md="12" lg="10">
                                <Label className="form-label" for={`servicesSelected.${index}.service`}>
                                    Name of Service<span className="label-asterisk me-50">*</span>
                                </Label>
                                <Controller
                                    id={`servicesSelected.${index}.service`}
                                    name={`servicesSelected.${index}.service`}
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncPaginate
                                            debounceTimeout={1000}
                                            additional={{ page: 1 }}
                                            loadOptions={loadServiceOptions}
                                            classNamePrefix="select"
                                            placeholder="Select a service you need"
                                            theme={selectThemeColors}
                                            className={classNames('react-select', {
                                                'is-invalid': errors?.servicesSelected?.[index]?.service,
                                            })}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors?.servicesSelected?.[index]?.service && (
                                    <FormFeedback>
                                        {errors.servicesSelected[index].service.label.message}
                                    </FormFeedback>
                                )}
                            </Col>
                            {getValues(`servicesSelected.${index}.service.value`) === 'openai' && (
                                <Col sm="12" md="12" lg="10">
                                    <Label className="form-label" for={`servicesSelected.${index}.model`}>
                                        Model<span className="label-asterisk me-50">*</span>
                                    </Label>
                                    <Controller
                                        id={`servicesSelected.${index}.model`}
                                        name={`servicesSelected.${index}.model`}
                                        control={control}
                                        render={({ field }) => (
                                            <AsyncPaginate
                                                debounceTimeout={1000}
                                                additional={{ page: 1 }}
                                                loadOptions={loadModelOptions}
                                                classNamePrefix="select"
                                                placeholder="Select a model"
                                                theme={selectThemeColors}
                                                className={classNames('react-select', {
                                                    'is-invalid': errors?.servicesSelected?.[index]?.model,
                                                })}
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors?.servicesSelected?.[index]?.model && (
                                        <FormFeedback>
                                            {errors.servicesSelected[index].model.label.message}
                                        </FormFeedback>
                                    )}
                                </Col>
                            )}
                            <Col sm="12" md="12" lg="2">
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        color="flat-danger"
                                        className="mt-2"
                                        onClick={() => handleRemoveService(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
            <div className="d-flex justify-content-end align-items-center pb-2">
                {
                    !isSubmitLoading && (
                        <Button color="primary" type="button" outline className="me-2" onClick={handleAddService}>
                            Add more
                        </Button>
                    )
                }
                <Button color="primary" type="submit" className="me-2" disabled={isSubmitLoading}>
                    {isSubmitLoading ? (<Spinner size="sm" />) : 'Submit'}
                </Button>
            </div>
        </Form>
    );
};

export default CreateInfrastructure;
