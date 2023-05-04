import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    fullName: "",
    email: "",
    gender: "",
    password: "",
    phone: '',
    region: '',
    street: '',
    house: '',
    floor: '',
    apartment: '',
    payment: false,
    selectedPackage: ''
};

const createUserSlice = createSlice({
    name: 'create_user',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        clearAll: (state) => {
            state.fullName = "";
            state.email = "";
            state.gender = "";
            state.password = "";
            state.phone = '';
            state.region = '';
            state.street = '';
            state.house = '';
            state.floor = '';
            state.apartment = '';
            state.payment = false;
            state.selectedPackage = '';
        }
    },
})


export const {onInputChange, clearAll} = createUserSlice.actions;
export default createUserSlice;