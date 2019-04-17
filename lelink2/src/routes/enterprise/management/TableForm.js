import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, Select, message, Popconfirm, Divider, Badge,InputNumber } from 'antd';
import styles from './Index.less';
import { regex } from '../../../utils/regex';
import { remind_type, remind_type_option, remind_type_map } from '../../../utils/status';

const { Option } = Select;

const remindOptions = remind_type_option.map( item => {
  return <Option key={item.key}>{item.name}</Option>;
});

export default class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key:'1',
        vos_server_id: 'vos01',
        vos_account: '999',
        balance: '11',
        vos_telephone_password: '11',
        vos_web_password: '222',
        balance_query: '11',
        balance_remind: '22',
        balance_warning: '222',
        balance_notice_times: '22',
        balance_notice_way: '微信',
      }],
      loading: false, 
    };
    // console.log(this.state);
  }

  componentDidMount(){
    // this.props.onRef(this)
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  //获取当前行数据
  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  //编辑
  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  //添加行
  newMember = () => {
    const { data } = this.state;
    // console.log(data);
    const newData = data.map(item => ({ ...item })); 
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      vos_server_id: '',
      vos_account: '',
      balance: '',
      vos_telephone_password: '',
      vos_web_password: '',
      balance_query: '',
      balance_remind: '',
      balance_warning: '',
      balance_notice_times: '',
      balance_notice_way: '',
      balance_notice_way: 'wechat',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  //删除行
  remove(key) {

    const { data } = this.state;
    const currentData = data.filter(item => item.key == key);

    if(regex.is_integer.test(key)){
      const { handleDelete } = this.props;
      handleDelete(currentData[0].manager_level_id);
    }else{
      const { onChange } = this.props;
      // console.log(onChange);
      const newData = data.filter(item => item.key !== key);
      this.setState({ data: newData });
      // onChange(newData);
    }
    
  }

  //回车操作
  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  //输入域改变
  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    
    if (target) {
      if(fieldName == 'balance_notice_way'){
        target[fieldName] = e;
      }else{
        target[fieldName] = e.target.value;
      }
      
      this.setState({ data: newData });
    }
  }

  //保存行信息
  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.vos_server_id || !target.vos_account) {
        message.error('请填写完整信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      const { data } = this.state;
      const { onChange } = this.props;
      delete target.isNew;
      this.toggleEditable(e, key);
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  //取消编辑
  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }


  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  };


  cancelFormEdit = () =>{
    const { data } = this.state;
    const currentData = data.map( item => {
      item.editable = false;
      item.isNew = false;
      return item;
    });
    this.setState({ data: currentData });
  }

  render() {
    const columns = [
      {
        title: 'vos服务器',
        dataIndex: 'vos_server_id',
        key: 'vos_server_id',
        width: 150,
        render: (text, record) => {  
          if (record.editable) {
            return (
              
                <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'vos_server_id', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="vos服务器"
                
              />
              
            );
          }         
              return text
          } 
       
        
      },
      {
        title: 'vos账号',
        dataIndex: 'vos_account',
        key: 'vos_account',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'vos_account', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="vos账号"
              />  
            );
          }
          return text
        },
      },
      {
        title: '账户余额',
        dataIndex: 'balance',
        key: 'balance',
        width: 150,
        render: (text, record) => {

          if (record.editable) {
            return (           
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'balance', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="账户余额"              
              />
              ) 
          }
          return text;
        },
      },
      {
        title: 'vos话机密码',
        dataIndex: 'vos_telephone_password',
        key: 'vos_telephone_password',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'vos_telephone_password', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="vos话机密码"
              />
            );
          }
          return text;
        },
      },
     
      {
        title: 'vos网页密码',
        dataIndex: 'vos_web_password',
        key: 'vos_web_password',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'vos_web_password', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="vos网页密码"
              />
            );
          }
          return text;
        },
      },
    
      {
        title: '查询余额',
        dataIndex: 'balance_query',
        key: 'balance_query',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              
              <Select size="default" defaultValue="是" style={{width:'100%'}} >
                    <Option key= '1'>是</Option>
                    <Option key= '2'>否</Option>
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '余额提醒',
        dataIndex: 'balance_remind',
        key: 'balance_remind',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              
              <Select size="default" defaultValue="是" style={{width:'100%'}} >
                    <Option key= '1'>是</Option>
                    <Option key= '2'>否</Option>
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '余额告警阈值',
        dataIndex: 'balance_warning',
        key: 'balance_warning',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'balance_warning', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="余额告警阈值"
              />
            );
          }
          return text;
        },
      },
      {
        title: '余额提醒次数',
        dataIndex: 'balance_notice_times',
        key: 'balance_notice_times',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <InputNumber min={1} max={10} defaultValue={5}              
                onChange={e => this.handleFieldChange(e, 'balance_notice_times', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="余额提醒次数"
              />
            );
          }
          return text;
        },
      },
      {
        title: '提醒方式',
        dataIndex: 'balance_notice_way',
        key: 'balance_notice_way',
        width: 150,
        // filters: [
        //   {
        //     text: remind_type_option[0]['name'],
        //     value: remind_type_option[0]['key'],
        //   },
        //   {
        //     text: remind_type_option[1]['name'],
        //     value: remind_type_option[1]['key'],
        //   },
        // ],
        // onFilter: (value, record) => record.remind_type.toString() === value,
        // render: (val) => {
        //   return  <Badge status={remind_type_map[val]} text={remind_type[val]} />;
        // },
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select size="default" defaultValue="微信" style={{width:'100%'}}>
                      <Option key= '1'>全部</Option>
                      <Option key= '2'>短信</Option>
                      <Option key= '3'>微信</Option>
              </Select>
            );
          }
          return text;
        },
      },
       
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, pagination,data  } = this.state;
    const {
      rowKey,
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => {
        return `共 ${total} 条`;
      },
      ...pagination,
    };

    return (
      <Fragment>
        <Table
          rowKey={rowKey || 'key'}
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
          bordered
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增vos信息
        </Button>
      </Fragment>
    );
  }
}
