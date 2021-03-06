/*
 * @Author: holakk
 * @Date: 2021-11-18 22:02:53
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-12 20:38:43
 * @Description: file content
 */
import { View } from "@tarojs/components";
import { useRecoilState } from "recoil";
import { AtNavBar } from "taro-ui";

import { setRoute } from "@/utils/routerUtil";

import UserState from "@/store/UserState";
import LayerState from "@/store/LayerState";

function PageHead() {
  let [isLogin, setIsLogin] = useRecoilState(UserState["isLogin"]);
  let [userInfo, setUserInfo] = useRecoilState(UserState["userInfo"]);
  let [, setIsPageIndex] = useRecoilState(LayerState["isPageIndex"]);
  return (
    <View className='page-head'>
      <AtNavBar
        // 返回主页
        onClickLeftIcon={() => {
          setRoute("/index/index");
        }}
        // 选择性跳转 用户登录/用户信息
        onClickRgIconNd={() => {
          if (isLogin) {
            setRoute("/user/info");
          } else {
            setRoute("/user/login");
          }
        }}
        // 展开功能列表
        onClickRgIconSt={() => {
          setIsPageIndex(true);
        }}
        leftText='主页'
        leftIconType='home'
        rightFirstIconType='bullet-list'
        rightSecondIconType='user'
      ></AtNavBar>
    </View>
  );
}

export default PageHead;
