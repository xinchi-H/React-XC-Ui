import React, { ReactElement } from 'react';
import './layout.scss';
import { scopedClassMaker } from '../scoped-class-maker';
import Aside from './aside';

const sc = scopedClassMaker('xc-layout')

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement | Array<ReactElement>
}

const Layout: React.FunctionComponent<Props> = ({
  className,
  children,
  ...restProps
}) => {
  
  const childrenAsArr = (children as Array<ReactElement>)
  const hasAside = childrenAsArr.length &&
    childrenAsArr.reduce((result, node) => result || node.type === Aside, false);

  return (
    <div className={sc('', {extra: [className, hasAside && 'hasAside'].join(' ')})} {...restProps}>
      { children }
    </div>
  )
};

export default Layout;