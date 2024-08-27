import errorHandler from '../../utility/errorHandler';
import { questionsLinkService, showHiringTabService } from '../../services/hiringServices';
import {
    showHiringTabRequest, 
    showHiringTabSuccess, 
    showHiringTabFailure,
    questionsLinkRequest,
    questionsLinkSuccess,
    questionsLinkFailure
} from '../reducers/hiring';

const getShowHiringTab = () => async (dispatch) => {
    dispatch(showHiringTabRequest());
    try {
        const res = await showHiringTabService();
        dispatch(showHiringTabSuccess(res.data.data?.profile_details_present));
    } catch (error) {
        // errorHandler(error, showHiringTabFailure);
    }
}

const getQuestionsLink = (onFailure) => async (dispatch) => {
    dispatch(questionsLinkRequest());
    try {
        const res = await questionsLinkService();
        dispatch(questionsLinkSuccess(res.data.data));
    } catch (error) {
        onFailure();
    }
}


export {
    getShowHiringTab,
    getQuestionsLink
}