import React from 'react';
import './layout.scss';
import { scopedClassMaker } from '../scoped-class-maker';

const sc = scopedClassMaker('xc-layout')

interface Props extends React.HTMLAttributes<HTMLElement> {
}

const Layout: React.FunctionComponent<Props> = ({
  className,
  children,
  ...restProps
}) => {
  return (
    <div className={sc('', {extra: className})} {...restProps}>
      { children }
    </div>
  )
};

export default Layout;