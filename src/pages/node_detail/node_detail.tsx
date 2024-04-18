import Taro, { Current, useRouter } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import ThreadList from '../../components/thread_list';
import { IThread } from '../../interfaces/thread';
import api from '../../utils/api';

import './index.css';

interface IState {
  loading: boolean;
  threads: IThread[];
}

export default function NodeDetail() {
  const [state, setState] = useState<IState>({
    loading: true,
    threads: [],
  });

  const router = useRouter();
  const { full_name, short_name } = router.params;

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: decodeURI(full_name),
    });

    const fetchData = async () => {
      try {
        const {
          data: { id },
        } = await Taro.request({
          url: api.getNodeInfo({
            name: short_name,
          }),
        });
        const res = await Taro.request<IThread[]>({
          url: api.getTopics({
            node_id: id,
          }),
        });
        setState({
          threads: res.data,
          loading: false,
        } as IState);
      } catch (error) {
        Taro.showToast({
          title: '载入远程数据错误',
        });
      }
    };
    fetchData();
  }, [full_name, short_name]); // 空依赖数组意味着这个 effect 只在组件挂载时运行

  return (
    <View className='index'>
      <ThreadList threads={state.threads} loading={state.loading} />
    </View>
  );
}
