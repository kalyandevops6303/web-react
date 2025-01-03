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
