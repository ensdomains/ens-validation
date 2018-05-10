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
  nonSpacingMark,
  numeric,
  pureAscii,
  removed,
  scripts,
} from './regexes';

import { cyrillic } from './regexes/scripts';

const blacklist: string[] = require('./domains.json');

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

function detectScript(character: string): string {
  let s = '';
  for (const [scriptName, script] of Object.entries(scripts)) {
    if (script.test(character)) {
      s = scriptName;
      break;
    }
  }
  return s;
}

function mixedNumerics(validationString: string): boolean {
  const result: string[] = [];
  for (const character of validationString) {
    if (numeric.test(character)) {
      const script: string = detectScript(character);
      if (!result.includes(script)) {
        result.push(script);
      }
    }
  }
  return result.length > 1;
}

function detectScripts(validationString: string): object {
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

// //Only do Levenshtein if it's not blacklisted
// //Levenshtein - @sogoiii
// var blHolisticStatus = false;
// if(isBlacklisted === false && arrWhitelistedDomains.indexOf(strCurrentTab) < 0) {
//     var strCurrentTab = punycode.toUnicode(strCurrentTab);
//     var source = strCurrentTab.replace(/\./g, '');
//     var intHolisticMetric = levenshtein(source, 'myetherwallet');
//     var intHolisticLimit = 5; // How different can the word be?
//     blHolisticStatus = (intHolisticMetric > 0 && intHolisticMetric < intHolisticLimit) ? true : false;
//     if(blHolisticStatus === false) {
//         //Do edit distance against mycrypto
//         var intHolisticMetric = levenshtein(source, 'mycrypto');
//         blHolisticStatus = (intHolisticMetric > 0 && intHolisticMetric < 3) ? true : false;
//     }
// }

function levenshtein(a: any, b: any) {
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }

  // swap to save some memory O(min(a,b)) instead of O(a)
  if (a.length > b.length) {
    const tmp = a;
    a = b;
    b = tmp;
  }

  const row = [];
  // init the row
  for (let i = 0; i <= a.length; i++) {
    row[i] = i;
  }

  // fill in the rest
  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      let val;
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        val = row[j - 1]; // match
      } else {
        val = Math.min(
          row[j - 1] + 1, // substitution
          prev + 1, // insertion
          row[j] + 1,
        ); // deletion
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }

  return row[a.length];
}

function similarToTopDomains(url: string): boolean {
  return blacklist.some(b => {
    return levenshtein(url, b) < 5;
  });
}

function inAllowedSets(validationString: string) {
  return Array.from(validationString).every(
    c => (allowed.test(c) || inclusion.test(c)) && !removed.test(c),
  );
}

function sequenceOfCombiningMarks(validationString: string): boolean {
  return Array.from(validationString).some((character, index) => {
    return (
      nonSpacingMark.test(character) &&
      nonSpacingMark.test(validationString[index + 1])
    );
  });
}

function doesNotPassInitialChecks(validationString: string): boolean {
  return (
    !inAllowedSets(validationString) ||
    mixedNumerics(validationString) ||
    sequenceOfCombiningMarks(validationString) ||
    similarToTopDomains(validationString)
  );
}

export function validate(validationString: string): boolean {
  try {
    // validationString = punycode.toUnicode(validationString)
    if (doesNotPassInitialChecks(validationString)) {
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
