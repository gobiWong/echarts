export const fetchPosition = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                equipmentPositionInfo:{
                    data: [
                        {
                            equipemnt_location_id: '1',
                            sort:'1',
                            equipemnt_location:'乐联',
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
    fetchPosition,
};