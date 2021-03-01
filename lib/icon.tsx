import React from 'react';
import './importIcons';
import './icon.scss';

interface IconProps {
  name: string;
  onClick: () => void;
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
  return (
  <svg className="xc-icon" onClick={props.onClick}>
    <use xlinkHref={`#${props.name}`} />
  </svg>
  );
  }

  export default Icon;