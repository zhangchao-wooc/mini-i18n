import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'Mini-i18n',
    logo: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9d1be88edf94705ade1d3581e97d7f5~tplv-k3u1fbpfcp-watermark.image',
    nav: [
      {
        title: '指南',
        link: '/introduction'
      },
      {
        title: '配置',
        link: '/config'
      },
      {
        title: 'API',
        link: '/api'
      }
    ],
    sidebar: {
      '/introduction': [
        {
          title: '开始',
          children: [
            {
              title: '介绍',
              link: '/introduction'
            },
            {
              title: '快速上手',
              link: '/introduction/install'
            },
            {
              title: '使用',
              link: '/introduction/use'
            },
            {
              title: '兼容问题',
              link: '/introduction/compatible'
            },
            {
              title: '基础库版本建议',
              link: '/introduction/version_recommendations'
            }
          ]
        }
      ],
      // '/faq': [
      //   {
      //     title: 'FAQ',
      //     children: [
      //     ]
      //   }
      // ]
    },

  },

  theme: { '@c-primary': '#9933FF' },
  // analytics: {
  //   ga_v2: ''
  // }
  links: [
    {
      href: 'https://oss.lafyun.com/hv6c4s-data/favicon.ico?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=1U5NT0WUMFKQO66BCSK2%2F20230117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230117T113657Z&X-Amz-Expires=900&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIxVTVOVDBXVU1GS1FPNjZCQ1NLMiIsImV4cCI6MTY3NDA0MTgwMywicGFyZW50IjoiaHY2YzRzIiwic2Vzc2lvblBvbGljeSI6ImV5SldaWEp6YVc5dUlqb2lNakF4TWkweE1DMHhOeUlzSWxOMFlYUmxiV1Z1ZENJNlczc2lVMmxrSWpvaVlYQndMWE4wY3kxbWRXeHNMV2R5WVc1MElpd2lSV1ptWldOMElqb2lRV3hzYjNjaUxDSkJZM1JwYjI0aU9pSnpNem9xSWl3aVVtVnpiM1Z5WTJVaU9pSmhjbTQ2WVhkek9uTXpPam82S2lKOVhYMD0ifQ.T1eV-QK6Ot0juJs9YepVvfYuMzta3ABaE28toP6ZsA1z5yVh-DQyKomzIoHOCbVw-dTqwg3WjMBmBVvvZCugwQ&X-Amz-Signature=1c511b1c3b64f10dcf4c81b652cf3edabda57d593ff9afbff7616438f0dbf476&X-Amz-SignedHeaders=host', rel: 'icon'
    }
  ]
});
