import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    userId: '',
    firstName: '',
    lastName: '',
    phone: '',
    region: '',
    street: '',
    house: '',
    floor: '',
    apartment: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
    },
})


export const {onInputChange, clearAll} = profileSlice.actions;
export default profileSlice;