import { configureStore } from '@reduxjs/toolkit'
// SLICES
import layoutSlice from "@/redux/slices/layout-slice";


const store = configureStore({
    reducer: {
        [layoutSlice.name]: layoutSlice.reducer
    },
})

export default store
