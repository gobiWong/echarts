export const fetchSystemsz = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                systemszInfo:{
                    data: [
                        {
                            systemsz_id: '1',
                            sort: '1',
                            enterprise_name: 'hd',
                            balance_warning:'乐联',
                            note: '这是备注信息',
                            balance_notice_times: '5',
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
    fetchSystemsz,
};