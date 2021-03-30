import {scopedClassMaker} from '../classes'

describe('scopedClassMaker', () => {
  it('接受字符串或对象', () => {
    const sc = scopedClassMaker('xc-layout')
    expect(sc('')).toEqual('xc-layout')
    expect(sc('x')).toEqual('xc-layout-x')
    expect(sc({y: true, z: false})).toEqual('xc-layout-y')
    expect(sc({y: true, z: true})).toEqual('xc-layout-y xc-layout-z')
    expect(sc({y: true, z: true}, {extra: 'red'})).toEqual('xc-layout-y xc-layout-z red')
  })
})