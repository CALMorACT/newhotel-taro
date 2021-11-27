/*
 * @Author: holakk
 * @Date: 2021-11-26 11:00:11
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-27 22:53:05
 * @Description: file content
 */

import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtButton, AtCalendar, AtIndexes, AtSearchBar } from "taro-ui";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import PageHead from "@/components/PageHead";
import PageIndex from "@/components/PageIndex";
import UserState from "@/store/UserState";
import { setRoute } from "@/utils/routerUtil";
import {} from '@/utils/'

import SearchBar from "./components//SearchBar";
import HotelItem from "./components/HotelItem";

function Hotel() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <View>
      <PageIndex></PageIndex>
      <PageHead></PageHead>
      <SearchBar
        value={searchValue}
        onSearchChange={setSearchValue}
        onSearch={() => {}}
      ></SearchBar>
      <HotelItem></HotelItem>
    </View>
  );
}
