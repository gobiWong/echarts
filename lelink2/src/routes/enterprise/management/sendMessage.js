import React, { PureComponent} from 'react';

import {Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['短信', '微信'];
const defaultChecked = '短信';

export default class Send extends PureComponent {

    state = {
        checkedList: defaultChecked,
        indeterminate: true,
        checkAll: false,
      };
    
      render() {
        return (
          <div>
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                全选
              </Checkbox>
            </div>
            <br />
            <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
          </div>
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



