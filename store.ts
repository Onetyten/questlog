import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer,persistStore } from 'redux-persist'
import quoteSlice from '@/store/quoteSlice/quoteSlice'
import userSlice from '@/store/userSlice/userSlice'
import storage from 'redux-persist/lib/storage'
import todoSlice from '@/store/todoSlice/todoSlice'
import openBarSlice from '@/store/sidebarSlice/sidebarSlice'
import activeRouteSlice from '@/store/activeRouteSlice/activeRouteSlice'
import showChildModalSlice from '@/store/showChildModalSlice/showChildModalSlice'
import modalIdSlice from '@/store/modalIdSlice/modalIdSlice'





const persistConfig = {
    key:'root',
    version:1,
    storage,
    blacklist:[]
}


const reducer = combineReducers({
    dailyQuote:quoteSlice,
    user:userSlice,
    todo:todoSlice,
    openBar:openBarSlice,
    activeRoute:activeRouteSlice,
    showChildModal:showChildModalSlice,
    modalId:modalIdSlice
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