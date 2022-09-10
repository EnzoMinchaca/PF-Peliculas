import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "users",


    initialState: {
        allUsers:[],//estado que siempre va a almacenar todos los usuarios
        users:[],
    },
    
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

        getAllUsers: (state, action)=>{
            state.allUsers = action.payload    
            state.users = action.payload        
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

        comfirmPassword: (state)=>{
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

        toPay: (state, action) => {
            // console.log(action.payload)
            return {
                ...state,
                payLink: action.payload
            }
        },

        toPayPay: (state, action) => {
            // console.log(action.payload)
            return {
                ...state,
                payPayLink: action.payload
            }
        },

        toExecute: (state, action) => {
            // console.log(action.payload)
            // console.log(typeof action.payload)
            return {
                ...state,
                executePay: action.payload
            }
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
     getAllUsers,
     comfirmPassword,
     toPay,
     toPayPay,
     toExecute,
     addbys

   
} = userSlice.actions

export default userSlice.reducer