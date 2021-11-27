/*
 * @Author: holakk
 * @Date: 2021-11-17 21:56:19
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-18 22:24:22
 * @Description: file content
 */
import { useEffect } from 'react';

// Taro 额外添加的 hooks 要从 '@tarojs/taro' 中引入
import { useDidShow, useDidHide } from '@tarojs/taro';

// 假设我们要使用 Recoil

import { RecoilRoot } from 'recoil';

// 全局样式
import './app.scss';

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return <RecoilRoot>{props.children}</RecoilRoot>;
}

export default App;
