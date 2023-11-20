import { useEffect, useState } from 'react';
// ** Third Party Components
import classNames from 'classnames';
import { Info } from 'react-feather';

// ** Custom Components

import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, ButtonGroup, Button, UncontrolledTooltip } from 'reactstrap';
import DateTime from '../../../lib/date-time';
import { EarningAmount, EarningCardWrapper } from './style';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import { getDashboardPaymentSpending } from '../../../redux/actions/milestonePaymentActions';

const EarningCard = () => {
  const FILTER_TYPE = {
    MONTH: 'MONTH',
    YEAR: 'YEAR',
  };

  const [spendingsData, setSpendingsData] = useState({});
  const [spendingsPer, setSpendingsPer] = useState({});
  const [activeFilter, setActiveFilter] = useState(FILTER_TYPE.MONTH);

  const userDetailsData = useSelector(userData);
  const dispatch = useDispatch();

  const onSuccess = (data) => {
    const currentMonth = {
      total: data?.total_amount?.current_month ?? 0,
      completed: data?.completed_amount?.current_month ?? 0,
    };
    const currentYear = {
      total: data?.total_amount?.current_year ?? 0,
      completed: data?.completed_amount?.current_year ?? 0,
    };
    const spendingsPerDate = {
      currentMonth,
      currentYear,
    };
    setSpendingsData({ ...spendingsPerDate });
    setSpendingsPer(currentMonth);
  };

  useEffect(() => {
    dispatch(getDashboardPaymentSpending(onSuccess));
  }, []);

  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === FILTER_TYPE.MONTH) {
      setSpendingsPer(spendingsData?.currentMonth);
    }
    if (type === FILTER_TYPE.YEAR) {
      setSpendingsPer(spendingsData?.currentYear);
    }
  };

  return (
    <EarningCardWrapper>
      <Card className="card-payment">
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
                active: activeFilter === FILTER_TYPE.MONTH,
              })}
              color="primary"
              outline
              onClick={() => handleFilter('MONTH')}
            >
              {DateTime.now().toFormat('MMM yyyy')}
            </Button>
            <Button
              tag="label"
              className={classNames('btn-icon', {
                active: activeFilter === FILTER_TYPE.YEAR,
              })}
              color="primary"
              outline
              onClick={() => handleFilter('YEAR')}
            >
              YTD {DateTime.now().toFormat('yyyy')}
            </Button>
          </ButtonGroup>
          <div className="d-flex justify-content-around card-amount-details pt-1">
            <EarningAmount>
              <UncontrolledTooltip target="total_spendings" placement="top">
                Total money {userDetailsData?.user_type === userTypes.client ? 'spend on' : 'earned by'} all projects
              </UncontrolledTooltip>
              <span className="title">
                Total <Info size={14} id="total_spendings" />
              </span>
              <span className="amount">$ {spendingsPer?.total ?? 0}</span>
              {/* <span className="change">+0%</span> */}
            </EarningAmount>
            <EarningAmount>
              <UncontrolledTooltip target="completed_spendings" placement="top">
                Total money {userDetailsData?.user_type === userTypes.client ? 'spend on' : 'earned by'} completed
                projects
              </UncontrolledTooltip>
              <span className="title">
                Completed <Info size={14} id="completed_spendings" />
              </span>
              <span className="amount">$ {spendingsPer?.completed ?? 0}</span>
              {/* <span className="change">+0%</span> */}
            </EarningAmount>
          </div>
        </CardBody>
      </Card>
    </EarningCardWrapper>
  );
};

export default EarningCard;
