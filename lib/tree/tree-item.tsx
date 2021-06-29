import * as React from 'react';
import { ChangeEventHandler, useRef, useState } from 'react';
import useUpdate from '../hooks/useUpdate';
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

  const childrenDivRef = useRef<HTMLDivElement>(null);

  useUpdate(expanded, () => {
    if (!childrenDivRef.current) {return;}
    if (expanded) {
      childrenDivRef.current.style.position = 'absolute';
      childrenDivRef.current.style.opacity = '0';
      childrenDivRef.current.style.height = 'auto';
      const {height} = childrenDivRef.current.getBoundingClientRect();
      childrenDivRef.current.style.position = '';
      childrenDivRef.current.style.opacity = '';
      childrenDivRef.current.style.height = '0px';
      childrenDivRef.current.getBoundingClientRect();
      childrenDivRef.current.style.height = height + 'px';
      const afterExpand = () => {
        if (!childrenDivRef.current) {return;}
        childrenDivRef.current.classList.remove('xc-tree-children-gone')
        childrenDivRef.current.style.height = '';
        childrenDivRef.current.classList.add('xc-tree-children-present');
        childrenDivRef.current.removeEventListener('transitionend', afterExpand);
      };
      childrenDivRef.current.addEventListener('transitionend', afterExpand);
    } else {
      const {height} = childrenDivRef.current.getBoundingClientRect();
      childrenDivRef.current.style.height = height + 'px';
      childrenDivRef.current.getBoundingClientRect();
      childrenDivRef.current.style.height = '0px';
      const afterCollapse = () => {
        if (!childrenDivRef.current) {return;}
        childrenDivRef.current.classList.remove('xc-tree-children-present')
        childrenDivRef.current.style.height = '';
        childrenDivRef.current.classList.add('xc-tree-children-gone');
        childrenDivRef.current.removeEventListener('transitionend', afterCollapse);
      };
      childrenDivRef.current.addEventListener('transitionend', afterCollapse);
    }
  });

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
    <div ref={childrenDivRef} className={sc('children')}>
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