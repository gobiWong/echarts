import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, Select, message, Popconfirm, Divider, Badge } from 'antd';
import styles from './Index.less';
import { regex } from '../../../utils/regex';


export default class TableForm extends PureComponent {
 
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);
    
    this.state = {
      data: props.value,
      loading: false,
    };
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
  getRowByKey(operate_id, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.operate_id === operate_id)[0];
  }

  //编辑
  toggleEditable = (e, operate_id) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(operate_id, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        console.log(!target.editable)
        this.cacheOriginData[operate_id] = { ...target };
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
      operate_id: `NEW_OPERATE_ID_${this.index}`,
      operate_name: '',
      operate_code: '',
      request_url: '',
      request_mode: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  //删除行
  remove(operate_id) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.operate_id !== operate_id);
    this.setState({ data: newData });
    onChange(newData);
    
  }

  //回车操作
  handleKeyPress(e, operate_id) {
    if (e.key === 'Enter') {
      this.saveRow(e, operate_id);
    }
  }

  //输入域改变
  handleFieldChange(e, fieldName, operate_id) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(operate_id, newData);
    
    if (target) {
      if(fieldName == 'operate_id'){
        target[fieldName] = e;
      }else{
        target[fieldName] = e.target.value;
      }
      
      this.setState({ data: newData });
    }
  }

  //保存行信息
  saveRow(e, operate_id) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(operate_id) || {};
      // console.log(target);
      if (!target.operate_name || !target.operate_code) {
        message.error('请填写完整信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, operate_id);
      const { data } = this.state;
      const { onChange } = this.props;
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  //取消编辑
  cancel(e, operate_id) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(operate_id, newData);
    if (this.cacheOriginData[operate_id]) {
      Object.assign(target, this.cacheOriginData[operate_id]);
      delete this.cacheOriginData[operate_id];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {

    const columns = [
      {
        title: '操作名称',
        dataIndex: 'operate_name',
        key: 'operate_name',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'operate_name', record.operate_id)}
                onKeyPress={e => this.handleKeyPress(e, record.operate_id)}
                placeholder="操作名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作代码',
        dataIndex: 'operate_code',
        key: 'operate_code',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'operate_code', record.operate_id)}
                onKeyPress={e => this.handleKeyPress(e, record.operate_id)}
                placeholder="操作代码"
              />
            );
          }
          return text;
        },
      },
      {
        title: '请求路径',
        dataIndex: 'request_url',
        key: 'request_url',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'request_url', record.operate_id)}
                onKeyPress={e => this.handleKeyPress(e, record.operate_id)}
                placeholder="请求路径"
              />
            );
          }
          return text;
        },
      },
      {
        title: '请求方式',
        dataIndex: 'request_mode',
        key: 'request_mode',
        width: 150,
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'request_mode', record.operate_id)}
                onKeyPress={e => this.handleKeyPress(e, record.operate_id)}
                placeholder="请求方式"
              />
            );
          }
          return text;
        },
      },

      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.operate_id)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.operate_id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.operate_id)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.operate_id)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.operate_id)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.operate_id)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
    const { data,loading} =this.state;

    const {
      rowKey,
     
    } = this.props;
 

    return (
      <Fragment>
        <Table
          rowKey={'operate_id'}
          loading={loading}
          columns={columns}
          dataSource={data}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
          bordered
          size= 'small'
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增操作按钮
        </Button>
      </Fragment>
    );
  }
}
