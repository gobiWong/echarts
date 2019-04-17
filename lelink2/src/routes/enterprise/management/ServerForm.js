import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, Select, message, Popconfirm, Divider, Badge } from 'antd';
import styles from './Index.less';
import { regex } from '../../../utils/regex';
import { common_status, common_status_option, badge_status_map } from '../../../utils/status';

const { Option } = Select;

const statusOptions = common_status_option.map( item => {
  return <Option key={item.key}>{item.name}</Option>;
});

export default class ServerForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);
     console.log(props);
    this.state = {
      data:[
        {
          key:'1',
          server_name:'cc81',
          call_center_server_id:'乐联',
          start_extension:'30',
          end_extension:'20',
          extension_password:'222',
          seats_number:'20',
          manager_name:'ni',
          manager_password:'6985',
          operator_name:'hao',
          operator_password:'8888',
          seats_name:'20',
          seats_password:'9999',       
        }
      ],
      // data:props.value,
      loading: false,
    };
    console.log(this.state.data);
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
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      server_name: '',
      call_center_server_id: '',
      start_extension: '',
      end_extension: '',
      extension_password: '',
      manager_name: '',
      manager_password: '',
      operator_name: '',
      operator_password: '',
      seats_name: '',
      seats_password: '',
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
      // const { onChange } = this.props;
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
      if(fieldName == 'status'){
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
      if (!target.server_name || !target.call_center_server_id) {
        message.error('请填写完整信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      const { data } = this.state;
      // const { onChange } = this.props;
      delete target.isNew;
      this.toggleEditable(e, key);
      // onChange(data);
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
        title: 'CC类型',
        dataIndex: 'server_name',
        key: 'server_name',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'server_name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC类型"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'CC企业名称',
        dataIndex: 'call_center_server_id',
        key: 'call_center_server_id',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'call_center_server_id', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC企业名称"
              />
            );
          }
          return text;
        },
      },

      {
        title: 'CC起始分机',
        dataIndex: 'start_extension',
        key: 'start_extension',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'start_extension', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC起始分机"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'CC结束分机',
        dataIndex: 'end_extension',
        key: 'end_extension',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'end_extension', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC结束分机"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'CC分机密码',
        dataIndex: 'extension_password',
        key: 'extension_password',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'extension_password', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC分机密码"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'CC坐席数量',
        dataIndex: 'seats_number',
        key: 'seats_number',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (

              // <Select 
              // placeholder="CC坐席数量"
              // value={text}
              // onChange={e => this.handleFieldChange(e, 'seats_number', record.key)}
              // style={{ width: '80%' }}
              // >
              //     {statusOptions}
              // </Select>
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'seats_number', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC坐席数量"
              />

            );
          }
 
          return text;
        },
      },
     
      {
        title: 'CC管理员用户名',
        dataIndex: 'manager_name',
        key: 'manager_name',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'manager_name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC管理员用户名"
              />
            );
          }
          return text;
        },
      },
    
      {
        title: 'CC管理员密码',
        dataIndex: 'manager_password',
        key: 'manager_password',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'manager_password', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC管理员密码"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'CC操作员用户名',
        dataIndex: 'operator_name',
        key: 'operator_name',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'operator_name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC操作员用户名"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'CC操作员密码',
        dataIndex: 'operator_password',
        key: 'operator_password',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'operator_password', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC操作员密码"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'CC坐席用户名',
        dataIndex: 'seats_name',
        key: 'seats_name',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'seats_name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="CC坐席用户名"
              />
            );
          }
          return text;
        },
      },
      {
        title: 'CC坐席密码',
        dataIndex: 'seats_password',
        key: 'seats_password',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'seats_password', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="cc坐席密码"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
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

    const data = [
      {
        server_name:'cc81',
        call_center_server_id:'乐联',
        start_extension:'30',
        end_extension:'20',
        extension_password:'222',
        seats_number:'20',
        manager_name:'ni',
        manager_password:'6985',
        operator_name:'hao',
        operator_password:'8888',
        seats_name:'20',
        seats_password:'9999',       
      }
    ]

    const { loading,  pagination } = this.state;
    const {
     
      rowKey
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
          dataSource={this.state.data}
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
          新增服务器信息
        </Button>
      </Fragment>
    );
  }
}
