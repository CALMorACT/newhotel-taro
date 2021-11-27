/*
 * @Author: holakk
 * @Date: 2021-11-18 22:30:06
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-18 22:36:09
 * @Description: file content
 */
import { atom } from "recoil";

const isLogin = atom({
  key: "isLogin", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const isLogout = atom({
  key: "isLogout",
  default: false,
});

const userInfo = atom({
  key: "userInfo",
  default: {
    name: "",
  },
});

export default {
  isLogin,
  isLogout,
  userInfo,
};
