import { countCharacters } from "../../src/domain/countCharacters";

describe(`${countCharacters}`, () => {
  it("should be a method", () => {
    expect(countCharacters).toBeInstanceOf(Function);
  });

  it("should return the number of characters in a string", () => {
    const input = "214123";
    const expected = input.length;
    const actual = countCharacters(input);

    expect(actual).toBe(expected);
  });
});
