import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { Badge, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import TeamNoDataGif from '@src/assets/images/gifs/team_no_data.gif';
import avatar7 from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { ReviewWrap, ReviewsContainer } from './style';
import RatingGroup from '../../../@core/components/rating-group/Index';
import { getReview } from '../../../redux/actions/profileActions';
import { userTypes } from '../../../utility/constants/Constant';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const Review = ({ data }) => (
  <ReviewWrap>
    <img
      src={data?.rating_by?.image_uri || avatar7}
      alt="user"
      style={{ borderRadius: '50%', objectFit: 'cover' }}
      width={64}
      height={64}
    />
    <div>
      <CardTitle className="mb-25">{`${data?.rating_by?.first_name} ${data?.rating_by?.last_name}`}</CardTitle>
      <div className="d-flex">
        <CardText className="mr-1">
          {data?.rating_by?.user_type === userTypes.client ? 'Industry Type: ' : 'Designation: '}
        </CardText>
        &nbsp;
        <CardText className="fw-300">
          {data?.rating_by?.user_type === userTypes.client
            ? data?.rating_by?.company_industry?.name
            : data?.rating_by?.role?.name}
        </CardText>
      </div>
      <RatingGroup rating={data?.rating} />
      <div className="mt-1">
        {data?.tags?.map((item) => (
          <Badge key={item?._id} pill color="light-info">
            {item?.name}
          </Badge>
        ))}
      </div>

      <CardText className="mt-1">{data?.description}</CardText>
    </div>
  </ReviewWrap>
);
Review.propTypes = {
  data: PropTypes.object,
};
Review.defaultProps = {
  data: {},
};

const Reviews = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const metadata = { page: 1, page_size: 4 };
  const reviewsData = useSelector((state) => state.currentProfile.userReview);

  const [hasMore, setHasMore] = useState(true);
  const reviewMetadata = useSelector((state) => state.currentProfile.userReviewMetaData);
  const reviewCurrentPreview = useSelector((state) => state.currentProfile.userReviewCurrentPreview);
  const isLoading = useSelector((state) => state.currentProfile.isRecentProjectLoading);

  useEffect(() => {
    setHasMore(true);
    if (reviewCurrentPreview?.length === 0 || reviewsData?.length === reviewMetadata?.total_records) {
      setHasMore(false);
    }
  }, [reviewCurrentPreview]);

  const fetchMore = () => {
    const newMeteData = {
      ...metadata,
      // eslint-disable-next-line no-unsafe-optional-chaining
      page: reviewMetadata?.current_page + 1 || 1,
    };
    dispatch(
      getReview({
        user_id: param?.userId,
        entity: param?.userType === 'CLUB' ? 'TEAM' : param?.userType.toUpperCase(),
        metadata: newMeteData,
      }),
    );
  };
  if (isLoading) {
    return (
      <ReviewsContainer>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between">
              <CardTitle className="fw-bolder">Reviews</CardTitle>
            </div>
            <ComponentSpinner />
          </CardBody>
        </Card>
      </ReviewsContainer>
    );
  }

  return (
    <ReviewsContainer>
      <Card>
        <CardBody>
          <CardTitle className="fw-bolder mb-3">Reviews ({reviewMetadata?.total_records})</CardTitle>
          <div>
            {reviewsData?.length > 0 ? (
              <div id="scrollableReviews" style={{ height: '40rem', overflowY: 'auto' }}>
                <InfiniteScroll
                  dataLength={reviewsData?.length}
                  next={fetchMore}
                  hasMore={hasMore}
                  scrollableTarget="scrollableReviews"
                  loader={<div className="d-flex justify-content-center">Loading...</div>}
                >
                  {reviewsData?.map((item) => (
                    <Review data={item} key={item?._id} />
                  ))}
                </InfiniteScroll>
              </div>
            ) : (
              <>
                <img src={TeamNoDataGif} width={230} height={170} className="d-flex empty-gif m-auto" alt="empty-gif" />
                <div className="mb-3 font-weig ht-normal text-center text-primary project-cta mt-25 cursor-pointer">
                  No reviews found
                </div>
              </>
            )}
          </div>

          <CardText className="d-none text-center text-decoration-underline card-text me-25 mb-0 text-primary">
            View More
          </CardText>
        </CardBody>
      </Card>
    </ReviewsContainer>
  );
};

export default Reviews;
