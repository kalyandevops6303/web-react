import * as yup from 'yup';
import { MilestoneArtifactType } from '../constraints/enums/core-enums';
import { formatFileSize } from '../utils/file-utils';

export const allowedFormats = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MilestoneArtifactSchema = yup.object().shape({
  draftArtifacts: yup
    .array()
    .of(
      yup.object().shape({
        artifact_id: yup.string().optional(),
        description: yup.string().optional(),
        type: yup.string().oneOf(Object.values(MilestoneArtifactType)).required('Type is required'),
        uploadedAt: yup.number().required(),
        metadata: yup
          .object()
          .when('type', {
            is: MilestoneArtifactType.DOCUMENTS,
            then: yup.object().shape({
              fileName: yup.string().required('File name is required'),
              fileKey: yup.string().required(),
              size: yup
                .number()
                .required()
                .max(MAX_FILE_SIZE, `File size must be less than ${formatFileSize(MAX_FILE_SIZE)}`),
              uploadInfo: yup.object().shape({
                loading: yup.boolean().optional(),
                uploadProgress: yup.number().optional(),
                file: yup
                  .mixed()
                  .optional()
                  .test('file', 'File type not supported', function (value: File) {
                    if (!value) return true;
                    return allowedFormats.includes(value.type);
                  }),
              }),
            }),
            otherwise: yup.object().shape({
              url: yup.string().url('Must be a valid URL').required('URL is required'),
            }),
          })
          .required('Metadata is required'),
      }),
    )
    .required('Artifacts are required'),
});
