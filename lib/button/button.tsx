import React from 'react';
import './button.scss'
import { scopedClassMaker } from '../helpers/classes';

const sc = scopedClassMaker('xc-button')

interface Props extends React.HTMLAttributes<HTMLElement> {
  type?: 'default' | 'dashed' | 'primary' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

const Button: React.FunctionComponent<Props> = ({
  className,
  children,
  type,
  size,
  ...restProps
}) => {
    return (
    <button className={sc('', {extra: [className, type, size]})} {...restProps}>
        { children }
     </button>
    )
}

export default Button;
