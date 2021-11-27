/*
 * @Author: holakk
 * @Date: 2021-11-19 10:57:00
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-26 10:57:38
 * @Description: file content
 */
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { AtDrawer, AtAccordion, AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";

import { setRoute } from "@/utils/routerUtil";
import LayerState from "@/store/LayerState";
import UserState from "@/store/UserState";

function PageIndex() {
  let [isPageIndex, setIsPageIndex] = useRecoilState(LayerState["isPageIndex"]);
  let isLogin = useRecoilValue(UserState["isLogin"]);
  let [, setIsLogout] = useRecoilState(UserState["isLogout"]);
  let [isOpenhotel, setIsOpenhotel] = useState(false);
  let [isOpenAccountInfo, setIsOpenAccountInfo] = useState(false);
  return (
    <AtDrawer
      show={isPageIndex}
      mask
      onClose={() => {
        setIsPageIndex(false);
      }}
    >
      <AtList>
        <AtAccordion
          title='酒店信息'
          open={isOpenhotel}
          onClick={() => {
            setIsOpenhotel(!isOpenhotel);
          }}
        >
          <AtList>
            <AtListItem
              title='酒店列表'
              note='平台支持的酒店'
              arrow='right'
              thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              onClick={() => {
                setRoute("hotel");
              }}
            ></AtListItem>
            <AtListItem
              title='酒店推荐'
              note='推荐给'
              arrow='right'
              thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              onClick={() => {
                setRoute("hotel");
              }}
            ></AtListItem>
          </AtList>
        </AtAccordion>
        <AtAccordion
          open={isOpenAccountInfo}
          onClick={() => {
            setIsOpenAccountInfo(!isOpenAccountInfo);
          }}
          title='账户信息'
        >
          <AtList>
            <AtListItem
              title='个人信息'
              note='查看和编辑个人具体信息'
              arrow='right'
              thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              onClick={() => {
                setRoute("user");
              }}
            />
            <AtListItem
              title='订单信息'
              note='查看订单详情'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              onClick={() => {
                setRoute("order");
              }}
            />
            <AtListItem
              title='退出登录'
              note='将个人账户从设备登出'
              arrow='right'
              thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              onClick={() => {
                if (isLogin) {
                  setIsLogout(true);
                  setRoute("login");
                } else {
                  Taro.showModal({
                    title: "提示",
                    content: "请先登录或注册！",
                  });
                }
              }}
            />
          </AtList>
        </AtAccordion>
      </AtList>
    </AtDrawer>
  );
}

export default PageIndex;
