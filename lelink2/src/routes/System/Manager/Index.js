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
  Table,
  DatePicker,
  Popconfirm,
  Switch,
  Modal,
  Badge,
  Divider,
} from 'antd';
const {  RangePicker } = DatePicker;

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

const confirm = Modal.confirm;


//新增管理员对话框
const CreateManagerForm = Form.create()(props => {
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理员名称">
          {form.getFieldDecorator('manager_name', {
            initialValue: formAddValues.manager_name,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入管理员名称' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理员角色">
          {form.getFieldDecorator('manager_role', {
            initialValue: formAddValues.manager_role,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入管理员角色' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理员代码">
          {form.getFieldDecorator('manager_code', {
            initialValue: formAddValues.manager_code,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入管理员代码' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
          {form.getFieldDecorator('status', {
            initialValue: formAddValues.status,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请选择管理员状态' }],
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



//配置系统角色对话框
const CreateRoleForm = Form.create()(props => {
  const { roleModalVisible, form, handleAddRole, handleRoleModalVisible, modalTitle} = props;
  
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleAddRole(fieldsValue, form);
    });
  };

  const handleChange=(value)=> {
    console.log(`selected ${value}`);
  }




  return (
    <Modal
      title={modalTitle}
      visible={roleModalVisible}
      onOk={okHandle}
      onCancel={() => handleRoleModalVisible()}
    >

      <Form>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
          <Select
                 showSearch
                 style={{ width: '100%' }}
                 placeholder="请输入"
                //  optionFilterProp="children"
                 onChange={() => handleChange()}
                //  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">主管</Option>
                <Option value="2">坐席</Option>
          </Select>
        </FormItem> 
      </Form>

    </Modal>
  );
});








@connect(({ manager, loading }) => ({
  manager,
  loading: loading.models.manager,
}))


@Form.create()
export default class TableList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新增管理员',
    expandForm: false,
    is_switch: Math.random() > 0.5,
    selectedRows: [],
    searchText: '',
    filterDropdownVisible: false,

    passwordRequired: true,
    formAddValues: {
      manager_name: '',
      manager_code: '',
      mobile: '',
      manager_level_id: '',
      status: 'open'
    },
    formQueryValues: {},

    formRoleAddValues: [],
    roleModalVisible: false,

    formTableRoleAddValues: [],
    tableRoleModalVisible: false,

  };

  

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'manager/fetchManager',
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
  handleManagerTableChange = (pagination, filtersArg, sorter) => {
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

    // dispatch({
    //   type: 'manager/fetch',
    //   payload: params,
    // });
  };

  
  //重置查询数据
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formQueryValues: {},
    });
    // dispatch({
    //   type: 'manager/fetch',
    //   payload: {},
    // });
  };



  //切换查询
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  //单个删除
  handleDeleteData = (e, text, data) => {

    const { dispatch } = this.props;

    // dispatch({
    //   type: 'manager/remove',
    //   payload: {
    //     manager_ids: [text.user_id],
    //     filters: this.state.formQueryValues
    //   },
    //   callback: () => {
    //     this.setState({
    //       selectedRows: [],
    //     });
    //   },
    // });

  };


  //编辑
  handleEdit = (e, text, data) => {

    const formValuesArr = {
      manager_id: text.user_id,
      manager_name: text.manager_name,
      manager_role: text.manager_role,
      manager_code: text.manager_code,
      // manager_level_id: text.manager_level_id.toString(),
      status: text.status,
    };

    this.setState({
      passwordRequired: false,
    });

    this.setState({
      modalTitle: '编辑管理员',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

    this.setState({
      modalVisible: true,
    });

  };


  //配置系统角色
  handleRole = (e, text, data) => {

    // let roles = text.role_belongs_to_many.map( item => {
    //   return item.role_id.toString();
    // });

    // const formValuesArr = {
    //   manager_id: text.user_id,
    //   role_ids: roles
    // };


    this.setState({
      modalTitle: '配置系统角色',
    });

    // this.setState({
    //   formRoleAddValues: formValuesArr,
    // });

    this.setState({
      roleModalVisible: true,
    });

  };

  //启用禁用

  onChange = (checked,record) => {
    console.log(record);
    console.log(checked);
    const that = this; 
    var title = checked ? "启用" : "禁用";
    console.log(title);
    confirm({
     
    title: `确定要${title}吗？`,
     
    content: '',
     
    okText: '确定',
     
    cancelText: '取消',
     
    onOk() {
     
    if (checked) {
     
      that.setState({ is_switch: checked });
     
    } else {
     
    //
     
      that.setState({ is_switch: checked });
     
    }
     
     
     
    },
     
    onCancel() {
     
    console.log('Cancel');
     
    },
     
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

      // dispatch({
      //   type: 'manager/fetch',
      //   payload: values,
      // });
    });
  };


  //管理员对话框显隐
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });

    this.setState({
      passwordRequired: true,
    });

    const formValuesArr = {
      manager_id: '',
      manager_name: '',
      manager_code: '',
      manager_role: '',
      status: 'open'
    };

    this.setState({
      modalTitle: '新增管理员',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

  };


  //配置系统角色对话框显隐
  handleRoleModalVisible = flag => {

    this.setState({
      roleModalVisible: !!flag,
    });

    // const formValuesArr = {
    //   manager_id: '',
    //   role_ids: [],
    // };

    // this.setState({
    //   formRoleAddValues: formValuesArr,
    // });

  };


  //新增数据
  handleAdd = (fields, form) => {
    // console.log(fields);
    const { dispatch } = this.props;
    let params = {
      manager_id: this.state.formAddValues.manager_id,
      manager_role: fields.manager_role,
      manager_name: fields.manager_name,
      manager_code: fields.manager_code,
      status: fields.status,
      filters: this.state.formQueryValues
    };

    dispatch({
      type: 'manager/add',
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


  //配置系统角色
  handleAddRole = (fields, form) => {
    // const { dispatch } = this.props;

    // let params = {
    //   manager_id: this.state.formRoleAddValues.manager_id,
    //   role_ids: fields.role_ids,
    //   filters: this.state.formQueryValues
    // };

    // dispatch({
    //   type: 'manager/role',
    //   payload: params,
    //   callback: (result) => {

    //     if(result == 'success'){
    //       form.resetFields();
    //       this.setState({
    //         roleModalVisible: false,
    //       });
    //     }
        
    //   },
    // });
    this.setState({
      roleModalVisible: false,
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
            <FormItem label="管理员名称">
              {getFieldDecorator('query_manager_name',{
                initialValue: this.state.formQueryValues.query_manager_name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="管理员角色">
              {getFieldDecorator('manager_role',{
                initialValue: this.state.formQueryValues.manager_role,
              })(<Input placeholder="请输入" />)}
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
            <FormItem label="管理员名称">
              {getFieldDecorator('query_manager_name',{
                initialValue: this.state.formQueryValues.query_manager_name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="管理员角色">
              {getFieldDecorator('manager_role',{
                initialValue: this.state.formQueryValues.manager_role,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
         
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status',{
                initialValue: this.state.formQueryValues.status,
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {statusOptions}
                </Select>
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
      manager: { data },
      loading,
    } = this.props;
    const {  modalVisible, formAddValues, modalTitle,  roleModalVisible, formRoleAddValues,is_switch } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'manager_id',
        key: 'manager_id',
      },
      {
        title: '管理员名称',
        dataIndex: 'manager_name',
        key: 'manager_name',
      },
      
      {
        title: '管理员角色',
        dataIndex: 'manager_role',
        key: 'manager_role',
        // render(val, record) {
        //   let roles = record.role_belongs_to_many.map( item => {
        //     return <Tag color="#d9d6c3" key={item.role_name}>{item.role_name}&nbsp;</Tag>;
        //   });
        //   return roles;
        // },
      },
      {
        title: '管理员代码',
        dataIndex: 'manager_code',
        key: 'manager_code',
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
        width: 180,
        render: (text, record, index) => (
          <Fragment>
            <a href="javascript:;" onClick={this.handleRole.bind(this, text, record)} >配置角色</a>
            <Divider type="vertical" />

            <Switch
              checked={is_switch}
              checkedChildren="禁用" 
              unCheckedChildren="启用" 
              onChange={this.onChange} 
            />
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.handleEdit.bind(this, text, record)} >编辑</a>
            <Divider type="vertical" />

            <Popconfirm placement="topRight" title="确定删除吗？" onConfirm={this.handleDeleteData.bind(this, text, record)} okText="Yes" cancelText="No">
            <a href="javascript:;" >删除</a>
            </Popconfirm>
            
          </Fragment>
        ),
      },
    ];



    // const menu = (
    //   <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
    //     <Menu.Item key="remove">删除</Menu.Item>
    //   </Menu>
    // );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const parentRoleMethods = {
      handleAddRole: this.handleAddRole,
      handleRoleModalVisible: this.handleRoleModalVisible,
    };

    return (
      <PageHeaderLayout title="管理员">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增管理员
              </Button>
              {/* {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      批量操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )} */}
            </div>

            <Table
              rowKey={'manager_id'}
              // selectedRows={selectedRows}
              loading={loading}
              dataSource= { data.list }
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleManagerTableChange}
            />
          </div>
        </Card>
        <CreateManagerForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle} />
        <CreateRoleForm {...parentRoleMethods} roleModalVisible={roleModalVisible} formRoleAddValues={formRoleAddValues} modalTitle={modalTitle}  />
      </PageHeaderLayout>
    );
  }
}
