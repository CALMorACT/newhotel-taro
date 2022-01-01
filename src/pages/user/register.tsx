/*
 * @Author: holakk
 * @Date: 2021-11-30 17:12:58
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-17 00:43:25
 * @Description: file content
 */
import { View, Text, Image, Form, Input } from "@tarojs/components";
import { useState } from "react";
import { AtButton, AtIcon, AtInput, AtForm } from "taro-ui";

import { useRecoilState } from "recoil";

import { getRegisterCode, userRegister } from "@/utils/requestUtil";
import userState from "@/store/UserState";
import { setRoute } from "@/utils/routerUtil";
import Taro from "@tarojs/taro";
import { AxiosResponse } from "taro-axios";
import { netSolver } from "@/errors/netSolver";

function Register() {
  const [, setIsLogin] = useRecoilState(userState.isLogin);
  const [, setUserInfo] = useRecoilState(userState.userInfo);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  let reGetInterval: NodeJS.Timer;
  const [codeInterval, setCodeInterval] = useState(0);
  let res_register_salt: string;
  return (
    <View>
      <Text className='mt-10 self-center flex flex-col justify-center items-center font-bold text-xl font-serif'>
        注 册
      </Text>
      <AtForm
        className='mt-10 ml-8 mr-8'
        onSubmit={async () => {
          let response: AxiosResponse<any>;
          try {
            response = await userRegister(
              name,
              email,
              phone,
              passwd,
              verifyCode,
              res_register_salt
            );
          } catch (e) {
            Taro.showToast({
              title: netSolver(e),
              icon: "none",
            });
            return;
          }
          Taro.showToast({
            title: "注册成功",
            icon: "success",
          });
          Taro.setStorage({
            key: "user_info",
            data: {
              seid: response.data.seid,
              seps: response.data.seps,
              urid: response.data.urid,
            },
          });
          setIsLogin(true);
          setUserInfo({
            id: 1,
            name: name,
          });
          setRoute("/user/info");
        }}
      >
        <AtInput
          name='nickName'
          title='昵称'
          type='text'
          placeholder='请输入昵称'
          value={name}
          onChange={(value: string) => {
            setName(value);
          }}
        ></AtInput>
        <AtInput
          name='email'
          title='邮箱'
          type='text'
          placeholder='请输入邮箱'
          onChange={(value: string) => {
            setEmail(value);
          }}
        ></AtInput>
        <AtInput
          name='passwd'
          title='密码'
          type='password'
          onChange={(value: string) => {
            setPasswd(value);
          }}
        ></AtInput>
        <AtInput
          name='RePasswd'
          title='确认密码'
          type='password'
          placeholder='请再次输入密码'
          onChange={(value: string) => {
            if (value != passwd) {
            }
          }}
        ></AtInput>
        <AtInput
          name='phone'
          title='手机号'
          type='phone'
          placeholder='请输入手机号'
          onChange={(value: string) => {
            setPhone(value);
          }}
        ></AtInput>
        <AtInput
          clear
          title='验证码'
          type='text'
          maxlength={4}
          placeholder='验证码'
          name='verifyCode'
          onChange={(value: string) => {
            setVerifyCode(value);
          }}
        >
          <AtButton
            type='secondary'
            size='small'
            circle
            disabled={codeInterval > 0}
            onClick={async () => {
              try {
                res_register_salt = await getRegisterCode(phone);
              } catch (e) {
                Taro.showToast({
                  title: netSolver(e),
                  icon: "none",
                });
                return;
              }
              Taro.showToast({
                title: "发送成功",
                icon: "success",
              });

              setCodeInterval(60);
              reGetInterval = setInterval(() => {
                setCodeInterval((code) => {
                  return code - 1;
                });
              }, 1000);
              setTimeout(() => {
                clearInterval(reGetInterval);
              }, 60000);
            }}
          >
            {codeInterval > 0 ? `重新获取${codeInterval}s` : "获取验证码"}
          </AtButton>
        </AtInput>
        <View className='mt-4 mb-6'>
          <AtButton type='primary' formType='submit'>
            注册
          </AtButton>
        </View>
        <AtButton formType='reset'>重置</AtButton>
      </AtForm>
    </View>
  );
}
export default Register;
