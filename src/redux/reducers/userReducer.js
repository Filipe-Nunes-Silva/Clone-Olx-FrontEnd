import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name:'user',
    initialState:{
        email:'filipe@gmail.com',
    },
    reducers:{
        changeEmail:(state,action)=>{
            state.email = action.payload;
        },
    },
});

export const {changeEmail} = slice.actions;
export default slice.reducer;