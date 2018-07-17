import * as punycode from 'punycode';

export class Domain {
  public readonly hostname: string;
  public readonly labels: string[];
  public readonly isTldAscii: boolean;
  public readonly isEthTld: boolean;
  constructor(hostname: string) {
    this.hostname = hostname;
    this.labels = this.hostname.split('.').map(punycode.toUnicode);
    this.isTldAscii = !this.hostname
      .substring(this.hostname.lastIndexOf('.'))
      .startsWith('.xn--');
    this.isEthTld =
      this.hostname.substring(this.hostname.lastIndexOf('.')) === 'eth';
    // this.stripTld();
  }
  // private stripTld() {
  //   if (!this.isEthTld ) {
  //     throw Error('Not eth tld.');
  //   }
  //   this.hostname.slice(0, -4);
  // }
}
