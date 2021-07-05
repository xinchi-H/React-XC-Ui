import * as React from 'react';
import TreeItem from './tree-item';
import './tree.scss'

const Tree: React.FunctionComponent<TreeProps> = (props) => {

  return (
    <div className="xc-tree">
      {props.sourceData.map(item =>
        <TreeItem
          key={item.value}
          treeProps={props}
          item={item}
          level={1}
        />
      )}
    </div>
  )
}
export default Tree;