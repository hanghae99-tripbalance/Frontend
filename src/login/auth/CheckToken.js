import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCookieToken,
  removeCookieToken,
  setRefreshToken,
} from "../../storage/Cookie";
import { DELETE_TOKEN, SET_TOKEN } from "../../redux/modules/Auth";
// import { DELETE_USER, SET_USER } from "../redux/modules/UserSlice";
import { requestToken } from "../api/Users";

export function CheckToken(key) {
  const [isAuth, setIsAuth] = useState("Loading");
  const { authenticated, accessToken, expireTime } = useSelector(
    (state) => state.token
  );
  const refreshToken = getCookieToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthToken = async () => {
      if (refreshToken === undefined) {
        dispatch(DELETE_TOKEN());
        // dispatch(DELETE_USER());
        setIsAuth("Failed");
      } else {
        if (authenticated && new Date().getTime() < expireTime) {
          setIsAuth("Success");
        } else {
          const response = await requestToken({
            authorization: accessToken,
            refresh_token: refreshToken,
          });
          //console.log(response);
          if (response.status) {
            const accessToken = response.headers.authorization;
            removeCookieToken();
            setRefreshToken(response.headers.refresh_token);
            dispatch(SET_TOKEN(accessToken));
            // dispatch(SET_USER(response.userInfo));
            setIsAuth("Success");
          } else {
            dispatch(DELETE_TOKEN());
            // dispatch(DELETE_USER());
            removeCookieToken();
            setIsAuth("Failed");
          }
        }
      }
    };
    checkAuthToken();
  }, [refreshToken, dispatch, key]);

  return {
    isAuth,
  };
}
