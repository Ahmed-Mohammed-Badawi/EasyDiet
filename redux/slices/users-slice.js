import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    users: []
};

const UsersSlice = createSlice({
    name: 'users',
    initialState: initialValue,
    reducers: {
        onInputChange: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
    },
})


export const {onInputChange, clearAll} = UsersSlice.actions;
export default UsersSlice;