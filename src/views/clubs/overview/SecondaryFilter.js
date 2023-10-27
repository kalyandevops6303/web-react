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

import { clearData } from '../../../redux/reducers/myTeams';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import NoDataFoundComponent from './NoDataFoundComp';
import {
  getClientListing,
  getFavListing,
  getRecommendationListings,
  getReqListing,
  getTalentListing,
  getTeamListing,
} from '../../../redux/actions/myTeamActions';

import ClubCard from '../../cards/ClubCard';
import { skillsService, toolsService } from '../../../services/staticServices';

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
    { label: 'New', value: 'NEW' },
    { label: 'Favorites', value: 'FAVORITES' },
    { label: 'Alma mater', value: 'ALMA_MATER' },
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
  const selectMyTeamData = useSelector((state) => state?.myTeams?.listData);
  const selectMyTeamMetaData = useSelector((state) => state?.myTeams?.metaData);
  const currentPreview = useSelector((state) => state?.myTeams?.currentPreview);
  const isLoading = useSelector((state) => state?.myTeams?.loading);
  const isCardLoading = useSelector((state) => state?.myTeams?.cardInfoLoading);
  const selectCardData = useSelector((state) => state?.myTeams?.cardData);

  const metaData = { page: 1, page_size: 10 };

  const data = [
    {
      _id: '650159af54f2ae9b1cabd31f',
      team_logo: '',
      introduction:
        'Hello I am trumio Hello I am trumio Hello I am trumio Hello I am trumio Hello I am trumio Hello I am trumio',
      tools: [
        {
          _id: '6486a6c33cf46b7a02d8bde3',
          name: 'Amazon AI Services',
        },
        {
          _id: '6486a6c33cf46b7a02d8bde4',
          name: 'Amazon ECS',
        },
        {
          _id: '6486a6c33cf46b7a02d8bdf2',
          name: 'AWS CloudFormation',
        },
        {
          _id: '6486a6c33cf46b7a02d8bdf3',
          name: 'AWS CodeDeploy',
        },
        {
          _id: '6486a6c33cf46b7a02d8bdf4',
          name: 'AWS Lambda',
        },
      ],
      languages_supported: [
        {
          _id: '64831445a51384fb6948e6a7',
          name: 'Algerian Spoken Arabic',
        },
      ],
      created_by: {
        first_name: 'Jack',
        hourly_rate: 3,
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64d60539e127974f873d31d8/38d800ea-b3e5-41ba-b5d6-0360a37f5ac2.jpeg',
        last_name: 'jones',
        professional_intro: '2',
        projects_worked_on_count: 0,
        rating: 0,
        tagline: 'Hi',
        work_experience: 24,
      },
      skills: [
        {
          _id: '6486a65e34730cac6a48042a',
          name: '.NET Core',
        },
        {
          _id: '6486a65e34730cac6a48042c',
          name: 'Accessibility',
        },
        {
          _id: '6486a65e34730cac6a48042e',
          name: 'Angular',
        },
        {
          _id: '6486a65e34730cac6a48042f',
          name: 'AngularJS',
        },
        {
          _id: '6486a65e34730cac6a480436',
          name: 'AWS (Amazon Web Services)',
        },
      ],
      availability: {
        timezone: {
          _id: '6479f0fafe992bcffe2ab6f5',
          offset: 10800,
          offset_name: 'UTC+03:00',
          name: 'Africa/Addis_Ababa',
          abbreviation: 'EAT',
        },
        weekdays_avl: {
          start_time: 3,
          end_time: 8,
          days: ['TUESDAY'],
        },
      },
      services: [
        {
          _id: '64cce2b52fae55f2dfd21af2',
          created_at: 1691148981229,
          updated_at: 1691148981229,
          is_deleted: false,
          name: 'Hardware',
        },
        {
          _id: '64cce2c42fae55f2dfd21af6',
          created_at: 1691148996230,
          updated_at: 1691148996230,
          is_deleted: false,
          name: 'Engineering',
        },
        {
          _id: '64cce2ef2fae55f2dfd21af8',
          name: 'Law',
          created_at: 1691149039495,
          is_deleted: false,
          updated_at: 1691149039495,
        },
        {
          _id: '64cce2ef2fae55f2dfd21af9',
          name: 'Medical',
          created_at: 1691149039495,
          is_deleted: false,
          updated_at: 1691149039495,
        },
        {
          _id: '64cce2ef2fae55f2dfd21afb',
          name: 'Other',
          created_at: 1691149039495,
          is_deleted: false,
          updated_at: 1691149039495,
        },
      ],
      name: 'Test team 3',
      tagline: 'Hello I am trumio',
      team_members: [
        {
          first_name: 'Jack',
          hourly_rate: 3,
          image_uri:
            'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64d60539e127974f873d31d8/38d800ea-b3e5-41ba-b5d6-0360a37f5ac2.jpeg',
          last_name: 'jones',
          professional_intro: '2',
          projects_worked_on_count: 0,
          rating: 0,
          tagline: 'Hi',
          work_experience: 24,
        },
      ],
      match_percentage: 80,
      team_members_count: 1,
      is_favourite: false,
      user_type: 'TEAM',
      project: {},
      is_favorite: false,
    },
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
    if (currentPreview?.length === 0 || selectMyTeamData?.length === selectMyTeamMetaData?.total_records) {
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
        getTeamListing({
          metaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'all_clubs') {
      dispatch(
        getClientListing({
          metaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'favourites') {
      dispatch(
        getFavListing({
          metaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
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
      page: selectMyTeamMetaData?.current_page + 1 || 1,
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

    if (primaryFilter === 'teams') {
      dispatch(
        getTeamListing({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'join_requests') {
      dispatch(
        getReqListing({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'recommendation') {
      dispatch(
        getRecommendationListings({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'talents') {
      dispatch(
        getTalentListing({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'clients') {
      dispatch(
        getClientListing({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'favourites') {
      dispatch(
        getFavListing({
          metaData: newMetaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
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

      {isLoading ? (
        <ComponentSpinner />
      ) : (
        <InfiniteScroll
          dataLength={data?.length ?? 0}
          next={fetchMore}
          hasMore={hasMore}
          endMessage={
            <div className="d-flex justify-content-center ">
              {data?.length === 0 ? (
                <NoDataFoundComponent isRecommanded={primaryFilter === 'recommendation'} data={data} />
              ) : (
                ''
              )}
            </div>
          }
          loader={<div className="d-flex justify-content-center">Loading...</div>}
        >
          {data?.length ? (
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
              {data?.map((item) => {
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
