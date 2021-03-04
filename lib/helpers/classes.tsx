function classes(...names: (string | undefined)[]) { // ...names 是剩余操作符
  return names.filter(Boolean).join(' ');
}

export default classes;