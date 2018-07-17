// Dangerous pattern https://cs.chromium.org/chromium/src/components/url_formatter/url_formatter.cc?rcl=0&l=393
export const dangerousPatterns = [
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
];
