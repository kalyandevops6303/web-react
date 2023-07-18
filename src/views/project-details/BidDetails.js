import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'react-feather';
import { Button, Card, CardBody, CardText, CardTitle, Col, Row, Table } from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import styled from 'styled-components';
import LeftSidebarProfile from '../user-details/overview/LeftSidebarProfile';
import theme from '../../configs/themeVariables';

const currentProfile = {
  _id: '6486b30ba51384fb6948e724',
  currency_preference: {
    _id: '6475a97308b60176c1a25c20',
    code: 'INR',
    name: 'Indian National Rupee',
  },
  languages_write: [],
  first_name: 'Rajat',
  user_id: '6486b2b2b03b9ecd06909871',
  last_name: 'Petwal',
  image_uri: 'assets/trumio_logo.png',
  projects_worked_on_count: 0,
  languages_read: [],
  social_links: [
    {
      platform: 'linkedIn',
      url: 'https://linkedin.com/user=1122',
    },
  ],
  tagline: 'Professional Procrastinator',
  languages_speak: [],
  educational_institute: [
    {
      institution: {
        _id: '648317fe99d9a45dd6e9b855',
        name: 'Graphic Era University',
      },
      education: {
        _id: '64830f8cb03b9ecd069097e5',
        name: 'Bachelor of Technology',
      },
    },
  ],
  hourly_rate: 80,
  work_experience: 12,
  rating: 4,
  professional_intro: 'I am what you can call a blockchain enthusiast',
  role: {
    _id: '6486a8e3e402d96bc5d28d36',
    name: 'AI Engineer',
  },
  current_residency: {
    country: {
      _id: '6479c2071183add75cda4db1',
      code: 'IN',
      name: 'India',
    },
    state: {
      _id: '6479c620a93f95115d35924c',
      name: 'Uttarakhand',
    },
    city: {
      _id: '6479ed63fe992bcffe295c67',
      name: 'Dehradun',
    },
    street_address: '',
    house_number: '',
    zip_code: '',
  },
  expertise: {
    skills: [
      {
        _id: '6486a65e34730cac6a480442',
        name: 'Cryptography',
      },
      {
        _id: '6486a65e34730cac6a480456',
        name: 'Hadoop',
      },
      {
        _id: '6486a65e34730cac6a480470',
        name: 'Python',
      },
      {
        _id: '6486a65e34730cac6a480479',
        name: 'RESTful APIs',
      },
    ],
    tools: [
      {
        _id: '6486a6c33cf46b7a02d8be1f',
        name: 'Git',
      },
      {
        _id: '6486a6c33cf46b7a02d8be78',
        name: 'React',
      },
    ],
    certificates: [],
  },
  availability: {
    timezone: {
      _id: '6479f0fafe992bcffe2ab719',
      offset: 19800,
      offset_name: 'UTC+05:30',
      name: 'Asia/Kolkata',
      abbreviation: 'IST',
    },
    weekdays_avl: {
      start_time: 10,
      end_time: 18,
      days: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
    },
    weekends_avl: {
      end_time: null,
      start_time: null,
    },
  },
  user_type: 'TALENT',
  is_favourited: false,
  is_alma_matter: false,
};

const BidDetailsWrap = styled.div`
  .report-text {
    color: ${theme.red};
  }

  .main-card-title {
    padding: 1.5rem 1.5rem 0.8rem 1.5rem !important;
    font-size: 1.25rem;
    margin-bottom: 0 !important;
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
  }
  .bid-eta {
    display: flex;
    gap: 2rem;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    .value {
      font-size: 1.3rem;
      font-weight: 600;
      margin: 0;
    }
    .key {
    }
  }

  // milestone

  .milestone-table {
    border: 1px solid ${theme.cardHeaderBorderColor};
    th {
      padding: 1rem 1.7rem;
    }
    td {
      font-weight: 500;
      padding: 1rem 1.7rem;
    }
  }
  .milestone-title {
    font-weight: 300;
    font-size: 1.2rem;
  }

  // Back wrap
  .back-wrap {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
    .chevron-left-bg {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: ${theme.activeColor}1f;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .back-text {
      color: ${theme.activeColor};
    }
  }
`;

const BidDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <BidDetailsWrap>
      <div className="d-flex justify-content-between mb-1">
        <BreadCrumbs data={[{ title: 'Bid Details' }]} />
        <div className="d-flex gap-2 align-items-center">
          <CardText className="report-text m-0 text-center fw-bold">Report</CardText>
          <span>
            <Button className="d-contents" color="primary">
              Assign Project
            </Button>
          </span>
        </div>
      </div>

      <Row>
        <Col lg="3">
          <LeftSidebarProfile isInvited isClient={false} data={currentProfile} isEditable={false} />
        </Col>
        <Col lg="9">
          <Card>
            <CardTitle className="main-card-title">Project Bid Estimation</CardTitle>
            <CardBody className="main-card-body bid-eta">
              <div>
                <CardText className="value">$65,334</CardText>
                <CardText className="key">Total Bid Amount</CardText>
              </div>
              <div>
                <CardText className="value">$65,334</CardText>
                <CardText className="key">Total Bid Amount</CardText>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="main-card-body">
              <CardText className="milestone-title d-block mb-1">Milestone</CardText>
              <Table responsive className="milestone-table">
                <thead>
                  <tr>
                    <th>Payment for</th>
                    <th>Milestone Tag</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="fw-bolder">Milestone 1</td>
                    <td>First prototype design for v1.0</td>
                    <td>Peter Charles</td>
                  </tr>
                  <tr>
                    <td className="fw-bolder">Milestone 2</td>
                    <td>Alpha release for v1.0 modules</td>
                    <td>Peter Charles</td>
                  </tr>
                  <tr>
                    <td className="fw-bolder">Milestone 3</td>
                    <td>System test pass for v1.0</td>
                    <td>Peter Charles</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <div className="d-flex justify-content-between mb-1">
            <div className="back-wrap" onClick={handleBack}>
              <span className="chevron-left-bg">
                <ChevronLeft size={22} color={theme.acceptColor} />
              </span>
              <CardText className="back-text">Back</CardText>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <CardText className="report-text m-0 text-center fw-bold">Report</CardText>
              <span>
                <Button className="d-contents" color="primary">
                  Assign Project
                </Button>
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </BidDetailsWrap>
  );
};

export default BidDetails;
