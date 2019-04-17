export const fetchUnified = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                unifiedInfo:{
                    data: [
                        {
                            unified_server_id: '1',
                            server_name: 'cc80',
                            web_login_address: 'http://ttt.com',
                            api_address: 'http://ddd.com/ddd',
                            note: '备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00'
                        },
                        {
                            unified_server_id: '2',
                            server_name: 'cc80',
                            web_login_address: 'http://ttt.com',
                            api_address: 'http://ddd.com/ddd',
                            note: '备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00'
                        },
                    ],
                    total: 1
                }
            }

        }
        )
}

export default {
    fetchUnified,
};