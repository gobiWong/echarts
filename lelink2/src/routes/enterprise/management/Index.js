import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Tooltip,
  Icon,
  Button,
  Dropdown,
  Menu,
  Checkbox,
  InputNumber,
  DatePicker,
  Popconfirm,
  Modal,
  message,
  Table,
  Radio,
  Badge,
  Tabs,
  Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

// import ManagementTable from 'components/ManagementTable';

// import * as copy from 'copy-to-clipboard';
import Send from './sendMessage';
import Account from './Account';
import TableForm from './TableForm';
import UnifiedForm from './UnifiedForm';
import ServerForm from './ServerForm';
import MessageForm from './MessageForm';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { companys_status, companys_status_option,send_msg_status,send_msg_status_option, badge_status_map } from '../../../utils/status';


import styles from './Index.less';

const { TextArea } = Input;



const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


// 构造状态option
const statusOptions = companys_status_option.map( item => {
  return <Option key={item.key}>{item.name}</Option>;
});
const sendMsgStatusOptions = send_msg_status_option.map( item => {
  return <Option key={item.key}>{item.name}</Option>;
});

const CreateSeeForm = Form.create()(props => {
  const { modalSeeVisible, form, handleSee, handleSeeModalVisible, } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSee(fieldsValue);
    });
  };


  
  const data = [
    {
      key: 1,
      record_user_id: `张三`,
      created_at:new Date(new Date().getTime()),
      updated_at:new Date(new Date().getTime()),
      record_type: `系统`,
      record_content:'备注信息'
    },
    {
      key: 2,
      record_user_id: `张三`,
      created_at:new Date(new Date().getTime()),
      updated_at:new Date(new Date().getTime()),
      record_type: `系统`,
      record_content:'备注信息'
    },
    {
      key: 3,
      record_user_id: `张三`,
      created_at:new Date(new Date().getTime()),
      updated_at:new Date(new Date().getTime()),
      record_type: `系统`,
      record_content:'备注信息'
    },
    {
      key: 4,
      record_user_id: `张三`,
      created_at:new Date(new Date().getTime()),
      updated_at:new Date(new Date().getTime()),
      record_type: `系统`,
      record_content:'备注信息'
    },
    {
      key: 5,
      record_user_id: `张三`,
      created_at:new Date(new Date().getTime()),
      updated_at:new Date(new Date().getTime()),
      record_type: `系统`,
      record_content:'备注信息'
    },
    {
      key: 6,
      record_user_id: `张三`,
      created_at:new Date(new Date().getTime()),
      updated_at:new Date(new Date().getTime()),
      record_type: `系统`,
      record_content:'备注信息'
    }
  ];
  
  const data1  = [
    {
        key:'1',
        equipmentList_id: '1',
        sort:'1',
        MAC_address:'公司',
        equipment_type:'卡机',
        equipment_code:'9527',
        equipment_position:'公司',
        owen:'乐联',
        owen_type:'乐联',
        equipment_use:'信贷',
        gw_IP:'192.168.88.77',
        IP_adddress:'公司',
        nw_IP:'127.0.0.1',
        note:'这是备注信息',
        created_at:'2018-09-27  09:25:00',
        updated_at:'2018-09-27  09:25:00',
    },  
]

  const columns1 = [
    
    {
      title: 'MAC地址',
      dataIndex: 'MAC_address',
      key:'MAC_address1'
    },

    {
      title: '设备类型',
      dataIndex: 'equipment_type',
      key:'equipment_type1'
    },

    {
      title: '设备编码',
      dataIndex: 'equipment_code',
      key:'equipment_code1'
    },

    {
      title: '设备位置',
      dataIndex: 'equipment_position',
      key:'equipment_position1'
    },

    {
      title: '归属企业',
      dataIndex: 'owen',
      key:'owen1'
    },

    {
      title: '设备归属类型',
      dataIndex: 'owen_type',
      key:'owen_type1'
    },

    {
      title: '设备用途',
      dataIndex: 'equipment_use',
      key:'equipment_use1'
    },

    {
      title: '公网IP',
      dataIndex: 'gw_IP',
      key:'gw_IP1'
    },

    {
      title: 'IP地区',
      dataIndex: 'IP_adddress',
      key:'IP_adddress1'
    },

    {
      title: '内网IP',
      dataIndex: 'nw_IP',
      key:'nw_IP1'
    },
         
    {
      title: '备注信息',
      dataIndex: 'note',
      key:'note2',
      fixed:'right',
      render(text, record) {
        return <Tooltip placement="top" title='备注信息' >
                   <span className={styles.note}>备注信息</span>
               </Tooltip>
       }
    }
  ]

 const columns = [
    {
      title: '添加人',
      dataIndex: 'record_user_id',
      key:'record_user_id1',
      width: '15%',
      // editable: true,
    },
    {
      title: '添加时间',
      dataIndex: 'created_at',
      key: 'created_at1',
      // sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      width: '25%',
      // editable: true,
    },

    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at1',
      // sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      width: '25%',
      // editable: true,
    },
    
    {
      title: '记录类别',
      dataIndex: 'record_type',
      key:'record_type1',
      width: '15%',
      // editable: true,
    },
    {
      title: '备注信息',
      dataIndex: 'record_content',
      key:'record_content1',
      width: '15%',
     
      // editable: true,
      render(text, record) {
        return <Tooltip placement="top" title='备注信息' >
                   <span className={styles.note}>备注信息</span>
               </Tooltip>
       }
    },
  ];

 
  const  handleClick = (e) => {
   console.log('11')
  };
        
