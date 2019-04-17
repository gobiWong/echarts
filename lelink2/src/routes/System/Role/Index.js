import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Button,
  Table,
  DatePicker,
  Popconfirm,
  Modal,
  Divider,
  Checkbox,
} from 'antd';
const { RangePicker} = DatePicker;

const CheckboxGroup = Checkbox.Group;


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import StandardTable from '../../../components/RoleTable';
import styles from './Index.less';

const FormItem = Form.Item;

const plainOptions = [{
  key:'1',
  name: '客户管理',
  children:[
    {
      key: '1',
      name: '客户资料',
      children: [
       {
        key: '1',
        name: '新增',
       },
       {
        key: '2',
        name: '删除',
       },
       {
        key: '3',
        name: '修改',
       },
       {
        key: '4',
        name: '查询',
       }
      ]
    },
    {
      key: '2',
      name: '客户跟进',
      children: [
        {
         key: '1',
         name: '新增',
        },
        {
         key: '2',
         name: '删除',
        },
        {
         key: '3',
         name: '修改',
        },
        {
         key: '4',
         name: '查询',
        }
       ]
    },
  ]
}];


// const defaultCheckedList = ['客户管理'];

const secondPlainOptions = ['客户资料','客户跟进'];
// const defaultSecondCheckedList = ['客户资料'];

const operationPlainOptions = ['新增','删除','编辑','查询'];
// const defaultoperationCheckedList = ['查询'];



//表单
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle } = props;
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
          {form.getFieldDecorator('role_name', {
            initialValue: formAddValues.role_name,
            validateFirst: true,
            // rules: [{ required: true, whitespace:true, message: '请输入记录人' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

      </Form>
    </Modal>
  );
});

const CreateConfigurationMenu = Form.create()(props => {
  const {
     modalConfigurationMenuVisible,
     form, handleConfigurationMenuAdd,
     handleConfigurationMenuModalVisible,indeterminate,
     checkedList,onfirstMenuchange,checkAll,
     onCheckAllChange,
     operationCheckAll,
     onSecondCheckAllChange,
     secondCheckAll,
     onOperationCheckAllChange,
     secondCheckedList,onSecondMenuchange,
     operationCheckedList,onOperationchange
      } = props;
       
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleConfigurationMenuAdd(fieldsValue, form);
    });
  };


  return (
    <Modal
      title='配置菜单'
      visible={modalConfigurationMenuVisible}
      onOk={okHandle}
      onCancel={() => handleConfigurationMenuModalVisible()}
    >
      <Form>
      <Row gutter={24}>
          <Col xl={8} >
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                一级菜单
            </div>
            <br />
            {
              plainOptions.map((item) => {
              return  ( <Checkbox  key={item.key}> {item.name}</Checkbox>)
            })
            } 
           
          </Col>
          <Col xl={8} >
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onSecondCheckAllChange}
                checked={secondCheckAll}
              >
                二级菜单
              </Checkbox>
            </div>
            <br />
            {
              plainOptions[0].children.map((item) => {
              return  ( <CheckboxGroup  key={item.key} className={styles.second}><Checkbox > {item.name} </Checkbox> </CheckboxGroup>)
            })
            } 
          
          </Col>
          <Col xl={8} >
          <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onOperationCheckAllChange}
                checked={operationCheckAll}
              >
               操作
              </Checkbox>
            </div>
            <br />
            {
              plainOptions[0].children[0].children.map((item) => {
              return  ( <CheckboxGroup  key={item.key} className={styles.second}><Checkbox> {item.name} </Checkbox> </CheckboxGroup>)
            })
            } 
           
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});



@connect(({ role, loading }) => ({
  role,
  loading: loading.models.role,
}))


@Form.create()
export default class RoleList extends PureComponent {

  state = {
    modalVisible: false,
    modalTitle: '新增角色',
    expandForm: false,
    modalConfigurationMenuVisible : false,
    selectedRows: [],

    formAddValues: {
      role_id: '',
      role_name: '',
    },
    formQueryValues: {},

    checkedList: [],
    secondCheckedList: [],
    operationCheckedList: [],
    indeterminate: true,
    checkAll: false,
    secondCheckAll:false,
    operationCheckAll:false,
  };

  

