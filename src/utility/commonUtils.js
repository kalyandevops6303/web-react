import { getItemFromSession } from './sessesionStorageControl';

const getTeamId = () => getItemFromSession('team_id');

export default getTeamId;
