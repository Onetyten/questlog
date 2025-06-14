import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer,persistStore } from 'redux-persist'
import quoteSlice from '@/store/quoteSlice/quoteSlice'
import userSlice from '@/store/userSlice/userSlice'
import storage from 'redux-persist/lib/storage'
import todoSlice from '@/store/todoSlice/todoSlice'


const persistConfig = {
    key:'root',
    version:1,
    storage,
    blacklist:[]
}


const reducer = combineReducers({
    dailyQuote:quoteSlice,
    user:userSlice,
    todo:todoSlice
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({

    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch