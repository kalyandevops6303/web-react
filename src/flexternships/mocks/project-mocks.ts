export const projectMock = {
  id: '1',
  name: 'Sample Project Name',
  description: 'A comprehensive project focused on user experience design and research',
  department: 'Design Department',
  cohort: 'UX Design Cohort 2024',
  milestone: 'Milestone 2',
  isNew: true,
  progress: 50,
  teamMembers: [
    { name: 'John Doe', avatar: 'John Doe' },
    { name: 'Prashant Kumar', avatar: 'Prashant Kumar' },
    { name: 'Rajesh Garewal', avatar: 'Rajesh Garewal' },
    { name: 'Lokesh Kumar', avatar: 'Lokesh Kumar' },
  ],
  additionalTeamMembers: 3,
  cohortSkills: ['UX Design', 'UI Design', 'User Research'],
  additionalCohortSkills: 3,
  projectSkills: ['UX Design', 'UI Design', 'User Research'],
  additionalProjectSkills: 4,
  actionsRequired: [
    {
      type: 'feedback',
      label: 'Give Feedback',
      estimatedTime: '3min 30sec',
    },
  ],
  milestones: [
    { id: 'M1', name: 'M1', avatar: 'John Doe' },
    { id: 'M2', name: 'M1', avatar: 'John Doe' },
    { id: 'M3', name: 'M1', avatar: 'John Doe' },
  ],
};
