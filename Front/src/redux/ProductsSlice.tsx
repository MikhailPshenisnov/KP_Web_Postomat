import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {Pokedex} from "../components/Pokedex.tsx";

export interface ProductsState {
    products: Pokedex[];
}

const initialState: ProductsState = {
    products: []
}

export const productsSlice = createSlice({
    name: 'prod',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Pokedex[]>) => {
            state.products = action.payload;
        },
    },
})

export const {setProducts} = productsSlice.actions