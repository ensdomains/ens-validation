export enum ErrorCode {
  ZERO_ERROR,
  SUCCESS,
  FAILURE,
  INVALID_FORMAT_ERROR,
  ILLEGAL_ARGUMENT_ERROR,
  MEMORY_ALLOCATION_ERROR,
}
export enum RestrictionLevel {
  /**
   * All characters in the string are in the identifier profile and all characters in the string are in the
   * ASCII range.
   *
   * @stable ICU 51
   */
  ASCII = 0x10000000,
  /**
   * The string classifies as ASCII-Only, or all characters in the string are in the identifier profile and
   * the string is single-script, according to the definition in UTS 39 section 5.1.
   *
   * @stable ICU 53
   */
  SINGLE_SCRIPT_RESTRICTIVE = 0x20000000,
  /**
   * The string classifies as Single Script, or all characters in the string are in the identifier profile and
   * the string is covered by any of the following sets of scripts, according to the definition in UTS 39
   * section 5.1:
   * <ul>
   *   <li>Latin + Han + Bopomofo (or equivalently: Latn + Hanb)</li>
   *   <li>Latin + Han + Hiragana + Katakana (or equivalently: Latn + Jpan)</li>
   *   <li>Latin + Han + Hangul (or equivalently: Latn +Kore)</li>
   * </ul>
   * This is the default restriction in ICU.
   *
   * @stable ICU 51
   */
  HIGHLY_RESTRICTIVE = 0x30000000,
  /**
   * The string classifies as Highly Restrictive, or all characters in the string are in the identifier profile
   * and the string is covered by Latin and any one other Recommended or Aspirational script, except Cyrillic,
   * Greek, and Cherokee.
   *
   * @stable ICU 51
   */
  MODERATELY_RESTRICTIVE = 0x40000000,
  /**
   * All characters in the string are in the identifier profile.  Allow arbitrary mixtures of scripts.
   *
   * @stable ICU 51
   */
  MINIMALLY_RESTRICTIVE = 0x50000000,
  /**
   * Any valid identifiers, including characters outside of the Identifier Profile.
   *
   * @stable ICU 51
   */
  UNRESTRICTIVE = 0x60000000,
  /**
   * Mask for selecting the Restriction Level bits from the return value of {@link uspoof_check}.
   *
   * @stable ICU 53
   */
  RESTRICTION_LEVEL_MASK = 0x7f000000,

  /**
   * An undefined restriction level.
   * @internal
   */
  UNDEFINED_RESTRICTIVE = -1,
}
export enum SpoofChecks {
  SINGLE_SCRIPT_CONFUSABLE = 1,
  MIXED_SCRIPT_CONFUSABLE = 2,
  WHOLE_SCRIPT_CONFUSABLE = 4,
  CONFUSABLE = SINGLE_SCRIPT_CONFUSABLE |
    MIXED_SCRIPT_CONFUSABLE |
    WHOLE_SCRIPT_CONFUSABLE,
  RESTRICTION_LEVEL = 16,
  INVISIBLE = 32,
  CHAR_LIMIT = 64,
  MIXED_NUMBERS = 128,
  ALL_CHECKS = 0xffff,
  // AUX_INFO = 0x40000000,
}
