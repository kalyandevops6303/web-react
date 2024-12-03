export const mockSelfFeedbackSurveyJson = {
  elements: [
    {
      type: 'numberRating',
      name: 'q1_collaboration',
      rateType: 'numberRating',
      title: 'You worked as a true team player seeking inputs and collaboration from your manager and team members',
      tag: {
        text: 'Collaboration & Teamwork',
        color: '#23DFEB',
        backgroundColor: '#23DFEB1F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // Set isRequired to true
      commentRequired: true, // Added commentRequired to true
    },
    {
      type: 'numberRating',
      name: 'q2_communication',
      rateType: 'numberRating',
      title: 'You communicated with your manager and team members in a clear, concise and structured manner',
      tag: {
        text: 'Communication',
        color: '#FF9F43',
        backgroundColor: '#FF9F431F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // Set isRequired to true
      commentRequired: true, // Added commentRequired to true
    },
    {
      type: 'numberRating',
      name: 'q3_leadership',
      rateType: 'numberRating',
      title:
        'You took initiative in leading your team for tasks to be accomplished and recognized team members for their contributions',
      tag: {
        text: 'Leadership',
        color: '#28C76F',
        backgroundColor: '#28C76F1F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // Set isRequired to true
      commentRequired: true, // Added commentRequired to true
    },
    {
      type: 'numberRating',
      name: 'q4_ownership',
      rateType: 'numberRating',
      title:
        'You took ownership of delivering high quality work output and results from yourself and your team members',
      tag: {
        text: 'Ownership',
        color: '#0185E4',
        backgroundColor: '#0185E41F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // Set isRequired to true
      commentRequired: true, // Added commentRequired to true
    },
    {
      type: 'numberRating',
      name: 'q5_analyticalThinking',
      rateType: 'numberRating',
      title:
        'You analysed task objectives and considered various solutions before executing on a specific course of action',
      tag: {
        text: 'Analytical Thinking',
        color: '#FFD966',
        backgroundColor: '#FFD9661F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // Set isRequired to true
      commentRequired: true, // Added commentRequired to true
    },
    {
      type: 'numberRating',
      name: 'q6_innovativeThinking',
      rateType: 'numberRating',
      title: 'You came up with new, innovative ideas and solutions to challenges presented within project or tasks',
      tag: {
        text: 'Innovative Thinking',
        color: '#23DFEB',
        backgroundColor: '#23DFEB1F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // Set isRequired to true
      commentRequired: true, // Added commentRequired to true
    },
    {
      type: 'comment',
      name: 'q7_qualitativeFeedback',
      title: 'Qualitative Feedback',
      tag: {
        text: 'Feedback',
        color: '#7367F0',
        backgroundColor: '#7367F01F',
      },
      placeholder: 'Please type here',
      isRequired: true, // Set isRequired to true
      commentRequired: true, // Added commentRequired to true
    },
  ],
  completeText: 'Submit Feedback',
};

export const mockPeerFeedbackSurveyJson = {
  elements: [
    {
      type: 'numberRating',
      name: 'q1_collaboration',
      title: 'Worked as a true team player seeking inputs and collaboration from team members',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // kept only this
      hasComment: true,
      commentText: '',
      commentRequired: true, // Added
      tag: {
        text: 'Collaboration & Teamwork',
        color: '#23DFEB',
        backgroundColor: '#23DFEB1F',
      },
    },
    {
      type: 'numberRating',
      name: 'q2_communication',
      title: 'Communicated with team members in a clear, concise and structured manner',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Unhappy',
      maxRateDescription: 'Delighted',
      isRequired: true, // kept only this
      hasComment: true,
      commentText: '',
      commentRequired: true, // Added
      tag: {
        text: 'Communication',
        color: '#28C76F',
        backgroundColor: '#28C76F1F',
      },
    },
    {
      type: 'numberRating',
      name: 'q3_leadership',
      title:
        'Took initiative in leading team for tasks to be accomplished and recognized team members for their contributions',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // kept only this
      hasComment: true,
      commentText: '',
      commentRequired: true, // Added
      tag: {
        text: 'Leadership',
        color: '#0185E4',
        backgroundColor: '#0185E41F',
      },
    },
    {
      type: 'numberRating',
      name: 'q4_ownership',
      title: 'Took ownership of delivering high quality work output and results for project and tasks',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // kept only this
      hasComment: true,
      commentText: '',
      commentRequired: true, // Added
      tag: {
        text: 'Ownership',
        color: '#FFD966',
        backgroundColor: '#FFD9661F',
      },
    },
    {
      type: 'numberRating',
      name: 'q5_analyticalThinking',
      title:
        'Analysed project and task objectives, and considered various solutions before executing a specific course of action',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // kept only this
      hasComment: true,
      commentText: '',
      commentRequired: true, // Added
      tag: {
        text: 'Analytical Thinking',
        color: '#7367F0',
        backgroundColor: '#7367F01F',
      },
    },
    {
      type: 'numberRating',
      name: 'q6_innovativeThinking',
      title: 'Came up with new, innovative ideas and solutions to challenges presented within project or tasks',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // kept only this
      hasComment: true,
      commentText: '',
      commentRequired: true, // Added
      tag: {
        text: 'Innovative Thinking',
        color: '#28C76F',
        backgroundColor: '#28C76F1F',
      },
    },
    {
      type: 'kudosgroup',
      name: 'q7_recognition',
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
      isRequired: true, // kept only this
      hasComment: true,
      commentText: 'Your Comment (required)',
      commentRequired: true, // Added
      tag: {
        text: 'Recognition',
        color: '#FF9F43',
        backgroundColor: '#FF9F431F',
      },
    },
  ],
  completeText: 'Submit Feedback',
};

export const mockTeamFeedbackSurveyJson = {
  elements: [
    {
      type: 'numberRating',
      name: 'q1_completeness',
      rateType: 'numberRating',
      title: 'Team delivered completely and holistically for the committed tasks in the current milestone',
      tag: {
        text: 'Completeness',
        color: '#584CDB',
        backgroundColor: '#584CDB1F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // set to true
    },
    {
      type: 'numberRating',
      name: 'q2_qualityOfDeliverables',
      rateType: 'numberRating',
      title: 'Team delivered high quality output for the committed tasks in the current milestone',
      tag: {
        text: 'Quality of Deliverables',
        color: '#23DFEB',
        backgroundColor: '#23DFEB1F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // set to true
    },
    {
      type: 'numberRating',
      name: 'q3_timeliness',
      rateType: 'numberRating',
      title: 'Team consistently delivered tasks and outputs on the agreed upon timelines without intentional delays',
      tag: {
        text: 'Timeliness',
        color: '#FFD966',
        backgroundColor: '#FFD9661F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // set to true
    },
    {
      type: 'numberRating',
      name: 'q4_innovation',
      rateType: 'numberRating',
      title:
        'Team showed innovative and out of box thinking while working on the committed tasks in the current milestone',
      tag: {
        text: 'Innovation',
        color: '#28C76F',
        backgroundColor: '#28C76F1F',
      },
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      hasComment: true,
      commentText: '',
      commentPlaceHolder: 'Please type here',
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true, // set to true
    },
    {
      type: 'gridcheckbox',
      name: 'q5_topLeaders',
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
      // choices: [],
      choicesType: 'project_team',
      layoutType: 'grid',
      isRequired: true, // set to true
      tag: {
        text: 'Top Leaders',
        color: '#2196F3',
        backgroundColor: '#2196F31F',
      },
    },
    {
      type: 'comment',
      name: 'q6_qualitativeFeedback',
      title: 'Qualitative Feedback',
      tag: {
        text: 'Feedback',
        color: '#FF9F43',
        backgroundColor: '#FF9F431F',
      },
      placeholder: 'Please type here',
      isRequired: true, // set to true
    },
  ],
  progressBarType: 'buttons',
  completeText: 'Submit Feedback',
};

export const mockIndividualFeedbackSurveyJson = {
  elements: [
    {
      type: 'numberRating',
      name: 'q1_collaboration',
      title:
        'Worked as a team player, seeking inputs and collaborating with you and team members in project and tasks execution',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true,
      hasComment: true,
      commentText: '',
      tag: {
        text: 'Collaboration & Teamwork',
        color: '#23DFEB',
        backgroundColor: '#23DFEB1F',
      },
    },
    {
      type: 'numberRating',
      name: 'q2_communication',
      title: 'Communicated in a clear, concise and structured manner',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
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
      name: 'q3_leadership',
      title:
        'Took initiative in leading team for tasks to be accomplished and recognized team members for their contributions and work',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
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
      name: 'q4_ownership',
      title:
        'Took ownership of delivering quality output while pushing to deliver exceptional results from self and other team members ',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true,
      hasComment: true,
      commentText: '',
      tag: {
        text: 'Ownership',
        color: '#2196F3',
        backgroundColor: '#2196F31F',
      },
    },
    {
      type: 'numberRating',
      name: 'q5_analyticalThinking',
      title:
        'Analysed project and task objectives, and considered various solutions before executing a specific course of action',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true,
      hasComment: true,
      commentText: '',
      tag: {
        text: 'Analytical Thinking',
        color: '#28C76F',
        backgroundColor: '#28C76F1F',
      },
    },
    {
      type: 'numberRating',
      name: 'q6_innovativeThinking',
      title: 'Generated novel, innovative ideas and solutions to challenges presented within project or tasks',
      rateType: 'numberRating',
      displayMode: 'buttons',
      rateValues: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
      ],
      minRateDescription: 'Strongly Disagree',
      maxRateDescription: 'Strongly Agree',
      isRequired: true,
      hasComment: true,
      commentText: '',
      tag: {
        text: 'Innovative Thinking',
        color: '#FFD966',
        backgroundColor: '#FFD9661F',
      },
    },
    {
      type: 'areacheckbox',
      name: 'q7_areasOfDevelopment',
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
      name: 'q8_recognition',
      title: 'Give a WOW to the user for their demonstration of excellence',
      choices: [
        { value: 'wow', text: 'WOW' },
        { value: 'na', text: 'NA' },
      ],
      isRequired: true,
      hasComment: true,
      commentText: '',
      tag: {
        text: 'Recognition',
        color: '#584CDB',
        backgroundColor: '#584CDB1F',
      },
    },
    {
      type: 'comment',
      name: 'q9_qualitativeFeedback',
      title: 'Qualitative Feedback',
      tag: {
        text: 'Feedback',
        color: '#FF9F43',
        backgroundColor: '#FF9F431F',
      },
      placeholder: 'Please type here',
      isRequired: true, // set to true
    },
  ],
  completeText: 'Submit Feedback',
};
