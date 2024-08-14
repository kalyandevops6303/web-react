import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showHiringTab: false,
    showHiringTabLoading: false,
    error: null
}

const hiringSlice = createSlice({
    name: 'hiring',
    initialState,
    reducers: {
        showHiringTabRequest: (state) => ({
            ...state,
            showHiringTabLoading: true,
            error: null,
        }),
        showHiringTabSuccess: (state, action) => ({
            ...state,
            showHiringTabLoading: false,
            showHiringTab: action.payload,
            error: null,
        }),
        showHiringTabFailure: (state, action) => ({
            ...state,
            showHiringTabLoading: false,
            error: action.payload
        }),
    }
})

export const {
    showHiringTabRequest,
    showHiringTabSuccess,
    showHiringTabFailure
} = hiringSlice.actions;

export default hiringSlice.reducer;
