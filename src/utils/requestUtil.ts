/*
 * @Author: holakk
 * @Date: 2021-11-21 19:18:10
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-17 10:35:20
 * @Description: file content
 */
import { axios, AxiosResponse } from "taro-axios";

import sha256 from "crypto-js/sha256";
import Taro from "@tarojs/taro";
import { HotelCommit, HotelDetail, HotelRoom } from "@/types/Hotel";
import { UserOrder } from "@/types/User";

export async function getHotelList(data: any): Promise<AxiosResponse<any>> {
  return await axios.get("/api/hotel/gets", { params: data });
}

export async function getHotelDetail(hoid: string): Promise<any> {
  let type_arr = [
    "经济单人间",
    "经济双人间",
    "豪华套间",
    "商务房",
    "标准房",
    "家庭房",
    "榻榻米",
  ];

  let response = await axios.get("/api/hotel/gets", { params: { hoid: hoid } });
  let response_rooms = await axios.get("/api/rooms/gets", {
    params: { hoid: hoid },
  });
  let response_commits = await axios.get("/api/value/gets", {
    params: { hoid: '20000006' },
  });
  return {
    hotel_name: response.data[0].name,
    hotel_address: response.data[0].addr,
    hotel_star: Math.floor(3 + Math.random() * 2).toString(),
    hotel_score: response.data[0].star,
    hotel_room_num: Math.floor(100 + Math.random() * 400),
    hotel_open: Math.floor(2000 + Math.random() * 20),
    hotel_phone: response.data[0].pnum,
    hotel_intro: response.data[0].text,
    hotel_tags: response.data[0].ptag.split("，"),
    hotel_pics: response.data[0].pics.split("_"),
    covers_map: [
      {
        latitude: response.data[0].lats,
        longitude: response.data[0].lngs,
      },
    ],
    rooms: response_rooms.data.map((room) => {
      return {
        roid: room.roid,
        type: room.tags,
        pics: "http://192.168.177.115/images/" + room.pics.split("_")[0] + ".jpg",
        peop: room.nums,
        paid: room.paid,
        tgzc: room.tgzc == 1 ? true : false,
      } as HotelRoom;
    }),
    commits: response_commits.data.map((commit) => {
      return {
        scor: commit.star,
        name: commit.urid,
        upic: "http://192.168.177.115/images/" + commit.urpi + ".jpg",
        pics: commit.pics,
        type: type_arr[Math.floor(Math.random() * 7)],
        date: commit.time,
        time:
          Math.floor(2018 + Math.random() * 3).toString() +
          "-" +
          Math.floor(1 + Math.random() * 11).toString(),
        cont: commit.text,
        tnum: commit.nums,
        rnum: Math.floor(1 + Math.random() * 9).toString(),
      } as HotelCommit;
    }),
  } as HotelDetail;
}
export async function getMoreHotelCommit(hoid: string): Promise<any> {
  return true;
}

export async function userLogin(phone_num: string, passwd: string) {
  let res_salt = await axios.get("/api/login/requiresalt", {
    params: { pnum: phone_num, type: "user" },
  });
  if (res_salt.data.salt == null) {
    if (res_salt.data.flag == "fail") {
      throw new Error("用户不存在");
    }
    throw new Error("salt获取失败");
  }
  console.log(res_salt.data.salt);
  console.log(sha256(passwd + res_salt.data.salt).toString())
  let res_login = await axios.get("/api/login/users/posts", {
    params: {
      pnum: phone_num,
      type: "ups",
      pass: sha256(passwd + res_salt.data.salt).toString(),
    },
  });
  if (res_login.data.flag != "pass") {
    throw new Error("密码错误");
  }
  Taro.setStorage({
    key: "user_info",
    data: {
      seid: res_login.data.seid,
      seps: res_login.data.seps,
      urid: res_login.data.urid,
    },
  });
  let res_userInfo = await axios.get("/api/users/gets", {
    params: {
      type: "user",
      seid: res_login.data.seid,
      seps: res_login.data.seps,
      urid: res_login.data.urid,
    },
  });
  if (res_userInfo.status != 200) {
    throw new Error("获取用户信息失败");
  }
  return res_userInfo.data[0].name;
}

export async function getUserOrders(count: number): Promise<UserOrder[]> {
  let user_info = Taro.getStorageSync("user_info");
  let res_userOrders = await axios.get("/api/order/gets", {
    params: {
      nums: count,
      type: "user",
      urid: user_info.urid,
      seid: user_info.seid,
      seps: user_info.seps,
    },
  });
  if (res_userOrders.status != 200) {
    throw new Error("获取用户订单失败");
  }
  return res_userOrders.data.map((order) => {
    return {
      id: order.orid,
      name: order.yhxm,
      status: order.flag,
      time: order.time,
      tags: order.tags,
      paid: order.paid,
      nums: order.nums,
      chin: order.chin,

      hotel_id: order.hoid,
      hotel_name: order.name,
      pictures: order.pics,
      hotel_address: order.addr,
    };
  });
}

export async function getRegisterCode(phone_num: string) {
  let response_salt = await axios.get("/api/users/code?edit=add", {
    params: {
      pnum: phone_num,
    },
  });
  return response_salt.data.salt;
}

export async function userRegister(
  name: string,
  e_mail: string,
  phone_num: string,
  passwd: string,
  code: string,
  register_salt: string
) {
  if (phone_num.length != 11) {
    throw new Error("手机号长度不正确");
  }

  let response = await axios.get("/api/users/puts", {
    params: {
      edit: "new",
      type: "user",
      name: name,
      pnum: phone_num,
      pass: sha256(passwd + register_salt).toString(),
      code: sha256(code + register_salt).toString(),
      mail: e_mail,
    },
  });
  return response;
}

export default {
  getHotelList,
  userLogin,
  userRegister,
};
