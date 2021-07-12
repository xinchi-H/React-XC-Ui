import * as React from 'react';
import { ChangeEventHandler, useRef, useState } from 'react';
import useUpdate from '../hooks/useUpdate';
import { scopedClassMaker } from '../helpers/classes';

interface Props {
  item: SourceDataItem;
  level: number;
  onItemChange: (values: string[]) => void;
  treeProps: TreeProps;
}

const sc = scopedClassMaker('xc-tree');

const TreeItem: React.FunctionComponent<Props> = (props) => {
  const {item, level, treeProps} = props;

  const checked = treeProps.multiple ?
    treeProps.selected.includes(item.value) :
    treeProps.selected === item.value;

  function collectChildrenValues(item: SourceDataItem): any {
    return flatten(item.children?.map(i => [i.value, collectChildrenValues(i)]));
  };

  interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {};

  function flatten(array?: RecursiveArray<string>): string[] {
    if(!array) {return [];}
    return array.reduce<string[]>((result, current) => {
      return result.concat(typeof current === 'string' ? current : flatten(current))
    }, []);
  };

  const onChange: ChangeEventHandler = (e) => {
    if(treeProps.multiple) {
      const childrenValues = collectChildrenValues(item);
      if((e.target as HTMLInputElement).checked) {
        props.onItemChange([...treeProps.selected, item.value, ...childrenValues]);
      } else {
        props.onItemChange(treeProps.selected.filter(value =>
          value !== item.value && childrenValues.indexOf(value) === -1)
        );
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

  function intersect<T>(array1: T[], array2: T[]): T[]{
    const result: T[] = [];
    array1.forEach((i) => {
      if(array2.indexOf(i) >= 0) {
        result.push(i)
      }
    })
    return result;
  }

  const onItemChange = (values: string[]) => {
    const childrenValues = collectChildrenValues(item);
    const common = intersect(values, childrenValues);
    if(common.length !== 0) {
      props.onItemChange(Array.from(new Set(values.concat(item.value))));
      if(common.length === childrenValues.length) {
        inputRef.current!.indeterminate = false;
      } else {
        inputRef.current!.indeterminate = true;
      }
    } else {
      props.onItemChange(values.filter(v => v !== item.value));
      inputRef.current!.indeterminate = false;
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return <div key={item.value}
              className={sc({
                ['level-' + level]: true,
                'item': true,
              })}>
    <div className={sc('text')}>
      <input
        ref={inputRef}
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
    {item.children &&
      <div ref={childrenDivRef} className={sc({'children': true, 'children-present': true})}>
        {item.children?.map(sub =>
          <TreeItem
            key={sub.value}
            treeProps={treeProps}
            item={sub}
            level={level + 1}
            onItemChange={onItemChange}
          />
        )}
      </div>
    }
  </div>;
}

export default TreeItem;