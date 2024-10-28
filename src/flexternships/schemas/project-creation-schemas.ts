import * as yup from 'yup';
import { dateToEpoch } from '@flexternships/utils/date-utils';

const allowedFormats = [
    '*/pdf',
    '*/msword',
    '*/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    '*/jpeg', */jpg'
  ];

export const ProjectDetailsSchema = yup.object().shape({
    projectName: yup.string()
        .required('Project name is required'),
    estimatedStartDate: yup.number()
        .required('Estimated start date is required')
        .min(dateToEpoch(new Date(new Date().setHours(0, 0, 0, 0))), 'Estimated start date cannot be in the past'), // Allow today
    estimatedDuration: yup.number()
        .required('Estimated duration is required')
        .positive('Estimated duration should be positive')
        .integer('Estimated duration must be an integer'),
    estimatedWeeklyHours: yup.number()
        .required('Estimated weekly hours are required')
        .positive('Estimated weekly hours should be positive')
        .max(168, 'Estimated weekly hours cannot exceed 168 hours'),
    totalProjectHoursEach: yup.number()
        .required('Total project hours each is required')
        .positive('Total project hours each must be a positive number'),
    projectDescription: yup.string()
        .required('Project description is required')
        .min(50, 'Project description should be atleast 50 characters')
        .max(3000, 'Project description must be 3000 characters or less'),
    documents: yup.array().of(yup.object().shape(
        {
            file: yup.mixed().test("fileFormat", "Invalid file format", (value) => (value && allowedFormats.includes(value.type))),
            fileName: yup.string().required("fileName is required"),
            fileKey: yup.string().required("fileKey is required"),
            downloadUrl: yup.string().url("downloadUrl must be a valid URL"),
            size: yup.number().required("size is required").positive("size must be a positive number").max(5 * 1024 * 1024, "File size must be less than 5MB"),
            createdAt: yup.number().required("createdAt is required").integer("createdAt must be an integer"),
        }
    )).required() // Validate each document as a URL
    // .min(1, 'At least one document is required'), // Optional: ensure at least one document is provided
});

// Form Schema for ProjectRoles
export const ProjectRolesFormSchema = yup.object().shape({
    projectRoles: yup.array().of(yup.object().shape(
        {
            role: yup.object().shape(
                {
                    _id: yup.string().required("Role ID is required"),
                    name: yup.string().required("Role name is required"),
                }
            ),
            count: yup.number().min(1, "Role count should be atleast 1").required(),
            skills: yup.array().of(yup.object().shape(
                {
                    _id: yup.string().required("Skill ID is required"),
                    name: yup.string().required("Skill name is required"),
                }
            )).required().min(1, "At least one skill is required"),
            tools: yup.array().of(yup.object().shape(
                {
                    _id: yup.string().required("Tool ID is required"),
                    name: yup.string().required("Tool name is required"),
                }
            )).required(), // Optional: can enforce minimum if required
        }
    )).required().min(1)//.min(1, "At least one project role is required")
});

export const MilestonesFormSchema = yup.object().shape({
    milestones: yup.array().of(yup.object().shape(
        {
            title: yup.string()
                .required('Title is required'),
            duration: yup.number()
                .required('Duration is required')
                .positive('Duration must be a positive number'),
            description: yup.string()
                .required('Description is required')
                .min(4, 'Description must be at least 4 characters'),
            deliverables: yup.array().of(yup.string().required('Deliverable is required'))
                .required()
                .min(1, 'At least one deliverable is required'),
        }
    )).required().min(2, "At least two milestones are required")
})