/*
 * @Author: holakk
 * @Date: 2021-11-26 11:08:27
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-27 22:46:46
 * @Description: file content
 */

import { View, Text, ITouchEvent } from "@tarojs/components";
import {
  Search,
  DropdownItem,
  DropdownMenu,
  Cell,
  Slider,
  Button,
} from "@antmjs/vantui";
import { useState } from "react";

import yellow_drill from "@/assets/images/黄钻.png";
import white_drill from "@/assets/images/白钻.png";

export default function SearchBar(params: {
  value: string | number | undefined;
  onSearchChange: (arg0: any) => void;
  onSearch: () => void;
}) {
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
      <Search
        value={params.value}
        shape='round'
        background='#4fc08d'
        placeholder='位置/品牌/酒店名'
        onChange={(value) => {
          params.onSearchChange(value.detail);
        }}
        onSearch={params.onSearch}
      />
      <DropdownMenu>
        <DropdownItem options={sortMethod}></DropdownItem>
        <DropdownItem title='价格/星级' options={[]}>
          <Text selectable={false} space='ensp'>
            价 格
          </Text>
          <Slider value={[0, 10000]} range change={this.onChange} />
          <Text selectable={false} space='ensp'>
            星 级
          </Text>
          <View>
            <Button plain type='primary'>
              经济型
            </Button>
            <Button plain type='primary'>
              舒适/三星
            </Button>
            <Button plain type='primary'>
              高档/四星
            </Button>
            <Button plain type='primary'>
              豪华/五星
            </Button>
            <Button plain type='primary' icon={yellow_drill}>
              黄金钻酒店
            </Button>
            <Button plain type='primary' icon={white_drill}>
              铂金钻酒店
            </Button>
          </View>
        </DropdownItem>
      </DropdownMenu>
    </View>
  );
}
