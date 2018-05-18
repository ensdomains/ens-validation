import X from 'xregexp';

export const letter = X('\\p{Letter}'); // any kind of letter from any language.
export const lowercaseLetter = X('\\p{Lowercase_Letter}'); // a lowercase letter that has an uppercase variant.
export const uppercaseLetter = X('\\p{Uppercase_Letter}'); // an uppercase letter that has a lowercase variant.
export const titlecaseLetter = X('\\p{Titlecase_Letter}'); // a letter that appears at the start of a word when only the first letter of the word is capitalized.
export const casedLetter = X('\\p{Cased_Letter}'); // a letter that exists in lowercase and uppercase variants (combination of Ll, Lu and Lt).
export const modifiedLetter = X('\\p{Modifier_Letter}'); // a special character that is used like a letter.
export const otherLetter = X('\\p{Other_Letter}'); // a letter or ideograph that does not have lowercase and uppercase variants.

export const mark = X('\\p{Mark}'); // a character intended to be combined with another character (e.g. accents, umlauts, enclosing boxes, etc.).
export const nonSpacingMark = X('\\p{Non_Spacing_Mark}'); // a character intended to be combined with another character without taking up extra space (e.g. accents, umlauts, etc.).
// export const spacingCombiningMark = X('\\p{Spacing_Combining_Mark}');  // a character intended to be combined with another character that takes up extra space (vowel signs in many Eastern languages).
export const enclosingMark = X('\\p{Enclosing_Mark}'); // a character that encloses the character is is combined with (circle, square, keycap, etc.).
export const separator = X('\\p{Separator}'); // any kind of whitespace or invisible separator.
export const spaceSeparator = X('\\p{Space_Separator}'); // a whitespace character that is invisible, but does take up space.
export const lineSeparator = X('\\p{Line_Separator}'); // line separator character U+2028.
export const paragraphSeparator = X('\\p{Paragraph_Separator}'); // paragraph separator character U+2029.

export const symbol = X('\\p{Symbol}'); // math symbols, currency signs, dingbats, box-drawing characters, etc.
export const mathSymbol = X('\\p{Math_Symbol}'); // any mathematical symbol.
export const currencySymbol = X('\\p{Currency_Symbol}'); // any currency sign.
export const modifierSymbol = X('\\p{Modifier_Symbol}'); // a combining character (mark) as a full character on its own.
export const otherSymbol = X('\\p{Other_Symbol}'); // various symbols that are not math symbols, currency signs, or combining characters.
/* tslint:disable-next-line */
export const number = X('\\p{Number}'); // any kind of numeric character in any script.
export const decimalDigitNumber = X('\\p{Nd}'); // a digit zero through nine in any script except ideographic scripts.
export const letterNumber = X('\\p{Letter_Number}'); // a number that looks like a letter, such as a Roman numeral.
export const otherNumber = X('\\p{Other_Number}'); // a superscript or subscript digit, or a number that is not a digit 0–9 (excluding numbers from ideographic scripts).
export const punctuation = X('\\p{Punctuation}'); // any kind of punctuation character.
export const dashPunctuation = X('\\p{Dash_Punctuation}'); // any kind of hyphen or dash.
export const openPunctuation = X('\\p{Open_Punctuation}'); // any kind of opening bracket.
export const closePunctuation = X('\\p{Close_Punctuation}'); // any kind of closing bracket.
export const initialPunctuation = X('\\p{Initial_Punctuation}'); // any kind of opening quote.
export const finalPunctuation = X('\\p{Final_Punctuation}'); // any kind of closing quote.
export const connectorPunctuation = X('\\p{Connector_Punctuation}'); // a punctuation character such as an underscore that connects words.
export const otherPunctuation = X('\\p{Other_Punctuation}'); // any kind of punctuation character that is not a dash, bracket, quote or connector.
export const other = X('\\p{Other}'); // invisible control characters and unused code points.
export const control = X('\\p{Control}'); // an ASCII or Latin-1 control character: 0x00–0x1F and 0x7F–0x9F.
export const format = X('\\p{Format}'); // invisible formatting indicator.
export const privateUse = X('\\p{Private_Use}'); // any code point reserved for private use.
export const surrogate = X('\\p{Surrogate}'); // one half of a surrogate pair in UTF-16 encoding.
export const unassigned = X('\\p{Unassigned}'); // any code point to which no character has been assigned.
