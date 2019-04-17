export const fetchMessagePort = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                messagePortInfo:{
                    data: [
                        {
                            messagePort_id: '1',
                            sort: '1',
                            user_account:'乐联通讯',
                            user_password:'123456',
                            user_id:'55',
                            port_address: 'api/port',
                            // request_method:'GET',
                            balance_address:'http://39.107.226.15:8088/sms.aspx?action=overage.',
                            server_name:'cc80',
                            operation: '乐联',
                            // note: '备注',
                            status:'open',
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
    fetchMessagePort,
};