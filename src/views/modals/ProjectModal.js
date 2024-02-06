/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { ChevronRight, FileText } from 'react-feather';
import React from 'react';
import Proptypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  CardText,
  Button,
  Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import AvatarGroup from '@components/avatar-group';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import styled from 'styled-components';
import DateTime from '../../lib/date-time';
import theme from '../../configs/themeVariables';
import BadgeGroup from '../../@core/components/badge-group';
import '../custom-styles.scss';
import AvailableTimeComp from '../../@core/components/available-time-comp';
import { userTypes } from '../../utility/constants/Constant';
import { getCheckBid } from '../../redux/actions/createBidActions';
import { checkBidLoading } from '../../redux/selectors/createBidSelectors';
import { selectSavedUserData, selectUserData } from '../../redux/selectors/authSelectors';
import ShowToastMessage from '../../@core/components/toast';
import { ERROR } from '../../utility/constants/ToastTypes';
import { profilePercentage } from '../../redux/selectors/dashboardSelectors';
import { downloadFile } from '../../utility/Utils';

const DATA = [
  {
    currency_preference: {
      _id: '6478b0d1679b91d695ad534a',
      name: 'US Dollar',
      code: 'USD',
    },
    current_residency: {
      country: {
        _id: '6479c2071183add75cda4db1',
        latitude: '20.00000000',
        code: 'IN',
        dial_code: '91',
        name: 'India',
        longitude: '77.00000000',
      },
      state: {
        _id: '6479c620a93f95115d359232',
        country_id: '6479c2071183add75cda4db1',
        name: 'Delhi',
      },
      city: {
        _id: '6479ed63fe992bcffe294f9b',
        name: 'South West Delhi',
        country_id: '6479c2071183add75cda4db1',
        state_id: '6479c620a93f95115d359232',
      },
      street_address: 'WZA - 5',
      house_number: '420',
      zip_code: '110028',
    },
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
      {
        institution: {
          _id: '648317fe99d9a45dd6e9bac1',
          name: 'University of Petroleum and Energy Studies',
        },
        education: {
          _id: '64830f8cb03b9ecd069097fe',
          name: 'Master of Information Technology',
        },
      },
    ],
    expertise: {
      skills: [
        {
          _id: '6486a65e34730cac6a48042f',
          name: 'AngularJS',
        },
        {
          _id: '6486a65e34730cac6a480430',
          name: 'Ansible',
        },
        {
          _id: '6486a65e34730cac6a480431',
          name: 'Apache Kafka',
        },
        {
          _id: '6486a65e34730cac6a480432',
          name: 'Apache Spark',
        },
        {
          _id: '6486a65e34730cac6a480436',
          name: 'AWS (Amazon Web Services)',
        },
      ],
      tools: [
        {
          _id: '6486a6c33cf46b7a02d8bde2',
          name: 'AB Tasty',
        },
        {
          _id: '6486a6c33cf46b7a02d8bde3',
          name: 'Amazon AI Services',
        },
        {
          _id: '6486a6c33cf46b7a02d8bdf2',
          name: 'AWS CloudFormation',
        },
        {
          _id: '6486a6c33cf46b7a02d8bdf3',
          name: 'AWS CodeDeploy',
        },
        {
          _id: '6486a6c33cf46b7a02d8bdf4',
          name: 'AWS Lambda',
        },
      ],
      certificates: [
        {
          _id: '6487fa81e8bacbd0978a5641',
          name: 'Adobe Certified Expert (ACE) - Adobe Experience Manager Developer',
        },
        {
          _id: '6487fb571c9a617ebd3d4e50',
          name: 'AWS Certified Developer - Associate',
        },
        {
          _id: '6487fb571c9a617ebd3d4e51',
          name: 'AWS Certified Solutions Architect - Associate',
        },
        {
          _id: '6487fb571c9a617ebd3d4e56',
          name: 'Certified Data Management Professional (CDMP)',
        },
        {
          _id: '6487fb571c9a617ebd3d4e58',
          name: 'Certified Data Scientist (CDS)',
        },
      ],
    },
    first_name: 'Nilesh',
    hourly_rate: 1500,
    image_uri:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/785c3ee3-8718-40d8-889e-40501afb4f53.jpeg',
    languages_read: [
      {
        _id: '64831445a51384fb6948e678',
        name: 'English',
      },
    ],
    languages_speak: [
      {
        _id: '64831445a51384fb6948e678',
        name: 'English',
      },
    ],
    languages_write: [
      {
        _id: '64831445a51384fb6948e678',
        name: 'English',
      },
    ],
    last_name: 'Talent 1',
    professional_intro:
      'Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big',
    projects_worked_on_count: 2,
    rating: 3,
    role: {
      _id: '6486a8e3e402d96bc5d28d55',
      name: 'Cryptographer',
    },
    social_links: [
      {
        platform: 'linkedIn',
        url: 'https://linkedin.com',
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com',
      },
    ],
    tagline: 'Nilesh talent 1 tagline',
    work_experience: 18,
    resume: {
      file_name: 'sample.pdf',
      file_key: 'resumes/64ff004ef2e6af73ce49c41d/07c8c9da-56f9-492c-b08b-fb5a46d12a40.pdf',
      download_url: '',
      size: 3028,
      created_at: 1701845662597,
    },
  },
  {
    _id: '64ff01b2f2e6af73ce49c45c',
    introduction: "Let's dope guys Let's dope guys Let's dope guys Let's dope guys Let's dope guys",
    tools: [
      {
        _id: '6486a6c33cf46b7a02d8bde2',
        name: 'AB Tasty',
      },
      {
        _id: '6486a6c33cf46b7a02d8bde3',
        name: 'Amazon AI Services',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf2',
        name: 'AWS CloudFormation',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf3',
        name: 'AWS CodeDeploy',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf4',
        name: 'AWS Lambda',
      },
    ],
    languages_supported: [
      {
        _id: '64831445a51384fb6948e6a7',
        name: 'Algerian Spoken Arabic',
      },
      {
        _id: '64831445a51384fb6948e6ac',
        name: 'Amharic',
      },
      {
        _id: '64831445a51384fb6948e6bc',
        name: 'Afrikaans',
      },
      {
        _id: '64831445a51384fb6948e6c2',
        name: 'Assamese',
      },
    ],
    tagline: 'Doping happening here',
    team_logo:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/4afbb1e2-f20f-4e44-8f79-1e44b3866c4f.jpeg',
    services: [
      {
        _id: '64cce2b52fae55f2dfd21af2',
        name: 'Hardware',
      },
      {
        _id: '64cce2bc2fae55f2dfd21af4',
        name: 'Business',
      },
      {
        _id: '64cce2c42fae55f2dfd21af6',
        name: 'Engineering',
      },
      {
        _id: '64cce2ef2fae55f2dfd21af8',
        name: 'Law',
      },
      {
        _id: '64cce2ef2fae55f2dfd21af9',
        name: 'Medical',
      },
    ],
    skills: [
      {
        _id: '6486a65e34730cac6a48042a',
        name: '.NET Core',
      },
      {
        _id: '6486a65e34730cac6a48042b',
        name: '.NET Framework',
      },
      {
        _id: '6486a65e34730cac6a48042c',
        name: 'Accessibility',
      },
      {
        _id: '6486a65e34730cac6a480434',
        name: 'ASP.NET',
      },
      {
        _id: '6486a65e34730cac6a480436',
        name: 'AWS (Amazon Web Services)',
      },
    ],
    availability: {
      timezone: {
        _id: '6479f0fafe992bcffe2ab7bd',
        offset: 19800,
        offset_name: 'UTC+05:30',
        name: 'Asia/Colombo',
        abbreviation: 'IST',
      },
      weekdays_avl: {
        start_time: 9,
        end_time: 18,
        days: ['TUESDAY', 'WEDNESDAY', 'THURSDAY'],
      },
      weekends_avl: {
        start_time: 16,
        end_time: 18,
        days: ['SUNDAY'],
      },
    },
    created_by: {
      user_id: '64ff004ef2e6af73ce49c41d',
      first_name: 'Nilesh',
      hourly_rate: 1500,
      image_uri:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/785c3ee3-8718-40d8-889e-40501afb4f53.jpeg',
      last_name: 'Talent 1',
      professional_intro:
        'Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big',
      projects_worked_on_count: 2,
      rating: 3,
      tagline: 'Nilesh talent 1 tagline',
      work_experience: 18,
    },
    name: 'Dope Team',
    rating: 5,
    team_type: 'TEAM',
    interests: [],
    education_institute: [],
    total_project_cost: 1,
    user_type: 'TEAM',
    team_members: [
      {
        user_id: '64ff004ef2e6af73ce49c41d',
        member_type: 'MEMBER',
        first_name: 'Nilesh',
        last_name: 'Talent 1',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/785c3ee3-8718-40d8-889e-40501afb4f53.jpeg',
        projects_worked_on_count: 2,
        tagline: 'Nilesh talent 1 tagline',
        hourly_rate: 1500,
        work_experience: 18,
        rating: 3,
        professional_intro:
          'Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big',
      },
      {
        user_id: '64fd7e1af2e6af73ce49b114',
        member_type: 'MEMBER',
        first_name: 'Kartik',
        last_name: 'Verma',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64fd7e1af2e6af73ce49b114/9059a28c-7f86-43e9-a768-d17a75d25fb4.jpg',
        projects_worked_on_count: 0,
        tagline: 'tagline',
        hourly_rate: 10,
        work_experience: 17,
        rating: 4,
        professional_intro: 'Kartik intro',
      },
      {
        member_type: 'MEMBER',
        user_id: '6513c64b50c402d4cc056efd',
        first_name: 'Nilesh',
        last_name: 'Talent 2',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/6513c64b50c402d4cc056efd/593c2bc1-41a5-448b-829b-975b3cf4083d.png',
        projects_worked_on_count: 0,
        tagline: 'Normal tagline still perfect',
        hourly_rate: 1361,
        work_experience: 149,
        rating: 0,
        professional_intro: "I'm a okaish back-end developer with okay okay skills.",
      },
      {
        member_type: 'MEMBER',
        user_id: '6513cba150c402d4cc056f5c',
        first_name: 'Nilesh',
        last_name: 'Talent three',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/6513cba150c402d4cc056f5c/a04786ab-a92e-4ce3-a87e-b2073f38f136.jpeg',
        projects_worked_on_count: 0,
        tagline: "I'm a noob developer",
        hourly_rate: 559,
        work_experience: 29,
        rating: 0,
        professional_intro: "Yo bros, I'm a noob developer. Lets develop some noob applications",
      },
    ],
    team_members_count: 4,
    is_read: false,
    is_overall_read: 5,
    project: {},
  },
  {
    _id: '65043952f094aff6d57d53ee',
    created_by: {
      last_name: 'Sachdev',
      projects_worked_on_count: 0,
      tagline: 'Experienced business intelligence manager',
      professional_intro:
        'Trumio enables University teams and Clients to set up and execute projects assisted with AI.',
      user_id: '65040c2bf094aff6d57d4ea1',
      work_experience: 0,
      rating: 0,
      hourly_rate: 55,
      image_uri:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/65040c2bf094aff6d57d4ea1/dfe7fe24-8eec-4d81-bd58-497cb3f6081d.png',
      first_name: 'Puneet',
    },
    name: 'WowLabz',
    team_logo:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/6502c09346685ea5cb51c98e/299a357d-43d0-4112-84b9-dcdb1b5e19aa.jpg',
    tagline: 'Wow',
    tools: [],
    availability: {
      timezone: {
        _id: '6479f0fafe992bcffe2ab719',
        offset_name: 'UTC+05:30',
        abbreviation: 'IST',
        name: 'Asia/Kolkata',
        offset: 19800,
      },
      weekdays_avl: {
        start_time: 9,
        end_time: 15,
        days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
      },
    },
    skills: [
      {
        _id: '6486a65e34730cac6a48042d',
        name: 'Agile Development Methodologies',
      },
      {
        _id: '6486a65e34730cac6a480431',
        name: 'Apache Kafka',
      },
      {
        _id: '6486a65e34730cac6a480439',
        name: 'Bootstrap',
      },
      {
        _id: '6486a65e34730cac6a480440',
        name: 'Continuous Integration/Continuous Deployment (CI/CD)',
      },
      {
        _id: '6486a65e34730cac6a480445',
        name: 'Data Visualization',
      },
    ],
    services: [
      {
        _id: '64cce2872fae55f2dfd21af0',
        name: 'Software',
      },
      {
        _id: '64cce2bc2fae55f2dfd21af4',
        name: 'Business',
      },
      {
        _id: '64cce2c42fae55f2dfd21af6',
        name: 'Engineering',
      },
      {
        _id: '64cce2ef2fae55f2dfd21af8',
        name: 'Law',
      },
      {
        _id: '64cce2ef2fae55f2dfd21afb',
        name: 'Other',
      },
    ],
    introduction: 'Introduction',
    languages_supported: [
      {
        _id: '64831445a51384fb6948e6ba',
        name: 'Malay',
      },
      {
        _id: '64831445a51384fb6948e6c2',
        name: 'Assamese',
      },
    ],
    team_type: 'TEAM',
    interests: [],
    education_institute: [],
    total_project_cost: 0,
    user_type: 'TEAM',
    team_members: [
      {
        user_id: '65040c2bf094aff6d57d4ea1',
        member_type: 'MEMBER',
        first_name: 'Puneet',
        last_name: 'Sachdev',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/65040c2bf094aff6d57d4ea1/dfe7fe24-8eec-4d81-bd58-497cb3f6081d.png',
        projects_worked_on_count: 0,
        tagline: 'Experienced business intelligence manager',
        hourly_rate: 55,
        work_experience: 0,
        rating: 0,
        professional_intro:
          'Trumio enables University teams and Clients to set up and execute projects assisted with AI.',
      },
      {
        user_id: '6502c09346685ea5cb51c98e',
        member_type: 'MEMBER',
        first_name: 'Jos',
        last_name: 'Kalliath',
        image_uri: 'https://lh3.googleusercontent.com/a/ACg8ocIG4XiKMN3TiagHMHQPrNBiWVO5PBfe7FRF45DLK9m6=s96-c',
        projects_worked_on_count: 1,
        tagline: 'Crafting engaging web experiences with code and creativity',
        hourly_rate: 25,
        work_experience: 26,
        rating: 5,
        professional_intro:
          "Experienced front-end developer passionate about creating seamless web experiences through code and design wizardry. Let's innovate together",
      },
      {
        user_id: '64f845dc320fd53c1c319bae',
        member_type: 'MEMBER',
        first_name: 'Talent',
        last_name: '007',
        image_uri: '',
        projects_worked_on_count: 0,
        tagline: '123',
        hourly_rate: 1.1,
        work_experience: 0,
        rating: 0,
        professional_intro: '123',
      },
      {
        user_id: '64ff004ef2e6af73ce49c41d',
        member_type: 'MEMBER',
        first_name: 'Nilesh',
        last_name: 'Talent 1',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/785c3ee3-8718-40d8-889e-40501afb4f53.jpeg',
        projects_worked_on_count: 2,
        tagline: 'Nilesh talent 1 tagline',
        hourly_rate: 1500,
        work_experience: 18,
        rating: 3,
        professional_intro:
          'Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big',
      },
    ],
    team_members_count: 4,
    is_read: false,
    is_overall_read: 5,
    project: {},
  },
  {
    _id: '65a77dac44198fb05e4ccf14',
    services: [
      {
        _id: '64cce2872fae55f2dfd21af0',
        name: 'Software',
      },
      {
        _id: '64cce2b52fae55f2dfd21af2',
        name: 'Hardware',
      },
      {
        _id: '64cce2bc2fae55f2dfd21af4',
        name: 'Business',
      },
      {
        _id: '64cce2c42fae55f2dfd21af6',
        name: 'Engineering',
      },
      {
        _id: '64cce2ef2fae55f2dfd21afa',
        name: 'Sciences',
      },
    ],
    rating: 0,
    team_logo:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/2da5094e-798c-4491-8451-464be6d77838.jpg',
    name: 'The Gangsters',
    team_type: 'TEAM',
    availability: {
      timezone: {
        _id: '6479f0fafe992bcffe2ab719',
        offset_name: 'UTC+05:30',
        abbreviation: 'IST',
        name: 'Asia/Kolkata',
        offset: 19800,
      },
      weekdays_avl: {
        start_time: 1,
        end_time: 5,
        days: ['TUESDAY', 'THURSDAY'],
      },
    },
    tools: [
      {
        _id: '6486a6c33cf46b7a02d8bde2',
        name: 'AB Tasty',
      },
      {
        _id: '6486a6c33cf46b7a02d8bde3',
        name: 'Amazon AI Services',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf2',
        name: 'AWS CloudFormation',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf3',
        name: 'AWS CodeDeploy',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf4',
        name: 'AWS Lambda',
      },
    ],
    introduction: 'We are the gangsters here!!!',
    tagline: 'Gang Gang peeps',
    skills: [
      {
        _id: '6486a65e34730cac6a48042a',
        name: '.NET Core',
      },
      {
        _id: '6486a65e34730cac6a48042b',
        name: '.NET Framework',
      },
      {
        _id: '654389faa60c648621a70708',
        name: 'AI Engineering',
      },
      {
        _id: '654389faa60c648621a70761',
        name: '3D Studio Max',
      },
      {
        _id: '654389faa60c648621a707a4',
        name: 'A/B Testing Tools',
      },
    ],
    languages_supported: [
      {
        _id: '64831445a51384fb6948e678',
        name: 'English',
      },
    ],
    created_by: {
      user_id: '64ff004ef2e6af73ce49c41d',
      first_name: 'Nilesh',
      hourly_rate: 1500,
      image_uri:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/785c3ee3-8718-40d8-889e-40501afb4f53.jpeg',
      last_name: 'Talent 1',
      professional_intro:
        'Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big',
      projects_worked_on_count: 2,
      rating: 3,
      tagline: 'Nilesh talent 1 tagline',
      work_experience: 18,
    },
    interests: [],
    education_institute: [],
    total_project_cost: 0,
    user_type: 'TEAM',
    team_members: [
      {
        user_id: '64ff004ef2e6af73ce49c41d',
        member_type: 'MEMBER',
        first_name: 'Nilesh',
        last_name: 'Talent 1',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/785c3ee3-8718-40d8-889e-40501afb4f53.jpeg',
        projects_worked_on_count: 2,
        tagline: 'Nilesh talent 1 tagline',
        hourly_rate: 1500,
        work_experience: 18,
        rating: 3,
        professional_intro:
          'Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big',
      },
    ],
    team_members_count: 1,
    is_read: false,
    is_overall_read: 5,
    project: {},
  },
  {
    _id: '6555ecbe24bdfe4c836a7e27',
    services: [
      {
        _id: '64cce2872fae55f2dfd21af0',
        name: 'Software',
      },
      {
        _id: '64cce2b52fae55f2dfd21af2',
        name: 'Hardware',
      },
      {
        _id: '64cce2bc2fae55f2dfd21af4',
        name: 'Business',
      },
      {
        _id: '64cce2c42fae55f2dfd21af6',
        name: 'Engineering',
      },
      {
        _id: '64cce2ef2fae55f2dfd21af9',
        name: 'Medical',
      },
    ],
    skills: [
      {
        _id: '6486a65e34730cac6a48042a',
        name: '.NET Core',
      },
      {
        _id: '6486a65e34730cac6a48042b',
        name: '.NET Framework',
      },
      {
        _id: '654389faa60c648621a70761',
        name: '3D Studio Max',
      },
      {
        _id: '654389faa60c648621a707a4',
        name: 'A/B Testing Tools',
      },
    ],
    languages_supported: [
      {
        _id: '64831445a51384fb6948e678',
        name: 'English',
      },
    ],
    introduction: 'We do a LOT of trekking!!!!!!!',
    team_type: 'TEAM',
    created_by: {
      user_id: '64ff004ef2e6af73ce49c41d',
      first_name: 'Nilesh',
      hourly_rate: 1500,
      image_uri:
        'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/785c3ee3-8718-40d8-889e-40501afb4f53.jpeg',
      last_name: 'Talent 1',
      professional_intro:
        'Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big',
      projects_worked_on_count: 2,
      rating: 3,
      tagline: 'Nilesh talent 1 tagline',
      work_experience: 18,
    },
    availability: {
      timezone: {
        _id: '6479f0fafe992bcffe2ab719',
        offset_name: 'UTC+05:30',
        abbreviation: 'IST',
        name: 'Asia/Kolkata',
        offset: 19800,
      },
      weekends_avl: {
        start_time: 12,
        end_time: 18,
        days: ['SUNDAY', 'SATURDAY'],
      },
    },
    rating: 0,
    tools: [
      {
        _id: '6486a6c33cf46b7a02d8bde2',
        name: 'AB Tasty',
      },
      {
        _id: '6486a6c33cf46b7a02d8bde3',
        name: 'Amazon AI Services',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf2',
        name: 'AWS CloudFormation',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf3',
        name: 'AWS CodeDeploy',
      },
      {
        _id: '6486a6c33cf46b7a02d8bdf4',
        name: 'AWS Lambda',
      },
    ],
    name: 'The Trekkers',
    team_logo:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/6b39a75e-96c1-4182-bd3a-8f3bb130db9d.jpeg',
    tagline: 'We are the trekkers',
    interests: [],
    education_institute: [],
    total_project_cost: 0,
    user_type: 'TEAM',
    team_members: [
      {
        user_id: '64ff004ef2e6af73ce49c41d',
        member_type: 'MEMBER',
        first_name: 'Nilesh',
        last_name: 'Talent 1',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/785c3ee3-8718-40d8-889e-40501afb4f53.jpeg',
        projects_worked_on_count: 2,
        tagline: 'Nilesh talent 1 tagline',
        hourly_rate: 1500,
        work_experience: 18,
        rating: 3,
        professional_intro:
          'Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big Pro intro big',
      },
      {
        user_id: '6513c64b50c402d4cc056efd',
        member_type: 'MEMBER',
        first_name: 'Nilesh',
        last_name: 'Talent 2',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/6513c64b50c402d4cc056efd/593c2bc1-41a5-448b-829b-975b3cf4083d.png',
        projects_worked_on_count: 0,
        tagline: 'Normal tagline still perfect',
        hourly_rate: 1361,
        work_experience: 149,
        rating: 0,
        professional_intro: "I'm a okaish back-end developer with okay okay skills.",
      },
      {
        member_type: 'MEMBER',
        user_id: '6513cba150c402d4cc056f5c',
        first_name: 'Nilesh',
        last_name: 'Talent three',
        image_uri:
          'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/6513cba150c402d4cc056f5c/a04786ab-a92e-4ce3-a87e-b2073f38f136.jpeg',
        projects_worked_on_count: 0,
        tagline: "I'm a noob developer",
        hourly_rate: 559,
        work_experience: 29,
        rating: 0,
        professional_intro: "Yo bros, I'm a noob developer. Lets develop some noob applications",
      },
    ],
    team_members_count: 3,
    is_read: false,
    is_overall_read: 5,
    project: {},
  },
];

