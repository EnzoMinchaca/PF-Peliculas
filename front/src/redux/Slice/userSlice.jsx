import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "users",

    initialState: {
        allUsers:[],//estado que siempre va a almacenar todos los usuarios
        users:[],
        fav: []

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

        addbys: (state) => {
            return {
                ...state
            }
        },

        addFav: (state, action) => {
            let array = [...state.fav, ...action.payload]
            if(array.length > 0) {
                let set = new Set( array.map( JSON.stringify ) )
                let arrSinDuplicaciones = Array.from( set ).map( JSON.parse );
                // console.log( arrSinDuplicaciones );
                state.fav = arrSinDuplicaciones
            } else {
                state.fav = [...action.payload]
            }
        },

        removeFav: (state, action) => {
            // console.log(state.fav)
            // localStorage.setItem("favs", JSON.stringify(state.favs.filter((e) => e._id !== action.payload)))
            state.fav = state.fav.filter((e) => e._id !== action.payload)
        },

        deleteUserById: (state,action)=>{         
            state.users = state.users.filter(user=> user._id !== action.payload);    
            state.users = state.users.filter(user=> user._id !== action.payload);
        
          },


        theUser: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        },

          filterByStatus: (state, action) => {

          let userFilter = [];
             state.allUsers.forEach(user => {
                 user.status.forEach(status => {
                 if (status === action.payload) {
                    userFilter.push(user)
                }
              })
            })
            state.users = userFilter;
          },
/*
            const status = action.payload
            if (status === "default")
              return {
                ...state,
                users: state.allUsers,
                filtered: state.allUsers,
              };
            else {
              let usersFiltered = state.allUsers?.filter((users) => {
                return users.status;
              });
              return {
                ...state,
                users: usersFiltered,
                filtered: usersFiltered,
              };
            }
          },*/

          editUserSt: (state, action)=>{
            return {
                ...state,
                data: action.payload
            }      
        },
          
        getUserName: (state, action)=>{
            state.users = action.payload        
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
     addbys,
     deleteUserById,
     theUser,
     filterByStatus,
     editUserSt,
     getUserName,
     addFav,
     removeFav


   
} = userSlice.actions

export default userSlice.reducer