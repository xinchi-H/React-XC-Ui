import React from 'react';
import { scopedClassMaker } from '../helpers/classes';

const sc = scopedClassMaker('xc-layout-header')

interface Props extends React.HTMLAttributes<HTMLElement> {
}

const Header: React.FunctionComponent<Props> = ({
  className,
  children,
  ...restProps
}) => {
  return (
    <div className={sc('', {extra: className})} {...restProps}>{ children }</div>
  )
};

export default Header;