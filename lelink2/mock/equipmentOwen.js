export const fetchOwen = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                equipmentOwenInfo:{
                    data: [
                        {
                            equipment_attribution_id: '1',
                            equipment_attribution:'乐联',
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
    fetchOwen,
};