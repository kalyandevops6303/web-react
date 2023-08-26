import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import { DateTime } from 'luxon';
import { Modal, ModalHeader, ModalBody, CardTitle, CardText, Card, CardBody, Table } from 'reactstrap';
import PdfIcon from '@src/assets/images/pdfimg.png';
import { formatFileSize } from '../../utility/Utils';
import { BidDetailsWrap } from '../project-details/style';

const BidPreviewModal = ({ modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  const bidInfo = useSelector((state) => state.projectDetails.bidInfo);

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style-70" className="modal-dialog-centered">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <BidDetailsWrap>
          <Card>
            <CardTitle className="main-card-title">Project Bid Estimation</CardTitle>
            <CardBody className="main-card-body bid-eta">
              <div>
                <CardText className="value">${bidInfo?.total_estimated_cost}</CardText>
                <CardText className="key">Total Bid Amount</CardText>
              </div>
              <div>
                <CardText className="value">
                  {bidInfo?.total_estimated_duration?.duration}
                  {bidInfo?.total_estimated_duration?.duration_type &&
                    bidInfo?.total_estimated_duration?.duration_type.charAt(0).toLowerCase()}
                </CardText>
                <CardText className="key">Estimation Duration</CardText>
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
                  {bidInfo?.milestones?.map((item) => (
                    <tr key={item?._id}>
                      <td className="fw-bolder">{item?.name}</td>
                      <td>{item?.description}</td>
                      <td>${item?.estimated_cost}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Card>
            {bidInfo?.documents?.map((item) => (
              <a
                key={item?.created_at}
                className="text-decoration-none"
                href={item?.download_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardBody className="d-flex align-items-center">
                  <img src={PdfIcon} alt="pdficon" />
                  <div className="d-flex justify-content-between w-100 ms-1 font-weight-bold">
                    <CardText className="mb-0">{item?.file_name}</CardText>
                    <div className="d-flex gap-4">
                      <CardText className="mb-0">{formatFileSize(item?.size)}</CardText>
                      <CardText className="mb-0">
                        {item?.created_at ? DateTime.fromMillis(item?.created_at).toFormat('MMM dd, yy') : '-'}
                      </CardText>
                    </div>
                  </div>
                </CardBody>
              </a>
            ))}
          </Card>
        </BidDetailsWrap>
      </ModalBody>
    </Modal>
  );
};

export default BidPreviewModal;

BidPreviewModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

BidPreviewModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
