import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './citySelect.scss';
import { scopedClassMaker } from '../helpers/classes';
import pinyin from 'tiny-pinyin';

console.log(pinyin);

interface Props {
  dataSource: string[]
}

interface Context {
  map: { [key: string]: string[] }
}

const sc = scopedClassMaker('xc-city-select');

const CitySelectContext = createContext<Context>({map: {}});

const CitySelect: React.FunctionComponent<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(true);
  const map: Context['map'] = {};

  props.dataSource.map((city) => {
    const py = pinyin.convertToPinyin(city);
    const index = py[0];
    map[index] = map[index] || [];
    map[index].push(city);
  })
  
  const onClick = () => {
    setDialogVisible(true);
  };

  return (
    <CitySelectContext.Provider value={{map}}>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog onClose={() => setDialogVisible(false)} />}
    </CitySelectContext.Provider>
  )
};

const Dialog: React.FunctionComponent<{onClose: ()=> void}> = (props) => {
  const {map} = useContext(CitySelectContext);
  const indexList = Object.keys(map).sort();
  
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
      <ol className={sc('index')}>
        {indexList.map(a => <li key={a}>{a}</li>)}
      </ol>
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