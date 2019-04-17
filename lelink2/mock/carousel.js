export const carousel = (req, res) => {
    res.json(
        {data :[{
            name: '乐',
            age: 22,
            key: '1',
            style:"background-color:red",
          }, {
            name: '恋',
            age: 33,
            key: '2',
            style:"background-color:green",
          }, {
            name: '通',
            age: 44,
            key: '3',
            style:"background-color:blue",
          },{
            name: '信',
            age: 45,
            key: '4',
            style:"background-color:red",
          }]}
        )
}

export default {
    carousel
};