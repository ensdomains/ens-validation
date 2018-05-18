import { scripts } from './regexes/unicode';

export interface ScriptResolverContract {
  resolvedScripts: object;
  singleScript(): boolean;
}

export class ScriptResolver {
  public readonly resolvedScripts: object;
  constructor(url: string) {
    this.resolvedScripts = Object.entries(scripts)
      .filter(script => {
        return script[1].test(url);
      })
      .reduce((previousValue, currentValue) => {
        return { ...previousValue, [currentValue[0]]: true };
      }, {});
  }
  public singleScript(): boolean {
    if (Object.keys(this.resolvedScripts).length === 1) {
      return true;
    }
    // any of these combinations are considered a "singleScript".
    const scriptCombinations = [
      // common, bopomofo, han
      ['common', 'bopomofo'],
      ['common', 'han'],
      ['common', 'bopomofo', 'han'],
      ['bopomofo', 'han'],
      // common, katakana, hiragana, katakana, han
      ['common', 'katakana'],
      ['common', 'hiragana'],
      ['common', 'katakana', 'hiragana'],
      ['katakana', 'hiragana'],
      ['common', 'han'],
      ['common', 'katakana', 'han'],
      ['katakana', 'han'],
      ['common', 'hiragana', 'han'],
      ['common', 'katakana', 'hiragana', 'han'],
      ['katakana', 'hiragana', 'han'],
      ['hiragana', 'han'],
      // common, han, hangul
      ['common', 'han'],
      ['common', 'hangul'],
      ['common', 'han', 'hangul'],
      ['han', 'hangul'],
    ];
    return scriptCombinations.some(combination =>
      combination.every(scriptName =>
        this.resolvedScripts.hasOwnProperty(scriptName),
      ),
    );
  }
}
