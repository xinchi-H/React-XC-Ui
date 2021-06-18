import * as React from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

export interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface Props {
  sourceData: SourceDataItem[];
  selectedValues: string[];
  onChange: (item: SourceDataItem, bool: boolean) => void;
}

const sc = scopedClassMaker('xc-tree');

const renderItem = (
    item: SourceDataItem,
    selectedValues: string[],
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
        checked={selectedValues.includes(item.value)}
      />
      {item.text}
    </div>
    {item.children?.map(sub => {
      return renderItem(sub, selectedValues, onChange, level +1);
    })}
  </div>;
}

const Tree: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return renderItem(item, props.selectedValues, props.onChange);
      })}
    </div>
  )
}
export default Tree;