import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import BreadCrumbs from '@components/breadcrumbs';
import DataTable from 'react-data-table-component';
import Avatar from '@components/avatar';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import PdfIcon from '@src/assets/images/PDF.svg';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import {
  Box,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Eye,
  FileText,
  MoreVertical,
  Paperclip,
  Search,
  Star,
  Users,
} from 'react-feather';
import hat from '@src/assets/images/hat.png';
import Invited from '@src/assets/images/invited.png';
import Rating from 'react-rating';

import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import LeftSidebarProjectDetails from './overview/LeftSidebarProjectDetails';
import CustomStep from '../../@core/components/custom-stepper';
import theme from '../../configs/themeVariables';
import Timeline from '../../@core/components/timeline';
import { selectThemeColors } from '../../utility/Utils';

const ProjectDetails = () => {
  const [open, setOpen] = useState('1');

  const sortingOptions = [
    { label: 'New', value: 'NEW' },
    { label: 'Recommended', value: 'RECOMMADED' },
  ];
  const param = useParams();
  const steps = [
    {
      title: 'Team',
      subtitle: 'Team list & Permission',
      icon: <Users size={18} />,
    },
    {
      title: 'Bid',
      subtitle: 'Project bid status',
      icon: <FileText size={18} />,
    },
    {
      title: 'Milestone',
      subtitle: 'Status & dispute',
      icon: <Box size={18} />,
    },
    {
      title: 'Payment',
      subtitle: 'Pay transaction',
      icon: <CreditCard size={18} />,
    },
    {
      title: 'Rating',
      subtitle: 'Give and get ratings',
      icon: <Star size={18} />,
    },
  ];

  const BidWrapper = styled.div`
    .basic-title {
      padding-left: 1.2rem;
    }

    .card .card {
      box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
      margin-bottom: 0;
    }
    .main-card-body {
      background: ${theme.headerBackground};
      padding: 2rem 1rem 2rem 0.67rem !important;
    }
    .main-card-title {
      padding: 1.2rem;
      font-size: 1.25rem;
      margin-bottom: 0 !important;
      background: ${theme.headerBackground};
      border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    }

    // Timeline
    .timeline-item {
      padding-left: 1.6rem !important;
      border-left: 1px solid ${theme.cardHeaderBorderColor} !important;
      &:last-of-type {
        border-color: transparent !important;
      }
    }
    .disabled-color {
      color: ${theme.infoIcon};
    }
    .card-cta {
      text-decoration: underline;
      color: ${theme.activeNavPillText};
      cursor: pointer;
    }
    .indicator {
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 50%;
      background: ${theme.red};
      align-self: flex-start;
    }

    .meta-data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .time {
        color: ${theme.gray};
        font-size: 0.8rem;
      }
      .card-cta {
        text-align: right;
      }
    }

    // Accordion
    .accordion-timeline,
    .accordion {
      border-radius: 0.3rem;
      box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1) !important;
      .accordion-body {
        color: ${theme.bodyColor};
        padding: 0;
      }
      .accordion-body-desc {
        padding: 0 0 0 1.6rem;
        font-size: 0.9rem;
        .desc {
          width: 70%;
        }
      }
      .accordion-item {
        border-radius: 0.3rem;
        .accordion-header {
          button {
            font-size: 1rem;
            padding: 0.8rem 0.8rem 0.8rem 0 !important;
            font-size: 1rem !important;
          }
        }
      }
    }

    // Nested timeline css
    .accordion-status-body {
      padding: 1.4rem 2rem 1rem 1rem;
      .timeline-item {
        padding-left: 2.5rem !important;
        border-left: 1px solid ${theme.cardHeaderBorderColor} !important;
        &:last-of-type {
          border-color: transparent !important;
          margin-bottom: 5rem;
        }
      }
    }

    // Table
    .hide {
      visibility: hidden;
    }
    .rdt_TableRow {
      padding: 0.8rem 0;
    }
    .rdt_TableHeadRow {
      background: ${theme.tableHeaderColor};
    }

    .table-user-photo {
      height: 2.2rem;
      border-radius: 50%;
    }
    .table-user-name {
      font-size: 0.9rem;
      font-weight: 600;
    }
    .table-user-sub {
      font-size: 0.775rem;
      color: ${theme.textMuted};
    }
    .almamator-badge {
      border-radius: 50%;
      background: ${theme.yellowColor} !important;
      height: 1.6rem;
      width: 1.7rem;
      padding: 0.3rem;
    }
    .invited-badge {
      border-radius: 50%;
      background: ${theme.activeNavPillText}1f !important;
      height: 1.7rem;
      width: 1.7rem;
      padding: 0.3rem;
    }
  `;
  const toggle = (id) => (open === id ? setOpen() : setOpen(id));

  const AccordionHeadStyle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-left: 1.2rem;
    .title-head {
      margin: auto 0;
    }
    .view-all-cta {
      font-size: 0.875rem;
      color: ${theme.activeColor};
      text-decoration: underline;
      margin: auto 1rem auto auto;
      font-weight: 400;
    }
    .key {
      color: ${theme.bodyColor};
      font-size: 0.75rem;
      font-weight: 400;
    }
  `;
  const advSearchColumns = [
    {
      name: 'NAME',
      sortable: true,
      minWidth: '28%',
      selector: (row) => row.name,
    },
    {
      name: 'RATING',
      sortable: true,
      minWidth: '16%',
      selector: (row) => row.rating,
    },
    {
      name: 'BID AMT',
      sortable: true,
      minWidth: '14%',
      selector: (row) => row.bid,
    },
    {
      name: 'ATTACHMENTS',
      sortable: true,
      minWidth: '18%',
      selector: (row) => row.attachments,
    },
    {
      name: 'STATUS',
      sortable: true,
      minWidth: '12%',
      selector: (row) => row.status,
    },

    {
      name: 'ACTION',
      sortable: true,
      minWidth: '6%',
      selector: (row) => row.action,
    },
  ];

  const advSearchData = [
    {
      name: (
        <div className="d-flex gap-50 align-items-center">
          <Badge className="almamator-badge">
            <img src={hat} alt="user-badge" />
          </Badge>
          <Badge className="invited-badge">
            <img src={Invited} alt="user-badge" />
          </Badge>

          <div className="d-flex gap-1 aliner-items-center">
            <img className="table-user-photo" src={lisa} alt="user" />
            <div>
              <span className="font-weight-bold d-block table-user-name">Trumio</span>
              <span className="table-user-sub">Ronnie roy</span>
            </div>
          </div>
        </div>
      ),
      rating: (
        <>
          <Rating
            className="mb-25"
            initialRating={3.5}
            emptySymbol={<img height={20} src={EmptyStar} alt="Empty star" />}
            fullSymbol={<img height={20} src={FilledStar} alt="Filled star" />}
            readonly
          />
          <div className="table-user-sub">56 Projects</div>
        </>
      ),
      bid: '$1000',
      attachments: (
        <div>
          <Paperclip size={18} color={theme.bodyColor} /> <span>2</span>
        </div>
      ),
      status: 'Active',
      action: (
        <div className="d-flex gap-1">
          <Eye size={22} color={theme.bodyColor} />
          <MoreVertical size={18} color={theme.bodyColor} />
        </div>
      ),
    },
    {
      name: (
        <div className="d-flex gap-50 align-items-center">
          <Badge className="almamator-badge hide">
            <img src={hat} alt="user-badge" />
          </Badge>
          <Badge className="invited-badge">
            <img src={Invited} alt="user-badge" />
          </Badge>

          <div className="d-flex gap-1 aliner-items-center">
            <img className="table-user-photo" src={lisa} alt="user" />
            <div>
              <span className="font-weight-bold d-block table-user-name">Trumio</span>
              <span className="table-user-sub">Ronnie roy</span>
            </div>
          </div>
        </div>
      ),
      rating: '4',
      bid: '$1000',
      attachments: (
        <div>
          <Paperclip size={18} color={theme.bodyColor} /> <span>2</span>
        </div>
      ),
      status: 'Active',
      action: (
        <div className="d-flex gap-1">
          <Eye size={22} color={theme.bodyColor} />
          <MoreVertical size={18} color={theme.bodyColor} />
        </div>
      ),
    },
  ];

  const contractUpdates = [
    {
      status: 'Project started',
      color: theme.info,
    },
    {
      status: 'Signed - Contract Document',
      color: theme.orangeColor,
      user_details: {
        name: 'Tim Waker (Team Member)',
        org_name: 'R&D',
      },
    },
    {
      status: 'Signed - Contract Document)',
      color: theme.orangeColor,
      user_details: {
        name: 'Leona Watkins (Client)',
        org_name: 'CEO of pixinvent',
      },
    },
    {
      status: 'Signed - Contract Document',
      color: theme.orangeColor,
      user_details: {
        name: 'Rose (Team Member)',
        org_name: 'R&D',
      },
    },
    {
      status: 'Signed - Contract Document',
      color: theme.orangeColor,
      user_details: {
        name: 'Rose (Team Member)',
        org_name: 'R&D',
      },
    },
  ];

  const bidUpdates = [
    {
      status: 'Bid Accepted',
      color: theme.info,
    },
    {
      status: 'Bid Shortlisted',
      color: theme.info,
    },

    {
      status: 'Bid Reviewed',
      color: theme.orangeColor,
      user_details: {
        name: 'Leona Watkins (Client)',
        org_name: 'CEO of pixinvent',
      },
    },

    {
      status: 'Bid submitted',
      color: theme.orangeColor,
      bid_details: {
        duration: '5w',
        total_hours: '225h',
        talent_cost: '$1400',
        file: '',
      },
    },
  ];

  const contractDataSet = [];
  contractUpdates.map((item) =>
    contractDataSet.push({
      meta: '45 min ago',
      color: item.color,
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div>
            <h6 className="mb-25">{item.status}</h6>
            <span className="d-block mb-1">Feb 1, 23</span>
            {item.user_details && (
              <div className="d-flex align-items-center">
                <Avatar img={lisa} imgHeight="38" imgWidth="38" />
                <div className="ms-50">
                  <h6 className="mb-25">{item.user_details.name}</h6>
                  <span className="mb-50">{item.user_details.org_name}</span>
                </div>
              </div>
            )}
          </div>
          <div className="meta-data">
            <span className="time">45min ago</span>
            <span className="card-cta">View</span>
          </div>
        </div>
      ),
    }),
  );

  const bidUpdatesDataSet = [];
  bidUpdates.map((item) =>
    bidUpdatesDataSet.push({
      color: item.color,
      customContent: (
        <div className="d-flex justify-content-between mb-1">
          <div>
            <h6 className="mb-25">{item.status}</h6>
            <span className="d-block mb-1">Feb 1, 23</span>
            {item.user_details && (
              <div className="d-flex align-items-center">
                <Avatar img={lisa} imgHeight="38" imgWidth="38" />
                <div className="ms-50">
                  <h6 className="mb-25">{item.user_details.name}</h6>
                  <span className="mb-50">{item.user_details.org_name}</span>
                </div>
              </div>
            )}

            {item.bid_details && (
              <>
                <div className="d-flex gap-1 mb-75">
                  <span className="d-flex align-items-center gap-25">
                    <h6 className="mb-0">Duration: </h6>
                    <span className="">{item.bid_details.duration}</span>
                  </span>
                  <span className="d-flex align-items-center gap-25">
                    <h6 className="mb-0">Total Hours: </h6>
                    <span className="">{item.bid_details.total_hours}</span>
                  </span>
                  <span className="d-flex align-items-center gap-25">
                    <h6 className="mb-0">Total Cost: </h6>
                    <span className="">{item.bid_details.talent_cost}</span>
                  </span>
                </div>
                <div className="d-flex gap-25 align-items-center">
                  <img src={PdfIcon} alt="pdficon" /> <h6 className="mb-0">Proposal.pdf</h6>
                </div>
              </>
            )}
          </div>
          <div className="meta-data">
            <span className="time">45min ago</span>
            <span className="card-cta">View</span>
          </div>
        </div>
      ),
    }),
  );

  const isDisabled = true;
  const basicData = [
    {
      isDisabled: false,
      color: theme.orangeColor,
      // meta: '12 min ago',
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <div className="d-flex justify-content-between">
              <CardText className={`fw-bold mb-0  ${isDisabled ? 'disabled-color' : ''}`}>Contract</CardText>
              {!isDisabled && (
                <div className="d-flex gap-50 align-items-center">
                  <span className="card-cta">Sign contract</span>
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      ),
    },
    {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-25 align-items-center">
                <CardText className="fw-bold mb-0">Contract</CardText>
                <span className="indicator" />
              </div>
              <div className="d-flex gap-50 align-items-center">
                <span className="card-cta">Sign contract</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </CardBody>
        </Card>
      ),
    },
    {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <Accordion className="accordion-timeline" open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="title-head">Contract</span>
                <div className="d-flex gap-1 aling-items-center">
                  <CardText className="d-none view-all-cta">Give rating</CardText>

                  <div className="me-1">
                    <span className="key">Updated Date</span>
                    <CardText className="value">Mar 1, 23</CardText>
                  </div>
                </div>
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1" className="accordion-status-body">
              <Timeline data={contractDataSet} />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      ),
    },

    {
      color: theme.purpleTimelimeColor,
      isDisabled: true,
      customContent: (
        <Accordion className="accordion-timeline" open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="title-head">Received bids</span>
                <div className="d-flex gap-1 aling-items-center">
                  <CardText className="d-none view-all-cta">Give rating</CardText>
                  <div>
                    <span className="key">Duration</span>
                    <CardText className="value">5w</CardText>
                  </div>
                  <div className="me-1">
                    <span className="key">Talent Cost</span>
                    <CardText className="value">$1,000</CardText>
                  </div>
                </div>
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <div className="accordion-body-desc">
                <CardText className="desc mb-0">
                  Your proposal request has reached the best solution partners around the globe. Below are the list of
                  solution partner that have submitted bid for your proposal request.
                </CardText>
                <Row className="justify-content-between w-100 mb-2">
                  <Col className="d-flex align-items-end" sm="12" md="12" lg="4">
                    <InputGroup className="input-group-merge">
                      <InputGroupText className="ps-1 pe-50">
                        <Search size={14} color={theme.textMuted} />
                      </InputGroupText>
                      <Input placeholder="Search talent name" value={12} />
                    </InputGroup>
                  </Col>
                  <Col sm="12" md="12" lg="3">
                    <Label className="form-label">Project Status</Label>
                    <Select
                      options={sortingOptions}
                      classNamePrefix="select"
                      placeholder="Select type"
                      theme={selectThemeColors}
                    />
                  </Col>
                </Row>
                <CardText>10/500 Invited</CardText>
              </div>

              <div className="react-dataTable mt-1">
                <DataTable
                  noHeader
                  pagination={false}
                  columns={advSearchColumns}
                  paginationPerPage={7}
                  className="react-dataTable"
                  sortIcon={<ChevronDown size={10} />}
                  data={advSearchData}
                  classNamePrefix="react-dataTable"
                />
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <Accordion className="accordion-timeline" open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <AccordionHeadStyle>
                <span className="title-head">Bid Submitted</span>

                <div className="d-flex gap-1 aling-items-center">
                  <CardText className="d-none view-all-cta">Give rating</CardText>

                  <div className="d-flex gap-1 aling-items-center">
                    <div>
                      <span className="key">Duration</span>
                      <CardText className="value">5w</CardText>
                    </div>
                    <div className="me-1">
                      <span className="key">Talent Cost</span>
                      <CardText className="value">$1,000</CardText>
                    </div>
                  </div>
                </div>
              </AccordionHeadStyle>
            </AccordionHeader>
            <AccordionBody accordionId="1" className="accordion-status-body">
              <Timeline data={bidUpdatesDataSet} />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      ),
    },
  ];

  return (
    <>
      <BreadCrumbs data={[{ title: 'Project name' }]} />
      <Row>
        <Col lg="3">
          <LeftSidebarProjectDetails />
        </Col>
        <Col lg="9">
          <CustomStep steps={steps} currentStep={param.projectStep} />
          <BidWrapper>
            <Card>
              <CardTitle className="main-card-title">Bid Stage</CardTitle>
              <CardBody className="main-card-body">
                <Timeline data={basicData} />
              </CardBody>
            </Card>
          </BidWrapper>
        </Col>
      </Row>
    </>
  );
};

export default ProjectDetails;
