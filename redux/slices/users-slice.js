import {createSlice} from "@reduxjs/toolkit";

//Initial Value
const initialValue = {
    users: [],
    usersType: '',
};

const UsersSlice = createSlice({
    name: 'users',
    initialState: initialValue,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.users;
            state.usersType = action.payload.usersType;
        },
    },
})


export const {setUsers} = UsersSlice.actions;
export default UsersSlice;