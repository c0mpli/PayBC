import { createSlice } from '@reduxjs/toolkit'

export const SetBlockchain = createSlice({
    name: 'SetBlockchain',
    initialState:{
        name: "ETH"
    },
    reducers:{
        ChangeBlockchain (state, action){
            state.name = action.payload;
        }
    }
})

export const { ChangeBlockchain } = SetBlockchain.actions