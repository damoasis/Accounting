import type { UserConfigExport } from '@tarojs/cli';

import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';

const httpsAgent = new HttpsProxyAgent('http://localhost:10809');

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://www.v2ex.com',
          // pathRewrite: { '^/movia': '/movie' },
          changeOrigin: true,
          agent: httpsAgent,
        },
      },
    },
  },
} satisfies UserConfigExport;
