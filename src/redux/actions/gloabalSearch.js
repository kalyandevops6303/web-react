import { searchService } from '../../services/searchService';
import errorHandler from '../../utility/errorHandler';
import { currentSearchSuccess, getSearchSuccess } from '../reducers/gloabalSearch';

const searchAction =
  ({ query, onSuccess, onError, metaData, scope, isFetchMore }) =>
  async (dispatch) => {
    try {
      let res;
      onSuccess();
      if (isFetchMore) {
        res = await searchService({ query, metaData, scope });
        dispatch(currentSearchSuccess({ ...res.data.data, scope }));
      } else {
        res = await searchService({ query, metaData });
        dispatch(getSearchSuccess({ ...res.data.data, scope }));
      }
    } catch (error) {
      onError();
      errorHandler(error);
    }
  };

export default searchAction;
