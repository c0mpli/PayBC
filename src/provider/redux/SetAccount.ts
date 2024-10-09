import { createSlice } from '@reduxjs/toolkit'

export const SetAccount = createSlice({
    name: 'SetAccount',
    initialState:{
        name: ""
    },
    reducers:{
        ChangeAccount (state, action){
            state.name = action.payload;
        }
    }
})

export const { ChangeAccount } = SetAccount.actions