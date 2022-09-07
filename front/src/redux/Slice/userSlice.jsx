import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "users",

    initialState: {},

    
    reducers: {
        userLogin: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },

        loginUser: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },

        getUser: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },

        logout: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },

        createUser: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },

        editUser: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },

        getUserByToken: (state, action) => {
            state.movie = action.payload
        },

        putUserPassword: (state, action) => {
            state.movie = action.payload
        },
        
    }
})

export const { userLogin,
     loginUser, 
     getUser, 
     logout,
     createUser,
     editUser,
     getUserByToken,
     putUserPassword
   
} = userSlice.actions

export default userSlice.reducer