import { createSlice } from "@reduxjs/toolkit";

export const colormodeSlice = createSlice({
    name: "colormode",
    initialState: {
        darkmode: true,
    },
    reducers: {
        //methods
        setColormode: (state) => {
            state.darkmode = localStorage.getItem('darkmode') ? JSON.parse(localStorage.getItem('darkmode')) : true;
        },

    }
})

export const { setColormode } = colormodeSlice.actions

//Selector
export const selectColormode = (state) => state.colormode.darkmode;

export default colormodeSlice.reducer;