  componentDidMount() {
    const { dispatch } = this.props;

    //获取数据
    dispatch({
      type: 'role/fetch',
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


// 一级菜单点击
  onfirstMenuchange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }

// 二级菜单点击
  onSecondMenuchange = (secondCheckedList) => {
    this.setState({
      secondCheckedList,
      indeterminate: !!secondCheckedList.length && (secondCheckedList.length < secondPlainOptions.length),
      secondCheckAll: secondCheckedList.length === secondPlainOptions.length,
    });
  }

  // 操作点击
  onOperationchange = (operationCheckedList) => {
    this.setState({
      operationCheckedList,
      indeterminate: !!operationCheckedList.length && (operationCheckedList.length < operationPlainOptions.length),
      operationCheckAll: operationCheckedList.length === operationPlainOptions.length,
    });
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }

  onSecondCheckAllChange = (e) => {
    this.setState({
      secondCheckedList: e.target.checked ? secondPlainOptions : [],
      indeterminate: false,
      secondCheckAll: e.target.checked,
    });
  }

  onOperationCheckAllChange = (e) => {
    this.setState({
      operationCheckedList: e.target.checked ? operationPlainOptions : [],
      indeterminate: false,
      operationCheckAll: e.target.checked,
    });
  }



  //列表数据改变时
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
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
      type: 'role/fetchRole',
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
      type: 'role/remove',
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

  handleConfigurationMenuModalVisible  = flag => {
    this.setState({
      modalConfigurationMenuVisible: !!flag,
    });
  };


  //编辑
  handleEdit = (e, text, record) => {

    const formValuesArr = {
      role_id: text.role_id,
      role_name: text.role_name,
    };
    const { dispatch } = this.props

    this.setState({
      modalTitle: '编辑',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

    this.setState({
      modalVisible: true,
    });
  };

  handleConfigurationMenu = () => {
    this.setState({
      modalConfigurationMenuVisible: true,
    });
  }

  handleConfigurationMenuAdd = (fields, form) => {
    this.setState({
      modalConfigurationMenuVisible: false,
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
      console.log(fieldsValue);

      const values = {
        ...fieldsValue,
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'role/fetch',
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
      role_id: '',
      role_name: '',
    };

    this.setState({
      modalTitle: '新增角色',
    });

    this.setState({
      formAddValues: formValuesArr,
    });

  };


  //新增数据
  handleAdd = (fields, form) => {
    const { dispatch} = this.props;
    let params = {
      role_id: fields.role_id,
      role_name: fields.role_name,
      // filters: this.state.formQueryValues
    };
    dispatch({
      type: 'role/add',
      payload: params,
      callback: (result) => {
        if(result == 'success'){
        }
      },
    });
    form.resetFields();
    this.setState({
      modalVisible: false,
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
          <FormItem label="角色名称">
            {getFieldDecorator('role_name',{
              initialValue: this.state.formQueryValues.role_name,
            })(<Input placeholder="请输入" />)}
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

  //渲染查询表单
  renderForm() {
    return this.renderSimpleForm()
  }


  render() {

    const {
      role: { data },
      loading,
    } = this.props;

   const columns = [
    {
      title: '序号',
      dataIndex: 'role_id',
      key: 'role_id',
    },
    {
      title: '角色名称',
      dataIndex: 'role_name',
      key: 'role_name',
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
        width: 140,
        fixed: 'right',
        render: (text, record, index) => (
          <Fragment>
            <a href="javascript:;" onClick={this.handleConfigurationMenu.bind(this, text, record)} >配置菜单</a>
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

    const { selectedRows,modalVisible,formAddValues,modalTitle,modalConfigurationMenuVisible,checkedList,checkAll,secondCheckedList,operationCheckedList,secondCheckAll,operationCheckAll 
      } = this.state;

  

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const parentConfigurationMenuMethods = {
      handleConfigurationMenuAdd: this.handleConfigurationMenuAdd,
      handleConfigurationMenuModalVisible: this.handleConfigurationMenuModalVisible,
      onCheckAllChange:this.onCheckAllChange,
      onSecondCheckAllChange:this.onSecondCheckAllChange,
      onOperationCheckAllChange:this.onOperationCheckAllChange,
      onfirstMenuchange:this.onfirstMenuchange,
      onSecondMenuchange:this.onSecondMenuchange,
      onOperationchange:this.onOperationchange,
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle}  />
        <CreateConfigurationMenu {...parentConfigurationMenuMethods} modalConfigurationMenuVisible ={modalConfigurationMenuVisible } formAddValues={formAddValues} checkedList={checkedList} secondCheckedList={secondCheckedList} operationCheckedList={operationCheckedList}   checkAll={checkAll} secondCheckAll={secondCheckAll} operationCheckAll={operationCheckAll}/>
      </PageHeaderLayout>
    );
  }
}
