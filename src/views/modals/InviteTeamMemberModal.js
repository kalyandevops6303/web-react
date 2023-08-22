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
import { Link } from 'react-router-dom';
import { Check, Search, Star } from 'react-feather';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { BlueNavsContainer, GrayBorderContainer } from '../styled';
import theme from '../../configs/themeVariables';
import { TableContainer } from '../CreateProject/style';
import AlmaMaterImg from '../../assets/images/almaMater.png';
import NoDataFoundGif from '../../assets/images/noDataFoundGif.gif';
import InfiniteScroll from '../../lib/infinite-scroll';
import { giveStrokeColor } from '../../utility/Utils';
import { getAlmaMaterTalents, getBestTalents, getFavoriteTalents } from '../../redux/actions/inviteTalent';
import { almaMaterTalents, bestTalents, favoriteTalents } from '../../redux/selectors/inviteTalentSelector';

const InviteTeamMemberModal = ({
  invitedIds,
  selectedIds,
  setSelectedIds,
  selectedTalents,
  setSelectedTalents,
  setSendInvitationModal,
  modal,
  toggleModal,
}) => {
  const tabNames = {
    favourite: '1',
    recommended: '2',
    almaMater: '3',
  };

  const dispatch = useDispatch();

  const bestTalentsData = useSelector(bestTalents);
  const favoriteTalentsData = useSelector(favoriteTalents);
  const almaMaterTalentsData = useSelector(almaMaterTalents);

  const [activeTab, setTabActive] = useState(tabNames.favourite);
  const [searchValue, setSearchValue] = useState('');

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setTabActive(tab);
    }
  };

  const loadNewBestTalents = () => {
    dispatch(
      getBestTalents(
        searchValue,
        // eslint-disable-next-line no-unsafe-optional-chaining
        bestTalentsData?.metadata?.current_page + 1,
        10,
        bestTalentsData?.data,
      ),
    );
  };

  const loadNewFavoriteTalents = () => {
    dispatch(
      getFavoriteTalents(
        searchValue,
        // eslint-disable-next-line no-unsafe-optional-chaining
        favoriteTalentsData?.metadata?.current_page + 1,
        10,
        favoriteTalentsData?.data,
      ),
    );
  };

  const loadNewAlmaMaterTalents = () => {
    dispatch(
      getAlmaMaterTalents(
        searchValue,
        // eslint-disable-next-line no-unsafe-optional-chaining
        almaMaterTalentsData?.metadata?.current_page + 1,
        10,
        almaMaterTalentsData?.data,
      ),
    );
  };

  useEffect(() => {
    let delayDebounceFn = null;

    delayDebounceFn = setTimeout(() => {
      dispatch(getBestTalents(searchValue, 1, 10, []));
      dispatch(getFavoriteTalents(searchValue, 1, 10, []));
      dispatch(getAlmaMaterTalents(searchValue, 1, 10, []));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // TODO - rewrite this function
  const renderActionButton = (user, type) => {
    let userId;

    if (type === 'fav') {
      userId = user.talent_details.user_id;
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
    } else if (selectedIds.includes(userId)) {
      return (
        <div
          className="d-flex justify-content-center align-items-center invited-icon-container cursor-pointer ms-5"
          onClick={() => {
            setSelectedIds(selectedIds.filter((data) => data !== userId));
            setSelectedTalents(selectedTalents.filter((data) => data.user_id !== userId));
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
      if ('talent_details' in talent) {
        return {
          ...talent.talent_details,
          user_details: talent.user_details,
          total_matches: talent.total_matches,
          match_percentage: talent.match_percentage,
        };
        // eslint-disable-next-line no-else-return
      } else {
        return talent;
      }
    });

    setSelectedTalents(removeDuplicates(reformattedData, 'user_id'));
    toggleModal();
    setSendInvitationModal(true);
  };

  return (
    <Modal isOpen={modal} contentClassName="invite-talent-listing-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="p-0">
        <GrayBorderContainer className="px-2">
          <div className="custom-header-margin">
            <h3 className="font-medium-3 mb-1">Invite Talent</h3>
          </div>
        </GrayBorderContainer>
        <div className="px-2 py-2">
          <p className="fw-bold font-medium-1 mb-50">Invite talent to work on this project</p>
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
                <NavItem className="me-3">
                  <NavLink
                    active={activeTab === tabNames.favourite}
                    onClick={() => {
                      toggleTabs(tabNames.favourite);
                    }}
                  >
                    Favorite Talent
                  </NavLink>
                </NavItem>
                <NavItem className="me-3">
                  <NavLink
                    active={activeTab === tabNames.recommended}
                    onClick={() => {
                      toggleTabs(tabNames.recommended);
                    }}
                  >
                    Recommended Talent
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === tabNames.almaMater}
                    onClick={() => {
                      toggleTabs(tabNames.almaMater);
                    }}
                  >
                    Alma Mater
                    <img src={AlmaMaterImg} alt="alma-mater" className="ms-50" />
                  </NavLink>
                </NavItem>
              </Nav>
            </BlueNavsContainer>
          </Row>

          {/* TODO invited count will come here */}

          <TabContent activeTab={activeTab} className="mb-2">
            <TabPane tabId={tabNames.favourite}>
              {activeTab === tabNames.favourite && (
                <TableContainer id="scrollableDiv">
                  <InfiniteScroll
                    dataLength={bestTalentsData?.data?.length || 0}
                    next={loadNewBestTalents}
                    hasMore={bestTalentsData?.metadata?.has_next_page}
                    scrollableTarget="scrollableDiv"
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
                              <p className="m-0 font-small-3 fw-bold ms-1">{item.projects_worked_on_count} Projects</p>
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
            <TabPane tabId={tabNames.recommended}>
              {activeTab === tabNames.recommended && (
                <TableContainer id="scrollableDiv">
                  <InfiniteScroll
                    dataLength={favoriteTalentsData?.data?.length || 0}
                    next={loadNewFavoriteTalents}
                    hasMore={favoriteTalentsData?.metadata?.has_next_page}
                    scrollableTarget="scrollableDiv"
                  >
                    {favoriteTalentsData?.data?.length > 0 ? (
                      favoriteTalentsData?.data?.map((item) => (
                        <Row key={item.id} className="d-flex align-items-center mb-2 mx-0">
                          <Col sm="2" md="3" lg="4">
                            <div className="d-flex align-items-center">
                              <Avatar
                                img={
                                  item?.talent_details?.image_uri?.length > 0
                                    ? item?.talent_details?.image_uri
                                    : defaultAvatar
                                }
                                imgHeight="38"
                                imgWidth="38"
                                className="me-2 user-pic"
                              />
                              <Link to={`/profile/talent/${item.talent_details.user_id}`} target="_blank">
                                <p className="font-medium-1 fw-bold m-0">{`${item.talent_details.first_name} ${item.talent_details.last_name}`}</p>
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
                                  <p className="m-0 fw-bolder rating-text">{item.talent_details.rating}</p>
                                </div>
                              </Badge>
                              <p className="m-0 font-small-3 fw-bold ms-1">
                                {item.talent_details.projects_worked_on_count} Projects
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
            <TabPane tabId={tabNames.almaMater}>
              {activeTab === tabNames.almaMater && (
                <TableContainer id="scrollableDiv">
                  <InfiniteScroll
                    dataLength={almaMaterTalentsData?.data?.length || 0}
                    next={loadNewAlmaMaterTalents}
                    hasMore={almaMaterTalentsData?.metadata?.has_next_page}
                    scrollableTarget="scrollableDiv"
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
                              <p className="m-0 font-small-3 fw-bold ms-1">{item.projects_worked_on_count} Projects</p>
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
        </div>
      </ModalBody>
      <div className="d-flex justify-content-end align-items-center">
        <div>
          <Link to="/marketplace/all_listings">
            <Button color="primary" outline>
              <span className="px-2">Close</span>
            </Button>
          </Link>
          {selectedIds.length > 0 && (
            <Button color="primary" className="ms-3" onClick={onSendInvitationModalOpen}>
              Invite
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InviteTeamMemberModal;

InviteTeamMemberModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  invitedIds: Proptypes.bool,
  selectedIds: Proptypes.bool,
  setSelectedIds: Proptypes.func,
  selectedTalents: Proptypes.bool,
  setSelectedTalents: Proptypes.func,
  setSendInvitationModal: Proptypes.func,
};

InviteTeamMemberModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  invitedIds: false,
  selectedIds: false,
  setSelectedIds: () => {},
  selectedTalents: false,
  setSelectedTalents: () => {},
  setSendInvitationModal: () => {},
};
