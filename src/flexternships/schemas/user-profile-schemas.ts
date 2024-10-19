import * as yup from 'yup';
import { CompanyStrength } from '../constraints/types/user-profile-types';


export const FlexternClientAccountDetailsSchema = yup.object().shape({
    firstname: yup.string().min(3, 'First name must be at least 3 characters').required('First name is required'),
    lastname: yup.string().min(3, 'Last name must be at least 3 characters').required('Last name is required'),
    imageUri: yup.string().optional() // submits file key gets public uri
});

export const FlexternClientCompanyDetailsSchema = yup.object().shape({
    companyName: yup.string().required('Company name is required'),
    companyLogo: yup.string().optional(),
    title: yup.string().required('Title is required'),
    companyTagline: yup.string().required('Company tagline is required'),
    companyIndustry: yup.object().shape(
        {
            _id: yup.string().required("Industry ID is required"),
            name: yup.string().required("Industry name is required"),
        }
    ),
    companyStrength: yup.mixed().oneOf(Object.values(CompanyStrength)).optional(),
    officeAddress: yup.object().shape({
        country: yup.object().shape(
            {
                _id: yup.string().required("Country ID is required"),
                name: yup.string().required("Country name is required"),
            }
        ),
        state: yup.object().shape(
            {
                _id: yup.string().required("State ID is required"),
                name: yup.string().required("State name is required"),
            }
        ),
        city: yup.object().shape(
            {
                _id: yup.string().required("City ID is required"),
                name: yup.string().required("City name is required"),
            }
        ),
        streetAddress: yup.string().optional(),
        buildingNumber: yup.string().optional(),
        zipCode: yup.string().optional()
    })
});

export const FlexternClientCompanySocialDetailsSchema = yup.object().shape({
    socialLinks: yup.array().of(
        yup.object().shape({
            platform: yup.string().required('Platform is required'),
            url: yup.string().url('Must be a valid URL').required('URL is required')
        })
    ).required('At least one social link is required')
});
