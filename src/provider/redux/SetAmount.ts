import { createSlice } from '@reduxjs/toolkit'

export const SetAmount = createSlice({
    name: 'SetAmount',
    initialState:{
        amount: 0
    },
    reducers:{
        ChangeAmount (state, action){
            state.amount = action.payload;
        }
    }
})

export const { ChangeAmount } = SetAmount.actions