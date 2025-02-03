import * as yup from 'yup';

// Reset Password Schema
export const ResetPasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
  confirmNewPassword: yup
    .string()
    .required('Confirm new password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
