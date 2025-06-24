import { MilestoneFeedbackInputCellType } from '@/flexternships/constraints/enums/feedback-enums';

export const headers = [
  {
    value: 'Communication',
    identifier: 'h1',
    backgroundColor: '#28C76F1F',
    color: '#28C76F',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Collaboration',
    identifier: 'h2',
    backgroundColor: '#23DFEB1F',
    color: '#23DFEB',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Leadership',
    identifier: 'h3',
    backgroundColor: '#0185E41F',
    color: '#0185E4',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Effectiveness',
    identifier: 'h4',
    backgroundColor: '#FFD9661F',
    color: '#FFD966',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Problem Solving',
    identifier: 'h5',
    backgroundColor: '#7367F01F',
    color: '#7367F0',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Innovation',
    identifier: 'h6',
    backgroundColor: '#28C76F1F',
    color: '#28C76F',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Improvement',
    identifier: 'h7',
    backgroundColor: '#0DA8B21F',
    color: '#0DA8B2',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.DROPDOWN,
      options: [
        { label: 'Excellent', value: 'excellent' },
        { label: 'Good', value: 'good' },
        { label: 'Needs Improvement', value: 'needs_improvement' },
      ],
      placeholder: 'Area of Development',
      isMultiSelect: true,
    },
  },
  {
    value: 'Recognition',
    identifier: 'h8',
    backgroundColor: '#584CDB1F',
    color: '#584CDB',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.DROPDOWN,
      options: [
        { label: 'Wow', value: 'wow' },
        { label: 'Not Applicable', value: 'na' },
      ],
      placeholder: 'Select recognition',
    },
  },
  {
    value: 'Competency',
    identifier: 'h9',
    backgroundColor: '#FF57331F',
    color: '#FF5733',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.DROPDOWN,
      options: [
        { label: 'Communication', value: 'communication' },
        { label: 'Collaboration', value: 'collaboration' },
        { label: 'Leadership', value: 'leadership' },
        { label: 'Effectiveness', value: 'effectiveness' },
        { label: 'Problem Solving', value: 'problem_solving' },
        { label: 'Innovation', value: 'innovation' },
        { label: 'Improvement', value: 'improvement' },
      ],
      placeholder: 'Select competency',
      isMultiSelect: true,
    },
  },
];

export const firstColumn = [
  { value: 'Aaryan', identifier: 'r1' },
  { value: 'Abinaya', identifier: 'r2' },
  { value: 'Alaikya', identifier: 'r3' },
];

export const teamCriteria = [
  { value: 'Completeness', identifier: 'completeness' },
  { value: 'Quality of Deliverables', identifier: 'quality' },
  { value: 'Timeliness', identifier: 'timeliness' },
  { value: 'Innovation', identifier: 'innovation' },
];

