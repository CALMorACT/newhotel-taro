/*
 * @Author: holakk
 * @Date: 2021-11-17 21:56:19
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-17 22:32:02
 * @Description: file content
 */
import { react, useState } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

function Index() {
  let [searchAddress, setSearchAddress] = useState('');

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  );
}

export default Index;
