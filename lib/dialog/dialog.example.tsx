import React from "react";
import { useState } from "react";
import Dialog from "./dialog";

export default function () {

  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  
  return (
    <div>
      <div>
        <h1>example 1</h1>
        <button onClick={() => setX(!x)}>click</button>
        <Dialog
          visible={x}
          buttons={
            [
              <button onClick={() => {setX(false)}}>cancel</button>,
              <button onClick={() => {setX(false)}}>ok</button>
            ] 
          }
          onClose={() => {setX(false)}}
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
              <button onClick={() => {setY(false)}}>cancel</button>,
              <button onClick={() => {setY(false)}}>ok</button>
            ] 
          }
          onClose={() => {setY(false)}}
          closeOnClickMask={true}
          >
          <strong>hi</strong>
        </Dialog>
      </div>
    </div>
  )
}