export const teamColumns = [
  { value: 'Feedback', identifier: 'feedback' },
  {
    value: 'Ratings',
    identifier: 'ratings',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
];

export const leaderOptions = [
  { label: 'Aaryan', value: 'aaryan' },
  { label: 'Abinaya', value: 'abinaya' },
  { label: 'Alaikya', value: 'alaikya' },
  { label: 'Ashutosh', value: 'ashutosh' },
];

export const individualHeaders = [
  {
    value: 'Collaboration',
    identifier: '67497910ee257cea5ae0f464',
    backgroundColor: '#23DFEB1F',
    color: '#23DFEB',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Communication',
    identifier: '67497910ee257cea5ae0f467',
    backgroundColor: '#FF9F431F',
    color: '#FF9F43',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Leadership',
    identifier: '67497910ee257cea5ae0f46a',
    backgroundColor: '#7367F01F',
    color: '#7367F0',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Effectiveness',
    identifier: '67497910ee257cea5ae0f46d',
    backgroundColor: '#2196F31F',
    color: '#2196F3',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Problem Solving',
    identifier: '67497910ee257cea5ae0f473',
    backgroundColor: '#28C76F1F',
    color: '#28C76F',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Innovation',
    identifier: '67497910ee257cea5ae0f476',
    backgroundColor: '#FFD9661F',
    color: '#FFD966',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Improvement',
    identifier: 'areasOfDevelopment',
    backgroundColor: '#0DA8B21F',
    color: '#0DA8B2',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.DROPDOWN,
      options: [
        {
          label: 'Communication',
          value: 'Communication',
        },
        {
          label: 'Collaboration & Teamwork',
          value: 'Collaboration & Teamwork',
        },
        {
          label: 'Time Management',
          value: 'Time Management',
        },
        {
          label: 'Goal setting Skills',
          value: 'Goal setting Skills',
        },
        {
          label: 'Project Delivery Skills',
          value: 'Project Delivery Skills',
        },
        {
          label: 'None',
          value: 'None',
        },
        {
          label: 'Other',
          value: 'Other',
        },
      ],
    },
  },
  {
    value: 'Recognition',
    identifier: 'recognition',
    backgroundColor: '#584CDB1F',
    color: '#584CDB',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.DROPDOWN,
      options: [
        {
          label: 'WOW',
          value: 'wow',
        },
        {
          label: 'NA',
          value: 'na',
        },
      ],
    },
  },
  {
    value: 'Competency',
    identifier: 'competency',
    backgroundColor: '#FF9F431F',
    color: '#FF9F43',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.DROPDOWN,
      options: [
        {
          label: 'Collaboration and Teamwork',
          value: 'Collaboration and Teamwork',
        },
        {
          label: 'Communication',
          value: 'Communication',
        },
        {
          label: 'Leadership',
          value: 'Leadership',
        },
        {
          label: 'Effectiveness/Productivity',
          value: 'Effectiveness/Productivity',
        },
        {
          label: 'Problem Solving',
          value: 'Problem Solving',
        },
        {
          label: 'Innovation',
          value: 'Innovation',
        },
      ],
      placeholder: 'Select competencies',
    },
  },
];

