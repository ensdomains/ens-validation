const assert = require('assert')
const { Validator } = require('../src')
const validator = new Validator()

// - Convert each component stored in the ACE to Unicode per UTS 46 transitional processing (ToUnicode).
// - If there is an error in ToUnicode conversion (e.g. contains disallowed characters, starts with a combining mark, or violates BiDi rules), punycode is displayed.
// - If any character is outside the union of the following sets, punycode is displayed.
// - Characters allowed in identifiers per Unicode Technical Standard 39 (UTS 39)
// - Characters suitable for identifiers in 5 Aspirational scripts per Unicode Standard Annex 31 (UAX 31) : Starting with Chrome 64, domains with these characters are turned to punycode.
// - If the component contains either U+0338 or U+2027, punycode is displayed.
// - If the component uses characters drawn from multiple scripts, it is subject to a script mixing check based on "Moderately Restrictive" profile of UTS 39 (starting with Chome 63, it is "Highly Restrictive") with an additional restriction on Latin. Failing the check, the component is shown in punycode.
// - Latin, Cyrillic or Greek characters cannot be mixed with each other
// - Up to Chrome 62, Latin characters in the ASCII range can be mixed with characters in another script as long as it's not Greek nor Cyrillic.
// -  Starting with Chrome 63, Latin characters in the ASCII range can be mixed ONLY with Chinese (Han, Bopomofo), Japanese (Kanji, Katakana, Hiragana), or Korean (Hangul, Hanja).
// - Han (CJK Ideographs) can be mixed with Bopomofo
// - Han can be mixed with Hiragana and Katakana
// - Han can be mixed with Korean Hangul
// - If two or more numbering systems (e.g. European digits + Bengali digits) are mixed, punycode is shown.
// - If there are any invisible characters (e.g. a sequence of the same combining mark or a sequence of Kana combining marks), punycode is shown.
// - Test the label for mixed script confusable per UTS 39. If mixed script confusable is detected, show punycode.
// - If a hostname belongs to an non-IDN TLD(top-level-domain) such as 'com', 'net', or 'uk' and all the letters in a given label belong to a set of Cyrillic letters that look like Latin letters (e.g. Cyrillic Small Letter IE - е  ), show punycode.
// - If the label matches a dangerous pattern, punycode is shown.
// - If the end of a hostname is identical to one of top 10k domains after removing diacritic marks and mapping each character to its spoofing skeleton (e.g. www.googlé.com with 'é' in place of 'e'), punycode is shown.
// - Otherwise, Unicode is shown.

describe('Validator', () => {
    describe('#validate()', () => {
        context('sadadsadsad', () => {
            
        })
        // it('should return true when latin and cjk characters are present', () => {
        //     assert.equal(validator.validate('\u0000'), true);
        // })
        // If the component contains either u0338 or u0338, punycode is displayed.
        it('should return false when u0338 is present', () => {
            assert.equal(validator.validate('\u0338'), false);
        })
        it('should return false when u2027 is present', () => {
            assert.equal(validator.validate('\u2027'), false);
        })
        // Han (CJK Ideographs) can be mixed with Bopomofo
        it('should return true when han is mixed with bopomofo', () => {
            assert.equal(validator.validate('\u4e00\u3040'), true);
        })
        // Han can be mixed with Hiragana and Katakana
        it('should return true when han is mixed with hiragana', () => {
            assert.equal(validator.validate('\u4e00\u3040'), true);
        })
        it('should return true when han is mixed with katakana', () => {
            assert.equal(validator.validate('\u4e00\u30a0'), true);
        })
        // Han can be mixed with Korean Hangul
        it('should return true when han is mixed with hangul', () => {
            assert.equal(validator.validate('\u4e00\u1100'), true);
        })
        it('should return false when deviation characters are present', () => {
            assert.equal(validator.validate('\u00df\u03c2\u200c\u200d'), false);
        })
        it('should return true when input is ascii', () => {
            assert.equal(validator.validate('ethereum.eth'), true);
        })
        // Latin, Cyrillic or Greek characters cannot be mixed with each other
        it('should return false when mixed scripts are present', () => {
            assert.equal(validator.validate('\u0000\u0100\u0370\u04009\u0300'), false);
        })
        it('should return false when cyrillic characters, which look like latin, are present', () => {
            assert.equal(validator.validate('асԁеһіјӏорԛѕԝхуъЬҽпгѵѡ'), false);
        })
        it('should return true when ascii numerics are present', () => {
            assert.equal(validator.validate('123456789'), true);
        })
        it('should return false when mixed numerics are present', () => {
            assert.equal(validator.validate('123١٢٣'), false);
        })
    })
})

const {
    ascii,
    deviation,
    combiningDiacriticException,
    cyrillic,
    cyrillicLikeLatin,
    greek,
    kanaCharacterException,
    latinGreekCyrillicAscii,
    nonAsciiLatin
} = require('../src/regexes')

describe('regexes', () => {
    describe('ascii', () => {
        it('should return true when ascii is present', () => {
            assert.equal(ascii.test('asciii'), true);
        })
    })
    describe('deviation', () => {
        it('should return true when deviation characters are present', () => {
            assert.equal(deviation.test('\u00df'), true);
        })
    })
    describe('nonAsciiLatin', () => {
        it('should return true when non ascii latin is present', () => {
            assert.equal(nonAsciiLatin.test('\u0080'), true);
        })
    })
    describe('greek', () => {
        it('should return true when greek is present', () => {
            assert.equal(greek.test('\u0370'), true);
        })
    })
    describe('cyrillic', () => {
        it('should return true when cyrillic is present', () => {
            assert.equal(cyrillic.test('\u0400'), true);
        })
    })
    describe('latinGreekCyrillicAscii', () => {
        it('should return true when latin, greek, cyrillic, and ascii is present', () => {
            assert.equal(latinGreekCyrillicAscii.test('\u0100\u0370\u0400\u002e\u0300'), true);
        })
    })
    describe('cyrillicLikeLatin', () => {
        it('should return true when a cyrillic character which looks like latin is present', () => {
            assert.equal(cyrillicLikeLatin.test('ѡ'), true);
        })
    })
    describe('combiningDiacriticException', () => {
        it('should return true when a combining diacritics exception is present', () => {
            assert.equal(combiningDiacriticException.test('\u0300\u0339'), true);
        })
    })
    describe('kanaCharacterException', () => {
        it('should return true when a kana character exception is present', () => {
            assert.equal(kanaCharacterException.test('\u30fe'), true);
        })
    })
})