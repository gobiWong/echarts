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
  DatePicker,
  Popconfirm,
  Modal,
  Tooltip,
  Divider,
} from 'antd';
const { RangePicker } = DatePicker;
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import StandardTable from '../../../components/EquipmentListTable';
import styles from './Index.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
//新增设备的对话框
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle } = props;
  const okHandle = () => {
    form.validateFields({ first: false }, (err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  const handleBlur = () => {
    console.log('blur');
  }
  const handleFocus = () => {
    console.log('focus');
  }
  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Row gutter={24}>
        <Col sm={12}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="MAC地址">
            {form.getFieldDecorator('mac_address', {
              initialValue: formAddValues.mac_address,
              validateFields: true,
            })
              (<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="序列号">
            {form.getFieldDecorator('serial_number', {
              initialValue: formAddValues.serial_number,
              validateFields: true,
            })
              (<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备类型">
            {form.getFieldDecorator('equipment_type_id', {
              initialValue: formAddValues.equipment_type_id,
              validateFields: true,
            })
              (<Select
                style={{ width: '100%' }}
                placeholder="请选择"
              >
                <Option value="cc80">语音网关</Option>
                <Option value="cc">卡机</Option>
                <Option value="cc">服务器</Option>
              </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备编码">
            {
              form.getFieldDecorator('equipment_code', {
                initialValue: formAddValues.equipment_code,
                validateFields: true,
              })
                (<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备位置">
            {
              form.getFieldDecorator('equipemnt_location', {
                initialValue: formAddValues.equipemnt_location,
                validateFields: true,
              })
                (<Select
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  <Option value="tx">测试</Option>
                  <Option value="rk">融科</Option>
                  <Option value="lc">客户本地</Option>
                  <Option value="dd">待定</Option>
                </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="归属企业">
            {
              form.getFieldDecorator('company_id', {
                initialValue: formAddValues.company_id,
                validateFields: true,
              })
                (<Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="请输入"
                  optionFilterProp="children"
                  onChange={() => handleChange()}
                  onFocus={() => handleFocus()}
                  onBlur={() => handleBlur()}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="tx">乐联</Option>
                  <Option value="tx1">乐联1</Option>
                  <Option value="tx2">乐联2</Option>
                  <Option value="tx3">乐联3</Option>
                  <Option value="tx4">乐联4</Option>
                  <Option value="rk5">客户</Option>
                  <Option value="dd">其他</Option>
                </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备归属类型">
            {
              form.getFieldDecorator('equipment_attribution_id', {
                initialValue: formAddValues.equipment_attribution_id,
                validateFields: true,
              })
                (<Select
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  <Option value="tx">乐联</Option>
                  <Option value="rk">客户</Option>
                  <Option value="dd">其他</Option>
                </Select>)
            }
          </FormItem>
        </Col>
        <Col sm={12}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备用途">
            {
              form.getFieldDecorator('equipment_use_id', {
                initialValue: formAddValues.equipment_use_id,
                validateFields: true,
              })
                (<Select
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  <Option value="tx">房产</Option>
                  <Option value="rk">信贷</Option>
                  <Option value="dd">催收</Option>
                </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公网IP">
            {
              form.getFieldDecorator('public_network_ip', {
                initialValue: formAddValues.public_network_ip,
                validateFields: true,
              })
                (<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="IP地址">
            {
              form.getFieldDecorator('public_network_ip_area', {
                initialValue: formAddValues.public_network_ip_area,
                validateFields: true,
              })
                (<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内网IP">
            {
              form.getFieldDecorator('intranet_ip', {
                initialValue: formAddValues.intranet_ip,
                validateFields: true,
              })
                (<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
            {
              form.getFieldDecorator('note', {
                initialValue: formAddValues.note,
                validateFields: true,
              })
                (<TextArea rows={4} />)}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
});
@connect(({ equipmentList, loading }) => ({
  equipmentList,
  loading: loading.models.equipmentList,
}))
@Form.create()
export default class EquipmentList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '新增设备',
    expandForm: false,
    selectedRows: [],
    formAddValues: {
      equipment_id: '',
      mac_address: '',
      serial_number: '',
      equipment_type_id: '',
      equipment_code: '',
      equipemnt_location: '',
      company_id: '',
      equipment_attribution_id: '',
      equipment_use_id: '',
      public_network_ip: '',
      public_network_ip_area: '',
      intranet_ip: '',
      note: '',
      created_at: '',
      updated_at: '',
    },
    formQueryValues: {},
  };
  componentDidMount() {
    const { dispatch } = this.props;
    //获取数据
    dispatch({
      type: 'equipmentList/fetchEquipment',
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
      type: 'equipmentList/fetchEquipment',
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
      type: 'equipmentList/fetchEquipment',
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
          type: 'equipmentList/removeEquipment',
          payload: {
            equipment_ids: selectedRows.map(row => row.equipment_id),
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
      type: 'equipmentList/removeEquipment',
      payload: {
        equipment_ids: [text.equipment_id],
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
      equipment_id: text.equipment_id,
      mac_address: text.mac_address,
      serial_number: text.serial_number,
      equipment_type_id: text.equipment_type_id,
      equipment_code: text.equipment_code,
      equipemnt_location: text.equipemnt_location,
      company_id: text.company_id,
      equipment_attribution_id: text.equipment_attribution_id,
      equipment_use_id: text.equipment_use_id,
      public_network_ip: text.public_network_ip,
      public_network_ip_area: text.public_network_ip_area,
      intranet_ip: text.intranet_ip,
      note: text.note,
      created_at: text.created_at,
      updated_at: text.updated_at
    };
    this.setState({
      modalTitle: '编辑设备信息',
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
        type: 'equipmentList/fetchEquipment',
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
      equipment_id: '',
      mac_address: '',
      serial_number: '',
      equipment_type_id: '',
      equipment_code: '',
      equipemnt_location: '',
      company_id: '',
      equipment_attribution_id: '',
      equipment_use_id: '',
      public_network_ip: '',
      public_network_ip_area: '',
      intranet_ip: '',
      note: '',
      created_at: '',
      updated_at: '',
    };
    this.setState({
      modalTitle: '新增设备',
    });
    this.setState({
      formAddValues: formValuesArr,
    });
  };
  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch } = this.props;
    let params = { 
      mac_address: fields.mac_address,
      serial_number: fields.serial_number,
      equipment_type_id: fields.equipment_type_id,
      equipment_code: fields.equipment_code,
      equipemnt_location: fields.equipemnt_location,
      company_id: fields.company_id,
      equipment_attribution_id: fields.equipment_attribution_id,
      equipment_use_id: fields.equipment_use_id,
      public_network_ip: fields.public_network_ip,
      public_network_ip_area:fields.public_network_ip_area,
      intranet_ip: fields.intranet_ip,
      note: fields.note,
      // created_at: fields.created_at,
      // updated_at: fields.updated_at,
      // ip_adddress: fields.ip_adddress,
      // equipment_id: fields.equipment_id,
    };
    let url = 'equipmentList/addNewequipment';
    if (this.state.formAddValues.user_id) {
      url = 'equipmentList/editEquipment';
    }
    dispatch({
      type: url,
      payload: params,
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
  //渲染高级查询
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">
          <Col md={8} sm={24}>
            <FormItem label="MAC地址">
              {getFieldDecorator('mac_address', {
                initialValue: this.state.formQueryValues.mac_address,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('created_at', {
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
      equipmentList: { data },
      loading,
    } = this.props;
    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   },
    //   getCheckboxProps: record => ({
    //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //     name: record.name,
    //   }),
    // };
    const columns = [
      // {
      //   title: '序号',
      //   dataIndex: 'sort',
      //   key: 'sort',
      // },
      //  {
      //   title: '设备ID',
      //   dataIndex: 'equipment_id',
      //   key: 'equipment_id',
      // },
      {
        title: 'MAC地址',
        dataIndex: 'mac_address',
        key: 'mac_address',
      },
      {
        title: '设备序列号',
        dataIndex: 'serial_number',
        key: 'serial_number',
      },
      {
        title: '设备类型ID',
        dataIndex: 'equipment_type_id',
        key: 'equipment_type_id',
      },
      {
        title: '设备编码',
        dataIndex: 'equipment_code',
        key: 'equipment_code',
      },
      {
        title: '设备位置',
        dataIndex: 'equipemnt_location',
        key: 'equipemnt_location',
      },
      {
        title: '归属企业',
        dataIndex: 'company_id',
        key: 'company_id',
      },
      {
        title: '设备归属类型',
        dataIndex: 'equipment_attribution_id',
        key: 'equipment_attribution_id',
      },
      {
        title: '设备用途',
        dataIndex: 'equipment_use_id',
        key: 'equipment_use_id',
      },
      {
        title: '公网IP',
        dataIndex: 'public_network_ip',
        key: 'public_network_ip',
      },
      {
        title: 'IP地址',
        dataIndex: 'public_network_ip_area',
        key: 'public_network_ip_area',
      },
      {
        title: '内网IP',
        dataIndex: 'intranet_ip',
        key: 'intranet_ip',
      },
      {
        title: '备注信息',
        dataIndex: 'note',
        key: 'note',
        render(text, record) {
          return <Tooltip placement="top" title='备注信息' >
            <span className={styles.note}>备注信息</span>
          </Tooltip>
        }
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
    const { selectedRows, modalVisible, formAddValues, modalTitle } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="remove">批量删除</Menu.Item>
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
              {/* 新增设备区域开始 */}
              <div className={styles.tableListOperator}>
                <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                  新增设备
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
              {/* 新增设备区域结束 */}
              <StandardTable
                scroll={{ x: 2000 }}
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle} packageTypes={data.packageTypes} jobNumbers={data.jobNumbers} />
      </PageHeaderLayout>
    );
  }
}
