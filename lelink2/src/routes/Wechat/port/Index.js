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
  Tooltip,
  Dropdown,
  Table,
  Menu,
  Badge,
  DatePicker,
  Popconfirm,
  Modal,
  Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { common_status, common_status_option, badge_status_map } from '../../../utils/status';

import styles from './Index.less';
const { TextArea } = Input;
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
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle, packageTypes, jobNumbers } = props;
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

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="服务器名称">
          {form.getFieldDecorator('server_name', {
            initialValue: formAddValues.server_name,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="接口路径">
      {form.getFieldDecorator('port_address', {
            initialValue: formAddValues.port_address,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入WEB登录地址' }],
          })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="	请求方式">
        {form.getFieldDecorator('request_method', {
              initialValue: formAddValues.request_method,
              validateFirst: true,
              // rules: [{ required: true, message: '请输入API地址' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="	操作人">
        {form.getFieldDecorator('user_id', {
              initialValue: formAddValues.user_id,
              validateFirst: true,
              // rules: [{ required: true, message: '请输入API地址' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('note', {
            initialValue: formAddValues.note,
            validateFirst: true,
          })(<TextArea  autosize={{ minRows: 2, maxRows: 6 }}/>)}
      </FormItem> */}

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
          {form.getFieldDecorator('status', {
            initialValue: formAddValues.status,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请选择状态' }],
          })(<Select
            size="default"
          >
          {statusOptions}
          </Select>)}
        </FormItem>

      </Form>
    </Modal>
  );
});



@connect(({ port, loading }) => ({
  port,
  loading: loading.models.port,
}))


@Form.create()
export default class PortList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新增接口',
    expandForm: false,

    selectedRows: [],

    formAddValues: {
      port_id: '',
      server_name: '',
      port_address: '',
      request_method: '',
      user_id:'',
      status: 'open',
      // note: '',
     
    },
    formQueryValues: {},
  };

  

  componentDidMount() {
    const { dispatch } = this.props;

    //获取数据
    dispatch({
      type: 'port/fetchPort',
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
      type: 'port/fetchPort',
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
      type: 'port/fetchPort',
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
          type: 'port/removePort',
          payload: {
            port_ids: selectedRows.map(row => row.port_id),
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
      type: 'port/removePort',
      payload: {
        port_ids: [text.port_id],
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
      port_id: text.port_id,
      server_name: text.server_name,
      port_address: text.port_address,
      request_method: text.request_method,
      user_id:text.user_id,
      status: 'open',
      status: text.status,
    };

    this.setState({
      modalTitle: '编辑接口',
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
        type: 'port/fetchPort',
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
      port_id: '',
      server_name: '',
      port_address: '',
      request_method: '',
      user_id:'',
      status: 'open',
    };

    this.setState({
      modalTitle: '新增接口',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

  };


  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch} = this.props;

    let params = {
      port_id: this.state.formAddValues.port_id,
      server_name: fields.server_name,
      port_address: fields.port_address,
      request_method: fields.request_method,
      user_id:fields.user_id,
      status: 'open',
    };


    dispatch({
      type: 'port/addPort',
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
            <FormItem label="服务器名称">
            {form.getFieldDecorator('query_server_name', {
          })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('query_status',{
                initialValue: this.state.formQueryValues.query_status,
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value=''>全部</Option>
                  {statusOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="创建时间">
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
      port: { data },
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
        key: 'sort',
      },
      {
        title: '接口路径',
        dataIndex: 'port_address',
        key: 'port_address',
      },
      {
        title: '请求方式',
        dataIndex: 'request_method',
        key: 'request_method',
      },
      
      {
        title: '操作人',
        dataIndex: 'user_id',
        key: 'user_id',
      },

      {
        title: '服务器名称',
        dataIndex: 'server_name',
        key: 'server_name',
      },
      
      // {
      //   title: '备注信息',
      //   dataIndex: 'note',
      //   width: 200,
      //   render(text, record) {
      //     return <Tooltip placement="top" title={text} >
      //                <span className={styles.note}>{text}</span>
      //            </Tooltip>
      //    }
      // },

      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
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
      },

      {
        title: '创建时间',
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

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
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
              rowKey={'port_id'}
              loading={loading}
              rowSelection={rowSelection}
              dataSource={data.list}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle} packageTypes={data.packageTypes} jobNumbers={data.jobNumbers} />
      </PageHeaderLayout>
    );
  }
}
