import errorHandler from '../../utility/errorHandler';
import {
  giveRatingFailure,
  giveRatingRequest,
  giveRatingSuccess,
  yourRatingFailure,
  yourRatingRequest,
  yourRatingSuccess,
  yourSubmittedRatingFailure,
  yourSubmittedRatingRequest,
  yourSubmittedRatingSuccess,
} from '../reducers/rating';
import { giveRatingService, yourRatingService, yourSubmittedRatingService } from '../../services/ratingServices';

const giveNewRating = (data, onSuccess) => async (dispatch) => {
  dispatch(giveRatingRequest());
  try {
    const res = await giveRatingService(data);
    dispatch(giveRatingSuccess(res.data.data));
    onSuccess();
  } catch (error) {
    errorHandler(error, giveRatingFailure);
  }
};

const getYourSubmittedRating = (projectId) => async (dispatch) => {
  dispatch(yourSubmittedRatingRequest());
  try {
    const res = await yourSubmittedRatingService(projectId);
    dispatch(yourSubmittedRatingSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, yourSubmittedRatingFailure);
  }
};

const getYourRating = (projectId) => async (dispatch) => {
  dispatch(yourRatingRequest());
  try {
    const res = await yourRatingService(projectId);
    dispatch(yourRatingSuccess(res.data.data));
  } catch (error) {
    errorHandler(error, yourRatingFailure);
  }
};

export { giveNewRating, getYourSubmittedRating, getYourRating };
