import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    meals: [],
    selectedDay: '',
};

const defaultMealsSlice = createSlice({
    name: 'defaultmeals',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        onMealChecked: (state, action) => {
            // GET COPY OF MEALS
            const packageMealsCopy = [...state.meals];
            let isMealExist = false;
            // CHECK IF THE MEAL EXIST
            if (packageMealsCopy.length > 0) {
                packageMealsCopy.forEach((cur) => {
                    if (cur === action.payload.id) {
                        isMealExist = true;
                        // Remove it from the Array
                        const indexOfItem = packageMealsCopy.indexOf(action.payload.id);
                        packageMealsCopy.splice(indexOfItem, 1);
                        //Reset the State
                        state.meals = packageMealsCopy;
                    }
                })
            }
            // Add the meal id if it's not exist
            if (isMealExist === false) {
                packageMealsCopy.push(action.payload.id);
                state.meals = packageMealsCopy
            }
        },
        clearAll: (state) => {
            state.meals = [];
            state.selectedDay = '';
        }
    },
})


export const {onInputChange, clearAll, onMealChecked} = defaultMealsSlice.actions;
export default defaultMealsSlice;