/* eslint-disable no-undef */
import { Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshCcw, Search } from 'react-feather';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import classNames from 'classnames';
import InfiniteScroll from '../../../lib/infinite-scroll';
import debounce from '../../../lib/debounce';
import throttle from '../../../lib/throttle';
import { FormWrapper, SecondaryFiltersWrap } from '../../styled';
import { getProjectListing, getProjectsListingFlextern } from '../../../redux/actions/projectActions';
import ProjectCard from '../../cards/ProjectCard';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import NoDataFoundComponent from './NoDataFoundComp';
import { isAnyKeyNonEmptyArray, selectThemeColors, useIsTab } from '../../../utility/Utils';
import {
  getClientNameService,
  getDepartmentNameService,
  getProjectNames,
  getSecondaryStatuses,
  getTalentNameService,
  getTeamNameSerive,
} from '../../../services/projectServices';
import { userTypes } from '../../../utility/constants/Constant';
import { clearData } from '../../../redux/reducers/project';
import theme from '../../../configs/themeVariables';
import { ResponsiveGrid } from '../../cards/style';
import SearchResultsCount from '../../../@core/components/SearchResultsCount';
import PermissionWrapper from '@/PermissionWrapper';
import { appPermissionsSelector } from '@/redux/selectors/authSelectors';
import { SecondaryProjectStatus } from '@/flexternships/constraints/enums/project-enums';

