import { RecognitionSource } from '../constraints/enums/core-enums';
import { Competency } from '../constraints/enums/miscellaneous-enums';

export const mockCompetencies = [
  { id: 'comp_1', name: 'Communication' },
  { id: 'comp_2', name: 'Problem Solving' },
  { id: 'comp_3', name: 'Leadership' },
  { id: 'comp_4', name: 'Technical Skills' },
  { id: 'comp_5', name: 'Collaboration' },
  { id: 'comp_6', name: 'Initiative' },
];

export const mockUsers = [
  {
    id: 'user_1',
    name: 'John Smith',
    profileImage: 'https://example.com/profiles/john.jpg',
    designation: 'Frontend Developer',
    averageRating: 4.5,
    appreciationScore: 3,
  },
  {
    id: 'user_2',
    name: 'Sarah Wilson',
    designation: 'UX Designer',
    averageRating: 4.8,
  },
  {
    id: 'user_3',
    name: 'Michael Chen',
    profileImage: 'https://example.com/profiles/michael.jpg',
    designation: 'Backend Developer',
    appreciationScore: 2,
  },
  {
    id: 'user_4',
    name: 'Emma Davis',
    designation: 'Project Manager',
    averageRating: 4.2,
  },
];

export const mockMilestones = {
  metadata: {
    current_page: 1,
    page_size: 10,
    total_records: 10,
    has_next_page: false,
  },
  data: [
    { _id: '1', name: 'Milestone 1' },
    { _id: '2', name: 'Milestone 2' },
  ],
};

export const mockRecognitions = [
  {
    clientInfo: {
      name: 'Jane Cooper',
      profileImage: 'https://example.com/profiles/jane.jpg',
      designation: 'Engineering Manager',
      company: 'Tech Corp',
    },
    type: RecognitionSource.QUICK_ACTIONS,
    milestoneNumber: 1,
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    selectedCompetencies: [
      { id: 'comp_1', name: Competency.COMMUNICATION },
      { id: 'comp_3', name: Competency.LEADERSHIP },
      { id: 'comp_5', name: Competency.COLLABORATION },
    ],
    comment:
      'Excellent leadership shown in the recent project. Great communication with stakeholders and team collaboration.',
  },
  {
    clientInfo: {
      name: 'Robert Fox',
      profileImage: 'https://example.com/profiles/robert.jpg',
      designation: 'Product Manager',
      company: 'Innovation Labs',
    },
    type: RecognitionSource.FEEDBACK,
    milestoneNumber: 2,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    selectedCompetencies: [{ id: 'comp_2', name: Competency.PROBLEM_SOLVING }],
    comment: 'Demonstrated strong problem-solving skills and technical expertise in implementing complex features.',
  },
  {
    clientInfo: {
      name: 'Leslie Alexander',
      profileImage: 'https://example.com/profiles/leslie.jpg',
      designation: 'Senior Developer',
      company: 'Tech Corp',
    },
    type: RecognitionSource.QUICK_ACTIONS,
    milestoneNumber: 1,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    selectedCompetencies: [
      { id: 'comp_4', name: Competency.PROBLEM_SOLVING },
      { id: 'comp_5', name: Competency.COLLABORATION },
    ],
    comment: 'Shows great initiative in learning new technologies and collaborates well with the development team.',
  },
];
