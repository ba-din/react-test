export function upperFirstLatterOfEachWord(str, splitter = ' ') {
  if (!str) return '';
  const words = str.split(splitter);

  words.forEach((word, i) => {
    words[i] = word[0].toUpperCase() + word.substring(1);
  });

  return words.join(' ');
}

export function isUpperCase(str) {
  return str === str.toUpperCase();
}

export function variableNameToWords(str) {
  var result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}
