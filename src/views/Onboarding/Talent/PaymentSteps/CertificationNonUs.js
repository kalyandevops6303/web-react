import React from 'react';
import { Card, CardHeader, CardBody, Row, Label, Button, Input } from 'reactstrap';

const CertificationNonUs = ({ isAgreed = false, onChange }) => (
  <Card>
    <CardHeader>
      <h4 className="m-0 mt-1">Certification</h4>
    </CardHeader>
    <hr className="m-0 card-header-border" />
    <CardBody>
      <h5>
        Under penalties of perjury, i declare that i have examined the information on this form and to the best of my
        knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that
      </h5>
      <p className="mt-3">
        <ul>
          <li>The person name on line 1 of this form is not a U.S person;</li>
          <li>
            This form relates to:
            <br /> (a) income not effectively connected with the conduct of trade or business in the United States;{' '}
            <br />
            (b) income effectively connected with the conduct of trade or business in the United States but not subject
            to tax under applicable income tax treaty; <br />
            (c) the partner’s share of partnership’s effectively connected taxable income or; <br />
            (d) the partner’s amount realized from the transfer of partnership interest subject to withholding under
            section 1446(f);
          </li>
          <li>
            the person named on line 1 of this form is a resident of the treaty country listed on line 9 of the form (if
            any) within the meaning of income tax treaty between the United States and that country; and
          </li>
          <li>
            For broker transactions or barter exchanges, the beneficial owner is an exempt foreign person as defined in
            the instruction.
          </li>
        </ul>
      </p>
      <p>
        Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody
        of any income of which I am the beneficial owner or any withholding agent that can disburse or make any payments
        of income of which I am the beneficiary owner.{' '}
        <b>
          I agree that i will submit the a new form within 30 days if any certification made on this becomes incorrect
        </b>
      </p>

      <div className="d-flex gap-50">
        <Input type="checkbox" checked={isAgreed} onChange={onChange} />
        <Label className="fs-6">
          I certify that i have the capacity to sign the person identified on line 1 of this form
        </Label>
      </div>
    </CardBody>
  </Card>
);

export default CertificationNonUs;
