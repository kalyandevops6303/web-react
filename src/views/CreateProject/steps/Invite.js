import { useState } from 'react';
import Proptypes from 'prop-types';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Check, ChevronLeft, Search, Share2, Star, User } from 'react-feather';
import {
  Badge,
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

const Invite = ({ stepper }) => {
  const tabNames = {
    best: '1',
    favourite: '2',
    almaMater: '3',
  };

  const [activeTab, setTabActive] = useState(tabNames.best);

  const toggleTabs = (tab) => {
    if (activeTab !== tab) {
      setTabActive(tab);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="d-flex justify-content-between">
          <h4 className="m-0 mt-1">
            Invite Bids <span className="fw-normal">(Optional)</span>
          </h4>
          <div className="d-flex align-items-center upload-btn cursor-pointer">
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
                <Input placeholder="Enter talent name" />
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

          <p className="font-small-3">10/50 invited</p>

          <TabContent activeTab={activeTab} className="mb-2">
            <TabPane tabId={tabNames.best}>
              {activeTab === tabNames.best && (
                <TableContainer>
                  <Row className="d-flex align-items-center mb-2">
                    <Col sm="2" md="3" lg="4">
                      <div className="d-flex align-items-center">
                        <div className="user-pic p-25 me-2">
                          <User size={28} />
                        </div>
                        <p className="font-medium-1 fw-bold m-0">John Doe</p>
                      </div>
                    </Col>
                    <Col sm="2" md="3" lg="4">
                      <div className="d-flex align-items-center">
                        <Badge>
                          <div className="d-flex align-items-center">
                            <Star size={12} color={theme.starRatingBg} fill={theme.starRatingBg} className="me-50" />
                            <p className="m-0 fw-bolder rating-text">4.1</p>
                          </div>
                        </Badge>
                        <p className="m-0 font-small-3 fw-bold ms-1">26 Projects</p>
                      </div>
                    </Col>
                    <Col sm="2" md="3" lg="2">
                      <div className="circular-progressbar-container">
                        <CircularProgressbarWithChildren
                          value={25}
                          styles={{
                            path: {
                              stroke: giveStrokeColor(25),
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
                            <p className="percentage-text m-0">{25}%</p>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    </Col>
                    <Col sm="2" md="3" lg="1">
                      <div className="upload-btn cursor-pointer ms-3">
                        <h5 className="m-0 fw-light font-medium-1">Invite</h5>
                      </div>
                    </Col>
                  </Row>

                  <Row className="d-flex align-items-center mb-2">
                    <Col sm="2" md="3" lg="4">
                      <div className="d-flex align-items-center">
                        <div className="user-pic p-25 me-2">
                          <User size={28} />
                        </div>
                        <p className="font-medium-1 fw-bold m-0">John Doe</p>
                      </div>
                    </Col>
                    <Col sm="2" md="3" lg="4">
                      <div className="d-flex align-items-center">
                        <Badge>
                          <div className="d-flex align-items-center">
                            <Star size={12} color={theme.starRatingBg} fill={theme.starRatingBg} className="me-50" />
                            <p className="m-0 fw-bolder rating-text">4.1</p>
                          </div>
                        </Badge>
                        <p className="m-0 font-small-3 fw-bold ms-1">26 Projects</p>
                      </div>
                    </Col>
                    <Col sm="2" md="3" lg="2">
                      <div className="circular-progressbar-container">
                        <CircularProgressbarWithChildren
                          value={86}
                          styles={{
                            path: {
                              stroke: giveStrokeColor(86),
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
                            <p className="percentage-text m-0">{86}%</p>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    </Col>
                    <Col sm="2" md="3" lg="1">
                      <div className="d-flex justify-content-center align-items-center invited-icon-container cursor-pointer ms-5">
                        <Check size={18} color={theme.green} />
                      </div>
                    </Col>
                  </Row>
                </TableContainer>
              )}
            </TabPane>
            <TabPane tabId={tabNames.favourite}>
              {activeTab === tabNames.favourite && (
                <TableContainer>
                  <div className="no-data-found-container d-flex flex-column align-items-center py-1">
                    <img src={NoDataFoundGif} alt="no-data" width={200} height={200} className="no-data-found-gif" />
                    <p className="m-0 fw-bold font-medium-3">No Data Found</p>
                  </div>
                </TableContainer>
              )}
            </TabPane>
            <TabPane tabId={tabNames.almaMater}>
              {activeTab === tabNames.almaMater && (
                <TableContainer>
                  <div className="no-data-found-container d-flex flex-column align-items-center py-1">
                    <img src={NoDataFoundGif} alt="no-data" width={200} height={200} className="no-data-found-gif" />
                    <p className="m-0 fw-bold font-medium-3">No Data Found</p>
                  </div>
                </TableContainer>
              )}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center upload-btn cursor-pointer" onClick={() => stepper.previous()}>
          <BlueBgIconContainer className="p-25">
            <ChevronLeft size={18} color={theme.activeNavPillText} />
          </BlueBgIconContainer>
          <h5 className="fw-light mb-0 mx-75">Back</h5>
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
