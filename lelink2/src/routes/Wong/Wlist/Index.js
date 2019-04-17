import React, { PureComponent, Fragment } from 'react';
import { Button, Table } from 'antd'
import { connect } from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'
@connect(({ test_api, loading }) => ({
    test_api,
    loading: loading.models.test_api
}))
export default class Wlist extends PureComponent {
    componentDidMount() {
        console.log(this.props)
        const { dispatch } = this.props
        dispatch({
            type: 'test_api/test',
            payload: {
                "params": {
                    "menu_id": 2,
                    "operates": [
                        {
                            "operate_name": "查询管理员",
                            "operate_code": "www",
                            "request_url": "/api/user/fetchUser",
                            "request_mode": "post",
                        },
                    ]
                }
            }

        })
        //console.log(this.props)
    }

    render() {
        // const {
        //     wlist: { list },
        //     loading,
        //   } = this.props;
        // const dataSource = [...list]
        // console.log(list)
        const {test_api,loading}=this.props
        const {mineData}=test_api
        // console.log("1种写法",mineData)
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        }]

        return (
            <PageHeaderLayout>
                <div>
                    <Button>点我试试详情</Button>
                    <Table
                        bordered
                        // dataSource={dataSource}
                        columns={columns}
                        size="small" />
                </div>
            </PageHeaderLayout>
        )
    }
}