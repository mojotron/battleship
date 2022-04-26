const shuffle = (...args) => {
  const temp = [...args];
  return Array.from({ length: args.length }, () => {
    const x = temp.length;
    const y = Math.floor(Math.random() * x);
    return temp.splice(y, 1).pop();
  });
};

const wait = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export { shuffle, wait };
