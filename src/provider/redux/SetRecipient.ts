import { createSlice } from '@reduxjs/toolkit'

export const SetRecipient = createSlice({
    name: 'SetRecipient',
    initialState:{
        name: ""
    },
    reducers:{
        ChangeRecipient (state, action){
            state.name = action.payload;
        }
    }
})

export const { ChangeRecipient } = SetRecipient.actions