// ** Third Party Components
// import classnames from 'classnames';
import classNames from 'classnames';
import { Info } from 'react-feather';

// ** Custom Components

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, ButtonGroup, Button } from 'reactstrap';
import { EarningAmount, EarningCardWrapper } from './style';

const EarningCard = () => (
  <EarningCardWrapper>
    <Card className="card-reward">
      <CardHeader className="earning-head">
        <CardTitle tag="h4">Earnings</CardTitle>
        <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">
          View All
        </CardText>
      </CardHeader>
      <CardBody className="earning-body">
        <ButtonGroup className="button-grp">
          <Button
            tag="label"
            className={classNames('btn-icon ', {
              active: true,
            })}
            color="primary"
            outline
          >
            Dec 2022
          </Button>
          <Button
            tag="label"
            className={classNames('btn-icon', {
              active: false,
            })}
            color="primary"
            outline
          >
            YTD 2023
          </Button>
        </ButtonGroup>
        <div className="d-flex justify-content-around card-amount-details">
          <EarningAmount>
            <span className="title">
              Total <Info size={14} />
            </span>
            <span className="amount">$ 56,000</span>
            <span className="change">+5.2%</span>
          </EarningAmount>
          <EarningAmount>
            <span className="title">
              Completed <Info size={14} />
            </span>
            <span className="amount">$ 89,000</span>
            <span className="change">+5.2%</span>
          </EarningAmount>
        </div>
      </CardBody>
    </Card>
  </EarningCardWrapper>
);

export default EarningCard;
