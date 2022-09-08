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
            localStorage.setItem('usuarioLogeado', action.payload)
            return {
                ...state,
                logUsers: action.payload
            }      
        },

        getUsers: (state, action)=>{
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

        createUser: (state)=>{
            return{state}     
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

        addbys: (state, action) => {
            state.movie = action.payload
        },

        
        
    }
})

export const { userLogin,
     loginUser, 
     getUsers, 
     logout,
     createUser,
     editUser,
     getUserByToken,
     putUserPassword,
     addbys
   
} = userSlice.actions

export default userSlice.reducer