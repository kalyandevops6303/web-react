import React, { useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { BookOpen, CheckCircle } from 'react-feather';
import RaiseDisputeModal from './overview/RaiseDisputeModal';
import Statbox from '../user-details/overview/Statbox';

const index = () => {
  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);

  const toggleRaiseDisputeModal = () => {
    setRaiseDisputeModal(!raiseDisputeModal);
  };

  return (
    <>
      {raiseDisputeModal && <RaiseDisputeModal modal={raiseDisputeModal} toggleModal={toggleRaiseDisputeModal} />}
      <div className="d-flex justify-content-between align-items-center">
        <BreadCrumbs data={[{ title: 'Dashboard', link: '/dashboard' }, { title: 'Disputes' }]} />
        <Button color="primary" className="mb-2" onClick={() => setRaiseDisputeModal(true)}>
          Raise Dispute
        </Button>
      </div>
      <Row className="primary-row">
        <Col sm="12" md="6" lg="3">
          <Statbox
            isMarketPlaceTab
            title={5}
            desc="Open"
            icon={<BookOpen height={20} />}
            color="light-purple"
            className="stat-box cursor-pointer"
          />
        </Col>

        <Col sm="12" md="6" lg="3">
          <Statbox
            isMarketPlaceTab
            title={10}
            desc="Resolved"
            icon={<CheckCircle height={20} />}
            color="light-success"
            className="stat-box cursor-pointer"
          />
        </Col>
      </Row>

      <Row className="d-flex align-items-center px-2 mb-2">
        <Col sm="12" md="6" lg="1">
          <p className="mb-0 fw-bolder font-small-3">Dispute #</p>
        </Col>
        <Col sm="12" md="6" lg="9">
          <p className="mb-0 fw-bolder font-small-3">Project Name</p>
        </Col>
        <Col sm="12" md="6" lg="2">
          <p className="mb-0 fw-bolder font-small-3">Status</p>
        </Col>
      </Row>

      <Card className="cursor-pointer mb-1">
        <CardBody className="py-1">
          <Row className="d-flex align-items-center">
            <Col sm="12" md="6" lg="1">
              <p className="mb-0 fw-bold font-medium-1">#00937</p>
            </Col>
            <Col sm="12" md="6" lg="8">
              <p className="mb-0 fw-bold font-medium-1">Project name - Elementum pulvinar etiam non</p>
            </Col>
            <Col sm="12" md="6" lg="3" className="d-flex justify-content-end align-items-end">
              <p className="mb-0 fw-bold font-medium-1 me-3">Resolved</p>
              <div>
                <p className="mb-0">Resolved On</p>
                <p className="mb-0 fw-bold font-medium-1 text-end">Apr 28, 23</p>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="cursor-pointer mb-1">
        <CardBody className="py-1">
          <Row className="d-flex align-items-center">
            <Col sm="12" md="6" lg="1">
              <p className="mb-0 fw-bold font-medium-1">#00937</p>
            </Col>
            <Col sm="12" md="6" lg="8">
              <p className="mb-0 fw-bold font-medium-1">Project name - Elementum pulvinar etiam non</p>
            </Col>
            <Col sm="12" md="6" lg="3" className="d-flex justify-content-end align-items-end">
              <p className="mb-0 fw-bold font-medium-1 me-3">Resolved</p>
              <div>
                <p className="mb-0">Resolved On</p>
                <p className="mb-0 fw-bold font-medium-1 text-end">Apr 28, 23</p>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default index;
