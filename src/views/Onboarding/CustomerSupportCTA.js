import { Info } from 'react-feather';
import { CardText } from 'reactstrap';
import PropTypes from 'prop-types';
import theme from '../../configs/themeVariables';
import { CUSTOMER_SUPPORT_TYPES } from '../../utility/constants/Constant';

const CustomerSupportCTA = ({ type, handleCustomerSupport }) => (
  <div className="d-flex align-items-center">
    <Info size="16" className="me-50 info" color={theme.primary} />
    <CardText
      onClick={() =>
        handleCustomerSupport(
          type === CUSTOMER_SUPPORT_TYPES.education
            ? [CUSTOMER_SUPPORT_TYPES.missing_institute]
            : [CUSTOMER_SUPPORT_TYPES.missing_skill, CUSTOMER_SUPPORT_TYPES.missing_tool],
        )
      }
      className="primary cursor-pointer"
    >
      {type === CUSTOMER_SUPPORT_TYPES.education && 'Couldn’t find your institution?'}
      {type === CUSTOMER_SUPPORT_TYPES.tools_and_skills && 'Couldn’t find your skills or tools?'}
    </CardText>
  </div>
);

CustomerSupportCTA.defaultProps = {
  handleCustomerSupport: () => {},
  type: '',
};

CustomerSupportCTA.propTypes = {
  type: PropTypes.string,
  handleCustomerSupport: PropTypes.func,
};

export default CustomerSupportCTA;
