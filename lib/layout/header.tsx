import React from 'react';
import { scopedClassMaker } from '../scoped-class-maker';

const sc = scopedClassMaker('xc-layout-header')

interface Props extends React.HTMLAttributes<HTMLElement> {
}

const Header: React.FunctionComponent<Props> = ({
  className,
  ...restProps
}) => {
  return (
    <div className={sc('', {extra: className})} {...restProps}>header</div>
  )
};

export default Header;