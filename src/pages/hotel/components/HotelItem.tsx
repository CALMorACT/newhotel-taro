/*
 * @Author: holakk
 * @Date: 2021-11-26 11:08:39
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-16 21:21:31
 * @Description: file content
 */

import { View, Image } from "@tarojs/components";

import { Card } from "@antmjs/vantui";

import { setRoute } from "@/utils/routerUtil";

function HotelItem(params: {
  index: number;
  price: number;
  description: string | null | undefined;
  name: string | undefined;
  image: string;
  address: string | undefined;
  tags: string[];
  id: string;
}) {
  return (
    <View
      onClick={() => {
        setRoute(`/hotel/hotel_detail?index=${params.index}`);
      }}
    >
      <Card
        centered
        className='bg-blue-200'
        price={`${params.price}`}
        renderThumb={
          <Image
            mode='scaleToFill'
            src={params.image}
            className='w-28 h-25 rounded-md mt-2'
          ></Image>
        }
        renderTitle={
          <View className='text-xs font-gray-500'>{params.name}</View>
        }
        renderDesc={
          <View>
            <View className='font-gray-300' style={{ fontSize: "16px" }}>
              {params.address}
            </View>
          </View>
        }
      ></Card>
    </View>
  );
}

function HotelItem2(params: any) {
  return (
    <View>
      <View>
        <Image src={params.image}></Image>
      </View>
      <View>
        <View>{params.name}</View>
        <View>{params.description}</View>
        <View>{params.address}</View>
        {params.tags.map((item: any, index: number) => (
          <View key={params.id + "_tag_" + index}>{item}</View>
        ))}
        <View>{params.price}</View>
        <View>{params.margin}</View>
      </View>
    </View>
  );
}

export default HotelItem;
