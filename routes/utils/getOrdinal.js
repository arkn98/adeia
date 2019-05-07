const getOrdinal = num => {
  let dig = num % 10;
  let twoDigs = num % 100;
  if (dig == 1 && twoDigs != 11) {
    return num + 'st';
  }
  if (dig == 2 && twoDigs != 12) {
    return num + 'nd';
  }
  if (dig == 3 && twoDigs != 13) {
    return num + 'rd';
  }
  return num + 'th';
};

module.exports = getOrdinal;
