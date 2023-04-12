import { configureStore } from '@reduxjs/toolkit'
import {createWrapper} from "next-redux-wrapper";
// SLICES
import layoutSlice from "@/redux/slices/layout-slice";
import mealsSlice from "@/redux/slices/meals-slice";
import packagesSlice from "@/redux/slices/packages-slice";
import usersSlice from "@/redux/slices/users-slice";
import createmealSlice from "@/redux/slices/createmeal-slice";
import editMealSlice from "@/redux/slices/editmeal-slice";
import createpackageSlice from "@/redux/slices/createpackage-slice";
import editPackageSlice from "@/redux/slices/editpackage-slice";
import createEmployeeSlice from "@/redux/slices/createEmployee-slice";
import editEmployeeSlice from "@/redux/slices/editEmployee-slice";

export const store = configureStore({
    reducer: {
        [layoutSlice.name]: layoutSlice.reducer,
        [packagesSlice.name]: packagesSlice.reducer,
        [mealsSlice.name]: mealsSlice.reducer,
        [usersSlice.name]: usersSlice.reducer,
        [createmealSlice.name]: createmealSlice.reducer,
        [editMealSlice.name]: editMealSlice.reducer,
        [createpackageSlice.name]: createpackageSlice.reducer,
        [editPackageSlice.name]: editPackageSlice.reducer,
        [createEmployeeSlice.name]: createEmployeeSlice.reducer,
        [editEmployeeSlice.name]: editEmployeeSlice.reducer,
    },
})

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper
