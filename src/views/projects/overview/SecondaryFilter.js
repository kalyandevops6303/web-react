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
import { getProjectListing } from '../../../redux/actions/projectActions';
import ProjectCard from '../../cards/ProjectCard';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import NoDataFoundComponent from './NoDataFoundComp';
import { selectThemeColors, useIsTab } from '../../../utility/Utils';
import { getClientNameService, getTeamNameSerive } from '../../../services/projectServices';
import { userTypes } from '../../../utility/constants/Constant';
import { clearData } from '../../../redux/reducers/project';
import theme from '../../../configs/themeVariables';

// eslint-disable-next-line react/prop-types
const SecondaryFilters = ({ primaryFilter, userType }) => {
  const [searchText, setSearchText] = useState('');
  const isTab = useIsTab();

  const dispatch = useDispatch();
  const popoverRef = useRef(null);

  const [hasMore, setHasMore] = useState(true);
  const selectProjectData = useSelector((state) => state.project.listData);
  const selectProjectMetaData = useSelector((state) => state.project.metaData);
  const currentPreview = useSelector((state) => state.project.currentPreview);
  const isLoading = useSelector((state) => state.project.loading);
  const isCardLoading = useSelector((state) => state?.project?.cardInfoLoading);
  const selectCardData = useSelector((state) => state?.project?.cardData);

  const metaData = { page: 1, page_size: 10 };

  const [popoverOpen, setPopoverOpen] = useState(false);

  const [secondFilterState, setSecondFilterState] = useState({
    team_name: [],
    client_name: [],
    filter_type: [],
    user_type: [],
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

  useEffect(() => {
    setHasMore(true);
    if (currentPreview.length === 0 || selectProjectData?.length === selectProjectMetaData?.total_records) {
      setHasMore(false);
    }
  }, [currentPreview]);

  useEffect(() => {
    dispatch(clearData());
    const filterData = {};

    Object.keys(secondFilterState).forEach((key) => {
      if (Array.isArray(secondFilterState[key])) {
        if (key === 'team_name' || key === 'client_name') {
          filterData[key] = secondFilterState[key][0]?.label;
        } else {
          filterData[key] = secondFilterState[key][0]?.value;
        }
      }
    });
    dispatch(
      getProjectListing({
        data: {
          ...filterData,
          search_query: searchText || '',
          project_filter: primaryFilter ? primaryFilter.toUpperCase() : '',
        },
        metaData,
        onSuccess,
        onError,
      }),
    );
  }, [secondFilterState, searchText, primaryFilter]);

  const inputRef = useRef();

  const fetchMore = () => {
    const newMetaData = {
      ...metaData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectProjectMetaData?.current_page + 1 || 1,
    };

    const filterData = {};

    Object.keys(secondFilterState).forEach((key) => {
      if (Array.isArray(secondFilterState[key])) {
        if (key === 'team_name' || key === 'client_name') {
          filterData[key] = secondFilterState[key][0]?.label;
        } else {
          filterData[key] = secondFilterState[key][0]?.value;
        }
      }
    });
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

  const loadClientNameOptions = async (search, prevOptions, { page }) => {
    try {
      const response = await getClientNameService(page, search);

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

  const onChangeFilter = (key, value) => {
    setSecondFilterState({
      ...secondFilterState,
      [key]: value ? [value] : [],
    });
  };

  const filterTypeOptions = [
    { label: 'Fixed', value: 'FIXED' },
    { label: 'Variable', value: 'VARIABLE' },
  ];
  const userTypeOptions = [
    { label: 'Team', value: 'TEAM' },
    { label: 'Client', value: 'CLIENT' },
  ];

  const handleReset = () => {
    setSecondFilterState({
      team_name: [],
      client_name: [],
      filter_type: [],
      user_type: [],
    });
    setSearchText('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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
            {userType === userTypes.talent && primaryFilter === 'invited' && (
              <Col className="d-none">
                <Label className="form-label">Invited by</Label>
                <Select
                  isClearable
                  options={userTypeOptions}
                  classNamePrefix="select"
                  placeholder="Select user"
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
            )}
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
                    secondFilterState.team_name.length > 0
                      ? {
                          value: secondFilterState.team_name[0].value,
                          label: secondFilterState.team_name[0].label,
                        }
                      : null
                  }
                />
              </Col>
            )}
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
                    secondFilterState.client_name.length > 0
                      ? {
                          value: secondFilterState.client_name[0].value,
                          label: secondFilterState.client_name[0].label,
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
                key={item?._id || item?.id}
                data={item}
                isPopoverOpen={popoverOpen}
                isExpanded={false}
                isProjectWithTeam
              />
            );
          })}
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
