/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { PieChart } from 'react-minimal-pie-chart';
import { getDisputesCount } from '../../../redux/actions/disputeActions';
import { disputesCount } from '../../../redux/selectors/disputeSelectors';
import { DisputesChartContainer, DisputesLegend } from './style';
import theme from '../../../configs/themeVariables';

const Disputes = ({ handleRaiseDispute }) => {
  const dispatch = useDispatch();

  const disputesCountData = useSelector(disputesCount);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    dispatch(getDisputesCount());
  }, []);

  useEffect(() => {
    const data = [
      { title: 'Resolved', value: disputesCountData?.resolved_disputes || 0, color: theme.green },
      { title: 'Open', value: disputesCountData?.open_disputes || 0, color: theme.openDisputesChartColor },
    ];

    setChartData(data);
  }, [disputesCountData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Disputes</CardTitle>
        {disputesCountData?.resolved_disputes + disputesCountData?.open_disputes > 0 ? (
          <Link to="/disputes/open">
            <CardText className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary cursor-pointer">
              View All
            </CardText>
          </Link>
        ) : (
          <CardText
            className="text-decoration-underline card-text font-small-3 me-25 mb-0 text-primary cursor-pointer"
            onClick={handleRaiseDispute}
          >
            Raise Dispute
          </CardText>
        )}
      </CardHeader>
      <CardBody className="pt-0 pb-1">
        {(disputesCountData?.open_disputes || disputesCountData?.resolved_disputes) > 0 ? (
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div className="d-flex align-items-center mb-2">
                <DisputesLegend fillColor={theme.green} />
                <p className="mb-0 ms-1 fw-light">{disputesCountData?.resolved_disputes} Resolved</p>
              </div>
              <div className="d-flex align-items-center">
                <DisputesLegend fillColor={theme.openDisputesChartColor} />
                <p className="mb-0 ms-1 fw-light">{disputesCountData?.open_disputes} Open</p>
              </div>
            </div>
            <DisputesChartContainer>
              <div className="total-disputes">
                <p className="fw-bold font-medium-3 mb-0 text-center">
                  {disputesCountData?.resolved_disputes + disputesCountData?.open_disputes}
                </p>
                <p className="font-small-3 mb-0">Total</p>
              </div>
              <div className="chart">
                <PieChart lineWidth={26} data={chartData} />
              </div>
            </DisputesChartContainer>
          </div>
        ) : (
          <CardText className="text-center card-text font-small-5 mt-3 mb-4 fw-bold text-primary">
            No Dispute raised !
          </CardText>
        )}
      </CardBody>
    </Card>
  );
};

Disputes.propTypes = {
  handleRaiseDispute: propTypes.func.isRequired,
};

export default Disputes;
