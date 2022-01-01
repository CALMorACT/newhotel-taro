/*
 * @Author: holakk
 * @Date: 2021-11-29 22:35:32
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-15 20:01:01
 * @Description: file content
 */

import { View, Text, Image, Form, Input } from "@tarojs/components";
import { AtButton, AtIcon, AtInput } from "taro-ui";

import LoginMain from "@/assets/images/Login/LoginMain.png";
import { useState } from "react";
import { getUserOrders, userLogin } from "@/utils/requestUtil";
import userState from "@/store/UserState";
import { setRoute } from "@/utils/routerUtil";
import { useRecoilState } from "recoil";
import Taro from "@tarojs/taro";

function Login() {
  const [isLogin, setIsLogin] = useRecoilState(userState.isLogin);
  const [userInfo, setUserInfo] = useRecoilState(userState.userInfo);
  const [userOrders, setUserOrders] = useRecoilState(userState.userOrders);
  const [userPhone, setUserPhone] = useState("");
  const [userPasswd, setUserPasswd] = useState("");
  if (userInfo.id != 0) {
    setRoute("/user/info");
    return <View></View>;
  }
  return (
    <View className='pt-7 pl-5 pr-5'>
      <View className=''>
        <View className='font-mono text-base font-semibold'>Welcome back!</View>
        <View className='font-mono text-gray-300 text-sm'>
          Login to continue.
        </View>
      </View>
      <Image src={LoginMain}></Image>
      <Form>
        <Text className='text-xs text-gray-300'>Phone</Text>
        <AtInput
          name='phoneNumber'
          placeholder='Your Phone Number'
          value={userPhone}
          type='phone'
          onChange={(value: string) => {
            setUserPhone(value);
          }}
          clear
          required
          focus
        ></AtInput>
        <Text className='text-xs text-gray-300'>Password</Text>
        <AtInput
          name='passwd'
          type='password'
          placeholder='Your Password'
          onChange={(value: string) => {
            setUserPasswd(value);
          }}
          clear
          required
        ></AtInput>
      </Form>
      <View className='text-white mb-4 mt-4'>
        <AtButton
          className='bg-purple-600 py-3 px-6'
          onClick={async () => {
            if (isLogin == true) {
              return;
            }
            try {
              const userName = await userLogin(userPhone, userPasswd);
              const Orders = await getUserOrders(20);
              if (userName) {
                setIsLogin(true);
                setUserInfo({
                  id: 1,
                  name: userName,
                });
                setUserOrders(Orders);
                setRoute("/user/info");
              }
            } catch (e) {
              let show_error: string;
              if (e.response) {
                console.log(e.response.data);
                console.log(e.response.status);
                console.log(e.response.headers);
                show_error = "服务器错误";
              } else if (e.request) {
                console.log(e.request);
                show_error = "请求错误";
              } else {
                console.log("Error", e.message);
                show_error = e.message;
              }
              Taro.showToast({
                title: show_error,
                icon: "none",
              });
              return;
            }
          }}
        >
          Login
        </AtButton>
      </View>

      <AtButton
        className='bg-purple-200 text-purple-600'
        onClick={() => {
          setRoute("/user/register");
        }}
      >
        Create Account
      </AtButton>
    </View>
  );
}

export default Login;
