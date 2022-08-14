import { jest } from "@jest/globals";

const inputIsEmpty = jest.fn();
const countCharacters = jest.fn();

jest.unstable_mockModule("../../src/domain/inputIsEmpty.js", () => {
  return {
    inputIsEmpty,
  }
})
jest.unstable_mockModule("../../src/domain/countCharacters.js", () => {
  return {
    countCharacters,
  }
})

describe(`getOptions`, () => {
  let getOptions

  beforeEach(async () => {
    jest.resetAllMocks();

    // importing the module under test because jest doesn't support mock ESM in a clean way yet.
    // you can check more details about this problem here: https://github.com/facebook/jest/issues/9430
    getOptions = (await import("../../src/domain/getOptions.js")).getOptions
  })

  it('should be a method', () => {
    expect(getOptions).toBeInstanceOf(Function);
  });

  describe('if shouldValidate is false', () => {
    it('should return default values', () => {
      const options = getOptions({ shouldValidate: false });
  
      expect(options).toEqual({ invalid: false, characters: null });
    });

    it('should not call inputIsEmpty', () => {
      getOptions({ shouldValidate: false });

      expect(inputIsEmpty).not.toHaveBeenCalled();
    });

    it('should not call countCharacters', () => {
      getOptions({ shouldValidate: false });

      expect(countCharacters).not.toHaveBeenCalled();
    });
  });

  describe('if shouldValidate is true', () => {
    describe('and inputIsEmpty returns true', () => {
      beforeEach(() => {
        inputIsEmpty.mockReturnValue(true);
      })

      it('should return invalid as true', () => {
        const options = getOptions({ shouldValidate: true });
  
        expect(options.invalid).toBeTruthy();
      });

      it('should not call countCharacters', () => {
        getOptions({ shouldValidate: true, text: "" });

        expect(countCharacters).not.toHaveBeenCalled();
      });
    });

    describe('and inputIsEmpty returns false', () => {
      beforeEach(() => {
        inputIsEmpty.mockReturnValue(false);
      });

      it('should return invalid as false', () => {
        const options = getOptions({ shouldValidate: true });
  
        expect(options.invalid).toBeFalsy();
      });

      it('should return characters as the result of countCharacters', () => {
        const expected = 214123;
        countCharacters.mockReturnValue(expected);

        const options = getOptions({ shouldValidate: true, text: "text" });
  
        expect(options.characters).toBe(expected);
      });
    });
  });
});
