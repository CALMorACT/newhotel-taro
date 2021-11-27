/*
 * @Author: holakk
 * @Date: 2021-11-19 21:11:40
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-26 11:34:14
 * @Description: file content
 */

import Taro from "@tarojs/taro";

export function setRoute(aim: string) {
  console.log(aim);
  Taro.navigateTo({
    url: aim,
  });
  return "";
}

export function goHotelDetail(id: string) {
  Taro.redirectTo({
    url: "/hotel/hotel_detail?hoid=" + JSON.stringify(id),
  });
}
