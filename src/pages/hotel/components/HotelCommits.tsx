import { HotelCommit } from "@/types/Hotel";
import { View, Image, Text } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { Rate } from "@antmjs/vantui";

/*
 * @Author: holakk
 * @Date: 2021-12-10 17:42:17
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-17 10:13:49
 * @Description: file content
 */
function HotelCommits(props: { commit: HotelCommit }) {
  const baseImageUrl = "http://192.168.177.115/images/";
  return (
    <View className='ml-3'>
      <View>
        {/* 用户头像 */}
        <AtAvatar
          className='w-10 h-10 inline-block'
          image={props.commit.upic}
          circle
        ></AtAvatar>
        <View className='inline-block ml-5 mt-3'>
          {/* 用户名 */}
          <View className='text-ms text-gray-600'>小丁</View>
          {/* 评论时间 */}
          <View className='text-xs text-gray-400'>{props.commit.date}</View>
        </View>
      </View>
      {/* 评分 */}
      <View className='ml-4'>
        <View className='text-sm'>
          位置设施：
          <Rate className='ml-2' value={props.commit.scor} size={40}></Rate>
        </View>
        <View className='text-sm'>
          卫生服务：
          <Rate className='ml-2' value={props.commit.scor} size={40}></Rate>
        </View>
      </View>
      {/* 评价 */}
      <View className='mt-4'>
        <View className='text-base text-gray-600 mb-2'>
          {props.commit.cont}
        </View>
        {props.commit.pics.split("_").map((pic) => {
          console.log(props.commit);
          console.log(pic);
          if (pic != "") {
            return (
              <Image
                className='w-20 h-20'
                src={`${baseImageUrl + pic}.jpg`}
              ></Image>
            );
          } else {
            return;
          }
        })}
      </View>
      {/* 入住时间 */}
      <View className='text-xs text-blue-200'>{props.commit.time}</View>
      {/* 点赞 */}
      <View className='inline-block ml-35'>
        <View className='at-icon at-icon-heart'></View>
        {props.commit.tnum}
      </View>
      {/* 回复 */}
      <View className='inline-block ml-4'>
        <View className='at-icon at-icon-menu'></View>
        {props.commit.rnum}
      </View>
    </View>
  );
}

export default HotelCommits;
