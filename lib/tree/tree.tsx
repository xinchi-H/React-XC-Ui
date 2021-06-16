import * as React from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface Props {
  sourceData: SourceDataItem[];
  selectedValues: string[];
}


const sc = scopedClassMaker('xc-tree');

const renderItem = (item: SourceDataItem, selectedValues: string[], level = 1) => {
  return <div key={item.value}
              className={sc({
                ['level-' + level]: true,
                'item': true,
              })}>
    <div className={sc('text')}>
      <input type="checkbox" checked={selectedValues.indexOf(item.value) >= 0} />
      {item.text}
    </div>
    {item.children?.map(sub => {
      return renderItem(sub, selectedValues, level +1);
    })}
  </div>;
}

const Tree: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return renderItem(item, props.selectedValues);
      })}
    </div>
  )
}
export default Tree;