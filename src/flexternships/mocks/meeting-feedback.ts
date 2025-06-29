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
  // {
  //   value: 'Improvement',
  //   identifier: 'h7',
  //   backgroundColor: '#0DA8B21F',
  //   color: '#0DA8B2',
  //   inputConfig: {
  //     type: MilestoneFeedbackInputCellType.DROPDOWN,
  //     options: [
  //       { label: 'Excellent', value: 'excellent' },
  //       { label: 'Good', value: 'good' },
  //       { label: 'Needs Improvement', value: 'needs_improvement' },
  //     ],
  //     placeholder: 'Area of Development',
  //     isMultiSelect: true,
  //   },
  // },
  // {
  //   value: 'Recognition',
  //   identifier: 'h8',
  //   backgroundColor: '#584CDB1F',
  //   color: '#584CDB',
  //   inputConfig: {
  //     type: MilestoneFeedbackInputCellType.DROPDOWN,
  //     options: [
  //       { label: 'Wow', value: 'wow' },
  //       { label: 'Not Applicable', value: 'na' },
  //     ],
  //     placeholder: 'Select recognition',
  //   },
  // },
  // {
  //   value: 'Competency',
  //   identifier: 'h9',
  //   backgroundColor: '#FF57331F',
  //   color: '#FF5733',
  //   inputConfig: {
  //     type: MilestoneFeedbackInputCellType.DROPDOWN,
  //     options: [
  //       { label: 'Communication', value: 'communication' },
  //       { label: 'Collaboration', value: 'collaboration' },
  //       { label: 'Leadership', value: 'leadership' },
  //       { label: 'Effectiveness', value: 'effectiveness' },
  //       { label: 'Problem Solving', value: 'problem_solving' },
  //       { label: 'Innovation', value: 'innovation' },
  //       { label: 'Improvement', value: 'improvement' },
  //     ],
  //     placeholder: 'Select competency',
  //     isMultiSelect: true,
  //   },
  // },
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
  { value: 'Feedback', identifier: 'feedback', width: 400 },
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
