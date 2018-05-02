// https://www.regular-expressions.info/unicode.html
import * as XRegExp from 'xregexp'

// scripts
export const common = XRegExp('\\p{Common}')
export const arabic = XRegExp('\\p{Arabic}')
export const armenian = XRegExp('\\p{Armenian}')
export const bengali = XRegExp('\\p{Bengali}')
export const bopomofo = XRegExp('\\p{Bopomofo}')
export const braille = XRegExp('\\p{Braille}')
export const buhid = XRegExp('\\p{Buhid}')
export const canadianAboriginal = XRegExp('\\p{Canadian_Aboriginal}')
export const cherokee = XRegExp('\\p{Cherokee}')
export const cyrillic = XRegExp('\\p{Cyrillic}')
export const devanagari = XRegExp('\\p{Devanagari}')
export const ethiopic = XRegExp('\\p{Ethiopic}')
export const georgian = XRegExp('\\p{Georgian}')
export const greek = XRegExp('\\p{Greek}')
export const gujarati = XRegExp('\\p{Gujarati}')
export const gurmukhi = XRegExp('\\p{Gurmukhi}')
export const han = XRegExp('\\p{Han}')
export const hangul = XRegExp('\\p{Hangul}')
export const hanunoo = XRegExp('\\p{Hanunoo}')
export const hebrew = XRegExp('\\p{Hebrew}')
export const hiragana = XRegExp('\\p{Hiragana}')
export const inherited = XRegExp('\\p{Inherited}')
export const kannada = XRegExp('\\p{Kannada}')
export const katakana = XRegExp('\\p{Katakana}')
export const khmer = XRegExp('\\p{Khmer}')
export const lao = XRegExp('\\p{Lao}')
export const latin = XRegExp('\\p{Latin}')
export const limbu = XRegExp('\\p{Limbu}')
export const malayalam = XRegExp('\\p{Malayalam}')
export const mongolian = XRegExp('\\p{Mongolian}')
export const myanmar = XRegExp('\\p{Myanmar}')
export const ogham = XRegExp('\\p{Ogham}')
export const oriya = XRegExp('\\p{Oriya}')
export const runic = XRegExp('\\p{Runic}')
export const sinhala = XRegExp('\\p{Sinhala}')
export const syriac = XRegExp('\\p{Syriac}')
export const tagalog = XRegExp('\\p{Tagalog}')
export const tagbanwa = XRegExp('\\p{Tagbanwa}')
export const taile = XRegExp('\\p{TaiLe}')
export const tamil = XRegExp('\\p{Tamil}')
export const telugu = XRegExp('\\p{Telugu}')
export const thaana = XRegExp('\\p{Thaana}')
export const thai = XRegExp('\\p{Thai}')
export const tibetan = XRegExp('\\p{Tibetan}')
export const yi = XRegExp('\\p{Yi}')

export function getScripts(string: string): object {
    const scripts = {
        common,
        arabic,
        armenian,
        bengali,
        bopomofo,
        braille,
        buhid,
        canadianAboriginal,
        cherokee,
        cyrillic,
        devanagari,
        ethiopic,
        georgian,
        greek,
        gujarati,
        gurmukhi,
        han,
        hangul,
        hanunoo,
        hebrew,
        hiragana,
        inherited,
        kannada,
        katakana,
        khmer,
        lao,
        latin,
        limbu,
        malayalam,
        mongolian,
        myanmar,
        ogham,
        oriya,
        runic,
        sinhala,
        syriac,
        tagalog,
        tagbanwa,
        taile,
        tamil,
        telugu,
        thaana,
        thai,
        tibetan,
        yi
    }
    const result = {}
    for(let script in scripts) {
        if(result.hasOwnProperty(script) || !scripts[script].test(string)) continue
        result[script] = true
    }
    if(!Object.keys(result).length) throw new Error
    return result
}

// latin ascii
export const ascii = XRegExp('\\p{ASCII}')
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

