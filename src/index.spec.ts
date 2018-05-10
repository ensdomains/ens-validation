import { validate } from './index';
describe('test', () => {
  it('should return false when u0338 is present', () => {
    expect(validate('\u0338')).toEqual(false);
  });
  it('should return false when u2027 is present', () => {
    expect(validate('\u2027')).toEqual(false);
  });
  // Han (CJK Ideographs) can be mixed with Bopomofo
  it('should return true when han is mixed with bopomofo', () => {
    expect(validate('\u4e00\u311B')).toEqual(true);
  });
  // Han can be mixed with Hiragana
  it('should return true when han is mixed with hiragana', () => {
    expect(validate('\u4e00\u3077')).toEqual(true);
  });
  // Han can be mixed with Katakana
  it('should return true when han is mixed with katakana', () => {
    expect(validate('\u4e00\u30DB')).toEqual(true);
  });
  // Han can be mixed with Korean Hangul
  it('should return true when han is mixed with hangul', () => {
    expect(validate('\u4e00\u1100')).toEqual(true);
  });
  it('should return false when deviation characters are present', () => {
    expect(validate('\u00df\u03c2\u200c\u200d')).toEqual(false);
  });
  it('should return true when input is ascii', () => {
    expect(validate('ethereum.eth')).toEqual(true);
  });
  // Latin, Cyrillic or Greek characters cannot be mixed with each other
  it('should return false when mixed scripts are present', () => {
    expect(validate('\u0000\u0100\u0370\u04009\u0300')).toEqual(false);
  });
  it('should return false when cyrillic characters, which look like latin, are present', () => {
    expect(validate('асԁеһіјӏорԛѕԝхуъЬҽпгѵѡ')).toEqual(false);
  });
  it('should return true when single numerics are present', () => {
    expect(validate('123456789')).toEqual(true);
  });
  it('should return false when mixed numerics are present', () => {
    expect(validate('1১')).toEqual(false);
  });
  it('should return false when label matches dangerous pattern', () => {
    expect(validate('\u30fb')).toEqual(false);
  });
  it('should return true when single combining mark is present', () => {
    expect(validate('\u0369')).toEqual(true);
  });
  it('should return false when sequence of combining marks are present', () => {
    expect(validate('\u0369\u0369')).toEqual(false);
  });
  it('should return false when sequence of kana combining marks are present', () => {
    expect(validate('\u3099\u3099')).toEqual(false);
  });
  it('should return true when a single combining mark is present', () => {
    expect(validate('\u0369')).toEqual(true);
  });
  it('should return true when a single kana combining mark is present', () => {
    expect(validate('\u3099')).toEqual(true);
  });
});
