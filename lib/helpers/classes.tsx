interface Options {
  extra: any;
}

interface ClassToggles {
  [k:string]: boolean
}

const scopedClassMaker = (prefix: string) => {
  return (name: string | ClassToggles, options?: Options) => {
    let extra
    if (!options) {
      extra = [];
    }
    if (options && Array.isArray(options.extra) ) {
      extra = options.extra.filter(Boolean)
    } else {
      extra = options && options.extra
    }
    return  Object
      .entries(name instanceof Object ? name : {[name]: name})
      .filter(kv => kv[1] !== false)
      .map(kv => kv[0])
      .map(name => [prefix, name]
        .filter(Boolean)
        .join('-'))
      .concat(extra)
      .join(' ');
  }
}
export { scopedClassMaker }
