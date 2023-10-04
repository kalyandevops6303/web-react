/* eslint-disable no-undef */
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'react-feather';
import { PropTypes } from 'prop-types';
import InfiniteScroll from '../../../lib/infinite-scroll';
import debounce from '../../../lib/debounce';
import throttle from '../../../lib/throttle';
import { FormWrapper, SecondaryFiltersWrap } from '../../styled';
import { getProjectListing } from '../../../redux/actions/projectActions';
import ProjectCard from '../../cards/ProjectCard';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import '../../custom-styles.scss';
import NoDataFoundComponent from './NoDataFoundComp';

// eslint-disable-next-line react/prop-types
const SecondaryFilters = ({ primaryFilter, userType }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const popoverRef = useRef(null);

  const [hasMore, setHasMore] = useState(true);
  const selectProjectData = useSelector((state) => state.project.listData);
  const selectProjectMetaData = useSelector((state) => state.project.metaData);
  const currentPreview = useSelector((state) => state.project.currentPreview);
  const isLoading = useSelector((state) => state.project.loading);

  const metaData = { page: 1, page_size: 10 };

  const [popoverOpen, setPopoverOpen] = useState(false);

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
    dispatch(
      getProjectListing({
        searchText,
        metaData,
        onSuccess,
        onError,
        primaryFilter,
        userType,
      }),
    );
  }, [searchText, primaryFilter]);

  const inputRef = useRef();

  const fetchMore = () => {
    const newMetaData = {
      ...metaData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: selectProjectMetaData?.current_page + 1 || 1,
    };

    dispatch(
      getProjectListing({
        searchText,
        metaData: newMetaData,
        onSuccess,
        onError,
        primaryFilter,
        userType,
      }),
    );
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
