import { toUnicode } from 'punycode'

import {
    combiningDiacriticException,
    cyrillic,
    cyrillicLikeLatin,
    dangerous,
    decimalDigitNumber,
    deviation,
    getScripts,
    kanaCharacterException,
    latinGreekCyrillicAscii,
    nonAsciiLatin,
    pureAscii
} from './regexes'

import { Validator as Interface } from './interfaces'

class UrlFormatter {
    public readonly url: string
    public readonly isTldAscii: boolean
    constructor(url: string) {
        this.url = url;
        this.isTldAscii = !this.url.substring(this.url.lastIndexOf('.')).startsWith('.xn--')
    }
    public labels(): string[] {
        return this.url.split('.').map(label => toUnicode(label))
    }
}

export class Validator implements Interface {
    public validate(string: string): boolean {
        try {
            // scripts
            const scripts = getScripts(string)
            console.info('scripts', scripts)
            // url
            const urlFormatter = new UrlFormatter(string)
            // // labels
            // const labels = urlFormatter.labels()
            // console.info('labels', labels)
            // deviation
            if (deviation.test(string)) {
                console.info('deviation')
                return false;
            }
            // ascii
            if (pureAscii.test(string)) {
                console.info('pure ascii')
                return true
            }
            // single script
            if (
                this.singleScript(scripts) &&
                !kanaCharacterException.test(string) &&
                !combiningDiacriticException.test(string)
            ) {
                console.info('single script')
                // Check Cyrillic confusable only for ASCII TLDs.
                return !urlFormatter.isTldAscii || !this.isMadeOfLatinAlikeCyrillic(string);
            }
            console.info('multiple script')
            if (
                nonAsciiLatin.test(string) &&
                !latinGreekCyrillicAscii.test(string)
            ) {
                return false;
            }
            console.log('dangerous')
            return dangerous.every(d => d.test(string))
        } catch (e) {
            console.error(e)
            return false
        }
    }
    // Returns true if all the Cyrillic letters in |label| belong to a set of
    // Cyrillic letters that look like ASCII Latin letters.
    // Collect all the Cyrillic letters in |label_string| and see if they're
    // a subset of |cyrillic_letters_latin_alike_|.
    // A shortcut of defining cyrillic_letters_latin_alike_ to include [0-9] and
    // [_-] and checking if the set contains all letters of |label|
    // would work in most cases, but not if a label has non-letters outside
    // ASCII.
    private isMadeOfLatinAlikeCyrillic(label: string): boolean {
        let cyrillicInLabel = [];
        for(let i = 0; i < label.length; i++) {
            if(cyrillic.test(label[i])) {
                cyrillicInLabel.push(label[i])
            }
        }
        return cyrillicInLabel.length &&
            cyrillicInLabel.every(c => cyrillicLikeLatin.test(c))
    }
    // Note that the following combinations of scripts are treated as a 'logical'
    // single script.
    //  - Chinese: Han, Bopomofo, Common
    //  - Japanese: Han, Hiragana, Katakana, Common
    //  - Korean: Hangul, Han, Common
    private singleScript(scripts: object): boolean {
        if(Object.keys(scripts).length === 1) return true
        return scripts['han'] && scripts['bopomofo'] ||
            scripts['han'] && scripts['hiragana'] && scripts['katakana'] ||
            scripts['hangul'] && scripts['han']
    }
    // private lookupMatchInTopDomains(labels: string[]): boolean {
    //       return labels.every(l => {
    //           // todo
    //           return true
    //       })
    // }
}