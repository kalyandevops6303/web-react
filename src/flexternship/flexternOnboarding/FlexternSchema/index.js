import * as Yup from 'yup';

export const usWFormsSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'name must be at least 3 characters')
    .max(25, 'name must be at most 25 characters')
    .matches(/^[a-zA-Z0-9 _]+$/, 'name should not contain special characters')
    .required('name is required'),
  citizen: Yup.object()
    .shape({
      label: Yup.string().required('This is required'),
      value: Yup.string().required('This is required'),
    })
    .required('This is required'),
  pAddress: Yup.string(),
  pHouseNo: Yup.string(),
  pCountry: Yup.object()
    .shape({
      label: Yup.string().required('Country is required'),
      value: Yup.string().required('This is required'),
    })
    .required('This is required'),
  pState: Yup.object()
    .shape({
      label: Yup.string().required('State is required'),
      value: Yup.string().required('This is required'),
    })
    .required('This is required'),
  pCity: Yup.object()
    .shape({
      label: Yup.string().required('City is required'),
      value: Yup.string().required('This is required'),
    })
    .required('This is required'),
  pZipCode: Yup.string().required('This is required'),

  mAddress: Yup.string(),
  mHouseNo: Yup.string(),
  mCountry: Yup.object()
    .shape({
      label: Yup.string().required('Country is required'),
      value: Yup.string().required('This is required'),
    })
    .required('This is required'),
  mState: Yup.object()
    .shape({
      label: Yup.string().required('State is required'),
      value: Yup.string().required('This is required'),
    })
    .required('This is required'),
  mCity: Yup.object()
    .shape({
      label: Yup.string().required('City is required'),
      value: Yup.string().required('This is required'),
    })
    .required('This is required'),
  mZipCode: Yup.string().required('Zip code is required'),
});

export const formSchema = usWFormsSchema.shape({
  refNo: Yup.string().required('Reference is required'),
  dob: Yup.date().typeError('DOB is required').required('DOB is required'),
});
