/* eslint-disable no-else-return */
/* eslint-disable no-undef */
import { Col, Input, InputGroup, InputGroupText, Label, Popover, PopoverBody, Row } from 'reactstrap';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { RefreshCcw, Search } from 'react-feather';
import CollActive from '@src/assets/images/coll_active.png';
import ExpandInactive from '@src/assets/images/expand_inactive.png';
import CollInactive from '@src/assets/images/coll_inactive.png';
import ExpandActive from '@src/assets/images/expand_active.png';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import InfiniteScroll from '../../../lib/infinite-scroll';
import debounce from '../../../lib/debounce';
import throttle from '../../../lib/throttle';
import theme from '../../../configs/themeVariables';
import { FormWrapper, SecondaryFiltersWrap } from '../../styled';
import { isAnyKeyNonEmptyArray, selectThemeColors, useIsTab } from '../../../utility/Utils';
import { getListProjects, getUsers } from '../../../redux/actions/marketPlaceActions';
import {
  companyIndustriesService,
  projectAreasService,
  skillsService,
  toolsService,
} from '../../../services/staticServices';
import ProjectCard from '../../cards/MarketPlaceProjectCard';
import { clearData } from '../../../redux/reducers/marketPlace';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import {
  bidStatusesOptions,
  projectTypesOptions,
  sortingOptions,
  statusesOptions,
  userTypes,
} from '../../../utility/constants/Constant';
import NoDataFoundComponent from './NoDataFoundComp';
import TeamCard from '../../cards/TeamCard';
import ClientCard from '../../cards/ClientCard';
import TalentCard from '../../cards/TalentCard';
import { ResponsiveGrid } from '../../cards/style';
import SearchResultsCount from '../../../@core/components/SearchResultsCount';
import MarketPlaceDraftProjectCard from '../../cards/MarketplaceDraftProjectCard';
import PermissionWrapper from '@/PermissionWrapper';
import { appPermissionsSelector } from '@/redux/selectors/authSelectors';

