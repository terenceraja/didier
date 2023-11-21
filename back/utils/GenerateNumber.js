const GenerateNumber = () => {
  const minm = 100000000;
  const maxm = 999999999;
  const number = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  return number;
};

module.exports = GenerateNumber;
