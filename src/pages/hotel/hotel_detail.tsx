import PageHead from "@/components/PageHead";
import PageIndex from "@/components/PageIndex";
import { Swiper, SwiperItem, View, Image, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import { HotelDetail, ShowHotel } from "@/types/Hotel";
import { Tag, Button, Popup, Circle } from "@antmjs/vantui";
import HotelState from "@/store/HotelState";
import { useRecoilValue } from "recoil";
import { getHotelDetail } from "@/utils/requestUtil";
import Taro from "@tarojs/taro";

import HotelCommits from "./components/HotelCommits";
import HotelRooms from "./components/HotelRooms";
/*
 * @Author: holakk
 * @Date: 2021-11-29 22:33:58
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-10 18:00:48
 * @Description: file content
 */
function Detail() {
  let hotel_index = 0;
  useEffect(() => {
    let params: any = Taro.getCurrentInstance().router?.params;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hotel_index = parseInt(params.index);
    const hoid = AllhotelInfo[hotel_index].hoid;
    (async () => {
      const returnInfo = await getHotelDetail(hoid);
      setHotelInfo(returnInfo);
      setIsLoading(false);
    })();
  }, []);
  const AllhotelInfo = useRecoilValue(HotelState.hotelShowList);
  const [hotelInfo, setHotelInfo] = useState<HotelDetail>({} as HotelDetail);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowCommit, setIsShowCommit] = useState(false);
  const [isShowRooms, setIsShowRooms] = useState(false);
  const baseImageUrl = "http://192.168.177.115/images/";
  if (isLoading) return <View></View>;
  else {
    return (
      <>
        <PageHead></PageHead>
        <PageIndex></PageIndex>
        {/* 顶栏滑动显示图片 */}
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {hotelInfo.hotel_pics.map((pic, index) => {
            if (pic !== "") {
              return (
                <SwiperItem key={`index_${index}`}>
                  <Image
                    src={`${baseImageUrl + pic}.jpg`}
                    className='ml-5'
                  ></Image>
                </SwiperItem>
              );
            }
          })}
        </Swiper>
        <View className='font-black text-base mt-6 ml-2'>
          {hotelInfo.hotel_name}
        </View>
        {/* 标签 */}
        <View className='mt-4'>
          {hotelInfo.hotel_tags.map((tag, index) => {
            return (
              <Tag
                className='ml-2'
                style={{ fontSize: "15px" }}
                type={
                  ["primary", "success", "warning", "danger"][
                    Math.ceil(Math.random() * 4)
                  ]
                }
                key={`index_${index}`}
              >
                {tag}
              </Tag>
            );
          })}
        </View>
        {/* 星级 评分*/}
        <View className='mt-4 text-sm ml-2'>
          <View className='at-icon at-icon-star-2 text-yellow-300'></View>
          <View className='at-icon at-icon-star-2 text-yellow-300'></View>
          <View className='at-icon at-icon-star-2 text-yellow-300'></View>
          <View className='at-icon at-icon-star-2 text-yellow-300'></View>
          <View className='at-icon at-icon-star-2 text-yellow-300'></View>
          <Text>{`( ${hotelInfo.hotel_score} 分)`}</Text>
        </View>
        {/* 地点 */}
        <View className='mt-1 ml-2'>
          <View className='at-icon at-icon-map-pin'></View>
          <Text className='text-sm text-gray-600'>
            {hotelInfo.hotel_address}
          </Text>
        </View>
        {/* 详细介绍 */}
        <View className='ml-2'>
          <View className='font-bold mt-4'>详情</View>
          <Text className='text-sm text-gray-600'>{hotelInfo.hotel_intro}</Text>
        </View>
        {/* 评论 */}
        <Popup
          show={isShowCommit}
          closeable
          closeIcon='close'
          position='bottom'
          onClose={() => {
            setIsShowCommit(false);
          }}
        >
          {hotelInfo.commits.map((commit, index) => {
            return (
              <HotelCommits
                key={`${commit.upic}_${index}`}
                commit={commit}
              ></HotelCommits>
            );
          })}
        </Popup>
        {/* 房间列表 */}
        <Popup
          show={isShowRooms}
          closeable
          closeIcon='close'
          position='bottom'
          onClose={() => {
            setIsShowRooms(false);
          }}
        >
          <HotelRooms rooms={hotelInfo.rooms}></HotelRooms>
        </Popup>
        {/* 按钮 */}
        <View>
          <Button
            className='float-left'
            type='default'
            onClick={() => {
              setIsShowCommit(true);
            }}
          >
            查看评论
          </Button>
          <Button
            className='float-right'
            type='default'
            onClick={() => {
              setIsShowRooms(true);
            }}
          >
            选择房间
          </Button>
        </View>
      </>
    );
  }
}

export default Detail;
