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
  Tooltip,
  Badge,
  DatePicker,
  Popconfirm,
  Modal,
  Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { common_status, common_status_option, isApi_status, isApi_status_option, badge_status_map } from '../../../utils/status';

import styles from './Index.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


//构造状态option
// const statusOptions = common_status_option.map( item => {
//   return <Option key={item.key}>{item.name}</Option>;
// });

const isApiOptions = isApi_status_option.map( item => {
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
            // rules: [{ required: true, whitespace:true, message: '请输入服务器名称' }],
          })(<Input
            style={{ width: '100%' }}
            // placeholder="请选择"
          />)}
        </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="WEB登录地址">
      {form.getFieldDecorator('web_login_address', {
            initialValue: formAddValues.web_login_address,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入WEB登录地址' }],
          })(<Input placeholder="请输入" />)}
      </FormItem>

       <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否支持API">
          {form.getFieldDecorator('api_support', {
            initialValue: formAddValues.api_support,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请选择状态' }],
          })(<Select
            size="default"
          >
           {isApiOptions}
          </Select>)}
        </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="	Api地址">
        {form.getFieldDecorator('api_address', {
              initialValue: formAddValues.api_address,
              validateFirst: true,
              // rules: [{ required: true, message: '请输入API地址' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('note', {
            initialValue: formAddValues.note,
            validateFirst: true,
          })(<TextArea rows={4} />)}
      </FormItem>
      </Form>
    </Modal>
  );
});



@connect(({ server, loading }) => ({
  server,
  loading: loading.models.server,
}))


@Form.create()
export default class ServerList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新增服务器',
    expandForm: false,

    selectedRows: [],

    formAddValues: {
      subsystem_server_id: '',
      server_name: '',
      web_login_address: '',
      api_address: '',
      note: '',
      api_support:'',
    },
    formQueryValues: {},
  };

  

  componentDidMount() {
    const { dispatch } = this.props;

    //获取数据
    dispatch({
      type: 'server/fetchServer',
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
      type: 'server/fetchServer',
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
      type: 'server/fetchServer',
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
          type: 'server/removeServer',
          payload: {
            call_center_server_ids: selectedRows.map(row => row.call_center_server_id),
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
      type: 'server/removeServer',
      payload: {
        call_center_server_ids: [text.call_center_server_id],
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
      subsystem_server_id:  text.subsystem_server_id,
      server_name:  text.server_name,
      web_login_address:  text.web_login_address,
      api_address:  text.api_address,
      note:  text.note,
      api_support: text.api_support,
    };

    this.setState({
      modalTitle: '编辑server',
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
        type: 'server/fetchServer',
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
      subsystem_server_id: '',
      server_name: '',
      web_login_address: '',
      api_address: '',
      note: '',
      api_support:'',
    };

    this.setState({
      modalTitle: '新增服务器',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

  };


  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch} = this.props;

    let params = {
      subsystem_server_id: fields.subsystem_server_id,
      server_name: fields.server_name,
      web_login_address: fields.web_login_address,
      api_address: fields.api_address,
      note: fields.note,
      api_support:fields.api_support,
    };


    dispatch({
      type: 'server/addServer',
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
            {form.getFieldDecorator('server_name', {
          })(<Input
            style={{ width: '100%' }}
            // placeholder="请选择"
          />)}
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
      server: { data },
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
    
    const Style = {
      display:'block',
      overflow:'hidden',
      textOveflow:'ellipsis',
      whitespace:'nowrap',
      padding:'0 3px',
      width:'100px',
      height:'20px'
    }
   const columns = [
      {
        title: '子系统服务器ID',
        dataIndex: 'subsystem_server_id',
      },
      {
        title: '服务器名称',
        dataIndex: 'server_name',
      },
      {
        title: 'Web登录地址',
        dataIndex: 'web_login_address',
        key: 'web_login_address',
      },
      
      {
        title: 'Api地址',
        dataIndex: 'api_address',
      },
      
      {
        title: '备注信息',
        dataIndex: 'note',
        width: 200,
        render(text, record) {
          return <Tooltip placement="top" title={text}>
                     <span style={Style}>{text}</span>
                 </Tooltip>
         }
      },

      {
        title: '是否支持API',
        dataIndex: 'api_support',
        key:'api_support',
        filters: [
          {
            text: isApi_status_option[0]['name'],
            value: isApi_status_option[0]['key'],
          },
          {
            text: isApi_status_option[1]['name'],
            value: isApi_status_option[1]['key'],
          },
        ],
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={badge_status_map[val]} text={isApi_status[val]} />;
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
              rowKey={'subsystem_server_id'}
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
