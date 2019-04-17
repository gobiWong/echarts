import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {

  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: '账号',
      // type: 'user_name',
    },
    rules: [
      {
        required: true,
        message: '请输入登录账号',
      },
    ],
  },

  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '密码',
    },
    rules: [
      {
        required: true,
        message: '请输入登录密码',
      },
    ],
  },

  ImgCaptcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: '验证码',
    },
    rules: [
      {
        required: true,
        message: '请输入验证码',
      },
    ],
  },

  // Mobile: {
  //   component: Input,
  //   props: {
  //     size: 'large',
  //     prefix: <Icon type="mobile" className={styles.prefixIcon} />,
  //     placeholder: '手机号码',
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       message: '请输入手机号码',
  //     },
  //     {
  //       pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  //       message: '请输入正确格式的手机号',
  //     },
  //   ],
  // },

  // Captcha: {
  //   component: Input,
  //   props: {
  //     size: 'large',
  //     prefix: <Icon type="mail" className={styles.prefixIcon} />,
  //     placeholder: '验证码',
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       message: '请输入验证码',
  //     },
  //   ],
  // },

};

export default map;
