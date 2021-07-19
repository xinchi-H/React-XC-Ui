import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './citySelect.scss';
import { scopedClassMaker } from '../helpers/classes';

interface Props {

}

const sc = scopedClassMaker('xc-city-select');

const CitySelect: React.FunctionComponent<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const onClick = () => {
    setDialogVisible(true);
  };

  return (
    <>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog onClose={() => setDialogVisible(false)} />}
    </>
  )
};

const Dialog: React.FunctionComponent<{onClose: ()=> void}> = (props) => {
  return ReactDOM.createPortal((
    <div
      className={sc('dialog')}
      onClick={props.onClose}
    >
      弹出内容
    </div>
  ), document.body);
}

export default CitySelect;