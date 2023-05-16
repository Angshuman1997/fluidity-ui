export const jumbleFunc = (word, pattern, action) => {
  const wordLen = word.length;
  const tempPatt = Array(wordLen).fill(pattern).flat(1).splice(0, wordLen);
  const tempWord = [];
  Object.keys(word).forEach((i) => {
    if (action === "up") {
      tempWord.push(String.fromCharCode(word[i].charCodeAt(0) + parseInt(tempPatt[i])));
    } else {
      tempWord.push(String.fromCharCode(word[i].charCodeAt(0) - parseInt(tempPatt[i])));
    }
  });

  return tempWord.join("");
};
