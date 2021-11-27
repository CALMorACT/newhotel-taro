/*
 * @Author: holakk
 * @Date: 2021-11-17 21:56:19
 * @LastEditors: holakk
 * @LastEditTime: 2021-11-27 22:04:05
 * @Description: file content
 */
import { resolve } from "path";

const config = {
  projectName: "newhotel-taro",
  date: "2021-11-17",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: ["taro-plugin-tailwind"],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    esnextModules: ["taro-ui", "@antmjs/vantui"],
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  alias: {
    "@/components": resolve(__dirname, "..", "src/components"),
    "@/utils": resolve(__dirname, "..", "src/utils"),
    "@/assets": resolve(__dirname, "..", "src/assets"),
    "@/store": resolve(__dirname, "..", "src/store"),
    "@/pages": resolve(__dirname, "..", "src/pages"),
    "@/types": resolve(__dirname, "..", "src/types"),
  },
};

export default function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
}
