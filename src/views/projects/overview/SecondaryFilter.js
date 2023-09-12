/* eslint-disable no-undef */
import { Col, Input, InputGroup, InputGroupText, Label, Popover, PopoverBody, Row } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
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
import ProjectCard from './ProjectCard';
import { clearData } from '../../../redux/reducers/marketPlace';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import { projectTypesOptions, statusesOptions, userTypes } from '../../../utility/constants/Constant';
import NoDataFoundComponent from './NoDataFoundComp';

const SecondaryFilters = ({ primaryFilter, userType }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const isTab = useIsTab();
  const popoverRef = useRef(null);
  const inputRef = useRef();

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
    sort_by: location?.state?.isRecommended ? [{ label: 'Recommended', value: 'RECOMMADED' }] : [],
    industries: [],
    project_areas: [],
  });
  const { sort_by } = secondFilterState;

  const [popoverOpen, setPopoverOpen] = useState(false);

  const isRecommanded = sort_by[0]?.value === 'RECOMMADED';

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

  const onSuccess = () => {};
  const onError = () => {
    setHasMore(false);
  };
  useEffect(() => {
    dispatch(clearData());
    const valuesOnly = {};
    Object.keys(secondFilterState).forEach((key) => {
      valuesOnly[key] = secondFilterState[key].map((item) => item.value);
    });
    if (primaryFilter === 'talents' || primaryFilter === 'clients' || primaryFilter === 'teams') {
      dispatch(
        getUsers({
          isRecommanded,
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

  useEffect(() => {
    if (location?.state?.isRecommended) {
      setSecondFilterState({
        ...secondFilterState,
        sort_by: [{ label: 'Recommended', value: 'RECOMMADED' }],
      });
    }
  }, [location]);

  // Function to toggle the popover
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
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
    if (primaryFilter === 'talents' || primaryFilter === 'clients' || primaryFilter === 'teams') {
      dispatch(
        getUsers({
          isRecommanded,
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
                placeholder="Search project name, user name"
              />
            </InputGroup>
          </div>
          <Row>
            {isTab ? (
              <div className="d-flex mt-auto mb-1 cursor-pointer" id="popoverButton">
                {ExpandCollapseComp}
              </div>
            ) : (
              <Col className="d-flex mt-auto mb-50 cursor-pointer" id="popoverButton">
                {ExpandCollapseComp}
              </Col>
            )}
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

            {userType === userTypes.talent || userType === userTypes.team ? (
              <Col>
                <Label className="form-label">Client Name</Label>
                <Select
                  isClearable
                  options={[]}
                  classNamePrefix="select"
                  placeholder="Select Client"
                  theme={selectThemeColors}
                  onChange={() => {}}
                  value={null}
                />
              </Col>
            ) : (
              <Col>
                <Label className="form-label">Talent Name</Label>
                <Select
                  isClearable
                  options={[]}
                  classNamePrefix="select"
                  placeholder="Select Talent"
                  theme={selectThemeColors}
                  onChange={() => {}}
                  value={null}
                />
              </Col>
            )}
            <Col>
              <Label className="form-label">Status</Label>
              <Select
                isClearable
                options={statusesOptions}
                classNamePrefix="select"
                placeholder="Select status"
                theme={selectThemeColors}
                onChange={(value) => onChangeFilter('statuses', value)}
                value={
                  secondFilterState.statuses.length > 0
                    ? { value: secondFilterState.statuses[0].value, label: secondFilterState.statuses[0].label }
                    : null
                }
              />
            </Col>
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
                <NoDataFoundComponent
                  isMyListing={primaryFilter === 'my_listings'}
                  isRecommanded={isRecommanded}
                  data={selectMarketPlaceData}
                />
              )}
            </div>
          }
          loader={<div className="d-flex justify-content-center">Loading...</div>}
        >
          <div className="d-flex flex-wrap justify-content-between">
            {selectMarketPlaceData?.map((item) => (
              <ProjectCard
                key={item?._id || item?.id}
                data={item}
                isPopoverOpen={popoverOpen}
                isExpanded={isExpanded}
                userType={primaryFilter === 'talents' ? userTypes.talent : userTypes.client}
              />
            ))}
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
