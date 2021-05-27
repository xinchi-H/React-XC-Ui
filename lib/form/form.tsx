import React, { ReactFragment } from 'react';
import Input from '../input/input';
import './form.scss'
import { scopedClassMaker } from '../helpers/classes';

export interface FormValue {
  [k: string]: any
}

interface Props {
  value: FormValue;
  fields: Array<{name: string, label: string, input: {type: string}}>;
  buttons: ReactFragment;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: (value: FormValue) => void;
  errors: {[K: string]: string[]};
  transformError?: (message: string) => string;
}

const sc = scopedClassMaker('xc-form')

const Form: React.FunctionComponent<Props> = (props) => {
  const formData = props.value;
  const onsubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };
  const onInputChange = (name: string, value: string) => {
    const newValue = {...formData, [name]: value}
    props.onChange(newValue);
  };
  const transformError = (message: string) => {
    const map: any = {
      required: '必填',
      minLength: '太短',
      maxLength: '太长',
    };
    return props.transformError && props.transformError(message) || map[message]
      || '未知错误';
  };

  return (
    <form onSubmit={onsubmit}>
      <table className={sc('table')}>
        <tbody>
          {props.fields.map(f =>
            <tr
              className={sc('tr')}
              key={f.name}
            >
              <td className={sc('td')}>
                <span className={sc('label')}>{f.label}</span>
              </td>
              <td className={sc('td')}>
                <Input
                  type={f.input.type}
                  value={formData[f.name]}
                  onChange={(e) => onInputChange(f.name, e.target.value)}
                />
                <div className={sc('error')}>
                  {
                    props.errors[f.name] ?
                    props.errors[f.name].map(transformError).join('，') : <span>&nbsp;</span>
                  }
                </div>
              </td>
            </tr>
          )}
          <tr className={sc('tr')}>
            <td  className={sc('td')}/>
            <td className={sc('td')}>
              {props.buttons}
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default Form;