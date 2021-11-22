import { CheckResult } from './check-result';
import { ErrorCode, RestrictionLevel, SpoofChecks } from './enums';
import {
  allowed,
  combiningDiacriticException,
  cyrillicLikeLatin,
  dangerousPatterns,
  deviation,
  kanaCharacterException,
  latinGreekCyrillicAscii,
  nonAsciiLatin,
  removed,
} from './regexes';
import { scripts } from './regexes/unicode';
import {
  decimalDigitNumber,
  emoji,
  nonSpacingMark,
} from './regexes/unicode/categories';
import { ScriptResolver } from './script-resolver';

export interface SpoofCheckerContract {
  // Returns true if |label| is safe to display as Unicode. In the event of
  // library failure, all IDN inputs will be treated as unsafe.
  // See the function body for details on the specific safety checks performed.
  safeToDisplayAsUnicode(label: string, isTldAscii: boolean): boolean;
}

export class SpoofChecker implements SpoofCheckerContract {
  public status: ErrorCode = ErrorCode.ZERO_ERROR;
  public checks: SpoofChecks = SpoofChecks.ALL_CHECKS;
  public restrictionLevel: RestrictionLevel =
    RestrictionLevel.HIGHLY_RESTRICTIVE;
  public safeToDisplayAsUnicode(label: string, isTldAscii: boolean) {
    this.status = ErrorCode.ZERO_ERROR;

    // mask all emojis with a regular letter for the rest of the validation
    label = label.replace(emoji, 'a');

    let result = this.check(label);
    if (this.status > ErrorCode.ZERO_ERROR || result & SpoofChecks.ALL_CHECKS) {
      //console.log('Spoof check failuire');
      return false;
    }
    result &= RestrictionLevel.RESTRICTION_LEVEL_MASK;
    console.info('spoof check result', result);
    // deviation
    if (deviation.test(label)) {
      console.info('deviation');
      return false;
    }
    console.log(this.restrictionLevel, RestrictionLevel.ASCII);
    // ascii
    if (result === RestrictionLevel.ASCII) {
      console.info('ascii, return');
      return true;
    }
    // single script
    if (
      result === RestrictionLevel.SINGLE_SCRIPT_RESTRICTIVE &&
      !kanaCharacterException.test(label) &&
      !combiningDiacriticException.test(label)
    ) {
      // Check Cyrillic confusable only for ASCII TLDs.
      return !isTldAscii || !this.isMadeOfLatinAlikeCyrillic(label);
    }
    console.info('multiple script');
    if (nonAsciiLatin.test(label) && !latinGreekCyrillicAscii.test(label)) {
      return false;
    }
    console.log('dangerous patterns');
    return !dangerousPatterns.some(d => d.test(label));
  }
  private check(input: string) {
    let result: number = 0;
    const checkResult = new CheckResult();
    if ((this.checks & SpoofChecks.RESTRICTION_LEVEL) !== 0) {
      const restrictionLevel = this.getRestrictionLevel(input);
      if (restrictionLevel > this.restrictionLevel) {
        result |= SpoofChecks.RESTRICTION_LEVEL;
      }
      checkResult.restrictionLevel = restrictionLevel;
      console.log('SpoofChecks.RESTRICTION_LEVEL result ', result.toString(2));
    }
    if (0 !== (this.checks & SpoofChecks.MIXED_NUMBERS)) {
      // console.log('MIXED_NUMBERS', result)
      const numerics = this.getNumerics(input);
      if (numerics.length > 1) {
        result |= SpoofChecks.MIXED_NUMBERS;
      }
      checkResult.numerics = numerics;
      console.log('MIXED_NUMBERS result ', result.toString(2));
    }
    if (0 !== (this.checks & SpoofChecks.CHAR_LIMIT)) {
      // console.log('CHAR_LIMIT', result);
      for (let i = 0; i < input.length; ) {
        i++;
        if (!allowed.test(input[i])) {
          result |= SpoofChecks.CHAR_LIMIT;
          break;
        }
      }
      console.log('CHAR_LIMIT result ', result.toString(2));
    }

    if (0 !== (this.checks & SpoofChecks.INVISIBLE)) {
      // console.log('INVISIBLE', result);
      // This check needs to be done on NFD input
      const nfdText: string = input.normalize('NFD');
      const nfdLength: number = nfdText.length;
      // scan for more than one occurence of the same non-spacing mark
      // in a sequence of non-spacing marks.
      let i: number;
      let c: number;
      let firstNonspacingMark = 0;
      let haveMultipleMarks = false;
      let marksSeenSoFar: number[] = []; // Set of combining marks in a single combining sequence.
      for (i = 0; i < nfdLength; ) {
        c = nfdText.charCodeAt(i);
        i++;
        if (!nonSpacingMark.test(nfdText[i])) {
          firstNonspacingMark = 0;
          if (haveMultipleMarks) {
            console.log('multiple marks');
            marksSeenSoFar = [];
            haveMultipleMarks = false;
          }
          continue;
        }
        if (firstNonspacingMark === 0) {
          firstNonspacingMark = c;
          continue;
        }
        if (!haveMultipleMarks) {
          marksSeenSoFar.push(firstNonspacingMark);
          haveMultipleMarks = true;
        }
        if (marksSeenSoFar.indexOf(c) > -1) {
          // report the error, and stop scanning.
          // No need to find more than the first failure.
          result |= SpoofChecks.INVISIBLE;
          break;
        }
        marksSeenSoFar.push(c);
      }
    }
    console.log('INVISIBLE result ', result);
    checkResult.checks = result;
    return checkResult.toCombinedBitmask(this.checks);
  }
  private getRestrictionLevel(input: string): RestrictionLevel {
    console.log('getRestrictionLevel');
    if (
      !Array.from(input).every(
        character => allowed.test(character) && !removed.test(character),
      )
    ) {
      console.log('UNRESTRICTIVE');
      return RestrictionLevel.UNRESTRICTIVE;
    }
    let ascii = true;
    for (let i = 0; i < input.length; i++) {
      if (input.charCodeAt(i) > 0x7f) {
        console.log('Not all ascii');
        ascii = false;
        break;
      }
    }
    if (ascii) {
      console.log('ASCII', RestrictionLevel.ASCII);
      return RestrictionLevel.ASCII;
    }
    const scriptResolver = new ScriptResolver(input);
    console.log('scriptResolver', scriptResolver);
    if (scriptResolver.singleScript()) {
      console.log('SINGLE_SCRIPT_RESTRICTIVE');
      return RestrictionLevel.SINGLE_SCRIPT_RESTRICTIVE;
    } else {
      console.log('HIGHLY_RESTRICTIVE');
      return RestrictionLevel.HIGHLY_RESTRICTIVE;
    }
  }
  private getNumerics(input: string): string[] {
    console.log('getNumerics');
    const result: string[] = [];
    let charCode: number;
    for (let i = 0; i < input.length; i++) {
      charCode = input.charCodeAt(i);
      if (decimalDigitNumber.test(input[i])) {
        console.log(
          'Decimal digit',
          'Charcode: ' + charCode,
          'Character: ' + input[i],
        );
        const zero = String.fromCharCode(charCode - parseInt(input[i], 16));
        console.log('Zero character', zero);
        if (result.includes(zero)) {
          continue;
        }
        result.push(zero);
      }
    }
    console.log('getNumerics result', result);
    return result;
  }
  private isMadeOfLatinAlikeCyrillic(label: string): boolean {
    const cyrillicInLabel: string[] = Array.from(label).filter(character =>
      scripts.cyrillic.test(character),
    );
    return (
      cyrillicInLabel.length > 0 &&
      cyrillicInLabel.every(character => {
        return cyrillicLikeLatin.test(character);
      })
    );
  }
}
