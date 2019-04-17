export const fetchFollow = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                followInfo:{
                    data: [
                        {
                            company_operate_follow_record_id: '1',
                            sort: '1',
                            user_id: 'hd',
                            company_id:'乐联',
                            origin_content: '这是原始备注信息',
                            current_content: '这是当前备注信息',
                            record_from: 'artificial',
                            created_at: '2018-09-18 16:09:00',
                            updated_at: '2018-09-18 16:09:00'
                        },
                        {
                            company_operate_follow_record_id: '2',
                            sort: '2',
                            user_id: 'hd',
                            company_id:'乐联',
                            origin_content: '这是原始备注信息',
                            current_content: '这是当前备注信息',
                            record_from: 'artificial',
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
    fetchFollow,
};