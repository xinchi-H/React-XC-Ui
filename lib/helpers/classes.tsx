interface Options {
  extra: string | undefined;
}

interface ClassToggles {
  [k:string]: boolean
}

function scopedClassMaker(prefix: string) {
  let result;
  return function (name?: string | ClassToggles, options?: Options) {
    if (typeof name === 'string' || name === undefined) {
      result = [prefix, name].filter(Boolean).join('-')
    } else {
      const name2 = Object.entries(name).filter(kv => kv[1]).map(kv => kv[0])
      result = name2.map(n => 
        [prefix, n].filter(Boolean).join('-')
      ).join(' ')
    }
    if (options && options.extra) {
      return [result, options && options.extra].filter(Boolean).join(' ')
    } else {
      return result;
    }
  }

}

export { scopedClassMaker }
