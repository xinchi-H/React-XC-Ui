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
      multiple?: false,
    }
  );

const sc = scopedClassMaker('xc-tree');

const Tree: React.FunctionComponent<Props> = (props) => {

  const renderItem = (item: SourceDataItem, level = 1) => {
    const checked = props.multiple ?
      props.selected.includes(item.value) :
      props.selected === item.value;

    return <div key={item.value}
                className={sc({
                  ['level-' + level]: true,
                  'item': true,
                })}>
      <div className={sc('text')}>
        <input
          type="checkbox"
          onChange={(e) => props.onChange(item, e.target.checked)}
          checked={checked}
        />
        {item.text}
      </div>
      {item.children?.map(sub => {
        return renderItem(sub, level +1);
      })}
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