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
import { PropTypes } from 'prop-types';
import InfiniteScroll from '../../../lib/infinite-scroll';
import debounce from '../../../lib/debounce';
import throttle from '../../../lib/throttle';
import theme from '../../../configs/themeVariables';
import { FormWrapper, SecondaryFiltersWrap } from '../../styled';
import { selectThemeColors, useIsTab } from '../../../utility/Utils';
import { getItem } from '../../../utility/localStorageControl';

import { clearData } from '../../../redux/reducers/myTeams';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import { userTypes } from '../../../utility/constants/Constant';
import NoDataFoundComponent from './NoDataFoundComp';
import {
  getFavListing,
  getInvitationListing,
  getReqListing,
  getTeamListing,
} from '../../../redux/actions/myTeamActions';
import UserCard from '../../cards/UserCard';
import ProjectCard from '../../cards/ProjectCard';

const SecondaryFilters = ({ primaryFilter, userType }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const isTab = useIsTab();
  const popoverRef = useRef(null);

  const userData = getItem('userData');

  const [hasMore, setHasMore] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [secondFilterState, setSecondFilterState] = useState({
    statuses: [],
    project_types: [],
    invited_by: [],
    project_status: [],
    invite_types: [],
    user_type: [],
  });
  const [popoverOpen, setPopoverOpen] = useState(false);

  const selectMyTeamData = useSelector((state) => state?.myTeams?.listData);
  const selectMyTeamMetaData = useSelector((state) => state?.myTeams?.metaData);
  const currentPreview = useSelector((state) => state?.myTeams?.currentPreview);
  const isLoading = useSelector((state) => state?.myTeams?.loading);

  const metaData = { page: 1, page_size: 10 };

  // Function to toggle the popover
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const projectStatusOptions = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In-review', value: 'IN_REVIEW' },
    { label: 'Terminated', value: 'TERMINATED' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'Disputed', value: 'DISPUTED' },
    { label: 'Completed', value: 'COMPLETED' },
  ];
  const projectTypesOptions = [
    { label: 'Fixed', value: 'FIXED' },
    { label: 'Variable', value: 'VARIABLE' },
  ];
  const invitedByOptions = [
    { label: 'Talent', value: 'TALENT' },
    { label: 'Client', value: 'CLIENT' },
  ];
  const statusOptions = [
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Pending', value: 'PENDING' },
  ];
  const inviteTypeOptions = [
    { label: 'Team Invites', value: 'TEAM_INVITES' },
    { label: 'Team Requests', value: 'TEAM_REQUESTS' },
    { label: 'Talent Requests', value: 'TALENT_REQUESTS' },
  ];

  const userTypeOptions = [
    { label: 'Talent', value: 'TALENT' },
    { label: 'Client', value: 'CLIENT' },
    { label: 'Team', value: 'TEAM' },
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
      filterData[key] = secondFilterState[key].map((item) => item.value);
    });

    if (primaryFilter === 'my-teams') {
      dispatch(getTeamListing({ searchText, metaData, onSuccess, onError, filterData }));
    } else if (primaryFilter === 'invitations') {
      dispatch(getInvitationListing({ metaData, onSuccess, onError, filterData, userType }));
    } else if (primaryFilter === 'join-requests') {
      dispatch(getReqListing({ searchText, metaData, onSuccess, onError, filterData, userType }));
    } else if (primaryFilter === 'favourites') {
      dispatch(getFavListing({ searchText, metaData, onSuccess, onError, filterData, userType }));
    }
  }, [secondFilterState, searchText, primaryFilter]);

  const inputRef = useRef();

  const onChangeFilter = (key, value) => {
    setSecondFilterState({
      ...secondFilterState,
      [key]: [value],
    });
  };

  const handleReset = () => {
    setSecondFilterState({
      statuses: [],
      project_types: [],
      invited_by: [],
      project_status: [],
      invite_types: [],
      user_type: [],
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
      page: selectMyTeamMetaData?.current_page + 1 || 1,
    };

    const valuesOnly = {};
    Object.keys(secondFilterState).forEach((key) => {
      valuesOnly[key] = secondFilterState[key].map((item) => item.value);
    });

    if (primaryFilter === 'my-teams') {
      dispatch(getTeamListing({ searchText, metaData: newMeteData, onSuccess, onError, filterData }));
    } else if (primaryFilter === 'invitations') {
      dispatch(getInvitationListing({ metaData: newMeteData, onSuccess, onError, filterData, userType }));
    } else if (primaryFilter === 'join-requests') {
      dispatch(getReqListing({ searchText, metaData: newMeteData, onSuccess, onError, filterData, userType }));
    } else if (primaryFilter === 'favourites') {
      dispatch(getFavListing({ searchText, metaData: newMeteData, onSuccess, onError, filterData, userType }));
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
                placeholder={
                  // eslint-disable-next-line no-nested-ternary
                  userType === userTypes.talent
                    ? 'Search team name, client name'
                    : userType === userTypes.client
                    ? 'Search talent name, team name'
                    : 'Search client name'
                }
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
            {primaryFilter === 'invitations' || primaryFilter === 'favourites' ? (
              <Col>
                <Label className="form-label">User Type</Label>
                <Select
                  options={userTypeOptions}
                  classNamePrefix="select"
                  placeholder="Select User Type"
                  theme={selectThemeColors}
                  onChange={(value) => onChangeFilter('project_status', value)}
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
            {primaryFilter === 'my-teams' ? (
              <Col>
                <Label className="form-label">Project Status</Label>
                <Select
                  options={projectStatusOptions}
                  classNamePrefix="select"
                  placeholder="Select status"
                  theme={selectThemeColors}
                  onChange={(value) => onChangeFilter('project_status', value)}
                  value={
                    secondFilterState.project_status.length > 0
                      ? {
                          value: secondFilterState.project_status[0].value,
                          label: secondFilterState.project_status[0].label,
                        }
                      : null
                  }
                />
              </Col>
            ) : null}
            {primaryFilter === 'invitations' || primaryFilter === 'join-requests' ? (
              <Col>
                <Label className="form-label">Status</Label>
                <Select
                  options={statusOptions}
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
            ) : null}
            {primaryFilter === 'invitations' && (
              <Col>
                <Label className="form-label">Project type</Label>
                <Select
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
            {primaryFilter === 'invitations' ? (
              <Col>
                <Label className="form-label">Invited By</Label>
                <Select
                  options={invitedByOptions}
                  classNamePrefix="select"
                  placeholder="Select user"
                  theme={selectThemeColors}
                  onChange={(value) => onChangeFilter('invited_by', value)}
                  value={
                    secondFilterState.invited_by.length > 0
                      ? {
                          value: secondFilterState.invited_by[0].value,
                          label: secondFilterState.invited_by[0].label,
                        }
                      : null
                  }
                />
              </Col>
            ) : null}
            {primaryFilter === 'join-requests' ? (
              <Col>
                <Label className="form-label">Invite Type</Label>
                <Select
                  options={inviteTypeOptions}
                  classNamePrefix="select"
                  placeholder="Select user"
                  theme={selectThemeColors}
                  onChange={(value) => onChangeFilter('invited_by', value)}
                  value={
                    secondFilterState.invite_types.length > 0
                      ? {
                          value: secondFilterState.invite_types[0].value,
                          label: secondFilterState.invite_types[0].label,
                        }
                      : null
                  }
                />
              </Col>
            ) : null}
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
              {selectMyTeamData?.length > 0 ? (
                <span className="mt-2">You have seen it all!</span>
              ) : (
                <NoDataFoundComponent data={selectMyTeamData} />
              )}
            </div>
          }
          loader={<div className="d-flex justify-content-center">Loading...</div>}
        >
          {selectMyTeamData?.length ? (
            <div className="d-flex flex-wrap justify-content-between">
              {selectMyTeamData?.map((item) => {
                const CardComponent =
                  // eslint-disable-next-line no-nested-ternary
                  primaryFilter === 'join-requests' || primaryFilter === 'favourites' ? UserCard : ProjectCard;
                return (
                  <CardComponent
                    key={item?._id || item?.id}
                    data={item}
                    isPopoverOpen={popoverOpen}
                    isExpanded={isExpanded}
                    userType={userData?.user_type}
                    isTeam={primaryFilter === 'my-teams'}
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
