import React, { Fragment, ReactElement, ReactNode } from "react";
import ReactDOM from 'react-dom';
import {Icon} from '../index';
import './dialog.scss';
import { scopedClassMaker } from "../helpers/classes";

interface Props {
  visible: boolean;
  buttons?: Array<ReactElement>;
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
  header: string;
}

const sc = scopedClassMaker('xc-dialog');

const Dialog: React.FunctionComponent<Props> = (props) => {

  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e)
  }

  const onClickMask: React.MouseEventHandler = (e) => {
    if(props.closeOnClickMask) {
      props.onClose(e)
    }
  }
  
  const result = props.visible ?
    <Fragment>
    <div className={sc('mask')} onClick={onClickMask}/>
    <div className={sc('')}>
      <div className={sc('close')} onClick={onClickClose}>
        <Icon name="close" />
      </div>
      <header className={sc('header')}>
        { props.header }
      </header>
      <main className={sc('main')}>
        { props.children }
      </main>
      { props.buttons && props.buttons.length > 0 &&
        <footer className={sc('footer')}>
          { 
            props.buttons.map((button,index) => 
              React.cloneElement(button, {key: index})
            )
          }
        </footer>
      }
    </div> 
    </Fragment>
    :
    null

  return (
    ReactDOM.createPortal(result, document.body)
  )
}

Dialog.defaultProps = {
  closeOnClickMask: false
}

const modal = (header: string,content: ReactNode, buttons?: Array<ReactElement>, afterClose?: () => void) => {
  const close = () => {
    ReactDOM.render(React.cloneElement(component, {visible: false}), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }
  
  const component = (
    <Dialog
      visible={true}
      buttons={buttons}
      onClose={() => {
        close();
        afterClose && afterClose();
      }}
      header={header}
    >
      {content}
    </Dialog>
  )

  const div = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);

  return close;
}

const alert = (header: string,content: ReactNode) => {
  const button = <button onClick={() => close()}>OK</button>;
  const close = modal(header, content, [button]);
}

const confirm = (header: string, content: ReactNode, yes?: ()=>void, no?: ()=>void) => {
  const onYes = () => {
    close();
    yes && yes();
  }

  const onNo = () => {
    close();
    no && no();
  }

  const buttons = [
    <button onClick={onYes}>yes</button>,
    <button onClick={onNo}>no</button>,
  ]

  const close = modal(header, content, buttons, no)
};

export {alert, confirm, modal};

export default Dialog;