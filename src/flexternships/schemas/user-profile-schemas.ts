import * as yup from 'yup';
import { CompanyStrength } from '../constraints/types/user-profile-types';

export const FlexternClientAccountDetailsSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('First name is required')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain alphabets and spaces')
    .min(3, 'First name must be at least 3 characters')
    .max(25, 'First name must not exceed 25 characters'),
  lastname: yup
    .string()
    .required('Last name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain alphabets and spaces')
    .min(3, 'Last name must be at least 3 characters')
    .max(25, 'Last name must not exceed 25 characters'),
  timezone: yup
    .object()
    .shape({
      _id: yup.string().optional(),
      name: yup.string().required('Timezone name is required'),
    })
    .required('Timezone is required'),
  imageUri: yup.string().optional(), // submits file key gets public uri
  linkedin: yup
    .string()
    .matches(/^(https?:\/\/)?(www\.)?linkedin\.com(\/.*)?$/, 'Must be a valid LinkedIn URL')
    .optional(),
  title: yup
    .string()
    .required('Designation is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Designation must only contain alphanumeric characters')
    .max(50, 'Designation must not exceed 50 characters'),
  department: yup
    .string()
    .required('Department is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Department must only contain alphanumeric characters')
    .max(50, 'Department must not exceed 50 characters'),
});

export const FlexternClientCompanyDetailsSchema = yup.object().shape({
  department: yup
    .string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Company name must only contain alphanumeric characters')
    .max(50, 'Company name must not exceed 50 characters')
    .required('Company name is required'),
  companyLogo: yup.string().optional(),
  title: yup
    .string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Title must only contain alphanumeric characters')
    .max(50, 'Title must not exceed 50 characters')
    .required('Title is required'),
  companyTagline: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/,
      'Company tagline must only contain alphanumeric and special characters',
    )
    .max(100, 'Company tagline must not exceed 100 characters')
    .required('Company tagline is required'),
  companyIndustry: yup.object().shape({
    _id: yup.string().required('Industry ID is required'),
    name: yup.string().required('Industry name is required'),
  }),
  companyStrength: yup.mixed().oneOf(Object.values(CompanyStrength)).optional(),
  officeAddress: yup.object().shape({
    country: yup.object().shape({
      _id: yup.string().required('Country ID is required'),
      name: yup.string().required('Country name is required'),
    }),
    state: yup.object().shape({
      _id: yup.string().required('State ID is required'),
      name: yup.string().required('State name is required'),
    }),
    city: yup.object().shape({
      _id: yup.string().required('City ID is required'),
      name: yup.string().required('City name is required'),
    }),
    streetAddress: yup.string().optional(),
    buildingNumber: yup.string().optional(),
    zipCode: yup.string().optional(),
  }),
});

export const FlexternClientSocialDetailsSchema = yup.object().shape({
  socialLinks: yup
    .array()
    .of(
      yup.object().shape({
        platform: yup.string().required('Platform is required'),
        url: yup.string().url('Must be a valid URL').optional(),
      }),
    )
    .min(3, 'At least 3 social links are required'),
});