const SecondaryFilters = ({ primaryFilter, userType }) => {
  const location = useLocation();
  const [searchText, setSearchText] = useState(location?.state?.clientName ?? '');
  const [inputText, setInputText] = useState(location?.state?.clientName ?? '');
  const dispatch = useDispatch();
  const isTab = useIsTab();
  const popoverRef = useRef(null);
  const inputRef = useRef();

  const [hasMore, setHasMore] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectMarketPlaceData = useSelector((state) => state.marketPlace.listData);
  const selectMarkeMetaData = useSelector((state) => state.marketPlace.metaData);
  const currentPreview = useSelector((state) => state.marketPlace.currentPreview);
  const isLoading = useSelector((state) => state.marketPlace.loading);
  const isCardLoading = useSelector((state) => state?.marketPlace?.cardInfoLoading);
  const selectCardData = useSelector((state) => state?.marketPlace?.cardData);
  const appPermissions = useSelector(appPermissionsSelector);

  const metaData = { page: 1, page_size: 10 };

  const getStatusFromLocationState = () => {
    if (location?.state?.isOpenListing) {
      return [{ label: 'Open', value: 'OPEN' }];
    }
    if (location?.state?.isDraftProjects) {
      return [{ label: 'Drafts', value: 'DRAFT' }];
    }
    return [];
  };

  const [secondFilterState, setSecondFilterState] = useState({
    statuses: getStatusFromLocationState(),
    bid_statuses: location?.state?.isDraftBids ? [{ label: 'Drafts', value: 'DRAFT' }] : [],
    project_types: [],
    skills: [],
    tools: [],
    sort_by: location?.state?.isRecommended ? [{ label: 'Recommended', value: 'RECOMMENDED' }] : [],
    industries: [],
    project_areas: [],
    project_ids: location?.state?.draftBidProjectId
      ? [{ label: location?.state?.draftBidProjectId, value: location?.state?.draftBidProjectId }]
      : [],
  });
  const { sort_by } = secondFilterState;

  const [skillsOptions, setSkillsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [companyIndustriesOptions, setCompanyIndustriesOptions] = useState(null);
  const [projectAreasOptions, setProjectAreasOptions] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const isRecommanded = sort_by[0]?.value === 'RECOMMENDED';
  const isFavorite = sort_by[0]?.value === 'FAVOURITE';

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

  useEffect(() => {
    setHasMore(true);
    if (currentPreview.length === 0 || selectMarketPlaceData?.length === selectMarkeMetaData?.total_records) {
      setHasMore(false);
    }
  }, [currentPreview]);

  const getCardComp = (projectStatus) => {
    if (primaryFilter === 'talents') {
      return TalentCard;
    }
    if (primaryFilter === 'clients') {
      return ClientCard;
    }
    if (primaryFilter === 'teams') {
      return TeamCard;
    }
    if (primaryFilter === 'my_listings' && projectStatus === 'DRAFT') {
      return MarketPlaceDraftProjectCard;
    }
    return ProjectCard;
  };
  const onSuccess = () => {};
  const onError = () => {
    setHasMore(false);
  };

  useEffect(() => {
    dispatch(clearData());
    const valuesOnly = {};
    Object.keys(secondFilterState).forEach((key) => {
      if (
        key === 'statuses' &&
        (secondFilterState?.statuses?.map((item) => item.value)?.includes('LISTING_EXPIRED') ||
          secondFilterState?.statuses?.map((item) => item.value)?.includes('TO_BE_LISTED'))
      ) {
        valuesOnly[key] = [];
      } else {
        valuesOnly[key] = secondFilterState[key].map((item) => item.value);
      }
    });
    if (userType) {
      if (primaryFilter === 'talents' || primaryFilter === 'clients' || primaryFilter === 'teams') {
        dispatch(
          getUsers({
            isRecommanded,
            isFavorite,
            primaryFilter,
            metaData,
            userType,
            onSuccess,
            onError,
            postData: valuesOnly,
            searchText,
          }),
        );
      } else {
        dispatch(
          getListProjects({
            isMyListing: primaryFilter === 'my_listings',
            isMyBids: primaryFilter === 'my_bids',
            show_expired: secondFilterState?.statuses?.map((item) => item.value)?.includes('LISTING_EXPIRED'),
            show_to_be_listed: secondFilterState?.statuses?.map((item) => item.value)?.includes('TO_BE_LISTED'),
            isRecommanded,
            isFavorite,
            metaData,
            userType,
            onSuccess,
            onError,
            postData: valuesOnly,
            searchText,
          }),
        );
      }
    }
  }, [secondFilterState, searchText, primaryFilter, isRecommanded, isFavorite, userType]);

  // Function to toggle the popover
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const onChangeSort = (value) => {
    setSecondFilterState({
      ...secondFilterState,
      sort_by: value ? [value] : [],
    });
  };

  const onChangeFilter = (filterKey, value) => {
    setSecondFilterState({
      ...secondFilterState,
      [filterKey]: value ? [value] : [],
    });
  };
  const handleReset = () => {
    setSecondFilterState({
      statuses: [],
      bid_statuses: [],
      project_types: [],
      skills: [],
      tools: [],
      sort_by: [],
      industries: [],
      project_areas: [],
    });
    setSearchText('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  const loadSkillsOptions = async (search) => {
    if (search) {
      return {
        options: skillsOptions.filter(
          (skill) =>
            skill.label.toLowerCase().startsWith(search.toLowerCase()) ||
            skill.label.toLowerCase().includes(search.toLowerCase()),
        ),
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
  const loadToolsOptions = async (search) => {
    if (search) {
      return {
        options: toolsOptions.filter(
          (tool) =>
            tool.label.toLowerCase().startsWith(search.toLowerCase()) ||
            tool.label.toLowerCase().includes(search.toLowerCase()),
        ),
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
  const loadCompanyIndustriesOptions = async (search) => {
    if (search) {
      return {
        options: companyIndustriesOptions.filter(
          (industry) =>
            industry.label.toLowerCase().startsWith(search.toLowerCase()) ||
            industry.label.toLowerCase().includes(search.toLowerCase()),
        ),
      };
    }
    try {
      const response = await companyIndustriesService();

      const options = response?.data?.data?.map((industry) => ({ label: industry.name, value: industry._id }));

      setCompanyIndustriesOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };
  const loadAreaOptions = async (search) => {
    if (search) {
      return {
        options: projectAreasOptions.filter(
          (area) =>
            area.label.toLowerCase().startsWith(search.toLowerCase()) ||
            area.label.toLowerCase().includes(search.toLowerCase()),
        ),
      };
    }
    try {
      const response = await projectAreasService();

      const options = response?.data?.data?.map((area) => ({ label: area.name, value: area._id }));

      setProjectAreasOptions(options);

      return {
        options,
      };
    } catch (error) {
      return { options: [] };
    }
  };

  useEffect(() => {
    const debouncedHandleSearchTextChange = debounce((value) => {
      setSearchText(value);
    }, 300);

    debouncedHandleSearchTextChange(inputText);

    // Cleanup the debounce function
    return () => {
      debouncedHandleSearchTextChange.cancel();
    };
  }, [inputText]);

  const handleSearchTextChange = (e) => {
    setInputText(e.target.value);
    e.preventDefault();
  };

  const fetchMore = () => {
    const newMeteData = {
      ...metaData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectMarkeMetaData?.current_page + 1 || 1,
    };

    const valuesOnly = {};
    Object.keys(secondFilterState).forEach((key) => {
      if (key === 'statuses' && secondFilterState?.statuses?.map((item) => item.value)?.includes('LISTING_EXPIRED')) {
        valuesOnly[key] = [];
      } else {
        valuesOnly[key] = secondFilterState[key].map((item) => item.value);
      }
    });
    if (primaryFilter === 'talents' || primaryFilter === 'clients' || primaryFilter === 'teams') {
      dispatch(
        getUsers({
          isRecommanded,
          isFavorite,
          primaryFilter,
          metaData: newMeteData,
          userType,
          onSuccess,
          onError,
          postData: valuesOnly,
          searchText,
        }),
      );
    } else {
      dispatch(
        getListProjects({
          isMyListing: primaryFilter === 'my_listings',
          isMyBids: primaryFilter === 'my_bids',
          show_expired: secondFilterState?.statuses?.map((item) => item.value)?.includes('LISTING_EXPIRED'),
          show_to_be_listed: secondFilterState?.statuses?.map((item) => item.value)?.includes('TO_BE_LISTED'),
          isRecommanded,
          isFavorite,
          metaData: newMeteData,
          userType,
          onSuccess,
          onError,
          postData: valuesOnly,
          searchText,
        }),
      );
    }
  };

  const inMyBids = location.pathname?.split('/')?.includes('my_bids');

  const getSearchPlaceholder = () => {
    switch (primaryFilter) {
      case 'teams':
        return 'Search team name';
      case 'clients':
        return 'Search client name';
      case 'talents':
        if(userType === userTypes.flexternClient)
          return 'Search talent, project, department name';
        return 'Search talent name';
      default:
        if(userType === userTypes.flexternClient)
          return 'Search project, department, client name'
        return 'Search project name, user name';
    }
  };

  const setStatusOptions = () => {
    if (primaryFilter === 'my_listings') {
      return [
        ...statusesOptions,
        { label: 'Expired', value: 'LISTING_EXPIRED' },
        { label: 'To Be Listed', value: 'TO_BE_LISTED' },
        { label: 'Withdrawn', value: 'WITHDRAWN' },
        { label: 'Drafts', value: 'DRAFT' },
      ];
    } else {
      return statusesOptions;
    }
  };

  const ExpandCollapseComp = (
    <>
      <Label className="view-label me-1">View:</Label>
      <img src={isExpanded ? ExpandActive : CollActive} alt="collactive" />
      <Popover
        innerRef={popoverRef}
        placement="right"
        isOpen={popoverOpen}
        target="popoverButton"
        toggle={togglePopover}
      >
        <PopoverBody className="show-more-popover-body">
          <div
            className={`d-flex align-items-center tooltip-option tooltip-option-${
              isExpanded === true ? 'active' : 'inactive'
            }`}
            onClick={() => {
              setIsExpanded(true);
              setPopoverOpen(false);
            }}
          >
            <img className="me-50" src={isExpanded ? ExpandActive : ExpandInactive} alt="collactive" />
            <span>Expand</span>
          </div>
          <div
            className={`d-flex align-items-center tooltip-option tooltip-option-${
              isExpanded === false ? 'active' : 'inactive'
            }`}
            onClick={() => {
              setIsExpanded(false);
              setPopoverOpen(false);
            }}
          >
            <img className="me-50" src={isExpanded ? CollInactive : CollActive} alt="collactive" />
            <span>Compress</span>
          </div>
        </PopoverBody>
      </Popover>
    </>
  );
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
              <Input value={inputText} onChange={handleSearchTextChange} placeholder={getSearchPlaceholder()} />
            </InputGroup>
          </div>
          <Row>
            {primaryFilter !== 'talents' &&
              primaryFilter !== 'clients' &&
              primaryFilter !== 'teams' &&
              (isTab ? (
                <div className="d-flex mt-auto mb-1 cursor-pointer" id="popoverButton">
                  {ExpandCollapseComp}
                </div>
              ) : (
                <Col className="d-flex mt-auto mb-50 cursor-pointer" id="popoverButton">
                  {ExpandCollapseComp}
                </Col>
              ))}
            <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.FILTERS.TYPE']}>
              {(userType === userTypes.talent ||
                userType === userTypes.team ||
                primaryFilter === 'talents' ||
                primaryFilter === 'teams') &&
                !inMyBids && (
                  <Col>
                    <Label className="form-label">{primaryFilter === 'all_listings' ? 'Project' : 'Type'}</Label>
                    <Select
                      isClearable
                      options={sortingOptions}
                      classNamePrefix="select"
                      placeholder="Select type"
                      theme={selectThemeColors}
                      onChange={onChangeSort}
                      value={
                        secondFilterState.sort_by.length > 0
                          ? { value: secondFilterState.sort_by[0].value, label: secondFilterState.sort_by[0].label }
                          : null
                      }
                    />
                  </Col>
                )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.FILTERS.STATUS']}>
              {primaryFilter === 'my_bids' && userType !== userTypes.client ? (
                <Col>
                  <Label className="form-label">Bid status</Label>
                  <Select
                    isClearable
                    options={bidStatusesOptions}
                    classNamePrefix="select"
                    placeholder="Select status"
                    theme={selectThemeColors}
                    onChange={(value) => onChangeFilter('bid_statuses', value)}
                    value={
                      secondFilterState.bid_statuses.length > 0
                        ? {
                            value: secondFilterState.bid_statuses[0].value,
                            label: secondFilterState.bid_statuses[0].label,
                          }
                        : null
                    }
                  />
                </Col>
              ) : (
                <span className="w-auto">
                  {primaryFilter !== 'talents' &&
                    primaryFilter !== 'clients' &&
                    primaryFilter !== 'all_listings' &&
                    primaryFilter !== 'teams' && (
                      <Col>
                        <Label className="form-label">Status</Label>
                        <Select
                          isClearable
                          options={setStatusOptions()}
                          classNamePrefix="select"
                          placeholder="Select status"
                          theme={selectThemeColors}
                          onChange={(value) => onChangeFilter('statuses', value)}
                          value={
                            secondFilterState.statuses.length > 0
                              ? {
                                  value: secondFilterState.statuses[0].value,
                                  label: secondFilterState.statuses[0].label,
                                }
                              : null
                          }
                        />
                      </Col>
                    )}
                </span>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.FILTERS.PAYMENT_TYPE']}>
              {primaryFilter !== 'talents' && primaryFilter !== 'clients' && primaryFilter !== 'teams' && (
                <Col>
                  <Label className="form-label">Payment type</Label>
                  <Select
                    isClearable
                    options={projectTypesOptions}
                    classNamePrefix="select"
                    placeholder="Select type"
                    theme={selectThemeColors}
                    onChange={(value) => onChangeFilter('project_types', value)}
                    value={
                      secondFilterState.project_types.length > 0
                        ? {
                            value: secondFilterState.project_types[0].value,
                            label: secondFilterState.project_types[0].label,
                          }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.FILTERS.SKILLS']}>
              {(primaryFilter === 'all_listings' || primaryFilter === 'talents' || primaryFilter === 'teams'|| (userType === userTypes.flexternClient && primaryFilter==='my_listings')) && (
                <Col>
                  <Label className="form-label">Skills</Label>
                  <AsyncPaginate
                    isClearable
                    loadOptions={loadSkillsOptions}
                    classNamePrefix="wide"
                    placeholder="Select skill"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('skills', value)}
                    value={
                      secondFilterState.skills.length > 0
                        ? { value: secondFilterState.skills[0].value, label: secondFilterState.skills[0].label }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.FILTERS.TOOLS']}>
              {(primaryFilter === 'all_listings' || primaryFilter === 'talents' || primaryFilter === 'teams'|| (userType === userTypes.flexternClient && primaryFilter==='my_listings')) && (
                <Col>
                  <Label className="form-label">Tools</Label>
                  <AsyncPaginate
                    isClearable
                    loadOptions={loadToolsOptions}
                    classNamePrefix="wide"
                    placeholder="Select tool"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('tools', value)}
                    value={
                      secondFilterState.tools.length > 0
                        ? { value: secondFilterState.tools[0].value, label: secondFilterState.tools[0].label }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.FILTERS.COMPANY_INDUSTRY']}>
              {primaryFilter === 'clients' && (
                <Col>
                  <Label className="form-label">Company industry</Label>
                  <AsyncPaginate
                    isClearable
                    loadOptions={loadCompanyIndustriesOptions}
                    classNamePrefix="wide"
                    placeholder="Select industry"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('industries', value)}
                    value={
                      secondFilterState.industries.length > 0
                        ? { value: secondFilterState.industries[0].value, label: secondFilterState.industries[0].label }
                        : null
                    }
                  />
                </Col>
              )}
            </PermissionWrapper>
            <PermissionWrapper permissions={appPermissions} permissionName={['MARKETPLACE.FILTERS.PROJECT_AREA']}>
              {primaryFilter === 'clients' && (
                <Col>
                  <Label className="form-label">Project Area</Label>
                  <AsyncPaginate
                    isClearable
                    loadOptions={loadAreaOptions}
                    classNamePrefix="wide"
                    placeholder="Select area"
                    theme={selectThemeColors}
                    className={classNames('react-select')}
                    onChange={(value) => onChangeFilter('project_areas', value)}
                    value={
                      secondFilterState.project_areas.length > 0
                        ? {
                            value: secondFilterState.project_areas[0].value,
                            label: secondFilterState.project_areas[0].label,
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

      {!isLoading && (isAnyKeyNonEmptyArray(secondFilterState) || searchText) && (
        <SearchResultsCount metaData={selectMarkeMetaData} />
      )}

      {isLoading ? (
        <ComponentSpinner />
      ) : (
        <ResponsiveGrid>
          <InfiniteScroll
            dataLength={selectMarketPlaceData?.length}
            next={fetchMore}
            hasMore={hasMore}
            endMessage={
              <div className="d-flex justify-content-center ">
                {selectMarketPlaceData?.length === 0 ? (
                  <NoDataFoundComponent
                    isMyListing={primaryFilter === 'my_listings'}
                    isRecommanded={isRecommanded}
                    data={selectMarketPlaceData}
                  />
                ) : (
                  ''
                )}
              </div>
            }
            loader={<div className="d-flex justify-content-center">Loading...</div>}
            className="responsive-grid"
            style={
              primaryFilter === 'clients'
                ? {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill,minmax(33%,auto))',
                  }
                : {}
            }
          >
            {selectMarketPlaceData?.map((item) => {
              const CardComponent = getCardComp(item?.project?.status);

              return (
                <CardComponent
                  secondFilterState={secondFilterState}
                  key={item?._id || item?.id}
                  data={item}
                  isPopoverOpen={popoverOpen}
                  isExpanded={isExpanded}
                  primaryFilter={primaryFilter}
                  userType={primaryFilter === 'talents' ? userTypes.talent : userTypes.client}
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