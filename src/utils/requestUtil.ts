/*
 * @Author: holakk
 * @Date: 2021-11-21 19:18:10
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-27 23:38:11
 * @Description: file content
 */
import { axios } from "taro-axios";

export async function getHotelList(data: any): Promise<void> {
  const response = await axios.get("/api/hotel/gets", { data: data });
  
}

export default {
  getHotelList,
};
