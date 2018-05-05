import * as punycode from 'punycode';
import {
  allowed,
  combiningDiacriticException,
  cyrillicLikeLatin,
  dangerous,
  deviation,
  inclusion,
  kanaCharacterException,
  latinGreekCyrillicAscii,
  nonAsciiLatin,
  pureAscii,
  removed,
  scripts,
} from './regexes';

import { cyrillic } from './regexes/scripts';

class UrlFormatter {
  public readonly url: string;
  public readonly isTldAscii: boolean;
  constructor(url: string) {
    this.url = url;
    this.isTldAscii = !this.url
      .substring(this.url.lastIndexOf('.'))
      .startsWith('.xn--');
  }
  public labels(): string[] {
    return this.url.split('.').map(punycode.toUnicode);
  }
}

export function detectScripts(validationString: string): object {
  return Object.entries(scripts)
    .filter(script => {
      return script[1].test(validationString);
    })
    .reduce((previousValue, currentValue) => {
      return { ...previousValue, [currentValue[0]]: true };
    }, {});
}

// Returns true if all the Cyrillic letters in |label| belong to a set of
// Cyrillic letters that look like ASCII Latin letters.
// Collect all the Cyrillic letters in |label_string| and see if they're
// a subset of |cyrillic_letters_latin_alike_|.
// A shortcut of defining cyrillic_letters_latin_alike_ to include [0-9] and
// [_-] and checking if the set contains all letters of |label|
// would work in most cases, but not if a label has non-letters outside
// ASCII.
function isMadeOfLatinAlikeCyrillic(validationString: string): boolean {
  const cyrillicInLabel: string[] = [];
  for (const c of validationString) {
    if (cyrillic.test(c)) {
      cyrillicInLabel.push(c);
    }
  }
  return (
    cyrillicInLabel.length > 0 &&
    cyrillicInLabel.every(c => cyrillicLikeLatin.test(c))
  );
}

function combinations(array: string[]): string[][] {
  if (array.length === 1) {
    return [array];
  } else {
    const subArray = combinations(array.slice(1));
    return subArray.concat(subArray.map(e => e.concat(array[0])), [[array[0]]]);
  }
}

// Note that the following combinations of scripts are treated as a 'logical'
// single script.
//  - Chinese: Han, Bopomofo, Common
//  - Japanese: Han, Hiragana, Katakana, Common
//  - Korean: Hangul, Han, Common
function singleScript(detectedScripts: object): boolean {
  if (Object.keys(detectedScripts).length === 1) {
    return true;
  }
  const scriptCombinations = [
    combinations(['han', 'bopomofyo', 'common']),
    combinations(['han', 'hiragana', 'katakana', 'common']),
    combinations(['hangul', 'han', 'common']),
  ];
  return scriptCombinations.some(scriptCombination =>
    scriptCombination.some(combination =>
      combination.every(scriptName =>
        detectedScripts.hasOwnProperty(scriptName),
      ),
    ),
  );
}

// function lookupMatchInTopDomains(labels: string[]): boolean {
//       return labels.every(l => {
//           if(found) return true
//           // todo
//           return false
//       })
// }

function inAllowedSets(validationString: string) {
  return Array.from(validationString).every(
    c => (allowed.test(c) || inclusion.test(c)) && !removed.test(c),
  );
}

export function validate(validationString: string): boolean {
  try {
    if (!inAllowedSets(validationString)) {
      return false;
    }
    // scripts
    const detectedScripts: object = detectScripts(validationString);
    console.info('detectedScripts', detectedScripts);
    // url
    const urlFormatter: UrlFormatter = new UrlFormatter(validationString);
    // // labels
    const labels: string[] = urlFormatter.labels();
    console.info('labels', labels);
    // deviation
    if (deviation.test(validationString)) {
      console.info('deviation');
      return false;
    }
    // ascii
    if (pureAscii.test(validationString)) {
      console.info('pure ascii');
      return true;
    }
    // single script
    if (
      singleScript(detectedScripts) &&
      !kanaCharacterException.test(validationString) &&
      !combiningDiacriticException.test(validationString)
    ) {
      console.info('single script');
      // Check Cyrillic confusable only for ASCII TLDs.
      return (
        !urlFormatter.isTldAscii ||
        !isMadeOfLatinAlikeCyrillic(validationString)
      );
    }
    console.info('multiple script');
    if (
      nonAsciiLatin.test(validationString) &&
      !latinGreekCyrillicAscii.test(validationString)
    ) {
      return false;
    }
    console.log('dangerous');
    return dangerous.every(d => d.test(validationString));
  } catch (e) {
    console.error(e);
    return false;
  }
}