export const teamHeaders = [
  {
    value: 'Completeness',
    identifier: '67497910ee257cea5ae0f470',
    backgroundColor: '#584CDB1F',
    color: '#584CDB',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Quality of Deliverables',
    identifier: '67497910ee257cea5ae0f471',
    backgroundColor: '#23DFEB1F',
    color: '#23DFEB',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Timeliness',
    identifier: '67497910ee257cea5ae0f472',
    backgroundColor: '#FFD9661F',
    color: '#FFD966',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
  {
    value: 'Innovation',
    identifier: '67497910ee257cea5ae0f479',
    backgroundColor: '#28C76F1F',
    color: '#28C76F',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
];

export const mockFeedbackSkeletons = {
  data: [
    {
      _id: '67114e4b2eb1fcb4cffcc75f',
      type: 'SELF',
      elements: [
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f465',
          rateType: 'numberRating',
          title: 'You worked as a team player, consistently seeking inputs and collaborating with team members.',
          tag: {
            text: 'Collaboration',
            color: '#23DFEB',
            backgroundColor: '#23DFEB1F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          commentRequired: true,
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f468',
          rateType: 'numberRating',
          title: 'You communicated in a clear, concise and structured manner.',
          tag: {
            text: 'Communication',
            color: '#FF9F43',
            backgroundColor: '#FF9F431F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          commentRequired: true,
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f46b',
          rateType: 'numberRating',
          title:
            'You demonstrated initiative in coordinating team actions and recognized team members for their contributions.',
          tag: {
            text: 'Leadership',
            color: '#28C76F',
            backgroundColor: '#28C76F1F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          commentRequired: true,
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f46e',
          rateType: 'numberRating',
          title: 'You delivered on assigned tasks in a timely and effective manner to achieve expected output.',
          tag: {
            text: 'Effectiveness',
            color: '#0185E4',
            backgroundColor: '#0185E41F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          commentRequired: true,
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f474',
          rateType: 'numberRating',
          title: 'You considered multiple solutions before selecting a specific course of action.',
          tag: {
            text: 'Problem Solving',
            color: '#FFD966',
            backgroundColor: '#FFD9661F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          commentRequired: true,
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f477',
          rateType: 'numberRating',
          title: 'You generated new ideas and solutions to achieve milestone goals. ',
          tag: {
            text: 'Innovation',
            color: '#23DFEB',
            backgroundColor: '#23DFEB1F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          commentRequired: true,
        },
        {
          type: 'comment',
          name: 'qualitativeFeedback-Comment',
          title: 'Qualitative Feedback',
          tag: {
            text: 'Feedback',
            color: '#7367F0',
            backgroundColor: '#7367F01F',
          },
          placeholder: 'Please type here',
          isRequired: true,
        },
      ],
    },
    {
      _id: '673c823cdeed7cfe6bb48e9e',
      type: 'PEER_TO_PEER',
      elements: [
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f466',
          title: 'Worked as a team player, consistently seeking inputs and collaborating with team members.',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          commentRequired: true,
          tag: {
            text: 'Collaboration',
            color: '#23DFEB',
            backgroundColor: '#23DFEB1F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f469',
          title: 'Communicated in a clear, concise and structured manner.',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Unhappy',
          maxRateDescription: 'Delighted',
          isRequired: true,
          hasComment: true,
          commentText: '',
          commentRequired: true,
          tag: {
            text: 'Communication',
            color: '#28C76F',
            backgroundColor: '#28C76F1F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f46a',
          title:
            'Took initiative in leading team for tasks to be accomplished and recognized team members for their contributions',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          commentRequired: true,
          tag: {
            text: 'Leadership',
            color: '#0185E4',
            backgroundColor: '#0185E41F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f46f',
          title: 'Delivered on assigned tasks in a timely and effective manner to achieve expected output.',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          commentRequired: true,
          tag: {
            text: 'Effectiveness',
            color: '#FFD966',
            backgroundColor: '#FFD9661F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f473',
          title: 'Considered multiple solutions before selecting a specific course of action.',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          commentRequired: true,
          tag: {
            text: 'Problem Solving',
            color: '#7367F0',
            backgroundColor: '#7367F01F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f478',
          title: 'Generated new ideas and solutions to achieve milestone goals.',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          commentRequired: true,
          tag: {
            text: 'Innovation',
            color: '#28C76F',
            backgroundColor: '#28C76F1F',
          },
        },
        {
          type: 'kudosgroup',
          name: 'recognition',
          title: 'Give a Kudos to this talent',
          choices: [
            {
              value: 'kudos',
              text: 'Kudos',
            },
            {
              value: 'na',
              text: 'NA',
            },
          ],
          displayMode: 'buttons',
          isRequired: true,
          hasComment: true,
          commentText: 'Your Comment',
          commentRequired: true,
          tag: {
            text: 'Recognition',
            color: '#FF9F43',
            backgroundColor: '#FF9F431F',
          },
          competency: {
            isRequired: true,
            title: 'Select applicable competencies',
            choices: [
              {
                name: 'Collaboration and Teamwork',
                abbreviation: 'COL',
                colorCode: '#0DA8B2',
                id: '6749790dee257cea5ae0f45e',
              },
              {
                name: 'Communication',
                abbreviation: 'COM',
                colorCode: '#FF9F43',
                id: '6749790dee257cea5ae0f45f',
              },
              {
                name: 'Leadership',
                abbreviation: 'LDR',
                colorCode: '#7367F0',
                id: '6749790eee257cea5ae0f460',
              },
              {
                name: 'Effectiveness/Productivity',
                abbreviation: 'EFF',
                colorCode: '#2196F3',
                id: '6749790fee257cea5ae0f461',
              },
              {
                name: 'Problem Solving',
                abbreviation: 'ANT',
                colorCode: '#28C76F',
                id: '6749790fee257cea5ae0f462',
              },
              {
                name: 'Innovation',
                abbreviation: 'INT',
                colorCode: '#F6C01C',
                id: '67497910ee257cea5ae0f463',
              },
            ],
          },
        },
      ],
    },
    {
      _id: '673c8288deed7cfe6bb48e9f',
      type: 'MANAGER_TO_TEAM',
      elements: [
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f470',
          rateType: 'numberRating',
          title: 'The team delivered on all committed tasks in the current milestone.',
          tag: {
            text: 'Completeness',
            color: '#584CDB',
            backgroundColor: '#584CDB1F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f471',
          rateType: 'numberRating',
          title: 'The team delivered high quality output on submissions in the current milestone.',
          tag: {
            text: 'Quality of Deliverables',
            color: '#23DFEB',
            backgroundColor: '#23DFEB1F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f472',
          rateType: 'numberRating',
          title: 'The team met all desired timelines in the current milestone.',
          tag: {
            text: 'Timeliness',
            color: '#FFD966',
            backgroundColor: '#FFD9661F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f479',
          rateType: 'numberRating',
          title: 'The team demonstrated out of the box thinking in the current milestone. ',
          tag: {
            text: 'Innovation',
            color: '#28C76F',
            backgroundColor: '#28C76F1F',
          },
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          hasComment: true,
          commentText: '',
          commentPlaceHolder: 'Please type here',
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
        },
        {
          type: 'gridcheckbox',
          name: 'topLeaders',
          title: 'Identify one or more team members who displayed leadership qualities within the current milestone',
          choices: [
            {
              first_name: 'Supratik',
              last_name: 'Chakraborty',
              image_uri:
                'https://trudevsa.blob.core.windows.net/tru-public/profile/67078a36ab23e90ffd91a191/9d431482-e961-47bb-998b-9e99946760c4.jpeg',
              role_name: 'AI Engineer',
              appreciation_score: null,
              averageRating: null,
              team_id: '673f3c4ffc73710771bfe045',
              _id: '67078a36ab23e90ffd91a191',
            },
            {
              first_name: 'FlexFlex',
              last_name: 'Anan',
              image_uri: '',
              role_name: 'AI Ethics Specialist',
              appreciation_score: null,
              averageRating: 3.7,
              team_id: '673f3c4ffc73710771bfe045',
              _id: '672b4378583e86b84cbd51c3',
            },
            {
              first_name: 'Praneeth',
              last_name: 'Reddy',
              image_uri:
                'https://trudevsa.blob.core.windows.net/tru-public/profile/670619f375eb631031262a69/bb3861ab-a7b5-4345-9a5f-04f6968af330.jpg',
              role_name: 'Algorithm Engineer',
              appreciation_score: null,
              averageRating: 1.8,
              team_id: '673f3c4ffc73710771bfe045',
              _id: '670619f375eb631031262a69',
            },
          ],
          choicesType: 'project_team',
          layoutType: 'grid',
          isRequired: true,
          tag: {
            text: 'Top Leaders',
            color: '#2196F3',
            backgroundColor: '#2196F31F',
          },
        },
        {
          type: 'comment',
          name: 'qualitativeFeedback-Comment',
          title: 'Qualitative Feedback',
          tag: {
            text: 'Feedback',
            color: '#FF9F43',
            backgroundColor: '#FF9F431F',
          },
          placeholder: 'Please type here',
          isRequired: true,
        },
      ],
    },
    {
      _id: '673c81e2deed7cfe6bb48e9d',
      type: 'MANAGER_TO_PEER',
      elements: [
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f464',
          title: 'Worked as a team player, consistently seeking inputs and collaborating with team members. ',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          tag: {
            text: 'Collaboration',
            color: '#23DFEB',
            backgroundColor: '#23DFEB1F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f467',
          title: 'Communicated in a clear, concise and structured manner',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Unhappy',
          maxRateDescription: 'Delighted',
          isRequired: true,
          hasComment: true,
          commentText: '',
          tag: {
            text: 'Communication',
            color: '#FF9F43',
            backgroundColor: '#FF9F431F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f46a',
          title:
            'Demonstrated initiative in coordinating team actions and recognized team members for their contributions  ',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          tag: {
            text: 'Leadership',
            color: '#7367F0',
            backgroundColor: '#7367F01F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f46d',
          title: 'Delivered on assigned tasks in a timely and effective manner to achieve expected output',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          tag: {
            text: 'Effectiveness',
            color: '#2196F3',
            backgroundColor: '#2196F31F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f473',
          title: 'Considered multiple solutions before selecting a specific course of action',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          tag: {
            text: 'Problem Solving',
            color: '#28C76F',
            backgroundColor: '#28C76F1F',
          },
        },
        {
          type: 'numberRating',
          name: '67497910ee257cea5ae0f476',
          title: 'Generated new ideas and solutions to achieve milestone goals',
          rateType: 'numberRating',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
              text: '01',
            },
            {
              value: 2,
              text: '02',
            },
            {
              value: 3,
              text: '03',
            },
            {
              value: 4,
              text: '04',
            },
            {
              value: 5,
              text: '05',
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: true,
          hasComment: true,
          commentText: '',
          tag: {
            text: 'Innovation',
            color: '#FFD966',
            backgroundColor: '#FFD9661F',
          },
        },
        {
          type: 'areacheckbox',
          name: 'areasOfDevelopment',
          title: 'Areas of Development',
          choices: [
            'Communication',
            'Collaboration & Teamwork',
            'Time Management',
            'Goal setting Skills',
            'Project Delivery Skills',
            'None',
            'Other',
          ],
          isRequired: true,
          hasComment: true,
          commentText: '',
          tag: {
            text: 'Improvement',
            color: '#0DA8B2',
            backgroundColor: '#0DA8B21F',
          },
        },
        {
          type: 'wowgroup',
          name: 'recognition',
          title: 'Give a WOW to the user for their demonstration of excellence',
          choices: [
            {
              value: 'wow',
              text: 'WOW',
            },
            {
              value: 'na',
              text: 'NA',
            },
          ],
          isRequired: true,
          hasComment: true,
          commentText: 'Add a comment',
          tag: {
            text: 'Recognition',
            color: '#584CDB',
            backgroundColor: '#584CDB1F',
          },
          competency: {
            isRequired: true,
            title: 'Select applicable competencies',
            choices: [
              {
                name: 'Collaboration and Teamwork',
                abbreviation: 'COL',
                colorCode: '#0DA8B2',
                id: '6749790dee257cea5ae0f45e',
              },
              {
                name: 'Communication',
                abbreviation: 'COM',
                colorCode: '#FF9F43',
                id: '6749790dee257cea5ae0f45f',
              },
              {
                name: 'Leadership',
                abbreviation: 'LDR',
                colorCode: '#7367F0',
                id: '6749790eee257cea5ae0f460',
              },
              {
                name: 'Effectiveness/Productivity',
                abbreviation: 'EFF',
                colorCode: '#2196F3',
                id: '6749790fee257cea5ae0f461',
              },
              {
                name: 'Problem Solving',
                abbreviation: 'ANT',
                colorCode: '#28C76F',
                id: '6749790fee257cea5ae0f462',
              },
              {
                name: 'Innovation',
                abbreviation: 'INT',
                colorCode: '#F6C01C',
                id: '67497910ee257cea5ae0f463',
              },
            ],
          },
        },
        {
          type: 'comment',
          name: 'qualitativeFeedback-Comment',
          title: 'Qualitative Feedback',
          tag: {
            text: 'Feedback',
            color: '#FF9F43',
            backgroundColor: '#FF9F431F',
          },
          placeholder: 'Please type here',
          isRequired: true,
        },
      ],
    },
  ],
  status: 'SUCCESS',
};
