import { RestrictionLevel, SpoofChecks } from './enums';

interface CheckResultContract {
  checks: SpoofChecks; // Bit vector of checks that were failed.
  numerics: string[]; // Set of numerics found in the string.
  restrictionLevel: RestrictionLevel;
  toCombinedBitmask(expectedChecks: number): SpoofChecks | RestrictionLevel;
}

export class CheckResult implements CheckResultContract {
  public checks: SpoofChecks = SpoofChecks.ALL_CHECKS;
  public numerics: string[] = [];
  public restrictionLevel: RestrictionLevel =
    RestrictionLevel.HIGHLY_RESTRICTIVE;
  public toCombinedBitmask(
    enabledChecks: number,
  ): SpoofChecks | RestrictionLevel {
    if (
      enabledChecks !== 0 &&
      this.restrictionLevel !== RestrictionLevel.UNDEFINED_RESTRICTIVE
    ) {
      return this.checks | this.restrictionLevel;
    } else {
      return this.checks;
    }
  }
}
