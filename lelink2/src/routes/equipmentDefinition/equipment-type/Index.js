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
  Badge,
  DatePicker,
  Popconfirm,
  Modal,
  Divider,
  Tooltip,
} from 'antd';
const { RangePicker } = DatePicker;
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import StandardTable from '../../../components/EquipmentTypeTable';
import styles from './Index.less';
const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备型号">
          {form.getFieldDecorator('equipment_xh', {
            initialValue: formAddValues.equipment_xh,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入设备名称' }],
          })(<Input
            style={{ width: '100%' }}
            // placeholder="请选择"
          />)}
        </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备类型">
      {form.getFieldDecorator('equipment_type_id', {
            initialValue: formAddValues.equipment_type_id,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入设备类型' }],
          })(<Input
            style={{ width: '100%' }}
            // placeholder="请选择"
          />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="	设备品牌">
        {form.getFieldDecorator('equipment_brand', {
              initialValue: formAddValues.equipment_brand,
              validateFirst: true,
              // rules: [{ required: true, message: '请输入设备品牌' }],
        })(<Select
          style={{ width: '100%' }}
          placeholder="请选择"
        >
          <Option value="cc">Dinstar</Option>
          <Option value="cc01">DBL</Option>
      </Select>)}
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
@connect(({ equipmentType, loading }) => ({
  equipmentType,
  loading: loading.models.equipmentType,
}))
@Form.create()
export default class TypeList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '新增类型',
    expandForm: false,
    selectedRows: [],
    formAddValues: {
      equipment_type_id: '',
      equipment_model: '',
      equipment_type: '',
      equipment_brand: '',
      note: '',
      created_at:'',
      updated_at: '',
    },
    formQueryValues: {},
  };
  componentDidMount() {
    const { dispatch } = this.props;
    //获取数据
    dispatch({
      type: 'equipmentType/fetchType',
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
      type: 'equipmentType/fetchType',
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
      type: 'equipmentType/fetchType',
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
          type: 'equipmentType/fetchType',
          payload: {
            equipmentType_ids: selectedRows.map(row => row.equipmentType_id),
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
      type: 'equipmentType/fetchType',
      payload: {
        equipmentType_ids: [text.equipmentType_id_id],
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
      equipment_type_id: text.equipment_type_id,
      equipment_model: text.equipment_model,
      equipment_type: text.equipment_type,
      equipment_brand: text.equipment_brand,
      note: text.note,
      created_at:text.created_at,
      updated_at: text.updated_at,
    };
    this.setState({
      modalTitle: '编辑用途',
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
        type: 'equipmentType/fetchType',
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
      equipment_type_id: '',
      equipment_model: '',
      equipment_type: '',
      equipment_brand: '',
      note: '',
      created_at:'',
      updated_at: '',
    };
    this.setState({
      modalTitle: '新增类型',
    });
    this.setState({
      formAddValues: formValuesArr,
    });
  };
  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch} = this.props;
    let params = {
      equipment_type_id: this.state.formAddValues.equipment_type_id,
      equipment_model: fields.equipment_model,
      equipment_type: fields.equipment_type,
      equipment_brand: fields.equipment_brand,
      note: fields.note,
      created_at: fields.created_at,
      updated_at: fields.updated_at,
    };
    dispatch({
      type: 'equipmentType/addType',
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
            <FormItem label="设备型号">
            {form.getFieldDecorator('query_equipemnt_xh', {
          })(<Select
            style={{ width: 200 }}
            placeholder="请选择"
          >
            <Option value="cc80">8s</Option>
            <Option value="cc">16s</Option>
            <Option value="cc">16c</Option>
            <Option value="cc">服务器</Option>
        </Select>)}
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
      equipmentType: { data },
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
        dataIndex: 'equipment_type_id',
        key:'equipment_type_id',
      },
      {
        title: '设备名称',
        dataIndex: 'equipment_name',
        key:'equipment_name',
      },
      {
        title: '设备类型',
        dataIndex: 'equipment_type',
        key: 'equipment_type',
      },
      {
        title: '设备品牌',
        dataIndex: 'equipment_brand',
        key: 'equipment_brand',
      },
      {
        title: '备注信息',
        dataIndex: 'note',
        key:'note',
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
