import React from 'react';
import { scopedClassMaker } from '../scoped-class-maker';

const sc = scopedClassMaker('xc-layout-header')

const Header: React.FunctionComponent = () => {
  return (
    <div className={sc()}>header</div>
  )
};

export default Header;