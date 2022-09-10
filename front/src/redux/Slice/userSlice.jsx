import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "users",

    initialState: {
        allUsers:[],//estado que siempre va a almacenar todos los usuarios
        users:[],
        payLink:"", number: 3, /// Nota: Enzo puede revisar porque estaba duplicado el initialState
        //yo habia creado dos estados
    },
    
     


    
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
        addbys: (state, action) => {
            state.movie = action.payload
        },

        deleteUserById: (state,action)=>{         
            state.users = state.users.filter(user=> user._id !== action.payload);    
            state.users = state.users.filter(user=> user._id !== action.payload);
        
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
     toPay,
     addbys,
     deleteUserById

   
} = userSlice.actions

export default userSlice.reducer