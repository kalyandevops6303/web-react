/* eslint-disable no-undef */
import { Col, Input, InputGroup, InputGroupText, Label, Popover, PopoverBody, Row } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import classNames from 'classnames';
import { RefreshCcw, Search } from 'react-feather';
import CollActive from '@src/assets/images/coll_active.png';
import ExpandInactive from '@src/assets/images/expand_inactive.png';
import CollInactive from '@src/assets/images/coll_inactive.png';
import ExpandActive from '@src/assets/images/expand_active.png';

import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import InfiniteScroll from '../../../lib/infinite-scroll';
import debounce from '../../../lib/debounce';
import throttle from '../../../lib/throttle';
import theme from '../../../configs/themeVariables';
import { FormWrapper, SecondaryFiltersWrap } from '../../styled';
import { selectThemeColors, useIsTab } from '../../../utility/Utils';

import { clearData } from '../../../redux/reducers/clubs';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import NoDataFoundComponent from './NoDataFoundComp';

import ClubCard from '../../cards/ClubCard';
import { skillsService, toolsService } from '../../../services/staticServices';
import { getClubs } from '../../../redux/actions/clubActions';
import { ResponsiveGrid } from '../../cards/style';
import SearchResultsCount from '../../../@core/components/SearchResultsCount';

const SecondaryFilters = ({ primaryFilter, userType }) => {
  const statusOptions = [
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'Pending', value: 'PENDING' },
  ];
  const inviteTypeOptions = [
    { label: 'Received', value: 'RECEIVED' },
    { label: 'Sent', value: 'SENT' },
  ];

  const userTypeOptions = [
    { label: 'Team', value: 'TEAM' },
    { label: 'Client', value: 'CLIENT' },
    { label: 'Talent', value: 'TALENT' },
  ].filter((item) => item.value !== userType);

  const filterTypeOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'My Clubs', value: 'MY_CLUBS' },
    { label: 'Favorites', value: 'FAVORITES' },
  ];

  const [searchText, setSearchText] = useState('');

  const [skillsOptions, setSkillsOptions] = useState(null);
  const [toolsOptions, setToolsOptions] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();
  const isTab = useIsTab();
  const popoverRef = useRef(null);

  const [hasMore, setHasMore] = useState(true);
  const [secondFilterState, setSecondFilterState] = useState({
    status: [],
    skills: [],
    tools: [],
    invite_type: [inviteTypeOptions[0]],
    user_type: [userTypeOptions[0]],
    filter_type: [{ label: 'All', value: 'ALL' }],
  });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const selectClubsData = useSelector((state) => state?.clubs?.listData);
  const selectClubsMetaData = useSelector((state) => state?.clubs?.metaData);
  const currentPreview = useSelector((state) => state?.clubs?.currentPreview);
  const isLoading = useSelector((state) => state?.clubs?.loading);
  const isCardLoading = useSelector((state) => state?.clubs?.cardInfoLoading);
  const selectCardData = useSelector((state) => state?.clubs?.cardData);

  const metaData = { page: 1, page_size: 10 };

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
    if (currentPreview?.length === 0 || selectClubsData?.length === selectClubsMetaData?.total_records) {
      setHasMore(false);
    }
  }, [currentPreview]);

  useEffect(() => {
    dispatch(clearData());

    const filterData = {};

    Object.keys(secondFilterState).forEach((key) => {
      if (Array.isArray(secondFilterState[key])) {
        if (key === 'invite_type' || key === 'user_type') {
          filterData[key] = secondFilterState[key][0]?.value;
        } else {
          filterData[key] = secondFilterState[key].map((item) => item.value);
        }
      }
    });

    if (primaryFilter === 'my_clubs') {
      dispatch(
        getClubs({
          metaData,
          onSuccess,
          onError,
          filterData: { clubs_filter: 'MY_CLUBS', search_query: searchText || '' },
        }),
      );
    } else if (primaryFilter === 'all_clubs') {
      dispatch(
        getClubs({
          metaData,
          onSuccess,
          onError,
          filterData: { clubs_filter: 'ALL', search_query: searchText || '' },
        }),
      );
    } else if (primaryFilter === 'favourites') {
      dispatch(
        getClubs({
          metaData,
          onSuccess,
          onError,
          filterData: { clubs_filter: 'FAVORITES', search_query: searchText || '' },
        }),
      );
    }
  }, [secondFilterState, searchText, primaryFilter]);

  const inputRef = useRef();

  const onChangeFilter = (key, value) => {
    setSecondFilterState({
      ...secondFilterState,
      [key]: value ? [value] : [],
    });
  };

  const handleReset = () => {
    setSecondFilterState({
      status: [],
      skills: [],
      tools: [],
      invite_type: [inviteTypeOptions[0]],
      user_type: [userTypeOptions[0]],
      filter_type: [{ label: 'All', value: 'ALL' }],
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

  const getCardComp = () => {
    if (primaryFilter === 'my_clubs') return ClubCard;

    if (primaryFilter === 'all_clubs') return ClubCard;

    if (primaryFilter === 'favourites') return ClubCard;

    return '';
  };

  const fetchMore = () => {
    const newMetaData = {
      ...metaData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectClubsMetaData?.current_page + 1 || 1,
    };

    const filterData = {};

    Object.keys(secondFilterState).forEach((key) => {
      if (Array.isArray(secondFilterState[key])) {
        if (key === 'invite_type' || key === 'user_type') {
          filterData[key] = secondFilterState[key][0]?.value;
        } else {
          filterData[key] = secondFilterState[key].map((item) => item.value);
        }
      }
    });

    if (primaryFilter === 'my_clubs') {
      dispatch(
        getClubs({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { clubs_filter: 'MY_CLUBS', search_query: searchText || '' },
        }),
      );
    } else if (primaryFilter === 'all_clubs') {
      dispatch(
        getClubs({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { clubs_filter: 'ALL', search_query: searchText || '' },
        }),
      );
    } else if (primaryFilter === 'favourites') {
      dispatch(
        getClubs({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { clubs_filter: 'FAVORITES', search_query: searchText || '' },
        }),
      );
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

  const getSearchPlaceholder = () => {
    switch (primaryFilter) {
      case 'my_clubs':
        return 'Search project name, user name';
      case 'all_clubs':
        return 'Search project name, user name';
      case 'favourites':
        return 'Search Club name';
      default:
        return '';
    }
  };
  // Function to toggle the popover
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
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
              <Input
                innerRef={inputRef}
                onChange={debounce(handleSearchTextChange, 300)}
                placeholder={getSearchPlaceholder()}
              />
            </InputGroup>
          </div>

          <Row>
            {isTab ? (
              <div className="w-max d-flex mt-auto mb-1 cursor-pointer" id="popoverButton">
                {ExpandCollapseComp}
              </div>
            ) : (
              <Col className="w-max d-flex mt-auto mb-50 cursor-pointer" id="popoverButton">
                {ExpandCollapseComp}
              </Col>
            )}

            {primaryFilter === 'favourites' || primaryFilter === 'recommendation' ? (
              <Col className="d-none">
                <Label className="form-label">User Type</Label>
                <Select
                  options={userTypeOptions}
                  classNamePrefix="select"
                  placeholder="Select User Type"
                  theme={selectThemeColors}
                  onChange={(value) => onChangeFilter('user_type', value)}
                  value={
                    secondFilterState.user_type.length > 0
                      ? {
                          value: secondFilterState.user_type[0].value,
                          label: secondFilterState.user_type[0].label,
                        }
                      : null
                  }
                />
              </Col>
            ) : null}

            {primaryFilter === 'invitations' || primaryFilter === 'join_requests' ? (
              <Col className="d-none">
                <Label className="form-label">Status</Label>
                <Select
                  isClearable
                  options={statusOptions}
                  classNamePrefix="select"
                  placeholder="Select status"
                  theme={selectThemeColors}
                  onChange={(value) => onChangeFilter('status', value)}
                  value={
                    secondFilterState.status.length > 0
                      ? { value: secondFilterState.status[0].value, label: secondFilterState.status[0].label }
                      : null
                  }
                />
              </Col>
            ) : null}

            {primaryFilter === 'join_requests' ? (
              <>
                <Col>
                  <Label className="form-label">Invite Type</Label>
                  <Select
                    options={inviteTypeOptions}
                    classNamePrefix="select"
                    placeholder="Select user"
                    theme={selectThemeColors}
                    onChange={(value) => onChangeFilter('invite_type', value)}
                    value={
                      secondFilterState.invite_type.length > 0
                        ? {
                            value: secondFilterState.invite_type[0].value,
                            label: secondFilterState.invite_type[0].label,
                          }
                        : null
                    }
                  />
                </Col>
                <Col className="d-none">
                  <Label className="form-label">Type</Label>
                  <Select
                    options={filterTypeOptions}
                    classNamePrefix="select"
                    placeholder="Select type"
                    theme={selectThemeColors}
                    onChange={(value) => onChangeFilter('filter_type', value)}
                    value={
                      secondFilterState.filter_type.length > 0
                        ? {
                            value: secondFilterState.filter_type[0].value,
                            label: secondFilterState.filter_type[0].label,
                          }
                        : null
                    }
                  />
                </Col>
              </>
            ) : null}
            {primaryFilter === 'favourites' || primaryFilter === 'recommendation' ? (
              <Col className="d-none">
                <Label className="form-label">Type</Label>
                <Select
                  isClearable
                  options={filterTypeOptions}
                  classNamePrefix="select"
                  placeholder="Select type"
                  theme={selectThemeColors}
                  onChange={(value) => onChangeFilter('filter_type', value)}
                  value={
                    secondFilterState.filter_type.length > 0
                      ? {
                          value: secondFilterState.filter_type[0].value,
                          label: secondFilterState.filter_type[0].label,
                        }
                      : null
                  }
                />
              </Col>
            ) : null}
            {(primaryFilter === 'recommendation' ||
              primaryFilter === 'clients' ||
              primaryFilter === 'talents' ||
              primaryFilter === 'teams') && (
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
            {(primaryFilter === 'recommendation' ||
              primaryFilter === 'clients' ||
              primaryFilter === 'talents' ||
              primaryFilter === 'teams') && (
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

            {!isTab && (
              <Col className="d-none reset-btn cursor-pointer" onClick={handleReset}>
                <div className="reset-icon">
                  <RefreshCcw size={18} color={theme.activeNavPillText} />
                </div>
                <span className="reset-label">Reset</span>
              </Col>
            )}
            {isTab && (
              <div className="d-none reset-btn cursor-pointer" onClick={handleReset}>
                <div className="reset-icon">
                  <RefreshCcw size={18} color={theme.activeNavPillText} />
                </div>
                <span className="reset-label">Reset</span>
              </div>
            )}
          </Row>
        </SecondaryFiltersWrap>
      </FormWrapper>

      {!isLoading && <SearchResultsCount metaData={selectClubsMetaData} />}

      {isLoading ? (
        <ComponentSpinner />
      ) : (
        <ResponsiveGrid>
          <InfiniteScroll
            dataLength={selectClubsData?.length ?? 0}
            next={fetchMore}
            hasMore={hasMore}
            endMessage={
              <div className="d-flex justify-content-center ">
                {selectClubsData?.length === 0 ? (
                  <NoDataFoundComponent isRecommanded={primaryFilter === 'recommendation'} data={selectClubsData} />
                ) : (
                  ''
                )}
              </div>
            }
            loader={<div className="d-flex justify-content-center">Loading...</div>}
          >
            {selectClubsData?.length ? (
              <div
                className="justify-content-between grid-layout"
                style={
                  (primaryFilter === 'recommendation' && secondFilterState.user_type[0]?.value === 'CLIENT') ||
                  (primaryFilter === 'favourites' && secondFilterState.user_type[0]?.value === 'CLIENT') ||
                  primaryFilter === 'clients'
                    ? {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(33%,auto))',
                      }
                    : {}
                }
              >
                {selectClubsData?.map((item) => {
                  const CardComponent = getCardComp();

                  return (
                    <CardComponent
                      key={item?._id || item?.id}
                      data={item}
                      isPopoverOpen={popoverOpen}
                      userType={userType}
                      isProjectWithTeam={primaryFilter === 'my-teams'}
                      isTeam={primaryFilter === 'invitations' || primaryFilter === 'join-requests'}
                    />
                  );
                })}
              </div>
            ) : null}
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
