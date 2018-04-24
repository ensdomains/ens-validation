// https://www.regular-expressions.info/unicode.html
import * as XRegExp from 'xregexp'

// SCRIPTS

// latin ascii
export const ascii = XRegExp('\\p{ASCII}')
// latin
export const latin = XRegExp('\\p{ASCII}|\\p{Latin}')
// cyrillic
export const cyrillic = XRegExp('\\p{Cyrillic}')
// greek
export const greek = XRegExp('\\p{Greek}')
// cjk (china, japan, korea)
export const han = XRegExp('\\p{Han}')
// chinese
export const bopomofo = XRegExp('\\p{Bopomofo}')
// japanese
export const hiragana = XRegExp('\\p{Hiragana}')
export const katakana = XRegExp('\\p{Katakana}')
// kanji included in cjk
// korean
export const hangul = XRegExp('\\p{Hangul}')
// hanja included in cjk

export function getScripts(string: string): object {
    const scripts = { latin, cyrillic, greek, han, bopomofo, hiragana, katakana, hangul }
    const result = {}
    for(let script in scripts) {
        if(result.hasOwnProperty(script) || !scripts[script].test(string)) continue
        result[script] = true
    }
    if(!Object.keys(result).length) throw new Error
    return result
}

// Checks
export const pureAscii = XRegExp('^[\\p{ASCII}]*$')
export const deviation = /[\u00df\u03c2\u200c\u200d]/
export const nonAsciiLatin = /[\u0080–\u024f]/
// export const nonAsciiLatin = RegExp('[[p{Latin}] - [a-zA-Z]]')
export const kanaCharacterException = /[\u3078-\u307a\u30d8-\u30da\u30fb-\u30fe]/
export const combiningDiacriticException = /[\u0300-\u0339]/
export const cyrillicLikeLatin = /[асԁеһіјӏорԛѕԝхуъЬҽпгѵѡ]/
// const scriptExtensionsInherited = '[\u200c-\u200d]'
const identifierStatusAllowed = '[\u0300-\u0339]'
export const latinGreekCyrillicAscii = XRegExp(`([\\p{Latin}][\\p{Greek}][\\p{Cyrillic}][0-9\u002e_\u002d]${identifierStatusAllowed})`);

// Dangerous pattern https://cs.chromium.org/chromium/src/components/url_formatter/url_formatter.cc?rcl=0&l=393
export const dangerous = [
    /([^\\p{scx=kana}\\p{scx=hira}\\p{scx=hani}])/,
    /([\u30ce\u30f3\u30bd\u30be])/,
    /([^\\p{scx=kana}\\p{scx=hira}\\p{scx=hani}]|)/,
    /([^\\p{scx=kana}\\p{scx=hira}]\u30fc|^\u30fc|)/,
    /([^\\p{scx=kana}][\u30fd\u30fe]|^[\u30fd\u30fe]|)/,
    /(^[\\p{scx=kana}]+[\u3078-\u307a][\\p{scx=kana}]+$|)/,
    /(^[\\p{scx=hira}]+[\u30d8-\u30da][\\p{scx=hira}]+$|)/,
    /([a-z]\u30fb|\u30fb[a-z]|)/,
    /([^\\p{scx=latn}\\p{scx=grek}\\p{scx=cyrl}][\u0300-\u0339]|)/,
    /(\u0131[\u0300-\u0339]|)/,
    /([ijl]\u0307)/,
]
// for(let i = 0; i < dangerous.length; i++) console.log('dangerous' + i, new RegExp(dangerous[i]).test('abc'))

export const nonSpacingMark = XRegExp('\\p{Non_Spacing_Mark}')
export const number = XRegExp('\\p{Number}')
export const decimalDigitNumber = XRegExp('\\p{Nd}')