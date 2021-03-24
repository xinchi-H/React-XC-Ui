import React from "react";
import { useState } from "react";
import Dialog,{alert, confirm, modal} from "./dialog";

export default function () {

  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  
  const openModal = () => {
    const close = modal('提示',
      <h1>
        你好
        <button onClick={()=>close()}>close</button>  
      </h1>
    )
  }

  return (
    <div>
      <div>
        <h1>example 1</h1>
        <button onClick={() => setX(!x)}>click</button>
        <Dialog
          visible={x}
          buttons={
            [
              <button onClick={() => {setX(false)}}>ok</button>,
              <button onClick={() => {setX(false)}}>cancel</button>,
            ] 
          }
          onClose={() => {setX(false)}}
          header={'提示'}
        >
          <strong>hi</strong>
        </Dialog>
      </div>
      <div>
        <h1>example 2</h1>
        <button onClick={() => setY(!y)}>click</button>
        <Dialog
          visible={y}
          buttons={
            [
              <button onClick={() => {setY(false)}}>ok</button>,
              <button onClick={() => {setY(false)}}>cancel</button>,
            ] 
          }
          onClose={() => {setY(false)}}
          closeOnClickMask={true}
          header={'Basic Dialog'}
        >
          hi
        </Dialog>
      </div>
      <br/>
      <hr/>
      <div>
        <h1>example 3</h1>
        <button onClick={() => {alert('提示', <h1>hi</h1>)}}>alert</button>
        <button
          onClick={
            () => {confirm('提示',
              <h1>hi</h1>,
              ()=>{console.log('点击了yes')},
              ()=>{console.log('点击了no')},
            )}
          }
        >
          confirm
        </button>
      </div>
      <div>
        <h1>example 4</h1>
        <button onClick={openModal}>
          modal
        </button>
      </div>
    </div>
  )
}