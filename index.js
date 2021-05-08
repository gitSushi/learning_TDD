const NEW_LINE = "\n";
const WHITESPACE = " ";
const EMPTY_STRING = "";

function draw(input, deep) {
  return drawSourceLine(input) + drawSuite(input, deep, EMPTY_STRING);
}

function drawSourceLine(input) {
  return input + NEW_LINE;
}

function drawSuite(input, deep, conwaySuite) {
  if (deep === 0) {
    return conwaySuite;
  }
  const nextLine = drawNextLine(input);
  return drawSuite(
    nextLine,
    deep - 1,
    accumulateNextLine(conwaySuite, nextLine)
  );
}

function accumulateNextLine(conwaySuite, nextLine) {
  return prependSuite(conwaySuite) + nextLine;
}

function prependSuite(conwaySuite) {
  return isEmpty(conwaySuite) ? conwaySuite : conwaySuite + NEW_LINE;
}

function drawNextLine(input) {
  const rmvSpace = removeWhitespace(input);
  return drawLineChunk(rmvSpace, EMPTY_STRING);
}

function removeWhitespace(input) {
  return input.replace(/\s/g, EMPTY_STRING);
}

function drawLineChunk(rmvSpace, chunk) {
  if (isEmpty(rmvSpace)) {
    return chunk.trim();
  }
  let nextIndex = indexOfNextDistinctNumber(rmvSpace, 0);
  return drawLineChunk(
    tail(rmvSpace, nextIndex + 1),
    accumulateChunk(chunk, rmvSpace, nextIndex) + WHITESPACE
  );
}

function isEmpty(rmvSpace) {
  return rmvSpace.length === 0;
}

function indexOfNextDistinctNumber(rmvSpace, index) {
  if (hasLengthOne(rmvSpace) || isNextCharDifferent(rmvSpace)) {
    return index;
  }
  return indexOfNextDistinctNumber(tail(rmvSpace, 1), index + 1);
}

function tail(rmvSpace, nextIndex) {
  return rmvSpace.substr(nextIndex);
}

function accumulateChunk(chunk, rmvSpace, nextIndex) {
  return chunk + countConsecutiveNumbers(rmvSpace.substr(0, nextIndex + 1));
}

function hasLengthOne(rmvSpace) {
  return rmvSpace.length === 1;
}

function isNextCharDifferent(rmvSpace) {
  return rmvSpace.charAt(0) !== rmvSpace.charAt(1);
}

function countConsecutiveNumbers(rmvSpace) {
  return rmvSpace.length + WHITESPACE + rmvSpace.charAt(0);
}

// module.exports = draw;

// const testA = `\s1\n1\s1`;

console.log(draw("3", 15));
