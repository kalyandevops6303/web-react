import React from 'react';
import { Card, CardHeader, CardBody, Row, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../utility/Utils';

const CertificationUS = ({ onConfirm, isConfirmed }) => {
  const today = new Date();
  const currentDate = formatDate(today);

  return (
    <Card className="w-75">
      <CardHeader>
        <h4 className="m-0 mt-1">Certification</h4>
      </CardHeader>
      <hr className="m-0 card-header-border" />
      <CardBody>
        <h5>Under penalties of perjury, I certify that:</h5>
        <p className="mt-2">
          <ul>
            <li>
              The number shown on this form is my correct taxpayer identification number (or I am waiting for a number
              to be issued to me); and
            </li>
            <li>
              I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) i have not
              been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of
              a failure to report all intrest or dividends, or (c) the IRS has notified me that I am no longer to backup
              withholding; and{' '}
            </li>
            <li>I am a U.S. citizen or other U.S. person (defined below); and</li>
            <li>
              The FATCA code(s) entered on this form (if any) indicating that i am exempt from FATCA reporting is
              correct.{' '}
            </li>
          </ul>
        </p>
        <p>
          <b>Certification instruction: </b>
          You must deselect item 2 above if you have been notified by IRS that you are currently subject to backup
          withholding because you have failed to report all interest and dividends on your tax return. For real estate
          transactions, item 2 does not apply. For mortgage interest paid, acquisition or abandonment of secured
          property, cancellation of debt, contributions to an individual retirement arrangement (IRA), and generally,
          payments other than intrest and dividends you are not required to sign the certification, but you must provide
          the correct TIN. See part II, Later
        </p>

        <Row className="mt-3">
          <Label>Confirmation of U.S person</Label>
          <Button
            color="primary ms-50"
            disabled={isConfirmed}
            onClick={onConfirm}
            className="mb-1"
            style={{ width: '120px' }}
          >
            I Confirm
          </Button>
          <Label className="fs-6">Signed on: {isConfirmed ? currentDate : null} </Label>
        </Row>
      </CardBody>
    </Card>
  );
};

CertificationUS.propTypes = {
  onConfirm: PropTypes.func,
  isConfirmed: PropTypes.bool,
};

CertificationUS.defaultProps = {
  onConfirm: () => {},
  isConfirmed: false,
};

export default CertificationUS;
