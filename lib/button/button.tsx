import React, { ButtonHTMLAttributes } from 'react';
import './button.scss'
import { scopedClassMaker } from '../helpers/classes';

const sc = scopedClassMaker('xc-button')

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  level?: 'important' | 'danger' | 'normal'
  size?: 'small' | 'medium' | 'large'
}

const Button: React.FunctionComponent<Props> = ({
  className,
  children,
  level,
  size,
  ...restProps
}) => {
    return (
    <button
      className={sc('', {extra: [className, `xc-button-${level}`, size]})}
      {...restProps}
    >
        { children }
     </button>
    )
}

Button.defaultProps = {
  level: 'normal'
}

export default Button;
