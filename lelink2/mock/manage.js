export const fetchManage = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                manageInfo:{
                    data: [
                        { 
                            customer_information_id:'1',
                            company_id: '1',
                            sort: '1',                            
                            company_full_name: '京东',
                            company_short_name: 'JD',
                            company_code: '9527',
                            vos_server_id:['vos01','vos02'],
                            vos_account:['555','111'],
                            balance:['555','111'],
                            server_name:['cc80','cc81'],
                            start_extension:['222258','222258'],
                            seats_start_name:'58888',
                            contact_number: '1365978956',
                            company_address: '江苏南京',
                            contact_qq: '10000',
                            wechat:'59874562',
                            contact_email: '1000@qq.com',
                            note: '这是备注信息',
                            message_switch: 'open',
                            wechat_user_id: '123',
                            trader_user_id: '88',
                            operator_user_id: '66',
                            company_status: 'open',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00',
                            technical_group:'6',
                            vos_telephone_password: '88',
                            vos_web_password:'66',
                            balance_query: "是",
                            balance_remind:'是',
                            balance_warning:'2',
                            balance_notice_times:'10',
                            balance_notice_way: '微信',
                            call_center_server_id: '京东',
                            end_extension:'222668',
                            extension_password: "21066",
                            seats_number:'8',
                            user_id:'李强',
                            manager_name:'李想',
                            manager_password:'91027',
                            operator_password: '6688',
                            seats_name: '李好',
                            seats_password: '88668',
                            enterprise_name: '淘宝',
                            manager_password: "128",
                            operator_name:'老师',
                            operator_password:'668',
                            seats_start_name:'2366633',
                            seats_end_name:'2366643',
                            seats_password: '987',
                            platform_name: 'SMS001',
                            user_name: "乐联",
                            user_password:'123456',
                            balance:'100',
                            note:'这是备注',
                        },                       
                    ],
                    total: 1
                }
            }

        }
        )
}

export default {
    fetchManage,
};