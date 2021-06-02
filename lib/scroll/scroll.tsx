import * as React from 'react';
import {HTMLAttributes} from 'react';
import { scopedClassMaker } from '../helpers/classes';
import './scroll.scss'
import scrollbarWidth from './scrollbar-width';

interface Props extends HTMLAttributes<HTMLElement> {}

const sc = scopedClassMaker('xc-scroll');

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...restProps} = props;
  return (
    <div className={sc('')} {...restProps}>
      <div className={sc('inner')} style={{right: -scrollbarWidth()}}>
        {children}
      </div>
    </div>
  )
}
export default Scroll;