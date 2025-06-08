import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface quoteInterface{
    q:string,
    a:string,
    c:string,
    h:string,
}

interface quoteState  {
    dailyQuote:quoteInterface[]|null,
    lastFetchTimestamp: Date|null,
}

const initialState:quoteState = {
    dailyQuote:[],
    lastFetchTimestamp: null,
}


const dailyQuoteSlice = createSlice({
    name: "dailyQuote",
    initialState,
    reducers:{
        setQuote: (state, action: PayloadAction<quoteInterface[]>) => {
            state.dailyQuote = action.payload;
        },  
        setLastFetchTimestamp: (state, action: PayloadAction<Date>) => {
            state.lastFetchTimestamp = action.payload;
        },
        clearQuote:(state)=>{
            state.dailyQuote = null
        }
    }

})

export default dailyQuoteSlice.reducer;
export const {setQuote,clearQuote,setLastFetchTimestamp } = dailyQuoteSlice.actions;