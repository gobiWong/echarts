import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Popconfirm,
  Modal,
  message,
  Badge,
  Upload,
  Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

import StatisticsTable from 'components/StatisticsTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { common_status, common_status_option, badge_status_map } from '../../../utils/status';
import { regex } from '../../../utils/regex';
import { table_fields } from '../../../utils/table';
import { down_data_template } from '../../../utils/common';

import styles from './Index.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


//构造状态option
const statusOptions = common_status_option.map( item => {
  return <Option key={item.key}>{item.name}</Option>;
});


//表单
const CreateForm = Form.create()(props => {
  console.log(props)
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle, packageTypes, jobNumbers } = props;
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };

  const packageTypeOptions = packageTypes.map( item => {
    return <Option key={item.package_type_id} >{item.package_name}</Option>;
  });


  const jobNumberOptions = jobNumbers.map( item => {
    return <Option key={item.job_number_id} >{item.job_number}</Option>;
  });

  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <Form>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="ICCID">
          {form.getFieldDecorator('iccid', {
            initialValue: formAddValues.iccid,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入ICCID' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号码">
          {form.getFieldDecorator('mobile', {
            initialValue: formAddValues.mobile,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入手机号码' },{ pattern: regex.mobile, message: '请填写正确格式的手机号' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="身份证号码">
          {form.getFieldDecorator('identity_no', {
            initialValue: formAddValues.identity_no,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入身份证号码' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
          {form.getFieldDecorator('customer_name', {
            initialValue: formAddValues.customer_name,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入姓名' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="套餐类型">
          {form.getFieldDecorator('package_type', {
            initialValue: formAddValues.package_type,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请选择套餐类型' }],
          })(<Select
            size="default"
          >
          {packageTypeOptions}
          </Select>)}
        </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开卡时间">
        {form.getFieldDecorator('open_card_time', {
          initialValue: formAddValues.open_card_time,
          validateFirst: true,
          rules: [{ required: true, message: '请填写开卡时间' }],
        })(<DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="开卡时间"
        />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="首次预充值">
        {form.getFieldDecorator('first_precharge', {
          initialValue: formAddValues.first_precharge,
          validateFirst: true,
          rules: [{ required: true, message: '请填写首次预充值' }],
        })(<InputNumber min={0} max={10000} step={0.01} />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属工号">
          {form.getFieldDecorator('job_number', {
            initialValue: formAddValues.job_number,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请选择所属工号' }],
          })(<Select
            size="default"
          >
          {jobNumberOptions}
          </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {form.getFieldDecorator('note', {
          initialValue: formAddValues.note,
          validateFirst: true,
          rules: [{ required: true, message: '请填写备注' }],
        })(<Input.TextArea placeholder="请输入" />)}
      </FormItem>

      </Form>

    </Modal>
  );
});



@connect(({ statistics, loading }) => ({
  statistics,
  loading: loading.models.statistics,
}))


@Form.create()
export default class TableList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新建数据',
    expandForm: false,

    selectedRows: [],
    searchText: '',
    filterDropdownVisible: false,

    formAddValues: {
      iccid: '',
      mobile: '',
      identity_no: '',
      customer_name: '',
      package_type: '',
      //open_card_time: '',
      first_precharge: '',
      job_number: '',
      note: ''
    },
    formQueryValues: {},

    fileList: [],
  };

  

  componentDidMount() {
    const { dispatch } = this.props;

    //获取数据
    dispatch({
      type: 'statistics/fetch',
      payload: {},
    });

  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };



  //列表数据改变时
  handleStatisticsTableChange = (pagination, filtersArg, sorter) => {
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
      type: 'statistics/fetch',
      payload: params,
    });
  };

  
  //重置查询数据
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formQueryValues: {},
    });
    dispatch({
      type: 'statistics/fetch',
      payload: {},
    });
  };



  //切换查询
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };



  //批量删除
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'statistics/remove',
          payload: {
            statistics_ids: selectedRows.map(row => row.statistics_id),
            filters: this.state.formQueryValues
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };



  //单个删除
  handleDeleteData = (e, text, data) => {

    const { dispatch } = this.props;

    dispatch({
      type: 'statistics/remove',
      payload: {
        statistics_ids: [text.statistics_id],
        filters: this.state.formQueryValues
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });

  };


  //编辑
  handleEdit = (e, text, data) => {

    const formValuesArr = {
      statistics_id: text.statistics_id,
      iccid: text.iccid,
      mobile: text.mobile,
      identity_no: text.identity_no,
      customer_name: text.customer_name,
      //package_type: text.package_type.toString(),
      package_type: text.package_type_id,
      open_card_time: moment(text.open_card_time),
      first_precharge: text.first_precharge,
      job_number: text.job_number_id,
      note: text.note,
    };

    this.setState({
      modalTitle: '编辑数据',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

    this.setState({
      modalVisible: true,
    });

  };


  //选择
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };


  //查询
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        //updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formQueryValues: values,
      });

      dispatch({
        type: 'statistics/fetch',
        payload: values,
      });
    });
  };


  //模态框新增数据
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });


    const formValuesArr = {
      statistics_id: '',
      iccid: '',
      mobile: '',
      identity_no: '',
      customer_name: '',
      package_type: '',
      //open_card_time: '',
      first_precharge: '',
      job_number: '',
      note: '',
    };

    this.setState({
      modalTitle: '新增数据',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

  };


  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch} = this.props;

    let params = {
      statistics_id: this.state.formAddValues.statistics_id,
      iccid: fields.iccid,
      mobile: fields.mobile,
      identity_no: fields.identity_no,
      customer_name: fields.customer_name,
      package_type: fields.package_type,
      open_card_time: fields.open_card_time,
      first_precharge: fields.first_precharge,
      job_number: fields.job_number,
      note: fields.note,
      filters: this.state.formQueryValues
    };


    dispatch({
      type: 'statistics/add',
      payload: params,
      callback: (result) => {
        if(result == 'success'){
          form.resetFields();
          this.setState({
            modalVisible: false,
          });
        }
        
      },
    });

  };


  //批量新增数据
  handleBatchAdd = (file) => {
    const { dispatch} = this.props;

    const params = {
      file: file,
      filters: this.state.formQueryValues
    };
    
    dispatch({
      type: 'statistics/batchAdd',
      payload: params,
      callback: (result) => {

        if(result == 'success'){
          this.setState({
            modalVisible: false,
          });
        }
        
      },
    });

  }


  //数据导入模板下载
  handleDownload = () => {
    window.location.href = down_data_template;
  }


  //渲染简易查询
  renderSimpleForm() {
    const { form} = this.props;
    const { getFieldDecorator } = form;
    const {
      statistics: { data },
    } = this.props;

    const packageTypeOptions = data.packageTypes.map( item => {
      return <Option key={item.package_type_id} >{item.package_name}</Option>;
    });


    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">
          <Col md={8} sm={24}>
            <FormItem label="ICCID">
              {getFieldDecorator('iccid',{
                initialValue: this.state.formQueryValues.iccid,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile',{
                initialValue: this.state.formQueryValues.mobile,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="套餐类型">
              {getFieldDecorator('package_type',{
                initialValue: this.state.formQueryValues.package_type,
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value=''>全部</Option>
                  {packageTypeOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="end">
          <Col md={6} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  展开 <Icon type="down" />
                </a>
              </span>
            </Col>
        </Row>
      </Form>
    );
  }


  //渲染高级查询
  renderAdvancedForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const {
      statistics: { data },
    } = this.props;

    const packageTypeOptions = data.packageTypes.map( item => {
      return <Option key={item.package_type_id} >{item.package_name}</Option>;
    });

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">
        <Col md={8} sm={24}>
            <FormItem label="ICCID">
              {getFieldDecorator('iccid',{
                initialValue: this.state.formQueryValues.iccid,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile',{
                initialValue: this.state.formQueryValues.mobile,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="套餐类型">
              {getFieldDecorator('package_type',{
                initialValue: this.state.formQueryValues.package_type,
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value=''>全部</Option>
                  {packageTypeOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="客户姓名">
              {getFieldDecorator('customer_name',{
                initialValue: this.state.formQueryValues.customer_name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="工号">
              {getFieldDecorator('job_number',{
                initialValue: this.state.formQueryValues.job_number,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status',{
                initialValue: this.state.formQueryValues.status,
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value=''>全部</Option>
                  {statusOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="开卡时间">
              {getFieldDecorator('open_card_time',{
                initialValue: this.state.formQueryValues.open_card_time,
              })(
                <RangePicker
                  showTime={{ format: 'HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={['Start Time', 'End Time']}
              />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('created_at',{
                initialValue: this.state.formQueryValues.created_at,
              })(
                <RangePicker
                  showTime={{ format: 'HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={['Start Time', 'End Time']}
              />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="end">
          <Col md={8} sm={24}>
              <div style={{ overflow: 'hidden' }}>
              <span style={{ float: 'right', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  收起 <Icon type="up" />
                </a>
              </span>
            </div>
            </Col>
        </Row>
      </Form>
    );
  }

  //渲染查询表单
  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }



  render() {

    const {
      statistics: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, formAddValues, modalTitle} = this.state;

    const packageTypeFilter = data.packageTypes.map( item => {
      return {text: item.package_name, value: item.package_type_id};
    });



    const tableColumns = data.tableColumns.map( (item, index) => {

      switch(item){
        case table_fields['statistics'].sort.key:
          return {
            title: table_fields['statistics'].sort.name,
            dataIndex: table_fields['statistics'].sort.key,
            key: table_fields['statistics'].sort.key,
          }
        break;

        // case table_fields['statistics'].statistics_id.key:
        //   return {
        //     title: table_fields['statistics'].statistics_id.name,
        //     dataIndex: table_fields['statistics'].statistics_id.key,
        //     key: table_fields['statistics'].statistics_id.key,
        //   }
        // break;

        case table_fields['statistics'].iccid.key:
          return {
            title: table_fields['statistics'].iccid.name,
            dataIndex: table_fields['statistics'].iccid.key,
            key: table_fields['statistics'].iccid.key,
          }
        break;

        case table_fields['statistics'].mobile.key:
          return {
            title: table_fields['statistics'].mobile.name,
            dataIndex: table_fields['statistics'].mobile.key,
            key: table_fields['statistics'].mobile.key,
          }
        break;

        case table_fields['statistics'].identity_no.key:
          return {
            title: table_fields['statistics'].identity_no.name,
            dataIndex: table_fields['statistics'].identity_no.key,
            key: table_fields['statistics'].identity_no.key,
            sorter: true,
            align: 'right',
          }
        break;

        case table_fields['statistics'].customer_name.key:
          return {
            title: table_fields['statistics'].customer_name.name,
            dataIndex: table_fields['statistics'].customer_name.key,
            key: table_fields['statistics'].customer_name.key,
          }
        break;

        case table_fields['statistics'].package_type_id.key:
          return {
            title: table_fields['statistics'].package_type_id.name,
            dataIndex: table_fields['statistics'].package_type_id.key,
            key: table_fields['statistics'].package_type_id.key,
            filters: packageTypeFilter,
            onFilter: (value, record) => record.package_type_id.toString() === value,
            render(val, record) {
              return record.package_type_has_one.package_name;
            },
          }
        break;

        case table_fields['statistics'].open_card_time.key:
          return {
            title: table_fields['statistics'].open_card_time.name,
            dataIndex: table_fields['statistics'].open_card_time.key,
            key: table_fields['statistics'].open_card_time.key,
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            sorter: true,
          }
        break;

        case table_fields['statistics'].first_precharge.key:
          return {
            title: table_fields['statistics'].first_precharge.name,
            dataIndex: table_fields['statistics'].first_precharge.key,
            key: table_fields['statistics'].first_precharge.key,
          }
        break;

        case table_fields['statistics'].job_number_id.key:
          return {
            title: table_fields['statistics'].job_number_id.name,
            dataIndex: table_fields['statistics'].job_number_id.key,
            key: table_fields['statistics'].job_number_id.key,
            render(val, record) {
              return record.job_number_has_one.job_number;
            },
          }
        break;

        case table_fields['statistics'].note.key:
          return {
            title: table_fields['statistics'].note.name,
            dataIndex: table_fields['statistics'].note.key,
            key: table_fields['statistics'].note.key,
          }
        break;

        case table_fields['statistics'].status.key:
          return {
            title: table_fields['statistics'].status.name,
            dataIndex: table_fields['statistics'].status.key,
            key: table_fields['statistics'].status.key,
            filters: [
              {
                text: common_status_option[0]['name'],
                value: common_status_option[0]['key'],
              },
              {
                text: common_status_option[1]['name'],
                value: common_status_option[1]['key'],
              },
            ],
            onFilter: (value, record) => record.status.toString() === value,
            render(val) {
              return <Badge status={badge_status_map[val]} text={common_status[val]} />;
            },
          }
        break;

        case table_fields['statistics'].created_at.key:
          return {
            title: table_fields['statistics'].created_at.name,
            dataIndex: table_fields['statistics'].created_at.key,
            key: table_fields['statistics'].created_at.key,
            sorter: true,
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
          }
        break;

        case table_fields['statistics'].updated_at.key:
          return {
            title: table_fields['statistics'].updated_at.name,
            dataIndex: table_fields['statistics'].updated_at.key,
            key: table_fields['statistics'].updated_at.key,
            sorter: true,
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
          }
        break;

        case table_fields['statistics'].operation.key:
          return {
            title: table_fields['statistics'].operation.name,
            key: table_fields['statistics'].operation.key,
            fixed: 'right',
            width: 110,
            render: (text, record, index) => (
              <Fragment>
                <a href="javascript:;" onClick={this.handleEdit.bind(this, text, record)} >编辑</a>
                <Divider type="vertical" />
                <Popconfirm placement="topRight" title="确定删除吗？" onConfirm={this.handleDeleteData.bind(this, text, record)} okText="Yes" cancelText="No">
                <a href="javascript:;" >删除</a>
                </Popconfirm>              
              </Fragment>
            ),
          }
        break;

        default:
        return {};
        break;
      }

    });

    const filterColumns = tableColumns.filter( item => {
      if(item) return item;
    });

    const columns = filterColumns;

    // const columns = [
    //   {
    //     title: table_fields['statistics'].statistics_id.name,
    //     dataIndex: table_fields['statistics'].statistics_id.key,
    //     key: table_fields['statistics'].statistics_id.key,
    //   },
    //   {
    //     title: table_fields['statistics'].iccid.name,
    //     dataIndex: table_fields['statistics'].iccid.key,
    //     key: table_fields['statistics'].iccid.key,
    //   },
    //   {
    //     title: table_fields['statistics'].mobile.name,
    //     dataIndex: table_fields['statistics'].mobile.key,
    //     key: table_fields['statistics'].mobile.key,
    //   },
    //   {
    //     title: table_fields['statistics'].identity_no.name,
    //     dataIndex: table_fields['statistics'].identity_no.key,
    //     key: table_fields['statistics'].identity_no.key,
    //     sorter: true,
    //     align: 'right',
    //   },
    //   {
    //     title: table_fields['statistics'].customer_name.name,
    //     dataIndex: table_fields['statistics'].customer_name.key,
    //     key: table_fields['statistics'].customer_name.key,
    //   },
    //   {
    //     title: table_fields['statistics'].package_type.name,
    //     dataIndex: table_fields['statistics'].package_type.key,
    //     key: table_fields['statistics'].package_type.key,
    //     filters: packageTypeFilter,
    //     onFilter: (value, record) => record.package_type_id.toString() === value,
    //     render(val, record) {
    //       return record.package_type_has_one.package_name;
    //     },
    //   },
    //   {
    //     title: table_fields['statistics'].open_card_time.name,
    //     dataIndex: table_fields['statistics'].open_card_time.key,
    //     key: table_fields['statistics'].open_card_time.key,
    //     render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    //     sorter: true,
    //   },
    //   {
    //     title: table_fields['statistics'].first_precharge.name,
    //     dataIndex: table_fields['statistics'].first_precharge.key,
    //     key: table_fields['statistics'].first_precharge.key,
    //     sorter: true,
    //     needTotal: true,
    //     render: val => `${val}`,
    //   },
    //   {
    //     title: table_fields['statistics'].job_number.name,
    //     dataIndex: table_fields['statistics'].job_number.key,
    //     key: table_fields['statistics'].job_number.key,
    //   },
    //   {
    //     title: table_fields['statistics'].note.name,
    //     dataIndex: table_fields['statistics'].note.key,
    //     key: table_fields['statistics'].note.key,
    //   },
    //   {
    //     title: table_fields['statistics'].status.name,
    //     dataIndex: table_fields['statistics'].status.key,
    //     key: table_fields['statistics'].status.key,
    //     filters: [
    //       {
    //         text: common_status_option[0]['name'],
    //         value: common_status_option[0]['key'],
    //       },
    //       {
    //         text: common_status_option[1]['name'],
    //         value: common_status_option[1]['key'],
    //       },
    //     ],
    //     onFilter: (value, record) => record.status.toString() === value,
    //     render(val) {
    //       return <Badge status={badge_status_map[val]} text={common_status[val]} />;
    //     },
    //   },
    //   {
    //     title: table_fields['statistics'].created_at.name,
    //     dataIndex: table_fields['statistics'].created_at.key,
    //     key: table_fields['statistics'].created_at.key,
    //     sorter: true,
    //     render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    //   },
    //   {
    //     title: table_fields['statistics'].updated_at.name,
    //     dataIndex: table_fields['statistics'].updated_at.key,
    //     key: table_fields['statistics'].updated_at.key,
    //     sorter: true,
    //     render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    //   },
    //   {
    //     title: table_fields['statistics'].operation.name,
    //     key: table_fields['statistics'].operation.key,
    //     fixed: 'right',
    //     width: 100,
    //     render: (text, record, index) => (
    //       <Fragment>
    //         <a href="javascript:;" onClick={this.handleEdit.bind(this, text, record)} >编辑</a>
    //         <Divider type="vertical" />

    //         <Popconfirm placement="topRight" title="确定删除吗？" onConfirm={this.handleDeleteData.bind(this, text, record)} okText="Yes" cancelText="No">
    //         <a href="javascript:;" >删除</a>
    //         </Popconfirm>
            
    //       </Fragment>
    //     ),
    //   },
    // ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const props = {
      name: 'file',
      action: '',
      accept: '',
      showUploadList: false,
      // headers: {
      //   authorization: 'authorization-text',
      // },
      // beforeUpload: (file) => {
      // },
      customRequest: (info) => {
        this.handleBatchAdd(info.file);
      },
      onChange(info) {
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList);
        // }
        // if (info.file.status === 'done') {
        //   message.success(`${info.file.name} file uploaded successfully`);
        // } else if (info.file.status === 'error') {
        //   message.error(`${info.file.name} file upload failed.`);
        // }
      },
    };

    return (
      <PageHeaderLayout title="查询数据">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>

            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建数据
              </Button>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 批量上传
                </Button>
              </Upload>
              <Button onClick={this.handleDownload} >
                  <Icon type="download" /> 模板下载
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      批量操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>

            <StatisticsTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStatisticsTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle} packageTypes={data.packageTypes} jobNumbers={data.jobNumbers} />
      </PageHeaderLayout>
    );
  }
}
