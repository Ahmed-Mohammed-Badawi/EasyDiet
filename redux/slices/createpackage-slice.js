import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    name: '',
    timeOnCard: '',
    realTime: '',
    packagePrice: '',
    numberOfMeals: '',
    numberOfSnacks: '',
    offerDays: '',
    fridayIncluded: false,
    language: '',
    packageMeals: [],
    breakfast: false,
    lunch: false,
    dinner: false
};

const createPackageSlice = createSlice({
    name: 'create_package',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        onMealChecked: (state, action) => {
            // GET COPY OF MEALS
            const packageMealsCopy = [...state.packageMeals];
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
                        state.packageMeals = packageMealsCopy;
                    }
                })
            }
            // Add the meal id if it's not exist
            if (isMealExist === false) {
                packageMealsCopy.push(action.payload.id);
                state.packageMeals = packageMealsCopy
            }
        },
        clearAll: (state) => {
            state.name = '';
            state.timeOnCard = '';
            state.realTime = '';
            state.packagePrice = '';
            state.numberOfMeals = '';
            state.numberOfSnacks = '';
            state.offerDays = '';
            state.fridayIncluded = false;
            state.language = '';
            state.packageMeals = [];
            state.breakfast = false;
            state.lunch = false;
            state.dinner = false
        }
    },
})


export const {onInputChange, clearAll, onMealChecked} = createPackageSlice.actions;
export default createPackageSlice;