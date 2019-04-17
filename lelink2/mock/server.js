export const fetchServer = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                serverInfo:{
                    data: [
                        {
                            subsystem_server_id: '1',
                            server_name: 'cc80',
                            web_login_address: 'http://ttt.com',
                            api_address: 'http://ddd.com/ddd',
                            note: '这是备注信息',
                            api_support:'open',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00'
                        },
                        {
                            subsystem_server_id: '2',
                            server_name: 'cc80',
                            web_login_address: 'http://ttt.com',
                            api_address: 'http://ddd.com/ddd',
                            note: '这是备注信息',
                            api_support:'close',
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
    fetchServer,
};