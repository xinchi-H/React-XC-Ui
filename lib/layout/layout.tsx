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
  let hasAside = false;
  if ((children as Array<ReactElement>).length) {
    (children as Array<ReactElement>).map(node => {
      if (node.type === Aside) {
        hasAside = true;
      }
    })
  }
  return (
    <div className={sc('', {extra: [className, hasAside && 'hasAside'].join(' ')})} {...restProps}>
      { children }
    </div>
  )
};

export default Layout;