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
  Table,
  Menu,
  InputNumber ,
  Tooltip,
  Badge,
  DatePicker,
  Popconfirm,
  Modal,
  Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { record_type, record_type_option, record_type_map } from '../../utils/status';

import styles from './Index.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


//构造状态option
// const typeOptions = record_type_option.map( item => {
//   return <Option key={item.key}>{item.name}</Option>;
// });


//表单
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle} = props;
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };


  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <Form>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="企业名称">
          {form.getFieldDecorator('enterprise_name', {
            initialValue: formAddValues.enterprise_name,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入记录人' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="余额告警阈值">
          {form.getFieldDecorator('balance_warning', {
            initialValue: formAddValues.balance_warning,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入企业名称' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="提醒次数">
          {form.getFieldDecorator('balance_notice_times', {
            initialValue: formAddValues.balance_notice_times,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入企业名称' }],
          })(<InputNumber min={1} max={10} defaultValue={3} />)}
        </FormItem>


        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注信息">
            {form.getFieldDecorator('note', {
              initialValue: formAddValues.note,
              validateFirst: true,
            })(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    </Modal>
  );
});



@connect(({ systemsz, loading }) => ({
  systemsz,
  loading: loading.models.systemsz,
}))


@Form.create()
export default class SystemList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新增跟进记录',
    expandForm: false,

    selectedRows: [],

    formAddValues: {
      systemsz_id: '',
      enterprise_name: '',
      balance_warning: '',
      balance_notice_times:'',
      note: '',
    },
    formQueryValues: {},
  };

  

  componentDidMount() {
    const { dispatch } = this.props;

    //获取数据
    dispatch({
      type: 'systemsz/fetchSystemsz',
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
  handleManagementTableChange = (pagination, filtersArg, sorter) => {
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
      type: 'systemsz/fetchSystemsz',
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
      type: 'systemsz/fetchSystemsz',
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
          type: 'systemsz/fetchSystemsz',
          payload: {
            systemsz_ids: selectedRows.map(row => row.systemsz_id),
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
      type: 'systemsz/fetchSystemsz',
      payload: {
        systemsz_ids: [text.systemsz_id],
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
      systemsz_id: text.systemsz_id,
      enterprise_name: text.enterprise_name,
      balance_warning: text.balance_warning,
      balance_notice_times:text.balance_notice_times,
      note: text.note,
    };

    this.setState({
      modalTitle: '编辑跟进记录',
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
      };

      this.setState({
        formQueryValues: values,
      });

      dispatch({
        type: 'systemsz/fetchSystemsz',
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
      systemsz_id: '',
      enterprise_name: '',
      balance_warning: '',
      balance_notice_times:'',
      note: '',
    };

    this.setState({
      modalTitle: '新增跟进记录',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

  };


  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch} = this.props;

    let params = {
      systemsz_id: this.state.formAddValues.systemsz_id,
      enterprise_name: fields.enterprise_name,
      balance_warning: fields.balance_warning,
      balance_notice_times:fields.balance_notice_times,
      note: fields.note,
    };


    dispatch({
      type: 'systemsz/addSystemsz',
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


  //渲染高级查询
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">
          <Col md={8} sm={24}>
            <FormItem label="企业名称">
            {form.getFieldDecorator('enterprise_name', {
              initialValue: this.state.formAddValues.enterprise_name,
              validateFirst: true,
          })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
         
          <Col md={12} sm={24}>
            <FormItem label="添加时间">
            {getFieldDecorator('query_created_at',{
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
              </span>
            </div>
            </Col>
        </Row>
      </Form>
    );
  }

  //渲染查询表单
  renderForm() {
    return this.renderSimpleForm()
  }


  render() {

    const {
      systemsz: { data },
      loading,
    } = this.props;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
  

   const columns = [
      {
        title: '序号',
        dataIndex: 'sort',
        key:'sort',
      },
      {
        title: '企业名称',
        dataIndex: 'enterprise_name',
        key:'enterprise_name',
      },
      {
        title: '余额告警阈值',
        dataIndex: 'balance_warning',
        key:'balance_warning',
      },
      {
        title: '提醒次数',
        dataIndex: 'balance_notice_times',
        key:'balance_notice_times',
      },
      {
        title: '添加时间',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },

      {
        title: '更新时间',
        dataIndex: 'updated_at',
        key: 'updated_at',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },

      // {
      //   title: '记录类别',
      //   dataIndex: 'record_type',
      //   key: 'record_type',
      //   filters: [
      //     {
      //       text: record_type_option[0]['name'],
      //       value: record_type_option[0]['key'],
      //     },
      //     {
      //       text: record_type_option[1]['name'],
      //       value: record_type_option[1]['key'],
      //     },
      //   ],
      //   onFilter: (value, record) => record.record_type.toString() === value,
      //   render(val) {
      //     return <Badge status={record_type_map[val]} text={record_type[val]} />;
      //   },
      // },
      
      
      
      {
        title: '记录信息',
        dataIndex: 'note',
        key:'note',
        render(text, record) {
          return <Tooltip placement="top" title='备注信息' >
                     <span className={styles.note}>备注信息</span>
                 </Tooltip>
         }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key:'operation',
        width: 110,
        fixed: 'right',
        render: (text, record, index) => (
          <Fragment>
            <a href="javascript:;" onClick={this.handleEdit.bind(this, text, record)} >编辑</a>
            <Divider type="vertical" />
            <Popconfirm placement="topRight" title="确定删除吗？" onConfirm={this.handleDeleteData.bind(this, text, record)} okText="Yes" cancelText="No">
            <a href="javascript:;" >删除</a>
            </Popconfirm>              
          </Fragment>
        ),
      },
    ];

    const { selectedRows, modalVisible, formAddValues, modalTitle} = this.state;

    // const menu = (
    //   <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
    //     <Menu.Item key="remove">删除</Menu.Item>
    //   </Menu>
    // );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="查询数据">
      <div className={styles.content}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>

            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建数据
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

            <Table
              selectedRows={selectedRows}
              rowKey={'systemsz_id'}
              loading={loading}
              rowSelection={rowSelection}
              dataSource={data.list}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        </div>
        <CreateForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle} packageTypes={data.packageTypes} jobNumbers={data.jobNumbers} />
      </PageHeaderLayout>
    );
  }
}
