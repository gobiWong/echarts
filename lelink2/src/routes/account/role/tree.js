import { Tree } from 'antd';
const { TreeNode } = Tree;

// const treeData = [{
//     title: '设备管理',
//     key: '0-0',
//     children: [
//       {
//         title: '设备列表',
//         key: '0-0-0',
//         children: [
//             { title: '新增', key: '0-0-0-0' },
//             { title: '删除', key: '0-0-0-1' },
//             { title: '修改', key: '0-0-0-2' },
//             { title: '查询', key: '0-0-0-3' },
//         ],
//       },
//       {
//         title: '设备跟进',
//         key: '0-0-1',
//         children: [
//             { title: '新增', key: '0-0-1-0' },
//             { title: '删除', key: '0-0-1-1' },
//             { title: '修改', key: '0-0-1-2' },
//             { title: '查询', key: '0-0-1-3' },
//         ],
//       },
      
//    ],
//   }];
  
  export default class Roletree extends React.Component {
    state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
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
  
    renderTreeNodes = treeData => treeData.map((item) => {
      console.log(item);
      if (item) {
        return (
          <TreeNode title={item.menu_name} key={item.menu_id} dataRef={item.menu_name}>
            {this.renderTreeNodes(item)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
    render() {
      const { permissionData } = this.props;
      const treeData = new Array();
      for (let i in permissionData) {
        treeData.push(permissionData[i])
      }
      // console.log(treeData);
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