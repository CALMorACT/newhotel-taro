/*
 * @Author: holakk
 * @Date: 2021-11-21 19:32:14
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-16 22:06:15
 * @Description: file content
 */
export interface IndexHotel {
  name: string;
  pics: string;
  addr: string;
  paid: string;
}

export interface HotelRoom {
  roid: string;
  type: string;
  pics: string;
  peop: number;
  paid: number;
  tgzc: boolean;
}

export interface HotelCommit {
  name: string;
  upic: string;

  scor: number;

  pics: string;

  type: string; // 房型

  date: string; // 评论日期
  time: string; // 入住时间

  cont: string;

  tnum: string; // 点赞数量
  rnum: string; // 评论数量
}
export interface HotelDetail {
  hotel_name: string;
  hotel_address: string;
  hotel_star: string;
  hotel_score: number;
  hotel_room_num: number;
  hotel_open: number;
  hotel_phone: string;
  hotel_intro: string;
  hotel_tags: string[];
  hotel_pics: string[];
  covers_map: {
    latitude: string;
    longitude: string;
  }[];
  rooms: HotelRoom[];
  commits: HotelCommit[];
}

export interface ShowHotel {
  hoid: string;
  name: string;
  pics: string;
  score: number;
  sellNums: string;
  address: string;
  tags: string[];
  price: number;
}
