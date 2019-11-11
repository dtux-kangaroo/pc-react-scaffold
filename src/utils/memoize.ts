const memoize = (fn: Function) => {
  fn.prototype._cache = {};
  return (...args: any[]) => {
    if(args.length === 0 || args.length > 1) {
      return fn(...args);
    }
    const key = JSON.stringify(args);
    fn.prototype._cache[key] = fn.prototype._cache[key] || fn(...args);
    return fn.prototype._cache[key];
  }
}

export default memoize;
