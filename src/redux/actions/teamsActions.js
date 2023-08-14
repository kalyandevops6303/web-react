import { createTeamService } from '../../services/teamServices';
import errorHandler from '../../utility/errorHandler';

const createTeam = (data, onSuccess, onError) => async () => {
  try {
    await createTeamService(data);
    onSuccess();
  } catch (error) {
    onError();
    errorHandler(error);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createTeam };
