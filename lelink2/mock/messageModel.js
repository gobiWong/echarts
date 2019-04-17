export const fetchMessageModel = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                messageModelInfo:{
                    data: [
                        {
                            messageModel_id: '1',
                            sort: '1',
                            code: '1',
                            content:'尊敬的XX客户您好，您于2018-10-30号已消费2万，账户余额不足，请您及时充值，以免影响您的正常工作',
                            status: 'open',
                            // note: '备注',
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
    fetchMessageModel,
};