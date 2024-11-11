import * as yup from 'yup';
import { MilestoneArtifactType } from '../constraints/enums/core-enums';

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
