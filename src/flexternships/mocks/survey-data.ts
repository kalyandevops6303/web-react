// export const mockSelfFeedbackSurveyJson = {
//   title: 'Trumio Self Feedback',
//   pages: [
//     {
//       name: 'Collaboration & Teamwork',
//       description: 'Collaboration & Teamwork',
//       elements: [
//         {
//           type: 'numberRating',
//           name: 'q5_ownership',
//           rateType: 'numberRating',
//           title:
//             'You took ownership of delivering high quality work output and results from yourself and your team members',
//           rateValues: [
//             { value: 1, text: '01' },
//             { value: 2, text: '02' },
//             { value: 3, text: '03' },
//             { value: 4, text: '04' },
//             { value: 5, text: '05' },
//           ],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'rating',
//           name: 'q1_collaboration',
//           title: 'You worked as a true team player seeking inputs and collaboration from your manager and team members',
//           rateType: 'stars',
//           displayMode: 'buttons',
//           rateValues: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q1_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Communication',
//       description: 'Communication',
//       elements: [
//         {
//           type: 'smileyRating',
//           name: 'q2_communicaion',
//           title: 'You communicated with your manager and team members in a clear, concise and structured manner',
//           isRequired: false,
//           rateType: 'smileys',
//           autoGenerate: false,
//           rateValues: [1, 2, 3, 4, 5],
//           minDecriptionValue: 'Unhappy',
//           maxDecriptionValue: 'Delighted',
//           rateMax: 10,
//         },
//         {
//           type: 'comment',
//           name: 'q2_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Leadership',
//       description: 'Leadership',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q3_leadership',
//           rateType: 'stars',
//           displayMode: 'buttons',
//           title:
//             'Took initiative in leading team for tasks to be accomplished and recognized team members for their contributions',
//           rateValues: [1, 2, 3, 4, 5],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q3_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Ownership',
//       description: 'Ownership',
//       elements: [
//         {
//           type: 'numberRating',
//           name: 'q4_ownership',
//           rateType: 'numberRating',
//           title:
//             'You took ownership of delivering high quality work output and results from yourself and your team members',
//           rateValues: [
//             { value: 1, text: '01' },
//             { value: 2, text: '02' },
//             { value: 3, text: '03' },
//             { value: 4, text: '04' },
//             { value: 5, text: '05' },
//           ],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q4_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Analytical Thinking',
//       description: 'Analytical Thinking',
//       rateType: 'numeric',
//       elements: [
//         {
//           type: 'numberRating',
//           name: 'q5_analytical_thinking',
//           title:
//             'You understood task objectives and context before execution, and applied acquired knowledge and skills for better project execution',
//           rateValues: [
//             { value: 1, text: '01' },
//             { value: 2, text: '02' },
//             { value: 3, text: '03' },
//             { value: 4, text: '04' },
//             { value: 5, text: '05' },
//           ],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q5_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Innovative Thinking',
//       description: 'Innovative Thinking',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q6_innovative_thinking',
//           rateType: 'stars',
//           displayMode: 'buttons',
//           title: 'Came up with new, innovative ideas and solutions to challenges presented within project or tasks',
//           rateValues: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q6_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Feedback',
//       description: 'Feedback',
//       elements: [
//         {
//           type: 'kudosgroup',
//           name: 'satisfaction-smileys-colored',
//           title: 'Give a Kudos to this talent',
//           choices: [
//             { value: 'kudos', text: 'KUDOS' },
//             { value: 'na', text: 'NA' },
//           ],
//         },
//         {
//           type: 'comment',
//           name: 'q7_comments',
//           title: 'Your Comments (Required)',
//           isRequired: false,
//           placeholder: 'Please type here',
//         },
//       ],
//     },
//   ],
//   showProgressBar: 'top',
//   progressBarType: 'buttons',
//   completeText: 'Submit Feedback',
// };

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
  progressBarType: 'buttons',
  completeText: 'Submit Feedback',
};

