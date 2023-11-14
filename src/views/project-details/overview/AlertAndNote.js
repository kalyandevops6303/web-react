import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CardText } from 'reactstrap';
import { Info } from 'react-feather';
import DateTime from '../../../lib/date-time';
import Duration from '../../../lib/duration';
import theme from '../../../configs/themeVariables';
import { extendValidity } from '../../../redux/actions/projectDetailsAction';
import { userTypes } from '../../../utility/constants/Constant';
import { selectUserType } from '../../../redux/selectors/authSelectors';
import { selectDocument } from '../../../redux/selectors/projectDetailsSelectors';

const AlertAndNote = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const document = useSelector(selectDocument);
  const userType = useSelector(selectUserType);
  const [isDocumentExtended, setIsDocumentExtended] = useState(document?.documents_validity_extended_by > 0 || false);
  const [isPaymentExtended, setIsPaymentExtended] = useState(document?.payment_validity_extended_by > 0 || false);
  const [documentValidity, setDocumentValidity] = useState(document?.documents_validity || '');
  const [paymentValidity, setPaymentValidity] = useState(document?.payment_validity || '');

  const calculateTimeDifference = (timestamp) => {
    if (typeof timestamp !== 'number' && !Number.isNaN(timestamp)) {
      return '';
    }
    // Convert timestamp to Luxon DateTime
    const targetDateTime = DateTime.fromMillis(timestamp);

    // Get the current DateTime
    const currentDateTime = DateTime.now();

    // Calculate the duration between current and target DateTime
    const duration = Duration.fromObject({ milliseconds: targetDateTime.diff(currentDateTime).milliseconds });

    // Format the duration
    if (duration.as('days') >= 1) {
      return `${Math.floor(duration.as('days'))} days left`;
    }
    return `${duration.toFormat('hh:mm')} left`;
  };

  const add7Days = (timestamp) => {
    if (typeof timestamp !== 'number' && !Number.isNaN(timestamp)) {
      return '';
    }

    // Convert timestamp to Luxon DateTime
    const originalDateTime = DateTime.fromMillis(timestamp);

    // Add 7 days
    const updatedDateTime = originalDateTime.plus({ days: 7 });

    // Get the updated timestamp
    const updatedTimestamp = updatedDateTime.toMillis();

    return updatedTimestamp;
  };

  const extendDocValidity = () => {
    dispatch(
      extendValidity({
        project_id: param?.projectId,
        validity_type: 'DOCUMENT',
        onSuccess: () => {
          setIsDocumentExtended(true);
          setDocumentValidity(add7Days(documentValidity));
        },
        onError: () => setIsDocumentExtended(false),
      }),
    );
  };
  const extendPaymentValidity = () => {
    dispatch(
      extendValidity({
        project_id: param?.projectId,
        validity_type: 'PAYMENT',
        onSuccess: () => {
          setIsPaymentExtended(true);
          setPaymentValidity(add7Days(paymentValidity));
        },
        onError: () => setIsPaymentExtended(false),
      }),
    );
  };

  if (userType === userTypes.client) {
    if (!document?.is_documents_sent) {
      return (
        <div className="contract-info error-banner mb-2 d-flex px-1 py-2">
          <Info size={18} color={theme.red} className="me-50" />
          <p className="font-medium-1 m-0 error">
            <span className="fw-bolder font-medium-1">Alert :</span> Client have
            {calculateTimeDifference(document?.bid_validity)} to sign the document
          </p>
        </div>
      );
    }
    if (!document?.is_documents_signed) {
      return (
        <div className="contract-info error-banner mb-2 d-flex px-1 py-2">
          <Info size={18} color={theme.red} className="me-50" />
          <p className="font-medium-1 m-0 error">
            <span className="fw-bolder font-medium-1">Alert :</span>
            Talent have {calculateTimeDifference(documentValidity)} to sign the document
          </p>
          {userType === userTypes.client && !isDocumentExtended && (
            <CardText
              onClick={extendDocValidity}
              className="me-1 ms-2 my-auto cursor-pointer"
              style={{ width: '10rem', color: theme.activeColor }}
            >
              Extend validity
            </CardText>
          )}
        </div>
      );
    }
    if (!document?.is_payment_made) {
      return (
        <div className="contract-info error-banner mb-2 d-flex px-1 py-2">
          <Info size={18} color={theme.red} className="me-50" />
          <p className="font-medium-1 m-0 error">
            <span className="fw-bolder font-medium-1">Alert :</span>
            Note: Client has {calculateTimeDifference(paymentValidity)} to make payment for milestones or project will
            be terminated and back to marketplace
          </p>
          {userType === userTypes.client && !isPaymentExtended && (
            <CardText
              onClick={extendPaymentValidity}
              className="me-1 ms-2 my-auto cursor-pointer"
              style={{ width: '10rem', color: theme.activeColor }}
            >
              Extend validity
            </CardText>
          )}
        </div>
      );
    }
  } else {
    if (!document?.is_documents_signed) {
      return (
        <div className="contract-info info-banner mb-2 d-flex px-1 py-2">
          <Info size={18} color={theme.activeColor} className="me-50" />
          <p className="font-medium-1 m-0 info">
            <span className="fw-bolder font-medium-1">Note :</span>
            Talent have {calculateTimeDifference(documentValidity)} to sign the document
          </p>
        </div>
      );
    }
    if (!document?.is_payment_made) {
      return (
        <div className="contract-info info-banner mb-2 d-flex px-1 py-2">
          <Info size={18} color={theme.activeColor} className="me-50" />
          <p className="font-medium-1 m-0 info">
            <span className="fw-bolder font-medium-1">Note :</span>
            Client has {calculateTimeDifference(paymentValidity)} to make payment for milestones or project will be
            terminated and back to marketplace
          </p>
        </div>
      );
    }
  }

  return '';
};

export default AlertAndNote;
