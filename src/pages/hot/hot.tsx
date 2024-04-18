import { IThread } from '@/interfaces/thread';
import { useEffect, useState } from 'react';
import Taro, { useLoad } from '@tarojs/taro';
import api from '@/utils/api';
import { View, Text } from '@tarojs/components';
import './index.scss';
import ThreadList from '@/components/thread_list';

interface IState {
  loading: boolean;
  threads: IThread[];
}

export default function Hot() {
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
        const res = await Taro.request<IThread[]>({
          url: api.getHotNodes(),
        });
        setState({
          threads: res.data || [],
          loading: false,
        } as IState);
      } catch (error) {
        Taro.showToast({
          title: '载入远程数据错误',
        });
      }
    };
    fetchData();
  });

  const { loading, threads } = state;

  return (
    <View className='index'>
      <ThreadList threads={threads} loading={loading} />
    </View>
  );
}
