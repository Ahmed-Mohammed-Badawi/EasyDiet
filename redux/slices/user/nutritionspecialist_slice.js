import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    userId: '',
    nutrition_specialistId: '',
    subject: '',
    content: '',
};

const nutrition_specialistSlice = createSlice({
    name: 'nutrition_specialist',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
    },
})


export const {onInputChange, clearAll} = nutrition_specialistSlice.actions;
export default nutrition_specialistSlice;