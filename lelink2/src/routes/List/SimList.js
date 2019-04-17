import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
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
  Table,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';
const DropOption = ({ onMenuClick, menuOptions = [], buttonStyle, dropdownProps }) => {
  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)
  return (<Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <Button style={{ border: 'none', ...buttonStyle }}>
      <Icon style={{ marginRight: 2 }} type="bars" />
      <Icon type="down" />
    </Button>
  </Dropdown>)
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
}

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const modalStyle = {
    display: " inline-flex "
  }
  return (
    <Modal
      title="添加SIM卡"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}   
  >   
    <FormItem labelCol={{ span: 10}} wrapperCol={{ span: 14}} style={modalStyle}   label="ICCID">
    <Input placeholder="ICCID" />
    </FormItem>
    <FormItem labelCol={{ span: 10}} wrapperCol={{ span: 14 }} style={modalStyle}   label="设备ID">
    <Input placeholder="设备ID" />
    </FormItem>
    <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="设备名称">
    <Input placeholder="设备名称" />
    </FormItem>
    <FormItem labelCol={{ span: 10}} wrapperCol={{ span: 14 }} style={modalStyle}  label="设备端口">
    <Input placeholder="设备端口" />
    </FormItem>
    <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="组ID">
    <Input placeholder="组ID" />
    </FormItem>
    <FormItem labelCol={{ span: 10}} wrapperCol={{ span: 14 }}  style={modalStyle}  label="组名">
    <Input placeholder="组名" />
    </FormItem>
    <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="其他">
    <Input placeholder="其他" />
    </FormItem>
    {/* <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}  label="服务器类型 ">          
  <Select
    // showSearch
    style={{ width: 150 }}
    placeholder="请选择"
    // optionFilterProp="children"
    // onChange={handleChange}
    // onFocus={handleFocus}
    // onBlur={handleBlur}
    // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
    <Option value="cc80">cc80</Option>
    <Option value="cc">cc</Option>
    <Option value="cc01">cc01</Option>
    <Option value="cc02">cc02</Option>
    <Option value="cc03">cc03</Option>
    <Option value="本地服务器">本地服务器</Option>
  </Select>      
    </Form.Item> */}
    </Modal>
  );
});



// const CreateEditForm = Form.create()(props => {
//   const { modalEditVisible, form, handleEitd, handleEditModalVisible } = props;
//   const okHandle = () => {
//     form.validateFields((err, fieldsValue) => {
//       if (err) return;
//       form.resetFields();
//       handleEitd(fieldsValue);
//     });
//   };
//   const modalStyle = {
//     display: " inline-flex "
//   }
//   return (
//     <Modal
//       title="编辑客户"
//       visible={modalEditVisible}
//       onOk={okHandle}
//       onCancel={() => handleEditModalVisible()}   
//   >   
//     <FormItem labelCol={{ span: 10}} wrapperCol={{ span: 14}} style={modalStyle}   label="客户名称">
//     <Input placeholder="客户名称" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10}} wrapperCol={{ span: 14 }} style={modalStyle}   label="客户简称">
//     <Input placeholder="客户简称" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="归属">
//     <Input placeholder="归属" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10}} wrapperCol={{ span: 14 }} style={modalStyle}  label="公司代码">
//     <Input placeholder="公司代码" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="是否锁定">
//     <Input placeholder="是否锁定" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10}} wrapperCol={{ span: 14 }}  style={modalStyle}  label="联系电话">
//     <Input placeholder="联系电话" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="联系QQ">
//     <Input placeholder="联系QQ" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}   label="联系微信">
//     <Input placeholder="联系微信" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="联系邮箱">
//     <Input placeholder="联系邮箱" />
//     </FormItem>
//     <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}  label="服务器类型 ">          
//   <Select
//     // showSearch
//     style={{ width: 150 }}
//     placeholder="请选择"
//     // optionFilterProp="children"
//     // onChange={handleChange}
//     // onFocus={handleFocus}
//     // onBlur={handleBlur}
//     // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//   >
//     <Option value="cc80">cc80</Option>
//     <Option value="cc">cc</Option>
//     <Option value="cc01">cc01</Option>
//     <Option value="cc02">cc02</Option>
//     <Option value="cc03">cc03</Option>
//     <Option value="本地服务器">本地服务器</Option>
//   </Select>      
//     </Form.Item>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}  label="创建时间">
//     <Input placeholder="创建时间" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}   label="账户名称">
//     <Input placeholder="账户名称" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}   label="坐席数量">
//     <Input placeholder="坐席数量" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}   label="SIP起始分机">
//     <Input placeholder="SIP起始分机" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span:14 }} style={modalStyle}   label="SIP结束分机">
//     <Input placeholder="SIP结束分机" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}   label="SIP密码">
//     <Input placeholder="SIP密码" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}   label="SIP外线账号">
//     <Input placeholder="SIP外线账号" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}   label="SIP外线密码">
//     <Input placeholder="SIP外线密码" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="外线WEB登录密码">
//     <Input placeholder="外线WEB登录密码" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="管理员用户名">
//     <Input placeholder="管理员用户名" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="管理员密码">
//     <Input placeholder="管理员密码" />
//     </FormItem>
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="操作员用户名">
//     <Input placeholder="操作员用户名" />
//     </FormItem> 
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="操作员密码">
//     <Input placeholder="操作员密码" />
//     </FormItem> 
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="坐席用户名">
//     <Input placeholder="坐席用户名" />
//     </FormItem> 
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}  style={modalStyle}  label="坐席用密码">
//     <Input placeholder="坐席用密码" />
//     </FormItem> 
//     <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} style={modalStyle}   label="客户备注">
//     <Input placeholder="客户备注" />
//     </FormItem>  
//     </Modal>
//   );
// });

// const CreateSynchronizationForm = Form.create()(props => {
//   const { modalSynchronizationVisible, form, handleSynchronization, handleSynchronizationModalVisible } = props;
//   const okHandle = () => {
//     form.validateFields((err, fieldsValue) => {
//       if (err) return;
//       form.resetFields();
//       handleSynchronization(fieldsValue);
//     });
//   };
//   return (
//     <Modal
//       title="信息"
//       visible={modalSynchronizationVisible}
//       onOk={okHandle}
//       onCancel={() => handleSynchronizationModalVisible()}   
//   >   
//      <div>同步成功！<span>余额为210</span></div>
//     </Modal>
//   );
// });

//创建查看弹框
// const CreateSeeForm = Form.create()(props => {
//   const { modalSeeVisible, form, handleSee, handleSeeModalVisible } = props;
//   const okHandle = () => {
//     form.validateFields((err, fieldsValue) => {
//       if (err) return;
//       form.resetFields();
//       handleSee(fieldsValue);
//     });
//   };
//   const columns = [{
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: text => <a href="javascript:;">{text}</a>,
//   }, {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   }, {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   }, {
//     title: 'Action',
//     key: 'action',
//     render: (text, record) => (
//       <span>
//         <a href="javascript:;">Delete</a>   
//       </span>
//     ),
//   }];
  
//   const data = [{
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   }, {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   }];
//   return (
//     <Modal
//       title="查看信息"
//       visible={modalSeeVisible}
//       onOk={okHandle}
//       onCancel={() => handleSeeModalVisible()}   
//   >   
//      <Row gutter={24}>
//           <Col xl={16} lg={24} md={24} sm={24} xs={24}>
//             <Card
//               className={styles.projectList}
//               style={{ marginBottom: 24 }}
//               title="基本信息"
//               bordered={false}
//               // extra={<Link to="/">全部项目</Link>}
//               // loading={projectLoading}
//               bodyStyle={{ padding: 0 }}
//             >              
//              <div className={styles.essentialInformation}>
//                 <ul>
//                   <li>客户账号：银好兴1</li>
//                   <li>客户简称：Yhx</li>
//                   <li>公司代码：0268</li>
//                   <li>联系电话：</li>
//                   <li>联系微信：</li>
//                   <li>联系QQ：</li>
//                   <li>联系邮箱：</li>
//                 </ul>
//              </div>                  
//             <div className={styles.remarks}>备注信息测试客户名称“银浩兴”</div>
//             </Card>
//             <Card
//               bodyStyle={{ padding: 0 }}
//               bordered={false}
//               className={styles.activeCard}
//               title="账户信息"
//               // loading={activitiesLoading}
//             >
//               <div className={styles.essentialInformation}>
//                 <ul>
//                   <li>客户账号：银好兴1</li>
//                   <li>客户简称：Yhx</li>
//                   <li>公司代码：0268</li>
//                   <li>联系电话：</li>
//                   <li>联系微信：</li>
//                   <li>联系QQ：</li>
//                   <li>联系邮箱：</li>
//                 </ul>
//              </div>   
//             </Card>
//           </Col>
//           <Col xl={8} lg={24} md={24} sm={24} xs={24}>
//             <Card
//               style={{ marginBottom: 24 }}
//               title="跟进记录"
//               bordered={false}
//               bodyStyle={{ padding: 0 }}
//             >
//               <Table columns={columns} dataSource={data} 
//               pagination={false} />
//             </Card>
//             <Card
//               style={{ marginBottom: 24 }}
//               bordered={false}
//               title="设备列表"
//               // loading={radarData.length === 0}
//             >
//               <Table columns={columns} dataSource={data} 
//               pagination={false} />
//             </Card>
//           </Col>
//         </Row>
//     </Modal>
//   );
// });

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    // modalEditVisible: false,
    // modalSeeVisible: false,
    // modalSynchronizationVisible: false,
    // expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };
  //重置表格
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

 

