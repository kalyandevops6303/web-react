import { Box, CreditCard, FileText, Star, Users, HardDrive } from 'react-feather';

const stepName = {
  team: 'Team',
  bid: 'Bid',
  milestone: 'Milestone',
  payment: 'Payment',
  rating: 'Rating',
  project: 'Project',
  milestoneDetails: 'Milestone-Details',
  infrastructure: 'Infrastructure',
};

const steps = [
  {
    title: stepName.team,
    subtitle: 'Team members',
    icon: <Users size={18} />,
  },
  {
    title: stepName.bid,
    subtitle: 'Project bid status',
    icon: <FileText size={18} />,
  },
  {
    title: stepName.milestone,
    subtitle: 'Status & dispute',
    icon: <Box size={18} />,
    isDisabled: true,
  },
  {
    title: stepName.payment,
    subtitle: 'Pay transaction',
    icon: <CreditCard size={18} />,
    isDisabled: true,
  },
  {
    title: stepName.rating,
    subtitle: 'Give and get ratings',
    icon: <Star size={18} />,
    isDisabled: true,
  },
];

const infrastructureStep = {
  title: stepName.infrastructure,
  subtitle: 'Manage resources',
  icon: <HardDrive size={18} />,
  isDisabled: true,
}

const InviteView = [
  {
    title: stepName.project,
    subtitle: 'About work details',
    icon: <Box size={18} />,
  },
  {
    title: stepName.milestone,
    subtitle: 'Status & dispute',
    icon: <Box size={18} />,
    isDisabled: false,
  },
  {
    title: stepName.payment,
    subtitle: 'Pay transaction',
    icon: <CreditCard size={18} />,
    isDisabled: true,
  },
  {
    title: stepName.rating,
    subtitle: 'Give and get ratings',
    icon: <Star size={18} />,
    isDisabled: true,
  },
];

const currentProfile = {
  _id: '6486b30ba51384fb6948e724',
  currency_preference: {
    _id: '6475a97308b60176c1a25c20',
    code: 'INR',
    name: 'Indian National Rupee',
  },
  languages_write: [],
  first_name: 'Rajat',
  user_id: '6486b2b2b03b9ecd06909871',
  last_name: 'Petwal',
  image_uri: '',
  projects_worked_on_count: 0,
  languages_read: [],
  social_links: [
    {
      platform: 'linkedIn',
      url: 'https://linkedin.com/user=1122',
    },
  ],
  tagline: 'Professional Procrastinator',
  languages_speak: [],
  educational_institute: [
    {
      institution: {
        _id: '648317fe99d9a45dd6e9b855',
        name: 'Graphic Era University',
      },
      education: {
        _id: '64830f8cb03b9ecd069097e5',
        name: 'Bachelor of Technology',
      },
    },
  ],
  hourly_rate: 80,
  work_experience: 12,
  rating: 4,
  professional_intro: 'I am what you can call a blockchain enthusiast',
  role: {
    _id: '6486a8e3e402d96bc5d28d36',
    name: 'AI Engineer',
  },
  current_residency: {
    country: {
      _id: '6479c2071183add75cda4db1',
      code: 'IN',
      name: 'India',
    },
    state: {
      _id: '6479c620a93f95115d35924c',
      name: 'Uttarakhand',
    },
    city: {
      _id: '6479ed63fe992bcffe295c67',
      name: 'Dehradun',
    },
    street_address: '',
    house_number: '',
    zip_code: '',
  },
  expertise: {
    skills: [
      {
        _id: '6486a65e34730cac6a480442',
        name: 'Cryptography',
      },
      {
        _id: '6486a65e34730cac6a480456',
        name: 'Hadoop',
      },
      {
        _id: '6486a65e34730cac6a480470',
        name: 'Python',
      },
      {
        _id: '6486a65e34730cac6a480479',
        name: 'RESTful APIs',
      },
    ],
    tools: [
      {
        _id: '6486a6c33cf46b7a02d8be1f',
        name: 'Git',
      },
      {
        _id: '6486a6c33cf46b7a02d8be78',
        name: 'React',
      },
    ],
    certificates: [],
  },
  availability: {
    timezone: {
      _id: '6479f0fafe992bcffe2ab719',
      offset: 19800,
      offset_name: 'UTC+05:30',
      name: 'Asia/Kolkata',
      abbreviation: 'IST',
    },
    weekdays_avl: {
      start_time: 10,
      end_time: 18,
      days: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
    },
    weekends_avl: {
      end_time: null,
      start_time: null,
    },
  },
  user_type: 'TALENT',
  is_favourite: false,
  is_alma_mater: false,
};
const dummyText =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam.</p><p><strong>Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. </strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felisLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam. Id nibh tortor id aliquet lectus proin nibh. Donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis</p>';

const Members = [
  {
    name: 'Bob',
    role: 'Developer',
  },
  {
    name: 'Dev',
    role: 'Designer',
  },
  {
    name: 'David',
    role: 'Developer',
  },
  {
    name: 'Jack',
    role: 'Developer',
  },
];
export { steps, stepName, infrastructureStep, currentProfile, dummyText, Members, InviteView };
