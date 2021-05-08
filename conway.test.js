const draw = require("./index.js");

const NEW_LINE = "\n";

function ExpectConwaySuite(input, deep, ...output) {
  test(`Depth ${deep}, Entry  ${input} : `, () => {
    expect(draw(input, deep)).toBe(input + NEW_LINE + output.join(NEW_LINE));
  });
}

ExpectConwaySuite("1", 1, "1 1");
ExpectConwaySuite("2", 1, "1 2");
ExpectConwaySuite("2 2", 1, "2 2");
ExpectConwaySuite("2 1", 1, "1 2 1 1");
ExpectConwaySuite("2 1 3", 1, "1 2 1 1 1 3");
ExpectConwaySuite("2 1 1 1", 1, "1 2 3 1");
ExpectConwaySuite("2 3 3 1", 1, "1 2 2 3 1 1");

ExpectConwaySuite("1", 2, "1 1", "2 1");
ExpectConwaySuite("1", 3, "1 1", "2 1", "1 2 1 1");
ExpectConwaySuite(
  "1 2 1 1",
  3,
  "1 1 1 2 2 1",
  "3 1 2 2 1 1",
  "1 3 1 1 2 2 2 1"
);

ExpectConwaySuite(
  "1 2 1 1",
  4,
  "1 1 1 2 2 1",
  "3 1 2 2 1 1",
  "1 3 1 1 2 2 2 1",
  "1 1 1 3 2 1 3 2 1 1"
);