//   handleEditModalVisble = () => {
//     this.setState({
//       modalEditVisible: true,
//     })
//   }

//   handleSeeModalVisble = () => {
//     this.setState({
//       modalSeeVisible: true,
//     })
//   }
  
//   handleSynchronizationModalVisible = () => {
//     this.setState({
//       modalSynchronizationVisible: true,
//     })
//   }

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;
   
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
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

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };
//
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  //查看modal状态开关
//   handleSeeModalVisible = flag => {
//     this.setState({
//       modalSeeVisible: !!flag,
//     });
//   };


//   handleEditModalVisible = flag => {
//     this.setState({
//       modalEditVisible: !!flag,
//     });
//   };
//   handleSynchronizationModalVisible  = flag => {
//     this.setState({
//       modalSynchronizationVisible: !!flag,
//     });
//   };
//添加/修改/同步 成功
  handleAdd = fields => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
      },
    });
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };
//   handleEitd = fields => {
//     this.props.dispatch({
//       type: 'rule/eitd',
//       payload: {
//         description: fields.desc,
//       },
//     });
//     message.success('修改成功');
//     this.setState({
//       modalEditVisible: false,
//     });
//   };

 //查看完成后
//   handleSee = () => {
//     // this.props.dispatch({
//     //   type: 'rule/eitd',
//     //   payload: {
//     //     description: fields.desc,
//     //   },
//     // });
//     message.success('查看完成');
//     this.setState({
//       modalVisible: false,
//     });
//   };



