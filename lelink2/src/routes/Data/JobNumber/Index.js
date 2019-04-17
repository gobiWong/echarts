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
import TableForm from './TableForm';
import styles from './Index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);

    const { dispatch } = this.props;
    dispatch({
      type: 'jobnumber/fetch',
      payload: {},
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
  handleDeleteData = fieldId => {

    const { 
      dispatch
    } = this.props;

    dispatch({
      type: 'jobnumber/remove',
      payload: { number_id: fieldId },
    });
    
  };


//列表数据改变时
handlePackageTypeTableChange = (pagination, filtersArg, sorter) => {
  const { dispatch } = this.props;
  const { formQueryValues } = this.state;

  const filters = Object.keys(filtersArg).reduce((obj, key) => {
    const newObj = { ...obj };
    newObj[key] = getValue(filtersArg[key]);
    return newObj;
  }, {});

  const params = {
    page: pagination.current,
    perPageSize: pagination.pageSize,
    ...formQueryValues,
    ...filters,
  };
  if (sorter.field) {
    params.sorter = `${sorter.field}_${sorter.order}`;
  }

  dispatch({
    type: 'jobnumber/fetch',
    payload: params,
  });
};


onRef = (ref) => {
  this.child = ref
}


  render() {
    const { width: stateWidth } = this.state;
    const { 
      jobnumber: { data },
      form, 
      dispatch, 
      submitting 
    } = this.props;


    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {

        let params = [];
        params.job_numbers = values.job_numbers.filter( item => {
              if(item.editable){
                 return item;
              }
        })

        if(params.job_numbers.length == 0){
          message.error('请将数据添加或保存后再提交');
          return;
        }
        
        if (!error) {
          // submit the values
          dispatch({
            type: 'jobnumber/submit',
            payload: params,
            callback: (result) => {

              if(result == 'success'){
                this.child.cancelFormEdit();
              }
              
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

      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
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

        <Card title="工号管理" bordered={true}>
          {getFieldDecorator('job_numbers', {
            initialValue: data.list,
          })(
          <TableForm 
            handleDelete = { this.handleDeleteData }
            onTableChange = { this.handlePackageTypeTableChange }
            onRef = {this.onRef} 
          />
          )}
        </Card>

        <FooterToolbar style={{ width: stateWidth }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>

      </PageHeaderLayout>
    );
  }
}

export default connect(({ jobnumber, global, loading }) => ({
  jobnumber,
  collapsed: global.collapsed,
  submitting: loading.models.jobnumber,
}))(Form.create()(AdvancedForm));
