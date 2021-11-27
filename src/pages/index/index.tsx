/*
 * @Author: holakk
 * @Date: 2021-11-17 21:56:19
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-26 10:58:20
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

import "./index.scss";

const list = [
  {
    title: "A",
    key: "A",
    items: [
      {
        name: "阿坝",
        // 此处可加其他业务字段
      },
      {
        name: "阿拉善",
      },
    ],
  },
  {
    title: "B",
    key: "B",
    items: [
      {
        name: "北京",
      },
      {
        name: "保定",
      },
    ],
  },
];

function Index() {
  let [currentSearchAddress, setCurrentSearchAddress] = useState("");
  let [currentSearchAddressFocus, setCurrentSearchAddressFocus] =
    useState(false);

  let [currentSearchTime, setCurrentSearchTime] = useState({
    end: 0,
    start: 0,
  });
  let [currentSearchTimeFocus, setCurrentSearchTimeFocus] = useState(false);

  // 获取登录状态
  let isLogin = useRecoilValue(UserState["isLogin"]);
  let SearchHotel = function () {
    // 搜索酒店并跳转
    if (isLogin == false) {
      Taro.showModal({
        title: "提示",
        content: "请先登录或注册！",
      });
    } else if (currentSearchAddress == "") {
      Taro.showModal({
        title: "提示",
        content: "请输入地点！",
      });
    } else if (currentSearchTime.start === 0 && currentSearchTime.end === 0) {
      Taro.showModal({
        title: "提示",
        content: "请输入时间！",
      });
    } else {
      setRoute("hotel");
    }
  };
  // 最近搜索+热门+所有
  return (
    <View className='index'>
      <PageIndex></PageIndex>
      <PageHead></PageHead>

      <AtButton
        type='primary'
        circle
        onClick={() => {
          if (currentSearchTime.end != 0) {
            SearchHotel();
            return;
          }
          setCurrentSearchAddressFocus(true);
        }}
        disabled={currentSearchTime.end == 0}
      >
        {currentSearchTime.end != 0 ? "确定" : "点击选择"}
      </AtButton>
      <View className='search-address' hidden={!currentSearchAddressFocus}>
        <AtIndexes
          list={list}
          onClick={(value) => {
            setCurrentSearchAddress(value);
            setCurrentSearchAddressFocus(false);
            setCurrentSearchTimeFocus(true);
          }}
        >
          <AtSearchBar
            value=''
            onChange={() => {}}
            placeholder='搜索地址'
            onActionClick={() => {}}
          />
        </AtIndexes>
      </View>
      <View className='search-time' hidden={!currentSearchTimeFocus}>
        <AtCalendar
          isMultiSelect
          minDate={Date.now()}
          maxDate={Date.now() + 60 * 60 * 24 * 1000 * 14}
          onSelectDate={(value: { end: number; start: number }) => {
            // start end
            setCurrentSearchTime(value);
          }}
        />
      </View>
    </View>
  );
}

export default Index;
