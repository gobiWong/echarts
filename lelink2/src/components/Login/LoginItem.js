import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import map from './map';
import { host } from '../../utils/common';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
  return WrappedComponent => {
    return class BasicComponent extends Component {
      static contextTypes = {
        form: PropTypes.object,
        updateActive: PropTypes.func,
      };

      constructor(props) {
        super(props);
        this.state = {
          count: 0,
          imageCaptcha: host + 'auth/captcha/1',
        };
      }

      componentDidMount() {
        const { updateActive } = this.context;
        const { name, onDispatch } = this.props;
        if (updateActive) {
          updateActive(name);
        }
 
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

      onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        const { onGetCaptcha } = this.props;
        if (onGetCaptcha) {
          onGetCaptcha();
        }
        this.interval = setInterval(() => {
          count -= 1;
          this.setState({ count });
          if (count === 0) {
            clearInterval(this.interval);
          }
        }, 1000);
      };



      onImageCaptchaChange = () => {
        // console.log(Math.random(1000, 100000));
        this.setState({
          imageCaptcha: host + 'auth/captcha/1?' + Math.random(1000, 100000),
        }); 
      }

      render() {
        const { form } = this.context;
        const { getFieldDecorator } = form;
        const options = {};
        let otherProps = {};
        const { onChange, defaultValue, rules, name, onDispatch, ...restProps } = this.props;

        const { count, imageCaptcha } = this.state;
        options.rules = rules || defaultRules;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        otherProps = restProps || otherProps;
        if (type === 'Captcha') {
          const inputProps = omit(otherProps, ['onGetCaptcha']);
          return (
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator(name, options)(
                    <WrappedComponent {...defaultProps} {...inputProps} />
                  )}
                </Col>
                <Col span={8}>
                  <Button
                    disabled={count}
                    className={styles.getCaptcha}
                    size="large"
                    onClick={this.onGetCaptcha}
                  >
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            </FormItem>
          );
        }

        if (type === 'ImgCaptcha') {
          const inputProps = omit(otherProps, ['onGetCaptcha']);
          if(imageCaptcha){
            return (
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator(name, options)(
                      <WrappedComponent {...defaultProps} {...inputProps} />
                    )}
                  </Col>
                  <Col span={8}>
                      <img alt="验证码" src={imageCaptcha} style={{ width: '100%' }}  onClick={this.onImageCaptchaChange} />
                  </Col>
                </Row>
              </FormItem>
            );
          }
          
        }

        return (
          <FormItem>
            {getFieldDecorator(name, options)(
              <WrappedComponent {...defaultProps} {...otherProps} />
            )}
          </FormItem>
        );
      }
    };
  };
}

const LoginItem = {};
Object.keys(map).forEach(item => {
  LoginItem[item] = generator({
    defaultProps: map[item].props,
    defaultRules: map[item].rules,
    type: item,
  })(map[item].component);
});

export default LoginItem;