//   handleSynchronization = fields => {
//     this.props.dispatch({
//       type: 'rule/synchronization',
//       payload: {
//         description: fields.desc,
//       },
//     });
//     message.success('同步成功');
//     this.setState({
//       modalSynchronizationVisible: false,
//     });
//   };
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/* <Col >
            <FormItem >                                          
                {getFieldDecorator('status')(                
                  <Select style={{ width: 150 }} placeholder="使用状态 ">
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                  </Select>                  
                )}          
            </FormItem>
          </Col> */}
          <Col >
            <FormItem style={{ marginLeft: 8 }} >
              {getFieldDecorator('no')(<Input placeholder="设备名称" />)}
            </FormItem>
          </Col>
          <Col >
            <FormItem style={{ marginLeft: 8 }}>
              {getFieldDecorator('no')(<Input placeholder="设备ID" />)}
            </FormItem>
          </Col>
          <Col >
            <span className={styles.submitButtons}>
              <Button style={{ marginLeft: 8 }} htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置条件
              </Button>
              {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows, modalVisible,  modalSeeVisible, modalEditVisible, modalSynchronizationVisible} = this.state;
    const handleMenuClick = (record, e) => {
      if (e.key === '1') {
        // this.handleEditModalVisble(record);
      } else if (e.key === '2') {
        // this.handleSeeModalVisble(record);
      } else if (e.key === '3') {
        // this.props.history.push("./card-list")
      } else if (e.key === "4") {
        // this.props.history.push("./basic-list")
      } else if (e.key === "5") {
        this.handleSynchronizationModalVisible(record);
      }
    };
  
    const columns = [
    //   {
    //     title: '操作',
    //     key: 'operation',
    //     width: 100,
    //     render: (text, record) => {
    //       return <DropOption onMenuClick={e => handleMenuClick(record, e)}
    //                          menuOptions={[{
    //                           key: '1',
    //                           name: '编辑'
    //                         }, {
    //                           key: '2',
    //                           name: '查看'
    //                         },{
    //                           key: '3',
    //                           name: '跟进记录'
    //                         },
    //                         {
    //                           key: '4',
    //                           name: '设备管理'
    //                         },
    //                         {
    //                           key: '5',
    //                           name: '同步余额'
    //                         },
    //                         {
    //                           key: '6',
    //                           name: '短信'
    //                         }
    //                       ]}/>;
    //     },
    //   },
      {
        title: 'ICCID',
        dataIndex: 'id',
      },
      {
        title: '设备ID',
        dataIndex: 'owner',
        // sorter: true,
        // align: 'right',
        //数据动态渲染 
        render: val => `${val}`,
        // mark to display a total number
        needTotal: true,
      },
      {
        title: '设备名称',
         dataIndex: 'callNo',
         key: 'callNo',
      },
      {
        title: '设备端口 ',
        dataIndex: 'description',
        key: 'description',
      },
    //   {
    //     title: '状态',
    //     dataIndex: 'status',
    //     key:'status',
    //     filters: [
    //       {
    //         text: status[0],
    //         value: 0,
    //       },
    //       {
    //         text: status[1],
    //         value: 1,
    //       },
    //       {
    //         text: status[2],
    //         value: 2,
    //       },
    //       {
    //         text: status[3],
    //         value: 3,
    //       },
    //     ],
    //     onFilter: (value, record) => record.status.toString() === value,
    //     render(val) {
    //       return <Badge status={statusMap[val]} text={status[val]} />;
    //     },
    //   },
      {
        title: '组ID ',
        dataIndex: 'callNo',
        key: 'callNo1',
      },
      {
        title: '组名',
        dataIndex: 'description',
        key: 'callNo2',
      },
      {
        title: '其他',
        dataIndex: 'description',
        key: 'callNo3',
      },
    //   {
    //     title: 'SIP外线',
    //     dataIndex: 'description',
    //     key: 'callNo4',
    //   },
    //   {
    //     title: '管理员用户名',
    //     dataIndex: 'owner',
    //     key: 'callNo5',
    //   },
    //   {
    //     title: '管理员密码',
    //     dataIndex: 'description',
    //     key: 'callNo6',
    //   },
    //   {
    //     title: '操作员用户名',
    //     dataIndex: 'owner',
    //     key: 'callNo7',
    //   },
    //   {
    //     title: '账户余额',
    //     dataIndex: 'callNo',
    //     key: 'callNo8',
    //     sorter: true,
    //     align: 'right',
    //     render: val => `${val}`,
    //     // mark to display a total number
    //     needTotal: true,
    //   },
    //   {
    //     title: '创建时间',
    //     dataIndex: 'createdAt',
    //     key: 'callNo9',
    //     sorter: true,
    //     render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    //   },
    //   {
    //     title: '更新时间',
    //     dataIndex: 'updatedAt',
    //     key: 'callNo10',
    //     sorter: true,
    //     render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    //   },
    //   {
    //     title: '备注 ',
    //     dataIndex: 'status',
    //     key: 'status1',
    //   },
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

    //查看 
    // const parentSeeMethods = {
    //   handleSee: this.handleSee,
    //   handleSeeModalVisible: this.handleSeeModalVisible,
    // };

    // const parentEditMethods = {
    //   handleEitd: this.handleEitd,
    //   handleEditModalVisible: this.handleEditModalVisible,
    // };
    // const parentSynchronizationMethods = {
    //   handleSynchronization: this.handleSynchronization,
    //   handleSynchronizationModalVisible: this.handleSynchronizationModalVisible,
    // };

    return (
      <PageHeaderLayout title="SIM卡信息管理 ">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
             <span>SIM卡信息列表</span>
             {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)} >
                添加SIM卡
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {/* <CreateSeeForm {...parentSeeMethods} modalSeeVisible={modalSeeVisible} /> */}
        {/* <CreateEditForm {...parentEditMethods} modalEditVisible={modalEditVisible} /> */}
        {/* <CreateSynchronizationForm {...parentSynchronizationMethods} modalSynchronizationVisible={modalSynchronizationVisible} /> */}
      </PageHeaderLayout>
    );
  }
}
