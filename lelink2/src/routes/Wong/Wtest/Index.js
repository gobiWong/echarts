import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Carousel, Card, Input, Button } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './Index.less'
//引入弹出层,弹出层直接当组件页面用
import CollectionsPage from './Popup/popup.js'
//routes相当页面,如何拿到数据呢?
//导入dva模块,用dva的connect方法可以拿到所有的 state,然后在页面获取需要的state.
//拿到数据之后,以 props的形式嵌入页面,就像操作props来对待这些数据即可
@connect(({ wtest}) => ({
  wtest,//①
  // loading: loading.models.wtest,//②
}))
export default class Wong extends PureComponent {
  //如何更新当前页面数据呢?
  //1.每一个组件实例this.props有dispatch()方法;
  //2.分发一个Action, Redux中的概念,找到页面对应的model,然后做出相应的处理;如下:
  componentDidMount() {
    //console.log(this.props)
    const {dispatch} = this.props
    dispatch({
      type:'wtest/fetchcarousel',
      payload: {
        count: 5,
      },
    })
  }
  render() {
    //把数据从this.props组件实例中解构出来
    console.log(this.props,999)
    const {wtest: { list,tmsg } } = this.props
    console.log(list,tmsg,"6666")
    // const ttitle = wmsg.tmsg.tname
   // const carousel=[...list]
    //打印数据可以看到models/wtest.js里面的假数据了
    //问题:为什么打印了三次?
    //console.log(wmsg)
    return (
      <PageHeaderLayout title='体贴'>
        <div className={styles.content}>
          <CollectionsPage></CollectionsPage>
          <Input></Input>
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div >
                <Carousel autoplay className={styles.wswiper}>
                {list.map((item,index)=>{return <div key={index}><h3>{item.name}</h3></div>})}
                  {/* <div><h3>2</h3></div>
                  <div><h3>3</h3></div>
                  <div><h3>4</h3></div> */}
                </Carousel>
              </div>
            </div>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  };
}
