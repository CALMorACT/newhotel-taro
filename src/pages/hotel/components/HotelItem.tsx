/*
 * @Author: holakk
 * @Date: 2021-11-26 11:08:39
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-27 23:58:36
 * @Description: file content
 */

import { View, Image } from "@tarojs/components";

import { Card } from "@antmjs/vantui";

function HotelItem(params: {
  price: string;
  description: string | null | undefined;
  name: string | undefined;
  image: string | undefined;
  address: string | undefined;
  tags: string[];
  id: string;
}) {
  return (
    <View>
      <Card
        price={params.price}
        title={params.name}
        thumb={params.image}
        renderDesc={() => {
          return (
            <View>
              <View>{params.description}</View>
              <View>{params.address}</View>
            </View>
          );
        }}
        renderTags={() => {
          return (
            <View>
              {params.tags.map((item: any, index: number) => (
                <View key={params.id + "_tag_" + index}>{item}</View>
              ))}
            </View>
          );
        }}
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
