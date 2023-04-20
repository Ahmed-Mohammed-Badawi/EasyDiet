import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    day: null,
    meals: [],
    selectedMeals: [],
};

const dayMealsSlice = createSlice({
    name: 'daymeals_user',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
    },
})


export const {onInputChange, clearAll} = dayMealsSlice.actions;
export default dayMealsSlice;