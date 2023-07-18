import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import BreadCrumbs from '@components/breadcrumbs';
import DataTable from 'react-data-table-component';

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

import lisa from '@src/assets/images/portrait/small/lisa.png';
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

  const basicData = [
    {
      content:
        'Invoices have been paid to the company. Invoices have been paid to the company. Invoices have been paid to the company.Invoices have been paid to the company.Invoices have been paid to the company.Invoices have been paid to the company.Invoices have been paid to the company.Invoices have been paid to the company.',
      title:
        'Invoices have been paid to the company. Invoices have been paid to the company. Invoices have been paid to the company.Invoices have been paid to the company.Invoices have been paid to the company.Invoices have been paid to the company.Invoices have been paid to the company.Invoices have been paid to the company.',
      // meta: '12 min ago',
      customContent: (
        <Card>
          <CardBody className="basic-title">
            <CardText className="fw-bold">Contract</CardText>
          </CardBody>
        </Card>
      ),
    },

    {
      title: '12 Invoices have been paid',
      content: 'Invoices have been paid to the company.',
      meta: '12 min ago',
      color: 'warning',
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
