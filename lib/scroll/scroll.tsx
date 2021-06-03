import * as React from 'react';
import {HTMLAttributes, UIEventHandler, useEffect, useRef, useState} from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './scroll.scss'
import scrollbarWidth from './scrollbar-width';

interface Props extends HTMLAttributes<HTMLElement> {}

const sc = scopedClassMaker('xc-scroll');

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...restProps} = props;
  const [barHeight, setBarHeight] = useState(0);
  const onScroll: UIEventHandler = (e) => {};
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollHeight = containerRef.current!.scrollHeight;
    const viewHeight = containerRef.current!.getBoundingClientRect().height;
    setBarHeight(viewHeight * viewHeight / scrollHeight);
  }, []);
  return (
    <div className={sc('')} {...restProps}>
      <div
        className={sc('inner')}
        style={{right: -scrollbarWidth()}}
        ref={containerRef}
        onScroll={onScroll}
      >
        {children}
      </div>
      <div className={sc('track')}>
        <div className={sc('bar')} style={{height: barHeight}} />
      </div>
    </div>
  )
}
export default Scroll;