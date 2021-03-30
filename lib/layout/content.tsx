import React from 'react';
import { scopedClassMaker } from '../helpers/classes';

const sc = scopedClassMaker('xc-layout-content')

interface Props extends React.HTMLAttributes<HTMLElement> {
}

const Content: React.FunctionComponent<Props> = ({
  className,
  ...restProps
}) => {
  return (
    <div className={sc('', {extra: className})} {...restProps}>content</div>
  )
};

export default Content;