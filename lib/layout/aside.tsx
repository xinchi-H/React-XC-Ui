import React from 'react';
import { scopedClassMaker } from '../helpers/classes';

const sc = scopedClassMaker('xc-layout-aside')

interface Props extends React.HTMLAttributes<HTMLElement> {
}

const Aside: React.FunctionComponent<Props> = ({
  className,
  ...restProps
}) => {
  return (
    <div className={sc('', {extra: className})} {...restProps}>aside</div>
  )
};

export default Aside;