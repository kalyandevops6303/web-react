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
import { selectThemeColors, useIsTab } from '../../../utility/Utils';
import { getListProjects, getUsers } from '../../../redux/actions/marketPlaceActions';
import {
  companyIndustriesService,
  projectAreasService,
  skillsService,
  toolsService,
} from '../../../services/staticServices';
import UserCard from '../../cards/UserCard';
import ProjectCard from '../../cards/ProjectCard';
import { clearData } from '../../../redux/reducers/marketPlace';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import { userTypes } from '../../../utility/constants/Constant';
import NoDataFoundComponent from './NoDataFoundComp';

const SecondaryFilters = ({ primaryFilter, userType }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const isTab = useIsTab();
  const popoverRef = useRef(null);

  const [hasMore, setHasMore] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectMarketPlaceData = useSelector((state) => state.marketPlace.listData);
  const selectMarkeMetaData = useSelector((state) => state.marketPlace.metaData);
  const currentPreview = useSelector((state) => state.marketPlace.currentPreview);
  const isLoading = useSelector((state) => state.marketPlace.loading);

  const metaData = { page: 1, page_size: 10 };
  const [secondFilterState, setSecondFilterState] = useState({
    statuses: [],
    project_types: [],
    skills: [],
    tools: [],
    sort_by: [],
    industries: [],
    project_areas: [],
  });
  const [isRecommanded, setIsRecommanded] = useState(location?.state?.isRecommended || false);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [companyIndustriesOptions, setCompanyIndustriesOptions] = useState(null);
  const [projectAreasOptions, setProjectAreasOptions] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Function to toggle the popover
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const statusesOptions = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In-review', value: 'IN_REVIEW' },
    { label: 'Terminated', value: 'TERMINATED' },
    { label: 'Closed', value: 'CLOSED' },
  ];
  const projectTypesOptions = [
    { label: 'Fixed', value: 'FIXED' },
    { label: 'Variable', value: 'VARIABLE' },
  ];
  const sortingOptions = [
    { label: 'New', value: 'NEW' },
    { label: 'Recommended', value: 'RECOMMADED' },
  ];

  const onSuccess = () => {};
  const onError = () => {
    setHasMore(false);
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

  useEffect(() => {
    setHasMore(true);
    if (currentPreview.length === 0 || selectMarketPlaceData?.length === selectMarkeMetaData?.total_records) {
      setHasMore(false);
    }
  }, [currentPreview]);

  useEffect(() => {
    dispatch(clearData());
    const valuesOnly = {};
    Object.keys(secondFilterState).forEach((key) => {
      valuesOnly[key] = secondFilterState[key].map((item) => item.value);
    });
    if (primaryFilter === 'talents' || primaryFilter === 'clients') {
      dispatch(
        getUsers({
          isRecommanded,
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
          isRecommanded,
          metaData,
          userType,
          onSuccess,
          onError,
          postData: valuesOnly,
          searchText,
        }),
      );
    }
  }, [secondFilterState, searchText, primaryFilter, isRecommanded]);

  const onChangeStatus = (value) => {
    setSecondFilterState({
      ...secondFilterState,
      statuses: [value],
    });
  };

  useEffect(() => {
    if (location?.state?.isRecommended) {
      setSecondFilterState({
        ...secondFilterState,
        sort_by: [{ label: 'Recommended', value: 'RECOMMADED' }],
      });
      setIsRecommanded(true);
    }
  }, [location]);

  const onChangeSort = (value) => {
    setSecondFilterState({
      ...secondFilterState,
      sort_by: [value],
    });
    if (value.value === 'RECOMMADED') {
      setIsRecommanded(true);
    } else {
      setIsRecommanded(false);
    }
  };
  const inputRef = useRef();

  const onChangeProjectType = (value) => {
    setSecondFilterState({
      ...secondFilterState,
      project_types: [value],
    });
  };
  const onChangeSkill = (value) => {
    setSecondFilterState({
      ...secondFilterState,
      skills: [value],
    });
  };
  const onChangeTools = (value) => {
    setSecondFilterState({
      ...secondFilterState,
      tools: [value],
    });
  };
  const onChangeIndustry = (value) => {
    setSecondFilterState({
      ...secondFilterState,
      industries: [value],
    });
  };
  const onChangeArea = (value) => {
    setSecondFilterState({
      ...secondFilterState,
      project_areas: [value],
    });
  };
  const handleReset = () => {
    setSecondFilterState({
      statuses: [],
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
    setIsRecommanded(false);
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

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
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
      valuesOnly[key] = secondFilterState[key].map((item) => item.value);
    });
    if (primaryFilter === 'talents' || primaryFilter === 'clients') {
      dispatch(
        getUsers({
          isRecommanded,
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
          isRecommanded,
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

  const isUsers =
    location.pathname?.split('/')?.includes('clients') || location.pathname?.split('/')?.includes('talents');

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
                placeholder={isUsers ? 'Search users' : 'Search project name, user name'}
              />
            </InputGroup>
          </div>
          <Row>
            {primaryFilter !== 'talents' &&
              primaryFilter !== 'clients' &&
              (isTab ? (
                <div className="d-flex mt-auto mb-1 cursor-pointer" id="popoverButton">
                  {ExpandCollapseComp}
                </div>
              ) : (
                <Col className="d-flex mt-auto mb-50 cursor-pointer" id="popoverButton">
                  {ExpandCollapseComp}
                </Col>
              ))}
            {(userType === userTypes.talent || primaryFilter === 'talents') && (
              <Col>
                <Label className="form-label">Sort by</Label>
                <Select
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
            {primaryFilter !== 'talents' && primaryFilter !== 'clients' && (
              <Col>
                <Label className="form-label">Status</Label>
                <Select
                  options={statusesOptions}
                  classNamePrefix="select"
                  placeholder="Select status"
                  theme={selectThemeColors}
                  onChange={onChangeStatus}
                  value={
                    secondFilterState.statuses.length > 0
                      ? { value: secondFilterState.statuses[0].value, label: secondFilterState.statuses[0].label }
                      : null
                  }
                />
              </Col>
            )}
            {primaryFilter !== 'talents' && primaryFilter !== 'clients' && (
              <Col>
                <Label className="form-label">Payment type</Label>
                <Select
                  options={projectTypesOptions}
                  classNamePrefix="select"
                  placeholder="Select type"
                  theme={selectThemeColors}
                  onChange={onChangeProjectType}
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
            {(primaryFilter === 'all_listings' || primaryFilter === 'talents') && (
              <Col>
                <Label className="form-label">Skills</Label>
                <AsyncPaginate
                  loadOptions={loadSkillsOptions}
                  classNamePrefix="wide"
                  placeholder="Select skill"
                  theme={selectThemeColors}
                  className={classNames('react-select')}
                  onChange={onChangeSkill}
                  value={
                    secondFilterState.skills.length > 0
                      ? { value: secondFilterState.skills[0].value, label: secondFilterState.skills[0].label }
                      : null
                  }
                />
              </Col>
            )}
            {(primaryFilter === 'all_listings' || primaryFilter === 'talents') && (
              <Col>
                <Label className="form-label">Tools</Label>
                <AsyncPaginate
                  loadOptions={loadToolsOptions}
                  classNamePrefix="wide"
                  placeholder="Select tool"
                  theme={selectThemeColors}
                  className={classNames('react-select')}
                  onChange={onChangeTools}
                  value={
                    secondFilterState.tools.length > 0
                      ? { value: secondFilterState.tools[0].value, label: secondFilterState.tools[0].label }
                      : null
                  }
                />
              </Col>
            )}
            {primaryFilter === 'clients' && (
              <Col>
                <Label className="form-label">Company industry</Label>
                <AsyncPaginate
                  loadOptions={loadCompanyIndustriesOptions}
                  classNamePrefix="wide"
                  placeholder="Select industry"
                  theme={selectThemeColors}
                  className={classNames('react-select')}
                  onChange={onChangeIndustry}
                  value={
                    secondFilterState.industries.length > 0
                      ? { value: secondFilterState.industries[0].value, label: secondFilterState.industries[0].label }
                      : null
                  }
                />
              </Col>
            )}

            {primaryFilter === 'clients' && (
              <Col>
                <Label className="form-label">Project Area</Label>
                <AsyncPaginate
                  loadOptions={loadAreaOptions}
                  classNamePrefix="wide"
                  placeholder="Select area"
                  theme={selectThemeColors}
                  className={classNames('react-select')}
                  onChange={onChangeArea}
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

      {isLoading ? (
        <ComponentSpinner />
      ) : (
        <InfiniteScroll
          dataLength={selectMarketPlaceData?.length}
          next={fetchMore}
          hasMore={hasMore}
          endMessage={
            <div className="d-flex justify-content-center ">
              {selectMarketPlaceData?.length > 0 ? (
                <span className="mt-2">You have seen it all!</span>
              ) : (
                <NoDataFoundComponent isRecommanded={isRecommanded} data={selectMarketPlaceData} />
              )}
            </div>
          }
          loader={<div className="d-flex justify-content-center">Loading...</div>}
        >
          <div className="d-flex flex-wrap justify-content-between">
            {selectMarketPlaceData?.map((item) => {
              const CardComponent = primaryFilter === 'talents' || primaryFilter === 'clients' ? UserCard : ProjectCard;
              return (
                <CardComponent
                  key={item?._id || item?.id}
                  data={item}
                  isPopoverOpen={popoverOpen}
                  isExpanded={isExpanded}
                  userType={primaryFilter === 'talents' ? userTypes.talent : userTypes.client}
                />
              );
            })}
          </div>
        </InfiniteScroll>
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
