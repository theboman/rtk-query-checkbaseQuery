import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';


function checkIfCookieToken () {
 let myCookie = Cookies.get("uuid")
  // timestamp is stamp on when token is created in milliseconds
  // expiredToken triggers modal to open re: user do you want to login again?
  // 1637572970168 - 42300000

    if(myCookie){
      return {
        token: myCookie,
        expiredToken: false,
        timestamp: Date.now(),
      };
    } else {
      return {
        token: null,
        expiredToken: false, 
        timestamp: null,
      };
    }
}

const slice = createSlice({
  name: 'auth',
  initialState: checkIfCookieToken(),

  reducers: {
    setToken: (
      state,
      action
    ) => {
        Cookies.set('uuid', action.payload.data.access_token, { expires: 0.5, secure: true  })
        state.token = action.payload.data.access_token
        state.timestamp = Date.now()
        //window.location.href=`${window.location.origin}/resources/account.html`
    },
    // called with the logout which removes the cookie 
    setTokenLogout: (state)=>{
      state.token = null;
      state.timestamp = null;
      state.expiredToken = null;
      if(Cookies.get('uuid')) {
        Cookies.remove('uuid');
      }
    },
    updateExpiredToken: (state, action)=> {
      state.expiredToken = action.payload.data
    }

  },
})

export const { setToken, setTokenLogout, updateExpiredToken } = slice.actions

export default slice.reducer