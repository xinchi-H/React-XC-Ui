import * as React from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

export interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

type Props = {
    sourceData: SourceDataItem[];
    onChange: (item: SourceDataItem, bool: boolean) => void;
  } & (
    {
      selected: string[],
      multiple: true,
    } | {
      selected: string,
      multiple: false,
    }
  );

const sc = scopedClassMaker('xc-tree');

const renderItem = (
    item: SourceDataItem,
    selected: string[],
    onChange: (item: SourceDataItem, bool: boolean) => void,
    level = 1
  ) => {
  return <div key={item.value}
              className={sc({
                ['level-' + level]: true,
                'item': true,
              })}>
    <div className={sc('text')}>
      <input
        type="checkbox"
        onChange={(e) => onChange(item, e.target.checked)}
        checked={selected.includes(item.value)}
      />
      {item.text}
    </div>
    {item.children?.map(sub => {
      return renderItem(sub, selected, onChange, level +1);
    })}
  </div>;
}

const Tree: React.FunctionComponent<Props> = (props) => {
  if(props.multiple) {
    return (
      <div>
        {props.sourceData.map(item => {
          return renderItem(item, props.selected, props.onChange);
        })}
      </div>
    )
  } else {
    return <div>111</div>
  }
}
export default Tree;