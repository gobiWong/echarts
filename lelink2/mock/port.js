export const fetchPort = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                portInfo:{
                    data: [
                        {
                            port_id: '1',
                            sort: '1',
                            port_address: 'api/port',
                            request_method:'GET',
                            server_name:'cc80',
                            operation: '乐联',
                            // note: '备注',
                            status:'open',
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
    fetchPort,
};