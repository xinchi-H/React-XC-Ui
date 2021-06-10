import * as React from 'react';
import {HTMLAttributes, MouseEventHandler, TouchEventHandler, UIEventHandler, useEffect, useRef, useState} from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './scroll.scss'
import './pull.svg'
import scrollbarWidth from './scrollbar-width';

interface Props extends HTMLAttributes<HTMLElement> {
  pulled?: (number: number) => void;
}

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
  const [translateY, _setTranslateY] = useState(0);
  const setTranslateY = (y: number) => {
    if(y<0) { y = 0 } else if(y > 150) { y = 150 };
    _setTranslateY(y);
  }
  const lastYRef = useRef(0);
  const moveCount = useRef(0);
  const pulling = useRef(false);
  const onTouchStart: TouchEventHandler = (e) => {
    const scrollTop = containerRef.current!.scrollTop;
    if(scrollTop !== 0) {return};
    pulling.current = true;
    lastYRef.current = e.touches[0].clientY;
    moveCount.current = 0;
  }
  const onTouchMove: TouchEventHandler = (e) => {
    moveCount.current += 1;
    const deltaY = e.touches[0].clientY - lastYRef.current;
    if(moveCount.current === 1 && deltaY <0) {
      pulling.current = false;
      return;
    }
    if(pulling.current === false) {return};
    setTranslateY(translateY + deltaY);
    lastYRef.current = e.touches[0].clientY;
  }
  const onTouchEnd: TouchEventHandler = (e) => {
    setTranslateY(0);
    if(pulling.current) {
      props.pulled && props.pulled(666);
    }
  }
  return (
    <div
      className={sc('')}
      {...restProps}
    >
      <div
        className={sc('inner')}
        style={{
          right: -scrollbarWidth(),
          transform: `translateY(${translateY}px)`
        }}
        ref={containerRef}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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
      <div className={sc('pulling')} style={{height: translateY}}>
        {translateY === 150 ? 
          <span className={sc('pulling-text')}>
            释放手指即可更新
          </span>
          :
          <svg className={sc('pulling-icon')}>
            <use xlinkHref="#pull" />
          </svg>
        }
      </div>
    </div>
  )
}
export default Scroll;