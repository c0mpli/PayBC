import { createSlice } from '@reduxjs/toolkit'

export const SetUnit = createSlice({
    name: 'SetUnit',
    initialState:{
        name: "wei"
    },
    reducers:{
        ChangeUnit (state, action){
            state.name = action.payload;
        }
    }
})

export const { ChangeUnit } = SetUnit.actions