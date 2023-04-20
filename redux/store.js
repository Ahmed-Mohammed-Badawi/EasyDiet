import { configureStore } from '@reduxjs/toolkit'
import {createWrapper} from "next-redux-wrapper";
// SLICES
import layoutSlice from "@/redux/slices/Admin/layout-slice";
import mealsSlice from "@/redux/slices/Admin/meals-slice";
import packagesSlice from "@/redux/slices/Admin/packages-slice";
import usersSlice from "@/redux/slices/Admin/users-slice";
import createmealSlice from "@/redux/slices/Admin/createmeal-slice";
import editMealSlice from "@/redux/slices/Admin/editmeal-slice";
import createpackageSlice from "@/redux/slices/Admin/createpackage-slice";
import editPackageSlice from "@/redux/slices/Admin/editpackage-slice";
import createEmployeeSlice from "@/redux/slices/Admin/createEmployee-slice";
import editEmployeeSlice from "@/redux/slices/Admin/editEmployee-slice";
//USER
import packages from "@/redux/slices/user/packages";
import menuSlice from "@/redux/slices/user/menu";
import subscriptionSlice from "@/redux/slices/user/subscription_info";
import dayMealsSlice from "@/redux/slices/user/daymeals_slice";

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
        //USER
        [packages.name]: packages.reducer,
        [menuSlice.name]: menuSlice.reducer,
        [subscriptionSlice.name]: subscriptionSlice.reducer,
        [dayMealsSlice.name]: dayMealsSlice.reducer,
    },
})

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper
