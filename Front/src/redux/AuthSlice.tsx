import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

export interface AuthState {
    isLoggedIn: boolean;
    username: string;
    cart: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    username: "",
    cart: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setCart: (state, action: PayloadAction<string>) => {
            state.cart = action.payload;
        },
    },
})

export const {setIsLoggedIn, setUsername, setCart} = authSlice.actions