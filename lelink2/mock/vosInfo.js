export const fetchVosInfo = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                vosInfo:{
                    data: [
                        {
                            key: '1',
                            vos_server_id:'vos1',
                            vos_account:'555',
                            balance:'555',
                            vos_telephone_password: '88',
                            vos_web_password:'66',
                            balance_query: "是",
                            balance_remind:'是',
                            balance_warning:'2',
                            balance_notice_times:'10',
                            balance_notice_way: '微信',
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
    fetchVosInfo,
};