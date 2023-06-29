import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Check, Search, Share2, Star, User } from 'react-feather';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import theme from '../../../configs/themeVariables';
import { BlueBgIconContainer, NavsContainer, TableContainer } from '../style';
import AlmaMaterImg from '../../../assets/images/almaMater.png';
import { giveStrokeColor } from '../../../utility/Utils';
import NoDataFoundGif from '../../../assets/images/noDataFoundGif.gif';
import InviteModal from '../InviteModal';
import SendInvitationModal from '../SendInvitationModal';
import InvitationSentModal from '../InvitationSentModal';
import {
  almaMaterTalents,
  bestTalents,
  createProjectData,
  favoriteTalents,
} from '../../../redux/selectors/createProjectSelectors';
import { getAlmaMaterTalents, getBestTalents, getFavoriteTalents } from '../../../redux/actions/createProjectActions';

const Invite = ({ stepper }) => {
  const tabNames = {
    best: '1',
    favourite: '2',
    almaMater: '3',
  };

  const dispatch = useDispatch();

  const bestTalentsData = useSelector(bestTalents);
  const favoriteTalentsData = useSelector(favoriteTalents);
  const almaMaterTalentsData = useSelector(almaMaterTalents);
  const createProjectDetails = useSelector(createProjectData);

  const [activeTab, setTabActive] = useState(tabNames.best);
  const [invitedIds, setInvitedIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [inviteModal, setInviteModal] = useState(null);
  const [sendInvitationModal, setSendInvitationModal] = useState(null);
  const [invitationSentModal, setInvitationSentModal] = useState(null);

  const toggleInviteModal = () => setInviteModal(!inviteModal);
  const toggleSendInvitationModal = () => setSendInvitationModal(!sendInvitationModal);
  const toggleInvitationSentModal = () => setInvitationSentModal(!invitationSentModal);

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setTabActive(tab);
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
    const selectedBestTalents = bestTalentsData?.data.filter((talent) => selectedIds.includes(talent.user_id));
    const selectedFavouriteTalents = favoriteTalentsData?.data
      .filter((talent) => selectedIds.includes(talent.talent_details.user_id))
      .map((talent) => ({
        ...talent.talent_details,
        user_details: talent.user_details,
        total_matches: talent.total_matches,
        match_percentage: talent.match_percentage,
      }));
    const selectedAlmaMaterTalents = almaMaterTalentsData?.data.filter((talent) =>
      selectedIds.includes(talent.user_id),
    );

    const selectedTalentsData = [...selectedBestTalents, ...selectedFavouriteTalents, ...selectedAlmaMaterTalents];

    setSelectedTalents(removeDuplicates(selectedTalentsData, 'user_id'));
    setSendInvitationModal(true);
  };

  const loadNewBestTalents = () => {
    if (stepper._currentIndex === 3) {
      dispatch(
        getBestTalents(
          createProjectDetails?.project_id,
          searchValue,
          // eslint-disable-next-line no-unsafe-optional-chaining
          bestTalentsData?.metadata?.current_page + 1,
          10,
          bestTalentsData?.data,
        ),
      );
    }
  };

  const loadNewFavoriteTalents = () => {
    if (stepper._currentIndex === 3) {
      dispatch(
        getFavoriteTalents(
          createProjectDetails?.project_id,
          searchValue,
          // eslint-disable-next-line no-unsafe-optional-chaining
          favoriteTalentsData?.metadata?.current_page + 1,
          10,
          favoriteTalentsData?.data,
        ),
      );
    }
  };

  const loadNewAlmaMaterTalents = () => {
    if (stepper._currentIndex === 3) {
      dispatch(
        getAlmaMaterTalents(
          createProjectDetails?.project_id,
          searchValue,
          // eslint-disable-next-line no-unsafe-optional-chaining
          almaMaterTalentsData?.metadata?.current_page + 1,
          10,
          almaMaterTalentsData?.data,
        ),
      );
    }
  };

  useEffect(() => {
    let delayDebounceFn = null;

    if (createProjectDetails && stepper._currentIndex === 3) {
      delayDebounceFn = setTimeout(() => {
        dispatch(getBestTalents(createProjectDetails?.project_id, searchValue, 1, 10, []));
        dispatch(getFavoriteTalents(createProjectDetails?.project_id, searchValue, 1, 10, []));
        dispatch(getAlmaMaterTalents(createProjectDetails?.project_id, searchValue, 1, 10, []));
      }, 500);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, stepper]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const [message, setMessage] = useState('');

  const renderActionButton = (userId) => {
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
          onClick={() => setSelectedIds(selectedIds.filter((data) => data !== userId))}
        >
          <Check size={18} color={theme.green} />
        </div>
      );
    } else {
      return (
        <div className="upload-btn cursor-pointer ms-3" onClick={() => setSelectedIds([...selectedIds, userId])}>
          <h5 className="m-0 fw-light font-medium-1">Invite</h5>
        </div>
      );
    }
  };

  return (
    <>
      {inviteModal && (
        <InviteModal modal={inviteModal} toggleModal={toggleInviteModal} projectId={createProjectDetails?.project_id} />
      )}
      {sendInvitationModal && (
        <SendInvitationModal
          modal={sendInvitationModal}
          toggleModal={toggleSendInvitationModal}
          selectedTalents={selectedTalents}
          setInvitationSentModal={setInvitationSentModal}
          message={message}
          setMessage={setMessage}
        />
      )}
      {invitationSentModal && (
        <InvitationSentModal
          modal={invitationSentModal}
          toggleModal={toggleInvitationSentModal}
          selectedTalents={selectedTalents}
          projectId={createProjectDetails?.project_id}
          message={message}
          toggleSendInvitationModal={toggleSendInvitationModal}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          invitedIds={invitedIds}
          setInvitedIds={setInvitedIds}
        />
      )}
      <Card>
        <CardHeader className="d-flex justify-content-between">
          <h4 className="m-0 mt-1">
            Invite Bids <span className="fw-normal">(Optional)</span>
          </h4>
          <div className="d-flex align-items-center upload-btn cursor-pointer" onClick={() => setInviteModal(true)}>
            <BlueBgIconContainer className="p-50">
              <Share2 size={24} color={theme.activeNavPillText} />
            </BlueBgIconContainer>
            <h5 className="mb-0 mx-75 fw-bolder">Share</h5>
          </div>
        </CardHeader>
        <hr className="m-0 card-header-border" />
        <CardBody>
          <p className="font-medium-1 fw-bold">Share your project listing with the best teams and talent</p>
          <Row>
            <Col sm="12" md="12" lg="7">
              <InputGroup className="input-group-merge">
                <InputGroupText className="ps-1 pe-50">
                  <Search size={14} color={theme.textMuted} />
                </InputGroupText>
                <Input placeholder="Enter talent name" value={searchValue} onChange={(e) => onSearch(e)} />
              </InputGroup>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between mt-2">
            <NavsContainer>
              <Nav tabs className="font-medium border-bottom ps-1">
                <NavItem className="me-3">
                  <NavLink
                    active={activeTab === tabNames.best}
                    onClick={() => {
                      toggleTabs(tabNames.best);
                    }}
                  >
                    Best Talent
                  </NavLink>
                </NavItem>
                <NavItem className="me-3">
                  <NavLink
                    active={activeTab === tabNames.favourite}
                    onClick={() => {
                      toggleTabs(tabNames.favourite);
                    }}
                  >
                    Favourite Talent
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
            </NavsContainer>
          </Row>

          {invitedIds.length > 0 && <p className="font-small-3">{`${invitedIds?.length} invited`}</p>}

          <TabContent activeTab={activeTab} className="mb-2">
            <TabPane tabId={tabNames.best}>
              {activeTab === tabNames.best && (
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
                              <div className="user-pic p-25 me-2">
                                <User size={28} />
                              </div>
                              <p className="font-medium-1 fw-bold m-0">{`${item.first_name} ${item.last_name}`}</p>
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
                            {renderActionButton(item.user_id)}
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
                        <p className="m-0 fw-bold font-medium-3">No Data Found</p>
                      </div>
                    )}
                  </InfiniteScroll>
                </TableContainer>
              )}
            </TabPane>
            <TabPane tabId={tabNames.favourite}>
              {activeTab === tabNames.favourite && (
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
                              <div className="user-pic p-25 me-2">
                                <User size={28} />
                              </div>
                              <p className="font-medium-1 fw-bold m-0">{`${item.talent_details.first_name} ${item.talent_details.last_name}`}</p>
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
                            {renderActionButton(item.talent_details.user_id)}
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
                        <p className="m-0 fw-bold font-medium-3">No Data Found</p>
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
                              <div className="user-pic p-25 me-2">
                                <User size={28} />
                              </div>
                              <p className="font-medium-1 fw-bold m-0">{`${item.first_name} ${item.last_name}`}</p>
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
                            {renderActionButton(item.user_id)}
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
                        <p className="m-0 fw-bold font-medium-3">No Data Found</p>
                      </div>
                    )}
                  </InfiniteScroll>
                </TableContainer>
              )}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-end align-items-center">
        <div>
          <Link to="/dashboard">
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
    </>
  );
};

export default Invite;

Invite.propTypes = {
  stepper: Proptypes.object,
};

Invite.defaultProps = {
  stepper: {},
};
