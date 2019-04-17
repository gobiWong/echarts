export const fetchType = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                equipmentTypeInfo:{
                    data: [
                        {
                            equipment_type_id: '1',
                            equipment_name:'8c',
                            equipment_type:'卡机',
                            equipment_brand:'融科',
                            note:'这是备注信息',
                            created_at:'2018-09-27  09:25:00',
                            updated_at:'2018-09-27  09:25:00',
                        },
                       
                    ],
                    total: 1
                }
            }

        }
        )
}

export default {
    fetchType,
};