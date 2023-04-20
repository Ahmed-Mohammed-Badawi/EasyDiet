import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    name: '',
    category: [],
    carbohydrate: '',
    protein: '',
    calories: '',
    fat: '',
    repeatPeriod: '',
    repeatNumber: '',
    blocked: false,
    language: ''
};

const createMealSlice = createSlice({
    name: 'create_meal',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        clearAll: (state) => {
            state.name = '';
            state.category = [];
            state.carbohydrate = '';
            state.protein = '';
            state.calories = '';
            state.fat = '';
            state.repeatPeriod = '';
            state.repeatNumber = '';
            state.blocked = false;
            state.language = '';
        }
    },
})


export const {onInputChange, clearAll} = createMealSlice.actions;
export default createMealSlice;