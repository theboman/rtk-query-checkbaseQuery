import { useAppDispatch, useAppSelector } from '../store';
import { updateExpiredToken } from '../services/authSlice';

const CheckExpiredToken = () => {
  const auth = useAppSelector((state) => state.auth)
  const tokenExpireTime = auth.timestamp + 43200000;
  const timeNow = Date.now();
  const differenceTime = timeNow - tokenExpireTime;
  const dispatchGetExpiredToken = useAppDispatch()
  console.log("token is checked!")
  if (differenceTime >= 0) {
      // token is expired
      dispatchGetExpiredToken(updateExpiredToken({data: true}))
  }
  else {
      // token is not expired
      dispatchGetExpiredToken(updateExpiredToken({data: false}))
  }
}

export default CheckExpiredToken