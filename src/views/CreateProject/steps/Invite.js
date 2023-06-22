import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Check, ChevronLeft, Search, Share2, Star, User } from 'react-feather';
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
import YouDidItModal from '../YouDidItModal';
import { bestTalents, createProjectData } from '../../../redux/selectors/createProjectSelectors';
import { getBestTalents } from '../../../redux/actions/createProjectActions';

const DATA1 = [
  {
    id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
    name: 'Person 1',
    rating: 4.7,
    projects: 8,
    percentage: 12.3,
    isSelected: false,
  },
  {
    id: 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
    name: 'Person 2',
    rating: 3.2,
    projects: 3,
    percentage: 65.8,
    isSelected: false,
  },
  {
    id: 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3',
    name: 'Person 3',
    rating: 4.9,
    projects: 12,
    percentage: 87.1,
    isSelected: false,
  },
  {
    id: 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4',
    name: 'Person 4',
    rating: 2.6,
    projects: 5,
    percentage: 43.9,
    isSelected: false,
  },
  {
    id: 'e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5',
    name: 'Person 5',
    rating: 4.1,
    projects: 9,
    percentage: 79.5,
    isSelected: false,
  },
  {
    id: 'f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6',
    name: 'Person 6',
    rating: 3.8,
    projects: 6,
    percentage: 71.2,
    isSelected: false,
  },
  {
    id: 'g7g7g7g7-g7g7-g7g7-g7g7-g7g7g7g7g7g7',
    name: 'Person 7',
    rating: 4.5,
    projects: 7,
    percentage: 88.9,
    isSelected: false,
  },
  {
    id: 'h8h8h8h8-h8h8-h8h8-h8h8-h8h8h8h8h8h8',
    name: 'Person 8',
    rating: 3.9,
    projects: 4,
    percentage: 62.4,
    isSelected: false,
  },
  {
    id: 'i9i9i9i9-i9i9-i9i9-i9i9-i9i9i9i9i9i9',
    name: 'Person 9',
    rating: 4.2,
    projects: 11,
    percentage: 76.7,
    isSelected: false,
  },
  {
    id: 'j0j0j0j0-j0j0-j0j0-j0j0-j0j0j0j0j0j0',
    name: 'Person 10',
    rating: 3.6,
    projects: 2,
    percentage: 53.1,
    isSelected: false,
  },
];

const DATA2 = [
  {
    id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a11',
    name: 'Person 11',
    rating: 4.7,
    projects: 8,
    percentage: 92.3,
    isSelected: false,
  },
  {
    id: 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b12',
    name: 'Person 12',
    rating: 3.2,
    projects: 3,
    percentage: 65.8,
    isSelected: false,
  },
  {
    id: 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c13',
    name: 'Person 13',
    rating: 4.9,
    projects: 12,
    percentage: 87.1,
    isSelected: false,
  },
  {
    id: 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d14',
    name: 'Person 14',
    rating: 2.6,
    projects: 5,
    percentage: 43.9,
    isSelected: false,
  },
  {
    id: 'e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e15',
    name: 'Person 15',
    rating: 4.1,
    projects: 9,
    percentage: 79.5,
    isSelected: false,
  },
  {
    id: 'f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f16',
    name: 'Person 16',
    rating: 3.8,
    projects: 6,
    percentage: 71.2,
    isSelected: false,
  },
  {
    id: 'g7g7g7g7-g7g7-g7g7-g7g7-g7g7g7g7g7g17',
    name: 'Person 17',
    rating: 4.5,
    projects: 7,
    percentage: 88.9,
    isSelected: false,
  },
  {
    id: 'h8h8h8h8-h8h8-h8h8-h8h8-h8h8h8h8h8h18',
    name: 'Person 18',
    rating: 3.9,
    projects: 4,
    percentage: 62.4,
    isSelected: false,
  },
  {
    id: 'i9i9i9i9-i9i9-i9i9-i9i9-i9i9i9i9i9i19',
    name: 'Person 19',
    rating: 4.2,
    projects: 11,
    percentage: 76.7,
    isSelected: false,
  },
  {
    id: 'j0j0j0j0-j0j0-j0j0-j0j0-j0j0j0j0j0j20',
    name: 'Person 20',
    rating: 3.6,
    projects: 2,
    percentage: 53.1,
    isSelected: false,
  },
];

