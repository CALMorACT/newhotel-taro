/*
 * @Author: holakk
 * @Date: 2021-11-18 22:30:06
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-19 10:57:57
 * @Description: file content
 */
import { atom } from "recoil";

const isPageIndex = atom({
  key: "isPageIndex",
  default: false,
});
export default {
  isPageIndex,
};
