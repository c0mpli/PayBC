import { createSlice } from '@reduxjs/toolkit'

export const SetTxHash = createSlice({
    name: 'SetTxHash',
    initialState:{
        name: ""
    },
    reducers:{
        ChangeTxHash (state, action){
            state.name = action.payload;
        }
    }
})

export const { ChangeTxHash } = SetTxHash.actions