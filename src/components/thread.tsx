import Taro, { eventCenter } from '@tarojs/taro';
import { View, Text, Navigator, Image } from '@tarojs/components';

import { timeagoInst, Thread_DETAIL_NAVIGATE } from '../utils';
import { IMember } from '../interfaces/member';
import { INode } from '../interfaces/node';

interface IProps {
  title: string;
  member: IMember;
  node: INode;
  last_modified: number;
  tid: number;
  replies: number;
  key?: number;
  not_navi?: boolean; // 不导航到 detail
}

export default function Thread(props: IProps) {
  const handleNavigate = () => {
    const { tid, not_navi } = props;
    if (not_navi) {
      return;
    }
    eventCenter.trigger(Thread_DETAIL_NAVIGATE, props);
    // 跳转到帖子详情
    Taro.navigateTo({
      url: '/pages/thread_detail/thread_detail',
    });
  };

  const { title, member, last_modified, replies, node, not_navi } = props;
  const time = timeagoInst.format(last_modified * 1000, 'zh');
  const usernameCls = `author ${not_navi ? 'bold' : ''}`;

  return (
    <View className='thread' onClick={handleNavigate}>
      <View className='info'>
        <View>
          <Image src={member.avatar_large} className='avatar' />
        </View>
        <View className='middle'>
          <View className={usernameCls}>{member.username}</View>
          <View className='replies'>
            <Text className='mr10'>{time}</Text>
            <Text>评论 {replies}</Text>
          </View>
        </View>
        <View className='node'>
          <Text className='tag'>{node.title}</Text>
        </View>
      </View>
      <Text className='title'>{title}</Text>
    </View>
  );
}
