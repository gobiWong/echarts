export const fetchMessage = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                messageInfo:{
                    data: [
                        {
                            sm_server_id: '1',
                            server_name: '短信平台',
                            web_login_address: 'http://vip.illcc.cc',
                            api_address: 'http://vip.illcc.ccdd',
                            note: '备注信息',
                            server_type: 'open',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00',
                        },
                        {
                            sm_server_id: '2',
                            server_name: '短信平台',
                            web_login_address: 'http://vip.illcc.cc',
                            api_address: 'http://vip.illcc.ccdd',
                            note: '备注信息',
                            server_type: 'open',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00',
                        }
                       
                    ],
                    total: 1
                }
            }

        }
    )
}

export default {
    fetchMessage,
};