//查看页面中复制功能

   const handleChange = (e) => {
    console.log('11')
    }

   const onCopy = (value) => {
      message.success('复制成功');
    };

    const handle =() => {
           const w = window.open('http://localhost:8000/#/enterprise/followup');
          //  w.location.href='./followup'
    }

    const goTo =() => {
      const w = window.open('http://localhost:8000/#/equipment/equipment-list');
     //  w.location.href='./followup'
}
  
  return (
    <Modal
      title="查看信息"
      visible={modalSeeVisible}
      onOk={okHandle}
      onCancel={() => handleSeeModalVisible(false)}   
  >   
     <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="基本信息"
              bordered={false}
              // extra={<Link to="/">全部项目</Link>}
              // loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >              
             <div className={styles.essentialInformation}>
                <ul>
                  <li>客户账号：银好兴1</li>
                  <li>客户简称：Yhx</li>
                  <li>公司代码：0268</li>
                  <li>联系电话：</li>
                  <li>联系微信：</li>
                  <li>联系QQ：</li>
                  <li>联系邮箱：</li>
                </ul>
             </div>                  
            <div className={styles.remarks}>备注信息测试客户名称“银浩兴”</div>
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="账户信息"
              // loading={activitiesLoading}
              // extra={<span><Button>复制</Button></span>}
            >
            <div style={{marginTop:10}}>平台登录地址 ：192.168.66.88</div>
            <Account/> 
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="跟进记录"
              bodyStyle={{ padding: 0 }}
              // extra={<Link to="./followup">详情</Link>}
              extra={<Button onClick={() => handle()}>详情</Button>}
            >
              <Table columns={columns} dataSource={data.slice(0,5)} 
              pagination={false}  />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              // bordered={false}
              title="设备列表"
              extra={<Button onClick={() => goTo()}>详情</Button>}
              // extra={<Link to="../equipment/equipment-list">详情</Link>}
              // loading={radarData.length === 0}
            >
              <Table 
                 columns={columns1} 
                 dataSource={data1.slice(0,5)} 
                 pagination={false}               
                 scroll={{ x: 1000 }} 
              />
            </Card>
          </Col>
        </Row>
    </Modal>
  );
});

//发短信

const CreateSendShortForm = Form.create()(props => {
  const { modalSendShortVisible, form, handleSendShort, handleSendShortModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSendShort(fieldsValue);
    });
  };

 
  return (
    <Modal
      title="发送信息"
      visible={modalSendShortVisible}
      onOk={okHandle}
      onCancel={() =>handleSendShortModalVisible()}   
  >   
      <TextArea placeholder="请输入" autosize  style={{marginBottom : 25}}/>

     <Send/>
    </Modal>

  );
});

//发微信

// const CreateSendWechatForm = Form.create()(props => {
//   const { modalSendWechatVisible, form, handleSendWechat, handleSendWechatModalVisible } = props;
//   const okHandle = () => {
//     form.validateFields((err, fieldsValue) => {
//       if (err) return;
//       form.resetFields();
//       handleSendWechat(fieldsValue);
//     });
//   };
//   return (
//     <Modal
//       title="发送内容"
//       visible={modalSendWechatVisible}
//       onOk={okHandle}
//       onCancel={() =>handleSendWechatModalVisible()}   
//   >   
//       <TextArea placeholder="请输入要发送得信息" autosize />
//     </Modal>
//   );
// });


// //解绑微信弹框
// const CreateUntieForm = Form.create()(props => {
//   const { modalUntieVisible, form, handleUntie, handleUntieModalVisible } = props;
//   const okHandle = () => {
//     form.validateFields((err, fieldsValue) => {
//       if (err) return;
//       form.resetFields();
//       handleUntie(fieldsValue);
//     });
//   };
//   return (
//     <Modal
//       title="解除微信绑定"
//       visible={modalUntieVisible}
//       onOk={okHandle}
//       onCancel={() =>handleUntieModalVisible()}   
//   >   
      
//       <h2>是否要解除微信绑定？</h2>
//     </Modal>
//   );
// });

//vos
const CreateVosForm = Form.create()(props => {
  const { modalVosVisible, form, handleVos, handleVosModalVisible,record } = props;
  // console.log(data);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleVos(fieldsValue);
    });
  };
  const columns = [
    {
      title: 'vos服务器',
      dataIndex: 'vos_server_id',
      key:'vos_server_id2',
      render(text, record) {
        if(typeof text == 'object' && text.constructor == Array)  {
          return   <span size="default">
                    <span>{text[0]}</span>
                    <br/>
                    <span>{text[1]}</span>
                  </span>
        }  else if ((typeof text == 'string') && text.constructor == String) {
          return <span>{text}</span>;
        }  
        return <span>{text}</span>;
       },
    },
    {
      title: 'vos账号',
      dataIndex: 'vos_account',
      key:'vos_account2',
      render(text, record) {
        if(typeof text == 'object' && text.constructor == Array)  {
          return   <span size="default">
                    <span>{text[0]}</span>
                    <br/>
                    <span>{text[1]}</span>
                  </span>
        }  else if ((typeof text == 'string') && text.constructor == String) {
          return <span>{text}</span>;
        }  
        return <span>{text}</span>;
       },
    },
    {
      title: '账户余额',
      dataIndex: 'balance',
      key:'balance2',
    },
    {
      title: 'vos话机密码',
      dataIndex: 'vos_telephone_password',
      key:'vos_telephone_password2',
    }, 
    {
      title: 'vos网页密码',
      dataIndex: 'vos_web_password',
      key:'vos_web_password2',
    }, 
    {
      title: '查询余额',
      dataIndex: 'balance_query',
      key:'balance_query2', 
      render(text, record) {
        return  text;
       }
    },
    {
      title: '余额提醒',
      dataIndex: 'balance_remind',
      key:'balance_remind2',
      render(text, record) {
        return  text;
      }
    },{
      title: '余额告警阈值',
      dataIndex: 'balance_warning',
      key:'balance_warning2',
    },
    {
      title: '余额提醒次数',
      dataIndex: 'balance_notice_times',
      key:'balance_notice_times2',
      render(text, record) {
        return  text;
       }
    },
    {
      title: '提醒方式',
      dataIndex: 'balance_notice_way',
      key:'balance_notice_way2',
      render(text, record) {
        return  text;
       }
    }
  ];
 
  return (
    <Modal
      title="vos信息"
      visible={modalVosVisible}
      onOk={okHandle}
      onCancel={() =>handleVosModalVisible()}   
  >   
     <Table columns={columns} dataSource={record} size="small" bordered/>
    </Modal>
  );
});




//cc

const CreateCcForm = Form.create()(props => {
  const { modalCcVisible, form, handleCc, handleCcModalVisible,record} = props;
  // console.log(12121);
  // console.log(record);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleCc(fieldsValue);
    });
  };
  const columns = [
    {
      title: 'cc类型',
      dataIndex: 'server_name',
      key:'server_name3',
      render: (text, record, index) => (
        <span>
          {record.server_name.map((item,index) =>{
            return  <table key={index} bordered="true">
               <tbody key={item.index}>
                      <tr key={item.index}>
                        <td >{item}</td>
                      </tr>
                    </tbody>
               </table>
            
          })}
        </span>
      )
    },
    
    {
    title: 'cc企业名称',
    dataIndex: 'call_center_server_id',
    key:'call_center_server_id3',
    // render: (text, record, index) => (
    //   <span>
    //     {record.call_center_server_id.map((item,index) =>{
    //       return  <table key={index}>
    //          <tbody key={item.index}>
    //                 <tr key={item.index}>
    //                   <td >{item}</td>
    //                 </tr>
    //               </tbody>
    //       </table>
          
    //     })}
    //   </span>
    // )
  }, 
  {
    title: 'cc起始分机',
    dataIndex: 'start_extension',
    key:'start_extension3',
    render: (text, record, index) => (
      <span>
        {record.start_extension.map((item,index) =>{
          return  <table key={index} >
             <tbody key={item.index}>
                    <tr key={item.index}>
                      <td >{item}</td>
                    </tr>
                  </tbody>
             </table>
          
        })}
      </span>
    )
  },
  {
    title: 'cc结束分机',
    dataIndex: 'end_extension',
    key:'end_extension3',
    // render: (text, record, index) => (
    //   <span>
    //     {record.end_extension.map((item,index) =>{
    //       return  <table key={index}>
    //          <tbody key={item.index}>
    //                 <tr key={item.index}>
    //                   <td >{item}</td>
    //                 </tr>
    //               </tbody>
    //       </table>
          
    //     })}
    //   </span>
    // )
  }, {
    title: 'cc分机密码',
    dataIndex: 'extension_password',
    key:'extension_password3',
    // render: (text, record, index) => (
    //   <span>
    //     {record.extension_password.map((item,index) =>{
    //       return  <table key={index}>
    //               <tbody key={item.index}>
    //                 <tr key={item.index}>
    //                   <td >{item}</td>
    //                 </tr>
    //               </tbody>
    //       </table>
          
    //     })}
    //   </span>
    // )
  },{
    title: 'cc坐席数量',
    dataIndex: 'seats_number',
    key:'seats_number3',
    // render: (text, record, index) => (
    //   <span>
    //     {record.seats_number.map((item,index) =>{
    //       return  <table key={index}>
    //          <tbody key={item.index}>
    //                 <tr key={item.index}>
    //                   <td >{item}</td>
    //                 </tr>
    //               </tbody>
    //       </table>
          
    //     })}
    //   </span>
    // )
  },{
    title: 'cc管理员用户名',
    dataIndex: 'manager_name',
    key:'manager_name3',
    // render: (text, record, index) => (
    //   <span>
    //     {record.manager_name.map((item,index) =>{
    //       return  <table key={index}>
    //          <tbody key={item.index}>
    //                 <tr key={item.index}>
    //                   <td >{item}</td>
    //                 </tr>
    //               </tbody>
    //       </table>
          
    //     })}
    //   </span>
    // )
  },{
    title: '管理员密码',
    dataIndex: 'manager_password',
    key:'manager_password3',
  },{
    title: 'cc操作员用户名',
    dataIndex: 'operator_name',
    key:'operator_name3',
  },{
    title: 'cc操作员密码',
    dataIndex: 'operator_password',
    key:'operator_password3',
  },{
    title: 'cc坐席用户名',
    dataIndex: 'seats_name',
    key:'seats_name3',
  },{
    title: 'cc坐席密码',
    dataIndex: 'seats_password',
    key:'seats_password3',
  }];
 
  return (
    <Modal
      title="CC信息"
      visible={modalCcVisible}
      onOk={okHandle}
      onCancel={() =>handleCcModalVisible()}   
  >   
     <Table columns={columns} dataSource={record} size="small" bordered/>
    </Modal>
  );
});



//统一平台

const CreateUnifiedForm = Form.create()(props => {
  const { modalUnifiedVisible, form, handleUnified, handleUnifiedModalVisible,record } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUnified(fieldsValue);
    });
  };
  const columns = [{
    title: '统一平台企业名称',
    dataIndex: 'enterprise_name',
    key:'enterprise_name4',
  }, {
    title: '统一平台管理员用户名',
    dataIndex: 'manager_name',
    key:'manager_name4',
  }, {
    title: '统一平台管理员密码',
    dataIndex: 'manager_password',
    key:'manager_password4',
  },{
    title: '统一平台操作员用户名',
    dataIndex: 'operator_name',
    key:'operator_name4',
  },{
    title: '统一平台操作员密码',
    dataIndex: 'operator_password',
    key:'operator_password4',
  },
  {
    title: '统一平台坐席起始用户名',
    dataIndex: 'seats_start_name',
    key:'seats_start_name4',
  },
  {
    title: '统一平台坐席结束用户名',
    dataIndex: 'seats_end_name',
    key:'seats_end_name4',
  },{
    title: '统一平台坐席密码',
    dataIndex: 'seats_password',
    key:'seats_password4',
  },];

  return (
    <Modal
      title="统一平台信息"
      visible={modalUnifiedVisible}
      onOk={okHandle}
      onCancel={() =>handleUnifiedModalVisible()}   
  >   
     <Table columns={columns} dataSource={record} size="small" bordered/>
    </Modal>
  );
});

//短信平台

const CreateMessageForm = Form.create()(props => {
  const { modalMessageVisible, form, handleMessage,handleMessageModalVisible,record } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleMessage(fieldsValue);
    });
  };

 
  const columns = [
  {
    title: '平台名称',
    dataIndex: 'platform_name',
    key:'platform_name5',
  }, 
  {
    title: '用户名',
    dataIndex: 'user_name',
    key:'user_name5',
  },
  
  {
    title: '密码',
    dataIndex: 'user_password',
    key:'user_password5',
  },
  {
    title: '余额',
    dataIndex: 'balance',
    key:'balance5',
  },
  {
    title: '备注信息',
    dataIndex: 'note',
    key:'note5',
    render(text, record) {
      return <Tooltip placement="top" title='备注信息' >
                 <span className={styles.note}>备注信息</span>
             </Tooltip>
     }
    
  }
];

  return (
    <Modal
      title="短信平台信息"
      visible={modalMessageVisible}
      onOk={okHandle}
      onCancel={() =>handleMessageModalVisible()}   
  > 
     <Table columns={columns} dataSource={record} size="small" bordered/>
    </Modal>
  );
});





const CreateNewvosForm = Form.create()(props => {
  const { modalNewvosVisible, form, handleNewvos, handleNewvosModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleNewvos(fieldsValue);
    });
  };
  return (
    <Modal
      title="管理vos信息"
      visible={modalNewvosVisible}
      onOk={okHandle}
      onCancel={() =>handleNewvosModalVisible()}   
  >   
      <TableForm 
            handleDelete = { this.handleDeleteData }
            onChange = { this.handlePackageTypeTableChange }
            onRef = {this.onRef} 
          />
    </Modal>
  );
});

const CreateNewUnifiedForm = Form.create()(props => {
  const { modalNewUnifiedVisible, form, handleNewUnified, handleNewUnifiedModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleNewUnified(fieldsValue);
    });
  };
  return (
    <Modal
      title="管理平台信息"
      visible={modalNewUnifiedVisible}
      onOk={okHandle}
      onCancel={() =>handleNewUnifiedModalVisible()}   
  >   
      <UnifiedForm 
            handleDelete = { this.handleDeleteData }
            onChange = { this.handlePackageTypeTableChange }
            onRef = {this.onRef} 
          />
    </Modal>
  );
});

const CreateServerForm = Form.create()(props => {
  const { modalServerVisible, form, handleServer, handleServerModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleServer(fieldsValue);
    });
  };
  return (
    <Modal
      title="管理服务器信息"
      visible={modalServerVisible}
      onOk={okHandle}
      onCancel={() =>handleServerModalVisible()}   
    >   
      <ServerForm 
        handleDelete = { this.handleDeleteData }
        onChange = { this.handlePackageTypeTableChange }
        onRef = {this.onRef} 
      />
    </Modal>
  );
});

const CreateNewMessageForm = Form.create()(props => {
  const { modalNewMessageVisible, form, handleNewMessage, handleNewMessageModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleNewMessage(fieldsValue);
    });
  };
  return (
    <Modal
      title="管理短信平台"
      visible={modalNewMessageVisible}
      onOk={okHandle}
      onCancel={() =>handleNewMessageModalVisible()}   
  >   
      <MessageForm 
            handleDelete = { this.handleDeleteData }
            onChange = { this.handlePackageTypeTableChange }
            onRef = {this.onRef} 
          />
    </Modal>
  );
});

//新建按钮表单
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, formAddValues, modalTitle,handleNewMessageModalVisible,handleNewvosModalVisible,handleNewUnifiedModalVisible, handleServerModalVisible} = props;
  // console.log(formAddValues);
  const { getFieldDecorator } = form;
  const okHandle = () => {
    form.validateFields({first: false}, (err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };

  const addVos = () => {
    handleNewvosModalVisible(true);
  }

  const addUnified = () => {
    handleNewUnifiedModalVisible(true);
  }

  const addServer = () => {
    handleServerModalVisible(true);
  }

  const addMessage = () => {
    handleNewMessageModalVisible(true);
  }

  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
     <Row gutter={24}>
      <Col  sm={12}> 
            <FormItem labelCol={{ span:8}} wrapperCol={{ span: 10}}   label="公司ID">
              {getFieldDecorator('company_id',{
                initialValue:formAddValues.company_id,
                validateFirst: true,
              })(<Input placeholder="公司ID" />)}
                
            </FormItem>

            <FormItem labelCol={{ span:8}} wrapperCol={{ span: 10}}   label="公司全称">
            {getFieldDecorator('company_full_name',{
              initialValue:formAddValues.company_full_name,
              validateFirst: true,
            })(<Input placeholder="公司全称" />)}
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}   label="公司简称">
            {getFieldDecorator('company_short_name',{
              initialValue:formAddValues.company_short_name,
              validateFirst: true,
            })(<Input placeholder="公司简称" />)}
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}   label="公司代码">
            {getFieldDecorator('company_code',{
              initialValue:formAddValues.company_code,
              validateFirst: true,
            }) (<Input placeholder="公司代码" />)}
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}  label="创建时间">
            {getFieldDecorator('created_at',{
              initialValue:formAddValues.created_at,
              validateFirst: true,
            }) (<Input placeholder="创建时间" />)}
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}  label="归属业务员">
            {getFieldDecorator('trader_user_id',{
              initialValue:formAddValues.trader_user_id,
              validateFirst: true,
            })(<Select
              size="default"
              style={{width:'100%'}}
            >
            <Option value='1'> 001 </Option>
            <Option value='2'> 002 </Option>
            </Select>)}
            </FormItem> 

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}  label="归属技术组">
            {getFieldDecorator('technical_group',{
              initialValue:formAddValues.technical_group,
              validateFirst: true,
            }) (<Select
              size="default"
              style={{width:'100%'}}
            >
            <Option value='1'> 001 </Option>
            <Option value='2'> 002 </Option>
            </Select>)}
            </FormItem> 
              <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}  label="统一平台">
              {getFieldDecorator('unified_platform_id',{
              initialValue:formAddValues.unified_platform_id,
              validateFirst: true,
            })(<Button icon="plus" onClick={() => addUnified(true)}>
                管理平台数据
              </Button>)}
            </FormItem> 

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}  label="VOS">
            {getFieldDecorator('vos_id',{
              initialValue:formAddValues.vos_id,
              validateFirst: true,
            })
            (<Button icon="plus" onClick={() => addVos(true)}>
                管理VOS数据
            </Button>)}
            </FormItem>          
        </Col> 
        <Col sm={12}>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} label="状态">
          {form.getFieldDecorator('company_status', {
            initialValue: formAddValues.company_status,
            validateFirst: true,
           
          })(<Select
            size="default"
            style={{width:'100%'}}
          >
          {statusOptions}
          </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} label="是否发送消息">
          {form.getFieldDecorator('message_switch', {
            initialValue: formAddValues.message_switch,
            validateFirst: true,
          })(<Select
            size="default"
            style={{width:'100%'}}
          >
          {sendMsgStatusOptions}
          </Select>)}
        </FormItem>
        
            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}    label="联系电话">
            {getFieldDecorator('contact_number',{
              initialValue:formAddValues.contact_number,
              validateFirst: true,
            })(<Input placeholder="联系电话" />) }
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}    label="联系QQ">
            {getFieldDecorator('contact_qq',{
              initialValue:formAddValues.contact_qq,
              validateFirst: true,
            }) (<Input placeholder="联系QQ" />)}
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}   label="联系微信">
            {getFieldDecorator('wechat',{
              initialValue:formAddValues.wechat,
              validateFirst: true,
            }) (<Input placeholder="联系微信" />)}
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}   label="微信ID">
            {getFieldDecorator('wechat_user_id',{
              initialValue:formAddValues.wechat_user_id,
              validateFirst: true,
            }) (<Input placeholder="微信ID" />)}
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}    label="联系邮箱">
            {getFieldDecorator('contact_email',{
              initialValue:formAddValues.contact_email,
              validateFirst: true,
            }) (<Input placeholder="联系邮箱" />)}
            </FormItem>

            {/* <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}   label="归属">
            {getFieldDecorator('owen',{
              initialValue:formAddValues.owen,
              validateFirst: true,
            }) (<Input placeholder="归属" />)}
            </FormItem> */}

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}  label="服务器数据">
            {getFieldDecorator('server_id',{
              initialValue:formAddValues.server_id,
              validateFirst: true,
            }) (<Button icon="plus"  onClick={() => addServer(true)}>
                管理服务器数据
              </Button>)}
            </FormItem>

            <FormItem labelCol={{ span: 8}} wrapperCol={{ span: 10 }}  label="短信平台">
            {getFieldDecorator('message',{
              initialValue:formAddValues.message,
              validateFirst: true,
            })(<Button icon="plus" onClick={() => addMessage(true)}>
                管理短信平台
              </Button>) }
            </FormItem>   
            
        </Col>
    </Row>
    </Modal>
  );
});



@connect(({ manage,loading }) => ({
  manage,
  loading: loading.models.manage,
}))


@Form.create()
export default class ManageList extends PureComponent {

  state = {
    modalVisible: false,
    modalCcVisible: false,
    modalSeeVisible: false,
    modalUntieVisible: false,
    modalNewvosVisible: false,
    modalNewMessageVisible: false,
    modalServerVisible: false,
    modalNewUnifiedVisible: false,
    modalSendShortVisible: false,
    modalSendWechatVisible: false,
    modalUnifiedVisible: false,
    modalVosVisible: false,
    modalMessageVisible: false,
    modalTitle: '新建数据',
    expandForm: false,
    selectedRowKeys: [],
    selectedRows: [],
    rowSelection:{},
    searchText: '',
    filterDropdownVisible: false,
    activeIndex: '',
    copied:false,
    data:[],
    record:[],
  
    formAddValues: {
      customer_information_id:'',
      company_id: '',                           
      company_full_name: '',
      company_short_name: '',
      company_code: '',
      vos_server_id:[],
      vos_account:[],
      balance:[],
      server_name:[],
      start_extension:[],
      seats_start_name:'',
      contact_number: '',
      company_address: '',
      contact_qq: '',
      wechat:'',
      contact_email: '',
      note: '',
      message_switch: '',
      wechat_user_id: '',
      trader_user_id: '',
      operator_user_id: '',
      company_status: '',
      created_at: '',
      updated_at: '',
      technical_group:'',
      vos_telephone_password: '',
      vos_web_password:'',
      balance_query: "",
      balance_remind:'',
      balance_warning:'',
      balance_notice_times:'',
      balance_notice_way: '',
      call_center_server_id: '',
      end_extension:'',
      extension_password: "",
      seats_number:'',
      user_id:'',
      manager_name:'',
      manager_password:'',
      operator_password: '',
      seats_name: '',
      seats_password: '',
      enterprise_name: '',
      manager_password: "",
      operator_name:'',
      operator_password:'',
      seats_start_name:'',
      seats_end_name:'',
      seats_password: '',
      platform_name: '',
      user_name: "",
      user_password:'',
      balance:'',
      note:'',   
    },
    formQueryValues: {},
    fileList: [],
  };

  

  componentDidMount() {
    const { dispatch } = this.props;
    //获取数据
    dispatch({
      type: 'manage/fetchManage',
      payload: {},
    });

  }

  handleNewvosModalVisible = (flag) => {
    this.setState({
      modalNewvosVisible: !!flag,
    });
  };

  handleNewMessageModalVisible = (flag) => {
    this.setState({
      modalNewMessageVisible: !!flag,
    });
  };

//解绑微信弹框
  // handleUntieModalVisible = (flag) => {
  //   this.setState({
  //     modaUntieVisible: !!flag,
  //   });
  // };

  handleServerModalVisible = (flag) => {
    this.setState({
      modalServerVisible: !!flag,
    });
  };

  handleNewUnifiedModalVisible = (flag) => {
    this.setState({
      modalNewUnifiedVisible: !!flag,
    });
  };


  handleVosModalVisible = (flag) => {
    this.setState({
      modalVosVisible: !!flag,
    });
  };

  handleMessageModalVisible = (flag) =>{
    const data = this.props.manage.data.list;
    this.setState({
      modalMessageVisible:!!flag,
      data:data,
    })
  }

  handleSeeModalVisble = () => {
    this.setState({
      modalSeeVisible: true,
    })
  }



  handleSeeModalVisible = flag => {
    this.setState({
      modalSeeVisible: !!flag,
    });
  };

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

 
  handleCcModalVisible = (flag) => {
    this.setState({
      modalCcVisible: !!flag,
    });
  };

  handleUnifiedModalVisible = (flag) => {
    this.setState({
      modalUnifiedVisible: !!flag,
    });
  };


  handleSendShortModalVisible = (flag) => {
    this.setState({
      modalSendShortVisible: !!flag,
    });
  };

  // //发微信
  // handleSendWechatModalVisible = (flag) => {
  //   this.setState({
  //     modalSendWechatVisible: !!flag,
  //   });
  // };

  //解绑微信

  // handleUntieModalVisible = (flag) => {
  //   this.setState({
  //     modalUntieVisible: !!flag,
  //   });
  // };


   //删除数据
   handleDeleteData = fieldId => {

    // const { 
    //   dispatch
    // } = this.props;

    // dispatch({
    //   type: 'manage/removeManage',
    //   payload: { company_id: fieldId },
    // });
    
  };

  setClassName=(record,index)=>{
    //   //  console.log(index);
    //    //record代表表格行的内容，index代表行索引
    //    //判断索引相等时添加行的高亮样式
       return ( index  === this.state.activeIndex ? styles.red : '' )
  }


  handleClickRow(record){
    //console.log(record);
    let recordArr = new Array();
    recordArr[0] = record;
    this.setState({
      selectedRowKeys:[record.company_id-1],
      activeIndex: record.company_id-1, 
      record: recordArr
     }); 
  }

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

    // dispatch({
    //   type: 'manage/fetchManage',
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
    //   type: 'manage/fetchManage',
    //   payload: {},
    // });
  };


  //单个删除
  handleDeleteData = (e, text, data) => {

    const { dispatch } = this.props;

    dispatch({
      type: 'manage/removeManage',
      payload: {
        company_ids: [text.company_id],
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
      customer_information_id:text.customer_information_id, 
      company_id: text.company_id,                                                                     
      company_full_name: text.company_full_name,
      company_short_name: text.company_short_name,
      company_code: text.company_code,
      vos_server_id:text.vos_server_id,
      vos_account:text.vos_account,
      balance:text.balance,
      server_name:text.server_name,
      start_extension:text.start_extension,
      seats_start_name:text.seats_start_name,
      contact_number: text.contact_number,
      company_address: text.company_address,
      contact_qq: text.contact_qq,
      wechat:text.wechat,
      contact_email: text.contact_email,
      note: text.note,
      message_switch: text.message_switch,
      wechat_user_id: text.wechat_user_id,
      trader_user_id: text.trader_user_id,
      operator_user_id: text.operator_user_id,
      company_status: text.company_status,
      created_at: text.created_at,
      updated_at: text.updated_at,
      technical_group:text.technical_group,
      vos_telephone_password: text.vos_telephone_password,
      vos_web_password:text.vos_web_password,
      balance_query: text.balance_query,
      balance_remind:text.balance_remind,
      balance_warning:text.balance_warning,
      balance_notice_times:text.balance_notice_times,
      balance_notice_way: text.balance_notice_way,
      call_center_server_id: text.call_center_server_id,
      end_extension:text.end_extension,
      extension_password: text.extension_password,
      seats_number:text.seats_number,
      user_id:text.user_id,
      manager_name:text.manager_name,
      manager_password:text.manager_password,
      operator_password: text.operator_password,
      seats_name: text.seats_name,
      seats_password: text.seats_password,
      enterprise_name:text.enterprise_name,
      manager_password: text.manager_password,
      operator_name:text.operator_name,
      operator_password:text.operator_password,
      seats_start_name:text.seats_start_name,
      seats_end_name:text.seats_end_name,
      seats_password: text.seats_password,
      platform_name: text.platform_name,
      user_name: text.user_name,
      user_password:text.user_password,
      balance:text.balance,
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


  handleVos = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalVosVisible: false,
    });
  };

  handleMessage = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalMessageVisible: false,
    });
  };

  handleCc = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalCcVisible: false,
    });
  };

  //发送短信

  handleSendShort = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    message.success('发送成功');
    this.setState({
      modalSendShortVisible: false,
    });
  };

  handleSendWechat = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    message.success('发送成功');
    this.setState({
      modalSendWechatVisible: false,
    });
  };

  handleUntie = () =>{
    message.success('解绑成功');
    this.setState({
      modalUntieVisible: false,
    });
  }

  handleRemind = () =>{
    message.success('发送成功');
  }

  handleNewvos = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalNewvosVisible: false,
    });
  };

  handleNewMessage = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalNewMessageVisible: false,
    });
  };


  handleServer = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalServerVisible: false,
    });
  };

  handleUnified = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalUnifiedVisible: false,
    });
  };

  handleNewUnified = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalNewUnifiedVisible: false,
    });
  };

  handleSee = () => {
    // this.props.dispatch({
    //   type: 'rule/eitd',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    // message.success('查看完成');
    this.setState({
      modalVisible: false,
    });
  };


  // 选择
  // handleSelectRows = rows => {
  //   console.log(rows);
  //   this.setState({
  //     selectedRows: rows,
  //   });
  // };

  

  onSelectChange = (selectedRowKeys,record) =>{
    console.log(record);
    // this.setState({selectedRowKeys});
    this.setState({
      activeIndex: record.company_id-1, 
      selectedRowKeys:selectedRowKeys,
     }); 
  }
  


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
        type: 'manage/fetchManage',
        payload: values,
      });
    });
  };


  //模态框新增数据
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });

  //VOS

    const formValuesArr = {
      customer_information_id:'',
      company_id: '',                           
      company_full_name: '',
      company_short_name: '',
      company_code: '',
      vos_server_id:[],
      vos_account:[],
      balance:[],
      server_name:[],
      start_extension:[],
      seats_start_name:'',
      contact_number: '',
      company_address: '',
      contact_qq: '',
      wechat:'',
      contact_email: '',
      note: '',
      message_switch: '',
      wechat_user_id: '',
      trader_user_id: '',
      operator_user_id: '',
      company_status: '',
      created_at: '',
      updated_at: '',
      technical_group:'',
      vos_telephone_password: '',
      vos_web_password:'',
      balance_query: "",
      balance_remind:'',
      balance_warning:'',
      balance_notice_times:'',
      balance_notice_way: '',
      call_center_server_id: '',
      end_extension:'',
      extension_password: "",
      seats_number:'',
      user_id:'',
      manager_name:'',
      manager_password:'',
      operator_password: '',
      seats_name: '',
      seats_password: '',
      enterprise_name: '',
      manager_password: "",
      operator_name:'',
      operator_password:'',
      seats_start_name:'',
      seats_end_name:'',
      seats_password: '',
      platform_name: '',
      user_name: "",
      user_password:'',
      balance:'',
      note:'',   
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
      customer_information_id:fields.customer_information_id, 
      company_id: fields.company_id,                                                                     
      company_full_name: fields.company_full_name,
      company_short_name: fields.company_short_name,
      company_code: fields.company_code,
      vos_server_id:fields.vos_server_id,
      vos_account:fields.vos_account,
      balance:fields.balance,
      server_name:fields.server_name,
      start_extension:fields.start_extension,
      seats_start_name:fields.seats_start_name,
      contact_number: fields.contact_number,
      company_address: fields.company_address,
      contact_qq: fields.contact_qq,
      wechat:fields.wechat,
      contact_email: fields.contact_email,
      note: fields.note,
      message_switch: fields.message_switch,
      wechat_user_id: fields.wechat_user_id,
      trader_user_id: fields.trader_user_id,
      operator_user_id: fields.operator_user_id,
      company_status: fields.company_status,
      created_at: fields.created_at,
      updated_at: fields.updated_at,
      technical_group:fields.technical_group,
      vos_telephone_password: fields.vos_telephone_password,
      vos_web_password:fields.vos_web_password,
      balance_query: fields.balance_query,
      balance_remind:fields.balance_remind,
      balance_warning:fields.balance_warning,
      balance_notice_times:fields.balance_notice_times,
      balance_notice_way: fields.balance_notice_way,
      call_center_server_id: fields.call_center_server_id,
      end_extension:fields.end_extension,
      extension_password: fields.extension_password,
      seats_number:fields.seats_number,
      user_id:fields.user_id,
      manager_name:fields.manager_name,
      manager_password:fields.manager_password,
      operator_password: fields.operator_password,
      seats_name: fields.seats_name,
      seats_password: fields.seats_password,
      enterprise_name:fields.enterprise_name,
      manager_password: fields.manager_password,
      operator_name:fields.operator_name,
      operator_password:fields.operator_password,
      seats_start_name:fields.seats_start_name,
      seats_end_name:fields.seats_end_name,
      seats_password: fields.seats_password,
      platform_name: fields.platform_name,
      user_name: fields.user_name,
      user_password:fields.user_password,
      balance:fields.balance,
      note:text.note,   
      
    };


    dispatch({
      type: 'manage/addManage',
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

  goPage = () =>{
    this.props.history.push("./followup")
  }

  goPage2 = () =>{
    this.props.history.push("../equipment/equipment-list")
  }

  //批量新增数据
  handleBatchAdd = (file) => {
    const { dispatch} = this.props;

    const params = {
      file: file,
      filters: this.state.formQueryValues
    };
    
    dispatch({
      type: 'manage/addManage',
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


  //渲染高级查询
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">     
          <Col md={8} sm={24}>
            <FormItem label="企业名称">
              {getFieldDecorator('customer_name',{
                initialValue: this.state.formQueryValues.customer_name,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('company_status',{
                initialValue: this.state.formQueryValues.company_status,
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
                
              </span>
            </div>
            </Col>
        </Row>
      </Form>
    );
  }

  //渲染查询表单
  renderForm() {
    return  this.renderSimpleForm();
  }

  render() {

    const {
      manage: { data },
      loading,
    } = this.props;
  
    const { 
         selectedRowKeys,
         modalVisible,
         selectedRows,
         formAddValues, modalTitle,
         modalSeeVisible,
         modalSendShortVisible,
         modalMessageVisible,
         modalVosVisible,
         modalCcVisible,
         modalUnifiedVisible,
         modalNewvosVisible,
         modalNewMessageVisible,
         modalNewUnifiedVisible,
         modalServerVisible,
         record
        } = this.state;
    const rowSelection = {
        selectedRowKeys,
        onChange:this.onSelectChange,
    }; 
    
    const hasSelected = selectedRowKeys.length > 0;

  
   const columns = [
      {
        title: '公司ID',
        dataIndex: 'company_id',
        key: 'company_id',
        
      },
      {
        title: '公司全称',
        dataIndex: 'company_full_name',
        key: 'company_full_name',
        
      },
      {
        title: '公司简称',
        dataIndex: 'company_short_name',
        key: 'company_short_name',      
      },
     
      
      {
        title: '公司代码',
        dataIndex: 'company_code',
        key: 'company_code',
       
      },

      {
        title: '公司地址',
        dataIndex: 'company_address',
        key: 'company_address',
        
      },
      {
        title: '联系QQ',
        dataIndex: 'contact_qq',
        key: 'contact_qq',
       
      },
      {
        title: '联系微信',
        dataIndex: 'wechat',
        key: 'wechat6',
        
      },
      {
        title: '微信ID',
        dataIndex: 'wechat_user_id',
        key: 'wechat_user_id',
       
      },

      {
        title: '联系邮箱',
        dataIndex: 'contact_email',
        key: 'contact_email',
        
      },
      {
        title: '联系电话',
        dataIndex: 'contact_number',
        key: 'contact_number',
        
      },
      {
        title: 'VOS服务器',
        dataIndex: 'vos_server_id',
        key: 'vos_server_id',
        render: (text) =>(
          <span>
            <span>{text[0]}</span>
            <br />
            <br />
            <br />
            <span>{text[1]}</span>
          </span>
        ),
      },
      {
        title: 'VOS账号',
        dataIndex: 'vos_account',
        key: 'vos_account',
        render: (text) =>(
          <span>
            <span>{text[0]}</span>
            <br />
            <br />
            <br />
            <span>{text[1]}</span>
          </span>
        ),
      },    
      {
        title: '账户余额',
        dataIndex: 'balance',
        key: 'balance',
        // render: (text) =>(
        //   <span>
        //     <span>{text[0]}</span>
        //     <br />
        //     <br />
        //     <br />
        //     <span>{text[1]}</span>
        //   </span>
        // ),        
      },
      {
        title: 'cc类型',
        dataIndex: 'server_name',
        key: 'server_name',
        render: (text) =>(
          <span>
            <span>{text[0]}</span>
            <br />
            <br />
            <br />
            <span>{text[1]}</span>
          </span>
        ),
      },
      {
        title: 'cc类起始分机',
        dataIndex: 'start_extension',
        key: 'start_extension',
        render: (text) =>(
          <span>
            <span>{text[0]}</span>
            <br />
            <br />
            <br />
            <span>{text[1]}</span>
          </span>
        ),
      },
      {
        title: '统一平台坐席起始用户名',
        dataIndex: 'seats_start_name',
        key: 'seats_start_name',
        // render: (text) =>(
        //   <span>
        //     {text}
        //   </span>
        // ),
      },
      
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
        
      },
      {
        title: '更新时间',
        dataIndex: 'updated_at',
        key: 'updated_at',
        
      },
      {
        title: '备注信息',
        dataIndex: 'note',
        key: "note6",
        render(text, record) {
          return <Tooltip placement="top" title='备注信息' >
                     <span className={styles.note}>备注信息</span>
                 </Tooltip>
         }
       
      },
      {
        title: '状态',
        dataIndex: 'company_status',
        key: 'company_status',
        filters: [
          {
            text: companys_status_option[0]['name'],
            value: companys_status_option[0]['key'],
          },
          {
            text: companys_status_option[1]['name'],
            value: companys_status_option[1]['key'],
          },
        ],
        onFilter: (value, record) => record.company_status.toString() === value,
        render(val) {
          return <Badge status={badge_status_map[val]} text={companys_status[val]} />;
        },
      },
     
      {
        title: '是否发送消息',
        dataIndex: 'message_switch',
        key: 'message_switch',
        filters: [
          {
            text: send_msg_status_option[0]['name'],
            value: send_msg_status_option[0]['key'],
          },
          {
            text: send_msg_status_option[1]['name'],
            value: send_msg_status_option[1]['key'],
          },
        ],
        onFilter: (value, record) => record.message_switch.toString() === value,
        render(val) {
          return <Badge status={badge_status_map[val]} text={send_msg_status[val]} />;
          // return 111;
        },
      },
      {
        title: '归属业务员',
        dataIndex: 'trader_user_id',
        key: 'trader_user_id6',
       
      },
      {
        title: '归属技术组',
        dataIndex: 'technical_group',
        key: 'technical_group6',
        // render: (text, row, index) => {
        //   const obj = {
        //     children: text,
        //     props: {},
        //   };
        //   // if (index === 0) {
        //     obj.props.rowSpan = row.num;
        //   // }
        //   // console.log(index)
        //   return obj;
        // },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        key: 'operation6',
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

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleNewvosModalVisible: this.handleNewvosModalVisible,
      handleNewMessageModalVisible: this.handleNewMessageModalVisible,
      handleServerModalVisible: this.handleServerModalVisible,
      handleNewUnifiedModalVisible: this.handleNewUnifiedModalVisible,
    };

    const parentVosMethods = {
      handleVos: this.handleVos,
      handleVosModalVisible: this.handleVosModalVisible,
    };
    const parentMessageMethods = {
      handleMessage: this.handleMessage,
      handleMessageModalVisible: this.handleMessageModalVisible,
    };

    const parentNewvosMethods = {
      handleNewvos: this.handleNewvos,
      handleNewvosModalVisible: this.handleNewvosModalVisible,
    };

    const parentNewMessageMethods = {
      handleNewMessage: this.handleNewMessage,
      handleNewMessageModalVisible: this.handleNewMessageModalVisible,
    };

    const parentServerMethods = {
      handleServer: this.handleServer,
      handleServerModalVisible: this.handleServerModalVisible,
    };

    const parentUnifiedMethods = {
      handleUnified: this.handleUnified,
      handleUnifiedModalVisible: this.handleUnifiedModalVisible,
    };

    const parentCcMethods = {
      handleCc: this.handleCc,
      handleCcModalVisible: this.handleCcModalVisible,
    };

    const parentNewUnifiedMethods = {
      handleNewUnified: this.handleNewUnified,
      handleNewUnifiedModalVisible: this.handleNewUnifiedModalVisible,
    };
    const parentSeeMethods = {
      handleSee: this.handleSee,
      handleSeeModalVisible: this.handleSeeModalVisible,
    };

    // const parentUntieMethods = {
    //   handleUntie: this.handleUntie,
    //   handleUntieModalVisible: this.handleUntieModalVisible,
    // };

    const parentSendShortMethods = {
      handleSendShort: this.handleSendShort,
      handleSendShortModalVisible: this.handleSendShortModalVisible,
    };

    // const parentSendWechatMethods = {
    //   handleSendWechat: this.handleSendWechat,
    //   handleSendWechatModalVisible: this.handleSendWechatModalVisible,
    // };
  
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
              <Button  type="primary" onClick={() => this.goPage()} disabled={!hasSelected}>
                跟进记录
              </Button>
              <Button icon="exclamation-circle" type="primary" onClick={() => this.handleRemind(true)}  disabled={!hasSelected}>
                余额提醒
              </Button>
              <Button  type="primary" onClick={() => this.goPage2()} disabled={!hasSelected}>
                设备管理
              </Button>
              <Button icon="eye" type="primary" onClick={() => this.handleSeeModalVisble(true)} disabled={!hasSelected}>
                查看
              </Button>
              {/* <Button icon="export" type="primary" onClick={() => this.handleSendWechatModalVisible(true)} disabled={!hasSelected}>
                发微信
              </Button> */}
              <Button icon="export" type="primary" onClick={() => this.handleSendShortModalVisible(true)} disabled={!hasSelected}>
                发短信
              </Button>
              <Button  type="primary" disabled={!hasSelected}>
                跳转CC
              </Button>
              {/* <Button  type="primary" onClick={() => this.handleUntieModalVisible(true)}disabled={!hasSelected}>
                解绑微信
              </Button> */}
              <Button  type="primary" onClick={() => this.handleVosModalVisible(true)} disabled={!hasSelected}>
                vos
              </Button>
              <Button  type="primary" onClick={() => this.handleCcModalVisible(true)} disabled={!hasSelected}>
                cc
              </Button>
              <Button  type="primary" onClick={() => this.handleUnifiedModalVisible(true)} disabled={!hasSelected}>
                统一平台
              </Button>
              <Button  type="primary" onClick={() => this.handleMessageModalVisible(true)} disabled={!hasSelected}>
                短信平台
              </Button>
              
            </div>

            <Table
              rowKey={'customer_information_id'}
              selectedRows={selectedRows}
              loading={loading}
              scroll={{ x: 2500 }}
              // rowSelection={rowSelection}
              dataSource={data.list}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleTableChange}
              rowClassName={this.setClassName}
              onRow={(record) => {//表格行点击事件
                return {
                  onClick: this.handleClickRow.bind(this,record)
                };
              }}
              bordered
            />
          </div>
    
        </Card>
        </div>
        
        <CreateVosForm {...parentVosMethods} modalVosVisible={modalVosVisible} record={record} />
        <CreateCcForm {...parentCcMethods} modalCcVisible={modalCcVisible} record={record}/>
        <CreateSendShortForm {...parentSendShortMethods} modalSendShortVisible={modalSendShortVisible} />
        {/* <CreateSendWechatForm {...parentSendWechatMethods} modalSendWechatVisible={modalSendWechatVisible} /> */}
        <CreateSeeForm {...parentSeeMethods} modalSeeVisible={modalSeeVisible} />
        <CreateMessageForm {...parentMessageMethods} modalMessageVisible={modalMessageVisible} record={record}/>
        <CreateNewvosForm {...parentNewvosMethods} modalNewvosVisible={modalNewvosVisible} />
        <CreateNewMessageForm {...parentNewMessageMethods} modalNewMessageVisible={modalNewMessageVisible} />
        {/* <CreateUntieForm {...parentUntieMethods} modalUntieVisible={modalUntieVisible} /> */}
        <CreateServerForm {...parentServerMethods} modalServerVisible={modalServerVisible} />
        <CreateNewUnifiedForm {...parentNewUnifiedMethods} modalNewUnifiedVisible={modalNewUnifiedVisible} />
        <CreateUnifiedForm {...parentUnifiedMethods} modalUnifiedVisible={modalUnifiedVisible} record={record}/>
        <CreateForm {...parentMethods} modalVisible={modalVisible} formAddValues={formAddValues} modalTitle={modalTitle} packageTypes={data.packageTypes} jobNumbers={data.jobNumbers}/>
  
      </PageHeaderLayout>
    );
  }
}