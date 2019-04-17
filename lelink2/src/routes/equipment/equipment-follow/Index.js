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
const { RangePicker } = DatePicker;
import StandardTable from '../../../components/EquipmentFollowTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { record_type, record_type_option, record_type_map } from '../../../utils/status';
import styles from './Index.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
//构造状态option
const typeOptions = record_type_option.map(item => {
  return <Option key={item.key}>{item.name}</Option>;
});
//表单
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle } = props;
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
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="添加人">
          {form.getFieldDecorator('user_id', {
            initialValue: formAddValues.user_id,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入记录人' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备序列号">
          {form.getFieldDecorator('serial_number', {
            initialValue: formAddValues.serial_number,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入企业名称' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="记录类别">
          {form.getFieldDecorator('record_from', {
            initialValue: formAddValues.record_from,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请选择记录类别' }],
          })(<Select
            size="default"
          >
          {typeOptions}
          </Select>)}
      </FormItem> */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="原始内容">
          {form.getFieldDecorator('origin_content', {
            initialValue: formAddValues.origin_content,
            validateFirst: true,
          })(<TextArea rows={4} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="当前内容">
          {form.getFieldDecorator('current_content', {
            initialValue: formAddValues.current_content,
            validateFirst: true,
          })(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    </Modal>
  );
});
@connect(({ equipmentFollow, loading }) => ({
  equipmentFollow,
  loading: loading.models.equipmentFollow,
}))
@Form.create()
export default class FollowList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '新增跟进记录',
    expandForm: false,
    selectedRows: [],
    formAddValues: {
      equipment_operate_follow_record_id: '',
      user_id: '',
      serial_number: '',
      origin_content: '',
      record_from: '',
    },
    formQueryValues: {},
  };
  componentDidMount() {
    const { dispatch } = this.props;
    //获取数据
    dispatch({
      type: 'equipmentFollow/fetchequipmentFollow',
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
      type: 'equipmentFollow/fetchequipmentFollow',
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
      type: 'equipmentFollow/fetchequipmentFollow',
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
          type: 'equipmentFollow/fetchequipmentFollow',
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
      type: 'equipmentFollow/fetchequipmentFollow',
      payload: {
        equipment_operate_follow_record_ids: [text.equipment_operate_follow_record_id],
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
      equipment_operate_follow_record_id: text.equipment_operate_follow_record_id,
      serial_number: text.serial_number,
      user_id: text.user_id,
      origin_content: text.origin_content,
      current_content: text.current_content,
      record_from: text.record_from,
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
        type: 'equipmentFollow/fetchequipmentFollow',
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
      equipment_operate_follow_record_id: '',
      user_id: '',
      serial_number: '',
      origin_content: '',
      current_content: '',
      record_from: '',
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
    const { dispatch } = this.props;
    let params = {
      equipment_operate_follow_record_id: fields.equipment_operate_follow_record_id,
      user_id: fields.user_id,
      serial_number: fields.serial_number,
      origin_content: fields.origin_content,
      current_content: fields.current_content,
      record_from: fields.record_from,
    };
    dispatch({
      type: 'equipmentFollow/addequipmentFollow',
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
            <FormItem label="添加人">
              {form.getFieldDecorator('user_id', {
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="记录类别">
              {getFieldDecorator('record_from', {
                initialValue: this.state.formQueryValues.record_from,
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value=''>全部</Option>
                  {typeOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="添加时间">
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
      equipmentFollow: { data },
      loading,
    } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //   name: record.name,
      // }),
    };
    const columns = [
      {
        title: '序号',
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: '添加人',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '设备序列号',
        dataIndex: 'serial_number',
        key: 'serial_number',
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
      {
        title: '记录类别',
        dataIndex: 'record_from',
        key: 'record_from',
        filters: [
          {
            text: record_type_option[0]['name'],
            value: record_type_option[0]['key'],
          },
          {
            text: record_type_option[1]['name'],
            value: record_type_option[1]['key'],
          },
        ],
        onFilter: (value, record) => record.record_from.toString() === value,
        render(val) {
          return <Badge status={record_type_map[val]} text={record_type[val]} />;
        },
      },
      {
        title: '原始内容',
        dataIndex: 'origin_content',
        key: 'origin_content',
        render(text, record) {
          return <Tooltip placement="top" title={text} >
            <span className={styles.note}>{text}</span>
          </Tooltip>
        }
      },
      {
        title: '当前内容',
        dataIndex: 'current_content',
        key: 'current_content',
        render(text, record) {
          return <Tooltip placement="top" title={text} >
            <span className={styles.note}>{text}</span>
          </Tooltip>
        }
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle} packageTypes={data.packageTypes} jobNumbers={data.jobNumbers} />
      </PageHeaderLayout>
    );
  }
}
