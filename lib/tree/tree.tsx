import * as React from 'react';

interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

interface Props {
  sourceData: SourceDataItem[]
}

const Tree: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return <div key={item.value}>{item.text}
          {item.children?.map(item2 => {
            return <div key={item2.value}>{item2.text}</div>
          })}
        </div>
      })}
    </div>
  )
}
export default Tree;