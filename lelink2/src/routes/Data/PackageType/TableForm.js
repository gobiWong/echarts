import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, Select, message, Popconfirm, Divider, Badge } from 'antd';
import styles from './Index.less';
import { regex } from '../../../utils/regex';
import { common_status, common_status_option, badge_status_map } from '../../../utils/status';

const { Option } = Select;

const statusOptions = common_status_option.map( item => {
  return <Option key={item.key}>{item.name}</Option>;
});

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
    this.props.onRef(this)
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
      package_name: '',
      package_code: '',
      package_desc: '',
      status: 'open',
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
      const newData = data.filter(item => item.key !== key);
      this.setState({ data: newData });
      onChange(newData);
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
      if (!target.package_name || !target.package_code) {
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
        title: '套餐名称',
        dataIndex: 'package_name',
        key: 'package_name',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'package_name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="套餐名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '套餐编号',
        dataIndex: 'package_code',
        key: 'package_code',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'package_code', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="套餐编号"
              />
            );
          }
          return text;
        },
      },
      {
        title: '套餐描述',
        dataIndex: 'package_desc',
        key: 'package_desc',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'package_desc', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="套餐描述"
              />
            );
          }
          return text;
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (

              <Select 
              placeholder="状态"
              value={text}
              onChange={e => this.handleFieldChange(e, 'status', record.key)}
              style={{ width: '80%' }}
              >
                  {statusOptions}
              </Select>

            );
          }
 
          return <Badge status={badge_status_map[text]} text={common_status[text]} />;
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

    const { loading, data, pagination } = this.state;
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
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增套餐类型
        </Button>
      </Fragment>
    );
  }
}
