export const fetchManager = (req, res) => {
  res.json(
      {
          ResponseState: 'success',
          ResponseCode: '',
          ResponseMessage: '',
          Data:{
              managerInfo:{
                  data: [
                      {
                          key:'1',
                          sort: '1',
                          manager_id: '1',
                          manager_name: '个人信息',
                          manager_code:'1',
                          manager_role: '是',
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
  fetchManager,
};