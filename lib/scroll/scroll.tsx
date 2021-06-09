import * as React from 'react';
import {HTMLAttributes, MouseEventHandler, UIEventHandler, useEffect, useRef, useState} from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './scroll.scss'
import scrollbarWidth from './scrollbar-width';

interface Props extends HTMLAttributes<HTMLElement> {}

const sc = scopedClassMaker('xc-scroll');

// const isTouchDevice: boolean = 'ontouchstart' in document.documentElement;

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...restProps} = props;
  const [barHeight, setBarHeight] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const [barTop, _setBarTop] = useState(0);
  const setBarTop = (number: number) => {
    if(number < 0) {return;}
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight;
    if(number > maxBarTop) {return}
    _setBarTop(number);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const timerIdRef = useRef<number | null>(null);
  const onScroll: UIEventHandler = (e) => {
    setBarVisible(true);
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const scrollTop =  current!.scrollTop;
    setBarTop(scrollTop * viewHeight / scrollHeight);
    if(timerIdRef.current !== null) {
      window.clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = window.setTimeout(() => {
      setBarVisible(false);
    }, 300)
  };
  useEffect(() => {
    const scrollHeight = containerRef.current!.scrollHeight;
    const viewHeight = containerRef.current!.getBoundingClientRect().height;
    setBarHeight(viewHeight * viewHeight / scrollHeight);
  }, []);
  const draggingRef = useRef(false);
  const firstYRef = useRef(0);
  const firstBarTopRef = useRef(0);
  const onMouseDownBar: MouseEventHandler = (e) => {
    draggingRef.current = true;
    console.log('start');
    firstYRef.current = e.clientY;
    firstBarTopRef.current = barTop
  };
  const onMouseMoveBar = (e: MouseEvent) => {
    if(draggingRef.current) {
      console.log('移动bar');
      const delta = e.clientY - firstYRef.current;
      console.log(delta);
      const newBarTop = firstBarTopRef.current + delta;
      setBarTop(newBarTop);
      const scrollHeight = containerRef.current!.scrollHeight;
      const viewHeight = containerRef.current!.getBoundingClientRect().height;
      containerRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight;
    }
  };
  const onMouseUpBar = () => {
    draggingRef.current = false;
    console.log('end');
  };
  const onSelect = (e: Event) => {
    if(draggingRef.current) { e.preventDefault() }
  }
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMoveBar);
    document.addEventListener('mouseup', onMouseUpBar);
    document.addEventListener('selectstart', onSelect);
    return () => {
      document.removeEventListener('mousemove', onMouseMoveBar);
      document.removeEventListener('mouseup', onMouseUpBar);
      document.removeEventListener('selectstart', onSelect);
    }
  }, [])
  return (
    <div
      className={sc('')}
      {...restProps}
    >
      <div
        className={sc('inner')}
        style={{right: -scrollbarWidth()}}
        ref={containerRef}
        onScroll={onScroll}
      >
        {children}
      </div>
      {barVisible &&
        <div className={sc('track')}>
          <div
            className={sc('bar')}
            style={{height: barHeight, transform: `translateY(${barTop}px)`}}
            onMouseDown={onMouseDownBar}
          />
        </div>
      }
    </div>
  )
}
export default Scroll;