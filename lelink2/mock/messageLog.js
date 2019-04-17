export const fetchMessageLog = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                messageLogInfo:{
                    data: [
                        {
                            messageLog_id: '1',
                            sort: '1',
                            enterprise_name: '乐联',
                            content:'尊敬的客户您好，您的充值账户余额不足，请您及时充值',
                            // server_name:'cc80',
                            operator_name: '李四',
                            send_value:'106',
                            submit_value:'ok',
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
    fetchMessageLog,
};