/*
 * @Author: holakk
 * @Date: 2021-11-26 11:08:27
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-16 21:34:31
 * @Description: file content
 */
import { AtSearchBar } from "taro-ui";
import { View, ITouchEvent } from "@tarojs/components";
import { DropdownItem, DropdownMenu, Slider, Button } from "@antmjs/vantui";
import HotelState, { hotelSortMethodEnum } from "@/store/HotelState";

import yellow_drill from "@/assets/images/黄钻.png";
import white_drill from "@/assets/images/白钻.png";
import { useRecoilState } from "recoil";
import { useState } from "react";

export default function MySearchBar(params: {
  value: string;
  onSearchChange: (arg0: any) => void;
  onSearch: (event: ITouchEvent) => void;
}) {
  // 设置排序方式，希望通过Recoil来监听排序方式以改动酒店列表
  const [hotelSortMethod, setHotelSortMethod] = useRecoilState(
    HotelState.hotelSortMethod
  );
  const [searchValue, setSearchValue] = useState(params.value);
  // 下拉组件需要的option参数
  const sortMethod = [
    {
      text: "智能排序",
      value: 0,
    },
    {
      text: "好评优先",
      value: 1,
    },
    {
      text: "低价优先",
      value: 2,
    },
    {
      text: "高价优先",
      value: 3,
    },
  ];
  return (
    <View>
      <AtSearchBar
        className='bg-blue-400'
        value={searchValue}
        placeholder='位置/品牌/酒店名'
        onChange={(value) => {
          setSearchValue(value);
          params.onSearchChange(value);
        }}
        onActionClick={params.onSearch}
      />
      {/* <DropdownMenu>
        <DropdownItem
          title='排序方式'
          value={hotelSortMethod}
          options={sortMethod}
          onChange={(value: hotelSortMethodEnum) => {
            setHotelSortMethod(value);
          }}
        ></DropdownItem>
        <DropdownItem title='价格/星级' options={[]}>
          <View className='text-gray-400 text-sm mb-6 mt-4'>价 格</View>
          <Slider
            className='w-50 ml-6'
            barHeight={16}
            value={[0, 10000]}
            range
            onChange={() => {}}
          />
          <View className='text-gray-400 text-sm mt-4'>星 级</View>
          <View>
            <Button
              plain
              type='primary'
              size='small'
              className='mx-auto w-28 ml-3'
            >
              经济型
            </Button>
            <Button
              plain
              type='primary'
              size='small'
              className='mx-auto w-28 ml-3'
            >
              舒适/三星
            </Button>
            <Button
              plain
              type='primary'
              size='small'
              className='mx-auto w-28 ml-3'
            >
              高档/四星
            </Button>
            <Button
              plain
              type='primary'
              size='small'
              className='mx-auto w-28 ml-3'
            >
              豪华/五星
            </Button>
            <Button
              plain
              type='primary'
              size='small'
              className='ml-2 mr-2'
              icon={yellow_drill}
            >
              黄金钻酒店
            </Button>
            <Button
              plain
              type='primary'
              size='small'
              className='ml-2 mr-2'
              icon={white_drill}
            >
              铂金钻酒店
            </Button>
          </View>
        </DropdownItem>
      </DropdownMenu> */}
    </View>
  );
}
