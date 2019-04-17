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
  Transfer,
  Tag,
  DatePicker,
  Popconfirm,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

import RoleTable from 'components/TableRoleTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { common_status, common_status_option, badge_status_map } from '../../../utils/status';
import { regex } from '../../../utils/regex';

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
const CreateRoleForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle } = props;
  
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };


  const formItemArr = ['role_name', 'role_code'];
  const formItems = formItemArr.map( (item, index) => {

    switch(item){
      case 'role_name':
         return <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色名称" key={index}>
         {form.getFieldDecorator('role_name', {
           initialValue: formAddValues.role_name,
           validateFirst: true,
           rules: [{ required: true, whitespace:true, message: '请输入角色名称' }],
         })(<Input placeholder="请输入" />)}
       </FormItem>
       break;

       default:
       return false;
    }

  });


  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <Form>

        {formItems}

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色代码">
          {form.getFieldDecorator('role_code', {
            initialValue: formAddValues.role_code,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入角色代码' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
          {form.getFieldDecorator('status', {
            initialValue: formAddValues.status,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请选择角色状态' }],
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



@connect(({ tablerole, loading }) => ({
  tablerole,
  loading: loading.models.tablerole,
}))


@Form.create()
export default class TableList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新增列表角色',
    expandForm: false,

    selectedRows: [],
    searchText: '',
    filterDropdownVisible: false,

    formAddValues: {
      role_name: '',
      role_code: '',
      status: 'open'
    },
    formQueryValues: {},

    formPermissionAddValues: [],
    permissionModalVisible: false,

  };

  

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tablerole/fetch',
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
  handleRoleTableChange = (pagination, filtersArg, sorter) => {
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
      type: 'tablerole/fetch',
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
      type: 'tablerole/fetch',
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
          type: 'tablerole/remove',
          payload: {
            role_ids: selectedRows.map(row => row.role_id),
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
      type: 'tablerole/remove',
      payload: {
        role_ids: [text.role_id],
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
      role_id: text.table_role_id,
      role_name: text.role_name,
      role_code: text.role_code,
      status: text.status,
    };

    this.setState({
      modalTitle: '编辑列表角色',
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
        type: 'tablerole/fetch',
        payload: values,
      });
    });
  };


  //模态框新增数据
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });

    this.setState({
      passwordRequired: true,
    });

    const formValuesArr = {
      role_id: '',
      role_name: '',
      role_code: '',
      status: 'open'
    };

    this.setState({
      modalTitle: '新增列表角色',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

  };


  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch } = this.props;

    let params = {
      role_id: this.state.formAddValues.role_id,
      role_name: fields.role_name,
      role_code: fields.role_code,
      status: fields.status,
      filters: this.state.formQueryValues
    };

    dispatch({
      type: 'tablerole/submit',
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


  //渲染简易查询
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">
          <Col md={8} sm={24}>
            <FormItem label="角色名称">
              {getFieldDecorator('query_role_name',{
                initialValue: this.state.formQueryValues.query_role_name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="角色代码">
              {getFieldDecorator('query_role_code',{
                initialValue: this.state.formQueryValues.query_role_code,
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

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">
          <Col md={8} sm={24}>
            <FormItem label="角色名称">
              {getFieldDecorator('query_role_name',{
                initialValue: this.state.formQueryValues.query_role_name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="角色代码">
              {getFieldDecorator('query_role_code',{
                initialValue: this.state.formQueryValues.query_role_code,
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
                initialValue: this.state.formQueryValues.query_created_at,
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
      tablerole: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, formAddValues, modalTitle } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: '角色名称',
        dataIndex: 'role_name',
        key: 'role_name',
      },
      {
        title: '角色代码',
        dataIndex: 'role_code',
        key: 'role_code',
      },
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
        key: 'operation',
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
      },
    ];

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
      <PageHeaderLayout title="列表角色">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增列表角色
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

            <RoleTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleRoleTableChange}
            />
          </div>
        </Card>
        <CreateRoleForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle} />
      </PageHeaderLayout>
    );
  }
}
