/*
 * @Author: holakk
 * @Date: 2021-11-18 22:30:06
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-14 17:55:46
 * @Description: file content
 */
import { atom, selector } from "recoil";
import { User, UserOrder, OrderStatus } from "@/types/User";

const isLogin = atom({
  key: "isLogin", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const userInfo = atom({
  key: "userInfo",
  default: {
    id: 0,
    name: "",
  } as User,
});

const userOrders = atom({
  key: "userOrder",
  default: [] as UserOrder[],
});

export const enum showOrdersMethodEnum {
  All,
  WaitPay,
  WaitUse,
}

const showOrdersMethod = atom({
  key: "showOrdersMethod",
  default: showOrdersMethodEnum.All,
});

const showOrders = selector({
  key: "showOrders",
  get: ({ get }): UserOrder[] => {
    const storeOrders = get(userOrders);
    const ordersFilter = get(showOrdersMethod);
    return storeOrders.filter((item) => {
      switch (ordersFilter) {
        case 0:
          return true;
        case 1:
          return item.status === OrderStatus.WAIT_PAY;
        case 2:
          return item.status === OrderStatus.WAIT_USE;
        default:
          return true;
      }
    });
  },
});

export default {
  isLogin,
  userInfo,
  userOrders,
  showOrdersMethod,
  showOrders,
};
