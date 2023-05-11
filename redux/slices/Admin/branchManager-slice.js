import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    activeTye: 'all',
    checks: {
        All: true,
        Breakfast: false,
        Lunch: false,
        Dinner: false,
        Snacks: false
    },
    meals: []
};

const branchManager = createSlice({
    name: 'branch',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        onCheck: (state, action) => {
            state.checks.All = false;
            state.checks.Breakfast = false;
            state.checks.Lunch = false;
            state.checks.Dinner = false;
            state.checks.Snacks = false;
            state.checks[action.payload.key] = action.payload.value;
            state.activeTye = action.payload.key;
        }
    },
})


export const {onInputChange, onCheck} = branchManager.actions;
export default branchManager;