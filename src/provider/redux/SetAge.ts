import { createSlice } from '@reduxjs/toolkit'

export const SetAge = createSlice({
    name: 'SetAge',
    initialState:{
        name: 0
    },
    reducers:{
        ChangeAge (state, action){
            state.name = action.payload;
        }
    }
})

export const { ChangeAge } = SetAge.actions