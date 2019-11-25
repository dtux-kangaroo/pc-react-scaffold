const throttle = (fn, delay) => {
  let start = new Date();
  return (...args) => {
    let now = new Date();
    if(now - start < delay){
      return;
    } else {
      start = now;
      return fn(...args);
    }
  }
}

export default throttle;
