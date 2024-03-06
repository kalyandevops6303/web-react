import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../../configs/themeVariables';
import Nodata from '../../../assets/images/noDataFoundGif.gif';

const NodataMilestoneWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: ${theme.noDataFoundTextColor};
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.3125rem;
    margin-top: -0.8rem;
  }
`;
const Empty = ({ message }) => (
  <NodataMilestoneWrap className="d-flex flex-column align-items-center">
    <img height={200} width={200} src={Nodata} alt="nodata" />
    <p>{message}</p>
  </NodataMilestoneWrap>
);
Empty.propTypes = {
  message: PropTypes.string,
};
Empty.defaultProps = {
  message: 'No data found',
};
export default Empty;
