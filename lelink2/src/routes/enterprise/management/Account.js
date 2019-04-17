import React, { PureComponent} from 'react';

import {Tabs,Button} from 'antd';

import {CopyToClipboard} from 'react-copy-to-clipboard';
const TabPane = Tabs.TabPane;

export default class Account extends PureComponent {
   
    state = {value: '公司名称：银好兴1\n公司代码：0268', copied: false};

    handleChange = ({target: {value}}) => {
        this.setState({value, copied: false});
      };
    
      handleClick = ({target: {innerHTML}}) => {
        console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
      };
    
      onCopy = () => {
        this.setState({copied: true});
      };

    
      render() {
        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab="管理员登录信息" key="1">
                <section className="section">
                  <textarea onChange={ this.handleChange} rows={10} cols={48} value={this.state.value} />
                </section>
                <CopyToClipboard 
                   onCopy={this.onCopy} 
                   text={this.state.value}>
                <Button style={{marginBottom:10}} onClick={this. handleClick}>复制</Button>
                </CopyToClipboard>
                </TabPane>
                <TabPane tab="客户信息" key="2">
                <section className="section">
                  <textarea onChange={this.handleChange} rows={10} cols={48}   value={this.state.value}/>
                </section>
                <CopyToClipboard 
                   onCopy={this.onCopy} 
                   text={this.state.value}>
                <Button style={{marginBottom:10}} onClick={this. handleClick}>复制</Button>
                </CopyToClipboard>
                </TabPane>
            </Tabs>
        );
      }
    
      onChange = (checkedList) => {
        this.setState({
          checkedList,
          indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
          checkAll: checkedList.length === plainOptions.length,
        });
      }
    
      onCheckAllChange = (e) => {
        this.setState({
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
      }
}



