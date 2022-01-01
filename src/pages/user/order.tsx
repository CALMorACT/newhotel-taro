import PageHead from "@/components/PageHead";
import PageIndex from "@/components/PageIndex";
import { View, Text, Image } from "@tarojs/components";
import UserState from "@/store/UserState";
import { useRecoilValue } from "recoil";
/*
 * @Author: holakk
 * @Date: 2021-12-10 09:04:11
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-14 20:45:27
 * @Description: file content
 */
function Order() {
  const orderString = ["未支付", "未入住", "已入住", "已完成", "已取消"];
  const userOrders = useRecoilValue(UserState.showOrders);
  return (
    <View>
      <PageHead></PageHead>
      <PageIndex></PageIndex>
      {userOrders.length === 0 && (
        <View className='text-xs text-blue-500 text-center'>~~~空的哎~~~</View>
      )}
      {userOrders.map((item, index) => {
        return (
          <View key={`index_order_${index}`}>
            <View></View>
            <View>{item.hotel_name}</View>
            <View>{orderString[item.status]}</View>
            <Image src={item.pictures[0]}></Image>
            <View>
              <Text>{`${item.nums}间`}</Text>
              <Text>{item.name}</Text>
              <Text>{item.time}</Text>
              <Text>{`总价: ￥${item.paid}`}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default Order;
