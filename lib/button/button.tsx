import React from 'react';
import './button.scss'
import { scopedClassMaker } from '../helpers/classes';

const sc = scopedClassMaker('xc-button')

interface Props extends React.HTMLAttributes<HTMLElement> {
}

const Button: React.FunctionComponent<Props> = ({
  className,
  children,
}) => {
    return (
    <button className={sc('', {extra: className})}>
        { children }
     </button>
    )
}

export default Button;
