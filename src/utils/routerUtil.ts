/*
 * @Author: holakk
 * @Date: 2021-11-19 21:11:40
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-03 22:49:51
 * @Description: file content
 */

import Taro from "@tarojs/taro";

export function setRoute(aim: string) {
  console.log(aim);
  Taro.navigateTo({
    url: "/pages" + aim,
  });
  return "";
}

export function goHotelDetail(id: string) {
  Taro.redirectTo({
    url: "/hotel/hotel_detail?hoid=" + JSON.stringify(id),
  });
}
