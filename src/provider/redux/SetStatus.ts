import { createSlice } from '@reduxjs/toolkit'

export const SetStatus = createSlice({
    name: 'SetRecipient',
    initialState:{
        name: ""
    },
    reducers:{
        ChangeStatus (state, action){
            state.name = action.payload;
        }
    }
})

export const { ChangeStatus } = SetStatus.actions