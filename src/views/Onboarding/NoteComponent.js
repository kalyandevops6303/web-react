import { Info } from 'react-feather';
import PropTypes from 'prop-types';
import theme from '../../configs/themeVariables';
import { getSupportEmail } from '@/utility/Utils';

const NoteComponent = ({ type, requestCount }) => {
  const supportEmail = getSupportEmail();
  return (
    <div className={`${type}-banner mb-1 d-flex px-3 py-4 border rounded align-items-center`}>
      <Info size={18} color={type === 'success' ? theme.green : theme.activeNavPillText} className="me-50" />
      <p className="font-medium-1 m-0 d-flex fw-normal justify-content-between w-100">
        {' '}
        <span>
          <a className="fw-bold" href={`mailto: ${supportEmail}`}>
            Trumio Support &nbsp;
          </a>
          {type === 'success' && (
            <span>
              has resolved your {requestCount > 1 && <span className="fw-bold">({requestCount})</span>} query. Please
              check your email.
            </span>
          )}

          {type === 'info' && (
            <span>
              has received your {requestCount > 1 && <span className="fw-bold">({requestCount})</span>} query. Our team
              is looking into it. We will revert soon.
            </span>
          )}
        </span>
      </p>
    </div>
  );
};

NoteComponent.propTypes = {
  type: PropTypes.string,
  requestCount: PropTypes.number,
};

NoteComponent.defaultProps = {
  type: '',
  requestCount: 0,
};

export default NoteComponent;
