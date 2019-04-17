import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
// import { getUserInfo } from '../../utils/localstorage';

const { Tab, UserName, Password, Mobile, ImgCaptcha, Captcha, Submit } = Login;
//此操作符连接命名空间为Login的model层
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    image_captcha: '',
  };

  componentDidMount() {
    // const userInfo = getUserInfo();
    // if(userInfo){
    //   const { dispatch } = this.props;
    //   dispatch(routerRedux.push('/enterprise/management'));
    // }
    // this.onGetImgCaptcha();  
  }

  // onGetImgCaptcha = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'login/fetchImgCaptcha',
  //     payload: {},
  //     callback : (imageBytes) => {
  //       this.setState({
  //         image_captcha: imageBytes
  //       });
  //     }
  //   });
  // };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { dispatch } = this.props;
    if (!err) {
      //调用Login命名空间下的Login方法
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };
//登入界面，可以更改为自定义的UI
  render() {
    const { login, submitting, dispatch } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
        
          <Tab key="account" tab="账户密码登录">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="user_name" placeholder="登录账号" />
            <Password name="password" placeholder="登录密码" />
            {/* <ImgCaptcha name="image_captcha" onGetImgCaptcha={this.onGetImgCaptcha} imageCaptcha={image_captcha}/> */}
          </Tab>


          <Submit loading={submitting}>登录</Submit>

        </Login>
      </div>
    );
  }
}
