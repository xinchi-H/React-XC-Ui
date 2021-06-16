import * as React from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './tree.scss'

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface Props {
  sourceData: SourceDataItem[]
}


const sc = scopedClassMaker('xc-tree');

const x = (item: SourceDataItem, level = 1) => {
  return <div key={item.value}
              className={sc({
                ['level-' + level]: true,
                'item': true,
              })}>
    <div className={sc('text')}>
      {item.text}  
    </div>
    {item.children?.map(sub => {
      return x(sub, level +1);
    })}
  </div>;
}

const Tree: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return x(item);
      })}
    </div>
  )
}
export default Tree;