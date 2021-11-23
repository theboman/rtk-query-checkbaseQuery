import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { pokemonApi } from './services/pokemon'
import authReducer from './services/authSlice'
//import Cookies from 'js-cookie';


const tokenChkMiddleware = (store) => {
  return next => {
    return action => {
      //const tokenCookie = Cookies.get("uuid")
      

      //check if token is present
      console.log("hello from middleware")
      console.log(action)
      // if (tokenCookie) {
      //   console.log("token is present")
      // }
      if (store.getState().auth.token) {
        const tokenExpireTime = store.getState().auth.timestamp + 20000;
        const timeNow = Date.now();
        const differenceTime = timeNow - tokenExpireTime;
        console.log(timeNow, tokenExpireTime, differenceTime);
        if (differenceTime >= 0) {
          console.log("token is expired")
          // token is expired
          //(updateExpiredToken({data: true}))
          return next({type:"auth/updateExpiredToken", payload: {data: true}})
        } else {
        //check if token is expired
        console.log("token is still good to go!");
        return next(action)
        }
      }
      console.log("Middleware ran");
      return next(action)
    }
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenChkMiddleware).concat(pokemonApi.middleware),
})


