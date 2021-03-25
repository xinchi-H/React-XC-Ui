import React from "react";
import Icon from "./icon";

const IconExample: React.FunctionComponent = () => {
  return (
    <div>
      <Icon name="alipay"/>
      <Icon name="wechat"/>
      <Icon name="qq"  className={'xc666'}/>
    </div>
  )
}

export default IconExample;