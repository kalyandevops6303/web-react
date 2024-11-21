export const mockSelfFeedbackSurveyJson = {
  title: 'Trumio Self Feedback',
  pages: [
    {
      name: 'Collaboration & Teamwork',
      description: 'Collaboration & Teamwork',
      elements: [
        {
          type: 'rating',
          name: 'q1_collaboration',
          title: 'You worked as a true team player seeking inputs and collaboration from your manager and team members',
          rateType: 'stars',
          displayMode: 'buttons',
          rateValues: [
            {
              value: 1,
            },
            {
              value: 2,
            },
            {
              value: 3,
            },
            {
              value: 4,
            },
            {
              value: 5,
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q1_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Communication',
      description: 'Communication',
      elements: [
        {
          type: 'smileyRating',
          name: 'q2_communicaion',
          title: 'You communicated with your manager and team members in a clear, concise and structured manner',
          isRequired: false,
          rateType: 'smileys',
          autoGenerate: false,
          rateValues: [1, 2, 3, 4, 5],
          minDecriptionValue: 'Unhappy',
          maxDecriptionValue: 'Delighted',
          rateMax: 10,
        },
        {
          type: 'comment',
          name: 'q2_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Leadership',
      description: 'Leadership',
      elements: [
        {
          type: 'numberRating',
          name: 'q3_leadership',
          rateType: 'numberRating',
          displayMode: 'buttons',
          title:
            'You took initiative in leading team for tasks to be accomplished and recognized team members for their contributions',
          rateValues: [
            {
              value: 1,
            },
            {
              value: 2,
            },
            {
              value: 3,
            },
            {
              value: 4,
            },
            {
              value: 5,
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q3_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Ownership',
      description: 'Ownership',
      elements: [
        {
          type: 'numberRating',
          name: 'q4_ownership',
          rateType: 'numberRating',
          title:
            'You took ownership of delivering high quality work output and results from yourself and your team members',
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
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q4_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Analytical Thinking',
      description: 'Analytical Thinking',
      rateType: 'numeric',
      elements: [
        {
          type: 'numberRating',
          rateType: 'numberRating',
          name: 'q5_analytical_thinking',
          title:
            'You understood task objectives and context before execution, and applied acquired knowledge and skills for better project execution',
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
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q5_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Innovative Thinking',
      description: 'Innovative Thinking',
      elements: [
        {
          type: 'rating',
          name: 'q6_innovative_thinking',
          rateType: 'stars',
          displayMode: 'buttons',
          title: 'Came up with new, innovative ideas and solutions to challenges presented within project or tasks',
          rateValues: [
            {
              value: 1,
            },
            {
              value: 2,
            },
            {
              value: 3,
            },
            {
              value: 4,
            },
            {
              value: 5,
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q6_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
  ],
  showProgressBar: 'top',
  progressBarType: 'buttons',
  completeText: 'Submit Feedback',
};

export const mockPeerFeedbackSurveyJson = {
  title: 'Peer Feedback',
  pages: [
    {
      name: 'Collaboration & Teamwork',
      elements: [
        {
          type: 'rating',
          name: 'q1_collaboration',
          title:
            'Collaboration & Teamwork: Worked as a true team player seeking inputs and collaboration from team members',
          rateType: 'stars',
          displayMode: 'buttons',
          rateValues: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q1_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Communication',
      elements: [
        {
          type: 'smileyRating',
          name: 'q2_communication',
          title: 'Communicated with team members in a clear, concise and structured manner',
          rateValues: [1, 2, 3, 4, 5],
          minRateDescription: 'Unhappy',
          maxRateDescription: 'Delighted',
          rateType: 'smileys',
          displayMode: 'buttons',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q2_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Leadership',
      elements: [
        {
          type: 'rating',
          name: 'q3_leadership',
          title:
            'Took initiative in leading team for tasks to be accomplished and recognized team members for their contributions',
          rateValues: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          rateType: 'stars',
          displayMode: 'buttons',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q3_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Ownership',
      elements: [
        {
          type: 'numberRating',
          rateType: 'numberRating',
          name: 'q4_ownership',
          title: 'Took ownership of delivering high-quality work output and results for project and tasks',
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
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q4_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Analytical Thinking',
      elements: [
        {
          type: 'numberRating',
          rateType: 'numberRating',
          name: 'q5_analytical_thinking',
          title:
            'Understood task objectives and context before execution, and applied acquired knowledge and skills for better project execution',
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
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q5_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Innovative Thinking',
      elements: [
        {
          type: 'rating',
          name: 'q6_innovative_thinking',
          title: 'Came up with new, innovative ideas and solutions to challenges presented within project or tasks',
          rateValues: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          rateType: 'stars',
          displayMode: 'buttons',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q6_comments',
          title: 'Please provide additional feedback (Optional)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Recognition',
      elements: [
        {
          type: 'kudosgroup',
          name: 'recognition',
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
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'recognition_comment',
          title: 'Your comment (Required)',
          placeholder: 'Please type here',
          isRequired: false,
        },
      ],
    },
  ],
  showProgressBar: 'top',
  progressBarType: 'buttons',
  completeText: 'Submit Feedback',
};

export const mockTeamFeedbackSurveyJson = {
  title: 'Team Feedback',
  pages: [
    {
      name: 'Completeness',
      elements: [
        {
          type: 'html',
          name: 'completeness_heading',
          html: "<span id='completeness_heading'>Completeness</span>",
        },
        {
          type: 'rating',
          name: 'q1_completeness',
          title: 'Team delivered completely and holistically for the committed tasks in the current milestone',
          rateValues: [
            {
              value: 1,
              text: "<img src='/emojis/smiley_1.svg' alt='Smiley 1' class='emoji_image'/>",
            },
            {
              value: 2,
              text: "<img src='/emojis/smiley_2.svg' alt='Smiley 2' class='emoji_image'/>",
            },
            {
              value: 3,
              text: "<img src='/emojis/smiley_3.svg' alt='Smiley 3' class='emoji_image'/>",
            },
            {
              value: 4,
              text: "<img src='/emojis/smiley_4.svg' alt='Smiley 4' class='emoji_image'/>",
            },
            {
              value: 5,
              text: "<img src='/public/emojis/smiley_5.svg' alt='Smiley 5' class='emoji_image' style='height: 42px; width: 42px;' />",
            },
          ],
          minRateDescription: 'Unhappy',
          maxRateDescription: 'Delighted',
          rateType: 'smileys',
          displayMode: 'buttons',
          showCommentArea: true,
          isRequired: false,
        },
      ],
    },
    {
      name: 'Quality of Deliverables',
      elements: [
        {
          type: 'html',
          name: 'quality_heading',
          html: "<span id='quality_heading'>Quality of Deliverables</span>",
        },
        {
          type: 'rating',
          name: 'q2_quality_of_deliverables',
          title: 'Team delivered high-quality output for the committed tasks in the current milestone',
          rateValues: [1, 2, 3, 4, 5],
          minRateDescription: 'Unhappy',
          maxRateDescription: 'Delighted',
          rateType: 'smileys',
          displayMode: 'buttons',
          showCommentArea: true,
          isRequired: false,
        },
      ],
    },
    {
      name: 'Timelines',
      elements: [
        {
          type: 'html',
          name: 'timelines_heading',
          html: "<span id='timelines_heading'>Timelines</span>",
        },
        {
          type: 'numberRating',
          rateType: 'numberRating',
          name: 'q3_timeliness',
          title:
            'Team consistently delivered tasks and outputs on the agreed upon timelines without intentional delays',
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
          showCommentArea: true,
          isRequired: false,
        },
      ],
    },
    {
      name: 'Innovation',
      elements: [
        {
          type: 'html',
          name: 'innovation_heading',
          html: "<span id='innovation_heading'>Innovation</span>",
        },
        {
          type: 'rating',
          name: 'q4_innovation',
          title:
            'Team showed innovative and out-of-the-box thinking while working on the committed tasks in the current milestone',
          rateValues: [1, 2, 3, 4, 5],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          rateType: 'stars',
          showCommentArea: true,
          isRequired: false,
        },
      ],
    },
    {
      name: 'Top Leaders',
      elements: [
        {
          type: 'html',
          name: 'top_leaders_heading',
          html: "<span id='top_leaders_heading'>Top Leaders</span>",
        },
        {
          type: 'checkbox',
          name: 'top_leaders',
          title: 'Identify one or more team members who displayed leadership qualities within the current milestone',
          api: 'http://localhost:3000/api/leaders',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Feedback',
      elements: [
        {
          type: 'html',
          name: 'feedback_heading',
          html: "<span id='feedback_heading'>Feedback</span>",
        },
        {
          type: 'comment',
          name: 'qualitative_feedback',
          title: 'Qualitative feedback on Team Performance',
          isRequired: false,
        },
      ],
    },
  ],
  showProgressBar: 'top',
  progressBarType: 'buttons',
  completeText: 'Submit Feedback',
};

export const mockIndividualFeedbackSurveyJson = {
  title: 'Individual Feedback',
  pages: [
    {
      name: 'Collaboration & Teamwork',
      elements: [
        {
          type: 'rating',
          rateType: 'stars',
          name: 'q1_teamwork',
          title:
            'Worked as a team player, seeking inputs and collaborating with you and team members in project and tasks execution',
          rateValues: [
            {
              value: 1,
            },
            {
              value: 2,
            },
            {
              value: 3,
            },
            {
              value: 4,
            },
            {
              value: 5,
            },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Communication',
      elements: [
        {
          type: 'smileyRating',
          name: 'q2_communication',
          title: 'Communicated in a clear, concise and structured manner',
          rateType: 'smileys',
          rateValues: [
            {
              value: 1,
            },
            {
              value: 2,
            },
            {
              value: 3,
            },
            {
              value: 4,
            },
            {
              value: 5,
            },
          ],
          minRateDescription: 'Unhappy',
          maxRateDescription: 'Delighted',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q2_comments',
          title: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Leadership',
      elements: [
        {
          type: 'numberRating',
          rateType: 'numberRating',
          name: 'q3_leadership',
          title:
            'Took initiative in leading team for tasks to be accomplished and recognized team members for their efforts',
          rateValues: [
            { value: 1, text: '01' },
            { value: 2, text: '02' },
            { value: 3, text: '03' },
            { value: 4, text: '04' },
            { value: 5, text: '05' },
          ],
          minRateDescription: 'Strongly Disagree',
          maxRateDescription: 'Strongly Agree',
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q3_comments',
          title: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Ownership',
      elements: [
        {
          type: 'numberRating',
          rateType: 'numberRating',
          name: 'q4_ownership',
          title:
            'Took ownership of delivering quality output while pushing to deliver exceptional results from self and other team members',
          rateValues: [
            { value: 1, text: '01' },
            { value: 2, text: '02' },
            { value: 3, text: '03' },
            { value: 4, text: '04' },
            { value: 5, text: '05' },
          ],
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q4_comments',
          title: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Analytical Thinking',
      elements: [
        {
          type: 'numberRating',
          rateType: 'numberRating',
          name: 'q5_analytical_thinking',
          title:
            'Analyzed task objectives and context before execution and applied acquired knowledge and skills for better project execution',
          rateValues: [
            { value: 1, text: '01' },
            { value: 2, text: '02' },
            { value: 3, text: '03' },
            { value: 4, text: '04' },
            { value: 5, text: '05' },
          ],
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q5_comments',
          title: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Innovative Thinking',
      elements: [
        {
          type: 'rating',
          rateType: 'stars',
          name: 'q6_innovative_thinking',
          title: 'Generated novel, innovative ideas and solutions to challenges presented within project or tasks',
          rateValues: [
            {
              value: 1,
              text: 'Strongly Disagree',
            },
            {
              value: 2,
            },
            {
              value: 3,
            },
            {
              value: 4,
            },
            {
              value: 5,
              text: 'Strongly Agree',
            },
          ],
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'q6_comments',
          title: 'Please type here',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Improvement',
      elements: [
        {
          type: 'areacheckbox',
          name: 'areas_of_development',
          title: 'Areas of Development',
          choices: [
            'Area of development 1',
            'Area of development 2',
            'Area of development 3',
            'Area of development 4',
            'Other',
          ],
          isRequired: false,
        },
      ],
    },
    {
      name: 'Feedback',
      elements: [
        {
          type: 'comment',
          name: 'qualitative_feedback',
          title: 'Qualitative Feedback',
          isRequired: false,
        },
      ],
    },
    {
      name: 'Recognition',
      elements: [
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
          isRequired: false,
        },
        {
          type: 'comment',
          name: 'recognition_comment',
          title: 'Your comment (Required)',
          isRequired: false,
        },
      ],
    },
  ],
  showProgressBar: 'top',
  progressBarType: 'buttons',
  completeText: 'Submit',
};
