import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';


function checkIfCookieToken () {
 let myCookie = Cookies.get("uuid")

    if(myCookie){
      return {
        token: myCookie,
        timestamp: Date.now(),
        expiredToken: false
      };
    } else {
      return {
        token: null,
        timestamp: Date.now(),
        expiredToken: false
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
    setTokenLogout: (state)=>{
      state.token = null;
      state.timestamp = Date.now()
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

