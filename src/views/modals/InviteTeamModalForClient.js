import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../custom-styles.scss';
import {
  Badge,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { Check, Search, Share2, Star } from 'react-feather';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { BlueNavsContainer, InviteHeadContainer } from '../styled';
import theme from '../../configs/themeVariables';
import { BlueBgIconContainer, TableContainer } from '../CreateProject/style';
import AlmaMaterImg from '../../assets/images/almaMater.png';
import NoDataFoundGif from '../../assets/images/noDataFoundGif.gif';
import InfiniteScroll from '../../lib/infinite-scroll';
import { giveStrokeColor, returnFormattedRating } from '../../utility/Utils';
import { getAlmaMaterTalents, getBestTalents, getFavoriteTeams } from '../../redux/actions/createProjectActions';

import {
  almaMaterTalents,
  almaMaterTalentsLoading,
  bestTalents,
  bestTalentsLoading,
  favoriteTeams,
  favoriteTeamsLoading,
} from '../../redux/selectors/createProjectSelectors';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';

const InviteTeamModalForClient = ({
  invitedIds,
  selectedIds,
  setSelectedIds,
  selectedTalents,
  setSelectedTalents,
  setSendInvitationModal,
  toggleInviteShareModal,
  modal,
  toggleModal,
  projectId,
  inviteRole,
}) => {
  const tabNames = {
    favourite: '1',
    recommended: '2',
    almaMater: '3',
    teamMember: '4',
  };

  const param = useParams();
  const dispatch = useDispatch();

  const bestTalentsData = useSelector(bestTalents);
  const almaMaterTalentsData = useSelector(almaMaterTalents);
  const favoriteTeamsData = useSelector(favoriteTeams);

  const isBestTalentsLoading = useSelector(bestTalentsLoading);
  const isAlmaMaterTalentsLoading = useSelector(almaMaterTalentsLoading);
  const isFavoriteTeamsLoading = useSelector(favoriteTeamsLoading);

  const [activeTab, setTabActive] = useState(tabNames.recommended);
  const [searchValue, setSearchValue] = useState(null);

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setTabActive(tab);
    }
  };

  const loadNewBestTalents = () => {
    dispatch(
      getBestTalents(
        param?.projectId,
        searchValue,
        // eslint-disable-next-line no-unsafe-optional-chaining
        bestTalentsData?.metadata?.current_page + 1,
        10,
        bestTalentsData?.data,
      ),
    );
  };

  const loadNewFavoriteTeams = () => {
    dispatch(
      getFavoriteTeams(
        param?.projectId,
        searchValue,
        // eslint-disable-next-line no-unsafe-optional-chaining
        favoriteTeamsData?.metadata?.current_page + 1,
        10,
        favoriteTeamsData?.data,
      ),
    );
  };

  const loadNewAlmaMaterTalents = () => {
    dispatch(
      getAlmaMaterTalents(
        param?.projectId,
        searchValue,
        // eslint-disable-next-line no-unsafe-optional-chaining
        almaMaterTalentsData?.metadata?.current_page + 1,
        10,
        almaMaterTalentsData?.data,
      ),
    );
  };
  useEffect(() => {
    dispatch(getBestTalents(param?.projectId, searchValue, 1, 10, []));
  }, []);
  useEffect(() => {
    let delayDebounceFn = null;
    if (searchValue !== null) {
      delayDebounceFn = setTimeout(() => {
        if (activeTab === tabNames.favourite) {
          dispatch(getFavoriteTeams(param?.projectId, searchValue, 1, 10, []));
        }
        if (activeTab === tabNames.recommended) {
          dispatch(getBestTalents(param?.projectId, searchValue, 1, 10, []));
        }
        if (activeTab === tabNames.almaMater) {
          dispatch(getAlmaMaterTalents(param?.projectId, searchValue, 1, 10, []));
        }
      }, 500);
    }
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // TODO - rewrite this function
  const renderActionButton = (user, type) => {
    let userId;

    if (type === 'fav') {
      userId = user?._id;
    } else {
      userId = user.user_id;
    }

    if (invitedIds.includes(userId)) {
      return (
        <div className="ms-3">
          <h5 className="m-0 fw-light font-medium-1">Invited!</h5>
        </div>
      );
      // eslint-disable-next-line
    } else if (selectedIds?.includes(userId)) {
      return (
        <div
          className="d-flex justify-content-center align-items-center invited-icon-container cursor-pointer ms-5"
          onClick={() => {
            setSelectedIds(selectedIds?.filter((data) => data !== userId));
            setSelectedTalents(selectedTalents?.filter((data) => data?.user_id !== userId && data?._id !== userId));
          }}
        >
          <Check size={18} color={theme.green} />
        </div>
      );
    } else {
      return (
        <div
          className="upload-btn cursor-pointer ms-3"
          onClick={() => {
            setSelectedIds([...selectedIds, userId]);
            setSelectedTalents([...selectedTalents, user]);
          }}
        >
          <h5 className="m-0 fw-light font-medium-1">Invite</h5>
        </div>
      );
    }
  };

  const removeDuplicates = (arr, key) => {
    const seen = new Set();
    return arr.filter((obj) => {
      const val = obj[key];
      if (!seen.has(val)) {
        seen.add(val);
        return true;
      }
      return false;
    });
  };
  const onSendInvitationModalOpen = () => {
    const reformattedData = selectedTalents.map((talent) => {
      if ('name' in talent) {
        return {
          ...talent,
          first_name: talent.name,
          last_name: '',
          image_uri: talent.team_logo,
          total_matches: talent.total_matches || 0,
          match_percentage: talent.match_percentage,
          rating: talent.rating || 0,
          projects_worked_on_count: talent.projects_worked_on_count || 0,
        };
        // eslint-disable-next-line no-else-return
      } else {
        return talent;
      }
    });

    const allTalents = reformattedData.filter((talent) => talent.user_id);
    const allTeams = reformattedData.filter((team) => team._id);

    setSelectedTalents([...removeDuplicates(allTalents, 'user_id'), ...allTeams]);
    toggleModal();
    setSendInvitationModal(true);
  };

  const handleShare = () => {
    toggleModal();
    toggleInviteShareModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="invite-talent-listing-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="p-0">
        <InviteHeadContainer className="px-2">
          <div className="custom-header-margin d-flex justify-content-between align-items-center">
            <h3 className="font-medium-3">Invite Talent</h3>
            <div className="d-flex mb-50 align-items-center upload-btn cursor-pointer" onClick={handleShare}>
              <BlueBgIconContainer className="p-50">
                <Share2 size={24} color={theme.activeNavPillText} />
              </BlueBgIconContainer>
              <h5 className="mb-0 mx-75 fw-bolder">Share</h5>
            </div>
          </div>
        </InviteHeadContainer>
        <div className="px-2 py-2">
          <p className="fw-bold font-medium-1 mb-50">
            Invite talent to {projectId ? 'work on this project ' : 'join your team'}
            {inviteRole ? `as a ${inviteRole}` : ''}
          </p>
          <p className="pe-5">
            <span className="fw-bold"> Note:</span> If a talent is not already part of your team, they will need to join
            before they can be added to the project
          </p>
          <Row>
            <Col sm="12" md="12" lg="9">
              <InputGroup className="input-group-merge mt-1">
                <InputGroupText className="ps-1 pe-50">
                  <Search size={14} color={theme.textMuted} />
                </InputGroupText>
                <Input placeholder="Search talent name" value={searchValue} onChange={(e) => onSearch(e)} />
              </InputGroup>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between mt-2">
            <BlueNavsContainer>
              <Nav tabs className="font-medium border-bottom ps-1">
                <NavItem className="me-1">
                  <NavLink
                    active={activeTab === tabNames.recommended}
                    onClick={() => {
                      toggleTabs(tabNames.recommended);
                      dispatch(getBestTalents(param?.projectId, searchValue, 1, 10, []));
                    }}
                  >
                    Recommended Talent
                  </NavLink>
                </NavItem>
                <NavItem className="me-1">
                  <NavLink
                    active={activeTab === tabNames.favourite}
                    onClick={() => {
                      toggleTabs(tabNames.favourite);
                      dispatch(getFavoriteTeams(param?.projectId, searchValue, 1, 10, []));
                    }}
                  >
                    Favorite Teams
                  </NavLink>
                </NavItem>

                <NavItem className="me-1">
                  <NavLink
                    active={activeTab === tabNames.almaMater}
                    onClick={() => {
                      toggleTabs(tabNames.almaMater);
                      dispatch(getAlmaMaterTalents(param?.projectId, searchValue, 1, 10, []));
                    }}
                  >
                    Alma Mater
                    <img src={AlmaMaterImg} alt="alma-mater" className="ms-50" />
                  </NavLink>
                </NavItem>
              </Nav>
            </BlueNavsContainer>
          </Row>

          {isBestTalentsLoading || isAlmaMaterTalentsLoading || isFavoriteTeamsLoading ? (
            <ComponentSpinner />
          ) : (
            <TabContent activeTab={activeTab} className="mb-2">
              <TabPane tabId={tabNames.favourite}>
                {activeTab === tabNames.favourite && (
                  <TableContainer style={{ maxHeight: '18rem', overflowY: 'auto' }} id="scrollableDiv">
                    <InfiniteScroll
                      dataLength={favoriteTeamsData?.data?.length || 0}
                      next={loadNewFavoriteTeams}
                      hasMore={favoriteTeamsData?.metadata?.has_next_page}
                      scrollableTarget="scrollableDiv"
                      loader={<div className="d-flex justify-content-center">Loading...</div>}
                    >
                      {favoriteTeamsData?.data?.length > 0 ? (
                        favoriteTeamsData?.data?.map((item) => (
                          <Row key={item.id} className="d-flex align-items-center mb-2 mx-0">
                            <Col sm="2" md="3" lg="4">
                              <div className="d-flex align-items-center">
                                <Avatar
                                  img={item?.team_logo?.length > 0 ? item?.team_logo : defaultAvatar}
                                  imgHeight="38"
                                  imgWidth="38"
                                  className="me-2 user-pic"
                                />
                                <Link to={`/profile/team/${item?._id}`} target="_blank">
                                  <p className="font-medium-1 fw-bold m-0">{`${item?.name}`}</p>
                                </Link>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="4">
                              <div className="d-flex align-items-center">
                                <Badge>
                                  <div className="d-flex align-items-center">
                                    <Star
                                      size={12}
                                      color={theme.starRatingBg}
                                      fill={theme.starRatingBg}
                                      className="me-50"
                                    />
                                    <p className="m-0 fw-bolder rating-text">
                                      {returnFormattedRating(item?.rating || 0)}
                                    </p>
                                  </div>
                                </Badge>
                                <p className="m-0 font-small-3 fw-bold ms-1">
                                  {item?.projects_worked_on_count || 0} Projects
                                </p>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="2">
                              <div className="circular-progressbar-container">
                                <CircularProgressbarWithChildren
                                  value={item?.match_percentage}
                                  styles={{
                                    path: {
                                      stroke: giveStrokeColor(item?.match_percentage),
                                      strokeLinecap: 'round',
                                      transition: 'stroke-dashoffset 0.5s ease 0s',
                                      transform: 'rotate(0turn)',
                                      transformOrigin: 'center center',
                                    },
                                    trail: {
                                      stroke: theme.progressBarBg,
                                      strokeLinecap: 'round',
                                      transform: 'rotate(0turn)',
                                      transformOrigin: 'center center',
                                    },
                                  }}
                                >
                                  <div className="d-flex justify-content-center align-items-center">
                                    <p className="percentage-text m-0">{item?.match_percentage}%</p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="2">
                              {renderActionButton(item, 'fav')}
                            </Col>
                          </Row>
                        ))
                      ) : (
                        <div className="no-data-found-container d-flex flex-column align-items-center py-1">
                          <img
                            src={NoDataFoundGif}
                            alt="no-data"
                            width={200}
                            height={200}
                            className="no-data-found-gif"
                          />
                          <p className="m-0 fw-bold font-medium-3">No matches found</p>
                        </div>
                      )}
                    </InfiniteScroll>
                  </TableContainer>
                )}
              </TabPane>
              <TabPane tabId={tabNames.recommended}>
                {activeTab === tabNames.recommended && (
                  <TableContainer style={{ maxHeight: '18rem', overflowY: 'auto' }} id="scrollableDiv">
                    <InfiniteScroll
                      dataLength={bestTalentsData?.data?.length || 0}
                      next={loadNewBestTalents}
                      hasMore={bestTalentsData?.metadata?.has_next_page}
                      scrollableTarget="scrollableDiv"
                      loader={<div className="d-flex justify-content-center">Loading...</div>}
                    >
                      {bestTalentsData?.data?.length > 0 ? (
                        bestTalentsData?.data?.map((item) => (
                          <Row key={item.id} className="d-flex align-items-center mb-2 mx-0">
                            <Col sm="2" md="3" lg="4">
                              <div className="d-flex align-items-center">
                                <Avatar
                                  img={item?.image_uri?.length > 0 ? item?.image_uri : defaultAvatar}
                                  imgHeight="38"
                                  imgWidth="38"
                                  className="me-2 user-pic"
                                />
                                <Link to={`/profile/talent/${item.user_id}`} target="_blank">
                                  <p className="font-medium-1 fw-bold m-0">{`${item.first_name} ${item.last_name}`}</p>
                                </Link>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="4">
                              <div className="d-flex align-items-center">
                                <Badge>
                                  <div className="d-flex align-items-center">
                                    <Star
                                      size={12}
                                      color={theme.starRatingBg}
                                      fill={theme.starRatingBg}
                                      className="me-50"
                                    />
                                    <p className="m-0 fw-bolder rating-text">{item.rating}</p>
                                  </div>
                                </Badge>
                                <p className="m-0 font-small-3 fw-bold ms-1">
                                  {item.projects_worked_on_count} Projects
                                </p>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="2">
                              <div className="circular-progressbar-container">
                                <CircularProgressbarWithChildren
                                  value={item.match_percentage}
                                  styles={{
                                    path: {
                                      stroke: giveStrokeColor(item.match_percentage),
                                      strokeLinecap: 'round',
                                      transition: 'stroke-dashoffset 0.5s ease 0s',
                                      transform: 'rotate(0turn)',
                                      transformOrigin: 'center center',
                                    },
                                    trail: {
                                      stroke: theme.progressBarBg,
                                      strokeLinecap: 'round',
                                      transform: 'rotate(0turn)',
                                      transformOrigin: 'center center',
                                    },
                                  }}
                                >
                                  <div className="d-flex justify-content-center align-items-center">
                                    <p className="percentage-text m-0">{item.match_percentage}%</p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="2">
                              {renderActionButton(item, 'best')}
                            </Col>
                          </Row>
                        ))
                      ) : (
                        <div className="no-data-found-container d-flex flex-column align-items-center py-1">
                          <img
                            src={NoDataFoundGif}
                            alt="no-data"
                            width={200}
                            height={200}
                            className="no-data-found-gif"
                          />
                          <p className="m-0 fw-bold font-medium-3">No matches found</p>
                        </div>
                      )}
                    </InfiniteScroll>
                  </TableContainer>
                )}
              </TabPane>
              <TabPane tabId={tabNames.almaMater}>
                {activeTab === tabNames.almaMater && (
                  <TableContainer style={{ maxHeight: '18rem', overflowY: 'auto' }} id="scrollableDiv">
                    <InfiniteScroll
                      dataLength={almaMaterTalentsData?.data?.length || 0}
                      next={loadNewAlmaMaterTalents}
                      hasMore={almaMaterTalentsData?.metadata?.has_next_page}
                      scrollableTarget="scrollableDiv"
                      loader={<div className="d-flex justify-content-center">Loading...</div>}
                    >
                      {almaMaterTalentsData?.data?.length > 0 ? (
                        almaMaterTalentsData?.data?.map((item) => (
                          <Row key={item.id} className="d-flex align-items-center mb-2 mx-0">
                            <Col sm="2" md="3" lg="4">
                              <div className="d-flex align-items-center">
                                <Avatar
                                  img={item?.image_uri?.length > 0 ? item?.image_uri : defaultAvatar}
                                  imgHeight="38"
                                  imgWidth="38"
                                  className="me-2 user-pic"
                                />
                                <Link to={`/profile/talent/${item.user_id}`} target="_blank">
                                  <p className="font-medium-1 fw-bold m-0">{`${item.first_name} ${item.last_name}`}</p>
                                </Link>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="4">
                              <div className="d-flex align-items-center">
                                <Badge>
                                  <div className="d-flex align-items-center">
                                    <Star
                                      size={12}
                                      color={theme.starRatingBg}
                                      fill={theme.starRatingBg}
                                      className="me-50"
                                    />
                                    <p className="m-0 fw-bolder rating-text">{item.rating}</p>
                                  </div>
                                </Badge>
                                <p className="m-0 font-small-3 fw-bold ms-1">
                                  {item.projects_worked_on_count} Projects
                                </p>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="2">
                              <div className="circular-progressbar-container">
                                <CircularProgressbarWithChildren
                                  value={item.match_percentage}
                                  styles={{
                                    path: {
                                      stroke: giveStrokeColor(item.match_percentage),
                                      strokeLinecap: 'round',
                                      transition: 'stroke-dashoffset 0.5s ease 0s',
                                      transform: 'rotate(0turn)',
                                      transformOrigin: 'center center',
                                    },
                                    trail: {
                                      stroke: theme.progressBarBg,
                                      strokeLinecap: 'round',
                                      transform: 'rotate(0turn)',
                                      transformOrigin: 'center center',
                                    },
                                  }}
                                >
                                  <div className="d-flex justify-content-center align-items-center">
                                    <p className="percentage-text m-0">{item.match_percentage}%</p>
                                  </div>
                                </CircularProgressbarWithChildren>
                              </div>
                            </Col>
                            <Col sm="2" md="3" lg="2">
                              {renderActionButton(item, 'alma')}
                            </Col>
                          </Row>
                        ))
                      ) : (
                        <div className="no-data-found-container d-flex flex-column align-items-center py-1">
                          <img
                            src={NoDataFoundGif}
                            alt="no-data"
                            width={200}
                            height={200}
                            className="no-data-found-gif"
                          />
                          <p className="m-0 fw-bold font-medium-3">No matches found</p>
                        </div>
                      )}
                    </InfiniteScroll>
                  </TableContainer>
                )}
              </TabPane>
            </TabContent>
          )}
          <div className="d-flex justify-content-end align-items-center">
            <div>
              <Button color="primary" outline onClick={toggleModal}>
                <span className="px-2">Close</span>
              </Button>
              {selectedIds.length > 0 && (
                <Button color="primary" className="ms-3" onClick={onSendInvitationModalOpen}>
                  Invite
                </Button>
              )}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default InviteTeamModalForClient;

InviteTeamModalForClient.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  invitedIds: Proptypes.bool,
  selectedIds: Proptypes.bool,
  setSelectedIds: Proptypes.func,
  selectedTalents: Proptypes.bool,
  setSelectedTalents: Proptypes.func,
  setSendInvitationModal: Proptypes.func,
  toggleInviteShareModal: Proptypes.func,
  projectId: Proptypes.string,
  inviteRole: Proptypes.string,
};

InviteTeamModalForClient.defaultProps = {
  modal: false,
  toggleModal: () => {},
  invitedIds: false,
  selectedIds: false,
  setSelectedIds: () => {},
  selectedTalents: false,
  setSelectedTalents: () => {},
  setSendInvitationModal: () => {},
  toggleInviteShareModal: () => {},
  projectId: '',
  inviteRole: '',
};
