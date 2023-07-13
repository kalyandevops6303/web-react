import { Col, Input, InputGroup, InputGroupText, Label, Row, UncontrolledTooltip } from 'reactstrap';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { RefreshCcw, Search } from 'react-feather';
import CollActive from '@src/assets/images/coll_active.png';
import ExpandInactive from '@src/assets/images/expand_inactive.png';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import InfiniteScroll from '../../../lib/infinite-scroll';
import debounce from '../../../lib/debounce';
import theme from '../../../configs/themeVariables';
import { FormWrapper, SecondaryFiltersWrap } from '../../styled';
import { selectThemeColors } from '../../../utility/Utils';
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

const SecondaryFilters = ({ primaryFilter, toggleExapantion, isExpanded, userType }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const selectMarketPlaceData = useSelector((state) => state.marketPlace.listData);
  const selectMarkeMetaData = useSelector((state) => state.marketPlace.metaData);
  const currentPreview = useSelector((state) => state.marketPlace.currentPreview);
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
  const [isRecommanded, setIsRecommanded] = useState(false);
  const [skillsOptions, setSkillsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);
  const [companyIndustriesOptions, setCompanyIndustriesOptions] = useState(null);
  const [projectAreasOptions, setProjectAreasOptions] = useState(null);

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
            <Col className="d-flex mt-auto mb-50 d-none">
              <Label className="view-label me-1" id="view-label">
                View:
              </Label>
              <img
                className="cursor-pointer"
                src={isExpanded ? ExpandInactive : CollActive}
                alt="collactive"
                onClick={() => toggleExapantion()}
              />
              <UncontrolledTooltip placement="right" target="view-label">
                <style>{`
                  .tooltip-inner {
                    background-color: white !important;
                    color: black !important;
                  }
                  .tooltip-arrow::before {
                    right: -1px;
                    border-right-color: white !important;
                  }
                `}</style>
                <div className="d-flex align-items-center">
                  <img className="me-50 " src={ExpandInactive} alt="collactive" onClick={() => toggleExapantion()} />
                  <span>Expand</span>
                </div>
                <div className="d-flex align-items-center">
                  <img className="me-50 " src={CollActive} alt="collactive" onClick={() => toggleExapantion()} />
                  <span>Compress</span>
                </div>
              </UncontrolledTooltip>
            </Col>
            {(userType === 'TALENT' || primaryFilter === 'talents') && (
              <Col>
                <Label className="form-label">Sort by</Label>
                <Select
                  options={sortingOptions}
                  classNamePrefix="select"
                  placeholder="Select"
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
                <Label className="form-label">Project types</Label>
                <Select
                  options={projectTypesOptions}
                  classNamePrefix="select"
                  placeholder="Project types"
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
            <Col className="reset-btn cursor-pointer" onClick={handleReset}>
              <div className="reset-icon">
                <RefreshCcw size={18} color={theme.activeNavPillText} />
              </div>
              <span className="reset-label">Reset</span>
            </Col>
          </Row>
        </SecondaryFiltersWrap>
      </FormWrapper>

      <InfiniteScroll
        dataLength={selectMarketPlaceData?.length}
        next={fetchMore}
        hasMore={hasMore}
        endMessage={
          <div className="d-flex justify-content-center mt-2">
            {selectMarketPlaceData?.length > 0 ? 'You have seen it all!' : 'No data found!'}
          </div>
        }
        loader={<div className="d-flex justify-content-center">Loading...</div>}
      >
        {selectMarketPlaceData?.map((item) => {
          const CardComponent = primaryFilter === 'talents' || primaryFilter === 'clients' ? UserCard : ProjectCard;
          return <CardComponent key={item?._id || item?.id} data={item} isExpanded={isExpanded} />;
        })}
      </InfiniteScroll>
    </>
  );
};

SecondaryFilters.propTypes = {
  toggleExapantion: PropTypes.func,
  isExpanded: PropTypes.bool,
  primaryFilter: PropTypes.string,
  userType: PropTypes.string,
};
SecondaryFilters.defaultProps = {
  toggleExapantion: () => {},
  isExpanded: false,
  primaryFilter: '',
  userType: '',
};

export default SecondaryFilters;
