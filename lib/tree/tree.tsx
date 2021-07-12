import * as React from 'react';
import TreeItem from './tree-item';
import './tree.scss'

const Tree: React.FunctionComponent<TreeProps> = (props) => {
  const onItemChange = (values: string[] | string) => {
    console.log(values);
    
    if(props.multiple) {
      props.onChange(values as string[]);
    } else {
      props.onChange(values as string);
    }
  };
  return (
    <div className="xc-tree">
      {props.sourceData.map(item =>
        <TreeItem
          key={item.value}
          treeProps={props}
          item={item}
          level={1}
          onItemChange={onItemChange}
        />
      )}
    </div>
  )
}
export default Tree;