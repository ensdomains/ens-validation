// import * as X from 'xregexp';
import X from 'xregexp';

export const inBasicLatin = X('\\p{InBasic_Latin}'); // U+0000–U+007F
export const inLatin1Supplement = X('\\p{InLatin-1_Supplement}'); // U+0080–U+00FF
export const inLatinExtendedA = X('\\p{InLatin_Extended-A}'); // U+0100–U+017F
export const inLatinExtendedB = X('\\p{InLatin_Extended-B}'); // U+0180–U+024F
export const inIpaExtensions = X('\\p{InIPA_Extensions}'); // U+0250–U+02AF
export const inSpacingModifierLetters = X('\\p{InSpacing_Modifier_Letters}'); // U+02B0–U+02FF
export const inCombiningDiacriticalMarks = X(
  '\\p{InCombining_Diacritical_Marks}',
); // U+0300–U+036F
export const inGreekAndCoptic = X('\\p{InGreek_and_Coptic}'); // U+0370–U+03FF
export const inCyrillic = X('\\p{InCyrillic}'); // U+0400–U+04FF
// export const inCyrillicSupplementary = X('\\p{InCyrillic_Supplementary}'); // U+0500–U+052F
export const inArmenian = X('\\p{InArmenian}'); // U+0530–U+058F
export const inHebrew = X('\\p{InHebrew}'); // U+0590–U+05FF
export const inArabic = X('\\p{InArabic}'); // U+0600–U+06FF
export const inSyriac = X('\\p{InSyriac}'); // U+0700–U+074F
export const inThaana = X('\\p{InThaana}'); // U+0780–U+07BF
export const inDevanagari = X('\\p{InDevanagari}'); // U+0900–U+097F
export const inBengali = X('\\p{InBengali}'); // U+0980–U+09FF
export const inGurmukhi = X('\\p{InGurmukhi}'); // U+0A00–U+0A7F
export const inGujarati = X('\\p{InGujarati}'); // U+0A80–U+0AFF
export const inOriya = X('\\p{InOriya}'); // U+0B00–U+0B7F
export const inTamil = X('\\p{InTamil}'); // U+0B80–U+0BFF
export const inTelugu = X('\\p{InTelugu}'); // U+0C00–U+0C7F
export const inKannada = X('\\p{InKannada}'); // U+0C80–U+0CFF
export const inMalayalam = X('\\p{InMalayalam}'); // U+0D00–U+0D7F
export const inSinhala = X('\\p{InSinhala}'); // U+0D80–U+0DFF
export const inThai = X('\\p{InThai}'); // U+0E00–U+0E7F
export const inLao = X('\\p{InLao}'); // U+0E80–U+0EFF
export const inTibetan = X('\\p{InTibetan}'); // U+0F00–U+0FFF
export const inMyanmar = X('\\p{InMyanmar}'); // U+1000–U+109F
export const inGeorgian = X('\\p{InGeorgian}'); // U+10A0–U+10FF
export const inHangulJamo = X('\\p{InHangul_Jamo}'); // U+1100–U+11FF
export const inEthiopic = X('\\p{InEthiopic}'); // U+1200–U+137F
export const inCherokee = X('\\p{InCherokee}'); // U+13A0–U+13FF
export const inUnifiedCanadianAboriginalSyllabics = X(
  '\\p{InUnified_Canadian_Aboriginal_Syllabics}',
); // U+1400–U+167F
export const inOgham = X('\\p{InOgham}'); // U+1680–U+169F
export const inRunic = X('\\p{InRunic}'); // U+16A0–U+16FF
export const inTagalog = X('\\p{InTagalog}'); // U+1700–U+171F
export const inHanunoo = X('\\p{InHanunoo}'); // U+1720–U+173F
export const inBuhid = X('\\p{InBuhid}'); // U+1740–U+175F
export const inTagbanwa = X('\\p{InTagbanwa}'); // U+1760–U+177F
export const inKhmer = X('\\p{InKhmer}'); // U+1780–U+17FF
export const inMongolian = X('\\p{InMongolian}'); // U+1800–U+18AF
export const inLimbu = X('\\p{InLimbu}'); // U+1900–U+194F
export const inTaiLe = X('\\p{InTai_Le}'); // U+1950–U+197F
export const inKhmerSymbols = X('\\p{InKhmer_Symbols}'); // U+19E0–U+19FF
export const inPhoneticExtensions = X('\\p{InPhonetic_Extensions}'); // U+1D00–U+1D7F
export const inLatinExtendedAdditional = X('\\p{InLatin_Extended_Additional}'); // U+1E00–U+1EFF
export const inGreekExtended = X('\\p{InGreek_Extended}'); // U+1F00–U+1FFF
export const inGeneralPunctuation = X('\\p{InGeneral_Punctuation}'); // U+2000–U+206F
export const inSuperscriptsAndSubscripts = X(
  '\\p{InSuperscripts_and_Subscripts}',
); // U+2070–U+209F
export const inCurrencySymbols = X('\\p{InCurrency_Symbols}'); // U+20A0–U+20CF
export const inCombiningDiacriticalMarksForSymbols = X(
  '\\p{InCombining_Diacritical_Marks_for_Symbols}',
); // U+20D0–U+20FF
export const inLetterlikeSymbols = X('\\p{InLetterlike_Symbols}'); // U+2100–U+214F
export const inNumberForms = X('\\p{InNumber_Forms}'); // U+2150–U+218F
export const inArrows = X('\\p{InArrows}'); // U+2190–U+21FF
export const inMathematicalOperators = X('\\p{InMathematical_Operators}'); // U+2200–U+22FF
export const inMiscellaneousTechnical = X('\\p{InMiscellaneous_Technical}'); // U+2300–U+23FF
export const inControlPictures = X('\\p{InControl_Pictures}'); // U+2400–U+243F
export const inOpticalCharacterRecognition = X(
  '\\p{InOptical_Character_Recognition}',
); // U+2440–U+245F
export const inEnclosedAlphanumerics = X('\\p{InEnclosed_Alphanumerics}'); // U+2460–U+24FF
export const inBoxDrawing = X('\\p{InBox_Drawing}'); // U+2500–U+257F
export const inBlockElements = X('\\p{InBlock_Elements}'); // U+2580–U+259F
export const inGeometricShapes = X('\\p{InGeometric_Shapes}'); // U+25A0–U+25FF
export const inMiscellaneousSymbols = X('\\p{InMiscellaneous_Symbols}'); // U+2600–U+26FF
export const inDingbats = X('\\p{InDingbats}'); // U+2700–U+27BF
export const inMiscellaneousMathematicalSymbolsA = X(
  '\\p{InMiscellaneous_Mathematical_Symbols-A}',
); // U+27C0–U+27EF
export const inSupplementalArrowsA = X('\\p{InSupplemental_Arrows-A}'); // U+27F0–U+27FF
export const inBraillePatterns = X('\\p{InBraille_Patterns}'); // U+2800–U+28FF
export const inSupplementalArrowsB = X('\\p{InSupplemental_Arrows-B}'); // U+2900–U+297F
export const inMiscellaneousMathematicalSymbolsB = X(
  '\\p{InMiscellaneous_Mathematical_Symbols-B}',
); // U+2980–U+29FF
export const inSupplementalMathematicalOperators = X(
  '\\p{InSupplemental_Mathematical_Operators}',
); // U+2A00–U+2AFF
export const inMiscellaneousSymbolsAndArrows = X(
  '\\p{InMiscellaneous_Symbols_and_Arrows}',
); // U+2B00–U+2BFF
export const inCjkRadicalsSupplement = X('\\p{InCJK_Radicals_Supplement}'); // U+2E80–U+2EFF
export const inKangxiRadicals = X('\\p{InKangxi_Radicals}'); // U+2F00–U+2FDF
export const inIdeographicDescriptionCharacters = X(
  '\\p{InIdeographic_Description_Characters}',
); // U+2FF0–U+2FFF
export const inCjkSymbolsAndPunctuation = X(
  '\\p{InCJK_Symbols_and_Punctuation}',
); // U+3000–U+303F
export const inHiragana = X('\\p{InHiragana}'); // U+3040–U+309F
export const inKatakana = X('\\p{InKatakana}'); // U+30A0–U+30FF
export const inBopomofo = X('\\p{InBopomofo}'); // U+3100–U+312F
export const inHangulCompatibilityJamo = X('\\p{InHangul_Compatibility_Jamo}'); // U+3130–U+318F
export const inKanbun = X('\\p{InKanbun}'); // U+3190–U+319F
export const inBopomofoExtended = X('\\p{InBopomofo_Extended}'); // U+31A0–U+31BF
export const inKatakanaPhoneticExtensions = X(
  '\\p{InKatakana_Phonetic_Extensions}',
); // U+31F0–U+31FF
export const inEnclosedCjkLettersAndMonths = X(
  '\\p{InEnclosed_CJK_Letters_and_Months}',
); // U+3200–U+32FF
export const inCjkCompatibility = X('\\p{InCJK_Compatibility}'); // U+3300–U+33FF
export const inCjkUnifiedIdeographsExtensionA = X(
  '\\p{InCJK_Unified_Ideographs_Extension_A}',
); // U+3400–U+4DBF
export const inYijingHexagramSymbols = X('\\p{InYijing_Hexagram_Symbols}'); // U+4DC0–U+4DFF
export const inCJKUnifiedIdeographs = X('\\p{InCJK_Unified_Ideographs}'); // U+4E00–U+9FFF
export const inYiSyllables = X('\\p{InYi_Syllables}'); // U+A000–U+A48F
export const inYiRadicals = X('\\p{InYi_Radicals}'); // U+A490–U+A4CF
export const inHangulSyllables = X('\\p{InHangul_Syllables}'); // U+AC00–U+D7AF
export const inHighSurrogates = X('\\p{InHigh_Surrogates}'); // U+D800–U+DB7F
export const inHighPrivateUseSurrogates = X(
  '\\p{InHigh_Private_Use_Surrogates}',
); // U+DB80–U+DBFF
export const inLowSurrogates = X('\\p{InLow_Surrogates}'); // U+DC00–U+DFFF
export const inPrivateUseArea = X('\\p{InPrivate_Use_Area}'); // U+E000–U+F8FF
export const inCjkCompatibilityIdeographs = X(
  '\\p{InCJK_Compatibility_Ideographs}',
); // U+F900–U+FAFF
export const inAlphabeticPresentationForms = X(
  '\\p{InAlphabetic_Presentation_Forms}',
); // U+FB00–U+FB4F
export const inArabicPresentationFormsA = X(
  '\\p{InArabic_Presentation_Forms-A}',
); // U+FB50–U+FDFF
export const inVariationSelectors = X('\\p{InVariation_Selectors}'); // U+FE00–U+FE0F
export const inCombiningHalfMarks = X('\\p{InCombining_Half_Marks}'); // U+FE20–U+FE2F
export const inCjkCompatibilityForms = X('\\p{InCJK_Compatibility_Forms}'); // U+FE30–U+FE4F
export const inSmallFormVariants = X('\\p{InSmall_Form_Variants}'); // U+FE50–U+FE6F
export const inArabicPresentationFormsB = X(
  '\\p{InArabic_Presentation_Forms-B}',
); // U+FE70–U+FEFF
export const inHalfwidthAndFullwidthForms = X(
  '\\p{InHalfwidth_and_Fullwidth_Forms}',
); // U+FF00–U+FFEF
export const inSpecials = X('\\p{InSpecials}'); // U+FFF0–U+FFFF
