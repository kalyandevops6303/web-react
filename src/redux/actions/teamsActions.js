import { getTeamService } from '../../services/teamServices';
import errorHandler from '../../utility/errorHandler';
import { getTeamSuccess } from '../reducers/team';

const teamData = [
  {
    _id: '64c266af32aace074321434a',
    user_type: 'TEAM',
    created_at: 1690461871444,
    updated_at: 1690461871444,
    is_deleted: false,
    services: ['64831445a51384fb6948e67b'],
    availability: {
      timezone: 'IST',
      weekdays_avl: {
        start_time: 0,
        end_time: 12,
        days: ['MONDAY'],
      },
      weekends_avl: {
        start_time: 0,
        end_time: 12,
        days: ['SATURDAY'],
      },
    },
    timezone: 'IST',
    tools: ['6486a6c33cf46b7a02d8bde2', '6486a6c33cf46b7a02d8bde3'],
    name: 'team test',
    introduction: 'hey!',
    languages_supported: ['64831445a51384fb6948e67b', '64831445a51384fb6948e688'],
    skills: ['6486a65e34730cac6a48042a', '6486a65e34730cac6a48042b'],
    created_by: '64a3e46466d3b988e87000b1',
    team_logo: '',
    tagline: 'team tagline',
  },
  {
    _id: '64c339977732d26b7a25cb9d',
    user_type: 'TEAM',
    created_at: 1690515863322,
    updated_at: 1691484795909,
    is_deleted: false,
    tools: ['6486a6c33cf46b7a02d8bde2', '6486a6c33cf46b7a02d8bde3'],
    availability: {
      timezone: 'IST',
      weekdays_avl: {
        start_time: 0,
        end_time: 12,
        days: ['MONDAY'],
      },
      weekends_avl: {
        start_time: 0,
        end_time: 12,
        days: ['SATURDAY'],
      },
    },
    skills: ['6486a65e34730cac6a48042a', '6486a65e34730cac6a48042b'],
    languages_supported: ['64831445a51384fb6948e67b', '64831445a51384fb6948e688'],
    name: 'team test',
    team_logo: 'new!',
    tagline: 'team tagline',
    introduction: 'hey!',
    services: ['64831445a51384fb6948e67b'],
    timezone: 'IST',
    created_by: '6486b2b2b03b9ecd06909871',
  },
  {
    _id: '64c339c77732d26b7a25cba6',
    user_type: 'TEAM',
    created_at: 1690515911054,
    updated_at: 1690515911054,
    is_deleted: false,
    tools: ['6486a6c33cf46b7a02d8bde2', '6486a6c33cf46b7a02d8bde3'],
    availability: {
      timezone: 'IST',
      weekdays_avl: {
        start_time: 0,
        end_time: 12,
        days: ['MONDAY'],
      },
      weekends_avl: {
        start_time: 0,
        end_time: 12,
        days: ['SATURDAY'],
      },
    },
    skills: ['6486a65e34730cac6a48042a', '6486a65e34730cac6a48042b'],
    languages_supported: ['64831445a51384fb6948e67b', '64831445a51384fb6948e688'],
    name: 'team test',
    team_logo: '',
    tagline: 'team tagline',
    introduction: 'hey!',
    services: ['64831445a51384fb6948e67b'],
    timezone: 'IST',
    created_by: '6486b2b2b03b9ecd06909871',
  },
  {
    _id: '64c38050eab4f5c5c7860612',
    user_type: 'TEAM',
    created_at: 1690533968593,
    updated_at: 1690533968593,
    is_deleted: false,
    created_by: '6486b2b2b03b9ecd06909871',
    tools: ['6486a6c33cf46b7a02d8be1f', '6486a6c33cf46b7a02d8be78'],
    name: 'Rajat Team',
    timezone: 'IST',
    introduction: "Rajat's Team don't need no introduction",
    skills: [
      '6486a65e34730cac6a480442',
      '6486a65e34730cac6a480456',
      '6486a65e34730cac6a480470',
      '6486a65e34730cac6a480479',
    ],
    team_logo: '',
    languages_supported: ['64831445a51384fb6948e678'],
    tagline: "Rajat's Team don't need no tagline",
    services: ['stringstringstringstring'],
    availability: {
      timezone: '6479f0fafe992bcffe2ab719',
      weekdays_avl: {
        start_time: 10,
        end_time: 12,
        days: ['MONDAY'],
      },
      weekends_avl: {
        start_time: 10,
        end_time: 12,
        days: ['SATURDAY'],
      },
    },
  },
  {
    _id: '64d1ff164dc55f5a1018e2d0',
    user_type: 'TEAM',
    created_at: 1691483926518,
    updated_at: 1691483926518,
    is_deleted: false,
    availability: {
      timezone: 'IST',
      weekdays_avl: {
        start_time: 0,
        end_time: 12,
        days: ['MONDAY'],
      },
      weekends_avl: {
        start_time: 0,
        end_time: 12,
        days: ['SATURDAY'],
      },
    },
    name: 'team test',
    services: ['64831445a51384fb6948e67b'],
    introduction: 'hey!',
    languages_supported: ['64831445a51384fb6948e67b', '64831445a51384fb6948e688'],
    tools: ['6486a6c33cf46b7a02d8bde2', '6486a6c33cf46b7a02d8bde3'],
    timezone: 'IST',
    tagline: 'team tagline',
    created_by: '6486b2b2b03b9ecd06909871',
    skills: ['6486a65e34730cac6a48042a', '6486a65e34730cac6a48042b'],
    team_logo: '',
  },
  {
    _id: '64d1ff47568f31593a5feeeb',
    user_type: 'TEAM',
    created_at: 1691483975180,
    updated_at: 1691483975180,
    is_deleted: false,
    created_by: '6486b2b2b03b9ecd06909871',
    languages_supported: ['64831445a51384fb6948e67b', '64831445a51384fb6948e688'],
    tools: ['6486a6c33cf46b7a02d8bde2', '6486a6c33cf46b7a02d8bde3'],
    skills: ['6486a65e34730cac6a48042a', '6486a65e34730cac6a48042b'],
    tagline: 'team tagline',
    team_logo: '',
    availability: {
      timezone: 'IST',
      weekdays_avl: {
        start_time: 0,
        end_time: 12,
        days: ['MONDAY'],
      },
      weekends_avl: {
        start_time: 0,
        end_time: 12,
        days: ['SATURDAY'],
      },
    },
    name: 'team test',
    introduction: 'hey!',
    services: ['64831445a51384fb6948e67b'],
  },
  {
    _id: '64d4a9a33f21f7310bdd5ed7',
    user_type: 'TEAM',
    created_at: 1691658659471,
    updated_at: 1691658659471,
    is_deleted: false,
    team_logo: '',
    name: 'team test',
    created_by: '64d1e53596e942a0e5e98c55',
    tools: ['6486a6c33cf46b7a02d8bde2', '6486a6c33cf46b7a02d8bde3'],
    tagline: 'team tagline',
    skills: ['6486a65e34730cac6a48042a', '6486a65e34730cac6a48042b'],
    languages_supported: ['64831445a51384fb6948e67b', '64831445a51384fb6948e688'],
    introduction: 'hey!',
    services: ['64831445a51384fb6948e67b'],
    availability: {
      timezone: 'IST',
      weekdays_avl: {
        start_time: 0,
        end_time: 12,
        days: ['MONDAY'],
      },
      weekends_avl: {
        start_time: 0,
        end_time: 12,
        days: ['SATURDAY'],
      },
    },
  },
  {
    _id: '64d4ab8fce7845979b4781c3',
    user_type: 'TEAM',
    created_at: 1691659151053,
    updated_at: 1691659151053,
    is_deleted: false,
    introduction: 'hey!',
    tools: ['6486a6c33cf46b7a02d8bde2', '6486a6c33cf46b7a02d8bde3'],
    availability: {
      timezone: 'IST',
      weekdays_avl: {
        start_time: 0,
        end_time: 12,
        days: ['MONDAY'],
      },
      weekends_avl: {
        start_time: 0,
        end_time: 12,
        days: ['SATURDAY'],
      },
    },
    services: ['64831445a51384fb6948e67b'],
    languages_supported: ['64831445a51384fb6948e67b', '64831445a51384fb6948e688'],
    created_by: '6486b2b2b03b9ecd06909871',
    tagline: 'team tagline',
    team_logo: '',
    skills: ['6486a65e34730cac6a48042a', '6486a65e34730cac6a48042b'],
    name: 'team test',
  },
];
const getTeams =
  ({ id, onSuccess }) =>
  async (dispatch) => {
    try {
      await getTeamService({ talent_id: id });
      dispatch(getTeamSuccess(teamData));
      onSuccess();
    } catch (error) {
      errorHandler(error);
    }
  };

// eslint-disable-next-line import/prefer-default-export
export { getTeams };