const ViewProjectDetailModalWrap = styled.div`
  .card-header {
    border-bottom: 1px solid ${theme.cardHeaderBorderColor};
    padding: 1.6rem 1.6rem 0.8rem;
  }
  .card-body {
    padding: 1.6rem !important;
  }
  .card-photo {
    height: 2.4rem;
    border-radius: 50%;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
    border: 2px solid white;
  }
  .title {
    font-weight: 400;
    font-size: 14px;
  }
  .rating-label {
    color: ${theme.bodyColor};
    font-weight: 300;
  }
  .project-name {
    font-size: 16px;
  }
  .project-desc {
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
  }

  .badge {
    width: fit-content !important;
    display: initial !important;
  }
`;

const ProjectModal = ({
  isUpcomingProject,
  isActiveProject,
  modal,
  toggleModal,
  data,
  setCreateBidModal,
  setSelectedProject,
  toggleCompleteProfileModal,
  setSwitchProfileModal,
  setRelistConfirmationModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const checkBidLoadingIsLoading = useSelector(checkBidLoading);
  const selectUserDetailsData = useSelector(selectUserData);
  const selectSavedUserDetailsData = useSelector(selectSavedUserData);
  const profilePercentageData = useSelector(profilePercentage);

  const expextedDuration = data?.details ? data?.details?.expected_duration : data?.expected_duration;

  const onNoBidFound = () => {
    toggleModal();
    setCreateBidModal(true);
  };

  const onBidFound = (bidData) => {
    const { bid_id, bid_type, project_type, entity, workers, milestones, status } = bidData;

    if (status !== 'DRAFT') {
      ShowToastMessage(ERROR, 'You have already submitted a bid for this project');
    } else {
      toggleModal();
      if (entity === userTypes.talent) {
        if (milestones) {
          navigate(`/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/preview`);
        } else {
          navigate(
            `/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/milestone`,
          );
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (milestones && workers) {
          navigate(`/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/preview`);
        } else if (workers && !milestones) {
          navigate(
            `/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/milestone`,
          );
        } else if (!workers && !milestones) {
          navigate(`/create-bid/${data._id}/${project_type.toLowerCase()}-${bid_type.toLowerCase()}/${bid_id}/team`);
        }
      }
    }
  };

  const isViewable =
    location.pathname.split('/').includes('my_bids') || location.pathname.split('/').includes('my_listings');
  const isDashboard = location.pathname.split('/').includes('dashboard');

  const handleCreateBid = () => {
    if (
      profilePercentageData?.values_missing?.includes('company_name') ||
      profilePercentageData?.values_missing?.includes('educational_institute') ||
      profilePercentageData?.values_missing?.includes('availability')
    ) {
      toggleCompleteProfileModal();
    } else {
      setSelectedProject(data);
      dispatch(getCheckBid(data._id, onNoBidFound, onBidFound));
    }
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} MB`;
      // eslint-disable-next-line
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} KB`;
    }
  };

  const isMyProjectMyTeam =
    location.pathname.split('/').includes('projects') || location.pathname.split('/').includes('my-teams');

  const handleViewProject = () => {
    if (location.pathname.split('/').includes('projects')) {
      if (selectUserDetailsData?.user_type === userTypes.talent && data?.switch_team_id) {
        toggleModal();
        setSwitchProfileModal(true);
      } else if (location.pathname.split('/').includes('ongoing')) {
        navigate(`/project-details/${data?._id}/milestone`);
      } else if (location.pathname.split('/').includes('completed')) {
        navigate(`/project-details/${data?._id}/rating`);
      } else {
        navigate(`/project-details/${data?._id}/bid`);
      }
    } else if (isDashboard) {
      if (selectUserDetailsData?.user_type === userTypes.talent && data?.switch_team_id) {
        toggleModal();
        setSwitchProfileModal(true);
      } else if (isActiveProject) {
        navigate(`/project-details/${data?._id}/milestone`);
      } else {
        navigate(`/project-details/${data?._id}/bid`);
      }
    } else {
      navigate(`/project-details/${data?._id}/bid`);
    }
  };

  const showCreateBidButton =
    selectUserDetailsData?.team_members?.map((member) => member?.user_id)?.includes(selectSavedUserDetailsData?._id) &&
    selectUserDetailsData?.team_members?.find((member) => member?.user_id === selectSavedUserDetailsData?._id)
      ?.member_type === 'ADMIN';

  const bidsReceivedAvatarGroup = DATA?.length
    ? DATA?.map((bidder) => ({
        user_id: bidder?.user_id,
        user_type: userTypes.talent,
        title: bidder?.name || `${bidder?.first_name} ${bidder?.last_name}`,
        img: bidder?.team_logo || bidder?.image_uri || defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

  return (
    <Modal
      contentClassName="custom-modal-project-details"
      isOpen={modal}
      toggle={toggleModal}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggleModal} />
      <ModalBody>
        <ViewProjectDetailModalWrap>
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Project Details</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mb-2">
                <Col lg="5">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">{data?.name ?? data?.details?.name}</CardTitle>
                    <CardText className="project-name">Project Name</CardText>
                  </div>
                </Col>
                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {expextedDuration?.duration}
                      {expextedDuration?.duration_type?.charAt(0)?.toLowerCase()}
                    </CardTitle>
                    <CardText className="project-name">Expected Duration</CardText>
                  </div>
                </Col>
                <Col lg="4">
                  {location.pathname.split('/').includes('my_listings') && data?.status === 'LISTING_EXPIRED' ? (
                    <div>
                      <CardTitle className="mb-25 fw-bolder">
                        {DateTime?.fromMillis(data?.listing_details?.end_date_epoch).toFormat('dd LLL yyyy')}
                      </CardTitle>
                      <CardText className="project-name">Expired Date</CardText>
                    </div>
                  ) : (
                    <div>
                      <CardTitle className="mb-25 fw-bolder">
                        {DateTime?.fromMillis(data?.listing_details?.start_date_epoch).toFormat('dd LLL yyyy')} to{' '}
                        {DateTime?.fromMillis(data?.listing_details?.end_date_epoch).toFormat('dd LLL yyyy')}
                      </CardTitle>
                      <CardText className="project-name">Listing Duration</CardText>
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg="5">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">{data?.pay_type?.currency?.name}</CardTitle>
                    <CardText className="project-name">Currency</CardText>
                  </div>
                </Col>

                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">
                      {data?.pay_type?.fixed_cost
                        ? ` Fixed - 
                          ${data?.pay_type?.currency?.code} ${data?.pay_type?.fixed_cost}`
                        : 'Variable'}
                    </CardTitle>
                    <CardText className="project-name">Payment Type</CardText>
                  </div>
                </Col>
                <Col lg="4">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">{data?.nda?.is_nda ? 'Yes' : 'No'}</CardTitle>
                    <CardText className="project-name">NDA</CardText>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg="5">
                  <AvailableTimeComp
                    timeZone={data?.availability?.timezone?.abbreviation}
                    weekdaysData={data?.availability?.weekdays_avl}
                    weekendsData={data?.availability?.weekends_avl}
                  />
                </Col>
                <Col lg="3">
                  <div>
                    <CardTitle className="mb-25 fw-bolder">{data?.availability?.time_overlap} hr</CardTitle>
                    <CardText className="project-name">Minimum Overlap</CardText>
                  </div>
                </Col>
                {location.pathname.split('/').includes('my_listings') && data?.status === 'LISTING_EXPIRED' && (
                  <Col lg="4">
                    <AvatarGroup
                      totalCount={DATA?.length || 0}
                      size="sm"
                      className="ms-25 mb-50"
                      data={bidsReceivedAvatarGroup?.slice(0, 3)}
                    />
                    <CardText className="project-name">Bids Received</CardText>
                  </Col>
                )}
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Project Description</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardText className="fw-300 ms-75 project-desc" style={{ whiteSpace: 'pre-line' }}>
                {' '}
                {data?.details?.description}{' '}
              </CardText>
            </CardBody>
          </Card>

          {data?.details?.documents?.length > 0 && (
            <Card>
              <CardBody>
                {data?.details?.documents.map((document, index) => (
                  <Row
                    key={document.file_key}
                    className={
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      index !== data?.details?.documents.length - 1
                        ? 'd-flex align-items-center mb-1'
                        : 'd-flex align-items-center'
                    }
                  >
                    <Col sm="6" md="6" lg="8">
                      <span
                        className="cursor-pointer"
                        style={{ color: theme.activeColor }}
                        onClick={() => downloadFile({ data: document })}
                      >
                        <FileText size="18" className="me-75" />
                        {document?.file_name}
                      </span>
                    </Col>
                    <Col sm="6" md="6" lg="2" className="text-end">
                      {renderFileSize(document?.size)}
                    </Col>
                    <Col sm="6" md="6" lg="2" className="text-end">
                      {DateTime?.fromMillis(document?.created_at).toFormat('dd MMM yyyy')}
                    </Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="mb-0 d-flex justify-content-between w-100">
                <span>Requirement Details</span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <BadgeGroup title="Skills" data={data?.proficiency?.skills} color="light-blue" gapWrap />
              <BadgeGroup title="Tools" data={data?.proficiency?.tools} color="light-blue" gapWrap />
            </CardBody>
          </Card>

          {selectUserDetailsData?._id === data?.client_details?.user_id ||
          data?.has_bid ||
          isViewable ||
          isMyProjectMyTeam ||
          isActiveProject ||
          isUpcomingProject ? (
            <div className="d-flex justify-content-end mb-2">
              {location.pathname.split('/').includes('my_listings') && data?.status === 'LISTING_EXPIRED' && (
                <Button
                  color="primary"
                  outline
                  className="me-2"
                  onClick={() => {
                    toggleModal();
                    setRelistConfirmationModal(true);
                  }}
                >
                  Re-list
                </Button>
              )}
              <Button color="primary" disabled={checkBidLoadingIsLoading} onClick={handleViewProject}>
                {checkBidLoadingIsLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <span className="me-50">View Project</span>
                    <ChevronRight size={14} />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div>
              {(selectUserDetailsData?.user_type === userTypes.talent ||
                selectUserDetailsData?.user_type === userTypes.team) && (
                <div className="d-flex justify-content-end align-items-center mt-2 mb-2">
                  <Button color="flat-danger" className="d-none me-1">
                    Report
                  </Button>

                  {(data?.status === 'OPEN' || data?.status === 'IN_REVIEW') &&
                    (selectUserDetailsData?.user_type === userTypes.team && selectUserDetailsData?.team_type === 'CLUB'
                      ? showCreateBidButton
                      : true) && (
                      <Button color="primary" disabled={checkBidLoadingIsLoading} onClick={handleCreateBid}>
                        {checkBidLoadingIsLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            <span className="me-50">Create Bid</span>
                            <ChevronRight size={14} />
                          </>
                        )}
                      </Button>
                    )}
                </div>
              )}
            </div>
          )}
        </ViewProjectDetailModalWrap>
      </ModalBody>
    </Modal>
  );
};

export default ProjectModal;

ProjectModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  data: Proptypes.object,
  setCreateBidModal: Proptypes.func,
  setSelectedProject: Proptypes.func,
  toggleCompleteProfileModal: Proptypes.func,
  setSwitchProfileModal: Proptypes.func,
  isActiveProject: Proptypes.bool,
  isUpcomingProject: Proptypes.bool,
  setRelistConfirmationModal: Proptypes.func,
};

ProjectModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  data: {},
  setCreateBidModal: () => {},
  setSelectedProject: () => {},
  toggleCompleteProfileModal: () => {},
  setSwitchProfileModal: () => {},
  isActiveProject: false,
  isUpcomingProject: false,
  setRelistConfirmationModal: () => {},
};
