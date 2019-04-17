export const fetchBinding = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                bindingInfo:{
                    data: [
                        {
                            wechat_info_id: '1',
                            sort: '1',
                            wechat_open_id: '9815672',
                            company_id:'乐联通信',
                            wechat_code: '乐联',
                            note: '备注',
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
    fetchBinding,
};