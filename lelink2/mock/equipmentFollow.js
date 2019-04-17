export const fetchequipmentFollow = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                equipmentFollowInfo:{
                    data: [
                        {
                            equipment_operate_follow_record_id: '1',
                            sort: '1',
                            user_id: '李四',
                            serial_number:'657954',
                            origin_content: '这是原始备注信息',
                            current_content: '这是当前备注信息',
                            record_from: 'system',
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
    fetchequipmentFollow,
};