export const allowed = XRegExp('[0-9A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u0131\\u0134-\\u013E\\u0141-\\u0148\\u014A-\\u017E\\u018F\\u01A0\\u01A1\\u01AF\\u01B0\\u01CD-\\u01DC\\u01DE-\\u01E3\\u01E6-\\u01F0\\u01F4\\u01F5\\u01F8-\\u021B\\u021E\\u021F\\u0226-\\u0233\\u0259\\u02BB\\u02BC\\u02EC\\u0300-\\u0304\\u0306-\\u030C\\u030F-\\u0311\\u0313\\u0314\\u031B\\u0323-\\u0328\\u032D\\u032E\\u0330\\u0331\\u0335\\u0338\\u0339\\u0342\\u0345\\u037B-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03CE\\u03FC-\\u045F\\u048A-\\u0529\\u052E\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0586\\u05B4\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u063F\\u0641-\\u0655\\u0660-\\u0669\\u0670-\\u0672\\u0674\\u0679-\\u068D\\u068F-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE-\\u06FC\\u06FF\\u0750-\\u07B1\\u08A0-\\u08AC\\u08B2\\u08B6-\\u08BD\\u0901-\\u094D\\u094F\\u0950\\u0956\\u0957\\u0960-\\u0963\\u0966-\\u096F\\u0971-\\u0977\\u0979-\\u097F\\u0981-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09E0-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A35\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A5C\\u0A66-\\u0A74\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B43\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5F-\\u0B61\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C01-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C60\\u0C61\\u0C66-\\u0C6F\\u0C80\\u0C82\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D02\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D43\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D54-\\u0D57\\u0D60\\u0D61\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D8E\\u0D91-\\u0D96\\u0D9A-\\u0DA5\\u0DA7-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDE\\u0DF2\\u0E01-\\u0E32\\u0E34-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB2\\u0EB4-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDE\\u0EDF\\u0F00\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F3E-\\u0F42\\u0F44-\\u0F47\\u0F49-\\u0F4C\\u0F4E-\\u0F51\\u0F53-\\u0F56\\u0F58-\\u0F5B\\u0F5D-\\u0F68\\u0F6A-\\u0F6C\\u0F71\\u0F72\\u0F74\\u0F7A-\\u0F80\\u0F82-\\u0F84\\u0F86-\\u0F92\\u0F94-\\u0F97\\u0F99-\\u0F9C\\u0F9E-\\u0FA1\\u0FA3-\\u0FA6\\u0FA8-\\u0FAB\\u0FAD-\\u0FB8\\u0FBA-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10C7\\u10CD\\u10D0-\\u10F0\\u10F7-\\u10FA\\u10FD-\\u10FF\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u1780-\\u17A2\\u17A5-\\u17A7\\u17A9-\\u17B3\\u17B6-\\u17CA\\u17D2\\u17D7\\u17DC\\u17E0-\\u17E9\\u1C80-\\u1C88\\u1E00-\\u1E99\\u1E9E\\u1EA0-\\u1EF9\\u1F00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F70\\u1F72\\u1F74\\u1F76\\u1F78\\u1F7A\\u1F7C\\u1F80-\\u1FB4\\u1FB6-\\u1FBA\\u1FBC\\u1FC2-\\u1FC4\\u1FC6-\\u1FC8\\u1FCA\\u1FCC\\u1FD0-\\u1FD2\\u1FD6-\\u1FDA\\u1FE0-\\u1FE2\\u1FE4-\\u1FEA\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FF8\\u1FFA\\u1FFC\\u2D27\\u2D2D\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3005-\\u3007\\u3041-\\u3096\\u3099\\u309A\\u309D\\u309E\\u30A1-\\u30FA\\u30FC-\\u30FE\\u3105-\\u312D\\u31A0-\\u31BA\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA660\\uA661\\uA674-\\uA67B\\uA67F\\uA69F\\uA717-\\uA71F\\uA788\\uA78D\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7AE\\uA7FA\\uA9E7-\\uA9FE\\uAA60-\\uAA76\\uAA7A-\\uAA7F\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAC00-\\uD7A3\\uFA0E\\uFA0F\\uFA11\\uFA13\\uFA14\\uFA1F\\uFA21\\uFA23\\uFA24\\uFA27-\\uFA29\\u20000-\\u2A6D6\\u2A700-\\u2B734\\u2B740-\\u2B81D\\u2B820-\\u2CEA1]')
export const inclusion = XRegExp("['\\-.\\:\\u00B7\\u0375\\u058A\\u05F3\\u05F4\\u06FD\\u06FE\\u0F0B\\u200C\\u200D\\u2010\\u2019\\u2027\\u30A0\\u30FB]")
export const removed = XRegExp('[\\u0338\\u058a\\u2010\\u2019\\u2027\\u30a0\\u02bb\\u02bc\\u0620\\u0F8C\\u0F8D\\u0F8E\\u0F8F\\u01CD-\\u01DC\\u1C80-\\u1C8F\\u1E00-\\u1E9B\\u1F00-\\u1FFF\\uA640-\\uA69F\\uA720-\\uA7FF]')