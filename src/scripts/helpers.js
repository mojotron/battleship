const shuffle = (...args) => {
  const temp = [...args];
  return Array.from({ length: args.length }, () => {
    const x = temp.length;
    const y = Math.floor(Math.random() * x);
    return temp.splice(y, 1).pop();
  });
};

export { shuffle };
