import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from '../../lib/infinite-scroll';
import searchAction from '../../redux/actions/gloabalSearch';
import UserCard from '../cards/UserCard';
import { Header } from '../styled';
import theme from '../../configs/themeVariables';
import ProjectCard from '../cards/ProjectCard';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';

const Search = () => {
  const navigate = useNavigate();
  const query = useSelector((state) => state.search.resultQuery);
  const searchData = useSelector((state) => state.search.searchData);

  const currentFilterData = useSelector((state) => state.search.currentFilterData);
  const currentMetaData = useSelector((state) => state.search.currentFilterMetadata);
  const currenPreviewData = useSelector((state) => state.search.currentFilterPreview);
  const isLoading = useSelector((state) => state.search.loading);

  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActivetab] = useState('PROJECT');

  useEffect(() => {
    if (!query) {
      navigate('/dashboard');
    }
  }, []);

  useEffect(() => {
    setHasMore(true);
    if (currenPreviewData?.length === 0 || currentFilterData?.length === currentMetaData?.total_records) {
      setHasMore(false);
    }
  }, [currenPreviewData]);

  const dispatch = useDispatch();

  const metaData = {
    page: 1,
    page_size: 10,
  };
  useEffect(() => {
    if (query?.length > 0) {
      dispatch(
        searchAction({
          scope: activeTab,
          metaData,
          query,
          onSuccess: () => {},
          onError: () => {
            setHasMore(false);
          },
        }),
      );
    }
  }, [activeTab, query]);

  const fetchMore = () => {
    const newMetaData = {
      ...metaData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: currentMetaData?.current_page + 1 || 1,
    };

    if (query?.length > 0) {
      dispatch(
        searchAction({
          isFetchMore: true,
          scope: activeTab,
          metaData: newMetaData,
          query,
          onSuccess: () => {},
          onError: () => {
            setHasMore(false);
          },
        }),
      );
    }
  };

  const NavigationBar = styled.ul`
    list-style-type: none;
    padding: 0 !important;
    margin: 0 !important;
    display: flex;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    border-top: 1px solid ${theme.cardHeaderBorderColor};

    li {
      padding: 1.5rem 0 1rem 0;
      margin: 0 4rem 0 0;
      font-size: 1rem;
      color: ${theme.navPillText};
      cursor: pointer;
    }
    .active {
      border-bottom: 2.5px solid ${theme.activeNavPillText};
      color: ${theme.activeNavPillText};
      font-weight: 600;
      cursor: auto;
    }
  `;
  const SearchCardWrap = styled.div`
    .card-body {
      padding: 2rem 1.8rem;
    }
    .card .card {
      box-shadow: 0 4px 15px 0 rgba(34, 41, 47, 0.1) !important;
      margin: 1.8rem 0.7rem;
    }
    .no-data {
      height: 10rem;
    }
  `;

  const totalResult = Object.values(searchData).reduce((sum, item) => {
    if (item?.metadata?.total_records) {
      return sum + item.metadata.total_records;
    }
    return sum;
  }, 0);

  return (
    <div>
      <Header isTopCards className="d-flex justify-content-between">
        Search Results
      </Header>
      <SearchCardWrap>
        <Card>
          <CardBody>
            <CardText className="ms-50 mb-25">
              {totalResult || 0} result{totalResult > 1 ? 's' : ''} found
            </CardText>
            <CardTitle className="ms-50">{query}</CardTitle>
            <NavigationBar className=" ms-50 mb-50">
              <li className={activeTab === 'PROJECT' && 'active'} onClick={() => setActivetab('PROJECT')}>
                <CardText>Project ({searchData?.project?.metadata?.total_records})</CardText>
              </li>
              <li className={activeTab === 'TALENT' && 'active'} onClick={() => setActivetab('TALENT')}>
                <CardText>Talent ({searchData?.talent?.metadata?.total_records})</CardText>
              </li>
              <li className={activeTab === 'CLIENT' && 'active'} onClick={() => setActivetab('CLIENT')}>
                <CardText>Client ({searchData?.client?.metadata?.total_records})</CardText>
              </li>
            </NavigationBar>
            {isLoading ? (
              <ComponentSpinner />
            ) : (
              <InfiniteScroll
                dataLength={currentFilterData?.length}
                next={fetchMore}
                hasMore={hasMore}
                endMessage={
                  <div
                    className={`d-flex justify-content-center align-items-center mt-2  ${
                      currentFilterData?.length > 0 ? '' : 'no-data'
                    } `}
                  >
                    {currentFilterData?.length > 0 ? 'You have seen it all!' : 'No data found!'}
                  </div>
                }
                loader={<div className="d-flex justify-content-center align-items-center">Loading...</div>}
              >
                {currentFilterData?.map((item) => {
                  const CardComponent = activeTab === 'TALENT' || activeTab === 'CLIENT' ? UserCard : ProjectCard;
                  return <CardComponent key={item?._id || item?.id} data={item} isExpanded={false} />;
                })}
              </InfiniteScroll>
            )}
          </CardBody>
        </Card>
      </SearchCardWrap>
    </div>
  );
};

export default Search;
