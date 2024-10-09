import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { SetUsername } from "@/provider/redux/SetUsername";
import {SetAccount} from "@/provider/redux/SetAccount";
import {SetAmount} from "@/provider/redux/SetAmount";
import {SetUnit} from "@/provider/redux/SetUnit";
import {SetTxHash} from "@/provider/redux/SetTxHash";
import {SetBlockchain} from "@/provider/redux/SetBlockchain";
import { SetStatus } from './SetStatus';
import { SetAge } from './SetAge';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    SetUsername: SetUsername.reducer,
    SetAccount: SetAccount.reducer,
    SetAmount: SetAmount.reducer,
    SetStatus: SetStatus.reducer,
    SetAge: SetAge.reducer,
    SetBlockchain: SetBlockchain.reducer,
    SetRecipient: SetAccount.reducer,
    SetUnit: SetUnit.reducer,
    SetTxHash: SetTxHash.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});