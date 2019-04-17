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
  Badge,
  Menu,
  DatePicker,
  Popconfirm,
  Modal,
  Divider,
} from 'antd';
const { RangePicker } = DatePicker;


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import StandardTable from '../../../components/MenuTable';
import { menu_type, menu_type_option, badge_status_map, common_status_map } from '../../../utils/status';


import styles from './Index.less';
import { getAccessToken } from '../../../utils/localstorage';

const FormItem = Form.Item;

const Option = Select.Option

//构造状态option
const menuOptions = menu_type_option.map(item => {
  return <Option key={item.key}>{item.name}</Option>;
});




//表单
const CreateForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleAdd,
    handleModalVisible,
    formAddValues,
    modalTitle,
    disabled,
    handleChange,
    menuConditionData
  } = props;

  const okHandle = () => {
    form.validateFields({ first: false }, (err, fieldsValue) => {
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
      <Row gutter={24}>
        <Col sm={24}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否一级菜单"
          >
            {form.getFieldDecorator('is_root_menu', {
              initialValue: formAddValues.is_root_menu,
              validateFields: true,
            })
              (<Select
                style={{ width: '100%' }}
                placeholder="请选择"
                onChange={handleChange}
              >
                {menuOptions}
              </Select>)}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}
            label="选择父级菜单"
          >
            {form.getFieldDecorator('parent_menu_id', {
              initialValue: formAddValues.parent_menu_id,
              validateFields: true,
            })
              (<Select
                style={{ width: '100%' }}
                placeholder="请选择"
                disabled={disabled}
                
              >
               {
                 menuConditionData.map(item => {
                  return <Option key={item.menu_id}>{item.menu_name}</Option>;
                })
               } 
              </Select>)}
          </FormItem>
          {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图标">
          {
            form.getFieldDecorator('icon',{
              initialValue:formAddValues.icon,
              validateFields:true,
            })
            (<Input placeholder="请输入" />)}
        </FormItem> */}


          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名称">
            {
              form.getFieldDecorator('menu_name', {
                initialValue: formAddValues.menu_name,
                validateFields: true,
              })
                (<Input placeholder="请输入" />)}
          </FormItem>



          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="对应前端路由">
            {form.getFieldDecorator('route', {
              initialValue: formAddValues.route,
              validateFields: true,
            })
              (<Input placeholder="请输入" />)}
          </FormItem>

        </Col>
      </Row>
    </Modal>
  );
});



@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))


@Form.create()
export default class FollowList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新增菜单',
    expandForm: false,
    disabled: true,
    modalConfigurationMenuVisible: false,
    selectedRows: [],
    formAddValues: {
    },
    formQueryValues: {},
  };



  componentDidMount() {
    const { dispatch } = this.props;
    //获取数据
    dispatch({
      type: 'menu/fetchMenu',
      payload: {},
    });
    dispatch({
      type: 'menu/fetchMenuByCondition',
      payload: {
        is_root_menu: 1,
      },
    });
  }



  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  // 一级菜单选择触发事件
  handleChange = value => {
    if (value == common_status_map.yes) {
      this.setState({
        disabled: true,
      })
    } else {
      this.setState({
        disabled: false,
      })
    }
  }

  //列表数据改变时
  handleTableChange = (pagination, filtersArg, sorter) => {
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
    //   type: 'follow/fetchFollow',
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
    //   type: 'follow/fetchFollow',
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

    dispatch({
      type: 'menu/removeMenu',
      payload: {
        menu_id: [text.menu_id],
        filters: this.state.formQueryValues
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });

  };



  //一级菜单操作

  onfirstMenusChange = (e) => {
    this.setState({
      defaultfirstMenuValue: e.target.value,
    });
  }


  //编辑
  handleEdit = (e, text, record) => {
    console.log(text.is_root_menu);
    const formValuesArr = {
      menu_id: text.menu_id,
      menu_name: text.menu_name,
      is_root_menu: text.is_root_menu.toString(),
      parent_menu_id: text.parent_menu_id,
      route: text.route,
    };

    let inputDisabled = this.state.disabled;
    if (text.is_root_menu == common_status_map.yes) {
      inputDisabled = true;
    } else {
      inputDisabled = false;
    }

    this.setState({
      modalTitle: '编辑',
      formAddValues: formValuesArr,
      modalVisible: true,
      disabled: inputDisabled,
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
        type: 'menu/fetchMenu',
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
      menu_id: '',
      menu_name: '',
      is_root_menu: '',
      route: '',
    };

    this.setState({
      modalTitle: '新增菜单',
      formAddValues: formValuesArr,
    });
  };


  //新增数据
  handleAdd = (fields, form, value) => {
    console.log(fields);
    const { dispatch } = this.props;
    let params = {
      menu_id: this.state.formAddValues.menu_id,
      menu_name: fields.menu_name,
      parent_menu_id:fields.parent_menu_id,
      is_root_menu: fields.is_root_menu,
      route: fields.route,
    };

    let url = 'menu/addMenu';
    if (this.state.formAddValues.menu_id) {
      url = 'menu/editMenu';
    }
    dispatch({
      type: url,
      payload: params,//上面定义所需的所有参数
      callback: (result) => {
        if (result == 'success') {
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
            <FormItem label="菜单名称">
              {getFieldDecorator('query_menu_name', {
                initialValue: this.state.formQueryValues.query_menu_name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="前端路由">
              {getFieldDecorator('query_route', {
                initialValue: this.state.formQueryValues.query_route,
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
            <FormItem label="菜单名称">
              {getFieldDecorator('query_menu_name', {
                initialValue: this.state.formQueryValues.query_menu_name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="前端路由">
              {getFieldDecorator('query_route', {
                initialValue: this.state.formQueryValues.query_route,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <FormItem label="是否为一级菜单">
              {getFieldDecorator('query_is_root_menu', {
                initialValue: this.state.formQueryValues.query_is_root_menu,
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {menuOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('query_created_at', {
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
      menu: { data },
      menu: { menuConditionData },
      loading,
    } = this.props;


    const { selectedRows,
      modalVisible,
      formAddValues,
      modalTitle,
      disabled,
    } = this.state;


    const columns = [
      {
        title: '序号',
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: '菜单名称',
        dataIndex: 'menu_name',
        key: 'menu_name',
      },

      {
        title: '是否一级菜单',
        dataIndex: 'is_root_menu',
        key: 'is_root_menu',
        filters: [
          {
            text: menu_type_option[0]['name'],
            value: menu_type_option[0]['key'],
          },
          {
            text: menu_type_option[1]['name'],
            value: menu_type_option[1]['key'],
          },
        ],
        onFilter: (value, record) => record.is_root_menu.toString() === value,
        render(val) {
          return <Badge status={badge_status_map[val]} text={menu_type[val]} />;
        },
      },

      {
        title: '对应前端路由',
        dataIndex: 'route',
        key: 'route',
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
        key: 'operation',
        width: 140,
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



    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="remove">批量删除</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleChange: this.handleChange
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

              <StandardTable
                selectedRows={selectedRows}
                loading={loading}
                data={data}
                columns={columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
        </div>
        <CreateForm 
        {...parentMethods} 
        modalVisible={modalVisible} 
        formAddValues={formAddValues} 
        modalTitle={modalTitle} 
        disabled={disabled} 
        menuConditionData={menuConditionData}
         />
      </PageHeaderLayout>
    );
  }
}
