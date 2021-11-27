/*
 * @Author: holakk
 * @Date: 2021-11-18 22:30:06
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-28 00:05:46
 * @Description: file content
 */
import { atom } from "recoil";
import { IndexHotel, ShowHotel } from "@/types/Hotel";

const hotelSearchKey = atom({
  key: "hotelSearchKey",
  default: false,
});

const hotelIndexList = atom({
  key: "hotelShowList",
  default: [] as IndexHotel[],
});
const hotelShowList = atom({
  key: "hotelShowList",
  default: [] as ShowHotel[],
});

export default {
  hotelSearchKey,
  hotelIndexList,
  hotelShowList,
};
