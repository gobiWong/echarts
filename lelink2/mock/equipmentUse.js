export const fetchUse = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                equipmentInfo:{
                    data: [
                        {
                            equipmentUse_id: '1',
                            // equipment_name: '8s',
                            equipment_use: '房产',                            
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00',
                            note: '这是备注信息',
                        },
                        {
                            equipmentUse_id: '2',
                            // equipment_name: '8s',
                            equipment_use: '房产',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00',
                            note: '这是备注信息',
                        },
                    ],
                    total: 1
                }
            }

        }
        )
}

export default {
    fetchUse,
};