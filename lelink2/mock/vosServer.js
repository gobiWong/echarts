export const fetchVos = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                vosServerInfo:{
                    data: [
                        {
                            vos_server_id: '1',

                            server_name: 'VOS1号服务',
                            web_login_address: 'http://ttt.com',
                            api_address: 'http://ddd.com/ddd',
                            sip_port:'8888',
                            note: '这是备注信息',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00'
                        },
                        {
                            vos_server_id: '2',
                            server_name: 'VOS1号服务',
                            web_login_address: 'http://ttt.com',
                            api_address: 'http://ddd.com/ddd',
                            sip_port:'8888',
                            note: '这是备注信息',
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
    fetchVos,
};