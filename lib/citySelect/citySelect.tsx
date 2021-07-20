import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './citySelect.scss';
import { scopedClassMaker } from '../helpers/classes';

interface Props {

}

const sc = scopedClassMaker('xc-city-select');

const CitySelect: React.FunctionComponent<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(true);
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
      <header>
        <span className={sc('icon')}>&lt;</span>
        <span>选择城市</span>
      </header>
      <CurrentCity />
      <h2>全部城市</h2>
      <div className="cityIndex">ABCD....</div>
      <div className="cityList">所有城市</div>
    </div>
  ), document.body);
}

const CurrentCity: React.FunctionComponent = () => {
  const [city, setCity] = useState('加载中...')
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'http://ip-api.com/json/?lang=zh-CN')
    xhr.onload = () => {
      const string = xhr.responseText;
      const obj = JSON.parse(string);
      const cityInfo = obj.city;
      setCity(cityInfo);
    }
    xhr.onerror = () => {
      setCity('未知');
    }
    xhr.send();
  }, []);

  return (
    <div className="currentCity">
      当前城市：{city}
    </div>
  )
}

export default CitySelect;