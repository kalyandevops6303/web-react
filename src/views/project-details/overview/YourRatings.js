import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { Star } from 'react-feather';
import Rating from '../../../lib/rating';
import { RatingTag } from '../style';
import theme from '../../../configs/themeVariables';
import { getYourRating } from '../../../redux/actions/ratingActions';
import { yourRating, yourRatingLoading } from '../../../redux/selectors/ratingSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { userTypes } from '../../../utility/constants/Constant';
import NoDataFoundGif from '../../../assets/images/noDataFoundGif.gif';
import { selectUserData } from '../../../redux/selectors/authSelectors';
import capitalize from '../../../lib/capitalize';

const YourRatings = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const yourRatingIsLoading = useSelector(yourRatingLoading);
  const yourRatingData = useSelector(yourRating);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getYourRating(params.projectId));
  }, []);

  const getImage = () => {
    const image = yourRatingData?.rating_by?.image_uri;

    return image || defaultAvatar;
  };

  const getName = () => {
    const name = `${yourRatingData?.rating_by?.first_name} ${yourRatingData?.rating_by?.last_name}`;

    return name;
  };

  const getOtherInfo = () => {
    let info;

    // eslint-disable-next-line no-unsafe-optional-chaining
    if (yourRatingData && yourRatingData?.rating_by && 'company_name' in yourRatingData?.rating_by) {
      info = yourRatingData?.rating_by?.company_name;
    } else {
      info = yourRatingData?.rating_by?.role.name;
    }

    return info || '';
  };

  return (
    <div>
      {yourRatingIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <div>
          {yourRatingData && 'star' in yourRatingData ? (
            <Card>
              <CardHeader>
                <h4 className="m-0">
                  Feedback from{' '}
                  {userData?.user_type === userTypes.client
                    ? capitalize(userTypes.talent)
                    : capitalize(userTypes.client)}
                </h4>
              </CardHeader>
              <hr className="m-0 card-header-border" />
              <CardBody className="mt-1">
                <Row className="gap-2">
                  <Col sm="12" md="6" lg="2">
                    <div className="d-flex flex-column align-items-center">
                      <Avatar img={getImage()} imgHeight="98" imgWidth="98" />
                      <p className="fw-bolder mt-1 mb-0">{getName()}</p>
                      <p className="font-small-3">{getOtherInfo()}</p>
                    </div>
                  </Col>
                  <Col sm="12" md="6" lg="9">
                    <Rating
                      readonly
                      initialRating={yourRatingData?.star}
                      emptySymbol={<Star size={24} fill={theme.white} stroke={theme.orangeColor} className="me-50" />}
                      fullSymbol={
                        <Star size={24} fill={theme.orangeColor} stroke={theme.orangeColor} className="me-50" />
                      }
                    />
                    <div className="d-flex flex-wrap mt-1">
                      {yourRatingData?.tags?.map((tag) => (
                        <RatingTag key={tag._id} className="px-1 me-75 mb-75">
                          <p className="mb-0">{tag.name}</p>
                        </RatingTag>
                      ))}
                    </div>
                    <p className="font-medium-1 mt-1">{yourRatingData?.description || ''}</p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ) : (
            <div className="no-data-found-container d-flex flex-column align-items-center py-1">
              <img src={NoDataFoundGif} alt="no-data" width={200} height={200} className="no-data-found-gif" />
              <p className="m-0 fw-bold font-medium-3">No Data Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YourRatings;
