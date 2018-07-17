import {
  combiningDiacriticException,
  cyrillicLikeLatin,
  deviation,
  kanaCharacterException,
  latinGreekCyrillicAscii,
  nonAsciiLatin,
} from './index';

import { cyrillic, greek } from './unicode/scripts';

describe('regexes', () => {
  describe('deviation', () => {
    it('should return true when deviation characters are present', () => {
      expect(deviation.test('\u00df')).toEqual(true);
    });
  });
  describe('nonAsciiLatin', () => {
    it('should return true when non ascii latin is present', () => {
      expect(nonAsciiLatin.test('\u0080')).toEqual(true);
    });
  });
  describe('greek', () => {
    it('should return true when greek is present', () => {
      expect(greek.test('\u0370')).toEqual(true);
    });
  });
  describe('cyrillic', () => {
    it('should return true when cyrillic is present', () => {
      expect(cyrillic.test('\u0400')).toEqual(true);
    });
  });
  describe('latinGreekCyrillicAscii', () => {
    it('should return true when latin, greek, cyrillic, and ascii is present', () => {
      expect(
        latinGreekCyrillicAscii.test('\u0100\u0370\u0400\u002e\u0300'),
      ).toEqual(true);
    });
  });
  describe('cyrillicLikeLatin', () => {
    it('should return true when a cyrillic character which looks like latin is present', () => {
      expect(cyrillicLikeLatin.test('ѡ')).toEqual(true);
    });
  });
  describe('combiningDiacriticException', () => {
    it('should return true when a combining diacritics exception is present', () => {
      expect(combiningDiacriticException.test('\u0300\u0339')).toEqual(true);
    });
  });
  describe('kanaCharacterException', () => {
    it('should return true when a kana character exception is present', () => {
      expect(kanaCharacterException.test('\u30fe')).toEqual(true);
    });
  });
});
