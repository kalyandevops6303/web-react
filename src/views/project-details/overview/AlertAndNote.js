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
import { projectDetails, selectDocument } from '../../../redux/selectors/projectDetailsSelectors';
import ExtendModal from '../../modals/ExtendModal';

const AlertAndNote = ({ documentExtention, paymentExtention }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const document = useSelector(selectDocument);
  const userType = useSelector(selectUserType);
  const projectInfo = useSelector(projectDetails);

  const [isDocumentExtended, setIsDocumentExtended] = useState(document?.documents_validity_extended_by > 0 || false);
  const [isPaymentExtended, setIsPaymentExtended] = useState(document?.payment_validity_extended_by > 0 || false);
  const [documentValidity, setDocumentValidity] = useState(document?.documents_validity || '');
  const [paymentValidity, setPaymentValidity] = useState(document?.payment_validity || '');
  const [extendModal, setExtendModal] = useState(false);

  const calculateTimeDifference = (timestamp) => {
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return '';
    }

    const targetDateTime = DateTime.fromMillis(timestamp);
    const currentDateTime = DateTime.now();
    const duration = Duration.fromObject({
      milliseconds: targetDateTime.diff(currentDateTime).milliseconds,
    });

    // Check if the duration is negative
    if (duration.as('milliseconds') <= 0) {
      return '0 day(s)';
    }

    if (duration.as('days') >= 1) {
      return `${Math.floor(duration.as('days'))} day(s)`;
    }
    return duration.toFormat("hh'h' mm'm'");
  };

  const addDays = ({ timestamp, days }) => {
    if (typeof timestamp !== 'number' && !Number.isNaN(timestamp)) {
      return '';
    }

    const originalDateTime = DateTime.fromMillis(timestamp);
    const updatedDateTime = originalDateTime.plus({ days });
    const updatedTimestamp = updatedDateTime.toMillis();

    return updatedTimestamp;
  };

  const extendValidityAndSetState = (validityType, stateSetter, stateUpdater) => {
    dispatch(
      extendValidity({
        project_id: param?.projectId,
        validity_type: validityType,
        onSuccess: () => {
          stateSetter(true);
          stateUpdater(
            addDays({
              timestamp: validityType === 'DOCUMENT' ? documentValidity : paymentValidity,
              days: validityType === 'DOCUMENT' ? documentExtention : paymentExtention,
            }),
          );
          setExtendModal(false);
        },
        onError: () => stateSetter(false),
      }),
    );
  };

  const extendDocValidity = () => {
    extendValidityAndSetState('DOCUMENT', setIsDocumentExtended, setDocumentValidity);
  };

  const extendPaymentValidity = () => {
    extendValidityAndSetState('PAYMENT', setIsPaymentExtended, setPaymentValidity);
  };

  const renderExtendValidityButton = (onClickHandler, buttonText, validityType) => (
    <span className="m-auto">
      <CardText
        onClick={() => {
          setExtendModal(!extendModal);
        }}
        className="me-1 ms-2 my-auto cursor-pointer"
        style={{ width: '10rem', color: theme.activeColor }}
      >
        {buttonText}
      </CardText>
      {extendModal && (
        <ExtendModal
          documentExtention={documentExtention}
          paymentExtention={paymentExtention}
          modal={extendModal}
          toggleModal={() => setExtendModal(!extendModal)}
          validityType={validityType}
          onExtend={onClickHandler}
          projectDetails={projectInfo}
        />
      )}
    </span>
  );

  const renderAlertBanner = ({ alertText, isExtendable, extendHandler, buttonText, validityType }) => (
    <div className="contract-info error-banner mb-2 d-flex px-1 py-2">
      <Info size={18} color={theme.red} className="me-50" />
      <p className="font-medium-1 m-0 error d-flex justify-content-between w-100">
        <span>
          <span className="fw-bolder font-medium-1">Alert:&nbsp; </span>
          {alertText}
        </span>
        {isExtendable
          ? userType === userTypes.client && renderExtendValidityButton(extendHandler, buttonText, validityType)
          : ''}
      </p>
    </div>
  );
  const currentDateTime = DateTime.now().toMillis();
  if (document?.bid_validity === null || (paymentValidity > 0 && currentDateTime > paymentValidity)) {
    return '';
  }

  if (userType === userTypes.client) {
    if (!document?.is_documents_sent) {
      const alertText = `A max of ${calculateTimeDifference(
        document?.bid_validity,
      )} are allowed to review, update, and send the ${
        projectInfo?.nda?.is_nda ? 'NDA and' : ''
      } contract to team / talent`;
      return renderAlertBanner({ alertText, isExtendable: false });
    }

    if (!document?.is_documents_signed) {
      const alertText = `Your selected team / talent has ${calculateTimeDifference(documentValidity)} to sign the ${
        projectInfo?.nda?.is_nda ? 'NDA and ' : ''
      } contract.
      ${
        userType === userTypes.client && !isDocumentExtended
          ? `You can choose to extend by an additional ${documentExtention} days.`
          : ''
      }`;

      return renderAlertBanner({
        alertText,
        isExtendable: !isDocumentExtended,
        extendHandler: extendDocValidity,
        buttonText: 'Extend validity',
        validityType: 'DOCUMENT',
      });
    }

    if (!document?.is_payment_made) {
      const alertText = `The first payment must be made within ${calculateTimeDifference(
        paymentValidity,
      )} after signing the ${projectInfo?.nda?.is_nda ? 'NDA and' : ''} contract. ${
        userType === userTypes.client && !isPaymentExtended
          ? `You can choose to extend by an additional ${paymentExtention} days.`
          : ''
      }`;
      return renderAlertBanner({
        alertText,
        isExtendable: !isPaymentExtended,
        extendHandler: extendPaymentValidity,
        buttonText: 'Extend validity',
        validityType: 'PAYMENT',
      });
    }
  } else {
    if (!document?.is_documents_signed) {
      const alertText = `Team / Talent has ${calculateTimeDifference(documentValidity)} left to sign the ${
        projectInfo?.nda?.is_nda ? 'NDA and ' : ''
      } contract.`;
      return renderAlertBanner({ alertText, isExtendable: false });
    }

    if (!document?.is_payment_made) {
      const alertText = `${calculateTimeDifference(
        paymentValidity,
      )} left for the project to be funded. If funds are not received, the project will be re-listed.`;
      return renderAlertBanner({ alertText, isExtendable: false });
    }
  }

  return '';
};

export default AlertAndNote;
