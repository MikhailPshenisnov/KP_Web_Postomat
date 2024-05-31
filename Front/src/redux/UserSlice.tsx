import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

export interface UserState {
    isLoggedIn: boolean;
    login: string;
    accessLvl: number;
}

const initialState: UserState = {
    isLoggedIn: false,
    login: "",
    accessLvl: -1
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        setAccessLvl: (state, action: PayloadAction<number>) => {
            state.accessLvl = action.payload;
        }
    }
})

export const {setIsLoggedIn, setLogin, setAccessLvl} = userSlice.actions