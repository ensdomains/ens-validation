import * as punycode from 'punycode';

export class Domain {
  public readonly hostname: string;
  public readonly labels: string[];
  public readonly isTldAscii: boolean;
  public readonly isEthTld: boolean;
  constructor(hostname: string) {
    this.hostname = hostname;
    // tslint:disable-next-line:deprecation
    this.labels = this.hostname.split('.').map(punycode.toUnicode);
    this.isTldAscii = !this.hostname
      .substring(this.hostname.lastIndexOf('.'))
      .startsWith('.xn--');
    this.isEthTld =
      this.hostname.substring(this.hostname.lastIndexOf('.')) === '.eth';
  }
}
