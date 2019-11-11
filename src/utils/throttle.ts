const throttle = (fn: Function, delay: number) => {
  let start: Date = new Date();
  return (...args: any[]) => {
    let now: Date = new Date();
    if(now.valueOf() - start.valueOf() < delay){
      return;
    } else {
      start = now;
      return fn(...args);
    }
  }
}

export default throttle;
