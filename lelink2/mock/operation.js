export const fetchOperation = (req, res) => {
    res.json(
        {
            ResponseState: 'success',
            ResponseCode: '',
            ResponseMessage: '',
            Data:{
                operationInfo:{
                    data: [
                        {   
                            operation_id: '1',
                            operation_name: '查看',
                            operation_code: 'search',
                            request_url: 'https://192.198.88.136/operation',
                            request_moth: 'post',
                        }
                    ],
                    total: 1
                }
            }

        }
        )
}

export default {
    fetchOperation,
};