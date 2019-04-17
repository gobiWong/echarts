export const fetchList = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                equipmentListInfo:{
                    data: [
                        {
                            equipment_id: '1',
                            sort:'1',
                            mac_address:'公司',
                            serial_number:'657954',
                            equipment_type_id:'卡机',
                            equipment_code:'9527',
                            equipemnt_location:'公司',
                            company_id:'乐联',
                            equipment_attribution_id:'乐联',
                            equipment_use_id:'信贷',
                            public_network_ip:'192.168.88.77',
                            ip_address:'192.168.88.789',
                            intranet_ip:'127.0.0.1',
                            note:'这是备注信息',
                            created_at:'2018-09-27  09:25:00',
                            updated_at:'2018-09-27  09:25:00',
                        },
                       
                    ],
                    total: 1,
                }
            }

        }
        )
}

export default {
    fetchList,
};