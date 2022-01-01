/*
 * @Author: holakk
 * @Date: 2021-12-03 22:40:21
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-17 08:51:03
 * @Description: file content
 */
import { View, Text, Image } from "@tarojs/components";
import { AtAvatar, AtList, AtListItem } from "taro-ui";
import PageHead from "@/components/PageHead";
import PageIndex from "@/components/PageIndex";
import userState, { showOrdersMethodEnum } from "@/store/UserState";

import UserHead from "@/assets/images/UserHead.jpg";
import { useRecoilState, useRecoilValue } from "recoil";
import { setRoute } from "@/utils/routerUtil";
//TODO: 增加修改的部分
function UserInfo() {
  const userinfo = useRecoilValue(userState.userInfo);
  const isLogin = useRecoilValue(userState.isLogin);
  const [, setShowOrdersMethod] = useRecoilState(userState.showOrdersMethod);
  if (!isLogin) {
    setRoute("/user/login");
    return <View></View>;
  }
  return (
    <View>
      <PageHead></PageHead>
      <PageIndex></PageIndex>
      <View className='flex justify-center items-center mt-8'>
        <AtAvatar image={UserHead} text='头像' circle size='large'></AtAvatar>
        <Text className='ml-4'>nini</Text>
      </View>
      <View className='px-8 mt-15'>
        <View className='flex justify-center items-center'>
          <View
            className='w-14 inline-block text-xs text-center'
            onClick={() => {
              setShowOrdersMethod(showOrdersMethodEnum.All);
              return;
            }}
          >
            <View className='w-14 at-icon at-icon-shopping-cart text-xl' />
            全部订单
          </View>
          <View
            className='w-14 inline-block text-xs text-center ml-3'
            onClick={() => {
              setShowOrdersMethod(showOrdersMethodEnum.WaitPay);
              return;
            }}
          >
            <View className='w-14 at-icon at-icon-shopping-cart text-xl' />
            待支付
          </View>
          <View
            className='w-14 inline-block text-xs text-center ml-3'
            onClick={() => {
              setShowOrdersMethod(showOrdersMethodEnum.WaitUse);
              return;
            }}
          >
            <View className='w-14 at-icon at-icon-shopping-cart text-xl' />
            待使用
          </View>
        </View>
        <AtList className='mt-14'>
          <AtListItem title='我的卡券' arrow='right' className=''></AtListItem>
          <AtListItem title='我的服务' arrow='right' className=''></AtListItem>
          <AtListItem title='用户反馈' arrow='right' className=''></AtListItem>
          <AtListItem title='关于软件' arrow='right' className=''></AtListItem>
        </AtList>
      </View>
    </View>
  );
}

export default UserInfo;
