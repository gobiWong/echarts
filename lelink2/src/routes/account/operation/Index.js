import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  message,
  Popover,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import TableForm from './operationForm';
import styles from './Index.less';

const Option = Select.Option;
// const { RangePicker } = DatePicker;

class AdvancedForm extends PureComponent {
  state = {
    formQueryValues: [],
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);

    const { dispatch } = this.props;


    dispatch({
      type: 'menu/fetchMenuByCondition',
      payload: {
        is_root_menu: 2,
      },
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    const { width: stateWidth } = this.state;
    if (stateWidth !== width) {
      this.setState({ width });
    }
  };

  //删除数据
  // handleDeleteData = fieldId => {
  //   console.log(fieldId);
  //   const { 
  //     dispatch
  //   } = this.props;

  //   dispatch({
  //     type: 'operation/removeOperation',
  //     payload: { operate_id: fieldId },
  //   });
  // };

  //

  handleChange = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'operation/fetchOperateByCondition',
      payload: {
        menu_id: value,
      },
    });
  }

  // onRef = (ref) => {
  //   this.child = ref
  // }


  render() {
    const { width: stateWidth } = this.state;
    const {
      menu: { menuConditionData },
      operation: { data },
      form,
      dispatch,
      submitting
    } = this.props;


    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const submitData = () => {
      validateFieldsAndScroll((error, values) => {
        let menu_id = parseInt(values.menu_id) ;
        if (!error) {
          // submit the values
          dispatch({
            type: 'operation/submit',
            payload: {
              menu_id : menu_id,
              operates: values.operates
            },
          });
        }
      });
    };

    const errors = getFieldsError();

    const getErrorInfo = () => {

      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }

      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };

      const errorList = Object.keys(errors).map((key,index) => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={index} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
          </li>
        );
      });

      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };


    return (
      <PageHeaderLayout
        //title="套餐"
        wrapperClassName={styles.advancedForm}
      >
      <Card title="操作按钮管理" bordered={true}>
        <Form layout="vertical">
            <Form.Item  label='选择菜单'>
                  {getFieldDecorator('menu_id', {
                    rules: [{ required: true, whitespace: true, message: '请选择菜单' }],
                   })(
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      optionFilterProp="children"
                      onChange={this.handleChange}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {
                        menuConditionData.map(item => {
                          return <Option key={item.menu_id}>{item.menu_name}</Option>;
                        })
                      }
                    </Select>
                  )}
            </Form.Item>
        </Form>
        </Card>
        <Card>
        {getFieldDecorator('operates', {
                initialValue: data.list,
                // validateFirst: true,
                // rules: [{ required: true, whitespace:true, message: '请输入操作' }],
              })(
                <TableForm />
              )}
        </Card>
        <FooterToolbar style={{ width: stateWidth }}>
          {getErrorInfo()}
          <Button type="primary" onClick={submitData} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>

      </PageHeaderLayout>
    );
  }
}

export default connect(({ operation, menu, global, loading }) => ({
  operation,
  menu,
  // collapsed: global.collapsed,
  //submitting: loading.effects['packagetype/submit'],
  submitting: loading.models.packagetype,
}))(Form.create()(AdvancedForm));