const DATA3 = [
  {
    id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a21',
    name: 'Person 21',
    rating: 4.7,
    projects: 8,
    percentage: 92.3,
    isSelected: false,
  },
  {
    id: 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b22',
    name: 'Person 22',
    rating: 3.2,
    projects: 3,
    percentage: 65.8,
    isSelected: false,
  },
  {
    id: 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c23',
    name: 'Person 23',
    rating: 4.9,
    projects: 12,
    percentage: 87.1,
    isSelected: false,
  },
  {
    id: 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d24',
    name: 'Person 24',
    rating: 2.6,
    projects: 5,
    percentage: 43.9,
    isSelected: false,
  },
  {
    id: 'e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e25',
    name: 'Person 25',
    rating: 4.1,
    projects: 9,
    percentage: 79.5,
    isSelected: false,
  },
  {
    id: 'f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f26',
    name: 'Person 26',
    rating: 3.8,
    projects: 6,
    percentage: 71.2,
    isSelected: false,
  },
  {
    id: 'g7g7g7g7-g7g7-g7g7-g7g7-g7g7g7g7g7g27',
    name: 'Person 27',
    rating: 4.5,
    projects: 7,
    percentage: 88.9,
    isSelected: false,
  },
  {
    id: 'h8h8h8h8-h8h8-h8h8-h8h8-h8h8h8h8h8h28',
    name: 'Person 28',
    rating: 3.9,
    projects: 4,
    percentage: 62.4,
    isSelected: false,
  },
  {
    id: 'i9i9i9i9-i9i9-i9i9-i9i9-i9i9i9i9i9i29',
    name: 'Person 29',
    rating: 4.2,
    projects: 11,
    percentage: 76.7,
    isSelected: false,
  },
  {
    id: 'j0j0j0j0-j0j0-j0j0-j0j0-j0j0j0j0j0j30',
    name: 'Person 30',
    rating: 3.6,
    projects: 2,
    percentage: 53.1,
    isSelected: false,
  },
];

