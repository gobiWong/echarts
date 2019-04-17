export const fetchMenu = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                menuInfo:{
                    data: [
                        {
                            menu_id: '1',
                            sort: '1',
                            menu_name: '个人信息',
                            is_rootMenu: 'open',
                            rooting:'menu',
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
    fetchMenu,
};