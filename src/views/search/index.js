import { Card, CardBody, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from '../../lib/infinite-scroll';
import searchAction from '../../redux/actions/gloabalSearch';
import TalentCard from '../cards/TalentCard';
import ClientCard from '../cards/ClientCard';
import TeamCard from '../cards/TeamCard';

import { Header } from '../styled';
import theme from '../../configs/themeVariables';
import ProjectCard from '../cards/MarketPlaceProjectCard';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';
import { userTypes } from '../../utility/constants/Constant';
import { setItem } from '../../utility/localStorageControl';

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
    setItem('baseRoute', 'search');
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
    .no-data {
      cursor: not-allowed;
      height: fit-content !important;
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
    @media only screen and (max-device-width: 600px) {
      .card-body {
        padding: 1rem;
      }
    }
  `;

  const totalResult = Object.values(searchData).reduce((sum, item) => {
    if (item?.metadata?.total_records) {
      return sum + item.metadata.total_records;
    }
    return sum;
  }, 0);

  useEffect(() => {
    if (searchData) {
      if (searchData?.scope === 'PROJECT') {
        if (
          searchData?.project?.data?.length === 0 &&
          searchData?.talent?.data?.length === 0 &&
          searchData?.client?.data?.length === 0 &&
          searchData?.team?.data?.length === 0
        ) {
          setActivetab('PROJECT');
        } else if (
          searchData?.project?.data?.length === 0 &&
          searchData?.talent?.data?.length === 0 &&
          searchData?.client?.data?.length === 0
        ) {
          setActivetab(userTypes.team);
        } else if (searchData?.project?.data?.length === 0 && searchData?.talent?.data?.length === 0) {
          setActivetab(userTypes.client);
        } else if (searchData?.project?.data?.length === 0) {
          setActivetab(userTypes.talent);
        } else if (searchData?.project?.data?.length > 0) {
          setActivetab('PROJECT');
        }
      }
    }
  }, [searchData]);

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
              <li
                className={
                  activeTab === 'PROJECT'
                    ? 'active'
                    : `${searchData?.project?.metadata?.total_records === 0 ? 'no-data' : ''}`
                }
                onClick={() => searchData?.project?.metadata?.total_records !== 0 && setActivetab('PROJECT')}
              >
                <CardText id="project-tab">Project ({searchData?.project?.metadata?.total_records})</CardText>
                {searchData?.project?.metadata?.total_records === 0 && (
                  <UncontrolledTooltip placement="top" target="project-tab">
                    No results found
                  </UncontrolledTooltip>
                )}
              </li>
              <li
                className={
                  activeTab === userTypes.talent
                    ? 'active'
                    : `${searchData?.talent?.metadata?.total_records === 0 ? 'no-data' : ''}`
                }
                onClick={() => searchData?.talent?.metadata?.total_records !== 0 && setActivetab(userTypes.talent)}
              >
                <CardText id="talent-tab">Talent ({searchData?.talent?.metadata?.total_records})</CardText>
                {searchData?.talent?.metadata?.total_records === 0 && (
                  <UncontrolledTooltip placement="top" target="talent-tab">
                    No results found
                  </UncontrolledTooltip>
                )}
              </li>
              <li
                className={
                  activeTab === userTypes.client
                    ? 'active'
                    : `${searchData?.client?.metadata?.total_records === 0 ? 'no-data' : ''}`
                }
                onClick={() => searchData?.client?.metadata?.total_records !== 0 && setActivetab(userTypes.client)}
              >
                <CardText id="client-tab">Client ({searchData?.client?.metadata?.total_records})</CardText>
                {searchData?.client?.metadata?.total_records === 0 && (
                  <UncontrolledTooltip placement="top" target="client-tab">
                    No results found
                  </UncontrolledTooltip>
                )}
              </li>
              <li
                className={
                  activeTab === userTypes.team
                    ? 'active'
                    : `${searchData?.team?.metadata?.total_records === 0 ? 'no-data' : ''}`
                }
                onClick={() => searchData?.team?.metadata?.total_records !== 0 && setActivetab(userTypes.team)}
              >
                <CardText id="team-tab">Team ({searchData?.team?.metadata?.total_records})</CardText>
                {searchData?.team?.metadata?.total_records === 0 && (
                  <UncontrolledTooltip placement="top" target="team-tab">
                    No results found
                  </UncontrolledTooltip>
                )}
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
                    {currentFilterData?.length === 0 ? 'No data found!' : ''}
                  </div>
                }
                loader={<div className="d-flex justify-content-center align-items-center">Loading...</div>}
              >
                <div
                  style={
                    activeTab === userTypes.client
                      ? { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', placeItems: 'center' }
                      : {}
                  }
                  className="grid-layout flex-wrap justify-content-between"
                >
                  {currentFilterData?.map((item) => {
                    const CardComponent =
                      // eslint-disable-next-line no-nested-ternary
                      activeTab === userTypes.talent
                        ? TalentCard
                        : // eslint-disable-next-line no-nested-ternary
                        activeTab === userTypes.client
                        ? ClientCard
                        : activeTab === userTypes.team
                        ? TeamCard
                        : ProjectCard;
                    return (
                      <CardComponent
                        isSearchPage
                        userType={activeTab}
                        key={item?._id || item?.id}
                        data={item}
                        isExpanded={false}
                      />
                    );
                  })}
                </div>
              </InfiniteScroll>
            )}
          </CardBody>
        </Card>
      </SearchCardWrap>
    </div>
  );
};

export default Search;
