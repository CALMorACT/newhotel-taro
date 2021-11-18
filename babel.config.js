/*
 * @Author: holakk
 * @Date: 2021-11-17 21:56:19
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-18 15:55:08
 * @Description: file content
 */
// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
      },
    ],
  ],
};
