/*
 * @Author: holakk
 * @Date: 2021-11-17 21:56:19
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-17 10:15:43
 * @Description: file content
 */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtButton, AtCalendar, AtIndexes, AtSearchBar } from "taro-ui";
import { Transition } from "@antmjs/vantui";
import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import PageHead from "@/components/PageHead";
import PageIndex from "@/components/PageIndex";
import UserState from "@/store/UserState";
import { setRoute } from "@/utils/routerUtil";
import carouselOne from "@/assets/images/Index/carousel-1.jpg";
import carouselTwo from "@/assets/images/Index/carousel-2.jpg";
import carouselThree from "@/assets/images/Index/carousel-3.jpg";
import HotelState from "@/store/HotelState";
import { axios } from "taro-axios";
import { IndexHotel } from "@/types/Hotel";

const list = [
  {
    title: "B",
    key: "B",
    items: [
      {
        name: "北京",
      },
    ],
  },
  {
    title: "C",
    key: "C",
    items: [
      {
        name: "成都",
      },
    ],
  },
  {
    title: "G",
    key: "G",
    items: [
      {
        name: "广州",
      },
    ],
  },
  {
    title: "S",
    key: "S",
    items: [
      {
        name: "上海",
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
  let [allLastInfo, setAllLastInfo] = useRecoilState(HotelState.hotelIndexList);
  useEffect(() => {
    axios
      .get("/api/hotel/gets", {
        params: {
          nums: 20,
        },
      })
      .then((res) => {
        let out_list = [] as IndexHotel[];
        res.data.forEach((item) => {
          let pic_array = item.pics.split("_");
          out_list.push({
            name: item.name,
            pics: "http://192.168.177.115/images/" + pic_array[0] + ".jpg",
            addr: item.addr,
            paid: item.paid,
          });
        });
        setAllLastInfo(out_list);
      });
  }, [setAllLastInfo]);
  let [currentSearchTimeFocus, setCurrentSearchTimeFocus] = useState(false);
  // 获取登录状态
  let isLogin = useRecoilValue(UserState["isLogin"]);
  // 搜索酒店并跳转
  let SearchHotel = function () {
    if (isLogin == false) {
      Taro.showModal({
        title: "提示",
        content: "请先登录或注册！",
        success: function (res) {
          if (res.confirm) {
            setRoute("/user/login");
          }
        },
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
      setRoute("/hotel/hotel");
    }
  };
  // 最近搜索+热门+所有
  return (
    <View className='index'>
      <PageIndex></PageIndex>
      <PageHead></PageHead>
      <Swiper
        className='mb-5 h-30'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <Image src={carouselOne} className='ml-5'></Image>
        </SwiperItem>
        <SwiperItem>
          <Image src={carouselTwo} className='ml-5'></Image>
        </SwiperItem>
        <SwiperItem>
          <Image src={carouselThree} className='ml-5'></Image>
        </SwiperItem>
      </Swiper>
      <AtButton
        className='w-42'
        type='primary'
        circle
        onClick={() => {
          if (currentSearchTime.end != 0) {
            SearchHotel();
            return;
          }
          setCurrentSearchAddressFocus(!currentSearchAddressFocus);
        }}
        disabled={currentSearchAddress != "" && currentSearchTime.end == 0}
      >
        {currentSearchTime.end != 0 ? "确定" : "点击选择"}
      </AtButton>
      <Transition name='fade-down' show={currentSearchAddressFocus}>
        <View className='mt-5 search-address'>
          <AtIndexes
            list={list}
            onClick={(value) => {
              setCurrentSearchAddress(value.name);
              setCurrentSearchAddressFocus(false);
              setCurrentSearchTimeFocus(true);
            }}
          ></AtIndexes>
        </View>
      </Transition>
      <Transition name='fade-up' show={currentSearchTimeFocus}>
        <View className='search-time'>
          <AtCalendar
            isMultiSelect
            minDate={Date.now()}
            maxDate={Date.now() + 60 * 60 * 24 * 1000 * 14}
            onSelectDate={(value: { end: number; start: number }) => {
              setCurrentSearchTime(value);
            }}
          />
        </View>
      </Transition>
      {allLastInfo.map((info: IndexHotel, index) => {
        console.log(info);
        if (info.pics) {
          return (
            <View
              className='mt-4 bg-gray-100 w-60 h-30 flex justify-center items-center rounded-md ml-2'
              key={`index_images_${index}`}
            >
              <Image className='h-20 w-20 rounded-lg' src={info.pics}></Image>
              <View className='h-20 ml-3 w-40'>
                <View className='text-sm mb-2'>{info.name}</View>
                <View className='text-xs text-gray-400'>{info.addr}</View>
              </View>
            </View>
          );
        } else {
          return <View></View>;
        }
      })}
    </View>
  );
}

export default Index;