// eslint-disable-next-line react/prop-types
const SecondaryFilters = ({ primaryFilter, userType }) => {
  const [searchText, setSearchText] = useState('');
  const isTab = useIsTab();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const popoverRef = useRef(null);

  const [hasMore, setHasMore] = useState(true);
  const selectProjectData = useSelector((state) => state.project.listData);
  const selectProjectMetaData = useSelector((state) => state.project.metaData);
  const currentPreview = useSelector((state) => state.project.currentPreview);
  const isLoading = useSelector((state) => state.project.loading);
  const isCardLoading = useSelector((state) => state?.project?.cardInfoLoading);
  const selectCardData = useSelector((state) => state?.project?.cardData);
  const appPermissions = useSelector(appPermissionsSelector);

  const filterTypeOptions = [
    { label: 'Fixed', value: 'FIXED' },
    { label: 'Variable', value: 'VARIABLE' },
  ];

  const invitedOptions = [
    { label: 'Talent', value: 'TALENT' },
    { label: 'Team', value: 'TEAM' },
  ];
  const typeOptions = [
    { label: 'Received', value: 'RECEIVED' },
    { label: 'Sent', value: 'SENT' },
  ];
  const invitedByOptions = [
    { label: 'Team', value: 'TEAM' },
    { label: 'Client', value: 'CLIENT' },
  ];
  const metaData = { page: 1, page_size: 10 };
  const metaDataFlextern = {
    page: 1,
    page_size: 10,
    search_query: '',
    status: '',
    department_name: '',
    project_name: '',
  };

  const [popoverOpen, setPopoverOpen] = useState(false);

  const [secondFilterState, setSecondFilterState] = useState({
    team_name: [],
    department_name: [],
    status: [],
    project_name: [],
    talent_name: [],
    client_name: [],
    project_type: [],
    user_type: [],
    invitation_by: [invitedByOptions[0]],
    invitation_type: [typeOptions[0]],
    invitation_to: [invitedOptions[0]],
  });

  const onSuccess = () => {};
  const onError = () => {
    setHasMore(false);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    e.preventDefault();
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    }; // Adjust the debounce delay (in milliseconds) as per your needs

    const handleScroll = throttle(() => {
      setPopoverOpen(false);
    }, 300); // Adjust the throttle delay (in milliseconds) as per your needs

    const handleWindowClick = (event) => {
      handleOutsideClick(event);
    };

    const handleWindowScroll = () => {
      handleScroll();
    };

    document.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      document.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const handleReset = () => {
    setSecondFilterState({
      team_name: [],
      department_name: [],
      client_name: [],
      project_type: [],
      user_type: [],
      invitation_by: [invitedByOptions[0]],
      invitation_type: [typeOptions[0]],
      invitation_to: [invitedOptions[0]],
    });
    setSearchText('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (secondFilterState?.department_name?.length > 0) {
      metaDataFlextern.department_name = secondFilterState.department_name[0]?.value;
    }
    if (secondFilterState?.status?.length > 0) {
      metaDataFlextern.status = secondFilterState.status?.[0]?.status?.value;
    }
    if (secondFilterState?.project_name?.length > 0) {
      metaDataFlextern.project_name = secondFilterState.project_name[0].label;
    }

    if (secondFilterState?.talent_name?.length > 0) {
      metaDataFlextern.talent_name = secondFilterState.talent_name[0].label;
    }
  }, [secondFilterState]);

  useEffect(() => {
    setHasMore(true);
    if (currentPreview?.length === 0 || selectProjectData?.length === selectProjectMetaData?.total_records) {
      setHasMore(false);
    }
  }, [currentPreview]);

  useEffect(() => {
    dispatch(clearData());
    const filterData = {};
    Object.keys(secondFilterState).forEach((key) => {
      if (Array.isArray(secondFilterState[key])) {
        if (key === 'team_name' || key === 'client_name') {
          filterData[key] = secondFilterState[key][0]?.value;
        } else if (key === 'invitation_by' || key === 'invitation_type' || key === 'invitation_to') {
          filterData[key] = secondFilterState[key][0]?.value;
        } else {
          filterData[key] = secondFilterState[key][0]?.value;
        }
      }
    });
    // dispatch(
    //   getProjectListing({
    //     data: {
    //       ...filterData,
    //       search_query: searchText || '',
    //       project_filter: primaryFilter ? primaryFilter.toUpperCase() : '',
    //     },
    //     metaData,
    //     onSuccess,
    //     onError,
    //   }),
    // );
    dispatch(
      getProjectsListingFlextern({
        metaData: {
          ...metaDataFlextern,
          search_query: metaDataFlextern?.project_name || searchText || '',
          department_name: metaDataFlextern?.department_name?.department_name || '',
          status: metaDataFlextern?.status || '',
          project_status: primaryFilter?.toUpperCase() || '',
          talent_name: metaDataFlextern?.talent_name || '',
        },
      }),
    );
  }, [secondFilterState, searchText, primaryFilter]);

  const fetchMore = () => {
    const newMetaData = {
      ...metaData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectProjectMetaData?.current_page + 1 || 1,
    };
    const newFlexternMetaData = {
      ...metaDataFlextern,
      page: selectProjectMetaData?.current_page + 1 || 1,
    };

    const filterData = {};

    Object.keys(secondFilterState).forEach((key) => {
      if (Array.isArray(secondFilterState[key])) {
        if (key === 'team_name' || key === 'client_name') {
          filterData[key] = secondFilterState[key][0]?.value;
        } else {
          filterData[key] = secondFilterState[key][0]?.value;
        }
      }
    });
    // dispatch(
    //   getProjectListing({
    //     data: {
    //       ...filterData,
    //       search_query: searchText || '',
    //       project_filter: primaryFilter ? primaryFilter.toUpperCase() : '',
    //     },
    //     metaData: newMetaData,
    //     onSuccess,
    //     onError,
    //   }),
    // );
    dispatch(
      getProjectListing({
        data: {
          ...filterData,
          search_query: searchText || '',
          project_filter: primaryFilter ? primaryFilter.toUpperCase() : '',
        },
        metaData: newMetaData,
        onSuccess,
        onError,
      }),
    );
  };

  const loadTeamNameOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await getTeamNameSerive(page, search);

      return {
        options: response?.data?.data?.data?.map((institute) => ({ label: institute.name, value: institute._id })),
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const loadTalentOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await getTalentNameService(page, search);
      const options = response?.data?.data?.data.map((option) => ({
        value: option.talent_id,
        label: option.talent_name,
      }));
      return {
        options,
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const loadDepartmentNameOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await getDepartmentNameService(page, search);

      const options = response?.data?.data?.data.map((option) => ({
        value: option.department_name,
        label: option.department_name,
      }));
      return {
        options,
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const loadSecondaryStatusesOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await getSecondaryStatuses(page, search);
      const options = response?.data?.data?.data.map((option) => ({
        value: option.status,
        label: SecondaryProjectStatus[option.status],
      }));

      return {
        options,
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const loadProjectNamesOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await getProjectNames(page, search);

      const options = response?.data?.data?.data.map((option) => ({
        value: option._id,
        label: option.name,
      }));

      return {
        options,
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const loadClientNameOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await getClientNameService(page, search);

      return {
        options: response?.data?.data?.data?.map((client) => ({
          label: `${client.first_name} ${client.last_name}`,
          value: client.user_id,
        })),
        hasMore: response?.data?.data?.metadata?.has_next_page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return { options: [], hasMore: false };
    }
  };

  const onChangeFilter = (key, value) => {
    setSecondFilterState({
      ...secondFilterState,
      [key]: value ? [value] : [],
    });
  };

  if (isCardLoading && !selectCardData) {
    return <div />;
  }

  return (
    <>
      <FormWrapper>
        <SecondaryFiltersWrap>
          <div className="mt-auto">
            <InputGroup className="input-group-merge marketplace-search">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input
                innerRef={inputRef}
                onChange={debounce(handleSearchTextChange, 300)}
                placeholder="Search project name, user name"
              />
            </InputGroup>
          </div>
          <Row>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.PROJECT_TYPE']}>
              <Col>
                <Label className="form-label">Project type</Label>
                <Select
                  isClearable
                  options={filterTypeOptions}
                  classNamePrefix="select"
                  placeholder="Select type"
                  theme={selectThemeColors}
                  onChange={(value) => onChangeFilter('project_type', value)}
                  value={
                    secondFilterState.project_type?.length > 0
                      ? {
                          value: secondFilterState.project_type[0].value,
                          label: secondFilterState.project_type[0].label,
                        }
                      : null
                  }
                />
              </Col>
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.INVITED_BY']}>
              {userType === userTypes.talent && primaryFilter === 'invited' && (
                <Col>
                  <Label className="form-label">Invited by</Label>
                  <Select
                    options={invitedByOptions}
                    classNamePrefix="select"
                    placeholder="Select type"
                    theme={selectThemeColors}
                    onChange={(value) => onChangeFilter('invitation_by', value)}
                    value={
                      secondFilterState.invitation_by?.length > 0
                        ? {
                            value: secondFilterState.invitation_by[0].value,
                            label: secondFilterState.invitation_by[0].label,
                          }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.TYPE']}>
              {userType === userTypes.team && primaryFilter === 'invited' && (
                <Col>
                  <Label className="form-label">Type</Label>
                  <Select
                    options={typeOptions}
                    classNamePrefix="select"
                    placeholder="Select type"
                    theme={selectThemeColors}
                    onChange={(value) => onChangeFilter('invitation_type', value)}
                    value={
                      secondFilterState?.invitation_type?.length > 0
                        ? {
                            value: secondFilterState.invitation_type[0].value,
                            label: secondFilterState.invitation_type[0].label,
                          }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.INVITED']}>
              {userType === userTypes.client && primaryFilter === 'invited' && (
                <Col>
                  <Label className="form-label">Invited</Label>
                  <Select
                    options={invitedOptions}
                    classNamePrefix="select"
                    placeholder="Select type"
                    theme={selectThemeColors}
                    onChange={(value) => onChangeFilter('invitation_to', value)}
                    value={
                      secondFilterState.invitation_to?.length > 0
                        ? {
                            value: secondFilterState.invitation_to[0].value,
                            label: secondFilterState.invitation_to[0].label,
                          }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            {/* // After the department name comes from new API, functionality will be implemented */}
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.DEPARTMENT_NAME']}>
              {userType !== userTypes.team && userType !== userTypes.client && (
                <Col>
                  <Label className="form-label">Department Name</Label>
                  <AsyncPaginate
                    isClearable
                    debounceTimeout={1000}
                    additional={{ page: 1 }}
                    loadOptions={loadDepartmentNameOptions}
                    classNamePrefix="wide"
                    placeholder="Select department name"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('department_name', value)}
                    value={
                      secondFilterState.department_name?.length > 0
                        ? secondFilterState.department_name?.map((item) => item)
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.STATUS']}>
              {userType !== userTypes.team && (
                <Col>
                  <Label className="form-label">Status</Label>
                  <AsyncPaginate
                    isClearable
                    debounceTimeout={1000}
                    additional={{ page: 1 }}
                    loadOptions={loadSecondaryStatusesOptions}
                    classNamePrefix="wide"
                    placeholder="Select status"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('status', value)}
                    value={secondFilterState.status?.length > 0 ? secondFilterState?.status?.map((item) => item) : null}
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.TALENT_NAME']}>
              {userType !== userTypes.team && userType === userTypes?.client && (
                <Col>
                  <Label className="form-label">Talent Name</Label>
                  <AsyncPaginate
                    isClearable
                    debounceTimeout={1000}
                    additional={{ page: 1 }}
                    loadOptions={loadTalentOptions}
                    classNamePrefix="select"
                    placeholder="Select talent name"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('talent_name', value)}
                    value={
                      secondFilterState.talent_name?.length > 0
                        ? secondFilterState.talent_name?.map((item) => item)
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.PROJECT_NAME']}>
              {userType !== userTypes.team && (
                <Col>
                  <Label className="form-label">Project Name</Label>
                  <AsyncPaginate
                    isClearable
                    debounceTimeout={1000}
                    additional={{ page: 1 }}
                    loadOptions={loadProjectNamesOptions}
                    classNamePrefix="wide"
                    placeholder="Select project name"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('project_name', value)}
                    value={
                      secondFilterState.project_name?.length > 0
                        ? secondFilterState.project_name?.map((item) => item)
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.TEAM_NAME']}>
              {userType !== userTypes.team && primaryFilter !== 'invited' && (
                <Col>
                  <Label className="form-label">Team name</Label>
                  <AsyncPaginate
                    isClearable
                    debounceTimeout={1000}
                    additional={{ page: 1 }}
                    loadOptions={loadTeamNameOptions}
                    classNamePrefix="name"
                    placeholder="Select team name"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('team_name', value)}
                    value={
                      secondFilterState.team_name?.length > 0
                        ? {
                            value: secondFilterState.team_name[0].value,
                            label: secondFilterState.team_name[0].label,
                          }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['PROJECT.FILTERS.CLIENT_NAME']}>
              {userType !== userTypes.client && primaryFilter !== 'invited' && (
                <Col>
                  <Label className="form-label">Client name</Label>
                  <AsyncPaginate
                    isClearable
                    debounceTimeout={1000}
                    additional={{ page: 1 }}
                    loadOptions={loadClientNameOptions}
                    classNamePrefix="name"
                    placeholder="Select client name"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('client_name', value)}
                    value={
                      secondFilterState.client_name?.length > 0
                        ? {
                            value: secondFilterState.client_name[0].value,
                            label: secondFilterState.client_name[0].label,
                          }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            {!isTab && (
              <Col className="reset-btn cursor-pointer" onClick={handleReset}>
                <div className="reset-icon">
                  <RefreshCcw size={18} color={theme.activeNavPillText} />
                </div>
                <span className="reset-label">Reset</span>
              </Col>
            )}
            {isTab && (
              <div className="reset-btn cursor-pointer" onClick={handleReset}>
                <div className="reset-icon">
                  <RefreshCcw size={18} color={theme.activeNavPillText} />
                </div>
                <span className="reset-label">Reset</span>
              </div>
            )}
          </Row>
        </SecondaryFiltersWrap>
      </FormWrapper>

      {!isLoading &&
        (isAnyKeyNonEmptyArray({
          client_name: secondFilterState?.client_name,
          team_name: secondFilterState?.team_name,
          project_type: secondFilterState?.project_type,
        }) ||
          searchText ||
          primaryFilter === 'invited') && <SearchResultsCount metaData={selectProjectMetaData} />}

      {isLoading ? (
        <ComponentSpinner />
      ) : (
        <ResponsiveGrid>
          <InfiniteScroll
            dataLength={selectProjectData?.length}
            next={fetchMore}
            hasMore={hasMore}
            endMessage={
              <div className="d-flex justify-content-center ">
                {selectProjectData?.length > 0 ? (
                  <span className="mt-2">You have seen it all!</span>
                ) : (
                  <NoDataFoundComponent data={selectProjectData} />
                )}
              </div>
            }
            loader={<div className="d-flex justify-content-center">Loading...</div>}
          >
            {selectProjectData?.map((item) => {
              const CardComponent = ProjectCard;
              return (
                <CardComponent
                  secondFilterState={secondFilterState}
                  key={item?._id || item?.id}
                  data={item}
                  isPopoverOpen={popoverOpen}
                  isExpanded={false}
                  primaryFilter={primaryFilter}
                  secondaryFilterForInvitedType={secondFilterState.invitation_type[0].value}
                />
              );
            })}
          </InfiniteScroll>
        </ResponsiveGrid>
      )}
    </>
  );
};

SecondaryFilters.propTypes = {
  primaryFilter: PropTypes.string,
  userType: PropTypes.string,
};
SecondaryFilters.defaultProps = {
  primaryFilter: '',
  userType: '',
};

export default SecondaryFilters;
