import { checkEmptyInput } from "./checkEmptyInput.js";
import { countCharacters } from "./countCharacters.js";

export const getOptions = ({ shouldValidate, text }) => {
  if (!shouldValidate) return { invalid: false, characters: null };

  const isEmpty = checkEmptyInput(text);

  if (isEmpty) return { invalid: true, characters: null };

  const characters = countCharacters(text);

  return { invalid: false, characters };
}