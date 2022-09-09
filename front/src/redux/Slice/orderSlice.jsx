import { createSlice } from "@reduxjs/toolkit";


export const orderSlice = createSlice({
    name: "order",

    initialState: {
    },

    
    reducers: {
        getOrder: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },

        getOrders: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },


      
    }
})

export const { 
    getOrder,
    getOrders
    
   
} = orderSlice.actions

export default orderSlice.reducer