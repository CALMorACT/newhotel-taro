/*
 * @Author: holakk
 * @Date: 2021-11-21 19:32:14
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-28 00:03:36
 * @Description: file content
 */
export interface IndexHotel {
  name: string;
  pics: string;
  addr: string;
  paid: string;
}

export interface ShowHotel {
  hoid: string;
  name: string;
  pics: string;
  score: string;
  sellNums: string;
  address: string;
  tags: string[];
  price: string;
}
