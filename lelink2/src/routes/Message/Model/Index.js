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
  InputNumber
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { common_status, common_status_option, badge_status_map,variable_type_option, variable_type} from '../../../utils/status';

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
const variableTypeOptions = variable_type_option.map( item => {
  return <Option key={item.key}>{item.name}</Option>;
});

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle, handleModalVariableVisible} = props;
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };

  const addVariable = () => {
    handleModalVariableVisible(true);
  }

  // let dataSource = [];
  // let num = 1;
  // templateContent.forEach((element, key) => {

  //   if(element.var){
  //     const varElement = {key: key, sort: num, type: '变量', flag: 'var', content: "变量类型：" + variable_type[element.var.type] + "，    变量长度：" + element.var.length};
  //     dataSource.push(varElement);
  //   }

  //   if(element.content){
  //     const textElement = {key: key, sort: num, type: '文本', flag: 'text', content: element.content};
  //     dataSource.push(textElement);
  //   }

  //   if(element.voice){
  //     const voiceElement = {key: key, sort: num, type: '语音', flag: 'voice', content: element.voice.name, tmpFileName: element.voice.tmpFilePath};
  //     dataSource.push(voiceElement);
  //   }

  //   num++;

  // });


  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

     <Row gutter={6}>
        <Col span={15}>
            <Form>

              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板名称">
                {form.getFieldDecorator('name', {
                  initialValue: formAddValues.name,
                  validateFirst: true,
                  rules: [{ required: true, whitespace:true, message: '请输入模板名称' }],
                })(<Input placeholder="请输入" />)}
              </FormItem>

              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
                {form.getFieldDecorator('status', {
                  initialValue: formAddValues.status,
                  validateFirst: true,
                  rules: [{ required: true, whitespace:true, message: '请选择状态' }],
                })(<Select
                  size="default"
                >
                {statusOptions}
                </Select>)}
              </FormItem>
             

              <Row  type="flex" justify="center" >
                <Col span={6}>
                <FormItem>
                  <Button type="dashed"  onClick={() => addVariable()} >
                    <Icon type="plus" /> 添加变量
                  </Button>
                </FormItem>
                </Col>

                {/* <Col span={6}>
                <FormItem>
                  <Button type="dashed"  >
                    <Icon type="plus" /> 添加文本
                  </Button>
                </FormItem>
                </Col> */}

                {/* <Col span={6}>
                <FormItem>
                  <Upload {...uploadVoiceProps}>
                    <Button type="dashed">
                      <Icon type="plus" /> 添加语音
                    </Button>
                  </Upload>
                </FormItem>
                </Col> */}
              </Row>


              <Row>
                <Col>
                <Table
                  // rowKey={"sort"}
                  bordered
                  // dataSource={dataSource}
                  // columns={columns}
                  // onChange={() => templateContentChange()}
                />
                </Col>
              </Row>

            </Form>

        </Col>

        <Col span={9}>
          {/* <Card title="添加语音" bordered={false} type="inner" style={{ background: '#faebcc' }}>
            <p>1、语音文件仅支持.wav格式（编码为8k、16位）；单条语音最大支持5M；文件名称使用英文和数字。</p>
          </Card> */}

          <Card title="添加变量" bordered={false} type="inner" style={{ background: '#faebcc', marginTop: "10px" }}>
            <p>1、输入内容为变量长度限制，仅能输入数字（正整数）；</p>
            <p>2、若变量内容为中文，请注意字符编码，1个中文字=3字节；</p>
            <p>3、所传输变量不可超过该长度限制，如超过将发送失败。</p>
          </Card>
        </Col>

      </Row>
    </Modal>
  );
});


