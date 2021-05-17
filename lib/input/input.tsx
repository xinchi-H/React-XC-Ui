import React, { InputHTMLAttributes } from 'react';
import './input.scss';
import { scopedClassMaker } from '../helpers/classes';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const sc = scopedClassMaker('xc-input');

const Input: React.FunctionComponent<Props> = (props) => {
  const {className, ...rest} = props;
  return (
    <input className={sc('', {extra: className})}
      {...rest} />
  )
}

export default Input;