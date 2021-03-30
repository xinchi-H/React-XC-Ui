import React from 'react';
import './importIcons';
import './icon.scss';
import { scopedClassMaker } from "../helpers/classes";

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
}
const sc = scopedClassMaker('xc-icon');

const Icon: React.FunctionComponent<IconProps> = ({
  className,
  name,
  ...restProps
}) => {
    return (
      <svg className={sc('', {extra: className})}
           { ...restProps }
      >
        <use xlinkHref={`#${name}`} />
      </svg>
    );
  }

  export default Icon;