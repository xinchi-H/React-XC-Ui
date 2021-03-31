import React, { ReactElement } from 'react';
import './layout.scss';
import { scopedClassMaker } from '../helpers/classes';
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
  
  const childrenAsArr = (children as Array<ReactElement>)
  const hasAside = 'length' in childrenAsArr &&
    childrenAsArr.reduce((result, node) => result || node.type === Aside, false);

  return (
    <div className={sc({'': true, hasAside}, {extra: className})} {...restProps}>
      { children }
    </div>
  )
};

export default Layout;
export {Layout};
export {default as Header} from './header';
export {default as Aside} from './aside';
export {default as Content} from './content';
export {default as Footer} from './footer';