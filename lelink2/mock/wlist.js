export const testBase = (req, res) => {
    res.json(
       {data :[{
            name: 'jjjc',
            age: 22,
            key: '1',
            address:"武汉",
          }, {
            name: 'scsa',
            age: 33,
            key: '2',
            address:"南京",
          }, {
            name: 'ererda',
            age: 44,
            key: '3',
            address:"上海",
          }]}
        )
}

export default {
    testBase
};