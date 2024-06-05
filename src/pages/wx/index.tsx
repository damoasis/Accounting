import { View, Text, Button, Input } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';

interface LoginData {
  openid: string;
  unionid: string;
  loginCode: string;
  phoneCode: string;
}

export default function Wx() {
  const [loginData, setLoginData] = useState<LoginData>({
    openid: '',
    unionid: '',
    loginCode: '',
    phoneCode: '',
  });
  useLoad(() => {
    console.log('Page loaded.');
  });

  const getLoginCode = () => {
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          const newData = {
            ...loginData,
            loginCode: res.code,
          };
          setLoginData(newData);
        }
      },
    });
  };

  const getPhoneCode = (e) => {
    console.log(e.detail);
    if (e.detail.code) {
      const newData = {
        ...loginData,
        phoneCode: e.detail.code,
      };
      setLoginData(newData);
    }
  };

  const handleClick = () => {
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://poweraws.cneclouds.com/api/v4/auth/weixin/login',
            data: {
              code: res.code,
              appId: 'wx3297c2d6b1ffbfc7',
            },
            header: {
              version: 'dev',
            },
            success: (d) => {
              console.log(d.data);
              const newData = {
                ...loginData,
                loginCode: res.code,
                openid: d.data.data.openid,
                unionid: d.data.data.unionid,
              };
              setLoginData(newData);
            },
            fail: (f) => {
              console.log(f);
            },
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      },
    });
  };

  const getPhoneNumber = (e) => {
    console.log(e.detail);
    if (e.detail.code) {
      //发起网络请求
      wx.request({
        url: 'https://poweraws.cneclouds.com/api/v4/auth/weixin/phoneLogin',
        data: {
          code: e.detail.code,
          appId: 'wx3297c2d6b1ffbfc7',
          openid: loginData?.openid,
        },
        header: {
          version: 'dev',
        },
        success: (d) => {
          console.log(d.data);
        },
        fail: (f) => {
          console.log(f);
        },
      });
    }
  };

  return (
    <View className='wx'>
      <Text>微信开放能力</Text>
      <Text>LoginCode</Text>
      <Input value={loginData.loginCode}></Input>
      <Text>PhoneCode</Text>
      <Input value={loginData.phoneCode}></Input>
      <Text>单独获取code</Text>
      <Button className='btn' onClick={getLoginCode}>
        wx-login
      </Button>
      <Button open-type='getPhoneNumber' onGetPhoneNumber={getPhoneCode}>
        wx-phone
      </Button>
      <Text>集成后端接口</Text>
      <Button className='btn' onClick={handleClick}>
        wx-login
      </Button>
      <Button open-type='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>
        wx-phone
      </Button>
    </View>
  );
}
