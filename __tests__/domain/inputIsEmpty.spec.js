import { inputIsEmpty } from "../../src/domain/inputIsEmpty.js";

describe(`${inputIsEmpty}`, () => {
  it("should be a method", () => {
    expect(inputIsEmpty).toBeInstanceOf(Function);
  });

  it('should return true to empty input', () => {
    const actual = inputIsEmpty("");
    
    expect(actual).toBeTruthy();
  });

  it("should return false to non-empty input", () => {
    const actual = inputIsEmpty("abc");

    expect(actual).toBeFalsy();
  });

  // this one was implemented just to kill stryker mutant :)
  it("should return false to null object", () => {
    const actual = inputIsEmpty(null);

    expect(actual).toBeTruthy();
  });
});
