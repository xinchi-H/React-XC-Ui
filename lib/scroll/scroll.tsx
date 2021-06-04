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
  const [barTop, setBarTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const onScroll: UIEventHandler = (e) => {
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const scrollTop =  current!.scrollTop;
    setBarTop(scrollTop * viewHeight / scrollHeight);
  };
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
        <div className={sc('bar')} style={{height: barHeight, transform: `translateY(${barTop}px)`}} />
      </div>
    </div>
  )
}
export default Scroll;