const CreateVariableForm = Form.create()(props => {
  const { form, handleModalVariableVisible, handleSubmitVariable, modalVariableVisible, modalVariableTitle, formVariableValues } = props;
  
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleSubmitVariable(fieldsValue, form);
    });
  };


  return (
    <Modal
      title={modalVariableTitle}
      visible={modalVariableVisible}
      onOk={okHandle}
      onCancel={() => handleModalVariableVisible(false)}
    >

      <Form>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
          {/* {form.getFieldDecorator('status', {
            initialValue: formVariableValues.status,
            validateFirst: true,
            rules: [{ required: true, whitespace:true, message: '请选择变量类型' }],
          })(<Select
            size="default"
          >
          {variableTypeOptions}
          </Select>)} */}
          <Select
            size="default"
          >
          {variableTypeOptions}
          </Select>
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="变量长度">
          {/* {form.getFieldDecorator('length', {
            initialValue: formVariableValues.length,
            validateFirst: true,
            rules: [{ required: true,  message: '请输入变量长度' }],
          })(<InputNumber min={0} max={100} precision={0}/>)} */}
          <InputNumber min={0} max={100} precision={0}/>
        </FormItem>

      </Form>

    </Modal>
  );
});

//表单



@connect(({ model, loading }) => ({
  model,
  loading: loading.models.model,
}))


@Form.create()
export default class ModelList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新增模板',
    expandForm: false,
    modalVariableVisible: false,

    selectedRows: [],

    formAddValues: {
      wechat_template_id: '',
      code: '',
      content: '',
      status: 'open',
      // server_api: '',
      // note: '',
     
    },
    formQueryValues: {},
  };

  

  componentDidMount() {
    const { dispatch } = this.props;

    //获取数据
    dispatch({
      type: 'model/fetchModel',
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
      type: 'model/fetchModel',
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
      type: 'model/fetchModel',
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


  handleModalVariableVisible = flag => {
    this.setState({
      modalVariableVisible: !!flag,
    });

    this.setState({
      modalVariableTitle: '新增变量',
    });

  };

  handleSubmitVariable = (fields, form) => {

    const varField = {
      var: {
        type: fields.type,
        length: fields.length
      }
    }

    const  content = this.state.templateContent

    content.push(varField);

    this.setState({
      templateContent: content,
      modalVariableVisible: false,
    });

    form.resetFields();

  };


  //批量删除
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;


    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'model/fetchModel',
          payload: {
            wechat_template_ids: selectedRows.map(row => row.wechat_template_id),
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
      type: 'model/fetchModel',
      payload: {
        wechat_template_ids: [text.wechat_template_id],
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
      wechat_template_id: text.wechat_template_id,
      code: text.code,
      content: text.content,
      status: text.status,
    };

    this.setState({
      modalTitle: '编辑模板',
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
        type: 'model/fetchModel',
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
      wechat_template_id: '',
      code: '',
      content: '',
      note: '',
      status: 'open',
    };

    this.setState({
      modalTitle: '新增模板',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

  };


  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch} = this.props;

    let params = {
      wechat_template_id: this.state.formAddValues.wechat_template_id,
      code: fields.code,
      content: fields.content,
      // server_api: fields.server_api,
      // note: fields.note,
      status: fields.status,
    };


    dispatch({
      type: 'model/addModel',
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
            <FormItem label="模板标识">
            {form.getFieldDecorator('code', {
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
      model: { data },
      loading,
    } = this.props;

    const {modalVariableVisible} = this.state;

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
        title: '序号',
        dataIndex: 'sort',
        key:'sort',
      },
      {
        title: '模板标识',
        dataIndex: 'code',
        key:'code',
      },
      {
        title: '模板内容',
        dataIndex: 'content',
        key: 'content',
        render(text, record) {
              return <Tooltip placement="top" title={text} >
                         <span className={styles.note}>{text}</span>
                     </Tooltip>
        }
      },
      
  
      // {
      //   title: '备注信息',
      //   dataIndex: 'note',
      //   render(text, record) {
      //     return <Tooltip placement="top" title='备注信息' >
      //                <span style={Style}>备注信息</span>
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
      handleModalVariableVisible: this.handleModalVariableVisible,
    };

    const parentVariableMethods = {
      handleModalVariableVisible: this.handleModalVariableVisible,
      handleSubmitVariable: this.handleSubmitVariable
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
               新建模板
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
              rowKey={'wechat_template_id'}
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
        <CreateVariableForm {...parentVariableMethods} modalVariableVisible={modalVariableVisible} />
      </PageHeaderLayout>
    );
  }
}
