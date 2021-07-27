import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './citySelect.scss';
import { scopedClassMaker } from '../helpers/classes';
import pinyin from 'tiny-pinyin';

console.log(pinyin);

interface Props {
  dataSource: string[];
  onChange: (p1: string) => void;
}

interface Context {
  map: { [key: string]: string[] };
  onChange: (p1: string) => void;
}

const sc = scopedClassMaker('xc-city-select');

const CitySelectContext = createContext<Context>({
  map: {}, onChange: (p1: string) => {}
});

const CitySelect: React.FunctionComponent<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(true);
  const map: Context['map'] = {};

  props.dataSource.map((city) => {
    const py = pinyin.convertToPinyin(city);
    const index = py[0];
    map[index] = map[index] || [];
    map[index].push(city);
  })

  return (
    <CitySelectContext.Provider value={{map, onChange: props.onChange}}>
      <div>{props.children}</div>
      {dialogVisible && <Dialog onClose={() => setDialogVisible(false)} />}
    </CitySelectContext.Provider>
  )
};

const Dialog: React.FunctionComponent<{onClose: ()=> void}> = (props) => {
  const {map, onChange} = useContext(CitySelectContext);
  const cityList = (Object.entries(map)
    .sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0)));
  const indexList = Object.keys(map).sort();

  const scrollIntoView  = (letter: string) => {
    document.querySelector(`[data-letter=${letter}]`)?.scrollIntoView();
  };

  const selectCity = (city: string) => {
    onChange(city);
  };
  
  return ReactDOM.createPortal((
    <div className={sc('dialog')}>
      <header>
        <span
          className={sc('icon')}
          onClick={props.onClose}
        >
          &lt;
        </span>
        <span>选择城市</span>
      </header> 
      <CurrentCity />
      <h2>全部城市</h2>
      <ol className={sc('index')}>
        {indexList.map(i => (
          <li
            key={i}
            onClick={() => scrollIntoView(i)}
          >
            {i}
          </li>
        ))}
      </ol>
      <div className="cityList">所有城市</div>
      {cityList.map(([letter, list]) => {
        return (
          <div key={letter} className={sc('city-section')}>
            <h4 data-letter={letter}>{letter}</h4>
            {list.map((city) =>
              <div
                className={sc('city-name')}
                key={city}
                onClick={() => selectCity(city)}
              >
                {city}
              </div>
            )}
          </div>
        );
      })}
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