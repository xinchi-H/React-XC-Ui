import React from 'react';
import { scopedClassMaker } from '../scoped-class-maker';

const sc = scopedClassMaker('xc-layout-footer')

const Footer: React.FunctionComponent = () => {
  return (
    <div className={sc()}>footer</div>
  )
};

export default Footer;