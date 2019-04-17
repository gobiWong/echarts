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
  Radio,
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

const RadioGroup = Radio.Group;

// import ManagementTable from 'components/ManagementTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { common_status, common_status_option, badge_status_map,fullowup_type,fullowup_type_option } from '../../utils/status';
// import { regex } from '../../../utils/regex';
// import { table_fields } from '../../../utils/table';
import { down_data_template } from '../../utils/common';

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
  console.log(props)
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle, packageTypes, jobNumbers } = props;
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };

  const fullowupTypeOption = fullowup_type_option.map( item => {
    return {label: item.name, value: item.key};
  });


  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <Form>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="平台名称">
          {form.getFieldDecorator('record_user_id', {
            initialValue: formAddValues.record_user_id,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入姓名' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Web登录地址">
      {form.getFieldDecorator('record_user_id', {
            initialValue: formAddValues.record_user_id,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入姓名' }],
          })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="	Api地址">
     
            {form.getFieldDecorator('fullowup_type', {
              initialValue: formAddValues.fullowup_type,
              validateFirst: true,
              rules: [{ required: true, message: 'Api地址' }],
            })(<Input placeholder="请输入" />)}
        
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('record_user_id', {
            initialValue: formAddValues.record_user_id,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入' }],
          })(<TextArea rows={4} />)}
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
      record_user_id: '',
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
      // statistics_id: text.statistics_id,
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
      // statistics: { data },
    } = this.props;

    // const packageTypeOptions = data.packageTypes.map( item => {
    //   return <Option key={item.package_type_id} >{item.package_name}</Option>;
    // });


    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">

          <Col md={8} sm={24}>
            <FormItem label="平台名称">
            {form.getFieldDecorator('record_user_id', {
            // initialValue: formAddValues.record_user_id,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入姓名' }],
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

    const {
      // statistics: { data },
    } = this.props;

    // const packageTypeOptions = data.packageTypes.map( item => {
    //   return <Option key={item.package_type_id} >{item.package_name}</Option>;
    // });

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">
          <Col md={8} sm={24}>
            <FormItem label="平台名称">
            {form.getFieldDecorator('record_user_id', {
            // initialValue: formAddValues.record_user_id,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入姓名' }],
          })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="创建时间">
            {form.getFieldDecorator('record_user_id', {
            // initialValue: formAddValues.record_user_id,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请输入姓名' }],
          })(<Input placeholder="请输入" />)}
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
      // statistics: { data },
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

    const data = [
      {
        key: 1,
        server_name: `cc80`,
        web_api:'http://cc80.illcc.cc:8188',
        server_api: `12368`,
        is_api:'是',
        note:'好',
      }
    ];
    
  
 
     
    

   const columns = [
      {
        title: '平台名称',
        dataIndex: 'server_name',
        width: '15%',
        // editable: true,
      },
      {
        title: 'Web登录地址',
        dataIndex: 'web_api',
        key: 'web_api',
        // sorter: true,
       
        width: '25%',
        // editable: true,
      },
      
      {
        title: 'Api地址',
        dataIndex: 'server_api',
        width: '15%',
        // editable: true,
      },
      {
        title: '备注信息',
        dataIndex: 'note',
        width: '15%',
        // editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        // fixed: 'right',
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

    const { selectedRows, modalVisible, formAddValues, modalTitle} = this.state;

    // const packageTypeFilter = data.packageTypes.map( item => {
    //   return {text: item.package_name, value: item.package_type_id};
    // });







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
            
              {/* <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 批量上传
                </Button>
              </Upload> */}
              {/* <Button onClick={this.handleDownload} >
                  <Icon type="download" /> 模板下载
              </Button> */}
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
              rowSelection={rowSelection}
              loading={loading}
              dataSource={data}
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
