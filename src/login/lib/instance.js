import axios from "axios";
import { Cookies } from "react-cookie";
const token = new Cookies().get("token");
// access 토큰 개발자 tool app>cookie 받아오기
const token2 = new Cookies().get("refreshToken");
// refresh 토큰 받아오기
axios.defaults.headers.common["Authorization"] = `${token}`;
axios.defaults.headers.common["Refresh-Token"] = `${token2}`;
console.log(token, token2);
// header에 토큰 받은것 담아주기 >> refresh 토큰으로 연장
const instance = axios.create({
  baseURL: "https://coding-kym.shop",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${token}`,
    "Refresh-Token": `${token2}`,
  },
});
//if (token !== undefined && token !== null) {
//  Headers.authorization = `Bearer ${token}`
//}
export default instance;
