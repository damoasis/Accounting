import { View, Image } from '@tarojs/components';
import './loading.css';

const url = require('../resource/spiner.gif');

export default function Loading() {
  return (
    // eslint-disable-next-line jsx-quotes
    <View className='loading'>
      <Image src={url} className='img' />
    </View>
  );
}
