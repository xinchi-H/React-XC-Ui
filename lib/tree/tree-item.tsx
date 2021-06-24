import * as React from 'react';
import { ChangeEventHandler, useState } from 'react';
import { scopedClassMaker } from '../helpers/classes';

interface Props {
  item: SourceDataItem;
  level: number;
  treeProps: TreeProps;
}

const sc = scopedClassMaker('xc-tree');

const TreeItem: React.FunctionComponent<Props> = (props) => {
  const {item, level, treeProps} = props;
  const checked = treeProps.multiple ?
    treeProps.selected.includes(item.value) :
    treeProps.selected === item.value;

  const onChange: ChangeEventHandler = (e) => {
    if(treeProps.multiple) {
      if((e.target as HTMLInputElement).checked) {
        treeProps.onChange([...treeProps.selected, item.value]);
      } else {
        treeProps.onChange(treeProps.selected.filter(value => value !== item.value));
      }
    } else {
      if ((e.target as HTMLInputElement).checked) {
        treeProps.onChange(item.value);
      } else {
        treeProps.onChange('');
      }
    }
  };

  const [expanded, setExpanded] = useState(true);

  const expand = () => {
    setExpanded(true);
  };

  const collapse = () => {
    setExpanded(false);
  };

  return <div key={item.value}
              className={sc({
                ['level-' + level]: true,
                'item': true,
              })}>
    <div className={sc('text')}>
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      {item.text}
      {item.children && 
        <span>
          { expanded ?
              <span onClick={collapse}>-</span> :
              <span onClick={expand}>+</span>
          }
          
          
        </span>
      }
    </div>
    <div className={sc({children: true, collapsed: !expanded})}>
      {item.children?.map(sub =>        
        <TreeItem
          key={sub.value}
          treeProps={treeProps}
          item={sub}
          level={level + 1}
        />
      )}
    </div>
  </div>;
}

export default TreeItem;