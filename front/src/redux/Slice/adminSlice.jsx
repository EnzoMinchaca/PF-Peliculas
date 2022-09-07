import { createSlice } from "@reduxjs/toolkit";


export const adminSlice = createSlice({
    name: "admin",

    initialState: {},

    
    reducers: {
        getUser: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },

        deletUser: (state, action)=>{
            return {
                ...state,
                data: state.data.filter(user => user.id !== action.payload)
            }   
        },

        promoveUser: (state, action)=>{
            return {
                ...state,
                data: state.data.map(user => {
                    if(user.id === action.payload.id){
                        return user = action.payload
                    }else{
                        return user
                    }
                })
            }
        },

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

export const { getUser,
    deletUser,
    promoveUser,
    getOrder,
    getOrders


} = adminSlice.actions

export default adminSlice.reducer