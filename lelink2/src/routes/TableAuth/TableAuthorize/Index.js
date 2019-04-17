import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Button,
  Checkbox,
} from 'antd';


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { tables, table_fields } from '../../../utils/table';

import styles from './Index.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;


const CreateForm = Form.create()(props => {
    const { form, tableRoles, handleTableNameChange, handleTableRoleChange, handleTableAuthSubmit, tableFieldOptions, defaultFields } = props;

    //获取所有角色
    const tableRolesOptions = tableRoles.map( item => {
        return <Option key={item.table_role_id}>{item.role_name}</Option>
    });

    //获取所有列表名
    const tableNameOptions = Object.keys(tables).map( (item, index) => {
        return <Option key={tables[item].key}>{tables[item].name}</Option>
    });


    //获取列表下所有的字段
    const onTableNameChange = (tableName) => {
        handleTableNameChange(tableName);
    }

    //角色改变时
    const onTableRoleChange = (tableRole) => {
        handleTableRoleChange(tableRole);
    }

    //表单提交
    const handleSubmit = e => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              handleTableAuthSubmit(values, form);
          }
        });
    };


    return (
        <Form onSubmit={handleSubmit} hideRequiredMark >
            <Row type="flex" justify="start" gutter={2}>
                <Col span={6}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="列表">
                    {form.getFieldDecorator('tableName', {
                        initialValue: '',
                        validateFirst: true,
                        rules: [{ required: true, message: '请选择列表' }],
                    })(<Select 
                        style={{ width: 130 }}
                        onChange={onTableNameChange}
                        placeholder="请选择列表"
                        >
                        {tableNameOptions}
                    </Select>)}
                </FormItem>
                </Col>
                <Col span={6}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
                    {form.getFieldDecorator('tableRole', {
                        initialValue: '',
                        validateFirst: true,
                        rules: [{ required: true, message: '请选择列表角色' }],
                    })(<Select 
                        style={{ width: 130 }}
                        onChange={onTableRoleChange}
                        placeholder="请选择角色"
                        >
                        {tableRolesOptions}
                    </Select>)}
                </FormItem>
                </Col>
            </Row>

            <Row type="flex" justify="start" gutter={2}>
                <Col span={24}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                    {form.getFieldDecorator('tableFields', {
                        initialValue: defaultFields,
                        validateFirst: true,
                        rules: [{ required: true, message: '请选择列表字段' }],
                    })(<CheckboxGroup options={tableFieldOptions} />)}
                </FormItem>
                </Col>
            </Row>
        

            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    保存
                </Button>
            </FormItem>
        </Form>
    )

})



  @connect(({ tableauthorize, loading }) => ({
    tableauthorize,
    loading: loading.models.tableauthorize,
  }))


  @Form.create()
  export default class TableAuthorize extends PureComponent {

     state = {
        tableFieldOptions: [],
        defaultFields: [],
        tableName: '',
        tableRole: '',
        tableFields: [],
     }


     componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'tableauthorize/fetchRole',
          payload: {},
        });
      }



      //根据表名显示对应字段
      handleTableNameChange = (tableName) => {

        if(table_fields[tableName]){

            //复选框
            const tableFieldOptions = Object.keys(table_fields[tableName]).map( (item, index) => {
                return {label: table_fields[tableName][item].name, value: table_fields[tableName][item].key};
            });
            this.setState({
                tableName: tableName,
                tableFieldOptions: tableFieldOptions,
            });

            if(this.state.tableRole && this.state.tableRole != ''){
                const { dispatch } = this.props;
    
                const params = {
                    tableName: tableName,
                    tableRole: this.state.tableRole
                };
                dispatch({
                    type: 'tableauthorize/fetchField',
                    payload: params,
                    callback: (result) => {
                        this.setState({
                            defaultFields: result.defaultFields
                        })
                    },
                });
            }


        }else{
            this.setState({
                tableFieldOptions: [],
            })
        }

      }


      //角色改变时
      handleTableRoleChange = (tableRole) => {

        if(this.state.tableName && this.state.tableName != ''){
            const { dispatch } = this.props;

            const params = {
                tableName: this.state.tableName,
                tableRole: tableRole
            };
            dispatch({
                type: 'tableauthorize/fetchField',
                payload: params,
                callback: (result) => {
                    if(result.defaultFields){
                        //对字段进行过滤
                        const fields = table_fields[this.state.tableName];
                        const defaultFields = result.defaultFields.filter( item => {
                            if(fields[item]) return true;
                        });
                        this.setState({
                            defaultFields: defaultFields
                        })
                    }
                },
            });
        }

      }


      //列表字段域授权
      handleTableAuthSubmit = (formFields, form) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tableauthorize/submit',
            payload: formFields,
            callback: () => {
                
            },
        });
      }


      render() {

        const {
            tableauthorize: { data },
            loading,
          } = this.props;
          
        const { tableFieldOptions, defaultFields } = this.state;


        const handleMethods = {
            handleTableNameChange: this.handleTableNameChange,
            handleTableRoleChange: this.handleTableRoleChange,
            handleTableAuthSubmit: this.handleTableAuthSubmit,
        }


        return (

            <PageHeaderLayout title="列表授权">
            <Card bordered={false}>
                <CreateForm  {...handleMethods} tableFieldOptions={tableFieldOptions} tableRoles={data.tableRoles} defaultFields={defaultFields} />
            </Card>
            </PageHeaderLayout>

        )

      }

  }
