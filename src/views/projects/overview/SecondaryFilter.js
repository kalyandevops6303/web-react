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
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import InfiniteScroll from '../../../lib/infinite-scroll';
import debounce from '../../../lib/debounce';
import throttle from '../../../lib/throttle';
import theme from '../../../configs/themeVariables';
import { FormWrapper, SecondaryFiltersWrap } from '../../styled';
import { selectThemeColors, useIsTab } from '../../../utility/Utils';
import { getProjectListing } from '../../../redux/actions/projectActions';
import ProjectCard from '../../cards/ProjectCard';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import { userTypes } from '../../../utility/constants/Constant';
import NoDataFoundComponent from './NoDataFoundComp';

const SecondaryFilters = ({ primaryFilter }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const isTab = useIsTab();
  const popoverRef = useRef(null);

  const [hasMore, setHasMore] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectProjectData = useSelector((state) => state.project.listData);
  const selectProjectMetaData = useSelector((state) => state.project.metaData);
  const currentPreview = useSelector((state) => state.marketPlace.currentPreview);
  const isLoading = useSelector((state) => state.marketPlace.loading);

  const metaData = { page: 1, page_size: 10 };

  const [popoverOpen, setPopoverOpen] = useState(false);

  // Function to toggle the popover
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

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
    if (currentPreview.length === 0 || selectProjectData?.length === selectProjectMetaData?.total_records) {
      setHasMore(false);
    }
  }, [currentPreview]);

  useEffect(() => {
    dispatch(getProjectListing({ searchText, metaData, onSuccess, onError, primaryFilter }));
  }, [searchText, primaryFilter]);

  const inputRef = useRef();

  const handleReset = () => {
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
      page: selectProjectData?.current_page + 1 || 1,
    };
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
                isExpanded={isExpanded}
                isProjectWithTeam
                isTeam
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
