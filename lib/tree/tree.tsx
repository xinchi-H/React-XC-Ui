import * as React from 'react';
import { ChangeEventHandler, useState } from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

export interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

type Props = {
    sourceData: SourceDataItem[];
  } & (
    {
      selected: string[],
      onChange: (newSelected: string[]) => void;
      multiple: true,
    } | {
      selected: string,
      onChange: (newSelected: string) => void;
      multiple?: false,
    }
  );

const sc = scopedClassMaker('xc-tree');

const Tree: React.FunctionComponent<Props> = (props) => {

  const renderItem = (item: SourceDataItem, level = 1) => {

    const checked = props.multiple ?
      props.selected.includes(item.value) :
      props.selected === item.value;

    const onChange: ChangeEventHandler = (e) => {
      if(props.multiple) {
        if((e.target as HTMLInputElement).checked) {
          props.onChange([...props.selected, item.value]);
        } else {
          props.onChange(props.selected.filter(value => value !== item.value));
        }
      } else {
        props.onChange(item.value);
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
        {item.children?.map(sub => renderItem(sub, level +1))}
      </div>
    </div>;
  }

  return (
    <div>
      {props.sourceData.map(item => {
        return renderItem(item);
      })}
    </div>
  )
}
export default Tree;