// ** Third Party Components
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { Info } from 'react-feather';

// ** Custom Components

import { useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, ButtonGroup, Button } from 'reactstrap';
import { EarningAmount, EarningCardWrapper } from './style';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../../utility/constants/Constant';

const EarningCard = () => {
  const userDetailsData = useSelector(userData);

  return (
    <EarningCardWrapper>
      <Card className="card-reward">
        <CardHeader className="earning-head">
          <CardTitle tag="h4">{userDetailsData?.user_type === userTypes.client ? 'Payments' : 'Earnings'}</CardTitle>
          <CardText className="d-none text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary">
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
              {DateTime.now().toFormat('MMM yy')}
            </Button>
            <Button
              tag="label"
              className={classNames('btn-icon', {
                active: false,
              })}
              color="primary"
              outline
            >
              YTD {DateTime.now().toFormat('yyyy')}
            </Button>
          </ButtonGroup>
          <div className="d-flex justify-content-around card-amount-details">
            <EarningAmount>
              <span className="title">
                Total <Info size={14} />
              </span>
              <span className="amount">$ 0</span>
              <span className="change">+0%</span>
            </EarningAmount>
            <EarningAmount>
              <span className="title">
                Completed <Info size={14} />
              </span>
              <span className="amount">$ 0</span>
              <span className="change">+0%</span>
            </EarningAmount>
          </div>
        </CardBody>
      </Card>
    </EarningCardWrapper>
  );
};

export default EarningCard;
