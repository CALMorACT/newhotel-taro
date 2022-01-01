/*
 * @Author: holakk
 * @Date: 2021-11-26 11:00:11
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-17 10:13:40
 * @Description: file content
 */

import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { View } from "@tarojs/components";
import PageHead from "@/components/PageHead";
import PageIndex from "@/components/PageIndex";
import HotelState from "@/store/HotelState";

import { getHotelList } from "@/utils/requestUtil";
import { ShowHotel } from "@/types/Hotel";

import MySearchBar from "./components//SearchBar";
import HotelItem from "./components/HotelItem";

function Hotel() {
  // TODO: 修改图片基本路径
  const baseImageUrl = "http://192.168.177.115/images/";
  const [hotelStoreList, setHotelStoreList] = useRecoilState(
    HotelState.hotelStoreList
  );
  const hotelShowList = useRecoilValue(HotelState.hotelShowList);
  const [searchValue, setSearchValue] = useState("");
  return (
    <View>
      <PageIndex></PageIndex>
      <PageHead></PageHead>
      <MySearchBar
        value={searchValue}
        onSearchChange={setSearchValue}
        onSearch={async () => {
          console.log(searchValue);
          const response = await getHotelList({
            // TODO: 修正city, 使用定位
            city: "上海",
            key: '古北',
            page: hotelStoreList.length / 5,
            nums: 5,
          });
          let newhotelStoreList: ShowHotel[] = [];
          if (response.status === 200 && response.data.length > 0) {
            response.data.forEach((item) => {
              newhotelStoreList.push({
                hoid: item.hoid,
                name: item.name,
                pics: baseImageUrl + item.pics.split("_")[0] + ".jpg",
                score: item.star,
                sellNums: item.nums,
                address: item.addr,
                tags: item.ptag.split("，"),
                price: item.paid,
              });
            });
          }
          setHotelStoreList(newhotelStoreList);
        }}
      ></MySearchBar>
      {hotelShowList.map((item, index) => {
        return (
          <HotelItem
            key={item.name + "_" + index}
            index={index}
            price={item.price}
            description={item.score + item.sellNums}
            address={item.address}
            name={item.name}
            image={item.pics}
            id={item.hoid}
            tags={item.tags}
          ></HotelItem>
        );
      })}
    </View>
  );
}
export default Hotel;
