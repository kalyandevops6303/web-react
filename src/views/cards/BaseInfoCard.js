/* eslint-disable no-else-return */
import React, { useState } from 'react';
import { CardText, CardTitle, Badge, Button } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import hat from '@src/assets/images/hat.svg';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import AvatarGroup from '@components/avatar-group';
import { Heart } from 'react-feather';
import { useDispatch } from 'react-redux';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import theme from '../../configs/themeVariables';
import RatingBadge from '../../@core/components/rating-group/RatingBadge';
import { makeFav, removeFav } from '../../redux/actions/marketPlaceActions';
import BadgeGroup from '../../@core/components/badge-group-dynamic-count';
import { userTypes } from '../../utility/constants/Constant';
import { returnFormattedRating } from '../../utility/Utils';
import { BidsReceivedWrapper } from './style';

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
  {
    _id: '6555e502f048cae6adb4e55f',
    availability: {
      timezone: {
        _id: '6479f0fafe992bcffe2ab7eb',
        offset: -28800,
        offset_name: 'UTC-08:00',
        name: 'America/Los_Angeles',
        abbreviation: 'PST',
      },
      weekdays_avl: {
        start_time: 1,
        end_time: 9,
        days: ['MONDAY', 'TUESDAY', 'FRIDAY'],
      },
    },
    rating: 0,
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
        _id: '64cce2ef2fae55f2dfd21afa',
        name: 'Sciences',
      },
      {
        _id: '64cce2ef2fae55f2dfd21afb',
        name: 'Other',
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
    tagline: 'We are the mountaineers',
    team_logo:
      'https://trumiodevsa.blob.core.windows.net/trumio-public/profile/64ff004ef2e6af73ce49c41d/c5c00493-1676-4a26-8027-aeb023aba69b.jpeg',
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
    introduction: 'We do mountaineering a LOT!!',
    team_type: 'TEAM',
    name: 'The Mountaineers',
    interests: [],
    education_institute: [],
    total_project_cost: 0,
    user_type: 'TEAM',
    team_members: [
      {
        member_type: 'MEMBER',
        user_id: '64ff004ef2e6af73ce49c41d',
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

const BaseInfoCard = ({ isSearchPage, data, setRelistConfirmationModal }) => {
  const [isFavorite, setIsFavorite] = useState(data?.is_favorite);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientDetails = data?.client ?? data?.client_details;

  const location = useLocation();

  const handleLike = (e) => {
    e.stopPropagation();
    setIsFavorite(true);
    dispatch(makeFav({ project_id: data?._id, onSuccess: () => {}, onError: () => setIsFavorite(false) }));
  };
  const handleUnLike = (e) => {
    e.stopPropagation();
    setIsFavorite(false);
    dispatch(removeFav({ project_id: data?._id, onSuccess: () => {}, onError: () => setIsFavorite(true) }));
  };

  const giveStrokeColor = (percentage) => {
    if (percentage <= 40) {
      return theme.red;
      // eslint-disable-next-line
    } else if (percentage > 40 && percentage <= 70) {
      return theme.orange;
    } else {
      return theme.green;
    }
  };

  const fromLocationPrimary = () => {
    if (location.pathname.split('/').includes('marketplace'))
      return { title: 'Marketplace', link: '/marketplace/all_listings' };
    if (location.pathname.split('/').includes('search')) return { title: 'Search', link: '/search' };
    return '';
  };
  const fromLocationSecondary = () => {
    if (location.pathname.split('/').includes('all_listings')) return { title: 'Marketplace', link: location.pathname };
    if (location.pathname.split('/').includes('my_listings')) return { title: 'My listings', link: location.pathname };
    if (location.pathname.split('/').includes('talents')) return { title: 'Talent', link: location.pathname };
    if (location.pathname.split('/').includes('clients')) return { title: 'Clients', link: location.pathname };
    return '';
  };
  const fromLocationSearch = () => ({ title: 'Clients', link: '' });

  const handleNavigate = (e) => {
    e.stopPropagation();
    const state = {
      from: {
        primary: fromLocationPrimary(),
        secondary: fromLocationSecondary() || fromLocationSearch(),
      },
    };
    if (data?.bidder_details) {
      if (data?.bidder_details?.user_type === userTypes.team) {
        navigate(`/profile/team/${data?.bidder_details?.team_id}`, { state });
      } else {
        navigate(`/profile/talent/${data?.bidder_details?.user_id}`, { state });
      }
    } else {
      navigate(`/profile/client/${data?.client_details?.user_id}`, { state });
    }
  };

  const getImage = () => {
    if (data?.bidder_details) {
      if (data?.bidder_details?.user_type === userTypes.team) {
        return data?.bidder_details?.team_logo?.length ? data?.bidder_details?.team_logo : defaultAvatar;
      } else {
        return data?.bidder_details?.image_uri?.length ? data?.bidder_details?.image_uri : defaultAvatar;
      }
    } else {
      return clientDetails?.image_uri?.length ? clientDetails?.image_uri : defaultAvatar;
    }
  };

  const avatarGroup = data?.bidder_details?.workers?.length
    ? data?.bidder_details?.workers?.map((worker) => ({
        user_id: worker?.user_id,
        user_type: userTypes.talent,
        title: `${worker?.first_name} ${worker?.last_name}`,
        img: worker?.image_uri?.length ? worker?.image_uri : defaultAvatar,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33,
      }))
    : [];

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
    <div>
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center gap-50">
          {data?.is_alma_mater && (
            <Badge className="alma-mater ms-50 bg-white">
              <img src={hat} alt="client-badge" className="bg-white" />
            </Badge>
          )}
          {!isSearchPage && (
            <div className="mb-25">
              {isFavorite ? (
                <Heart
                  className="cursor-pointer d-flex heart"
                  fill={theme.red}
                  stroke={theme.red}
                  onClick={(e) => handleUnLike(e)}
                  size={20}
                />
              ) : (
                <Heart className="cursor-pointer d-flex heart" onClick={(e) => handleLike(e)} size={20} />
              )}
            </div>
          )}

          {data?.match_percentage ? (
            <div className="circular-progressbar-container m-0">
              <CircularProgressbarWithChildren
                value={data?.match_percentage}
                styles={{
                  path: {
                    stroke: giveStrokeColor(data?.match_percentage),
                    strokeLinecap: 'round',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    transform: 'rotate(0turn)',
                    transformOrigin: 'center center',
                  },
                  trail: {
                    stroke: theme.progressBarBg,
                    strokeLinecap: 'round',
                    transform: 'rotate(0turn)',
                    transformOrigin: 'center center',
                  },
                }}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <p className="percentage-text m-0">{data?.match_percentage}%</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          ) : null}
        </div>
      </div>
      {!location.pathname.split('/').includes('my_listings') && (
        <div className="d-flex mb-25 align-items-center">
          {data?.bidder_details ? (
            <div>
              {data?.bidder_details?.user_type === userTypes.talent && (
                <img
                  className="market-place-card-photo me-75"
                  src={getImage()}
                  alt="avatar"
                  width={40}
                  height={50}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          ) : (
            <img
              className="market-place-card-photo me-75"
              src={getImage()}
              alt="avatar"
              width={40}
              height={50}
              style={{ objectFit: 'cover' }}
            />
          )}
          <div className="d-flex w-100 align-items-center">
            <div onClick={(e) => handleNavigate(e)} className="flex-grow-1">
              <CardTitle className="marketplace-card-title mb-0 ms-25 fw-bolder">
                {data?.bidder_details ? (
                  <span>
                    {data?.bidder_details?.user_type === userTypes.team
                      ? data?.bidder_details?.name
                      : `${data?.bidder_details?.first_name} ${data?.bidder_details?.last_name}`}
                  </span>
                ) : (
                  <span>
                    {data?.client_details?.first_name}&nbsp;
                    {data?.client_details?.last_name}
                  </span>
                )}
              </CardTitle>
              {data?.bidder_details ? (
                <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
                  {data?.bidder_details?.role?.name}
                </CardText>
              ) : (
                <CardText className="font-small-3 fw-300 ms-25 marketplace-card-role">
                  {clientDetails?.title ?? clientDetails?.company_name}
                </CardText>
              )}
            </div>
            <div className="d-flex flex-grow-1">
              <RatingBadge
                number={returnFormattedRating(
                  data?.bidder_details ? data?.bidder_details?.rating ?? 0 : clientDetails?.rating ?? 0,
                )}
              />
              {data?.bidder_details ? (
                <CardText className="ps-1 font-small-3 fw-300 rating-label">
                  {data?.bidder_details?.projects_worked_on_count ?? 0} Projects
                </CardText>
              ) : (
                <CardText className="ps-1 font-small-3 fw-300 rating-label">
                  {clientDetails?.project_listed_count ?? 0} Projects
                </CardText>
              )}
            </div>
          </div>
        </div>
      )}
      {data?.bidder_details && data?.bidder_details?.user_type === userTypes.team ? (
        <div className="mb-2">
          {avatarGroup?.length > 3 ? (
            <AvatarGroup
              totalCount={data?.bidder_details?.workers?.length || 0}
              size="sm"
              className="ms-25 mb-50"
              data={avatarGroup?.slice(0, 3)}
            />
          ) : (
            <AvatarGroup size="sm" className="ms-25 mb-50" data={avatarGroup} />
          )}
        </div>
      ) : (
        <div className="mb-2" />
      )}
      <div>
        <BadgeGroup
          title="Skills"
          data={data?.proficiency?.skills}
          color="light-blue"
          id={`tooltip-skills-project-${data?._id}`}
        />
        <BadgeGroup
          title="Tools"
          data={data?.proficiency?.tools}
          color="light-blue"
          id={`tooltip-tools-project-${data?._id}`}
        />
      </div>
      {location.pathname.split('/').includes('my_listings') && (
        <BidsReceivedWrapper>
          <p className="wrapper-title mb-50">Bids Received</p>
          <AvatarGroup
            totalCount={DATA?.length || 0}
            size="sm"
            className="ms-25 mb-50"
            data={bidsReceivedAvatarGroup?.slice(0, 3)}
          />
          {data?.status === 'LISTING_EXPIRED' && (
            <div className="d-flex justify-content-end relist-btn-wrapper">
              <Button
                color="primary"
                outline
                className="relist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setRelistConfirmationModal(true);
                }}
              >
                Re-list
              </Button>
            </div>
          )}
        </BidsReceivedWrapper>
      )}
    </div>
  );
};

BaseInfoCard.propTypes = {
  data: PropTypes.object,
  isSearchPage: PropTypes.bool,
  setRelistConfirmationModal: PropTypes.func,
};

BaseInfoCard.defaultProps = {
  data: {},
  isSearchPage: false,
  setRelistConfirmationModal: () => {},
};
export default BaseInfoCard;
