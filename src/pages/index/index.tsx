/* eslint-disable import/first */
import { View, Text } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import './index.scss';
import { useEffect, useState } from 'react';
import { config } from 'webpack';
import api from '../../utils/api';
import { IThread } from '@/interfaces/thread';
import ThreadList from '@/components/thread_list';

interface IState {
  loading: boolean;
  threads: IThread[];
}

export default function Index() {
  const [state, setState] = useState<IState>({
    loading: true,
    threads: [],
  });

  useLoad(() => {
    console.log('Page loaded.');
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Taro.request({
          url: api.getLatestTopic(),
        });
        setState({
          threads: res.data || [],
          loading: false,
        });
      } catch (error) {
        Taro.showToast({
          title: '载入远程数据错误',
        });
      }
    };

    fetchData();
  }, []); // 空依赖数组意味着这个 effect 只在组件挂载时运行

  return (
    <View className='index'>
      <ThreadList threads={state.threads} loading={state.loading} />
    </View>
  );
}
