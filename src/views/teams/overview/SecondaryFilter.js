/* eslint-disable no-undef */
import { Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import classNames from 'classnames';
import { RefreshCcw, Search } from 'react-feather';
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

import TeamCard from '../../cards/TeamCard';
import TalentCard from '../../cards/TalentCard';
import ClientCard from '../../cards/ClientCard';
import { skillsService, toolsService } from '../../../services/staticServices';
import capitalize from '../../../lib/capitalize';

const SecondaryFilters = ({ primaryFilter, userType }) => {
  const statusOptions = [
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Pending', value: 'PENDING' },
  ];
  const inviteTypeOptions = [
    { label: 'Sent', value: 'SENT' },
    { label: 'Received', value: 'RECEIVED' },
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
  const dispatch = useDispatch();
  const isTab = useIsTab();
  const popoverRef = useRef(null);

  const [hasMore, setHasMore] = useState(true);
  const [secondFilterState, setSecondFilterState] = useState({
    status: [],
    skills: [],
    tools: [],
    invite_type: [],
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

  // Function to toggle the popover

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

    if (primaryFilter === 'teams') {
      dispatch(
        getTeamListing({
          metaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'join_requests') {
      dispatch(
        getReqListing({
          metaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'recommendation') {
      dispatch(
        getRecommendationListings({
          metaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'talents') {
      dispatch(
        getTalentListing({
          metaData,
          onSuccess,
          onError,
          filterData: { ...filterData, search_query: searchText || '' },
          userType,
        }),
      );
    } else if (primaryFilter === 'clients') {
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
      invite_type: [],
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
    if (primaryFilter === 'teams') return TeamCard;

    if (primaryFilter === 'talents') return TalentCard;

    if (primaryFilter === 'clients') return ClientCard;

    if (primaryFilter === 'favourites') {
      if (secondFilterState?.user_type[0]?.value === 'TALENT') {
        return TalentCard;
      }
      if (secondFilterState?.user_type[0]?.value === 'TEAM') {
        return TeamCard;
      }
      if (secondFilterState?.user_type[0]?.value === 'CLIENT') {
        return ClientCard;
      }
    }

    if (primaryFilter === 'recommendation') {
      if (secondFilterState?.user_type[0]?.value === 'TALENT') {
        return TalentCard;
      }
      if (secondFilterState?.user_type[0]?.value === 'TEAM') {
        return TeamCard;
      }
      if (secondFilterState?.user_type[0]?.value === 'CLIENT') {
        return ClientCard;
      }
    }

    if (primaryFilter === 'join_requests' && userType === 'TEAM') return TalentCard;
    if (primaryFilter === 'join_requests') return TeamCard;
    return '';
  };

  const fetchMore = () => {
    const newMeteData = {
      ...metaData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectMyTeamMetaData?.current_page + 1 || 1,
    };

    const filterData = {};
    Object.keys(secondFilterState).forEach((key) => {
      filterData[key] = secondFilterState[key].map((item) => item.value);
    });
    if (primaryFilter === 'teams') {
      dispatch(getTeamListing({ searchText, metaData: newMeteData, onSuccess, onError, filterData }));
    } else if (primaryFilter === 'join-requests') {
      dispatch(getReqListing({ searchText, metaData: newMeteData, onSuccess, onError, filterData, userType }));
    } else if (primaryFilter === 'favourites') {
      dispatch(getFavListing({ searchText, metaData: newMeteData, onSuccess, onError, filterData, userType }));
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
      case 'teams':
        return 'Search team name';
      case 'clients':
        return 'Search client name';
      case 'talents':
        return 'Search talent name';
      case 'join_requests':
        return 'Search team name';
      case 'favourites':
        return `Search ${
          secondFilterState?.user_type[0]?.label ? capitalize(secondFilterState?.user_type[0]?.label) : ''
        } name`;
      case 'recommendation':
        return `Search ${
          secondFilterState?.user_type[0]?.label ? capitalize(secondFilterState?.user_type[0]?.label) : ''
        } name`;
      default:
        return '';
    }
  };

  if (isCardLoading && !selectCardData) {
    return '';
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
            {primaryFilter === 'favourites' || primaryFilter === 'recommendation' ? (
              <Col>
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
              <Col>
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
                    isClearable
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
                <Col>
                  <Label className="form-label">Type</Label>
                  <Select
                    isClearable
                    options={filterTypeOptions}
                    classNamePrefix="select"
                    placeholder="Select user"
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
              <Col>
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
          dataLength={selectMyTeamData?.length ?? 0}
          next={fetchMore}
          hasMore={hasMore}
          endMessage={
            <div className="d-flex justify-content-center ">
              {selectMyTeamData?.length === 0 ? <NoDataFoundComponent data={selectMyTeamData} /> : ''}
            </div>
          }
          loader={<div className="d-flex justify-content-center">Loading...</div>}
        >
          {selectMyTeamData?.length ? (
            <div
              className="justify-content-between grid-layout"
              style={
                (primaryFilter === 'recommendation' && secondFilterState.user_type[0]?.value === 'CLIENT') ||
                (primaryFilter === 'favourites' && secondFilterState.user_type[0]?.value === 'CLIENT') ||
                primaryFilter === 'clients'
                  ? { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', placeItems: 'center' }
                  : {}
              }
            >
              {selectMyTeamData?.map((item) => {
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
