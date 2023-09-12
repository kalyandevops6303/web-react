/* eslint-disable no-unsafe-optional-chaining */
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
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';

const YourRatings = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const yourRatingIsLoading = useSelector(yourRatingLoading);
  const yourRatingData = useSelector(yourRating);
  const userData = useSelector(selectUserData);
  const projectDetailsData = useSelector(projectDetails);

  useEffect(() => {
    dispatch(getYourRating(params.projectId));
  }, []);

  const getImage = (data) => {
    const image = data?.rating_by?.image_uri;

    return image || defaultAvatar;
  };

  const getName = (data) => {
    const name = `${data?.rating_by?.first_name} ${data?.rating_by?.last_name}`;

    return name;
  };

  const getOtherInfo = (data) => {
    let info;

    // eslint-disable-next-line no-unsafe-optional-chaining
    if (data && data?.rating_by && 'company_name' in data?.rating_by) {
      info = data?.rating_by?.company_name;
    } else {
      info = data?.rating_by?.role.name;
    }

    return info || '';
  };

  const getCardHeaderText = () => {
    let text;

    if (userData?.user_type === userTypes.client) {
      if (projectDetailsData?.worker_details?.entity_type === userTypes.team) {
        text = `Feedback from Team members`;
      } else if (projectDetailsData?.worker_details?.entity_type === userTypes.talent) {
        text = `Feedback from Talent`;
      }
    } else {
      text = `Feedback from Client`;
    }

    return text;
  };

  return (
    <div>
      {yourRatingIsLoading ? (
        <ComponentSpinner className="mt-5" />
      ) : (
        <div>
          {yourRatingData?.length > 0 ? (
            <Card>
              <CardHeader>
                <h4 className="m-0">{getCardHeaderText()}</h4>
              </CardHeader>
              <hr className="m-0 card-header-border" />
              <CardBody className="mt-1">
                {yourRatingData?.map((ratingData, index) => (
                  <Row key={ratingData._id} className={`gap-2 ${index !== yourRatingData?.length - 1 ? 'mb-3' : ''}`}>
                    <Col sm="12" md="6" lg="2">
                      <div className="d-flex flex-column align-items-center">
                        <Avatar img={getImage(ratingData)} imgHeight="98" imgWidth="98" />
                        <p className="fw-bolder mt-1 mb-0 text-center">{getName(ratingData)}</p>
                        <p className="font-small-3 text-center">{getOtherInfo(ratingData)}</p>
                      </div>
                    </Col>
                    <Col sm="12" md="6" lg="9">
                      <Rating
                        readonly
                        initialRating={ratingData?.star}
                        emptySymbol={<Star size={24} fill={theme.white} stroke={theme.orangeColor} className="me-50" />}
                        fullSymbol={
                          <Star size={24} fill={theme.orangeColor} stroke={theme.orangeColor} className="me-50" />
                        }
                      />
                      <div className="d-flex flex-wrap mt-1">
                        {ratingData?.tags?.map((tag) => (
                          <RatingTag key={tag._id} className="px-1 me-75 mb-75">
                            <p className="mb-0">{tag.name}</p>
                          </RatingTag>
                        ))}
                      </div>
                      <p className="font-medium-1 mt-1">{ratingData?.description || ''}</p>
                    </Col>
                    {index !== yourRatingData?.length - 1 && (
                      <Col sm="12" md="12" lg="12">
                        <hr className="m-0" />
                      </Col>
                    )}
                  </Row>
                ))}
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