const Invite = ({ stepper, youDidItModal, toggleYouDidItModal }) => {
  const tabNames = {
    best: '1',
    favourite: '2',
    almaMater: '3',
  };

  const dispatch = useDispatch();

  const bestTalentsData = useSelector(bestTalents);
  const createProjectDetails = useSelector(createProjectData);

  const [activeTab, setTabActive] = useState(tabNames.best);
  const [bestData, setBestData] = useState(null);
  const [favouriteData, setFavouriteData] = useState(null);
  const [almaMaterData, setAlmaMaterData] = useState(null);
  const [filteredFavouriteData, setFilteredFavouriteData] = useState(null);
  const [filteredAlmaMaterData, setFilteredAlmaMaterData] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [inviteModal, setInviteModal] = useState(null);
  const [sendInvitationModal, setSendInvitationModal] = useState(null);

  const toggleInviteModal = () => setInviteModal(!inviteModal);
  const toggleSendInvitationModal = () => setSendInvitationModal(!sendInvitationModal);

  useEffect(() => {
    setBestData(DATA1);
  }, [DATA1]);
  useEffect(() => {
    setFavouriteData(DATA2);
  }, [DATA2]);
  useEffect(() => {
    setAlmaMaterData(DATA3);
  }, [DATA3]);

  useEffect(() => {
    setFilteredFavouriteData(favouriteData);
  }, [favouriteData]);
  useEffect(() => {
    setFilteredAlmaMaterData(almaMaterData);
  }, [almaMaterData]);

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setTabActive(tab);
    }
  };

  const len =
    (bestData ? bestData.length : 0) +
    (favouriteData ? favouriteData.length : 0) +
    (almaMaterData ? almaMaterData.length : 0);

  const onSendInvitationModalOpen = () => {
    const selectedBestTalents = bestData.filter((talent) => selectedIds.includes(talent.id));
    const selectedFavouriteTalents = favouriteData.filter((talent) => selectedIds.includes(talent.id));
    const selectedAlmaMaterTalents = almaMaterData.filter((talent) => selectedIds.includes(talent.id));

    const selectedTalentsData = [...selectedBestTalents, ...selectedFavouriteTalents, ...selectedAlmaMaterTalents];

    setSelectedTalents(selectedTalentsData);
    setSendInvitationModal(true);
  };

  const loadNewBestTalents = () => {
    dispatch(
      getBestTalents(
        createProjectDetails?.project_id,
        '',
        // eslint-disable-next-line no-unsafe-optional-chaining
        bestTalentsData?.metadata?.current_page + 1,
        10,
        bestTalentsData?.data,
      ),
    );
  };

  return (
    <>
      {youDidItModal && <YouDidItModal modal={youDidItModal} toggleModal={toggleYouDidItModal} />}
      {inviteModal && <InviteModal modal={inviteModal} toggleModal={toggleInviteModal} />}
      {sendInvitationModal && (
        <SendInvitationModal
          modal={sendInvitationModal}
          toggleModal={toggleSendInvitationModal}
          selectedTalents={selectedTalents}
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
                <Input
                  placeholder="Enter talent name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
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

          <p className="font-small-3">{`${selectedIds?.length}/${len} invited`}</p>

          <TabContent activeTab={activeTab} className="mb-2">
            <TabPane tabId={tabNames.best}>
              {activeTab === tabNames.best && (
                <InfiniteScroll
                  dataLength={bestTalentsData?.data?.length || 0}
                  next={loadNewBestTalents}
                  hasMore={bestTalentsData?.metadata?.has_next_page}
                >
                  <TableContainer>
                    {bestTalentsData?.data?.length > 0 ? (
                      bestTalentsData?.data?.map((item) => (
                        <Row key={item.id} className="d-flex align-items-center mb-2">
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
                          <Col sm="2" md="3" lg="1">
                            {selectedIds.includes(item.user_id) ? (
                              <div
                                className="d-flex justify-content-center align-items-center invited-icon-container cursor-pointer ms-5"
                                onClick={() => setSelectedIds(selectedIds.filter((data) => data !== item.user_id))}
                              >
                                <Check size={18} color={theme.green} />
                              </div>
                            ) : (
                              <div
                                className="upload-btn cursor-pointer ms-3"
                                onClick={() => setSelectedIds([...selectedIds, item.user_id])}
                              >
                                <h5 className="m-0 fw-light font-medium-1">Invite</h5>
                              </div>
                            )}
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
                  </TableContainer>
                </InfiniteScroll>
              )}
            </TabPane>
            <TabPane tabId={tabNames.favourite}>
              {activeTab === tabNames.favourite && (
                <TableContainer>
                  {filteredFavouriteData?.length > 0 ? (
                    filteredFavouriteData?.map((item) => (
                      <Row key={item.id} className="d-flex align-items-center mb-2">
                        <Col sm="2" md="3" lg="4">
                          <div className="d-flex align-items-center">
                            <div className="user-pic p-25 me-2">
                              <User size={28} />
                            </div>
                            <p className="font-medium-1 fw-bold m-0">{item.name}</p>
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
                            <p className="m-0 font-small-3 fw-bold ms-1">{item.projects} Projects</p>
                          </div>
                        </Col>
                        <Col sm="2" md="3" lg="2">
                          <div className="circular-progressbar-container">
                            <CircularProgressbarWithChildren
                              value={item.percentage}
                              styles={{
                                path: {
                                  stroke: giveStrokeColor(item.percentage),
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
                                <p className="percentage-text m-0">{item.percentage}%</p>
                              </div>
                            </CircularProgressbarWithChildren>
                          </div>
                        </Col>
                        <Col sm="2" md="3" lg="1">
                          {selectedIds.includes(item.id) ? (
                            <div
                              className="d-flex justify-content-center align-items-center invited-icon-container cursor-pointer ms-5"
                              onClick={() => setSelectedIds(selectedIds.filter((data) => data !== item.id))}
                            >
                              <Check size={18} color={theme.green} />
                            </div>
                          ) : (
                            <div
                              className="upload-btn cursor-pointer ms-3"
                              onClick={() => setSelectedIds([...selectedIds, item.id])}
                            >
                              <h5 className="m-0 fw-light font-medium-1">Invite</h5>
                            </div>
                          )}
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <div className="no-data-found-container d-flex flex-column align-items-center py-1">
                      <img src={NoDataFoundGif} alt="no-data" width={200} height={200} className="no-data-found-gif" />
                      <p className="m-0 fw-bold font-medium-3">No Data Found</p>
                    </div>
                  )}
                </TableContainer>
              )}
            </TabPane>
            <TabPane tabId={tabNames.almaMater}>
              {activeTab === tabNames.almaMater && (
                <TableContainer>
                  {filteredAlmaMaterData?.length > 0 ? (
                    filteredAlmaMaterData?.map((item) => (
                      <Row key={item.id} className="d-flex align-items-center mb-2">
                        <Col sm="2" md="3" lg="4">
                          <div className="d-flex align-items-center">
                            <div className="user-pic p-25 me-2">
                              <User size={28} />
                            </div>
                            <p className="font-medium-1 fw-bold m-0">{item.name}</p>
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
                            <p className="m-0 font-small-3 fw-bold ms-1">{item.projects} Projects</p>
                          </div>
                        </Col>
                        <Col sm="2" md="3" lg="2">
                          <div className="circular-progressbar-container">
                            <CircularProgressbarWithChildren
                              value={item.percentage}
                              styles={{
                                path: {
                                  stroke: giveStrokeColor(item.percentage),
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
                                <p className="percentage-text m-0">{item.percentage}%</p>
                              </div>
                            </CircularProgressbarWithChildren>
                          </div>
                        </Col>
                        <Col sm="2" md="3" lg="1">
                          {selectedIds.includes(item.id) ? (
                            <div
                              className="d-flex justify-content-center align-items-center invited-icon-container cursor-pointer ms-5"
                              onClick={() => setSelectedIds(selectedIds.filter((data) => data !== item.id))}
                            >
                              <Check size={18} color={theme.green} />
                            </div>
                          ) : (
                            <div
                              className="upload-btn cursor-pointer ms-3"
                              onClick={() => setSelectedIds([...selectedIds, item.id])}
                            >
                              <h5 className="m-0 fw-light font-medium-1">Invite</h5>
                            </div>
                          )}
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <div className="no-data-found-container d-flex flex-column align-items-center py-1">
                      <img src={NoDataFoundGif} alt="no-data" width={200} height={200} className="no-data-found-gif" />
                      <p className="m-0 fw-bold font-medium-3">No Data Found</p>
                    </div>
                  )}
                </TableContainer>
              )}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center upload-btn cursor-pointer" onClick={() => stepper.previous()}>
          <BlueBgIconContainer className="p-25">
            <ChevronLeft size={18} color={theme.activeNavPillText} />
          </BlueBgIconContainer>
          <h5 className="fw-light mb-0 mx-75">Back</h5>
        </div>
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
  youDidItModal: Proptypes.bool,
  toggleYouDidItModal: Proptypes.func,
};

Invite.defaultProps = {
  stepper: {},
  youDidItModal: false,
  toggleYouDidItModal: () => {},
};
