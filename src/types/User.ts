/*
 * @Author: holakk
 * @Date: 2021-12-03 20:18:47
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-14 17:57:12
 * @Description: file content
 */
export const enum OrderStatus {
  WAIT_PAY, // "未支付"
  WAIT_USE, // "未入住"
  WAIT_COMMENT, // "已入住"
  FINISH, // "已完成"
  CANCEL, // "已取消"
}

export interface User {
  id: number;
  name: string;
}
export interface UserOrder {
  id: string;
  name: string;
  status: OrderStatus;
  hotel_id: string;
  hotel_name: string;
  pictures: string[];
  hotel_address: string;
  nums: number;
  chin: string;
  time: string;
  tags: string[];
  paid: string;
}
