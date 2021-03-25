import React from 'react';
import { scopedClassMaker } from '../scoped-class-maker';
import classes from '../helpers/classes'

const sc = scopedClassMaker('xc-layout')

interface Props extends React.HTMLAttributes<HTMLElement> {
}

const Layout: React.FunctionComponent<Props> = ({
  className,
  children,
  ...restProps
}) => {
  return (
    <div className={classes(sc(), className)} {...restProps}>
      { children }
    </div>
  )
};

export default Layout;