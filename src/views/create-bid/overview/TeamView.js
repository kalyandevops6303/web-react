/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Badge, Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, Input, Row, Spinner } from 'reactstrap';
import Select from 'react-select';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight, Copy, Minus, Plus, Trash2 } from 'react-feather';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { TeamSectionWrapper } from '../style';
import theme from '../../../configs/themeVariables';
import { selectThemeColors } from '../../../utility/Utils';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { UploadIconContainer } from '../../Onboarding/style';
import { getBidDetails, getRoles, saveSetWorkers } from '../../../redux/actions/createBidActions';
import {
  allTeamMembers,
  bidDetailsLoading,
  recommendedRoles,
  rolesLoading,
  setWorkersLoading,
} from '../../../redux/selectors/createBidSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const TeamView = () => {
  const EducationalSchema = yup.object().shape({
    projectRolesDetails: yup
      .array()
      .of(
        yup.object().shape({
          role: yup
            .string()
            .min(2, 'Role must be at least 2 characters')
            .max(50, 'Role must be 50 characters or less')
            .required('Role is required'),
          member: yup.object().shape({
            label: yup.string(),
            value: yup.object(),
          }),
        }),
      )
      .min(1, 'At least one role should be added'),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EducationalSchema),
    defaultValues: {
      projectRolesDetails: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projectRolesDetails',
  });

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const rolesIsLoading = useSelector(rolesLoading);
  const recommendedRolesData = useSelector(recommendedRoles);
  const allTeamMembersData = useSelector(allTeamMembers);
  const setWorkersIsLoading = useSelector(setWorkersLoading);
  const bidDetailsIsLoading = useSelector(bidDetailsLoading);

  const [recommendedRolesOptions, setRecommendedRolesOptions] = useState(null);
  const [allTeamMembersOptions, setAllTeamMembersOptions] = useState(null);
  const [fieldErrors, setFieldErrors] = useState(
    fields?.map((field) => {
      if (fields.filter((i) => field.role === i.role)?.length > 1) {
        return { ...field, sameNameError: true };
      } else {
        return { ...field, sameNameError: false };
      }
    }),
  );

  const removeUndefinedKeysFromArray = (array) =>
    array.map((obj) =>
      Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {}),
    );

  const onSuccess = () => {
    navigate(`/create-bid/${params.projectId}/${params.bidType.toLowerCase()}/${params.bidId}/milestone`, {
      state: { entity: location.state.entity },
    });
  };

  const onSubmit = (data) => {
    const { projectRolesDetails } = data;

    const allFields = fieldErrors?.map((field) => {
      if (fieldErrors.filter((i) => field.role === i.role)?.length > 1) {
        return { ...field, sameNameError: true };
      } else {
        return { ...field, sameNameError: false };
      }
    });

    setFieldErrors(allFields);

    if (allFields.filter((field) => field.sameNameError).length === 0) {
      const requiredData = projectRolesDetails?.map((item) => ({
        user_id: item?.member?.value?.user_id,
        first_name: item?.member?.value?.first_name,
        last_name: item?.member?.value?.last_name,
        role: item?.role,
      }));

      dispatch(
        saveSetWorkers(params.bidId, '64dc8e1e35b3c71d95b32c7d', removeUndefinedKeysFromArray(requiredData), onSuccess),
      );
    }
  };

  const handleAddRole = () => {
    const isFilled = watch('projectRolesDetails').every((item) => {
      const { role } = item;
      return role;
    });

    if (isFilled) {
      append({});
    } else {
      ShowToastMessage(ERROR, 'Please fill all project roles fields above');
    }
  };

  const handleCopyRole = (index) => {
    const projectRole = watch('projectRolesDetails')[index];

    if (projectRole?.role && projectRole?.role?.length !== 0) {
      append({ role: `${projectRole.role} copy`, member: undefined });
    } else {
      ShowToastMessage(ERROR, 'Please give a role name first');
    }
  };

  const handleRemoveRole = (index) => {
    remove(index);
  };

  const updateFieldsErrorsValue = (index, value) => {
    const updatedFields = fieldErrors?.map((field, i) => {
      if (index === i) {
        return { ...field, role: value };
      } else {
        return field;
      }
    });

    setFieldErrors(updatedFields);
  };

  const handleAddSuggestedRole = (name) => {
    append({ role: name, member: undefined });
  };

  const handleRemoveSuggestedRole = (name) => {
    const reqIndex = fields.findIndex((item) => item.role === name);

    if (reqIndex !== -1) {
      remove(reqIndex);
    }
  };

  useEffect(() => {
    const allFields = fields?.map((field) => {
      if (fields.filter((i) => field.role === i.role)?.length > 1) {
        return { ...field, sameNameError: false };
      } else {
        return { ...field, sameNameError: false };
      }
    });

    setFieldErrors(allFields);
  }, [fields]);

  useEffect(() => {
    setRecommendedRolesOptions(recommendedRolesData);
  }, [recommendedRolesData]);

  useEffect(() => {
    const requiredData = allTeamMembersData?.map((member) => ({
      label: `${member.first_name} ${member.last_name}`,
      value: member,
    }));
    setAllTeamMembersOptions(requiredData);
  }, [allTeamMembersData]);

  const onGetUserDetailsSuccess = (res) => {
    if (res) {
      if (res?.workers?.length > 0) {
        const data = res?.workers?.map((worker) => {
          if (worker?.user_id?.length > 0) {
            return {
              role: worker.role,
              member: {
                label: `${worker.first_name} ${worker.last_name}`,
                value: worker,
              },
            };
          } else {
            return {
              role: worker.role,
              member: undefined,
            };
          }
        });

        setValue('projectRolesDetails', data, { shouldValidate: true });
      }
    }
  };

  useEffect(() => {
    dispatch(getBidDetails(params.bidId, '64dc8e1e35b3c71d95b32c7d', onGetUserDetailsSuccess));
    dispatch(getRoles(params.projectId, '64dc8e1e35b3c71d95b32c7d'));
  }, []);

  return (
    <TeamSectionWrapper>
      {bidDetailsIsLoading || rolesIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mt-2">
            <CardHeader className="py-75">
              <h4 className="m-0 mt-75">Roles</h4>
            </CardHeader>
            <hr className="m-0 card-header-border" />
            <CardBody>
              <h5 className="font-medium-1 mt-1">Estimate project team roles, effort and costs</h5>
              {recommendedRolesOptions?.length > 0 && (
                <>
                  <p>Recommended roles based on project listing</p>
                  <Row className="mt-2">
                    {recommendedRolesOptions?.map((role) => (
                      <div
                        className={
                          watch('projectRolesDetails').find((item) => item.role === role)
                            ? 'active-role-pill'
                            : 'inactive-role-pill'
                        }
                        key={role}
                      >
                        <Badge pill className="px-1 py-50 d-flex align-items-center">
                          <h6 className="m-0 fw-light">{role}</h6>
                          {watch('projectRolesDetails').find((item) => item.role === role) ? (
                            <Minus
                              size={18}
                              className="ms-50 cursor-pointer"
                              onClick={() => handleRemoveSuggestedRole(role)}
                            />
                          ) : (
                            <Plus
                              size={18}
                              color={theme.wizardStepSvgColor}
                              className="ms-50 cursor-pointer"
                              onClick={() => handleAddSuggestedRole(role)}
                            />
                          )}
                        </Badge>
                      </div>
                    ))}
                  </Row>
                </>
              )}

              <hr className="my-1 card-header-border" />
              <Row>
                <Col sm="12" md="5" lg="4">
                  <p className="roles-list-header">Project Roles</p>
                </Col>
                <Col sm="12" md="5" lg="6">
                  <p className="roles-list-header">Team Member</p>
                </Col>
                <Col sm="12" md="5" lg="2">
                  <div className="d-flex justify-content-end me-2">
                    <p className="roles-list-header">Action</p>
                  </div>
                </Col>
              </Row>

              {fields.map((item, index) => (
                <>
                  <Row key={item.id} className="mb-1 d-flex align-items-center">
                    <Col sm="12" md="5" lg="4">
                      <div className="w-75">
                        <Controller
                          id={`projectRolesDetails.${index}.role`}
                          name={`projectRolesDetails.${index}.role`}
                          control={control}
                          invalid={
                            errors &&
                            errors.projectRolesDetails &&
                            errors.projectRolesDetails.length > 0 &&
                            errors.projectRolesDetails[index] &&
                            errors.projectRolesDetails[index].role &&
                            true
                          }
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Enter role"
                              invalid={
                                errors &&
                                errors.projectRolesDetails &&
                                errors.projectRolesDetails.length > 0 &&
                                errors.projectRolesDetails[index] &&
                                errors.projectRolesDetails[index].role &&
                                true
                              }
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                updateFieldsErrorsValue(index, e.target.value);
                              }}
                            />
                          )}
                        />
                        {errors &&
                          errors.projectRolesDetails &&
                          errors.projectRolesDetails.length > 0 &&
                          errors.projectRolesDetails[index] && (
                            <FormFeedback>
                              {errors.projectRolesDetails[index].role && errors.projectRolesDetails[index].role.message}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>
                    <Col sm="12" md="5" lg="6">
                      <div className="w-75">
                        <Controller
                          id={`projectRolesDetails.${index}.member`}
                          name={`projectRolesDetails.${index}.member`}
                          control={control}
                          invalid={
                            errors &&
                            errors.projectRolesDetails &&
                            errors.projectRolesDetails.length > 0 &&
                            errors.projectRolesDetails[index] &&
                            errors.projectRolesDetails[index].member &&
                            true
                          }
                          render={({ field }) => (
                            <Select
                              isLoading={rolesIsLoading}
                              options={allTeamMembersOptions}
                              classNamePrefix="select"
                              placeholder="Assign team member"
                              theme={selectThemeColors}
                              className={classNames('react-select', {
                                'is-invalid':
                                  errors &&
                                  errors.projectRolesDetails &&
                                  errors.projectRolesDetails.length > 0 &&
                                  errors.projectRolesDetails[index] &&
                                  errors.projectRolesDetails[index].member,
                              })}
                              {...field}
                            />
                          )}
                        />
                        {errors &&
                          errors.projectRolesDetails &&
                          errors.projectRolesDetails.length > 0 &&
                          errors.projectRolesDetails[index] && (
                            <FormFeedback>
                              {errors.projectRolesDetails[index].member &&
                                errors.projectRolesDetails[index].member.label.message}
                            </FormFeedback>
                          )}
                      </div>
                    </Col>
                    <Col sm="12" md="5" lg="2">
                      <div className="d-flex justify-content-end">
                        <Copy
                          size={24}
                          color={theme.activeNavPillText}
                          className="me-2 cursor-pointer"
                          onClick={() => handleCopyRole(index)}
                        />
                        <Trash2
                          size={24}
                          color={theme.red}
                          className="cursor-pointer"
                          onClick={() => handleRemoveRole(index)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {fieldErrors[index]?.sameNameError && (
                      <FormFeedback>
                        <p className="same-role-error mb-75">Roles cannot be of same name</p>
                      </FormFeedback>
                    )}
                  </Row>
                </>
              ))}
              <Row className="mt-2 mb-3">
                <div className="d-flex align-items-center upload-button cursor-pointer" onClick={handleAddRole}>
                  <div className="add-icon-container">
                    <Plus size={16} color={theme.activeNavPillText} />
                  </div>
                  <h5 className="fw-bold">Add Role</h5>
                </div>
              </Row>
            </CardBody>
          </Card>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center upload-button cursor-pointer" onClick={() => navigate(-1)}>
              <UploadIconContainer>
                <ChevronLeft size={18} color={theme.activeNavPillText} />
              </UploadIconContainer>
              <h5 className="fw-bold">Back</h5>
            </div>
            <Button
              color="primary"
              type="submit"
              disabled={
                !isValid ||
                fields.length === 0 ||
                !watch('projectRolesDetails').every((field) => field.role) ||
                setWorkersIsLoading
              }
            >
              {setWorkersIsLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <span className="me-50">Save & Continue</span>
                  <ChevronRight size={14} />
                </>
              )}
            </Button>
          </div>
        </Form>
      )}
    </TeamSectionWrapper>
  );
};

export default TeamView;
