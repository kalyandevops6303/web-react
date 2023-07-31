import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'react-feather';
import { Button, Card, CardBody, CardText, CardTitle, Col, Row, Table } from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import LeftSidebarProfile from '../user-details/overview/LeftSidebarProfile';
import theme from '../../configs/themeVariables';
import { currentProfile } from './overview/constants';
import { BidDetailsWrap } from './style';

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
                <CardText className="value">$30,000</CardText>
                <CardText className="key">Total Bid Amount</CardText>
              </div>
              <div>
                <CardText className="value">10w</CardText>
                <CardText className="key">Estimation Duraion</CardText>
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
                    <td>$10,000</td>
                  </tr>
                  <tr>
                    <td className="fw-bolder">Milestone 2</td>
                    <td>Alpha release for v1.0 modules</td>
                    <td>$10,000</td>
                  </tr>
                  <tr>
                    <td className="fw-bolder">Milestone 3</td>
                    <td>System test pass for v1.0</td>
                    <td>$10,000</td>
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
