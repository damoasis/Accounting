import { View, Text } from '@tarojs/components'
import Thread from './thread'
import Loading from './loading'
import { IMember } from '../interfaces/member'
import { INode } from '../interfaces/node'

import './thread.css'

interface IProps {
    threads: IThread[],
    loading: boolean
  }
  
  interface IThread {
    title: string,
    member: IMember,
    node: INode,
    last_modified: number,
    id: number,
    replies: number
    key?: number
  }

export default function ThreadList(props:IProps) {
    if(props.loading){
        return <Loading />
    }

    const element = props.threads.map((thread) => (
        <Thread
          key={thread.id}
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
        />
      ));
    
      return <View className='thread-list'>{element}</View>;

}
