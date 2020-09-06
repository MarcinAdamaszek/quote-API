const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const generateId = array => {
  let id = 0;
  while(array.some(quote => {
    return quote.id === id;
  })) {
    id++;
  }
  console.log('id number from generateId function', id);
  return id;
}

module.exports = {
  getRandomElement,
  generateId
};

