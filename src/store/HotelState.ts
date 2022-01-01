/*
 * @Author: holakk
 * @Date: 2021-11-18 22:30:06
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-17 00:02:36
 * @Description: file content
 */
import { atom, selector } from "recoil";
import { IndexHotel, ShowHotel } from "@/types/Hotel";

export enum hotelSortMethodEnum {
  SmartSort,
  GoodComment,
  LowPrice,
  HighPrice,
}

const hotelSearchKey = atom({
  key: "hotelSearchKey",
  default: false,
});

const hotelIndexList = atom({
  key: "hotelIndexList",
  default: [] as IndexHotel[],
});

const hotelStoreList = atom({
  key: "hotelStoreList",
  default: [] as ShowHotel[],
});

const hotelShowList = selector({
  key: "hotelShowList",
  get: ({ get }): ShowHotel[] => {
    const filter = get(hotelFilter);
    const sorter = get(hotelSortMethod);
    const storeList = get(hotelStoreList);

    let filetedList = storeList.filter(
      (item) => item.price >= filter.price.min && item.price <= filter.price.max
    );

    filetedList.sort((a, b) => {
      switch (sorter) {
        case hotelSortMethodEnum.SmartSort:
          return b.score - a.score;
        case hotelSortMethodEnum.GoodComment:
          return b.score - a.score;
        case hotelSortMethodEnum.LowPrice:
          return a.price - b.price;
        case hotelSortMethodEnum.HighPrice:
          return b.price - a.price;
        default:
          return a.score - b.score;
      }
    });

    return filetedList;
  },
});

const hotelSortMethod = atom({
  key: "hotelSortMethod",
  default: hotelSortMethodEnum.SmartSort,
});

const hotelFilter = atom({
  key: "hotelFilter",
  default: {
    price: {
      max: 10000,
      min: 0,
    },
    tags: {
      经济型: false,
      "舒适/三星": false,
      "高档/四星": false,
      "豪华/五星": false,
      黄金钻酒店: false,
      铂金钻酒店: false,
    },
  },
});

export default {
  hotelSearchKey,
  hotelIndexList,
  hotelShowList,
  hotelSortMethod,
  hotelStoreList,
};
