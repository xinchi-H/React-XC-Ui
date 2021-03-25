import React from 'react';
import { scopedClassMaker } from '../scoped-class-maker';

const sc = scopedClassMaker('xc-layout-content')

const Content: React.FunctionComponent = () => {
  return (
    <div className={sc()}>content</div>
  )
};

export default Content;