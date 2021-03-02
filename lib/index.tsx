import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './icon';

const fn: React.MouseEventHandler = (e) => {
  console.log('fn')
  console.log(e.target);
}

ReactDOM.render(<div>
  <Icon
    name="wechat"
    className="wechat-icon"
    onClick={fn}
  />
</div>, document.querySelector('#root'));