// export const mockPeerFeedbackSurveyJson = {
//   title: 'Peer Feedback',
//   pages: [
//     {
//       name: 'Collaboration & Teamwork',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q1_collaboration',
//           title:
//             'Collaboration & Teamwork: Worked as a true team player seeking inputs and collaboration from team members',
//           rateType: 'stars',
//           displayMode: 'buttons',
//           rateValues: [1, 2, 3, 4, 5],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q1_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Communication',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q2_communication',
//           title: 'Communicated with team members in a clear, concise and structured manner',
//           rateValues: [1, 2, 3, 4, 5],
//           minRateDescription: 'Unhappy',
//           maxRateDescription: 'Delighted',
//           rateType: 'smileys',
//           displayMode: 'buttons',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q2_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Leadership',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q3_leadership',
//           title:
//             'Took initiative in leading team for tasks to be accomplished and recognized team members for their contributions',
//           rateValues: [1, 2, 3, 4, 5],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           rateType: 'stars',
//           displayMode: 'buttons',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q3_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Ownership',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q4_ownership',
//           title: 'Took ownership of delivering high-quality work output and results for project and tasks',
//           rateValues: [
//             {
//               value: 1,
//               text: '01',
//             },
//             {
//               value: 2,
//               text: '02',
//             },
//             {
//               value: 3,
//               text: '03',
//             },
//             {
//               value: 4,
//               text: '04',
//             },
//             {
//               value: 5,
//               text: '05',
//             },
//           ],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q4_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Analytical Thinking',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q5_analytical_thinking',
//           title:
//             'Understood task objectives and context before execution, and applied acquired knowledge and skills for better project execution',
//           rateValues: [
//             {
//               value: 1,
//               text: '01',
//             },
//             {
//               value: 2,
//               text: '02',
//             },
//             {
//               value: 3,
//               text: '03',
//             },
//             {
//               value: 4,
//               text: '04',
//             },
//             {
//               value: 5,
//               text: '05',
//             },
//           ],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q5_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Innovative Thinking',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q6_innovative_thinking',
//           title: 'Came up with new, innovative ideas and solutions to challenges presented within project or tasks',
//           rateValues: [1, 2, 3, 4, 5],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           rateType: 'stars',
//           displayMode: 'buttons',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q6_comments',
//           title: 'Please provide additional feedback (Optional)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Recognition',
//       elements: [
//         {
//           type: 'rating',
//           name: 'recognition',
//           title: 'Give a Kudos to this talent',
//           rateValues: [
//             { value: 1, text: 'Kudos' },
//             { value: 2, text: 'NA' },
//           ],
//           displayMode: 'buttons',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'recognition_comment',
//           title: 'Your comment (Required)',
//           placeholder: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//   ],
//   showProgressBar: 'top',
//   progressBarType: 'buttons',
//   completeText: 'Submit Feedback',
// };

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
          value: '1',
          text: 'Kudos',
        },
        {
          value: '2',
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

// export const mockTeamFeedbackSurveyJson = {
//   title: 'Team Feedback',
//   pages: [
//     {
//       name: 'Completeness',
//       elements: [
//         {
//           type: 'html',
//           name: 'completeness_heading',
//           html: '<span id="completeness_heading">Completeness</span>',
//         },
//         {
//           type: 'rating',
//           name: 'q1_completeness',
//           title: 'Team delivered completely and holistically for the committed tasks in the current milestone',
//           rateValues: [
//             {
//               value: 1,
//               text: "<img src='/emojis/smiley_1.svg' alt='Smiley 1' class='emoji_image'/>",
//             },
//             {
//               value: 2,
//               text: "<img src='/emojis/smiley_2.svg' alt='Smiley 2' class='emoji_image'/>",
//             },
//             {
//               value: 3,
//               text: "<img src='/emojis/smiley_3.svg' alt='Smiley 3' class='emoji_image'/>",
//             },
//             {
//               value: 4,
//               text: "<img src='/emojis/smiley_4.svg' alt='Smiley 4' class='emoji_image'/>",
//             },
//             {
//               value: 5,
//               text: "<img src='/public/emojis/smiley_5.svg' alt='Smiley 5' class='emoji_image' style='height: 42px; width: 42px;' />",
//             },
//           ],
//           minRateDescription: 'Unhappy',
//           maxRateDescription: 'Delighted',
//           rateType: 'smileys',
//           displayMode: 'buttons',
//           showCommentArea: true,
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Quality of Deliverables',
//       elements: [
//         {
//           type: 'html',
//           name: 'quality_heading',
//           html: '<span id="quality_heading">Quality of Deliverables</span>',
//         },
//         {
//           type: 'rating',
//           name: 'q2_quality_of_deliverables',
//           title: 'Team delivered high-quality output for the committed tasks in the current milestone',
//           rateValues: [1, 2, 3, 4, 5],
//           minRateDescription: 'Unhappy',
//           maxRateDescription: 'Delighted',
//           rateType: 'smileys',
//           displayMode: 'buttons',
//           showCommentArea: true,
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Timelines',
//       elements: [
//         {
//           type: 'html',
//           name: 'timelines_heading',
//           html: '<span id="timelines_heading">Timelines</span>',
//         },
//         {
//           type: 'rating',
//           name: 'q3_timeliness',
//           title:
//             'Team consistently delivered tasks and outputs on the agreed upon timelines without intentional delays',
//           rateValues: [
//             {
//               value: 1,
//               text: '01',
//             },
//             {
//               value: 2,
//               text: '02',
//             },
//             {
//               value: 3,
//               text: '03',
//             },
//             {
//               value: 4,
//               text: '04',
//             },
//             {
//               value: 5,
//               text: '05',
//             },
//           ],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           showCommentArea: true,
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Innovation',
//       elements: [
//         {
//           type: 'html',
//           name: 'completeness_heading',
//           html: '<span id="innovation_heading">Innovation</span>',
//         },
//         {
//           type: 'rating',
//           name: 'q4_innovation',
//           title:
//             'Team showed innovative and out-of-the-box thinking while working on the committed tasks in the current milestone',
//           rateValues: [1, 2, 3, 4, 5],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           rateType: 'stars',
//           showCommentArea: true,
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Top Leaders',
//       elements: [
//         {
//           type: 'html',
//           name: 'completeness_heading',
//           html: '<span id="top_leaders_heading">Top Leaders</span>',
//         },
//         {
//           type: 'checkbox',
//           name: 'top_leaders',
//           title: 'Identify one or more team members who displayed leadership qualities within the current milestone',
//           api: 'https://tru-dev-api.trumio.ai/api/leaders/api/leaders',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Feedback',
//       elements: [
//         {
//           type: 'html',
//           name: 'feedback_heading',
//           html: '<span id="feedback_heading">Feedback</span>',
//         },
//         {
//           type: 'comment',
//           name: 'qualitative_feedback',
//           title: 'Qualitative feedback on Team Performance',
//           isRequired: false,
//         },
//       ],
//     },
//   ],
//   showProgressBar: 'top',
//   progressBarType: 'buttons',
//   completeText: 'Submit Feedback',
// };

// export const mockIndividualFeedbackSurveyJson = {
//   title: 'Individual Feedback',
//   pages: [
//     {
//       name: 'Collaboration & Teamwork',
//       elements: [
//         {
//           type: 'numberRating',
//           name: 'q1_teamwork',
//           rateType: 'numberRating',
//           title:
//             'Worked as a team player, seeking inputs and collaborating with you and team members in project and tasks execution',
//           rateValues: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Communication',
//       elements: [
//         {
//           type: 'smileyRating',
//           name: 'q2_communication',
//           title: 'Communicated in a clear, concise and structured manner',
//           rateType: 'smileys',
//           rateValues: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
//           minRateDescription: 'Unhappy',
//           maxRateDescription: 'Delighted',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q2_comments',
//           title: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Leadership',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q3_leadership',
//           title:
//             'Took initiative in leading team for tasks to be accomplished and recognized team members for their efforts',
//           rateValues: [1, 2, 3, 4, 5],
//           minRateDescription: 'Strongly Disagree',
//           maxRateDescription: 'Strongly Agree',
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q3_comments',
//           title: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Ownership',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q4_ownership',
//           title:
//             'Took ownership of delivering quality output while pushing to deliver exceptional results from self and other team members',
//           rateValues: [1, 2, 3, 4, 5],
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q4_comments',
//           title: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Analytical Thinking',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q5_analytical_thinking',
//           title:
//             'Analyzed task objectives and context before execution and applied acquired knowledge and skills for better project execution',
//           rateValues: [1, 2, 3, 4, 5],
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q5_comments',
//           title: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Innovative Thinking',
//       elements: [
//         {
//           type: 'rating',
//           name: 'q6_innovative_thinking',
//           title: 'Generated novel, innovative ideas and solutions to challenges presented within project or tasks',
//           rateValues: [
//             { value: 1, text: 'Strongly Disagree' },
//             { value: 2 },
//             { value: 3 },
//             { value: 4 },
//             { value: 5, text: 'Strongly Agree' },
//           ],
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'q6_comments',
//           title: 'Please type here',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Improvement',
//       elements: [
//         {
//           type: 'areacheckbox',
//           name: 'areas_of_development',
//           title: 'Areas of Development',
//           choices: [
//             'Area of development 1',
//             'Area of development 2',
//             'Area of development 3',
//             'Area of development 4',
//             'Other',
//           ],
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Feedback',
//       elements: [
//         {
//           type: 'comment',
//           name: 'qualitative_feedback',
//           title: 'Qualitative Feedback',
//           isRequired: false,
//         },
//       ],
//     },
//     {
//       name: 'Recognition',
//       elements: [
//         {
//           type: 'wowgroup',
//           name: 'recognition',
//           title: 'Give a WOW to the user for their demonstration of excellence',
//           choices: [
//             { value: 'wow', text: 'WOW' },
//             { value: 'na', text: 'NA' },
//           ],
//           isRequired: false,
//         },
//         {
//           type: 'comment',
//           name: 'recognition_comment',
//           title: 'Your comment (Required)',
//           isRequired: false,
//         },
//       ],
//     },
//   ],
//   showProgressBar: 'top',
//   progressBarType: 'buttons',
//   completeText: 'Submit',
// };

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
      // choices: [
      //   {
      //     "first_name": "Supratik",
      //     "last_name": "Chakraborty",
      //     "image_uri": "https://trudevsa.blob.core.windows.net/tru-public/profile/67078a36ab23e90ffd91a191/9d431482-e961-47bb-998b-9e99946760c4.jpeg",
      //     "role_name": "AI Engineer",
      //     "appreciation_score": null,
      //     "averageRating": null,
      //     "team_id": "673f3c4ffc73710771bfe045",
      //     "_id": "67078a36ab23e90ffd91a191"
      //   },
      //   {
      //     "first_name": "FlexFlex",
      //     "last_name": "Anan",
      //     "image_uri": "",
      //     "role_name": "AI Ethics Specialist",
      //     "appreciation_score": null,
      //     "averageRating": 3.7,
      //     "team_id": "673f3c4ffc73710771bfe045",
      //     "_id": "672b4378583e86b84cbd51c3"
      //   },
      //   {
      //     "first_name": "Praneeth",
      //     "last_name": "Reddy",
      //     "image_uri": "https://trudevsa.blob.core.windows.net/tru-public/profile/670619f375eb631031262a69/bb3861ab-a7b5-4345-9a5f-04f6968af330.jpg",
      //     "role_name": "Algorithm Engineer",
      //     "appreciation_score": null,
      //     "averageRating": 1.8,
      //     "team_id": "673f3c4ffc73710771bfe045",
      //     "_id": "670619f375eb631031262a69"
      //   }
      // ],
      choices: [],
      choicesType: 'project_team',
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
      name: 'q5_analytical_thinking',
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
      name: 'q6_innovative_thinking',
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
      name: 'areas_of_development',
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
  completeText: 'Submit Feedback',
};
