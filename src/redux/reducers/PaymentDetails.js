import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: 'us_person',
  working: 'in_us',
  taxPayer: 'not_us',
  taxName: '',
  taxClass: '',
  selectedTaxId: 'taxOption1',
  taxId: '',
};

const paymentDetailsSlice = createSlice({
  name: 'paymentDetails',
  initialState,
  reducers: {
    paymentDetailsSuccess: (state, action) => ({
      ...state,
      [action.payload?.key]: action.payload?.value,
    }),
    saveTaxIdDetails: (state, action) => ({
      ...state,
      taxClass: action.payload?.taxClass?.label,
      taxName: action.payload?.taxName,
      taxId: action.payload?.taxId,
    }),
  },
});

export const { paymentDetailsSuccess, saveTaxIdDetails } = paymentDetailsSlice.actions;

export default paymentDetailsSlice.reducer;
