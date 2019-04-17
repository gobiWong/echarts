import { Tree } from 'antd';

const { TreeNode } = Tree;

const treeData = [{
    title: '一级菜单',
    key: '0-0',
    children: [{
      title: '二级菜单',
      key: '0-0-0',
      children: [
        { title: '新增', key: '0-0-0-0' },
        { title: '删除', key: '0-0-0-1' },
        { title: '修改', key: '0-0-0-2' },
        { title: '查询', key: '0-0-0-2' },
      ],
    }, ],
  }];
  
  export default class Roletree extends React.Component {
    state = {
      expandedKeys: ['二级菜单'],
      autoExpandParent: true,
      checkedKeys: ['二级菜单'],
      selectedKeys: [],
    }
  
    onExpand = (expandedKeys) => {
      console.log('onExpand', expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.setState({
        expandedKeys,
        autoExpandParent: false,
      });
    }
  
    onCheck = (checkedKeys) => {
      console.log('onCheck', checkedKeys);
      this.setState({ checkedKeys });
    }
  
    onSelect = (selectedKeys, info) => {
      console.log('onSelect', info);
      this.setState({ selectedKeys });
    }
  
    renderTreeNodes = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    })
  
    render() {
      return (
        <Tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
      );
    }
  }