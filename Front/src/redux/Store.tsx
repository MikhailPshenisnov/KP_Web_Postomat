import {configureStore} from '@reduxjs/toolkit'
import {authSlice} from "./AuthSlice.tsx";
import {productsSlice} from "./ProductsSlice.tsx";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productsSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch