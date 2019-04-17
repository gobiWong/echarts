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
  Menu,
  Badge,
  Modal,
  message,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';


const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
    // const statusMap = ['processing', 'success'];
    // const status = ['系统 ', '非系统'];
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      title="服务器分类"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      
  >  
  <Form.Item  label="名称"          
    style={{ width: 988 }}
    >
      <Input placeholder="请输入名称" />    
    </Form.Item>

    <Form.Item  label="SIP服务器地址"          
    style={{ width: 988 }}
  
    >
   <Input placeholder="请输入名称" />    
    </Form.Item>
    <Form.Item  label="web登录地址"          
    style={{ width: 988 }}
    >
   <Input placeholder="请输入名称" />    
    </Form.Item> 
    <FormItem  label="备注">
    <TextArea
      style={{ minHeight: 32 }}
      placeholder="请输入你需要的内容"
      rows={4}
    />
    </FormItem>
    </Modal>
  );
});

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
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

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

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

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

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

//   renderSimpleForm() {
//     return (
//       <Form onSubmit={this.handleSearch} layout="inline">
//         <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
//           {/* <Col md={8} sm={24}>
//             <FormItem label="规则编号">
//               {getFieldDecorator('no')(<Input placeholder="请输入" />)}
//             </FormItem>
//           </Col> */}
//           <Col>
//             <FormItem style={{ marginRight: 8 }} >                           
//                 <span>                
//                   <Select style={{ width: 150 }} placeholder="类型">
//                     <Option value="0">系统</Option>
//                     <Option value="1">非系统</Option>
//                   </Select>                  
//                 </span>                  
//             </FormItem>
//           </Col>
//           <Col>
//             <FormItem >                           
//                 <span>                
//                   <Select style={{ width: 150 }} placeholder="优先级">
//                     <Option value="able">高</Option>
//                     <Option value="disable">低</Option>
//                   </Select>                  
//                 </span>               
//             </FormItem>
//           </Col>
//           <Col >
//             <span className={styles.submitButtons}>
//               <Button style={{ marginLeft: 8 }} htmlType="submit">
//                 查询
//               </Button>
//               <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
//                 重置条件
//               </Button>
//               {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
//                 展开 <Icon type="down" />
//               </a> */}
//             </span>
//           </Col>
//         </Row>
//       </Form>
//     );
//   }



//   renderForm() {
//     return  this.renderSimpleForm();
//   }

  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
  
    const columns = [
      {
        title: 'id',
        dataIndex: 'description',
        key:1,
      },
    //   {
    //     title: '添加时间',
    //     dataIndex: 'createdAt',
    //     sorter: true,
    //     render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    //     key:2,
    //   },
      
     
      {
        title: '名称',
        dataIndex: 'description',
        key:2,
      },
      {
        title: 'SIP服务器地址',
        dataIndex: 'description',
        key:3,
      },
      {
        title: 'WEB登录地址',
        dataIndex: 'description',
        key:5,
      },
      {
        title: '备注信息',
        dataIndex: 'description',
        key:6,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="#">编辑</a>
          </Fragment>
        ),
      },
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
    return (
      <PageHeaderLayout title="服务器分类">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* <div className={styles.tableListForm}>{this.renderForm()}</div> */}
            <div className={styles.tableListOperator}>
             <span>服务器分类列表</span>
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
              添加分类
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
      </PageHeaderLayout>
    );
  }
}
