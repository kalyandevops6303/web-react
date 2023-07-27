import Rating from 'react-rating';
import Proptypes from 'prop-types';
import lisa from '@src/assets/images/portrait/small/lisa.png';
import Avatar from '@components/avatar';
import FilledStar from '@src/assets/images/filler_star.png';
import EmptyStar from '@src/assets/images/empty_star.png';
import { Card, CardBody, CardText } from 'reactstrap';
import { Mail, Trash2 } from 'react-feather';
import { MemberRowWrapper } from '../style';
import theme from '../../../configs/themeVariables';

const MemberRow = ({ data, withReview }) => (
  <MemberRowWrapper withReview={withReview}>
    <Card>
      <CardBody>
        <section className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-1">
            <div className="name-info d-flex gap-50 align-items-center">
              <Avatar img={lisa} imgHeight="38" imgWidth="38" />
              <div className="ms-50">
                <h6 className="mb-0 fw-bolder">{data.name}</h6>
                {!withReview && <span className="mb-50 font-small-2 role">{data.role}</span>}
              </div>
            </div>
            <CardText className="fw-bold m-auto me-4">{withReview ? data.role : 'Team Member'}</CardText>
            {withReview && (
              <div className="me-4">
                <Rating
                  initialRating={3}
                  emptySymbol={<img height={20} src={EmptyStar} alt="Empty star" />}
                  fullSymbol={<img height={20} src={FilledStar} alt="Filled star" />}
                  readonly
                />
                <CardText className="mt-25 font-small-3 project-count">0 Projects</CardText>
              </div>
            )}
            <div className="me-2">
              <span className="key">Invited on</span>
              <CardText className="value">Mar 1, 23</CardText>
            </div>
            <div className="me-1">
              <span className="key">Status</span>
              <CardText className="value">Accepted</CardText>
            </div>
          </div>
          {withReview ? (
            <span className="mail-bg">
              <Mail size={20} className="mail-icon" color={theme.activeColor} />
            </span>
          ) : (
            <Trash2 className="delete-icon" color={theme.red} />
          )}
        </section>
      </CardBody>
    </Card>
  </MemberRowWrapper>
);
MemberRow.propTypes = {
  data: Proptypes.object,
  withReview: Proptypes.bool,
};
MemberRow.defaultProps = {
  data: {},
  withReview: false,
};
export default MemberRow;
