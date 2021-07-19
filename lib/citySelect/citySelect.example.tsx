import * as React from 'react';
import CitySelect from './citySelect';

const CitySelectExample: React.FunctionComponent = () => {
  return (
    <div>
      <h2>第一个例子</h2>
      <CitySelect>
        选择城市
      </CitySelect>
    </div>
  )
}

export default CitySelectExample;